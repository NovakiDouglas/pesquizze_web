import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';

import { NgAuthService } from "./ng-auth.service";
import { FormComponent } from './components/form/form.component';
import { UsersComponent } from './components/users/users.component';
import { MapsComponent } from './components/maps/maps.component';
import { MenuComponent } from './components/menu/menu.component';
import { FormCreateComponent } from './components/form-create/form-create.component';
import { FormEditComponent } from './components/form-edit/form-edit.component';
import { FormDetailsComponent } from './components/form-details/form-details.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    FormComponent,
    UsersComponent,
    MapsComponent,
    MenuComponent,
    FormCreateComponent,
    FormEditComponent,
    FormDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebae),
    AngularFireAuthModule,
    AngularFirestoreModule,    
  ],
  providers: [NgAuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
