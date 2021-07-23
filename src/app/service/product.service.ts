import {Injectable} from '@angular/core';
import {Product} from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productList: Product[] = [{
    id: 1,
    name: 'Iphone 12',
    price: 24000000,
    description: 'New'
  }, {
    id: 2,
    name: 'IPhone 11',
    price: 1560000,
    description: 'Like new'
  }, {
    id: 3,
    name: 'IPhone X',
    price: 968000,
    description: '97%'
  }, {
    id: 4,
    name: 'IPhone 8',
    price: 7540000,
    description: '98%'
  }, {
    id: 5,
    name: 'IPhone 11 Pro',
    price: 1895000,
    description: 'Like new'
  }];

  constructor() {
  }

  getAll() {
    return this.productList;
  }

  saveProduct(product) {
    this.productList.push(product);
  }

  findById(id: number) {
    for (let product of this.productList) {
      if (product.id === id) {
        return product;
      }
    }
  }

  updateProduct(id: number, product: Product) {
    for (let i = 0; i < this.productList.length; i++) {
      if (this.productList[i].id === id) {
        this.productList[i] = product;
        break;
      }
    }
  }

  deleteProduct(id: number) {
    this.productList = this.productList.filter(product => product.id !== id);
  }
}
