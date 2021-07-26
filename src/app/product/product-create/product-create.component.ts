import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../service/product/product.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Category} from '../../model/category';
import {CategoryService} from '../../service/category/category.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  productForm: FormGroup = new FormGroup({
    name: new FormControl(),
    price: new FormControl(),
    description: new FormControl(),
    category: new FormControl()
  });
  successMsg = '';
  categories: Category[] = [];

  constructor(private productService: ProductService, private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getAll().subscribe(c => {
      this.categories = c;
    }, e => {
      console.log(e);
    });
  }

  submit() {
    if (this.productForm.valid) {
      const product = this.productForm.value;
      this.productService.saveProduct(product).subscribe(() => {
        this.productForm.reset();
        this.successMsg = 'Product added';
      }, e => {
        console.log(e);
      });
    }
  }
}
