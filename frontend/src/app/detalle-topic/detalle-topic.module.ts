import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DetalleTopicPage } from './detalle-topic.page';

import { IonicModule } from '@ionic/angular';

import { DetalleTopicPageRoutingModule } from './detalle-topic-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleTopicPageRoutingModule
  ],
  declarations: [DetalleTopicPage]
})
export class DetalleTopicPageModule {}
