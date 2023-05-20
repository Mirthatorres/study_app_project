import { Component, inject, OnInit } from '@angular/core';
import { RefresherCustomEvent, ToastController } from '@ionic/angular';
import axios from 'axios';
import { MessageComponent } from '../message/message.component';

import { DataService, Message } from '../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  private data = inject(DataService);
  
  usuarios : any = [];
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
    this.getUsers();
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
  ngOnInit(): void {
    //this.getUsers();
  }

  getUsers () {
    
    axios.get("http://localhost:3000/users/list",  this.config)
    .then( result => {
      if (result.data.success == true) {
        this.usuarios = result.data.usuarios;
      } else {
        console.log(result.data.error);
      }
      
    }).catch(error => {
      console.log(error.message);
    })
  }
  deleteUser(userId: BigInteger) {
    
    axios.delete("http://localhost:3000/users/delete/" + userId, this.config)
    .then( result => {
      if (result.data.success == true) {

        this.presentToast("Usuario eliminado");
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
