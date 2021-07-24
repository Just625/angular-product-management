import {Component, OnInit} from '@angular/core';
import {Category} from '../../model/category';
import {CategoryService} from '../../service/category.service';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {CategoryModule} from '../category.module';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {
  categoryForm: FormGroup;
  id: number;
  successMsg = '';

  constructor(private categoryService: CategoryService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = +paramMap.get('id');
      const category: Category = this.getProduct();
      this.categoryForm = new FormGroup({
        id: new FormControl(category.id),
        name: new FormControl(category.name)
      });
    });
  }

  ngOnInit() {
  }

  getProduct() {
    return this.categoryService.findById(this.id);
  }

  submit() {
    const category: Category = this.categoryForm.value;
    console.log(this.id);
    console.log(category);
    this.categoryService.editCategory(this.id, category);
    this.successMsg = 'Category edited!';
  }
}
