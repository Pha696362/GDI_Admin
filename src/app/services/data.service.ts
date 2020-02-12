import { ConvertService, toNearExpiredDate } from './convert.service';
import { ITag, IGenre, ISlide, IBook, ICategory, ICourse, IAbout, ITypes, IContent, IAdvertise, ITvnews, IAmbulance, IFiretruck, ISubCategory, IViseoPlaylist } from './../interfaces/bookstore';
import { AngularFirestore } from "@angular/fire/firestore";
import { Injectable } from "@angular/core";
import { IPackage, ISubscriber } from '../interfaces/subscriber';
import { IContact } from 'src/app/interfaces/bookstore';
import * as moment from 'moment';

@Injectable({
  providedIn: "root"
})
export class DataService {
  constructor(private db: AngularFirestore) { }

  baseDocRef(col: string) {
    return this.db.collection(`${col}`);
  }

  userRef() {
    return this.db.collection("users");
  }

  userRole() {
    return this.db.collection("roles");
  }

  userDocRef(key: string) {
    return this.db.collection("users").doc<any>(key);
  }

  environmentRef() {
    return this.db.collection("crime_environment").doc("crime_environment");
  }

  sysConfigRef() {
    return this.db.collection("sys_config").doc("settings");
  }

  tagRef() {
    return this.db.collection<ITag>("tags", ref => ref.orderBy("name"));
  }

  contentcRef() {
    return this.db.collection<IContent>("content", ref => ref.orderBy("name"));
  }


  // contentcRefFilter(name?: string,slug?: string) {
  //   return this.db.collection<IContent>("content", ref =>
  //     // {
  //     //   let codition:any = ref;
  //     //   if(name){
  //     //     codition = codition.where('name', '==', name);
  //     //   }
  //     //   return codition;
  //     // }
  //   );
  // }

  contentKH(name?:string) {
    return this.db.collection<IContent>("content", ref => ref.where("name","==",name))
  }
  contentENG(slug?:string) {
    return this.db.collection<IContent>("content",ref => ref.where("slug","==",slug))
  }


  aboutRef() {
    return this.db.collection<IAbout>("about", ref => ref.orderBy("name"));
  }
  contactRef() {
    return this.db.collection<IContact>("contact", ref => ref.orderBy("name"));
  }
  embulanceRef() {
    return this.db.collection<IAmbulance>("ambulance", ref => ref.orderBy("name"));
  }
  firetruckRef() {
    return this.db.collection<IFiretruck>("firetruck", ref => ref.orderBy("name"));
  }

  categoryRef() {
    return this.db.collection<ICategory>("category", ref => ref.orderBy("name"));
  }

  subcategoryRef() {
    return this.db.collection<ISubCategory>("sub_category", ref => ref.orderBy("name"));
  }


  tagValidRef(keyword: string) {
    return this.db.collection<ITag>("tags", ref => ref.where("name", "==", keyword));
  }

  genreRef() {
    return this.db.collection<IGenre>("genres", ref => ref.orderBy("name"));
  }

  genreValidRef(keyword: string) {
    return this.db.collection<IGenre>("genres", ref => ref.where("name", "==", keyword));
  }


  slideRef() {
    return this.db.collection<ISlide>("slides", ref => ref.orderBy("order"));
  }

  mobileAdvertiseRef() {
    return this.db.collection<IAdvertise>("mobile_advertisement", ref => ref.orderBy("orderingNumber", "asc"));
  }
  webAdvertiseRef() {
    return this.db.collection<IAdvertise>("web_advertisement", ref => ref.orderBy("orderingNumber", "asc"));
  }

  // updateAdvertiseStatus () {
  //   return this.db.collection<IAdvertise>("advertise", ref => )
  // }

  bookRef() {
    return this.db.collection<IBook>("books", ref => ref.orderBy("title"));
  }

  productRef() {
    return this.db.collection<IPackage>("packages", ref => ref.orderBy("period"));
  }

  // adsRef(key: number) {
  //   return this.db.collection<IAdvertise>("advertise", ref => {
  //     if(key === -1) {
  //       return ref.orderBy("create_date");
  //     }else {
  //       return ref.where("advertiseType.key", "==", key)
  //     }
  //   });
  // }

