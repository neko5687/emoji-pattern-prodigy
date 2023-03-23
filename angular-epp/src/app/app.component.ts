import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-epp';

  constructor(private router: Router, private http: HttpClient) {
  }

  logout() {
    let token = sessionStorage.getItem('token');
    let payload = {
      sessionId: "",
      userName: ""
    }
    if (!token) {
      this.router.navigate(['/login']);
    } else {
      payload.sessionId = token;
      this.http.post<any>('http://localhost:8080/logout', payload).subscribe()
      sessionStorage.clear();
    }
  }
}
