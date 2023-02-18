import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css'],
})
export class PhotosComponent {
  public getScreenWidth: any;
  public getScreenHeight: any;
  public galleryColCount: number = 3;

  ngOnInit() {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;

    if (this.getScreenWidth < 1000 && this.getScreenWidth > 729) {
      this.galleryColCount = 2;
    } else if (this.getScreenWidth < 730) {
      this.galleryColCount = 1;
    }
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;

    if (this.getScreenWidth >= 1000) {
      this.galleryColCount = 3;
    } else if (this.getScreenWidth < 1000 && this.getScreenWidth >= 730) {
      this.galleryColCount = 2;
    } else if (this.getScreenWidth < 730) {
      this.galleryColCount = 1;
    }
  }
}
