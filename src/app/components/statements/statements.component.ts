import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-statements',
  templateUrl: './statements.component.html',
  styleUrls: ['./statements.component.css'],
})
export class StatementsComponent implements OnInit {
  memberCode = '';
  customer = '';
  address = '';
  commissions: Observable<any[]>;
  points = 0;
  commission = 0.0;
  resultsSize = 0;

  constructor(
    private route: ActivatedRoute,
    private firestore: AngularFirestore,
    private router: Router
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

    // this.commissions = this.firestore
    //   .collection('commissions', (ref) =>
    //     ref.where(
    //       'memberCode',
    //       '==',
    //       this.route.snapshot.paramMap.get('member_code')
    //     )
    //   )
    //   .valueChanges();

    // this.commissions.subscribe((data) => {
    //   this.resultsSize = data.length;
    //   console.log(data);
    // });
  }

  getCommissionStatementByMonth(month) {
    console.log('Commission month fired');
    this.commissions = this.firestore
      .collection('commissions', (ref) =>
        ref
          .where('member_code', '==', this.memberCode)
          .where('month', '==', month.target.value)
      )
      .valueChanges();

    this.commissions.subscribe((data) => {
      this.resultsSize = data.length;
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        this.points = this.points + data[i].points;
        this.commission = this.commission + data[i].commission_due;
      }
    });
  }
}
