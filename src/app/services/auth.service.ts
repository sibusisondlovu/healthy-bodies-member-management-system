import { Injectable, NgZone } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser = null;

  constructor(public fireAuth: AngularFireAuth) {
    this.authStatusListener();
  }

  private authStatusSub = new BehaviorSubject(this.currentUser);
  currentAuthStatus = this.authStatusSub.asObservable();

  authStatusListener() {
    this.fireAuth.onAuthStateChanged((credential) => {
      if (credential) {
        console.log(credential);
        this.authStatusSub.next(credential);
        console.log('User is logged in');
      } else {
        this.authStatusSub.next(null);
        console.log('User is logged out');
      }
    });
  }

  signIn(email: string, password: string) {
    return this.fireAuth
      .signInWithEmailAndPassword(email, password)
      .then((res) => console.log('Logged in'))
      .catch((err) => console.log(err));
  }

  signOut() {
    return this.fireAuth.signOut();
  }
}
