import {Injectable} from '@angular/core';
import {Category} from '../model/category';
import {CategoryModule} from '../category/category.module';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  categoryList: Category[] = [{
    id: 1,
    name: 'IPhone'
  }, {
    id: 2,
    name: 'Samsung',
  }, {
    id: 3,
    name: 'LG',
  }
  ];

  constructor() {
  }

  getAll() {
    return this.categoryList;
  }

  saveCategory(category: CategoryModule) {
    this.categoryList.push(category);
  }

  editCategory(id: number, category: Category) {
    for (let i = 0; i < this.categoryList.length; i++) {
      if (this.categoryList[i].id === id) {
        this.categoryList[i] = category;
        break;
      }
    }
  }

  findById(id: number) {
    for (let item of this.categoryList) {
      if (item.id === id) {
        return item;
      }
    }
  }

  deleteCategory(id: number) {
    this.categoryList = this.categoryList.filter(category => category.id !== id);
  }
}
