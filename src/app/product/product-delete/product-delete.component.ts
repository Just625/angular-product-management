import {Component, OnInit} from '@angular/core';
import {Product} from '../../model/product';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {ProductService} from '../../service/product.service';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {
  id: number;
  product: Product;

  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.activatedRoute.paramMap.subscribe(
      (paramMap: ParamMap) => {this.id = +paramMap.get('id'); console.log(paramMap); });
    this.product = this.productService.findById(this.id);
  }

  ngOnInit() {
  }

  deleteProduct() {
    this.productService.deleteProduct(this.id);
    this.router.navigate(['/products']);
  }
}
