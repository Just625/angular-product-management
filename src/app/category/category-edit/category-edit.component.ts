import {Component, OnInit} from '@angular/core';
import {Category} from '../../model/category';
import {CategoryService} from '../../service/category/category.service';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {
  categoryForm: FormGroup = new FormGroup({
    name: new FormControl()
  });
  id: number;
  successMsg = '';

  constructor(private categoryService: CategoryService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = +paramMap.get('id');
      this.getProduct();
    });
  }

  ngOnInit() {
  }

  getProduct() {
    this.categoryService.findById(this.id).subscribe(category => {
      const c: Category = category;
      this.categoryForm = new FormGroup({
        name: new FormControl(c.name)
      });
    }, e => {
      console.log(e);
    });

  }

  submit() {
    const category: Category = this.categoryForm.value;
    this.categoryService.editCategory(this.id, category).subscribe(() => {
      this.successMsg = 'Category edited!';
    }, e => {
      console.log(e);
    });
  }
}
