import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

interface MatrixCreationDTO {
  title : string;
  matrix : string;
  difficulty : number;
  creatorName : string;
  hint : string;
}

interface Matrix {
  id: number,
  title: string,
  matrix: string[],
  vote: number,
  difficulty: string,
  createdAt: string,
  creatorName: string,
  hint: string
}
@Component({
  selector: 'app-matrixcreation',
  templateUrl: './matrixcreation.component.html',
  styleUrls: ['./matrixcreation.component.css']
})
export class MatrixcreationComponent implements OnInit{

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {
  }
  ngOnInit(): void {
  }


  validateMatrixString(input: string): boolean {
    const emojiPattern = /[\p{So}\p{Sk}]/u;
    return input.match(emojiPattern)?.join("") === input;
  }


}
