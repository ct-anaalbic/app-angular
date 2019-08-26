import { NgModule } from '@angular/core';

import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
    declarations: [SignInComponent, SignUpComponent],
    imports: [CommonModule, FormsModule, AuthRoutingModule]
})
export class AuthModule {

}
