import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxConfirmBoxService } from 'ngx-confirm-box';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
})
export class MembersComponent implements OnInit {
  members: Observable<any[]>;
  member: any;
  term = '';
  p = 1;

  editMemberDetailsForm: FormGroup;

  isBusy = false;
  isSending = false;
  buttonText = 'Update';
  sendSmsForm: FormGroup;
  showSuccessAlert = false;
  showErrorAlert = false;
  showErrorSmsAlert = false;
  showSuccessSmsAlert = false;
  successMessage = '';
  errorMessage = '';

  //confirmation dialog
  popoverTitle = 'Delete Member';
  popoverMessage = 'Are you sure you want to delete this member';
  confirmClicked = false;
  cancelClicked = false;
  confirmText = 'Yes <i class="fas fa-check"></i>';
  cancelText = 'No <i class="fas fa-times"></i>';

  constructor(
    private firestore: AngularFirestore,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private confirmBox: NgxConfirmBoxService
  ) {}

  ngOnInit() {
    this.initForm();
    this.initSendSmsForm();
    this.members = this.firestore.collection('members').valueChanges();
  }

  loadMemberDetails(formData: any) {
    this.member = formData;
    console.log(this.member);
    this.editMemberDetailsForm = this.formBuilder.group({
      member_code: [this.member.member_code, Validators.required],
      referrer_name: [this.member.referrer_name, Validators.required],
      referrer_surname: [this.member.referrer_surname, Validators.required],
      referrer_mobile: [
        this.member.referrer_mobile,
        [Validators.required, Validators.min(10)],
      ],
      referrer_code: [
        this.member.referrer_code,
        [Validators.required, Validators.min(8)],
      ],
      spill_over: [this.member.spill_over, Validators.required],
      member_title: [this.member.member_title, Validators.required],
      member_names: [this.member.member_names, Validators.required],
      member_surname: [this.member.member_surname, Validators.required],
      member_id: [this.member.member_id, Validators.required],
      member_country: [this.member.member_country, Validators.required],
      member_residential_address: [
        this.member.member_residential_address,
        Validators.required,
      ],
      postal_code: [this.member.postal_code, Validators.required],
      member_mobile: [
        this.member.member_mobile,
        [Validators.required, Validators.min(10)],
      ],
      member_email: [
        this.member.member_email,
        [Validators.required, Validators.email],
      ],
      account_holder: [this.member.account_holder, Validators.required],
      account_number: [this.member.account_number, Validators.required],
      bank_name: [this.member.bank_name, Validators.required],
      branch_name: [this.member.branch_name, Validators.required],
      branch_code: [this.member.branch_code, Validators.required],
    });
  }
  private initForm(): void {
    this.editMemberDetailsForm = this.formBuilder.group({
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
    });
  }

  private initSendSmsForm(): void {
    this.sendSmsForm = this.formBuilder.group({
      message: ['', Validators.required],
    });
  }

  updateMemberDetails(formData: any): void {
    this.isBusy = true;
    this.buttonText = 'Updating';
    console.log(formData);
    this.firestore
      .collection('members')
      .doc(formData.member_code)
      .update(formData)
      .then((response) => {
        this.showSuccessAlert = true;
        this.successMessage = 'Details updated successfully';
        this.isBusy = false;
        this.showErrorAlert = false;
      })
      .catch((error) => {
        this.showSuccessAlert = false;
        this.errorMessage = error.message;
        this.isBusy = false;
        this.showErrorAlert = true;
      });
  }

  deleteMember(memberCode: any): void {
    this.firestore.collection('members').doc(memberCode).delete();
  }

  activateMember(member: any): void {
    const memberStatus = 'Paid';

    this.firestore
      .collection('members')
      .doc(member.member_code)
      .update({ status: memberStatus })
      .then(() => {
        this.sendActivationSms(member);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  private sendActivationSms(member): void {
    // tslint:disable-next-line:max-line-length
    const message =
      'Hi ' +
      member.member_names +
      ' ' +
      member.member_surname +
      ', thank you for payment. Your Healthy Bodies account has been activated. Your login details are as follows : Username: ' +
      member.email +
      ' and Password: HB@1234567';
    // tslint:disable-next-line:max-line-length
    const smsGatewayUrl =
      'https://platform.clickatell.com/messages/http/send?apiKey=IKUs7lgzQhWdEzs3LMxFHw==&to=' +
      member.member_mobile +
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

  sendSmsToMember(formData): void {
    this.isSending = true;
    console.log(formData);
    const smsGatewayUrl =
      'https://platform.clickatell.com/messages/http/send?apiKey=IKUs7lgzQhWdEzs3LMxFHw==&to=' +
      formData.cellphone_number +
      '&content=' +
      formData.message;

    this.http.get(smsGatewayUrl).subscribe(
      (response) => {
        console.log(response);
        this.initSendSmsForm();
        this.isSending = false;
        this.showSuccessSmsAlert = true;
        this.showErrorSmsAlert = false;
      },
      (error) => {
        console.log(error);
        this.isSending = false;
        this.showSuccessSmsAlert = true;
        this.showErrorSmsAlert = false;
      }
    );
  }
}
