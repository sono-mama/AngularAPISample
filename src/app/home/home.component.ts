import { Component } from '@angular/core';
import {HttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {Drink, RootObjectDrinks} from "./drink";
import {RootObjectVideo} from "./video";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  readonly COCKTAIL_URL = 'https://www.thecocktaildb.com/api/json/v1/1/random.php'
  readonly VIDEO_URL = 'https://youtube.googleapis.com/youtube/v3/search?q='
  readonly API_KEY = '&key=AIzaSyDnmQOmRwdUHDLPaxD1kTPq3QQfKm6KxhE'
  cocktail!: RootObjectDrinks;
  videos!: RootObjectVideo;

  apiLoaded = false;

  ngOnInit() {
    if (!this.apiLoaded) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      this.apiLoaded = true;
    }
  }
  constructor(private http: HttpClient) {}
  getCocktail() {
    return this.http.get<RootObjectDrinks>(this.COCKTAIL_URL)
      .subscribe(
        data => this.cocktail = data
      );
  }

  getVideo() {
    return this.http.get<RootObjectVideo>(this.VIDEO_URL + "How to make a " + this.cocktail.drinks[0]['strDrink'] + " Cocktail" + this.API_KEY)
      .subscribe(
        data => this.videos = data
      );
  }
}
