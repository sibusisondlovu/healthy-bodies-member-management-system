import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css'],
})
export class NewOrderComponent implements OnInit {
  products: Observable<any[]>;
  showSuccessMessage = false;
  showErrorMessage = false;
  successMessage = '';
  errorMessage = '';
  orderDate = '';
  buttonText = 'Place Order';
  isBusy = false;

  // line totals (price)
  bodyRemedyLineTotal = 0;
  energyShakeLineTotal = 0;
  rollOnLineTotal = 0;
  toothpasteLineTotal = 0;
  tissueOilLineTotal = 0;
  bodyLotion250mlLineTotal = 0;
  bodyLotion500mlLineTotal = 0;
  dishwashingLiquidLineTotal = 0;
  householdCleanerLineTotal = 0;
  handSoapLiquidLineTotal = 0;
  toiletPaperLineTotal = 0;
  mealieMeal10kgLineTotal = 0;
  mealieMeal5kgLineTotal = 0;
  mealieMeal2kgLineTotal = 0;
  mealieMeal1kgLineTotal = 0;
  soup400gLineTotal = 0;
  soup200gLineTotal = 0;
  moringaMealieMeal1kg = 0;
  moringaMealieMeal2kg = 0;
  padsLineTotal = 0;
  extremeHairGrow200mlLineTotal = 0;
  miracleOil200mlLineTotal = 0;

  // line totals (points)
  bodyRemedyLinePoints = 0;
  energyShakeLinePoints = 0;
  rollOnLinePoints = 0;
  toothpasteLinePoints = 0;
  tissueOilLinePoints = 0;
  bodyLotion250mlLinePoints = 0;
  bodyLotion500mlLinePoints = 0;
  dishwashingLiquidLinePoints = 0;
  householdCleanerLinePoints = 0;
  handSoapLiquidLinePoints = 0;
  toiletPaperLinePoints = 0;
  mealieMeal10kgLinePoints = 0;
  mealieMeal5kgLinePoints = 0;
  mealieMeal2kgLinePoints = 0;
  mealieMeal1kgLinePoints = 0;
  soup400gLinePoints = 0;
  soup200gLinePoints = 0;
  moringaMealieMeal1kgLinePoints = 0;
  moringaMealieMeal2kgLinePoints = 0;
  padsLinePoints = 0;
  extremeHairGrow200mlLinePoints = 0;
  miracleOil200mlLinePoints = 0;

  bodyRemedyQty = 0;
  energyShakeQty = 0;
  rollOnLineQty = 0;
  toothpasteQty = 0;
  tissueOilQty = 0;
  bodyLotion250mlQty = 0;
  bodyLotion500mQty = 0;
  dishwashingLiquidQty = 0;
  householdCleanerQty = 0;
  handSoapLiquidQty = 0;
  toiletPaperQty = 0;
  mealieMeal10kgQty = 0;
  mealieMeal5kgQty = 0;
  mealieMeal2kgQty = 0;
  mealieMeal1kgQty = 0;
  soup400gQty = 0;
  soup200gQty = 0;
  moringaMealieMeal1kgQty = 0;
  moringaMealieMeal2kgQty = 0;
  padsQty = 0;
  extremeHairGrow200mlQty = 0;
  miracleOil200mlQty = 0;

  orderTotal = 0;
  orderPoints = 0;

  memberCode = '';
  customer = '';
  address = '';

  constructor(
    private firestore: AngularFirestore,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.memberCode = this.route.snapshot.paramMap.get('member_code');
    this.customer =
      this.route.snapshot.paramMap.get('member_names') +
      ' ' +
      this.route.snapshot.paramMap.get('member_surname');
    this.address = this.route.snapshot.paramMap.get(
      'member_residential_address'
    );

    this.calculateOrderTotal();
    this.calculateOrderPointsTotal();
  }

  calculateOrderTotal() {
    this.orderTotal =
      this.bodyRemedyLineTotal +
      this.energyShakeLineTotal +
      this.rollOnLineTotal +
      this.toothpasteLineTotal +
      this.tissueOilLineTotal +
      this.bodyLotion250mlLineTotal +
      this.bodyLotion500mlLineTotal +
      this.dishwashingLiquidLineTotal +
      this.handSoapLiquidLineTotal +
      this.handSoapLiquidQty +
      this.toiletPaperLineTotal +
      this.mealieMeal10kgLineTotal +
      this.mealieMeal5kgLineTotal +
      this.mealieMeal2kgLineTotal +
      this.mealieMeal1kgLineTotal +
      this.soup400gLineTotal +
      this.soup200gLineTotal +
      this.moringaMealieMeal1kg +
      this.moringaMealieMeal2kg +
      this.padsLineTotal +
      this.extremeHairGrow200mlLineTotal +
      this.miracleOil200mlLineTotal;

    console.log('This is the total : ' + this.orderTotal);
  }

