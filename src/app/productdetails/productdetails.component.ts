import { Product } from './../product';
import { ActivatedRoute } from '@angular/router';
import { CrudService } from './../crud.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})
export class ProductdetailsComponent implements OnInit {
  productDetails!: Product;

  constructor(private crudService:CrudService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    let productId = '';
    if(this.activatedRoute.snapshot.params['productId']){
       productId = this.activatedRoute.snapshot.params['productId'];
       if(productId !== ''){
        this.loadProductDetails(productId);
       }

    }
  }
  loadProductDetails(productId:any){
    this.crudService.loadProductInfo(productId).subscribe(res => {
      this.productDetails =  res;
    });
  }
}
