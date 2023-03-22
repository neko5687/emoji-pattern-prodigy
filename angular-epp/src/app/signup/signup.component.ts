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
  model: any = {
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
  ) { }
  signup() {
    if (this.model.password1 !== this.model.password2) {
      alert("passwords are not matching")
      this.model.password1 = "";
      this.model.password2 = "";
    } else {
      this.payload.username = this.model.username;
      this.payload.email = this.model.email;
      this.payload.password = this.model.password1;
      this.http.post<any>('http://localhost:8080/signup', this.payload)
        .subscribe(res => {this.router.navigate(['/login'])})
    }
  }
}
