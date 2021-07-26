import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../../service/category/category.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Category} from '../../model/category';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent implements OnInit {
  categoryForm: FormGroup = new FormGroup({
    id: new FormControl(),
    name: new FormControl()
  });
  successMsg = '';

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit() {
  }

  submit() {
    const category: Category = this.categoryForm.value;
    this.categoryService.saveCategory(category).subscribe(() => {
      // alert('Category added');
      this.categoryForm.reset();
      this.successMsg = 'New category created!';
    }, e => {
      console.log(e);
    });
  }
}
