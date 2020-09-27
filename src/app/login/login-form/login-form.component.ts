import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  public loginForm: FormGroup;
  public hidePassword = true;

  @Output() public loginErrorChange = new EventEmitter<string[]>();

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

  findErrors(): string[] {
    const errors = [];
    const controls = this.loginForm.controls;
    for (const name in controls){
      if (controls[name].invalid){
        switch (name){
          case 'userNameOrEmail': {
            errors.push('*Please enter a UserName or Email');
            break;
          }
          case 'password': {
            errors.push('*Please enter a valid Password')
            errors.push('');
            errors.push('*Passwords have:');
            errors.push('- 1 Uppercase Letter,');
            errors.push('- 1 Lowercase Letter,');
            errors.push('- 1 Number,');
            errors.push('- 1 Special Character.');
            break;
          }
        }
      }
    }
    return errors;
  }

  submit(): void {
    if (!this.loginForm.valid){
      const errors = this.findErrors();
      console.log(errors);
      this.loginErrorChange.emit(errors);
      return;
    } else {
      console.log('Submitted');
    }
  }

}
