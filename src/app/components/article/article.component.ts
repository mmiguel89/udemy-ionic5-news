import { Component, Input, OnInit } from '@angular/core';

import { ActionSheetController, Platform } from '@ionic/angular';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

import { DataLocalService } from '../../services/data-local.service';

import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  @Input() article: Article;
  @Input() index: number;
  @Input() inFavorites;

  constructor(
    private actionSheetController: ActionSheetController,
    private datalocalService: DataLocalService,
    private inAppBrowser: InAppBrowser,
    private platform: Platform,
    private socialSharing: SocialSharing
  ) { }

  ngOnInit() { }

  openArticle() {
    const browser = this.inAppBrowser.create(this.article.url, '_system');
  }

  async showMenu() {
    let saveOrRemoveButton;
    if (this.inFavorites) {
      saveOrRemoveButton = {
        text: 'Not favorite',
        icon: 'trash',
        cssClass: 'action-dark',
        handler: () => {
          this.datalocalService.removeFromFavorite(this.article);
        }
      }
    } else {
      saveOrRemoveButton = {
        text: 'Favorite',
        icon: 'star',
        cssClass: 'action-dark',
        handler: () => {
          this.datalocalService.addToFavorite(this.article);
        }
      };
    }
    const actionSheet = await this.actionSheetController.create({
      buttons: [
        {
          text: 'Share',
          icon: 'share',
          cssClass: 'action-dark',
          handler: () => {
            this.shareArticle();
          }
        },
        saveOrRemoveButton,
        {
          text: 'Cancel',
          icon: 'close',
          cssClass: 'action-dark',
          handler: () => {
            console.log('Cancel clicked');
          }
        }]
    });
    await actionSheet.present();
  }

  shareArticle() {
    if (this.platform.is('cordova')) {
      this.socialSharing.share(
        this.article.title,
        this.article.source.name,
        '',
        this.article.url
      );
    } else {
      if (navigator['share']) {
        navigator['share']({
          title: this.article.title,
          text: this.article.description,
          url: this.article.url,
        })
          .then(() => console.log('Successful share'))
          .catch((error) => console.log('Error sharing', error));
      } else {
        console.log('Not supported');
      }
    }
  }
}
