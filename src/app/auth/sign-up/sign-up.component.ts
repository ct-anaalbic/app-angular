import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup = new FormGroup({
  'mail': new FormControl(null),
  'password': new FormControl(null)
});

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSignUp(form) {
    const mail = form.value.email;
    const password = form.value.password;
    this.authService.signUpUser(mail, password);
  }

}
