import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-algorithmic-thinking',
  templateUrl: './algorithmic-thinking.component.html',
  styleUrls: ['./algorithmic-thinking.component.css']
})
export class AlgorithmicThinkingComponent implements OnInit{
 userName: string | null = "";
 userPoints: string | null = "";
  ngOnInit(): void {
    if (sessionStorage.getItem("token") != null && sessionStorage.getItem("token")?.length != 0){
      this.userName = sessionStorage.getItem("userName");
      this.userPoints = sessionStorage.getItem("points");
    }
  }
}
