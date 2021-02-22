import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  totalMembers = 0;
  totalProducts = 0;
  totalOrders = 0;
  remainingSMSBalance = 10000;

  constructor(private http: HttpClient, private firestore: AngularFirestore) {}

  ngOnInit() {
    this.updateCounters();
  }

  updateCounters() {
    this.firestore
      .collection('members')
      .get()
      .subscribe((value) => {
        this.totalMembers = value.size;
      });

    this.firestore
      .collection('products')
      .get()
      .subscribe((value) => {
        this.totalProducts = value.size;
      });

    this.firestore
      .collection('orders')
      .get()
      .subscribe((value) => {
        this.totalOrders = value.size;
      });
  }

  sendSMS(to, message) {
    const smsGatewayUrl =
      'https://platform.clickatell.com/messages/http/send?apiKey=IKUs7lgzQhWdEzs3LMxFHw==&to=' +
      to +
      '&content=' +
      message;
    this.http.get(smsGatewayUrl).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
