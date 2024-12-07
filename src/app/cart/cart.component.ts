import { Component, inject } from '@angular/core';
import { ProductService } from '../pages/service/product.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  
  isLoader: boolean = true;
  categoryList = ['chair', 'Dextop Publishing', 'sofa', 'Armchair', 'Barrel Chair ', 'Deck Chair', 'Folding Chair'];
  productList = [
    { productId: 1, rating: 3, isOffer: false, productName: 'Ergonomic Office Chair', category: 'chair', price: 10000, discount: 25, availableQty: 3, imageUrl: '../assets/images/furniture_img1.jpg' },
    { productId: 2, rating: 1, isOffer: false, productName: 'Classic Wooden Chair', category: 'chair', price: 1250, discount: 20, availableQty: 0, imageUrl: '../assets/images/furniture_img2.jpg' },
    { productId: 3, rating: 2, isOffer: true, productName: 'Toshiba Executive Chair', category: 'chair', price: 34000, discount: 30, availableQty: 5, imageUrl: '../assets/images/furniture_img3.jpg' },
    { productId: 4, rating: 5, isOffer: false, productName: 'Premium Recliner', category: 'Dextop Publishing', price: 7600, discount: 5, availableQty: 0, imageUrl: '../assets/images/furniture_img4.jpg' },
    { productId: 5, rating: 3, isOffer: true, productName: 'Luxury Office Chair', category: 'Dextop Publishing', price: 5700, discount: 65, availableQty: 2, imageUrl: '../assets/images/furniture_img5.jpg' },
    { productId: 6, rating: 1, isOffer: false, productName: 'I-Wide Sofa', category: 'sofa', price: 12360, discount: 23, availableQty: 8, imageUrl: '../assets/images/furniture_img6.jpg' },
    { productId: 7, rating: 3, isOffer: true, productName: 'HP P-Series Office Chair', category: 'chair', price: 34500, discount: 53, availableQty: 3, imageUrl: '../assets/images/furniture_insta1.jpg' },
    { productId: 8, rating: 2, isOffer: false, productName: 'Sony T-RT Deck Chair', category: 'Deck Chair', price: 23000, discount: 60, availableQty: 0, imageUrl: '../assets/images/furniture_insta2.jpg' },
    { productId: 9, rating: 5, isOffer: true, productName: 'Sony Luxury Armchair', category: 'Armchair', price: 43200, discount: 21, availableQty: 1, imageUrl: '../assets/images/furniture_insta3.jpg' },
    { productId: 10, rating: 1, isOffer: false, productName: 'Boat Max-250 Barrel Chair ', category: 'Barrel Chair ', price: 3000, discount: 32, availableQty: 2, imageUrl: '../assets/images/furniture_insta4.jpg' },
    { productId: 11, rating: 2, isOffer: false, productName: 'Lenovo 32 Sofa', category: 'sofa', price: 5700, discount: 24, availableQty: 4, imageUrl: '../assets/images/furniture_insta5.jpg' },
    { productId: 12, rating: 4, isOffer: true, productName: 'JBL 500 Barrel Chair ', category: 'Barrel Chair ', price: 3560, discount: 54, availableQty: 7, imageUrl: '../assets/images/furniture_insta6.jpg' },
    { productId: 13, rating: 3, isOffer: false, productName: 'Samsung 012 Armchair', category: 'Armchair', price: 3200, discount: 62, availableQty: 2, imageUrl: '../assets/images/furniture_img5.jpg' },
    { productId: 14, rating: 2, isOffer: false, productName: 'Dell Asp-343 Office Chair', category: 'chair', price: 67000, discount: 15, availableQty: 8, imageUrl: '../assets/images/furniture_img4.jpg' }
  ];

  filteredProducts: any[] = [];
  selectedCategory: string = '';
  isCartVisiable: boolean = false;
  cartItems: any[] = [];
  totalAmount: number = 0;
  productService = inject(ProductService);

  constructor() {
    setTimeout(() => {
      this.isLoader = false;
    }, 1000);
    this.filteredProducts = this.productList;

    this.productService.onAddToCart$.subscribe((res: any) => {
      this.cartItems.unshift(res);
      this.calculateAmount();
    });
  }

  filterCategor(category: string) {
    this.isLoader = true;
    if (this.selectedCategory === category) {
      this.selectedCategory = '';
      this.filteredProducts = this.productList;
    } else {
      this.selectedCategory = category;
      const products = this.productList.filter(prod => prod.category === category);
      this.filteredProducts = products;
    }
    setTimeout(() => {
      this.isLoader = false;
    }, 500);
  }

  showCart() {
    this.isCartVisiable = !this.isCartVisiable;
  }

  getDiscountedPrice(product: any) {
    const totalValue = product.price * ((100 - product.discount) / 100);
    return totalValue.toFixed(0);
  }

  calculateAmount() {
    this.totalAmount = 0;
    this.cartItems.forEach(product => {
      this.totalAmount += product.price * ((100 - product.discount) / 100);
    });
  }

  removeProduct(index: number) {
    this.cartItems.splice(index, 1);
    this.calculateAmount();
  }
}
