export interface IUser {
  key?: string;
  status?: any;
  page_key?: number;
  create_date?: Date;
  create_by?: object;
  update_date?: Date;
  update_by?: object;
  province?: any;
  district?: any;
  commune?: any;
  address?: string;
  email?: string;
  phone?: string;
  phoneNumber?: string;
  facebook?: string;
  linkin?:string;
  googleplus?:string;
  telegram?: string;
  pin_code?: string;
  displayName?: string;
  first_name?: string;
  last_name?: string;
  name?: string;
  position?: any;
  title?: any;
  gender?: any;
  dob?: Date;
  dob_key?: number;
  url?: any;
  description?: string;
  roles?: any;
  profile?:any;
}

export interface ICreateBy {
  key:string;
  name:string;
  email:string;

}
