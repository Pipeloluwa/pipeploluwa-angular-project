import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICustomerData, ICustomerDatas, ICustomerPostForm } from '../interfaces/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpClient: HttpClient) { }

  dataSource:ICustomerDatas=[];

  getCustomers(): Observable<ICustomerDatas>{
    return this.httpClient.get<ICustomerDatas>('https://jsonplaceholder.typicode.com/users');
  }

  getCustomerSingle(id:number): Observable<ICustomerData>{
    return this.httpClient.get<ICustomerData>(`https://jsonplaceholder.typicode.com/users/${id}`);
  }

  createCustomer(data: ICustomerPostForm): Observable<ICustomerData>{
    return this.httpClient.post<ICustomerData>(
      'https://jsonplaceholder.typicode.com/users',
      data
    );
  }

  editCustomer(data: ICustomerData): Observable<ICustomerData>{
    return this.httpClient.put<ICustomerData>(
      `https://jsonplaceholder.typicode.com/users/${data.id < 11 ? data.id : 1}`,
      data
    );
  }
  deleteCustomer(id: string): Observable<ICustomerDatas>{
    return this.httpClient.delete<ICustomerDatas>(`https://jsonplaceholder.typicode.com/users/${id}`);
  }

}
