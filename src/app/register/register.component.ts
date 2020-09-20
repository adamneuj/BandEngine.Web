import { Component, OnInit } from '@angular/core';
import { RegisterModel } from '../models/auth/register-model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public newUser: RegisterModel;

  constructor() { }

  ngOnInit(): void {
  }

}
