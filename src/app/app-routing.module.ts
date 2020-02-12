
import { MapsComponent } from './pages/maps/maps.component';
import { HomeComponent } from "./pages/home/home.component";
import { AppLayoutComponent } from "./shared/app-layout/app-layout.component";
import { AuthLayoutComponent } from "./shared/auth-layout/auth-layout.component";
import { LayoutComponent } from "./shared/layout/layout.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./auth/auth.guard";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { SigninComponent } from "./pages/signin/signin.component";
import { TabLayoutComponent } from "./shared/tab-layout/tab-layout.component";
import { UserComponent } from './pages/user/user.component';
import { AccountUsersComponent } from './pages/account-users/account-users.component';



import { SubscribersComponent } from './pages/subscribers/subscribers.component';
import { ProductComponent } from './pages/product/product.component';
import { ClientProfileComponent } from './pages/client-profile/client-profile.component';
import { ClientOverviewComponent } from './pages/client-profile/client-overview/client-overview.component';
import { ClientPaymentComponent } from './pages/client-profile/client-payment/client-payment.component';
import { CategoryComponent } from './pages/category/category.component';
import { AboutComponent } from './pages/about/about.component';
import { ContentComponent } from './pages/content/content.component';
import { TypesNewsComponent } from './pages/types-news/types-news.component';
import { AdvertisementComponent } from './pages/advertisement/advertisement.component';
import { TvNewsComponent } from './pages/tv-news/tv-news.component';
import { EntertainmentComponent } from './pages/entertainment/entertainment.component';
import { EmbulanceComponent } from './pages/embulance/embulance.component';
import { FireTruckComponent } from './pages/fire-truck/fire-truck.component';
import { PhoneComponent } from './pages/phone/phone.component';
import { ContentdetailComponent } from './pages/content/contentdetail/contentdetail.component';
// import { AdvertisementBottomComponent } from './pages/advertisement-bottom/advertisement-bottom.component';
// import { AdvertisementTopComponent } from './pages/advertisement-top/advertisement-top.component';
import { SubCategoryComponent } from './pages/sub-category/sub-category.component';
import { SubcategorydetailComponent } from './pages/sub-category/subcategorydetail/subcategorydetail.component';
import { SubcategoryComponent } from './pages/content/subcategory/subcategory.component';
import { ImagesComponent } from './pages/gallery/images/images.component';
import { AuthRouthGuard } from './auth/auth-routh.guard';
import { RoleComponent } from './pages/role/role.component';
import { WebAdvertisementComponent } from './pages/web-advertisement/web-advertisement.component';




