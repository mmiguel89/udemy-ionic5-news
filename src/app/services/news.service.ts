import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { TopHeadlinesResponse } from '../interfaces/interfaces';

const apiKey = environment.apiKey;
const apiUlr = environment.apiUlr;

const headers = new HttpHeaders({
  'X-Api-key': apiKey
});

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  headlinesPage = 0;

  actualCategory = '';
  categoryPage = 0;

  constructor(private http: HttpClient) { }

  private executeQuery<T>(query: string) {
    query = apiUlr + query;
    return this.http.get<T>(query, { headers });
  }

  getTopHeadlines() {
    this.headlinesPage++;
    return this.executeQuery<TopHeadlinesResponse>(`/top-headlines?country=us&page=${this.headlinesPage}`);
  }

  getTopHeadlinesByCategory(category: string) {
    if (this.actualCategory === category) {
      this.categoryPage++;
    } else {
      this.categoryPage = 1;
      this.actualCategory = category;
    }
    return this.executeQuery<TopHeadlinesResponse>(`/top-headlines?country=us&category=${category}&page=${this.categoryPage}`);
  }
}