  adsRefFilter(tab, key: number, name: string) {
    return this.db.collection<IAdvertise>(name, ref => {
      if (key === -1) {
        if (tab.text === 'All') {
          return ref.orderBy("page_key");
        }
        else if (tab.text === 'Pending') {
          return ref.where("status.key", "==", tab.key);
        }
        else if (tab.text === 'Near Expire') {
          const currentDate = ConvertService.toDateKey(new Date());
          return ref.where("expireDateKey", "<=", currentDate + 3);
        }
        else {
          return ref.where("status.key", "==", tab.key)
        }
      }
      else {
        if (tab.text === 'All') {
          return ref.where("advertiseType.key", "==", key).orderBy("page_key");
        }
        else if (tab.text === 'Pending') {
          return ref.where("advertiseType.key", "==", key).where("status.key", "==", tab.key);
        }
        else if (tab.text === 'Near Expire') {
          const currentDate = ConvertService.toDateKey(new Date());
          return ref.where("advertiseType.key", "==", key).where("expireDateKey", "<=", currentDate + 3);
        }
        else {
          return ref.where("advertiseType.key", "==", key).where("status.key", "==", tab.key);
        }
      }
    });
  }

  subscriberTypesRef(id: string) {
    switch (id) {
      case 'approval_accounts':
        return this.db.collection<ISubscriber>("subscribers", ref => ref
          .where("isPaid", "==", false)
          .where("product.period", ">", 0)
          .orderBy("product.period")
          .orderBy("page_key"));
      case 'membership':
        return this.db.collection<ISubscriber>("subscribers", ref => ref
          .where("isPaid", "==", true)
          .where("product.period", ">", 0)
          .orderBy("product.period")
          .orderBy("page_key"));
      case 'expired':
        const expiredDateKey = ConvertService.toDateKey(new Date())
        return this.db.collection<ISubscriber>("subscribers", ref => ref
          .where("isPaid", "==", true)
          .where("expiredDateKey", "<", expiredDateKey)
          .orderBy("expiredDateKey")
          .orderBy("page_key"));
      case 'near-expire':
        const nearExpiredDateKey = ConvertService.toDateKey(toNearExpiredDate())
        return this.db.collection<ISubscriber>("subscribers", ref => ref
          .where("isPaid", "==", true)
          .where("expiredDateKey", "<", nearExpiredDateKey)
          .orderBy("expiredDateKey")
          .orderBy("page_key"));
      case 'approval':
        return this.db.collection<ISubscriber>("subscribers", ref => ref
          .where("isPaid", "==", false)
          .where("product", "==", null)
          .orderBy("page_key"));

      default:
        return this.db.collection<ISubscriber>("subscribers", ref => ref.orderBy("page_key"));
    }
  }

  settingFireStore() {
    return this.firestore().collection("options").doc("general");
  }

  sysSetting() {
    return this.db.collection("options").doc("general");
  }

  subscriberFireRef() {
    return this.firestore().collection("subscribers");
  }
  subcategoryFireRef() {
    return this.firestore().collection("sub_category");
  }
  categoryFireRef() {
    return this.firestore().collection("category");
  }

  invoiceFireRef() {
    return this.firestore().collection("invoices");
  }

  subscriberRef() {
    return this.db.collection<ISubscriber>("subscribers", ref => ref.orderBy("page_key"));
  }

  subscriberSearchRef(field) {
    return this.db.collection("subscribers", ref => ref.orderBy(field, "desc")
      .limit(20)
    );
  }

  subscriberFilterRef(field: string, text: any) {
    let search = text;
    if (field === "phone") search = `+855${ConvertService.toNumber(search)}`
    if (search) {
      if (search.key) {
        return this.db.collection("subscribers", ref =>
          ref
            .where("phoneNumber", ">=", search.key)
            .orderBy(field)
            .limit(20)
        );
      }
      return this.db.collection("subscribers", ref =>
        ref
          .where(field, ">=", search)
          .orderBy(field)
          .limit(20)
      );
    }
    return this.db.collection("subscribers", ref =>
      ref
        .orderBy(field, "desc")
        .limit(20)
    );

  }

  batch() {
    return this.db.firestore.batch();
  }

  firestore() {
    return this.db.firestore;
  }

  createId() {
    return this.db.createId();
  }

  typenewsRef() {
    return this.db.collection<ITypes>("types", ref => ref.orderBy("name"));
  }
  tvcategorynewsRef() {
    return this.db.collection<IViseoPlaylist>("tv_category_news", ref => ref.orderBy("name"));
  }
  tvnewsRef() {
    return this.db.collection<ITvnews>("tvnews", ref => ref.orderBy("name"));
  }
  // contentRef() {
  //   return this.db.collection<IContent>("content", ref => ref.orderBy("name"));
  // }
  // contentRef(categorykey) {
  //   return this.db.collection("content", ref => ref.where('category.key', '==', categorykey));
  // }


