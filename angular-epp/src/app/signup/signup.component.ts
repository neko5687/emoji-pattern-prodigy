import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

interface SignupRequestPayload {
  username: string,
  password: string,
  email: string
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  model = {
    username: "",
    password1: "",
    password2: "",
    email: ""
  };
  payload: SignupRequestPayload = {
    username: '',
    email: '',
    password: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {
  }

  signup() {
    this.payload.username = this.model.username;
    this.payload.email = this.model.email;
    this.payload.password = this.model.password1;
    this.http.post<any>('http://localhost:8080/signup', this.payload)
      .subscribe(res => {
        this.router.navigate(['/login'])
      })
  }

  isValidEmail(): boolean {
    // regular expression to match email addresses
    const emailRegex = /^[a-zA-Z0-9]+([._-][a-zA-Z0-9]+)*@[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*(\.[a-zA-Z0-9]{2,})+$/;
    // test the email against the regex and return the result
    return emailRegex.test(this.model.email);
  }

  isMatchingPasswords(): boolean {
    return this.model.password1 === this.model.password2 &&
      this.model.password1.length !== 0 &&
      this.model.password2.length !== 0
  }

  isValidUsername(): boolean {
    if (this.model.username.length === 0) {
      return false;
    }
    const allowedChars = /^[a-zA-Z0-9._-]*$/;
    if (!allowedChars.test(this.model.username)) {
      return false;
    }
    return true;
  }


  isValidPassword(): boolean {
    // Check length
    if (this.model.password1.length < 8) {
      return false;
    }
    // Check characters
    const allowedChars = /^[a-zA-Z0-9!._\-?]*$/;
    if (!allowedChars.test(this.model.password1)) {
      return false;
    }
    return true;
  }
}
