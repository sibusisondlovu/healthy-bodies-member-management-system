import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-compose',
  templateUrl: './compose.component.html',
  styleUrls: ['./compose.component.css'],
})
export class ComposeComponent implements OnInit {
  members: Observable<any[]>;
  membersList = [];

  constructor(private firestore: AngularFirestore) {}

  async ngOnInit() {
    this.members = this.firestore.collection('members').valueChanges();
    await this.members.subscribe((data) => {
      this.membersList = data;
      console.log('I will be printed first');
    });
  }

  sendSMSToMembers(event) {
    for (let i = 0; i < this.membersList.length; i++) {
      var to = this.membersList[i].member_mobile;
      console.log('This number need formating : ' + to);
    }
  }
}
