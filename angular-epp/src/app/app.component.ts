import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import { Mode } from "./mode-toggle/mode-toggle.model";
import { ModeToggleService } from "./mode-toggle/mode-toggle.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-epp';
  isLoggedIn: boolean;

  currentMode: Mode = Mode.LIGHT;
  constructor(private router: Router, private http: HttpClient, private modeToggleService: ModeToggleService) {
    if (sessionStorage.getItem("token") == null) {
      this.isLoggedIn = false;
    }
    else {
      this.isLoggedIn = sessionStorage.getItem("token")?.length != 0;
    }
    this.modeToggleService.modeChanged$.subscribe((mode: Mode) => {
      this.currentMode = mode;
    });

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
      this.isLoggedIn = false;
      this.router.navigate(['/matrices']);
    }
  }
}
