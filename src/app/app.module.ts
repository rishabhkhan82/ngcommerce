import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RatingsComponent } from './ratings/ratings.component';
import { PaymentComponent } from './payment/payment.component';
import { HeaderComponent } from './common-pages/header/header.component';
import { FooterComponent } from './common-pages/footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { AuthInterceptor } from './auth/auth.interceptor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    RatingsComponent,
    PaymentComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    NgbModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyCcAJ9QqXofx3yNwuqDz5ZtdoyLgoHNa6g",
      authDomain: "rishabh-ngcommerce.firebaseapp.com",
      databaseURL: "https://rishabh-ngcommerce-default-rtdb.firebaseio.com",
      projectId: "rishabh-ngcommerce",
      storageBucket: "rishabh-ngcommerce.appspot.com",
      messagingSenderId: "801217470599",
      appId: "1:801217470599:web:4dddcc14dddeeca3c19822",
    }),
    AngularFireStorageModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide : HTTP_INTERCEPTORS,
      useClass : AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
