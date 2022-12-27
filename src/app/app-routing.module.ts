import { ProductlistComponent } from './productlist/productlist.component';
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductfromComponent } from './productfrom/productfrom.component';

const routes: Routes = [
  {path: '', redirectTo: 'product-list',pathMatch:'full'},
  {path: 'product-list',component:ProductlistComponent},
  {path: 'create-product',component:ProductfromComponent},
  {path: 'update-product/:productId',component:ProductfromComponent},
  {path: 'view-product-details/:productId',component:ProductdetailsComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
