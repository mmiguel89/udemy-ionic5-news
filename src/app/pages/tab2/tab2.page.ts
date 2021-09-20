import { Component, OnInit, ViewChild } from '@angular/core';

import { Article } from '../../interfaces/interfaces';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  categories = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology',];
  selectedCategory = this.categories[0];
  news: Article[] = [];

  constructor(private newsService: NewsService) { }

  ngOnInit() {
    this.getTopHeadlinesByCategory();
  }

  loadData(event) {
    this.getTopHeadlinesByCategory(event);
  }

  changeCategory(event) {
    this.news = [];
    this.getTopHeadlinesByCategory();
  }

  getTopHeadlinesByCategory(event?) {
    this.newsService.getTopHeadlinesByCategory(this.selectedCategory)
      .subscribe(resp => {
        this.news.push(...resp.articles);
        if (event) {
          event.target.complete();
        }
      });
  }
}
