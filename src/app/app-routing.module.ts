import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CartComponent } from "./cart/cart.component";
import { AboutComponent } from "./common-pages/about/about.component";
import { ContactComponent } from "./common-pages/contact/contact.component";
import { HomeComponent } from "./common-pages/home/home.component";
import { PageNotFoundComponent } from "./common-pages/page-not-found/page-not-found.component";

const routes : Routes = [
    {path: '', component: HomeComponent},
    {path: 'about', component: AboutComponent},
    {path: 'contact', component: ContactComponent},
    {path: 'cart', component: CartComponent},
    {path: '**', pathMatch: 'full', component: PageNotFoundComponent }
]

@NgModule({
    declarations: [
        HomeComponent,
        ContactComponent,
        AboutComponent,
        PageNotFoundComponent,

    ],
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ],
    providers: [

    ],
    bootstrap: [

    ]
})

export class AppRoutingModule {

}