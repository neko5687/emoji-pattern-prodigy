import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

interface UserDTO {
  userName: string,
  password: string
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: UserDTO = {
    userName: "",
    password: ""
  };
  sessionId: any = "";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit() {
    sessionStorage.setItem('token', '');
  }

  login() {
    this.http.post<any>('http://localhost:8080/login', this.model).subscribe(res => {
        this.sessionId = res.sessionId;
        console.log(this.model)
        sessionStorage.setItem(
          'token',
          this.sessionId
        );
        this.router.navigate(['/matrices']);
      }, error => alert("Authentication failed"));
  }
}
