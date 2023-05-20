import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule, Platform } from '@ionic/angular';
import axios from 'axios';
import { DataService, Message } from '../services/data.service';

@Component({
  selector: 'app-view-message',
  templateUrl: './view-message.page.html',
  styleUrls: ['./view-message.page.scss'],
})
export class ViewMessagePage implements OnInit {
  public message!: Message;
  private data = inject(DataService);
  private activatedRoute = inject(ActivatedRoute);
  private platform = inject(Platform);
  usuario : any = {};

  config : any = [];
  constructor(private router: Router) {}

  ngOnInit() {
  }
  getUser(){
    const id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    //this.message = this.data.getMessageById(parseInt(id, 10));
    axios.get("http://localhost:3000/user/" + id, this.config)
    .then( result => {
      if (result.data.success == true) {
        this.usuario = result.data.usuario;
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
}
