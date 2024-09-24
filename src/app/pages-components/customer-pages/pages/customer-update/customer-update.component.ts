import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { ICustomerData, InputFieldForm } from '../../interfaces/customer';

@Component({
  selector: 'app-customer-update',
  templateUrl: './customer-update.component.html',
  styleUrl: './customer-update.component.css'
})
export class CustomerUpdateComponent {
  customerFormGroup!: FormGroup;
  customerIdParam: string= "";
  customerSingleData: ICustomerData|null= null;

  constructor (
    private customerService: CustomerService,

  ){}


  restrictPropagationFunction($event: Event){
    $event.stopPropagation();
  }

  @Input()
  customerFormGroupChild!: FormGroup;

  @Input()
  singleCustomerDataChild: ICustomerData|null= null;

  @Output()
  customerDataEmitter= new EventEmitter<ICustomerData>();


  updatedSuccessfullyState:boolean= false;
  overlayUpdateState:boolean= false;

  updateCustomer(formData: InputFieldForm){

    if (
      Number.isNaN(this.singleCustomerDataChild?.id) !== true
      &&formData.address && formData.address.trim() !== ""
      && formData.email && formData.email.trim() !== ""
      && formData.name && formData.name.trim() !== ""
      && formData.phone && formData.phone.trim() !== "null"
    ){

      this.overlayUpdateState= true;

      const customerUpdateData:ICustomerData= {
        id: this.singleCustomerDataChild!.id,
        address: {street: formData.address},
        email: formData.email,
        name: formData.name,
        phone: formData.phone
      }

      this.customerService.editCustomer(
        customerUpdateData
      ).subscribe((data) => {
        customerUpdateData.id <11 ?
          this.customerDataEmitter.emit(data)
          :this.customerDataEmitter.emit(customerUpdateData);

        this.updatedSuccessfullyState= true;
        this.overlayUpdateState= false;
        console.log(data);
      });
    }

  }

}

