import { APP_STORES } from './stores/app.store';
import { ConvertService } from './services/convert.service';
import { MaterialModule } from './module/material.module';
import { AuthService } from './auth/auth.service';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TimepickerModule } from 'ngx-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { LayoutComponent } from './shared/layout/layout.component';
import { AuthLayoutComponent } from './shared/auth-layout/auth-layout.component';
import { SigninComponent } from './pages/signin/signin.component';
import { AppLayoutComponent } from './shared/app-layout/app-layout.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { FireValidatorsService } from './services/fire-validators.service';
import { DataService } from './services/data.service';
import { MessageComponent } from './components/message/message.component';
import { NetInfoComponent } from './components/net-info/net-info.component';
import { MobxAngularModule } from 'mobx-angular';
import { FireStoreService } from './services/utils.lib';
import { ModalWarningComponent } from './components/modal-warning/modal-warning.component';
import { LoadingComponent } from './components/loading/loading.component';
import { DashboardNavComponent } from './components/dashboard-nav/dashboard-nav.component';
import { LoadingGridComponent } from './components/loading-grid/loading-grid.component';
import { EmptyComponent } from './components/empty/empty.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import * as firebase from 'firebase/app';
import "firebase/firestore"
import { MoreButtonComponent } from './components/more-button/more-button.component';
import { FooterDashboardComponent } from './components/footer-dashboard/footer-dashboard.component';
import { PaginationLoaderComponent } from './components/pagination-loader/pagination-loader.component';
import { LoginShellComponent } from './components/login-shell/login-shell.component';
import { PrintService } from './services/print.service';
import { DateFormatPipe } from './pipes/date-format.pipe';
import { FilterTermPipe } from './pipes/filter-term.pipe';
import { DateMediumPipe } from './pipes/date-medium.pipe';
import { AlphaGradePipe } from './pipes/alpha-grade.pipe';
import { AlphaPointPipe } from './pipes/alpha-point.pipe';
import { DaysSchedulePipe } from './pipes/days-schedule.pipe';
import { DaysSmallPipe } from './pipes/days-small.pipe';
import { FilterSchedulePipe } from './pipes/filter-schedule.pipe';
import { TreeChecklistExample } from './components/tree-checklist-example/tree-checklist-example'

import { AgmCoreModule } from '@agm/core';
firebase.initializeApp(environment.firebase);
const fdb = firebase.firestore();
// fdb.settings({ timestampsInSnapshots: true });


