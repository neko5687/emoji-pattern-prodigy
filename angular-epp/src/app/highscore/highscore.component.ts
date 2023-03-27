import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

interface User {
  userName: string,
  points: number
}

@Component({
  selector: 'app-highscore',
  templateUrl: './highscore.component.html',
  styleUrls: ['./highscore.component.css']
})
export class HighscoreComponent implements OnInit {
  users: User[] = [];
  userName: string | null = "";
  userPoints: string | null = "";

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.http.get<User[]>('http://localhost:8080/api/highscore').subscribe(res => {
        this.users = res;
        this.users.sort((first, second) => second.points - first.points)
      }
    );
    if (sessionStorage.getItem("token") != null && sessionStorage.getItem("token")?.length != 0) {
      this.userName = sessionStorage.getItem("userName");
      this.userPoints = sessionStorage.getItem("points");
    }
  }


}
