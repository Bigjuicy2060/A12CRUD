import { ActivatedRoute, Route, Router } from '@angular/router';
import { CrudService } from './../crud.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-productfrom',
  templateUrl: './productfrom.component.html',
  styleUrls: ['./productfrom.component.css']
})
export class ProductfromComponent implements OnInit {

  productFrom!: FormGroup;
  productId: any;
  buttonText = 'Create Product';
  
  constructor(private crudService : CrudService,private formBuilder : FormBuilder, private router : Router,private activatedRoute:ActivatedRoute ) { }

  ngOnInit(): void {
    this.createProductFrom();
    let productId = '';
    if(this.activatedRoute.snapshot.params['productId']){
       productId = this.activatedRoute.snapshot.params['productId'];
       if(productId !== ''){
        this.loadProductDetails(productId);
       }

    }
  }

createProductFrom(){

  this.productFrom = this.formBuilder.group({
'name':['', Validators.compose([Validators.required, Validators.minLength(3),Validators.maxLength(50)])],
'description':['',Validators.compose([Validators.required, Validators.minLength(3),Validators.maxLength(500)])],
'price':['',Validators.compose([Validators.required, Validators.minLength(1),Validators.maxLength(8)])]

  });
}
createProduct(values:any, ){
  let formData = new FormData();
  formData.append('name',values.name);
  formData.append('description',values.description);
  formData.append('price',values.price);
  if(this.productId){
    formData.append('id',this.productId);
    this.crudService.updateProductDetails(formData).subscribe(res => {if(res.result === 'success'){
      this.navigateTo('/product-list');
    }});
  }else
  {
    this.crudService.createProduct(formData).subscribe(res => {
      if(res.result === 'success'){
        this.navigateTo('/product-list');
      }
    });
  }
}
loadProductDetails(productId:any){
  this.buttonText = 'Update Product';
  this.crudService.loadProductInfo(productId).subscribe(res => {
    this.productFrom.controls['name'].setValue(res.p_name);
    this.productFrom.controls['description'].setValue(res.p_description);
    this.productFrom.controls['price'].setValue(res.p_price);
    this.productId = res.p_id;
  });
}
navigateTo(route :any){
  this.router.navigate([route]);  
}
}
