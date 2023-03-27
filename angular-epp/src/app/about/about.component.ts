import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit{
userName: string | null = "";
userPoints: string | null = "";
  ngOnInit(): void {
    if (sessionStorage.getItem("token") != null && sessionStorage.getItem("token")?.length != 0){
      this.userName = sessionStorage.getItem("userName");
      this.userPoints = sessionStorage.getItem("points");
    }
  }

}
