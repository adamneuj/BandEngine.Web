import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  public loginForm: FormGroup;
  public hidePassword = true;

  passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      userNameOrEmail: new FormControl(),
      password: new FormControl()
    });
    this.createForm();
  }

  createForm(): void {
    this.loginForm = this.formBuilder.group({
      userNameOrEmail: '',
      password: ['', Validators.pattern(this.passwordPattern)]
    });
  }

  submit(): void {
    if (!this.loginForm.valid){
      console.log('Invalid form');
    } else {
      console.log('Submitted');
    }
  }

}
