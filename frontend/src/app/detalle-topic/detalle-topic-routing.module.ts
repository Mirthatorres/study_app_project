import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleTopicPage } from './detalle-topic.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleTopicPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleTopicPageRoutingModule {}
