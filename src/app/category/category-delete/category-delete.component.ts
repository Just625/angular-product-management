import {Component, OnInit} from '@angular/core';
import {Category} from '../../model/category';
import {CategoryService} from '../../service/category/category.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-category-delete',
  templateUrl: './category-delete.component.html',
  styleUrls: ['./category-delete.component.css']
})
export class CategoryDeleteComponent implements OnInit {
  category: Category;
  id: number;

  constructor(private categoryService: CategoryService, private activatedRoute: ActivatedRoute, private route: Router) {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      this.id = +paramMap.get('id');
      this.getProduct();
    });
  }

  ngOnInit() {
  }

  getProduct() {
    this.categoryService.findById(this.id).subscribe(c => {
      this.category = c;
    }, e => {
      console.log(e);
    });
  }

  submit() {
    this.categoryService.deleteCategory(this.id).subscribe(() => {
      this.route.navigate(['/categories/list']);
    }, e => {
      console.log(e);
    });
  }
}