  calculateOrderPointsTotal() {
    this.orderPoints =
      this.bodyRemedyLinePoints +
      this.energyShakeLinePoints +
      this.rollOnLinePoints +
      this.toothpasteLinePoints +
      this.tissueOilLinePoints +
      this.bodyLotion250mlLinePoints +
      this.bodyLotion500mlLinePoints +
      this.dishwashingLiquidLinePoints +
      this.handSoapLiquidLinePoints +
      this.toiletPaperLinePoints +
      this.mealieMeal10kgLinePoints +
      this.mealieMeal5kgLinePoints +
      this.mealieMeal2kgLinePoints +
      this.mealieMeal1kgLinePoints +
      this.soup400gLinePoints +
      this.soup200gLinePoints +
      this.moringaMealieMeal1kgLinePoints +
      this.moringaMealieMeal2kgLinePoints +
      this.padsLinePoints +
      this.extremeHairGrow200mlLinePoints +
      this.miracleOil200mlLinePoints;

    console.log('points : ' + this.orderPoints);
  }

  updateLineTotals(): void {
    this.bodyRemedyLineTotal = this.bodyRemedyQty * 110;
    this.energyShakeLineTotal = this.energyShakeQty * 110;
    this.rollOnLineTotal = this.rollOnLineQty * 55;
    this.toothpasteLineTotal = this.toothpasteQty * 35;
    this.tissueOilLineTotal = this.tissueOilQty * 75;
    this.bodyLotion250mlLineTotal = this.bodyLotion250mlQty * 40;
    this.bodyLotion500mlLineTotal = this.bodyLotion500mQty * 80;
    this.dishwashingLiquidLineTotal = this.dishwashingLiquidQty * 28;
    this.householdCleanerLineTotal = this.householdCleanerQty * 25;
    this.handSoapLiquidLineTotal = this.handSoapLiquidQty * 30;
    this.toiletPaperLineTotal = this.toiletPaperQty * 34;
    this.mealieMeal10kgLineTotal = this.mealieMeal10kgQty * 99;
    this.mealieMeal5kgLineTotal = this.mealieMeal5kgQty * 55;
    this.mealieMeal2kgLineTotal = this.mealieMeal2kgQty * 35;
    this.mealieMeal1kgLineTotal = this.mealieMeal1kgQty * 26;
    this.soup400gLineTotal = this.soup400gQty * 16.5;
    this.soup200gLineTotal = this.soup200gQty * 12.5;
    this.moringaMealieMeal1kg = this.moringaMealieMeal1kgQty * 40;
    this.moringaMealieMeal2kg = this.moringaMealieMeal2kgQty * 65;
    this.padsLineTotal = this.padsQty * 90;
    this.extremeHairGrow200mlLineTotal = this.extremeHairGrow200mlQty * 400;
    this.miracleOil200mlLineTotal = this.miracleOil200mlQty * 400;

    this.calculateOrderTotal();
    this.updateLinePoints();
  }

  updateLinePoints(): void {
    this.bodyRemedyLinePoints = this.bodyRemedyQty * 29;
    this.energyShakeLinePoints = this.energyShakeQty * 29;
    this.rollOnLinePoints = this.rollOnLineQty * 14;
    this.toothpasteLinePoints = this.toothpasteQty * 9;
    this.tissueOilLinePoints = this.tissueOilQty * 20;
    this.bodyLotion250mlLinePoints = this.bodyLotion250mlQty * 10;
    this.bodyLotion500mlLinePoints = this.bodyLotion500mQty * 25;
    this.dishwashingLiquidLinePoints = this.dishwashingLiquidQty * 29;
    this.householdCleanerLinePoints = this.householdCleanerQty * 6;
    this.handSoapLiquidLinePoints = this.handSoapLiquidQty * 8;
    this.toiletPaperLinePoints = this.toiletPaperQty * 9;
    this.mealieMeal10kgLinePoints = this.mealieMeal10kgQty * 26;
    this.mealieMeal5kgLinePoints = this.mealieMeal5kgQty * 17;
    this.mealieMeal2kgLinePoints = this.mealieMeal2kgQty * 9;
    this.mealieMeal1kgLinePoints = this.mealieMeal1kgQty * 7;
    this.soup400gLinePoints = this.soup400gQty * 4;
    this.soup200gLinePoints = this.soup200gQty * 3;
    this.moringaMealieMeal1kgLinePoints = this.moringaMealieMeal1kgQty * 10;
    this.moringaMealieMeal2kgLinePoints = this.moringaMealieMeal2kgQty * 15;
    this.padsLinePoints = this.padsQty * 26;
    this.extremeHairGrow200mlLinePoints = this.extremeHairGrow200mlQty * 50;
    this.miracleOil200mlLinePoints = this.miracleOil200mlQty * 50;

    this.calculateOrderPointsTotal();
  }