import { DeleteComponent } from './components/delete/delete.component';
import { CreditEarnedPipe } from './pipes/credit-earned.pipe';
import { PrimaryButtonComponent } from './components/primary-button/primary-button.component';
import { MajorBagPipe } from './pipes/major-bag.pipe';
import { HeaderTabsComponent } from './components/header-tabs/header-tabs.component';
import { EmptyDataComponent } from './components/empty-data/empty-data.component';
import { GroupByProgramPipe } from './pipes/group-by-program.pipe';
import { GroupByCoursesPipe } from './pipes/group-by-courses.pipe';
import { ConfirmSuccessComponent } from './components/confirm-success/confirm-success.component';
import { ConfirmWarningComponent } from './components/confirm-warning/confirm-warning.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { TabLayoutComponent } from './shared/tab-layout/tab-layout.component';
import { LoaderTableComponent } from './components/loader-table/loader-table.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MapsComponent } from './pages/maps/maps.component';
import { ToNumberPipe } from './pipes/to-number.pipe';
import { MarkerLabelPipe } from './pipes/marker-label.pipe';
import { UserComponent } from './pages/user/user.component';
import { AddUserComponent } from './pages/user/add-user/add-user.component';
import { UploadService } from './services/upload.service';
import { NgxCaptchaModule } from 'ngx-captcha';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AccountUsersComponent } from './pages/account-users/account-users.component';
import { SelectedItemByKeyPipe } from './pipes/selected-item-by-key.pipe';
import { GetAgePipe } from './pipes/get-age.pipe';
import { DisableModalComponent } from './components/disable-modal/disable-modal.component';
import { HttpModule } from '@angular/http';
import { ApiService } from './services/api.service';
import { DateStringPipe } from './pipes/date-string.pipe';
import { DateResolveDatePipe } from './pipes/date-resolve-date.pipe';
import { SubscribersComponent } from './pages/subscribers/subscribers.component';
import { AddSubscriberComponent } from './pages/subscribers/add-subscriber/add-subscriber.component';
import { ProductComponent } from './pages/product/product.component';
import { AddProductComponent } from './pages/product/add-product/add-product.component';
import { ClientProfileComponent } from './pages/client-profile/client-profile.component';
import { ClientOverviewComponent } from './pages/client-profile/client-overview/client-overview.component';
import { ClientPaymentComponent } from './pages/client-profile/client-payment/client-payment.component';
import { ClientHistoryComponent } from './pages/client-profile/client-history/client-history.component';
import { ApplyPackageComponent } from './pages/client-profile/apply-package/apply-package.component';
import { EditProductComponent } from './pages/product/edit-product/edit-product.component';
import { AddCoverProductComponent } from './pages/product/add-cover-product/add-cover-product.component';
import { EditSubscribersComponent } from './pages/subscribers/edit-subscribers/edit-subscribers.component';
import { AddCoverSubscribersComponent } from './pages/subscribers/add-cover-subscribers/add-cover-subscribers.component';
import { CategoryComponent } from './pages/category/category.component';
import { AddCategoryComponent } from './pages/category/add-category/add-category.component';
import { EditCategoryComponent } from './pages/category/edit-category/edit-category.component';
import { AddConverCategoryComponent } from './pages/category/add-conver-category/add-conver-category.component';
import { AddAboutUsComponent } from './pages/about/add-about-us/add-about-us.component';
import { AboutComponent } from './pages/about/about.component';
import { EditAboutUsComponent } from './pages/about/edit-about-us/edit-about-us.component';
import { ContentComponent } from './pages/content/content.component';
import { TypesNewsComponent } from './pages/types-news/types-news.component';
import { AddTypeNewsComponent } from './pages/types-news/add-type-news/add-type-news.component';
import { AddNewContentComponent } from './pages/content/add-new-content/add-new-content.component';
import { FilemanagerComponent } from './pages/filemanager/filemanager.component';
import { UplaodFilemanagerComponent } from './pages/filemanager/uplaod-filemanager/uplaod-filemanager.component';
import { QuillModule } from 'ngx-quill';
import { AdvertisementComponent } from './pages/advertisement/advertisement.component';
import { AddNewAdvertisementComponent } from './pages/advertisement/add-new-advertisement/add-new-advertisement.component';
import { AdvertiseimageComponent } from './pages/advertiseimage/advertiseimage.component';
import { UploadAdvertiseImagesComponent } from './pages/advertiseimage/upload-advertise-images/upload-advertise-images.component';
import { EditAdvertisementComponent } from './pages/advertisement/edit-advertisement/edit-advertisement.component';
import { EditContentComponent } from './pages/content/edit-content/edit-content.component';
import { TvNewsComponent } from './pages/tv-news/tv-news.component';
import { AddTvNewsComponent } from './pages/tv-news/add-tv-news/add-tv-news.component';
import { EditTvNewsComponent } from './pages/tv-news/edit-tv-news/edit-tv-news.component';
import { EntertainmentComponent } from './pages/entertainment/entertainment.component';
import { AddEntertainmentComponent } from './pages/entertainment/add-entertainment/add-entertainment.component';
import { EditEntertainmentComponent } from './pages/entertainment/edit-entertainment/edit-entertainment.component';
import { EmbulanceComponent } from './pages/embulance/embulance.component';
import { AddEmbulanceComponent } from './pages/embulance/add-embulance/add-embulance.component';
import { EditEmbulanceComponent } from './pages/embulance/edit-embulance/edit-embulance.component';
import { AddFireTruckComponent } from './pages/fire-truck/add-fire-truck/add-fire-truck.component';
import { EditFireTruckComponent } from './pages/fire-truck/edit-fire-truck/edit-fire-truck.component';
import { FireTruckComponent } from './pages/fire-truck/fire-truck.component';
import { PhoneComponent } from './pages/phone/phone.component';
import { EditPhonenumberComponent } from './pages/phone/edit-phonenumber/edit-phonenumber.component';
import { AddNewPhoneComponent } from './pages/phone/add-new-phone/add-new-phone.component';
import { ContentdetailComponent } from './pages/content/contentdetail/contentdetail.component';
// import { AdvertisementBottomComponent } from './pages/advertisement-bottom/advertisement-bottom.component';
// import { AdvertisementTopComponent } from './pages/advertisement-top/advertisement-top.component';
// import { AddNewAdvertisementTopComponent } from './pages/advertisement-top/add-new-advertisement-top/add-new-advertisement-top.component';
// import { EditNewAdvertisementTopComponent } from './pages/advertisement-top/edit-new-advertisement-top/edit-new-advertisement-top.component';
// import { AddAdvertisementBottomComponent } from './pages/advertisement-bottom/add-advertisement-bottom/add-advertisement-bottom.component';
import { SubCategoryComponent } from './pages/sub-category/sub-category.component';
import { AddNewSubCategoryComponent } from './pages/sub-category/add-new-sub-category/add-new-sub-category.component';
import { EditSubCategoryComponent } from './pages/sub-category/edit-sub-category/edit-sub-category.component';
import { SubcategorydetailComponent } from './pages/sub-category/subcategorydetail/subcategorydetail.component';
import { SubcategoryComponent } from './pages/content/subcategory/subcategory.component';
// import { EditAdvertisementBottomComponent } from './pages/advertisement-bottom/edit-advertisement-bottom/edit-advertisement-bottom.component';
import { AddTvPlaylistNewsComponent } from './pages/tv-news/add-tv-playlist-news/add-tv-playlist-news.component';
import { ContactComponent } from './pages/contact/contact.component';
// import { EditButtonComponent } from './pages/advertisement-righ/edit-button/edit-button.component';
// import {AdvertisementRightComponent} from './pages/advertisement-righ/advertisement-righ.component';
// import {AddButtonComponent} from './pages/advertisement-righ/add-button/add-button.component';
import { EditUserComponent } from './pages/user/edit-user/edit-user.component';
import { ImagesComponent } from './pages/gallery/images/images.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { RoleComponent } from './pages/role/role.component';
import { AddRoleComponent } from './pages/role/add-role/add-role.component';
import { EditRoleComponent } from './pages/role/edit-role/edit-role.component';
import { ForgotUserPasswordComponent } from './pages/user/forgot-user-password/forgot-user-password.component';
import { WebAdvertisementComponent } from './pages/web-advertisement/web-advertisement.component';
import { AddNewWebAdvertisementComponent } from './pages/web-advertisement/add-new-web-advertisement/add-new-web-advertisement.component';
import { EditWebAdvertisementComponent } from './pages/web-advertisement/edit-web-advertisement/edit-web-advertisement.component';



