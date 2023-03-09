import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firebaseConfig } from '../app-config';
import { productAdding } from '../user-type/admin/admin-layout/add-product/add-product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  apiKey = firebaseConfig.databaseURL;

  constructor(
    private http : HttpClient
    ) {

  }

  onAddProduct(productData:{}) {
    return this.http.post<productAdding>(`${this.apiKey}/products.json`, productData); 
  }

  onGetProduct() {
    return this.http.get<productAdding>(`${this.apiKey}/products.json`);
  }

  onDeleteProduct(id:any) {
    return this.http.delete(`${this.apiKey}/products/${id}.json`);
  }

  onProductEdit(prodId:any,prodData:{}) {
    return this.http.put<productAdding>(`${this.apiKey}/products/${prodId}.json`, prodData);
  }

  getSingleData(id:any) {
    return this.http.get<productAdding>(`${this.apiKey}/products/${id}.json`);
  }

}
