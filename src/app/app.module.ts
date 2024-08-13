import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
// import './util.polyfill';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { environment } from '../environments/environment';
import { GoogleSsoDirective } from './google-sso.directive';
import { TransactionComponent } from './transaction/transaction.component';
import { AddTranasactionFormComponent } from './transaction/add-tranasaction-form/add-tranasaction-form.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { SidebarComponent } from './sidebar/sidebar.component';
import { InitialTransactionComponent } from './transaction/initial-transaction/initial-transaction.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    // GoogleSsoDirective,
    TransactionComponent,
    AddTranasactionFormComponent,
    SignupComponent,
    LoginComponent,
    SidebarComponent,
    InitialTransactionComponent,
    StatisticsComponent,
  ],
  imports: [
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule
   
  ],
  providers: [
    provideClientHydration(),
    provideFirebaseApp(() => initializeApp({"projectId":"money-tracking-8b27a","appId":"1:842955748311:web:0687766f242de2bb135192","databaseURL":"https://money-tracking-8b27a-default-rtdb.firebaseio.com","storageBucket":"money-tracking-8b27a.appspot.com","apiKey":"AIzaSyBCPl_Bvulx6Vm0wFZekaqgZ8M7z1bGX2I","authDomain":"money-tracking-8b27a.firebaseapp.com","messagingSenderId":"842955748311","measurementId":"G-6RJL8JZDTQ"})),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
