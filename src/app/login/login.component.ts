import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errors: string[];

  constructor() { }

  ngOnInit(): void {
  }

  getErrors(errors): void {
    this.errors = errors;
  }

}
