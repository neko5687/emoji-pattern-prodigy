import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

interface MatrixCreationDTO {
  title: string;
  matrix: string;
  difficulty: number;
  creatorName: string | null;
  hint: string;
  hiddenItem: number
}

@Component({
  selector: 'app-matrixcreation',
  templateUrl: './matrixcreation.component.html',
  styleUrls: ['./matrixcreation.component.css']
})
export class MatrixcreationComponent implements OnInit {

  emojis: string[] = ["?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?"];
  possibleInput: string[] = ['🐵', '🐶', '🐺', '🦊', '🐱', '🐯', '🦁', '🐮', '🐷', '🐗', '🐭', '🐹', '🐰', '🐻', '🐨', '🐼', '🦘', '🦡', '🐾', '🦃', '🐔', '🐦', '🐤', '🐣', '🐥', '🦆', '🦢', '🦉', '🦚', '🦜', '🐸', '🐊', '🐢', '🦎', '🐍', '🐲', '🐉', '🦕', '🦖', '🦈', '🐬', '🐳', '🐋', '🐟', '🐠', '🐡', '🦐', '🦞', '🦀', '🐚', '🐌', '🦋', '🐛', '🐜', '🐝', '🐞', '🦟', '🦗'];
  hint: string = "";

  hiddenItem?: number;
  chili: string = "🌶️";
  index: number = 0;
  difficulty: number = 0;
  title: string = "";
  payload: MatrixCreationDTO = {
    title: "",
    matrix: "",
    difficulty: 0,
    creatorName: "",
    hint: "",
    hiddenItem: -1
  }
  success: boolean = false;
  count: number = 25;
  userName: string | null = "";
  userPoints: string | null = "";

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {
  }

  ngOnInit(): void {
    if (sessionStorage.getItem("token") != null && sessionStorage.getItem("token")?.length != 0) {
      this.userName = sessionStorage.getItem("userName");
      this.userPoints = sessionStorage.getItem("points");
    }
  }

  addEmojiToMatrix(emoji: string) {
    this.emojis[this.index] = emoji;
    this.index = (this.index % 24) + 1;
  }

  saveMatrix() {
    let userName = sessionStorage.getItem("userName");
    let matrix = this.emojis.join(",");
    this.payload = {
      title: this.title,
      matrix: matrix,
      difficulty: this.difficulty,
      creatorName: userName,
      hint: this.hint,
      hiddenItem: this.hiddenItem?(this.hiddenItem-1):-1
    }
    this.http.post('http://localhost:8080/api/createMatrix', this.payload).subscribe(() => this.success = true);
  }

  isValidInput(): boolean {
    return this.title.length != 0 && this.title.length<14 && this.difficulty != 0 && this.hint.length != 0 &&
      !this.emojis.includes("?") && this.hiddenItem != null && this.hiddenItem> 0 && this.hiddenItem<26;
  }

  emojiCounter() {
    this.count = this.emojis.filter(str => str === "?").length;
  }

  addAndCount(emoji: string) {
    this.addEmojiToMatrix(emoji)
    this.emojiCounter()
  }

  hasDifficulty() : boolean {
    return this.difficulty !== 0;
  }
}
