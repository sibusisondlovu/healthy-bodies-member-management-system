import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-member-orders',
  templateUrl: './member-orders.component.html',
  styleUrls: ['./member-orders.component.css'],
})
export class MemberOrdersComponent implements OnInit {
  orders: Observable<any[]>;
  order: any;
  noRecords = true;
  p = 1;
  term = '';
  resultSize = 0;

  constructor(
    private firestore: AngularFirestore,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const memberCode = this.route.snapshot.paramMap.get('member_code');
    console.log(memberCode);
    this.fetchMemberProducts(memberCode);
  }

  fetchMemberProducts(memberCode) {
    this.orders = this.firestore
      .collection('orders', (ref) => ref.where('member_code', '==', memberCode))
      .valueChanges((response) => {
        if (response.length === 0) {
          this.noRecords = true;
        }
      });
  }
}
