import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule, Platform, ToastController } from '@ionic/angular';
import axios from 'axios';
import { DataService, Message } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public message!: Message;
  private data = inject(DataService);
  private activatedRoute = inject(ActivatedRoute);
  private platform = inject(Platform);
  usuario : any = {};

  constructor(private toastController: ToastController, private router: Router) {}

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    //this.message = this.data.getMessageById(parseInt(id, 10));
    axios.get("http://localhost:3000/user/" + id)
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

  getBackButtonText() {
    const isIos = this.platform.is('ios')
    return isIos ? 'Inbox' : '';
  }

  saveLogin(){
    const id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    var data = {
      email: this.usuario.email,
      password: this.usuario.password,
    }
    //this.message = this.data.getMessageById(parseInt(id, 10));
    axios.post("http://localhost:3000/users/login", data)
    .then( async (result) => {
      if (result.data.success == true) {
        this.presentToast("Inicio exitoso");
        console.log(result.data.token);
        localStorage.setItem("token", result.data.token);
        this.router.navigate(["/home"]);
      } else {
        this.presentToast(result.data.error);
      }
      
    }).catch(async error => {
      this.presentToast(error.message);
    })
  }
  ionViewWillEnter(): void {
    let token = localStorage.getItem("token");

    if(token){
      this.router.navigate(["/home"]);
    }
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
