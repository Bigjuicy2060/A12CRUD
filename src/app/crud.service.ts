import { observable } from './../../node_modules/ngx-sweetalert2/node_modules/rxjs/src/symbol/observable';
import { HttpResponse } from './http-response';
import { environment } from './../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private httpClient : HttpClient) { }
loadProducts(){

  const url = environment.API_EndPoint + 'view.php';
  return this.httpClient.get(url).pipe(map((data: any) => data));
}

createProduct(data:any): Observable<HttpResponse>{
  const url = environment.API_EndPoint + 'create.php';
  return this.httpClient.post<HttpResponse>(url , data).pipe(map((data: any) => data));
}
loadProductInfo(productId:any): Observable<Product>{
  const url = environment.API_EndPoint + 'view_one.php?id=' + productId;
  return this.httpClient.get<Product>(url).pipe(map(data => data));

}

updateProductDetails(data:any): Observable<HttpResponse>{
  const url = environment.API_EndPoint + 'update.php';
  return this.httpClient.post<HttpResponse>(url,data).pipe(map(data => data));

}
deleteProduct(productId: any): Observable<HttpResponse>{
  const url = environment.API_EndPoint + 'delete.php?id=' + productId;
  return this.httpClient.get<HttpResponse>(url).pipe(map(data => data));

} 
}

