import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-modal-signup',
  templateUrl: './modal-signup.component.html',
  styleUrls: ['./modal-signup.component.css']
})
export class ModalSignupComponent {

  constructor(private http : HttpClient) { }
  email = new FormControl('', [Validators.required, Validators.email]);
  hide = true;
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  @ViewChild('singupPassword') singupPassword!: ElementRef;
  @ViewChild('singupPseudo') singupPseudo!: ElementRef;
  @ViewChild('singupEmail') singupEmail!: ElementRef;

  singup(){

    this.http.post('http://localhost:8080/api/user/',{
      email: this.singupEmail.nativeElement.value,
      password: this.singupPassword.nativeElement.value,
      pseudo: this.singupPseudo.nativeElement.value
    })
    .subscribe(Response => {
      console.log(Response)
    });
    
  }

}
