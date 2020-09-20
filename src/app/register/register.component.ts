import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { RegisterModel } from '../models/auth/register-model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  newUser: RegisterModel = new RegisterModel();

  hidePassword = true;
  hideReenter = true;

  registrationForm = new FormGroup({
    userName: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
    reenteredPassword: new FormControl()
  });

  constructor(private formBuilder: FormBuilder) {
    this.createForm();
   }

  ngOnInit(): void {
  }

  createForm(): void {
    this.registrationForm = this.formBuilder.group({
      userName: '',
      email: '',
      password: '',
      reenteredPassword: ''
    });
  }

  public submit(): void {
    if(this.registrationForm.value.password !== this.registrationForm.value.reenteredPassword) {
      console.log('Password does not match.');
      return;
    }
    console.log(this.registrationForm);
  }

}
