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
      (paramMap: ParamMap) => {
        this.id = +paramMap.get('id');
        this.getProduct();
      });
  }

  ngOnInit() {
  }

  getProduct() {
    this.productService.findById(this.id).subscribe(product => {
      this.product = product;
    });
  }

  deleteProduct() {
    this.productService.deleteProduct(this.id).subscribe(() => {
        this.router.navigate(['/products/list']);
      }, e => {
        console.log(e);
      }
    );
  }
}