@NgModule({
  declarations: [

    AppComponent,
    DashboardComponent,
    HomeComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    LayoutComponent,
    AuthLayoutComponent,
    SigninComponent,
    AppLayoutComponent,
    SpinnerComponent,
    MessageComponent,
    NetInfoComponent,
    ModalWarningComponent,
    LoadingComponent,
    DashboardNavComponent,
    LoadingGridComponent,
    EmptyComponent,
    MoreButtonComponent,
    FooterDashboardComponent,
    PaginationLoaderComponent,
    LoginShellComponent,
    DateFormatPipe,
    FilterTermPipe,
    DateMediumPipe,
    AlphaGradePipe,
    AlphaPointPipe,
    DaysSchedulePipe,
    DaysSmallPipe,
    FilterSchedulePipe,
    DeleteComponent,
    CreditEarnedPipe,
    PrimaryButtonComponent,
    MajorBagPipe,
    HeaderTabsComponent,
    EmptyDataComponent,
    GroupByProgramPipe,
    GroupByCoursesPipe,
    ConfirmSuccessComponent,
    ConfirmWarningComponent,
    ForgotPasswordComponent,
    TabLayoutComponent,
    LoaderTableComponent,
    NotFoundComponent,
    MapsComponent,
    ToNumberPipe,
    MarkerLabelPipe,
    UserComponent,
    AddUserComponent,
    AccountUsersComponent,
    SelectedItemByKeyPipe,
    GetAgePipe,
    DisableModalComponent,
    DateStringPipe,
    DateResolveDatePipe,
    SubscribersComponent,
    AddSubscriberComponent,
    ProductComponent,
    AddProductComponent,
    ClientProfileComponent,
    ClientOverviewComponent,
    ClientPaymentComponent,
    ClientHistoryComponent,
    ApplyPackageComponent,
    EditProductComponent,
    AddCoverProductComponent,
    EditSubscribersComponent,
    AddCoverSubscribersComponent,
    CategoryComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    AddConverCategoryComponent,
    AddAboutUsComponent,
    AboutComponent,
    EditAboutUsComponent,
    FireTruckComponent,
    ContentComponent,
    TypesNewsComponent,
    AddTypeNewsComponent,
    AddNewContentComponent,
    FilemanagerComponent,
    UplaodFilemanagerComponent,
    AdvertisementComponent,
    AddNewAdvertisementComponent,
    AdvertiseimageComponent,
    UploadAdvertiseImagesComponent,
    EditAdvertisementComponent,
    EditContentComponent,
    TvNewsComponent,
    AddTvNewsComponent,
    EditTvNewsComponent,
    EntertainmentComponent,
    AddEntertainmentComponent,
    EditEntertainmentComponent,
    EmbulanceComponent,
    AddEmbulanceComponent,
    EditEmbulanceComponent,
    AddFireTruckComponent,
    EditFireTruckComponent,
    PhoneComponent,
    EditPhonenumberComponent,
    AddNewPhoneComponent,
    ContentdetailComponent,
    // AdvertisementBottomComponent,
    // AdvertisementTopComponent,
    // AddNewAdvertisementTopComponent,
    // EditNewAdvertisementTopComponent,
    // AddAdvertisementBottomComponent,
    SubCategoryComponent,
    AddNewSubCategoryComponent,
    EditSubCategoryComponent,
    SubcategorydetailComponent,
    SubcategoryComponent,
    // EditAdvertisementBottomComponent,
    AddTvPlaylistNewsComponent,
    ContactComponent,
    // AdvertisementRightComponent,
    // AddButtonComponent,
    // EditButtonComponent,
    EditUserComponent,
    ImagesComponent,
    DataTableComponent,
    RoleComponent,
    AddRoleComponent,
    TreeChecklistExample,
    EditRoleComponent,
    ForgotUserPasswordComponent,
    WebAdvertisementComponent,
    AddNewWebAdvertisementComponent,
    EditWebAdvertisementComponent
  ],
  entryComponents: [
    // AdvertisementRightComponent,
    // AddButtonComponent,
    // EditButtonComponent,
    AdvertiseimageComponent,
    ModalWarningComponent,
    DeleteComponent,
    ConfirmSuccessComponent,
    ConfirmWarningComponent,
    ForgotPasswordComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    AddConverCategoryComponent,
    AddAboutUsComponent,
    EditAboutUsComponent,
    AddTypeNewsComponent,
    AddNewContentComponent,
    UplaodFilemanagerComponent,
    FilemanagerComponent,
    AddNewAdvertisementComponent,
    UploadAdvertiseImagesComponent,
    EditAdvertisementComponent,
    EditContentComponent,
    AddTvNewsComponent,
    EditTvNewsComponent,
    AddEntertainmentComponent,
    EditEntertainmentComponent,
    AddEmbulanceComponent,
    EditEmbulanceComponent,
    AddFireTruckComponent,
    EditFireTruckComponent,
    EditPhonenumberComponent,
    AddNewPhoneComponent,
    // AddAdvertisementBottomComponent,
    // AddNewAdvertisementTopComponent,
    // EditNewAdvertisementTopComponent,
    AddNewSubCategoryComponent,
    // EditAdvertisementBottomComponent,
    ContentdetailComponent,
    AddTvPlaylistNewsComponent,
    AddUserComponent,
    EditUserComponent,
    AddProductComponent,
    EditProductComponent,
    AddCoverProductComponent,
    AddRoleComponent,
    EditRoleComponent,
    ForgotUserPasswordComponent,
    EditSubCategoryComponent,
    AddNewWebAdvertisementComponent,
    EditWebAdvertisementComponent

  ],
  imports: [
  BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    MobxAngularModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    NgbModule.forRoot(),
    TimepickerModule.forRoot(),
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase, 'PUC-CLOUD'),
    AgmCoreModule.forRoot({
    apiKey: environment.mapKey
    }),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    MaterialModule,
    InfiniteScrollModule,
    NgxCaptchaModule,
    NgxChartsModule,

    QuillModule.forRoot({}),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [
    AuthService,
    FireValidatorsService,
    DataService,
    ConvertService,
    APP_STORES,
    FireStoreService,
    PrintService,
    UploadService,
    ApiService,
  ],
  bootstrap: [AppComponent],
  exports: [DataTableComponent]
})
export class AppModule { }
