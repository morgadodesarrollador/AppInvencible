import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  nombre = 'fadsfasdkfs';
  constructor() { }

  ngOnInit() {}

  register(fRegister: NgForm){
    console.log(fRegister.valid);
  }

}
