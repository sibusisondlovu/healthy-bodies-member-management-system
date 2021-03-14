import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.css']
})
export class AddMemberComponent implements OnInit {

  form: FormGroup;
  busy = false;
  showErrorAlert = false;
  errorMessage = '';
  showSuccessAlert = false;
  successMessage = '';
  submitButtonText = 'Submit';

  constructor(private formBuilder: FormBuilder,
              private firestore: AngularFirestore,
              private http: HttpClient ) { }

  ngOnInit() {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      referrer_name: ['', Validators.required],
      referrer_surname: ['', Validators.required],
      referrer_mobile: ['', [Validators.required, Validators.min(10)]],
      referrer_code: ['', [Validators.required, Validators.min(8)]],
      spill_over: ['', Validators.required],
      member_title: ['', Validators.required],
      member_names: ['', Validators.required],
      member_surname: ['', Validators.required],
      member_id: ['', Validators.required],
      member_country: ['', Validators.required],
      member_residential_address: ['', Validators.required],
      postal_code: ['', Validators.required],
      member_mobile: ['', [Validators.required, Validators.min(10)]],
      member_email: ['', [Validators.required, Validators.email]],
      account_holder: ['', Validators.required],
      account_number: ['', Validators.required],
      bank_name: ['', Validators.required],
      branch_name: ['', Validators.required],
      branch_code: ['', Validators.required],
      account_type: ['', Validators.required],
    });
  }

  // generate membership code
  private generateMemberCode(formData: any): void {
    const d = new Date();
    const timestamp = d.getTime();
    const code = timestamp.toString().substr(timestamp.toString().length - 5);
    formData.member_code = 'HB' + code;
    formData.status = 'Pending';
    this.createMemberDetails(formData);
  }

  private createMemberDetails(formData: any): void {
    this.firestore
      .collection('members')
      .doc(formData.member_code)
      .set(formData)
      .then(() => {
        console.log('success');
        this.initForm();

        // this.submitButtonText  = 'Submit';
        // this.showErrorAlert = false;
        // this.showSuccessAlert = true;
        this.createMemberAsParent(formData);
      })
      .catch((error) => {
        console.log(error);
        this.showErrorAlert = true;
        this.showSuccessAlert = false;
        this.busy = formData;
        this.submitButtonText  = 'Submit';
        this.errorMessage = error;
      });
  }

  private createMemberAsParent(formData: any): void {
    const parent = {
      parent_name: formData.member_names + ' ' + formData.member_surname,
      parent_code: formData.member_code
    };

    this.firestore.collection('parents')
      .doc(formData.member_code)
      .set(parent)
      .then(() => {
        this.addChildToParent(formData);
      }).catch((error) => {
      console.log(error);
      this.showErrorAlert = true;
      this.showSuccessAlert = false;
      this.busy = formData;
      this.submitButtonText  = 'Submit';
      this.errorMessage = error;
    });
  }

  private addChildToParent(formData: any): void {
    const child = {
      parent_name: formData.referrer_name,
      parent_surname : formData.referrer_surname,
      parent_code: formData.referrer_code ,
      child_name: formData.member_names,
      child_surname: formData.member_surname,
      child_code: formData.member_code,
    };
    this.firestore.collection('children')
      .doc(formData.member_code)
      .set(child)
      .then(() => {
        this.showErrorAlert = false;
        this.showSuccessAlert = true;
        this.busy = false;
        this.submitButtonText  = 'Submit';
        this.successMessage = 'Member added successfully with member code : ' + formData.member_code;
        this.sendSMS(formData);
      }).catch((error) => {
      console.log(error);
      this.showErrorAlert = true;
      this.showSuccessAlert = false;
      this.busy = formData;
      this.submitButtonText  = 'Submit';
      this.errorMessage = error;
    });

  }

  private sendSMS(formData): void {

    // clean member number
    const message = 'Welcome ' + formData.member_names + ' ' + formData.member_surname + ' to Health Bodies. Your member code is ' + formData.member_code;
    const smsGatewayUrl = 'https://platform.clickatell.com/messages/http/send?apiKey=IKUs7lgzQhWdEzs3LMxFHw==&to=' + formData.member_mobile + '&content=' + message;


    this.http.get(smsGatewayUrl)
      .subscribe((response) => {
        console.log(response);
      }, error => {
        console.log(error);
      });
  }

  submitForm(formData: any) {
    this.busy = true;
    this.submitButtonText = 'Submitting...';
    console.log( formData);
    this.generateMemberCode(formData);
  }

}
