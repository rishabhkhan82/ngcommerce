import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ProductIndividualComponent } from './product/product-individual/product-individual.component';
import { ProductSearchComponent } from './product/product-search/product-search.component';
import { RatingsComponent } from './ratings/ratings.component';
import { PaymentComponent } from './payment/payment.component';
import { HeaderComponent } from './common-pages/header/header.component';
import { FooterComponent } from './common-pages/footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth-module/auth-module.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    ProductIndividualComponent,
    ProductSearchComponent,
    RatingsComponent,
    PaymentComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
