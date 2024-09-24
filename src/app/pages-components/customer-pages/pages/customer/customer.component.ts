import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { ICustomerData, ICustomerDatas } from '../../interfaces/customer';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent implements OnInit {

  constructor(
      private router: Router,
      private customerService: CustomerService,
      private formBuilder: FormBuilder
    ) {}


  displayedColumns: string[] = ['position', 'name', 'email', 'address', 'phone', 'actions'];
  dataSource!:ICustomerDatas;
  spinnerState: boolean = false;
  deleteButtonState: boolean = false;

  ngOnInit(): void {
    this.customerService.dataSource.length === 0 && this.setCustomers();

    this.dataSource= this.customerService.dataSource;
  }



  goTo(){
    this.router.navigateByUrl('customer/new');
  }


  restrictPropagationFunction($event: Event){
    $event.stopPropagation();
  }


  overlayState: boolean = false;
  singleCustomerData:ICustomerData|null= null;


  // ++++++++++++++++++ SEARCH INPUT +++++++++++++++++
  searchInputValue= "";
  makeSearchValue(){
    const newDataSource= this.customerService.dataSource.filter(
      (value) => {
        const nameExist= value.name.toLowerCase().includes(this.searchInputValue.toLowerCase());
        return nameExist? nameExist : value.email.toLowerCase().includes(this.searchInputValue.toLowerCase());;
      }
    );

    this.dataSource= [...newDataSource];
  };


  // ++++++++++++++++++++++ VIEW CUSTOMER ++++++++++++++++++
  viewCutomerState:boolean = false;
  viewSingleCustomerData(customer: ICustomerData){
    this.singleCustomerData= customer;
    this.viewCutomerState= true;
  }



  // ++++++++++++++++ UPDATE CUSTOMER +++++++++++++++++++++
  editCutomerState:boolean = false;

  updatedSuccessfullyState:boolean= false;
  overlayUpdateState:boolean= false;
  editSingleCustomerData(customer: ICustomerData){
    this.singleCustomerData= customer;
    this.createCustomerForm();
    this.editCutomerState= true;
  }

  customerFormGroup!: FormGroup;
  createCustomerForm(){
    this.customerFormGroup= this.formBuilder.group({
      name: [this.singleCustomerData?.name, [Validators.required, Validators.minLength(4)]],
      email: [this.singleCustomerData?.email, [Validators.required, Validators.email, Validators.minLength(5)]],
      phone: [this.singleCustomerData?.phone, [Validators.required]],
      address: [this.singleCustomerData?.address?.street, [Validators.required, Validators.minLength(6)]]
    });
  }

  updateDataSourceFromChild($event:ICustomerData){
    const dataIndex= this.dataSource.findIndex(
      (item) => {
        return item.id=== $event.id
      }
    );

    this.dataSource[dataIndex]= $event;
    this.dataSource= [...this.dataSource];
    this.customerService.dataSource= this.dataSource;
  }




  // +++++++++++++++++++++++ DELETE DATA +++++++++++++++++++
  deleteCustomer(id:string){
    this.deleteButtonState= true;

    this.customerService.deleteCustomer(id).subscribe((response) => {
      const dataIndex= this.dataSource.findIndex(
        (item) => {
          return item.id=== parseInt(id);
        }
      );

      this.customerService.dataSource.splice(dataIndex, 1);
      this.dataSource= this.customerService.dataSource;
      this.dataSource= [...this.dataSource];
      this.overlayState= true;
      this.deleteButtonState= false;
    })
  }


  setCustomers(){
    this.spinnerState= true;

    this.customerService.getCustomers().subscribe((data)=> {
      this.customerService.dataSource= data;
      this.dataSource= this.customerService.dataSource;
      this.spinnerState = false;
    })
  }

}
