import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

interface MatrixDTO {
  title: String,
  matrix: String,
  vote: number,
  difficulty: number,
  createdAt: String,
  creator: {
    name: string
  }
}

interface Matrix {
  title: String,
  matrix: String[],
  vote: number,
  difficulty: String,
  createdAt: String,
  creator: {
    name: string
  }
}

@Component({
  selector: 'app-matrix',
  templateUrl: './matrix.component.html',
  styleUrls: ['./matrix.component.css']
})
export class MatrixComponent implements OnInit {
  matrixId: number = 0;
  matrix: Matrix = {
    title: '',
    matrix: [],
    vote: 0,
    difficulty: '',
    createdAt: '',
    creator: {
      name: ''
    }
  };

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {
  }

  ngOnInit(): void {

    let idParam: string = this.route.snapshot.paramMap.get("id") ?? "unknown";
    if (isNaN(Number(idParam))) {
      this.router.navigate(["/error"]);
    } else {
      this.matrixId = Number(idParam);
    }
    this.http.get<MatrixDTO>('http://localhost:8080/api/matrices/' + this.matrixId).subscribe(
      result => this.matrix = this.convertDTOtoMatrix(result),
      error => this.router.navigate(["/error"])
    );
  }

  convertDTOtoMatrix(matrixDto: MatrixDTO): Matrix {
    const matrix: Matrix = {
      title: matrixDto.title,
      matrix: matrixDto.matrix.match(/\p{Emoji}/gu) || [],
      vote: matrixDto.vote,
      difficulty: "🌶️".repeat(matrixDto.difficulty),
      createdAt: matrixDto.createdAt,
      creator: matrixDto.creator
    };
    return matrix;
  }

}
