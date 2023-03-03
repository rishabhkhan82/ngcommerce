import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firebaseConfig } from '../app-config';
import { productAdding } from '../user-type/admin/admin-layout/add-product/add-product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  apiKey = firebaseConfig.databaseURL;

  constructor(private http : HttpClient) {

  }

  onAddProduct(productData:{}) {
    return this.http.post<productAdding>(`${this.apiKey}/products.json`, productData); 
  }

}
