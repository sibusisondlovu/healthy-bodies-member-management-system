import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    public authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private afAuth: AngularFireAuth,
    private as: AuthService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  get f() {
    return this.loginForm.controls;
  }

  initForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(formData) {
    //this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    //this.spinner.show();

    this.afAuth
      .signInWithEmailAndPassword(
        formData.email.trim(),
        formData.password.trim()
      )
      .then((response) => {
        console.log(response);
        this.as.currentUser = response.user;
        // update menu here
        // this.spinner.hide();
        this.router.navigateByUrl('dashboard');
      })
      .catch((error) => {
        console.log(error);
        //this.loading = false;
        //this.spinner.hide();
        //this.toastr.error(error.message, 'Could Not Login');
        alert(error.message);
      });
  }
}
