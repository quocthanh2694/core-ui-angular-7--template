import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { TranslateModule } from '@ngx-translate/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AuthManagementRoutingModule } from './auth-management-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/auth-service/login.service';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    AuthManagementRoutingModule,
    ChartsModule,
    BsDropdownModule,
    TranslateModule,
    ModalModule.forRoot(),
    ButtonsModule.forRoot(),
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
  ],
  providers: [
    LoginService,
  ],
})
export class AuthManagementModule { }
