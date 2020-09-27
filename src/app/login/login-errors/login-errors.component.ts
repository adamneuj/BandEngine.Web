import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-errors',
  templateUrl: './login-errors.component.html',
  styleUrls: ['./login-errors.component.css']
})
export class LoginErrorsComponent implements OnInit {

  @Input() errors: string[];

  constructor() { }

  ngOnInit(): void {
  }

}
