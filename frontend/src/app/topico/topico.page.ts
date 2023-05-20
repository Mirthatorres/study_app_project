import { Component, inject, OnInit } from '@angular/core';
import { RefresherCustomEvent, ToastController } from '@ionic/angular';
import axios from 'axios';
import { MessageComponent } from '../message/message.component';

import { DataService, Message } from '../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topico',
  templateUrl: 'topico.page.html',
  styleUrls: ['topico.page.scss'],
})
export class TopicoPage implements OnInit{
  private data = inject(DataService);
  
  topicos : any = [];
  config : any = [];
  constructor(private router: Router, private toastController: ToastController) {
    
  }

  refresh(ev: any) {
    setTimeout(() => {
      (ev as RefresherCustomEvent).detail.complete();
    }, 3000);
  }

  getMessages(): Message[] {
    return this.data.getMessages();
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
    this.getTopics();
  }
  ngOnInit(): void {
    //this.getTopics();
  }

  cerrarSesion(){
    
    axios.post("http://localhost:3000/users/logout", {},  this.config)
    .then( result => {
      if (result.data.success == true) {
        localStorage.removeItem("token");
        this.router.navigate(["/login"]);
      } else {
        console.log(result.data.error);
      }
      
    }).catch(error => {
      console.log(error.message);
    })
  }

  getTopics () {
    
    axios.get("http://localhost:3000/topics/list",  this.config)
    .then( result => {
      if (result.data.success == true) {
        this.topicos = result.data.topics;
      } else {
        console.log(result.data.error);
      }
      
    }).catch(error => {
      console.log(error.message);
    })
  }
  deleteTopic(topicId: BigInteger) {
    
    axios.delete("http://localhost:3000//topics/delete/" + topicId, this.config)
    .then( result => {
      if (result.data.success == true) {

        this.presentToast("Topico eliminado");
        location.reload();
      } else {
        this.presentToast(result.data.error);
      }
      
    }).catch(error => {
      console.log(error.message);
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