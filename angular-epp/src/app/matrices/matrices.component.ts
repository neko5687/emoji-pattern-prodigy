import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

interface MatrixDTO {
  title: String,
  matrix: String,
  votes: number,
  difficulty: number,
  createdAt: String,
  creator: String
}

interface Matrix {
  title: String,
  matrix: String[],
  votes: number,
  difficulty: String,
  createdAt: String,
  creator: String
}

@Component({
  selector: 'app-matrices',
  templateUrl: './matrices.component.html',
  styleUrls: ['./matrices.component.css']
})
export class MatricesComponent implements OnInit{
  matrices: MatrixDTO[] = [];
  constructor(private http: HttpClient) {
  }
  ngOnInit(): void {
    this.http.get<MatrixDTO[]>("http://localhost:8080/api/matrices").subscribe(result => this.matrices = result);
  }

  convertDTOtoMatrix (matrixDto: MatrixDTO) : Matrix {
    const matrix: Matrix = {
      title: matrixDto.title,
      matrix: matrixDto.matrix.match(/\p{Emoji}/gu) || [],
      votes: matrixDto.votes,
      difficulty: "🌶️".repeat(matrixDto.difficulty),
      createdAt: matrixDto.createdAt,
      creator: matrixDto.creator
    };
    return matrix;
  }
}
