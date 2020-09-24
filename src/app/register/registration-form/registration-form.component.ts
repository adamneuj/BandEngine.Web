import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RegisterModel } from '../../models/auth/register-model';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnDestroy, OnInit {
  private ngUnsubscribe = new Subject();
  public newUser: RegisterModel;
  public status: string[];
  public message: string[];
  public registrationForm: FormGroup;
  @Output() public registrationErrorChange = new EventEmitter<string[]>();
  public hidePassword: boolean;
  public hideReenter: boolean;

  passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  constructor(private formBuilder: FormBuilder, private userService: UserService) {
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

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }


  createForm(): void {
    this.registrationForm = this.formBuilder.group({
      userName: '',
      email: '',
      password: ['', Validators.pattern(this.passwordPattern)],
      reenteredPassword: ''
    });
  }

  findErrors(): string[] {
    const errors = [];
    const controls = this.registrationForm.controls;
    for (const name in controls){
      if (controls[name].invalid){
        switch (name){
          case 'userName': {
            errors.push('*Not a valid UserName');
            break;
          }
          case 'email': {
            errors.push('*Not a valid Email Address');
            break;
          }
          case 'password': {
            errors.push('*Not a valid Password.');
            errors.push('*Passwords need:');
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

  public submit(): void {
    if (this.registrationForm.value.password !== this.registrationForm.value.reenteredPassword) {
      const errors = this.findErrors();
      errors.splice(0, 0, 'Re-entered Password does not match.');
      this.registrationErrorChange.emit(errors);
      return;
    }
    else if (!this.registrationForm.valid) {
      const errors = this.findErrors();
      this.registrationErrorChange.emit(errors);
      return;
    }
    else {
      this.newUser.username = this.registrationForm.value.userName;
      this.newUser.email = this.registrationForm.value.email;
      this.newUser.password = this.registrationForm.value.password;
      this.userService.registerUser(this.newUser).pipe(takeUntil(this.ngUnsubscribe)).subscribe(data => {
        this.message = data.map(x => x.Message );
        this.status = data.map(x =>  x.Status );
      }, error => {
        this.message = error.error.message;
        const errors = [];
        errors.push(this.message.toString());
        this.registrationErrorChange.emit(errors);
      });
      return;
    }
  }
}
