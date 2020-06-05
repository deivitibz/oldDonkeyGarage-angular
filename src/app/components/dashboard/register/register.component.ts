import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  formulario: FormGroup


  constructor() {


    this.formulario = new FormGroup({

      email: new FormControl(''),
      password: new FormControl(''),
      repeatPassword: new FormControl(''),
      name: new FormControl(''),
      subname: new FormControl(''),
      user: new FormControl(''),
      phone: new FormControl(''),
      location: new FormControl(''),




    })

  }

  ngOnInit(): void {
  }
  onSubmit() {

    //console.log(this.formulario.value);

  }
}
