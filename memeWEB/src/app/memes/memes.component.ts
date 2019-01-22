import { MemesService } from './memes.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-memes',
  templateUrl: './memes.component.html',
  styleUrls: ['./memes.component.css']
})
export class MemesComponent implements OnInit {

  memes;
  currentMeme;
  currentMemeIndex;

  constructor(private service: MemesService) {
    this.getMemes();
  }

  ngOnInit() {
  }

  getMemes() {
    this.service.getMeme()
      .subscribe(MemesJSON => {
        this.memes = MemesJSON;
        this.currentMemeIndex = 0;
        this.currentMeme = MemesJSON[0];
        console.log(this.currentMeme);
      });
  }

  getNextMeme() {
    if (this.currentMeme === this.memes.slice(-1)) {
      this.getMemes();
    } else {
      this.currentMemeIndex++;
      this.currentMeme = this.memes[this.currentMemeIndex];
      console.log(this.currentMeme);
    }
  }

}
