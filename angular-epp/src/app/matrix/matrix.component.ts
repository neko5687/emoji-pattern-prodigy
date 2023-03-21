import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

interface MatrixDTO {
  id: number,
  title: string,
  matrix: string,
  vote: number,
  difficulty: number,
  createdAt: string,
  creatorName: string
}

interface Matrix {
  id: number,
  title: string,
  matrix: string[],
  vote: number,
  difficulty: string,
  createdAt: string,
  creatorName: string
}

@Component({
  selector: 'app-matrix',
  templateUrl: './matrix.component.html',
  styleUrls: ['./matrix.component.css']
})
export class MatrixComponent implements OnInit {
  matrixId: number = 0;

  matrixSolution: String = "";

  possibleInput: string[] = [];
  isSolving: boolean = false;
  afterSolving: boolean = false;
  isCorrect: boolean = false;
  matrix: Matrix = {
    id: 0,
    title: '',
    matrix: [],
    vote: 0,
    difficulty: '',
    createdAt: '',
    creatorName: ''
  };
  intervalId: any;
  remainingSeconds: number = 5;

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
      id: matrixDto.id,
      title: matrixDto.title,
      matrix: matrixDto.matrix.match(/\p{Emoji}/gu) || [],
      vote: matrixDto.vote,
      difficulty: "🌶️".repeat(matrixDto.difficulty),
      createdAt: matrixDto.createdAt,
      creatorName: matrixDto.creatorName
    };
    return matrix;
  }


  startSolving() {
    this.getPossibleInput();
    this.startTimer()
    this.isSolving = true;
  }

  getPossibleInput() {
    this.possibleInput = [...new Set(this.matrix.matrix)];
  }


  endSolving() {
    this.afterSolving = true;
    if (this.matrixSolution === this.matrix.matrix[24]) {
      this.isCorrect = true;
    }
  }

  startTimer() {
    this.intervalId = setInterval(() => {
      this.remainingSeconds--;
      if (this.remainingSeconds === 0) {
        clearInterval(this.intervalId);
        this.endSolving();
      }
    }, 1000);
  }
}