  contentRef(key?: string, fromDatekey?: number, toDateKey?: number, createBy?: string, status?: string) {

    // console.log(key)
    if (key !== 'all') {
      if (fromDatekey !== null) {
        if (key && createBy !== "all" && status !== "all") {
          return this.db.collection<IContent>("content", ref => ref.where('category.key', '==', key).where("createDateKey", ">=", fromDatekey).where("createDateKey", "<=", toDateKey).where("create_by.key", "==", createBy).where("status.key", "==", status).orderBy("createDateKey", "desc"));
        }
        else if (key && createBy !== "all" && status === "all") {
          return this.db.collection<IContent>("content", ref => ref.where('category.key', '==', key).where("createDateKey", ">=", fromDatekey).where("createDateKey", "<=", toDateKey).where("create_by.key", "==", createBy).orderBy("createDateKey", "desc"));
        }
        else if (key && createBy === "all" && status === "all") {
          return this.db.collection<IContent>("content", ref => ref.where('category.key', '==', key).where("createDateKey", ">=", fromDatekey).where("createDateKey", "<=", toDateKey).orderBy("createDateKey", "desc"));
        }
        else if (key && createBy === "all" && status !== "all") {
          return this.db.collection<IContent>("content", ref => ref.where('category.key', '==', key).where("createDateKey", ">=", fromDatekey).where("createDateKey", "<=", toDateKey).where("status.key", "==", status).orderBy("createDateKey", "desc"));
        }
        else {
          alert('else')
        }
      }
      else {
        if (key && createBy !== "all" && status !== "all") {
          return this.db.collection<IContent>("content", ref => ref.where("create_by.key", "==", createBy).where("status.key", "==", status).where('category.key', '==', key).orderBy("page_key", "desc"));
        }
        else if (key && createBy !== "all" && status === "all") {
          return this.db.collection<IContent>("content", ref => ref.where("create_by.key", "==", createBy).where('category.key', '==', key).orderBy("page_key", "desc"));
        }
        else if (key && createBy === "all" && status === "all") {
          return this.db.collection<IContent>("content", ref => ref.where('category.key', '==', key).orderBy("page_key", "desc"));
        }
        else if (key && createBy === "all" && status !== "all") {
          return this.db.collection<IContent>("content", ref => ref.where('category.key', '==', key).where("status.key", "==", status).orderBy("page_key", "desc"));
        }
      }
    }
    else {
      if (fromDatekey !== null) {
        if (key && createBy !== "all" && status !== "all") {
          return this.db.collection<IContent>("content", ref => ref.where("createDateKey", ">=", fromDatekey).where("createDateKey", "<=", toDateKey).where("create_by.key", "==", createBy).where("status.key", "==", status).orderBy("createDateKey", "desc"));
        }
        else if (key && createBy !== "all" && status === "all") {
          return this.db.collection<IContent>("content", ref => ref.where("createDateKey", ">=", fromDatekey).where("createDateKey", "<=", toDateKey).where("create_by.key", "==", createBy).orderBy("createDateKey", "desc"));
        }
        else if (key && createBy === "all" && status === "all") {
          return this.db.collection<IContent>("content", ref => ref.where("createDateKey", ">=", fromDatekey).where("createDateKey", "<=", toDateKey).orderBy("createDateKey", "desc"));
        }
        else if (key && createBy === "all" && status !== "all") {
          return this.db.collection<IContent>("content", ref => ref.where("createDateKey", ">=", fromDatekey).where("createDateKey", "<=", toDateKey).where("status.key", "==", status).orderBy("createDateKey", "desc"));
        }
        else {
          alert('else')
        }
      }
      else {
        if (key && createBy !== "all" && status !== "all") {
          return this.db.collection<IContent>("content", ref => ref.where("create_by.key", "==", createBy).where("status.key", "==", status).orderBy("page_key", "desc"));
        }
        else if (key && createBy !== "all" && status === "all") {
          return this.db.collection<IContent>("content", ref => ref.where("create_by.key", "==", createBy).orderBy("page_key", "desc"));
        }
        else if (key && createBy === "all" && status === "all") {
          return this.db.collection<IContent>("content", ref => ref.orderBy("page_key", "desc"));
        }
        else if (key && createBy === "all" && status !== "all") {
          return this.db.collection<IContent>("content", ref => ref.where("status.key", "==", status).orderBy("page_key", "desc"));
        }
      }
    }

  }

  NewContentRef() {
    return this.db.collection("content")
  }



  entertainmentRef() {
    return this.db.collection<ITvnews>("tvnews", ref => ref.orderBy("name"));
  }

  flileFolderRef() {
    return this.db.collection('file_folder');
  }
  flileRef() {
    return this.db.collection("file_manager", ref => ref.orderBy("create_date", "desc"));
  }
  AdvertiseFolderRef() {
    return this.db.collection('advertise_folder');
  }
  advertisementRef() {
    return this.db.collection('advertise_manager', ref => ref.orderBy("create_date", "desc"));
  }
}

