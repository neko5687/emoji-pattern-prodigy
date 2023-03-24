import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

interface MatrixDTO {
  id: number
  title: string,
  matrix: string,
  vote: number,
  difficulty: number,
  createdAt: string,
}

interface Matrix {
  id: number,
  title: string,
  matrix: string[],
  vote: number,
  difficulty: string,
  createdAt: string,
}


@Component({
  selector: 'app-matrices',
  templateUrl: './matrices.component.html',
  styleUrls: ['./matrices.component.css']
})
export class MatricesComponent implements OnInit {
  matrices: Matrix[] = [];
  sortMode: "ascending" | "descending" = "ascending";



  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.http.get<MatrixDTO[]>("http://localhost:8080/api/matrices")
      .subscribe(result => {
        this.matrices = result.map(dto => this.convertDTOtoMatrix(dto))
      });
  }

  convertDTOtoMatrix(matrixDto: MatrixDTO): Matrix {
    const matrix: Matrix = {
      id: matrixDto.id,
      title: matrixDto.title,
      matrix: matrixDto.matrix.split(","),
      vote: matrixDto.vote,
      difficulty: "🌶️".repeat(matrixDto.difficulty),
      createdAt: matrixDto.createdAt,
    };
    return matrix;
  }


  sortByVoteTopDown(matrices: Matrix[]): Matrix[] {
    return matrices.sort((first, second) => second.vote - first.vote);
  }


  sortByVoteDownTop(matrices: Matrix[]) {
    return matrices.sort((first, second) => first.vote - second.vote);
  }

  sortByVote() {
    this.sortMode = (this.sortMode === "ascending") ? "descending" : "ascending";
    if (this.sortMode === "ascending") {
      this.matrices = this.sortByVoteTopDown(this.matrices);
    } else {
      this.matrices = this.sortByVoteDownTop(this.matrices);
    }
  };

  sortByDifficultyTopDown(matrices: Matrix[]): Matrix[] {
    return matrices.sort((first, second) => (second.difficulty.length) - (first.difficulty.length));
  }

  sortByDifficultyDownTop(matrices: Matrix[]): Matrix[] {
    return matrices.sort((first, second) => (first.difficulty.length) - (second.difficulty.length));
  }

  sortByDifficulty() {
    this.sortMode = (this.sortMode === "ascending") ? "descending" : "ascending";
    if (this.sortMode === "ascending") {
      this.matrices = this.sortByDifficultyTopDown(this.matrices);
    } else {
      this.matrices = this.sortByDifficultyDownTop(this.matrices);
    }
  };

}
