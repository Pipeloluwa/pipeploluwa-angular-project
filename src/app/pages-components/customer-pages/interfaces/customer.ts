export interface ICustomerData {
  id: number;
  name: string;
  email:string;
  address: IAddressData;
  phone: string;
}


export interface IAddressData{
  street: string;
  city?: string;
  suite?: string;
  zipcode?: string;
}


export interface ICustomerPostForm {
  name: string;
  email:string;
  address: IAddressData;
  phone: string;
}

export interface InputFieldForm {
  name: string;
  email:string;
  address: string;
  phone: string;
}

export type ICustomerDatas= Array<ICustomerData>;
