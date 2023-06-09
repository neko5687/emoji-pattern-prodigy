import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient, HttpParams} from "@angular/common/http";


interface MatrixDTO {
  id: number,
  title: string,
  matrix: string,
  vote: number,
  difficulty: number,
  createdAt: string,
  creatorName: string,
  hint: string
  hiddenItem: number;
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
  hiddenItem: number
}

interface MatrixDTOVote {
  id: number,
  vote: number
}

interface SolvedDTO {
  points: number,
  userName: string | null,
  matrixId: number
}

interface MatrixUserDTO {
  name: string | null,
  solved: string | null
}

@Component({
  selector: 'app-matrix',
  templateUrl: './matrix.component.html',
  styleUrls: ['./matrix.component.css']
})
export class MatrixComponent implements OnInit, OnDestroy {
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
    hint: '',
    hiddenItem: 0
  };
  intervalId: any;
  remainingSeconds: any = 15;
  solvingSeconds: number = 0;
  votingPossible: boolean = false;

  alreadySolved: boolean = false;

  points: number = 0;
  maximumPoints: number = 0;
  userName: string | null;
  userPoints: string | null;
  solvedMatrices: number[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {
    this.userName = sessionStorage.getItem("userName");
    this.userPoints = sessionStorage.getItem("points");
  }

  ngOnInit(): void {

    let idParam: string = this.route.snapshot.paramMap.get("id") ?? "unknown";
    if (isNaN(Number(idParam))) {
      this.router.navigate(["/error"]);
    } else {
      this.matrixId = Number(idParam);
    }
    this.http.get<MatrixDTO>('http://localhost:8080/api/matrices/' + this.matrixId).subscribe(
      result => {
        this.matrix = this.convertDTOtoMatrix(result);
        this.maximumPoints = 200 * result.difficulty
      },
      error => this.router.navigate(["/error"])
    );
    this.http.get<number[]>('http://localhost:8080/api/solvedmatrices/' + this.userName).subscribe(
      result => {
        this.solvedMatrices = result;
        this.alreadySolved = this.solvedMatrices.includes(this.matrix.id);
      }
    );
  }

  @HostListener('window:beforeunload', ['$event'])
  onBeforeUnload() {
    if (this.isSolving == true) {
      let payload: SolvedDTO = {
        userName: sessionStorage.getItem("userName"),
        points: 0,
        matrixId: this.matrixId
      }
      this.http.post('http://localhost:8080/api/solved', payload).subscribe();
    }
  }

  convertDTOtoMatrix(matrixDto: MatrixDTO): Matrix {
    const matrix: Matrix = {
      id: matrixDto.id,
      title: matrixDto.title,
      matrix: matrixDto.matrix.split(","),
      vote: matrixDto.vote,
      difficulty: "🌶️".repeat(matrixDto.difficulty),
      createdAt: matrixDto.createdAt,
      creatorName: matrixDto.creatorName,
      hint: matrixDto.hint,
      hiddenItem: matrixDto.hiddenItem
    };
    return matrix;
  }


  startSolving() {
    this.solvedMatrices = JSON.parse(sessionStorage.getItem('solvedMatrices') || '[]');
    if (this.solvedMatrices.includes(this.matrixId)) {
      return;
    }
    this.points = this.maximumPoints;
    this.getPossibleInput();
    this.startTimer()
    this.isSolving = true;
  }

  getPossibleInput() {
    this.possibleInput = [...new Set(this.matrix.matrix)];
  }


  endSolving() {
    this.stopTimer();
    if (this.matrixSolution === this.matrix.matrix[this.matrix.hiddenItem]) {
      this.isCorrect = true;
    }
    if (!this.isCorrect || this.remainingSeconds == 0) {
      this.points = 0;
    }
    this.solvingSeconds = 15 - this.remainingSeconds;
    this.afterSolving = true;
    this.hintVisible = false;
    this.votingPossible = true;
    let payload: SolvedDTO = {
      userName: sessionStorage.getItem("userName"),
      points: this.points,
      matrixId: this.matrixId
    }
    if (!this.alreadySolved) {
      this.http.post('http://localhost:8080/api/solved', payload).subscribe()
      let actualpoints = Number(sessionStorage.getItem("points")) + this.points;
      sessionStorage.setItem("points", String(actualpoints));
      this.userPoints = String(actualpoints);
    }
  }

  stopTimer() {
    clearInterval(this.intervalId);
  }

  startTimer() {
    let seconds: number;
    this.intervalId = setInterval(() => {
      this.remainingSeconds--;
      this.points = this.points - 10;
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
    this.points = this.points - 50;
  }

  upvote() {
    this.votingPossible = false;
    let payload: MatrixDTOVote = {id: this.matrix.id, vote: (this.matrix.vote + 1)}
    this.http.post<MatrixDTOVote>('http://localhost:8080/api/matrices/' + this.matrixId, payload).subscribe(() => location.reload());
  }


  downvote() {
    this.votingPossible = false;
    let payload: MatrixDTOVote = {id: this.matrix.id, vote: (this.matrix.vote - 1)}
    this.http.post<MatrixDTOVote>('http://localhost:8080/api/matrices/' + this.matrixId, payload).subscribe(() => location.reload());
  }

  ngOnDestroy(): void {
    if (this.isSolving == true) {
      let payload: SolvedDTO = {
        userName: sessionStorage.getItem("userName"),
        points: 0,
        matrixId: this.matrixId
      }
      this.http.post('http://localhost:8080/api/solved', payload).subscribe();
    }
  }
}
