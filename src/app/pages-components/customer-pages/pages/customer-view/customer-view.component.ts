import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICustomerData } from '../../interfaces/customer';
import { CustomerService } from '../../services/customer.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer-view',
  templateUrl: './customer-view.component.html',
  styleUrl: './customer-view.component.css'
})
export class CustomerViewComponent {
  customerFormGroup!: FormGroup;
  customerIdParam: string= "";
  customerSingleData: ICustomerData|null= null;

  constructor (
    private route: ActivatedRoute,
    private location: Location,
    private formBuilder: FormBuilder,
    private customerService: CustomerService,

  ){}


  @Input()
  singleCustomerDataChild:ICustomerData|null= null;



  restrictPropagationFunction($event: Event){
    $event.stopPropagation();
  }

}


