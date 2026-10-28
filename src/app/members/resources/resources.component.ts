import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { StlDialog } from '../shared/stl-dialog.component';
import { downloadFile, filenameOf } from '../shared/download';
import { ARTICLES, MODEL_FILES, ModelFile, PLAYLISTS, VIDEO_GROUPS, Video } from './resources.data';

const ARTICLES_SHOWN = 2;

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css'],
})
export class ResourcesComponent {
  videoGroups = VIDEO_GROUPS;
  playlists = PLAYLISTS;
  modelFiles = MODEL_FILES;
  showAllArticles = false;

  constructor(public dialog: MatDialog) {}

  get articles() {
    return this.showAllArticles ? ARTICLES : ARTICLES.slice(0, ARTICLES_SHOWN);
  }

  get hiddenArticleCount(): number {
    return this.showAllArticles ? 0 : ARTICLES.length - ARTICLES_SHOWN;
  }

  thumbnail(video: Video): string {
    return `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`;
  }

  videoUrl(video: Video): string {
    return `https://www.youtube.com/watch?v=${video.id}`;
  }

  preview(file: ModelFile) {
    this.dialog.open(StlDialog, { data: { file_path: file.preview } });
  }

  download(file: ModelFile) {
    downloadFile(file.download, filenameOf(file.download));
  }
}
