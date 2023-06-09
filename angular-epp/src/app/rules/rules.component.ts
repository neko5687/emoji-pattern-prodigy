import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.css']
})
export class RulesComponent implements OnInit{
  userName: string | null = "";
  userPoints: string | null = "";

  ngOnInit(): void {
    if (sessionStorage.getItem("token") != null && sessionStorage.getItem("token")?.length != 0) {
      this.userName = sessionStorage.getItem("userName");
      this.userPoints = sessionStorage.getItem("points");
    }
  }
}