  submitOrder(): void {
    const d = new Date();
    const timestamp = d.getTime();
    const orderNumber =
      'ORD' + timestamp.toString().substr(timestamp.toString().length - 4);

    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = d.getFullYear();

    this.orderDate = dd + '-' + mm + '-' + yyyy;

    this.calculateOrderTotal();

    this.calculateOrderPointsTotal();

    const commission = {
      order_number: orderNumber,
      date: this.orderDate,
      member: this.customer,
      member_code: this.memberCode,
      points: this.orderPoints,
      month: mm,
      commission_due: this.orderPoints * 0.2,
    };

    const order = {
      order_number: orderNumber,
      dispatch_by: 'Office Administrator',
      customer: this.customer,
      member_code: this.memberCode,
      date: this.orderDate,
      created_at: new Date(),
      status: 'PAID',
      total: this.orderTotal,
      points: this.orderPoints,
      orderItems: [
        {
          product: 'Body Remedy',
          quantity: this.bodyRemedyQty,
          lineTotal: this.bodyRemedyLineTotal,
        },
        {
          product: 'Energy Shake',
          quantity: this.energyShakeQty,
          lineTotal: this.energyShakeLineTotal,
        },
        {
          product: 'Roll-on',
          quantity: this.rollOnLineQty,
          lineTotal: this.rollOnLineTotal,
        },
        {
          product: 'Toothpaste',
          quantity: this.toothpasteQty,
          lineTotal: this.toothpasteLineTotal,
        },
        {
          product: 'Tissue Oil',
          quantity: this.tissueOilQty,
          lineTotal: this.tissueOilLineTotal,
        },
        {
          product: 'Body Lotion 250ml',
          quantity: this.bodyLotion250mlQty,
          lineTotal: this.bodyLotion250mlLineTotal,
        },
        {
          product: 'Body Lotion 500ml',
          quantity: this.bodyLotion500mQty,
          lineTotal: this.bodyLotion500mlLineTotal,
        },
        {
          product: 'Dishwashing Liquid',
          quantity: this.dishwashingLiquidQty,
          lineTotal: this.dishwashingLiquidLineTotal,
        },
        {
          product: 'Household Cleaner',
          quantity: this.householdCleanerQty,
          lineTotal: this.householdCleanerLineTotal,
        },
        {
          product: 'Hand soap Liquid',
          quantity: this.handSoapLiquidQty,
          lineTotal: this.handSoapLiquidLineTotal,
        },
        {
          product: 'Toilet Paper',
          quantity: this.toiletPaperQty,
          lineTotal: this.toiletPaperLineTotal,
        },
        {
          product: 'Mealie Meal 10kg',
          quantity: this.mealieMeal10kgQty,
          lineTotal: this.mealieMeal10kgLineTotal,
        },
        {
          product: 'Mealie Meal 5kg',
          quantity: this.mealieMeal5kgQty,
          lineTotal: this.mealieMeal5kgLineTotal,
        },
        {
          product: 'Mealie Meal 2kg',
          quantity: this.mealieMeal2kgQty,
          lineTotal: this.mealieMeal2kgLineTotal,
        },
        {
          product: 'Mealie Meal 1kg',
          quantity: this.mealieMeal1kgQty,
          lineTotal: this.mealieMeal1kgLineTotal,
        },
        {
          product: 'Soup 400g',
          quantity: this.soup400gQty,
          lineTotal: this.mealieMeal2kgLineTotal,
        },
        {
          product: 'Soup 200g',
          quantity: this.soup200gQty,
          lineTotal: this.mealieMeal1kgLineTotal,
        },
        {
          product: 'Moringa Mealie Meal 1kg',
          quantity: this.moringaMealieMeal1kgQty,
          lineTotal: this.soup200gLineTotal,
        },
        {
          product: 'Moringa Mealie Meal 2kg',
          quantity: this.moringaMealieMeal2kgQty,
          lineTotal: this.moringaMealieMeal1kg,
        },
        {
          product: 'Pantyliners 30',
          quantity: this.bodyRemedyQty,
          lineTotal: this.moringaMealieMeal2kg,
        },
        {
          product: 'Pads',
          quantity: this.padsQty,
          lineTotal: this.padsLineTotal,
        },
        {
          product: 'Extreme Hair Grow 200ml',
          quantity: this.extremeHairGrow200mlQty,
          lineTotal: this.extremeHairGrow200mlLineTotal,
        },
        {
          product: 'Miracle Oil 200ml',
          quantity: this.miracleOil200mlQty,
          lineTotal: this.miracleOil200mlLineTotal,
        },
      ],
    };

    console.log('ORDER', order);

    this.firestore
      .collection('orders')
      .doc(orderNumber)
      .set(order)
      .then(() => {
        this.addOrderItemsToOrder(orderNumber, commission);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  addOrderItemsToOrder(orderNumber: any, commission): void {
    this.isBusy = true;
    this.buttonText = 'Processing order...';

    const orderItems = {};
    this.firestore
      .collection('orderItems')
      .doc(orderNumber)
      .set(orderItems)
      .then(() => {
        this.firestore
          .collection('commissions')
          .doc(orderNumber)
          .set(commission)
          .then((data) => {
            this.toastr.success('Order Number: ' + orderNumber + ' completed. ', 'Success');
            this.router.navigateByUrl('/orders');
          })
          .catch((error) => {
            console.log(error);
            this.toastr.error(error, 'Error Occurred.');
          });


        // this.router.navigateByUrl('/orders');
        // close and redirect to orders list page
      })
      .catch((error) => {
        console.log(error);
        this.isBusy = false;
        this.buttonText = 'Re-Submit';
        this.showErrorMessage = true;
      });
  }
}
