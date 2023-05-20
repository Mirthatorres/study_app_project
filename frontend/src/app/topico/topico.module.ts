import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { TopicoPage } from './topico.page';
import { TopicoPageRoutingModule } from './topico-routing.module';
import { MessageComponentModule } from '../message/message.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MessageComponentModule,
    TopicoPageRoutingModule
  ],
  declarations: [TopicoPage]
})
export class TopicoPageModule {}
