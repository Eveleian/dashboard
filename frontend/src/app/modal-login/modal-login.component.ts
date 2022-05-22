import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FormBuilder, FormGroup} from '@angular/forms';
import { SocialAuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.component.html',
  styleUrls: ['./modal-login.component.css']
})
export class ModalLoginComponent{

  email = new FormControl('', [Validators.required, Validators.email]);
  hide = true;
  loginForm!: FormGroup;
  socialUser: SocialUser = new SocialUser;
  isLoggedin: boolean = false;
  
  constructor(
    private formBuilder: FormBuilder, 
    private socialAuthService: SocialAuthService,
    private http : HttpClient,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });    
    
    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = (user != null);
      this.http.get('http://localhost:8080/api/user/login/google/'+this.socialUser.id)
      .subscribe(Response => {
        if(Response == false){
          this.http.post('http://localhost:8080/api/user/',{
            email: this.socialUser.email,
            idGoogle: this.socialUser.id.toString(),
            pseudo: this.socialUser.name
          })
          .subscribe(Response => {
            localStorage.setItem("id",Object.values(Response)[0]);
          });
        }else if(Response == true){

          this.http.get('http://localhost:8080/api/user/google/'+this.socialUser.id)
          .subscribe(Response => {
            localStorage.setItem("id",Object.values(Response)[0]);
            window.location.href = 'http://localhost:8080/';
          });
        }
      });

    });
  }

  @ViewChild('loginPassword') loginPassword!: ElementRef;
  @ViewChild('loginEmail') loginEmail!: ElementRef;

  login(){

    this.http.post('http://localhost:8080/api/user/login',{
      email: this.loginEmail.nativeElement.value,
      password: this.loginPassword.nativeElement.value
    })
    .subscribe(Response => {
      localStorage.setItem("id",Object.values(Response)[0]);
      window.location.href = 'http://localhost:8080/';
    });
    
  }

  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  logOut(): void {
    this.socialAuthService.signOut();
    localStorage.removeItem("id");
  }
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
}