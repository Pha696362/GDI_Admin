export interface IBookstore {
}


export interface ITag{
  key: string;
  status?: any;
  page_key?: number;
  create_date?: Date;
  create_by?: object;
  update_date?: Date;
  update_by?: object;
  name:string;
}
export interface ITypes{
  key: string;
  status?: any;
  page_key?: number;
  create_date?: Date;
  create_by?: object;
  update_date?: Date;
  update_by?: object;
  name:string;
}
export interface IAbout{
  key: string;
  status?: any;
  page_key?: number;
  create_date?: Date;
  create_by?: object;
  update_date?: Date;
  update_by?: object;
  name:string;
  value?:any;
  mission?:any;
}
export interface IAmbulance{
  key: string;
  status?: any;
  page_key?: number;
  create_date?: Date;
  create_by?: object;
  update_date?: Date;
  update_by?: object;
  name:string;
  phone?:any;

}

export interface IFiretruck{
  key: string;
  status?: any;
  page_key?: number;
  create_date?: Date;
  create_by?: object;
  update_date?: Date;
  update_by?: object;
  name:string;
  phone?:any;

}


export interface ICategory{
  key: string;
  status?: any;
  page_key?: number;
  create_date?: Date;
  create_by?: object;
  update_date?: Date;
  update_by?: object;
  name:string;
  // description:string;
}
export interface ISubCategory{
  key: string;
  status?: any;
  page_key?: number;
  create_date?: Date;
  create_by?: object;
  update_date?: Date;
  update_by?: object;
  name:string;
  category?: any
}

export interface ICourse{
  key: string;
  status?: any;
  page_key?: number;
  create_date?: Date;
  create_by?: object;
  update_date?: Date;
  update_by?: object;
  name:string;
  description:string;
  category:any;
  paymentType: any;
  paymentTypeKey: any;
  order:number;

}
export interface IContent{
  key: string;
  status?: any;
  page_key?: number;
  create_date?: Date;
  createDateKey?: number;
  create_by?: object;
  update_date?: Date;
  update_by?: object;
  name:string;
  slug:string;
  editname?:any;
  createname:string;
  reference:string;
  locations?:string;
  category?:any;
  sub_category?:any;
  fileurl?:any;
  advertiseType?: any;
  advertiseTypeKey?: any;
  top_view?:number;



}
export interface ITvnews{
  key: string;
  status?: any;
  page_key?: number;
  create_date?: Date;
  create_by?: object;
  update_date?: Date;
  update_by?: object;
  name:string;
  order:number;
  videos:any;


}
export interface ITvnews {
  key: string;
  status?: any;
  page_key?: number;
  create_date?: Date;
  create_by?: object;
  update_date?: Date;
  update_by?: object;
  name: string;
  order: number;
  videos: any;
  playlist:any;


}

export interface IViseoPlaylist {
  key: string;
  status?: any;
  page_key?: number;
  create_date?: Date;
  create_by?: object;
  update_date?: Date;
  update_by?: object;
  name?: string;
  cover?: string;
  description?: string;
}
export interface IEntertainment{
  key: string;
  status?: any;
  page_key?: number;
  create_date?: Date;
  create_by?: object;
  update_date?: Date;
  update_by?: object;
  name:string;
  order:number;
  videos:any;
}

export interface IContact{
  key: string;
  status?: any;
  page_key?: number;
  create_date?: Date;
  create_by?: object;
  update_date?: Date;
  update_by?: object;
  name:string;
  phonenumber:number;
  email?:any;
  address?:any;

}


export interface IGenre{
  key: string;
  status?: any;
  page_key?: number;
  create_date?: Date;
  create_by?: object;
  update_date?: Date;
  update_by?: object;
  name:string;
  subtitle:string;
  icon:string;
  isTop:boolean;
  fileName?:string;
  fileUrl?:string;
}


export interface ISlide{
  key: string;
  status?: any;
  page_key?: number;
  create_date?: Date;
  create_by?: object;
  update_date?: Date;
  update_by?: object;
  order:number;
  book?:any;
  name:string;
  description?:string;
  fileName?:string;
  fileUrl?:string;
}


export interface IAdvertise{
  key: string;
  status?: any;
  page_key?: number;
  create_date?: Date;
  create_by?: object;
  update_date?: Date;
  update_by?: object;
  book?:any;
  fileurl?:any;
  startDate?:Date;
  expireDate?:Date;
  expireDateKey?:number;
  name:string;
  fileName?:string;
  fileUrl?:string;
  advertiseType: any;
  link?:any;
  orderingNumber:any;
  package:object
}



export interface IBook{
  key: string;
  status: any;
  page_key: number;
  create_date: Date;
  create_by: object;
  update_date?: Date;
  update_by?: object;
  bookStatus:any;
  title:string;
  description?:string;
  genre:any;
  tag:any;
  tagKey:any;
  trending:any;
  publicDate:Date;
  docUrl?:string;
  docName?:string;
  fileName?:string;
  fileUrl?:string;
  paymentType:any;
  paymentTypeKey:any;
  ratingScale:number;
  price:number;
}
export interface Course{
  key: string;
  status: any;
  page_key: number;
  create_date: Date;
  create_by: object;
  update_date?: Date;
  update_by?: object;
  bookStatus:any;
  title:string;
  description?:string;
  genre:any;
  tag:any;
  tagKey:any;
  trending:any;
  publicDate:Date;
  docUrl?:string;
  docName?:string;
  fileName?:string;
  fileUrl?:string;
  paymentType:any;
  paymentTypeKey:any;
  ratingScale:number;
  price:number;
}

export interface IRole {
  key:string,
  create_date: Date,
  create_by: object,
  name: string,
  permission: object
}
