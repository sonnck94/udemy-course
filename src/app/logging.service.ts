import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  constructor() { }
  selectRecipe(){
    console.log("LoggingService: Recipe was selected");

  }
}
