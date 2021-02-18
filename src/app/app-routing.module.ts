import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommissionsComponent } from './components/commissions/commissions.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { MembersComponent } from './components/members/members.component';
import { ComposeComponent } from './components/messaging/compose/compose.component';
import { MemberOrdersComponent } from './components/orders/member-orders/member-orders.component';
import { NewOrderComponent } from './components/orders/new-order/new-order.component';
import { OrdersComponent } from './components/orders/orders.component';
import { StatementsComponent } from './components/statements/statements.component';
import { LevelFiveComponent } from './components/tree/level-five/level-five.component';
import { LevelFourComponent } from './components/tree/level-four/level-four.component';
import { LevelOneComponent } from './components/tree/level-one/level-one.component';
import { LevelThreeComponent } from './components/tree/level-three/level-three.component';
import { LevelTwoComponent } from './components/tree/level-two/level-two.component';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    //canActivate: [AuthGuard],
  },
  {
    path: 'members',
    component: MembersComponent,
    //canActivate: [AuthGuard],
  },
  {
    path: 'level-one/:memberCode',
    component: LevelOneComponent,
    //canActivate: [AuthGuard],
  },
  {
    path: 'level-two/:memberCode',
    component: LevelTwoComponent,
    //canActivate: [AuthGuard],
  },
  {
    path: 'level-three/:memberCode',
    component: LevelThreeComponent,
    //canActivate: [AuthGuard],
  },
  {
    path: 'level-four/:memberCode',
    component: LevelFourComponent,
    //canActivate: [AuthGuard],
  },
  {
    path: 'level-five/:memberCode',
    component: LevelFiveComponent,
    //canActivate: [AuthGuard],
  },
  {
    path: 'orders',
    component: OrdersComponent,
    //canActivate: [AuthGuard],
  },
  {
    path: 'orders/order',
    component: NewOrderComponent,
    //canActivate: [AuthGuard],
  },
  {
    path: 'member-orders',
    component: MemberOrdersComponent,
    //canActivate: [AuthGuard],
  },
  {
    path: 'commissions',
    component: CommissionsComponent,
    //canActivate: [AuthGuard],
  },
  {
    path: 'compose-sms',
    component: ComposeComponent,
    //canActivate: [AuthGuard],
  },
  {
    path: 'statements',
    component: StatementsComponent,
    //canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