const routes: Routes = [
  {
    path: "auth",
    component: AuthLayoutComponent,
    children: [{ path: "", component: SigninComponent }]
  },
  {
    path: "",
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "", component: DashboardComponent },
      { path: "home", component: DashboardComponent },
      {
        path: "client/:id", component: ClientProfileComponent, children: [
          { path: "overview", component: ClientOverviewComponent },
          { path: "payment", component: ClientPaymentComponent },
          { path: "history", component: ClientOverviewComponent },
        ]
      },
    ]
  },
  {
    path: "maps",
    canActivate: [AuthGuard],
    component: TabLayoutComponent,
    children: [
      { path: "", redirectTo: "listing", pathMatch: "full" },
      { path: "listing", component: MapsComponent },
    ]
  },
  {
    path: "app",
    component: AppLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "", redirectTo: "overview", pathMatch: "full" },
      { path: "overview", component: HomeComponent },
      {
        path: "subscribers",
        component: TabLayoutComponent,
        children: [
          { path: "", redirectTo: "approval", pathMatch: "full" },
          { path: ":id", component: SubscribersComponent, data:{name:"subscribers"} },
        ]
      },
      {
        path: "packages",
        component: TabLayoutComponent,
        children: [
          { path: "", redirectTo: "data", pathMatch: "full" },
          { path: "data", component: ProductComponent },
        ]
      },
      // data:{name:"packages"}


      {
        path: "category",
        component: TabLayoutComponent,
        children: [
          { path: "", redirectTo: "data", pathMatch: "full" },
          { path: "data", component: CategoryComponent },
        ]
      },
      {
        path: "subcategory",
        component: TabLayoutComponent,
        children: [
          { path: "", redirectTo: "data", pathMatch: "full" },
          { path: "data", component: SubCategoryComponent },
          { path: ":id", component: SubcategorydetailComponent },
        ]
      },

      {
        path: "about",
        canActivate: [AuthRouthGuard],
        component: TabLayoutComponent,
        children: [
          { path: "", redirectTo: "data", pathMatch: "full" },
          { path: "data", component: AboutComponent },
        ]
      },
      // {
      //   path: "contact",
      //   component: TabLayoutComponent,
      //   children: [
      //     { path: "", redirectTo: "data", pathMatch: "full" },
      //     { path: "data", component: ContactComponent },
      //   ]
      // },
      {
        path: "tvnews",
        component: TabLayoutComponent,
        children: [
          { path: "", redirectTo: "data", pathMatch: "full" },
          { path: "data", component: TvNewsComponent },
        ]
      },

      {
        path: "role",
        component: TabLayoutComponent,
        children: [
          { path: "", redirectTo: "data", pathMatch: "full" },
          { path: "data", component: RoleComponent },
        ]
      },
      {
        path: "users",
        component: TabLayoutComponent,
        children: [
          { path: "", redirectTo: "data", pathMatch: "full" },
          { path: "data", component: UserComponent },
        ]
      },
      {
        path: "account-users",
        component: TabLayoutComponent,
        children: [
          { path: "", redirectTo: "all", pathMatch: "full" },
          { path: "all", component: AccountUsersComponent },
        ]
      },
      // news post
      {
        path: "types",
        component: TabLayoutComponent,
        children: [
          { path: "", redirectTo: "data", pathMatch: "full" },
          { path: ":id", component: TypesNewsComponent },
        ]
      },
      {
        path: "content",
        component: TabLayoutComponent,
        children: [
          { path: "", redirectTo: "all", pathMatch: "full" },
          // { path: "", component: ContentComponent },
          { path: ":id", component: ContentComponent },
          // { path: ":id", component: ContentdetailComponent },
          { path: "detail/:id", component: ContentdetailComponent },
        ]
      },

      {
        path: "mobile-advertisement",
        component: TabLayoutComponent,
        children: [
          { path: "", redirectTo: "all", pathMatch: "full" },
          { path: ":id", component: AdvertisementComponent },
        ]
      },
      {
        path: "web-advertisement",
        component: TabLayoutComponent,
        children: [
          { path: "", redirectTo: "all", pathMatch: "full" },
          { path: ":id", component: WebAdvertisementComponent },
        ]
      },
      {
        path: "images",
        component: TabLayoutComponent,
        children: [
          { path: "", redirectTo: "all", pathMatch: "full" },
          { path: ":id", component: ImagesComponent },
        ]
      },
      {
        path: "packages",
        component: TabLayoutComponent,
        children: [
          { path: "", redirectTo: "data", pathMatch: "full" },
          { path: ":id", component: ProductComponent },
        ]
      },
      {
        path: "entertainment",
        component: TabLayoutComponent,
        children: [
          { path: "", redirectTo: "data", pathMatch: "full" },
          { path: ":id", component: EntertainmentComponent },
        ]
      },
      {
        path: "emergencycars",
        component: TabLayoutComponent,
        children: [
          { path: "", redirectTo: "data", pathMatch: "full" },
          { path: ":id", component: EmbulanceComponent },
        ]
      },
      {
        path: "firetruck",
        component: TabLayoutComponent,
        children: [
          { path: "", redirectTo: "data", pathMatch: "full" },
          { path: ":id", component: FireTruckComponent },
        ]
      },
      {
        path: "contact",
        component: TabLayoutComponent,
        children: [
          { path: "", redirectTo: "data", pathMatch: "full" },
          { path: ":id", component: PhoneComponent },
        ]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],








  providers: [AuthGuard],
  exports: [RouterModule]
})
export class AppRoutingModule { }
