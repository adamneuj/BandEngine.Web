import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-registration-errors',
  templateUrl: './registration-errors.component.html',
  styleUrls: ['./registration-errors.component.css']
})
export class RegistrationErrorsComponent implements OnInit {

  @Input() errors: string[];

  constructor() { }

  ngOnInit(): void {
  }

}
