import { Component, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  errors: string[];

  constructor() {}

  ngOnInit(): void {
  }

  getErrors(errors): void {
    console.log(errors);
    this.errors = errors;
  }

}
