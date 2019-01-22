import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { randomBytes } from 'crypto';

@Injectable({
  providedIn: 'root'
})
export class MemesService {

  numberOfFiles = 465;

  constructor(private http: HttpClient) { }

  getMeme() {
    const memeFileNumber = Math.floor(Math.random() * this.numberOfFiles);
    return this.http.get(`src/assets/json/memes_${memeFileNumber}.json`);
  }
}
