import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { CartFormComponent } from './cart/cart-form/cart-form.component';
import { CartListComponent } from './cart/cart-list/cart-list.component';


@NgModule({
  declarations: [

  
    CartFormComponent,
         CartListComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
