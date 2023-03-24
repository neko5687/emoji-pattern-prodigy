import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

interface MatrixCreationDTO {
  title: string;
  matrix: string;
  difficulty: number;
  creatorName: string | null;
  hint: string;
}

@Component({
  selector: 'app-matrixcreation',
  templateUrl: './matrixcreation.component.html',
  styleUrls: ['./matrixcreation.component.css']
})
export class MatrixcreationComponent implements OnInit {

  emojis: string[] = ["?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?"];
  possibleInput: string[] = ['🐵', '🐶', '🐺', '🦊', '🐱', '🐯', '🦁', '🐮', '🐷', '🐗', '🐭', '🐹', '🐰', '🐻', '🐨', '🐼', '🦘', '🦡', '🐾', '🦃', '🐔', '🐦', '🐤', '🐣', '🐥', '🦆', '🦢', '🦉', '🦚', '🦜', '🐸', '🐊', '🐢', '🦎', '🐍', '🐲', '🐉', '🦕', '🦖', '🦈', '🐬', '🐳', '🐋', '🐟', '🐠', '🐡', '🦐', '🦞', '🦀', '🐚', '🐌', '🦋', '🐛', '🐜', '🐝', '🐞', '🦟', '🦗'];
  hint: string = "?";
  chili: string = "🌶️";

  index: number = 0;
  difficulty: number = 0;
  title: string = "";
  payload: MatrixCreationDTO = {
    title: "",
    matrix: "",
    difficulty: 0,
    creatorName: "",
    hint: ""
  }
  success: boolean = false;


  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {
  }

  ngOnInit(): void {
  }

  addEmojiToMatrix(emoji: string) {
    this.emojis[this.index] = emoji;
    this.index++;
  }

  saveMatrix() {
    let userName = sessionStorage.getItem("userName");
    let matrix = this.emojis.join(",");
    this.payload = {
      title: this.title,
      matrix: matrix,
      difficulty: this.difficulty,
      creatorName: userName,
      hint: this.hint
    }
    this.http.post('http://localhost:8080/api/createMatrix', this.payload).subscribe(() => this.success = true);
  }

  isValidInput(): boolean {
    return this.title.length != 0 && this.difficulty != 0 && this.hint.length != 0 && !this.emojis.includes("?");
  }
}
