import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterModel } from '../../models/auth/register-model';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {
  newUser: RegisterModel = new RegisterModel();
  registrationForm: FormGroup;

  hidePassword: boolean;
  hideReenter: boolean;
  invalidUsername: boolean;
  invalidEmail: boolean;
  invalidPassword: boolean;
  invalidReentered: boolean;

  passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  constructor(private formBuilder: FormBuilder) {
   }

  ngOnInit(): void {
    this.newUser = new RegisterModel();
    this.registrationForm = new FormGroup({
      userName: new FormControl(),
      email: new FormControl(),
      password: new FormControl(),
      reenteredPassword: new FormControl()
    });
    this.hidePassword = true;
    this.hideReenter = true;
    this.createForm();
  }

  createForm(): void {
    this.registrationForm = this.formBuilder.group({
      userName: '',
      email: '',
      password: ['', Validators.pattern(this.passwordPattern)],
      reenteredPassword: ''
    });
  }

  findInvalidControls(): string[] {
    const invalid = [];
    const controls = this.registrationForm.controls;
    for (const name in controls){
      if (controls[name].invalid){
        invalid.push(name);
      }
    }
    return invalid;
  }

  public submit(): void {
    this.setInvalidsToFalse();
    if (this.registrationForm.value.password !== this.registrationForm.value.reenteredPassword) {
      this.invalidReentered = true;
      console.log('Password does not match.');
      return;
    }
    else if (!this.registrationForm.valid) {
      const invalidControls = this.findInvalidControls();
      for (const key in invalidControls) {
        if (Object.prototype.hasOwnProperty.call(invalidControls, key)) {
          const name = invalidControls[key];
          switch (name){
            case 'userName': {
              this.invalidUsername = true;
              break;
            }
            case 'email': {
              this.invalidEmail = true;
              break;
            }
            case 'password': {
              this.invalidPassword = true;
              break;
            }
          }
        }
      }
      return;
    }
    else {
      console.log(this.registrationForm);
      return;
    }
  }

  setInvalidsToFalse(): void {
    this.invalidUsername = false;
    this.invalidEmail = false;
    this.invalidPassword = false;
    this.invalidReentered = false;
  }
}
