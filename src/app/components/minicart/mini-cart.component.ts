import {Component, OnInit} from '@angular/core';
import {OrderService} from '../../modules/order/order.service';
import {CurrencyService} from '../../services/currency.service';

@Component({
  selector: 'app-minicart',
  templateUrl: './mini-cart.component.html',
  styleUrls: ['./mini-cart.component.scss']
})
export class MiniCartComponent implements OnInit {
  constructor(
    public orderService: OrderService,
    public currencyService: CurrencyService
  ) {}

  ngOnInit(): void {}
}
