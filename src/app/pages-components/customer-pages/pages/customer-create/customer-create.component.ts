import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { Location } from '@angular/common';
import { ICustomerData, InputFieldForm, ICustomerPostForm } from '../../interfaces/customer';

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrl: './customer-create.component.css'
})
export class CustomerCreateComponent implements OnInit {
  customerFormGroup!: FormGroup;

  constructor (
    private location: Location,
    private formBuilder: FormBuilder,
    private customerService: CustomerService
  ){}



  createNewCustomerResponse!:ICustomerData;

  ngOnInit(): void {
      this.createCustomerForm();
  }


  navigateBack(){
    this.location.back();
  }

  createCustomerForm(){
    this.customerFormGroup= this.formBuilder.group({
      name: [, [Validators.required, Validators.minLength(4)]],
      email: [, [Validators.required, Validators.email, Validators.minLength(5)]],
      phone: [, [Validators.required, Validators.minLength(10), Validators.maxLength(11)]],
      address: [, [Validators.required, Validators.minLength(6)]]
    });
  }


  restrictPropagation(event: Event){
    event.stopPropagation();
  }

  overlayState: boolean = false;
  spinnerState: boolean = false;

  createNewCustomer(formData: InputFieldForm){

    if (
      formData.address && formData.address.trim() !== ""
      && formData.email && formData.email.trim() !== ""
      && formData.name && formData.name.trim() !== ""
      && formData.phone && formData.phone.trim() !== "null"
    ){
      this.spinnerState= true;

      const customerPostData:ICustomerPostForm= {
        address: {street: formData.address},
        email: formData.email,
        name: formData.name,
        phone: formData.phone
      }

      this.customerService.createCustomer(
        customerPostData
      ).subscribe((data) => {
        this.createNewCustomerResponse= data;
        const getProductOfLastIndex= this.customerService.dataSource[this.customerService.dataSource.length-1];
        if (getProductOfLastIndex.id > 10){
          data.id= getProductOfLastIndex.id + 1;
          this.customerService.dataSource.push(data);
        }else{
          this.customerService.dataSource.push(data);
        }
        this.overlayState= true;
        this.spinnerState= false;
        console.log(data);
      });
    }

  }
}
