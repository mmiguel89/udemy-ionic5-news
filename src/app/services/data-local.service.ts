import { Injectable } from '@angular/core';

import { ToastController } from '@ionic/angular';

import { Storage } from '@ionic/storage-angular';

import { Article } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {
  _storage: Storage;

  favorites: Article[] = [];

  constructor(
    private storage: Storage,
    private toastController: ToastController) {
    this.init();
  }

  async init() {
    this._storage = await this.storage.create();
    const favorites = await this._storage.get("favorites");
    this.favorites = favorites ? favorites : [];
  }

  addToFavorite(article: Article) {
    if (!this.exists(article)) {
      this.favorites.unshift(article);
      this._storage.set("favorites", this.favorites);
      this.presentToast("Added to favorites!");
    }
  }

  exists(article: Article) {
    return this.favorites.find(f => f.title === article.title);
  }

  removeFromFavorite(article: Article) {
    this.favorites = this.favorites.filter(f => f.title !== article.title);
    this._storage.set("favorites", this.favorites);
    this.presentToast("Removed from favorites!");
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500
    });
    toast.present();
  }
}
