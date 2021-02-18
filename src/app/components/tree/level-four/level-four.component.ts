import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-level-four',
  templateUrl: './level-four.component.html',
  styleUrls: ['./level-four.component.css'],
})
export class LevelFourComponent implements OnInit {
  children: Observable<any[]>;
  memberCode;
  resultsSize = 0;
  constructor(
    private firestore: AngularFirestore,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.memberCode = this.route.snapshot.paramMap.get('memberCode');

    this.getMemberReferrals(this.memberCode);
  }

  private getMemberReferrals(memberCode: any): void {
    this.children = this.firestore
      .collection('children', (ref) =>
        ref.where('parent_code', '==', memberCode)
      )
      .valueChanges();

    this.children.subscribe((data) => {
      this.resultsSize = data.length;
    });
  }
}
