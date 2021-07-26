import {Injectable} from '@angular/core';
import {Product} from '../../model/product';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(`${API_URL}/products/list`);
  }

  saveProduct(product: Product): Observable<Product> {
    product.category = {
      // @ts-ignore
      id: product.category
    };
    return this.http.post<Product>(`${API_URL}/products/create`, product);
  }


  findById(id: number): Observable<Product> {
    return this.http.get<Product>(`${API_URL}/products/${id}`);
  }


  updateProduct(id: number, product: Product): Observable<Product> {
    product.category = {
      // @ts-ignore
      id: product.category
    };
    return this.http.put<Product>(`${API_URL}/products/edit/${id}`, product);
  }


  deleteProduct(id: number): Observable<Product> {
    return this.http.delete<Product>(`${API_URL}/products/delete/${id}`);
  }
}
