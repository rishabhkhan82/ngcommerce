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
import { ProductIndividualComponent } from "./product/product-individual/product-individual.component";
import { ProductSearchComponent } from "./product/product-search/product-search.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FilterPipe } from "./appPipes/filter.pipe";
import { NgxSkeletonLoaderModule } from "ngx-skeleton-loader";
import { AuthGuard } from "./auth/auth.guard";
import { ProductCatalogComponent } from "./common-pages/product-catalog/product-catalog.component";

const routes : Routes = [
    {path: '', component: HomeComponent},
    {path: 'about', component: AboutComponent},
    {path: 'contact', component: ContactComponent},
    {path: 'cart', component: CartComponent},
    {path: 'product/search', component: ProductSearchComponent},
    {path: 'product/:userId', component: ProductIndividualComponent},
    {path: '', data: {preload : true}, loadChildren: () => import('./auth/auth-module.module').then(m => m.AuthModule)},
    {path: 'user', loadChildren: () => import('./user-type/user/user.module').then(m => m.UserModule), canActivate: [AuthGuard]},
    {path: 'admin', loadChildren: () => import('./user-type/admin/admin.module').then(m => m.AdminModule), canActivate: [AuthGuard]},
    {path: '**', pathMatch: 'full', component: PageNotFoundComponent }
]

@NgModule({
    declarations: [
        HomeComponent,
        ContactComponent,
        AboutComponent,
        PageNotFoundComponent,
        ProductIndividualComponent,
        ProductSearchComponent,
        FilterPipe,
        ProductCatalogComponent
    ],
    imports: [
        RouterModule.forRoot(routes, {
            preloadingStrategy: CustomPreloadingService
        }),
        CommonModule,
        CarouselModule,
        FormsModule,
        NgxSkeletonLoaderModule,
        ReactiveFormsModule
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