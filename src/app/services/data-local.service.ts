import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';

import { Article } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {
  _storage: Storage;

  favorites: Article[] = [];

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    this._storage = await this.storage.create();
    const favorites = await this._storage.get("favorites");
    this.favorites = favorites? favorites : [];
  }

  addToFavorite(article: Article) {
    if (!this.exists(article)) {
      this.favorites.unshift(article);
      this._storage.set("favorites", this.favorites);
    }
  }

  exists(article: Article) {
    return this.favorites.find(f => f.title === article.title);
  }

  removeFromFavorite(article: Article) {
    this.favorites = this.favorites.filter(f => f.title !== article.title);
    this._storage.set("favorites", this.favorites);
  }
}
