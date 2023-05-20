import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule, Platform, ToastController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-edit-topic',
  templateUrl: './edit-topic.page.html',
  styleUrls: ['./edit-topic.page.scss'],
})
export class EditTopicPage implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private platform = inject(Platform);
  topico : any = {};
  config : any = [];
  
  constructor(private toastController: ToastController, private router: Router) {}

  ngOnInit() {
    
  }
  getTopic(){
    const id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    //this.message = this.data.getMessageById(parseInt(id, 10));
    axios.get("http://localhost:3000/topic/" + id, this.config)
    .then( result => {
      if (result.data.success == true) {
        if(result.data.topico != null){

          this.topico = result.data.topic;
        }else{
          this.topico = {}
        }
      } else {
        console.log(result.data.error);
      }
      
    }).catch(error => {
      console.log(error.message);
    })
  }
  ionViewWillEnter(): void {
    let token = localStorage.getItem("token");

    if(!token){
      this.router.navigate(["/login"]);
    }else{
      let token = localStorage.getItem("token");
      this.config = { 
        headers : {
          authorization: token
        }
      }
    }
    this.getTopic();
  }
  getBackButtonText() {
    const isIos = this.platform.is('ios')
    return isIos ? 'Inbox' : '';
  }

  saveTopic(){
    const id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    var data = {
      id: this.topico.id,
      name: this.topico.name,
      create_date: this.topico.create_date,
      color: this.topico.color,
      owner_user_id: this.topico.owner_user_id
    }
    console.log(data);
    //this.message = this.data.getMessageById(parseInt(id, 10));
    axios.post("http://localhost:3000/topics/update", data, this.config)
    .then( async (result) => {
      if (result.data.success == true) {
        this.presentToast("topico Guardado");
        this.router.navigate(["/topico"]);
      } else {
        this.presentToast(result.data.error);
      }
      
    }).catch(async error => {
      this.presentToast(error.message);
    })
  }

  async presentToast(message: string){
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: 'top'
    });
    
    await toast.present();
  }
}
