import { Component, OnInit } from '@angular/core';

import { Article } from '../..//interfaces/interfaces';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  news: Article[] = [];

  constructor(private newsService: NewsService) { }

  ngOnInit() {
    this.getTopHeadlines();
  }

  loadData(event) {
    this.getTopHeadlines(event);
  }

  getTopHeadlines(event?) {
    this.newsService.getTopHeadlines()
      .subscribe(resp => {
        if (resp.articles.length === 0) {
          event.target.disabled = true;
          event.target.complete();
          return;
        }
        this.news.push(...resp.articles);
        if (event) {
          event.target.complete();
        }
      },
      error => {
        console.log(JSON.stringify(error));
      });
  }
}
