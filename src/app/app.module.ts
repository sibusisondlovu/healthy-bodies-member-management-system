import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { environment } from 'src/environments/environment';
import { AuthService } from './services/auth.service';
import { MembersComponent } from './components/members/members.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { LevelOneComponent } from './components/tree/level-one/level-one.component';
import { LevelTwoComponent } from './components/tree/level-two/level-two.component';
import { LevelThreeComponent } from './components/tree/level-three/level-three.component';
import { LevelFourComponent } from './components/tree/level-four/level-four.component';
import { LevelFiveComponent } from './components/tree/level-five/level-five.component';
import { NewOrderComponent } from './components/orders/new-order/new-order.component';
import { OrdersComponent } from './components/orders/orders.component';
import { CommissionsComponent } from './components/commissions/commissions.component';
import { ComposeComponent } from './components/messaging/compose/compose.component';
import { StatementsComponent } from './components/statements/statements.component';
import { MemberOrdersComponent } from './components/orders/member-orders/member-orders.component';
import { AddMemberComponent } from './components/members/add-member/add-member.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    MembersComponent,
    LevelOneComponent,
    LevelTwoComponent,
    LevelThreeComponent,
    LevelFourComponent,
    LevelFiveComponent,
    NewOrderComponent,
    OrdersComponent,
    CommissionsComponent,
    ComposeComponent,
    StatementsComponent,
    MemberOrdersComponent,
    AddMemberComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    NgxPaginationModule,
    FormsModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    // HttpClientModule,
    ReactiveFormsModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger', // set defaults here
    }),
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
