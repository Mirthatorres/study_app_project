import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule, Platform, ToastController } from '@ionic/angular';
import axios from 'axios';
import { DataService, Message } from '../services/data.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.page.html',
  styleUrls: ['./edit-user.page.scss'],
})
export class EditUserPage implements OnInit {
  public message!: Message;
  private data = inject(DataService);
  private activatedRoute = inject(ActivatedRoute);
  private platform = inject(Platform);
  usuario : any = {};
  config : any = [];
  
  constructor(private toastController: ToastController, private router: Router) {}

  ngOnInit() {
    
  }
  getUser(){
    const id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    //this.message = this.data.getMessageById(parseInt(id, 10));
    axios.get("http://localhost:3000/user/" + id, this.config)
    .then( result => {
      if (result.data.success == true) {
        if(result.data.usuario != null){

          this.usuario = result.data.usuario;
        }else{
          this.usuario = {}
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
    this.getUser();
  }
  getBackButtonText() {
    const isIos = this.platform.is('ios')
    return isIos ? 'Inbox' : '';
  }

  saveUser(){
    const id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    var data = {
      id: this.usuario.id,
      name: this.usuario.name,
      last_name: this.usuario.last_name,
      email: this.usuario.email
    }
    //this.message = this.data.getMessageById(parseInt(id, 10));
    axios.post("http://localhost:3000/user/update", data, this.config)
    .then( async (result) => {
      if (result.data.success == true) {
        this.presentToast("Usuario Guardado");
        this.router.navigate(["/home"]);
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
