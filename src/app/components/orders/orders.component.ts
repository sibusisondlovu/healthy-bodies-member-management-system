import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  orders: Observable<any[]>;
  orderItems = [];
  isBusy = false;
  buttonText = 'Update';
  order: any;
  editOrder: FormGroup;
  showSuccessAlert = false;
  showErrorAlert = false;
  successMessage = '';
  errorMessage = '';
  p = 1;
  term = '';
  currentOrderNumber;
  orderDay;
  orderMonth;
  orderYear;
  popoverTitle = 'Delete Order';
  popoverMessage = 'Are you sure you want to delete this order';
  confirmClicked = false;
  cancelClicked = false;
  confirmText = 'Yes <i class="fas fa-check"></i>';
  cancelText = 'No <i class="fas fa-times"></i>';

  bodyRemedyLineTotal = 0;

  constructor(
    private firestore: AngularFirestore,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    // this.initForm();
    this.orders = this.firestore
      .collection('orders', (ref) => ref.orderBy('created_at', 'asc'))
      .valueChanges();
    this.orders.subscribe((data: any) => {
      this.orderItems = data[0].orderItems;
    });
  }

  loadOrderDetails(order: any): any {}

  editOrderDate(orderNumber) {
    this.currentOrderNumber = orderNumber;
  }

  updateOrderDate() {
    this.firestore
      .collection('orders')
      .doc(this.currentOrderNumber)
      .update({
        date: this.orderDay + '-' + this.orderMonth + '-' + this.orderYear,
      })
      .then(() => {
        console.log('Order date updated successfully');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteOrder(orderNumber: any): void {}
}
