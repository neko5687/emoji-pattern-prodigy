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
  creatorName: string,
  hint: string
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

interface MatrixDTOVote {
  id: number,
  vote: number
}

@Component({
  selector: 'app-matrix',
  templateUrl: './matrix.component.html',
  styleUrls: ['./matrix.component.css']
})
export class MatrixComponent implements OnInit {
  matrixId: number = 0;

  matrixSolution: string = "?";

  possibleInput: string[] = [];
  isSolving: boolean = false;
  afterSolving: boolean = false;
  isCorrect: boolean = false;
  hintVisible: boolean = false;

  matrix: Matrix = {
    id: 0,
    title: '',
    matrix: [],
    vote: 0,
    difficulty: '',
    createdAt: '',
    creatorName: '',
    hint: ''
  };
  intervalId: any;
  remainingSeconds: any = 15;
  votingPossible: boolean = false;

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
      creatorName: matrixDto.creatorName,
      hint: matrixDto.hint
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
    this.hintVisible = false;
    this.votingPossible = true;
    if (this.matrixSolution === this.matrix.matrix[24]) {
      this.isCorrect = true;
    }
  }

  startTimer() {
    let seconds: number;
    this.intervalId = setInterval(() => {
      this.remainingSeconds--;
      if (this.remainingSeconds < 10) {
        this.remainingSeconds = "0" + this.remainingSeconds;
        if (this.remainingSeconds === "0" + 0) {
          clearInterval(this.intervalId);
          this.endSolving();
        }
      }
    }, 1000);
  }

  showHint() {
    this.hintVisible = true;
  }

  upvote() {
    this.votingPossible = false;
    let payload: MatrixDTOVote = {id: this.matrix.id, vote: (this.matrix.vote + 1)}
    this.http.post<MatrixDTOVote>('http://localhost:8080/api/matrices/' + this.matrixId, payload).subscribe(()=> location.reload());
  }


  downvote() {
    this.votingPossible = false;
    let payload: MatrixDTOVote = {id: this.matrix.id, vote: (this.matrix.vote - 1)}
    this.http.post<MatrixDTOVote>('http://localhost:8080/api/matrices/' + this.matrixId, payload).subscribe(()=> location.reload());
  }
}
