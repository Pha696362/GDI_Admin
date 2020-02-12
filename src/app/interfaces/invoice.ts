export interface IInvoice {
    key?: string;
    create_date_key?: number;
    create_date?: Date;
    create_by?: any;
    invoice_no?: number;
    payment_type?: any;
    subscriber?: any;
    expired_date?: Date;
    expired_date_key?: number;
    invoice_date?: Date;
    invoice_date_key?: number;
    page_key: number;
    product?: any;
    description?: any;
    isPaid?: any;
    isVoid?: boolean;
    price?: number;
    amount?: number;
    received_by?: any;
    received_date?: Date;
    received_date_key?: number;
    note?: string;
    discount?: number;
    headerRef?: any;
    isHeader?: boolean;
  }