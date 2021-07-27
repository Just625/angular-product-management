import {Component, OnInit} from '@angular/core';
import {Product} from '../../model/product';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {ProductService} from '../../service/product/product.service';
import {Category} from '../../model/category';
import {CategoryService} from '../../service/category/category.service';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {
  productForm: FormGroup = new FormGroup({
    name: new FormControl(),
    price: new FormControl(),
    description: new FormControl(),
    category: new FormControl()
  });
  id: number;
  categories: Category[] = [];
  successMsg = '';

  constructor(private productService: ProductService,
              private activatedRouted: ActivatedRoute, private categoryService: CategoryService) {
    this.activatedRouted.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = +paramMap.get('id');
      this.getProduct(this.id);
    });
  }

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getAll().subscribe(categories => this.categories = categories);
  }

  getProduct(id: number) {
    return this.productService.findById(id).subscribe(product => {
      this.productForm = new FormGroup({
          name: new FormControl(product.name),
          price: new FormControl(product.price),
          description: new FormControl(product.description),
          category: new FormControl(product.category.id)
        }
      );
    });
  }


  updateProduct(id: number) {
    const product = this.productForm.value;
    this.productService.updateProduct(id, product).subscribe(() => {
      this.successMsg = 'Product updated';
    }, e => {
      console.log(e);
    });
  }
}
