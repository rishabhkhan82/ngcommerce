import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { CartComponent } from "./cart/cart.component";
import { AboutComponent } from "./common-pages/about/about.component";
import { ContactComponent } from "./common-pages/contact/contact.component";
import { HomeComponent } from "./common-pages/home/home.component";
import { PageNotFoundComponent } from "./common-pages/page-not-found/page-not-found.component";
import { CommonModule } from "@angular/common";
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CustomPreloadingService } from "./appServices/custom-preloading.service";

const routes : Routes = [
    {path: '', component: HomeComponent},
    {path: 'about', component: AboutComponent},
    {path: 'contact', component: ContactComponent},
    {path: 'cart', component: CartComponent},
    {path: '', data: {preload : true}, loadChildren: () => import('./auth/auth-module.module').then(m => m.AuthModule)},
    {path: 'user', loadChildren: () => import('./user-type/user/user.module').then(m => m.UserModule)},
    {path: 'admin', loadChildren: () => import('./user-type/admin/admin.module').then(m => m.AdminModule)},
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
        RouterModule.forRoot(routes, {
            preloadingStrategy: CustomPreloadingService
        }),
        CommonModule,
        CarouselModule
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