import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;


  constructor(private router: Router) {
    this.form = new FormGroup({
      username: new FormControl('',[]),
      password: new FormControl('',[])
    })
  }

  ngOnInit(): void {
  }

  onSubmit(formValue) {
    this.router.navigate(['home'])

  }
}
