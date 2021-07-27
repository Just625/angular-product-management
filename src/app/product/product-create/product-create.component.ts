import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../service/product/product.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Category} from '../../model/category';
import {CategoryService} from '../../service/category/category.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';

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
  selectedImage = null;
  imgSrc = '';

  constructor(private storage: AngularFireStorage, private productService: ProductService, private categoryService: CategoryService) {
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

  uploadFile() {
    if (this.selectedImage != null) {
      // Tách ra lấy tên ảnh
      // console.log(this.selectedImage.name.split('.').slice(0, -1).join('.'));
      const filePath = `${this.selectedImage.name.split('.').slice(0, -1).join('.')}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(url => {
            console.log(url);
            this.imgSrc = url;
          });
        })).subscribe();
    }
  }

  showPreview(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = event.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
      this.uploadFile();
    } else {
      this.selectedImage = null;
    }
  }

  print(a) {
    console.log(a);
  }
}
