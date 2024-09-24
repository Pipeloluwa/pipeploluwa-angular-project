import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './pages-components/customer-pages/pages/customer/customer.component';
import { CustomerCreateComponent } from './pages-components/customer-pages/pages/customer-create/customer-create.component';
import { CustomerUpdateComponent } from './pages-components/customer-pages/pages/customer-update/customer-update.component';
import { CustomerViewComponent } from './pages-components/customer-pages/pages/customer-view/customer-view.component';

const routes: Routes = [
  {path: "", redirectTo: "/customer", pathMatch: "full"},
  {path: "customer", component: CustomerComponent},
  {path: "customer/new", component: CustomerCreateComponent},
  {path: "customer/update/:id", component: CustomerUpdateComponent},
  {path: "customer/view/:id", component: CustomerViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
