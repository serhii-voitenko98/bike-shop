import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {BikesStoreService} from '../../services/bikes-store.service';
import {Bike} from '../../interfaces/bike.interface';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {faMagic, faShoppingCart} from '@fortawesome/free-solid-svg-icons';
import {Subscription} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {Order} from '../../interfaces/order.interface';
import {OrderService} from '../../services/order.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {
  bike!: Bike;
  averageOfRating!: number;
  form!: FormGroup;
  descriptionToggle = false;
  faMagic = faMagic;
  faShoppingCart = faShoppingCart;
  routeParamsSubscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private bikeStoreService: BikesStoreService,
    private orderService: OrderService
  ) {
  }

  ngOnInit(): void {
    this.initBikeByParam();
    this.calculateRating();
    this.initFormGroup();
  }

  ngOnDestroy(): void {
    this.routeParamsSubscription.unsubscribe();
  }

  initBikeByParam(): void {
    this.routeParamsSubscription = this.route.params.pipe(
      switchMap((params: Params) => {
        return this.bikeStoreService.getBikeById(+params.id);
      })
    ).subscribe((bike: Bike | undefined) => {
      this.bike = bike!;
    });
  }

  calculateRating(): void {
    const sumOfRatings = this.bike.review.reduce((acc, review) => acc + review.rating, 0);
    this.averageOfRating = sumOfRatings / this.bike.review.length;
  }

  initFormGroup(): void {
    this.form = new FormGroup({
      color: new FormControl('', Validators.required),
      size: new FormControl('', Validators.required),
      quantity: new FormControl(1, Validators.required)
    });
  }

  submit(): void {
    const newOrder: Order = {
      id: this.bike.id,
      name: this.bike.name,
      price: this.bike.discountedPrice,
      discountUntil: this.bike.discountUntil,
      imgUrl: this.bike.imgUrl,
      ...this.form.value
    };
    this.orderService.addOrder(newOrder);
  }
}
