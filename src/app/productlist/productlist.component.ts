import { CrudService } from './../crud.service';
import { Component, OnInit } from '@angular/core';
// import { ColDef } from 'ag-grid-community/dist/lib/main';
import { ColDef } from 'ag-grid-community';
import { Route, Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent implements OnInit {

  columnDefs: ColDef[] = [
    { field: 'p_name', headerName: ' Name', sortable: true, headerClass: 'header-cell' },
    { field: 'p_description', headerName: ' Desc', sortable: true, headerClass: 'header-cell' },
    { field: 'p_price', headerName: 'Price', sortable: true, headerClass: 'header-cell',cellRenderer:this.priceCellRender.bind(this) },
    { field: '', headerName: 'Actions', headerClass: 'header-cell', cellRenderer: this.actionRender.bind(this), width: 250 }
  ];

  rowData: any = [];
gridOptions={
  rowHeight:50};
  productList: any = [];
  productListSubscribe: any;

  constructor(private crudService: CrudService, private router :Router ) { }

  ngOnInit(): void {
    this.getProductList();
  }

  getProductList() {
    this.productListSubscribe = this.crudService.loadProducts().subscribe((res: any) => {
      this.productList = res;
      this.rowData = res;
    })
  }
  actionRender(params: any) {

    let div = document.createElement('div');
    let htmlCode = '<button type="button" class="btn btn-success" > View </button>\n'+ 
      '<button type = "button" class="btn btn-danger"> Delete </button>\n' + 
        '<button type = "button" class="btn btn-warning"> Edit </button>'
      div.innerHTML = htmlCode;
//VIEW button
let viewButton = div.querySelector('.btn-success');
viewButton?.addEventListener('click',() =>{
this.viewProductDetails(params);
});

//Edit button
let editButton   = div.querySelector('.btn-warning');
editButton?.addEventListener('click',() =>{
this.editProductDetails(params);
});
//DElete button
let deleteButton   = div.querySelector('.btn-danger');
deleteButton?.addEventListener('click',() =>{
this.deleteProduct(params);
})
        return div; 
  }

  viewProductDetails(params: any){
    this.router.navigate(['/view-product-details/' + params.data.p_id])

  }
editProductDetails(params:any){
  this.router.navigate(['/update-product/' + params.data.p_id])
}


deleteProduct(params:any){
  const that= this;
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result: any) => {
    if (result.isConfirmed) {
      that.crudService.deleteProduct(params.data.p_id).subscribe(res =>{
        if(res.result === 'success'){
          this.getProductList();
           Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
           );
        }
        
      });
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
    }
  });
  

}

priceCellRender(params:any){
  return '$' + params.data.p_price;
}

}
