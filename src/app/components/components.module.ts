import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular'

import { ArticleComponent } from './article/article.component';
import { NewsComponent } from './news/news.component';

@NgModule({
  declarations: [
    ArticleComponent,
    NewsComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    NewsComponent
  ],
})
export class ComponentsModule { }
