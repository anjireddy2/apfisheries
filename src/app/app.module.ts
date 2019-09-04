import { NgModule }             from '@angular/core';
import { BrowserModule }        from '@angular/platform-browser';
import { FormsModule }          from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './one-portal/user/login/login.component';
import { ForgotpasswordComponent } from './one-portal/user/forgotpassword/forgotpassword.component';
import { NewLoginComponent } from './one-portal/user/new-login/new-login.component';
import { DashboardComponent } from './one-portal/dashboard/dashboard/dashboard.component';
import { UserregComponent } from './one-portal/dashboard/userreg/userreg.component';
import { FishermanComponent } from './one-portal/dashboard/fisherman/fisherman.component';
import { UserregService } from './one-portal/dashboard/userreg.service';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgxPaginationModule} from 'ngx-pagination';
import { BeneficiaryComponent } from './one-portal/dashboard/beneficiary/beneficiary.component';
import { VesselRegistrationComponent } from './one-portal/dashboard/vessel-registration/vessel-registration.component';
import { AddnewVesselComponent } from './one-portal/dashboard/addnew-vessel/addnew-vessel.component';
import { NewVesselRegistrationComponent } from './one-portal/dashboard/new-vessel-registration/new-vessel-registration.component';
import { EditvesselComponent } from './one-portal/dashboard/editvessel/editvessel.component';  
import { ReactiveFormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule, MatInputModule, MatNativeDateModule } from '@angular/material';
// import { APP_DATE_FORMATS, AppDateAdapter } from './one-portal/dashboard/addnew-vessel/date.adapter'; NativeDateAdapter , DateAdapter, MAT_DATE_FORMATS
import { SocietyRegistrationComponent } from './one-portal/dashboard/society-registration/society-registration.component';
// import { AppDateAdapter, APP_DATE_FORMATS} from '';
import { NgxSpinnerModule } from "ngx-spinner";
import { SocietyAddMembersComponent } from './one-portal/dashboard/society-add-members/society-add-members.component';
import { SocietyListComponent } from './one-portal/dashboard/society-list/society-list.component';
 import { HashLocationStrategy, LocationStrategy } from '@angular/common';






const appRoutes: Routes = [
  // { path: 'registration', component: RegistrationComponent },
  // { path: 'login',      component: LoginComponent },
  // { path: 'forgot',      component: ForgotpasswordComponent },
  // { path: 'newlogin',      component: NewLoginComponent },
  { path: '', redirectTo: 'newlogin/login', pathMatch: 'full' },
  {
      path: 'newlogin', component: NewLoginComponent, children: [
        
        {
          path: 'login',
          component: LoginComponent,
        }
      ]
    },
    { path: 'forgot', component: ForgotpasswordComponent },
    { path: 'dashboard', component: DashboardComponent , children: [
      {
        path: 'userreg',
        component: UserregComponent,
      },
      {
        path: 'fisherman',
        component: FishermanComponent,
      },
      
      {
        path: 'beneficiary',
        component: BeneficiaryComponent,
      },
      {
        path: 'vessel_registration',
        component: VesselRegistrationComponent,
      },
      {
        path: 'addnew_vessel',
        component: AddnewVesselComponent,
      },
      {
        path: 'edit_vessel/:id',
        component: EditvesselComponent,
      },
      {
        path: 'society_registration',
        component: SocietyListComponent,
      },
      {
        path: 'addnew_society',
        component: SocietyRegistrationComponent,
      },
      {
        path: 'addsociety_members/:id',
        component: SocietyAddMembersComponent,
      }
     
    ]
  },
  
    
 
  ];

  //create our cost var with the information about the format that we want



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotpasswordComponent,
    NewLoginComponent,
    DashboardComponent,
    UserregComponent,
    FishermanComponent,
    BeneficiaryComponent,
    VesselRegistrationComponent,
    AddnewVesselComponent,
    NewVesselRegistrationComponent,
    EditvesselComponent,
    SocietyRegistrationComponent,
    SocietyAddMembersComponent,
    SocietyListComponent,
   
    
    

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    NgxSpinnerModule,
   
   
    RouterModule.forRoot(
      appRoutes,{useHash: true}
      
    )
   ],
  providers: [UserregService, MatDatepickerModule ,
     {provide: LocationStrategy, useClass: HashLocationStrategy}
],
  bootstrap: [AppComponent]
})
export class AppModule { }
