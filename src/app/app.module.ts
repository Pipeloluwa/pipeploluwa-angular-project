import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerComponent } from './pages-components/customer-pages/pages/customer/customer.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MaterialModule } from './sharedModules/material/material.module';
import { CustomerCreateComponent } from './pages-components/customer-pages/pages/customer-create/customer-create.component';
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerUpdateComponent } from './pages-components/customer-pages/pages/customer-update/customer-update.component';
import { CustomerViewComponent } from './pages-components/customer-pages/pages/customer-view/customer-view.component';
import { SpinnerProgressComponent } from './general-components/spinner-progress/spinner-progress.component';


@NgModule({
  declarations: [
    AppComponent,
    CustomerComponent,
    CustomerCreateComponent,
    CustomerUpdateComponent,
    CustomerViewComponent,
    SpinnerProgressComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
    provideHttpClient(withInterceptorsFromDi())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
