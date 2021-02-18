import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-commissions',
  templateUrl: './commissions.component.html',
  styleUrls: ['./commissions.component.css'],
})
export class CommissionsComponent implements OnInit {
  commissions: Observable<any[]>;
  term = '';
  p = 1;
  resultsSize = 0;
  isBusy = false;

  constructor(private firestore: AngularFirestore) {}

  ngOnInit() {
    this.commissions = this.firestore.collection('commissions').valueChanges();
    this.commissions.subscribe((data) => {
      this.resultsSize = data.length;
      console.log(data);
    });
  }
  getCommissionByMonth(event) {
    if (event.target.value === '0') {
      this.commissions = this.firestore
        .collection('commissions')
        .valueChanges();
    } else {
      this.commissions = this.firestore
        .collection('commissions', (ref) =>
          ref.where('month', '==', event.target.value)
        )
        .valueChanges();

      this.commissions.subscribe((data) => {
        console.log(data);
      });
    }

    this.commissions.subscribe((data) => {
      this.resultsSize = data.length;
    });
  }
}
