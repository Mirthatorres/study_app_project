import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule, Platform } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-detalle-topic',
  templateUrl: './detalle-topic.page.html',
  styleUrls: ['./detalle-topic.page.scss'],
})
export class DetalleTopicPage implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private platform = inject(Platform);
  topico : any = {};

  config : any = [];
  constructor(private router: Router) {}

  ngOnInit() {
  }
  getTopic(){
    const id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    //this.message = this.data.getMessageById(parseInt(id, 10));
    axios.get("http://localhost:3000/topic/" + id, this.config)
    .then( result => {
      if (result.data.success == true) {
        this.topico = result.data.topico;
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
}
