import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

interface MatrixDTO {
  title: String,
  matrix: String,
  vote: number,
  difficulty: number,
  createdAt: String,
}

interface Matrix {
  title: String,
  matrix: String[],
  vote: number,
  difficulty: String,
  createdAt: String,
}


@Component({
  selector: 'app-matrices',
  templateUrl: './matrices.component.html',
  styleUrls: ['./matrices.component.css']
})
export class MatricesComponent implements OnInit {
  matrices: Matrix[] = [];

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.http.get<MatrixDTO[]>("http://localhost:8080/api/matrices")
      .subscribe(result => {this.matrices = result.map(dto => this.convertDTOtoMatrix(dto))});
  }

  convertDTOtoMatrix(matrixDto: MatrixDTO): Matrix {
    const matrix: Matrix = {
      title: matrixDto.title,
      matrix: matrixDto.matrix.match(/\p{Emoji}/gu) || [],
      vote: matrixDto.vote,
      difficulty: "🌶️".repeat(matrixDto.difficulty),
      createdAt: matrixDto.createdAt,
    };
    return matrix;
  }
}
