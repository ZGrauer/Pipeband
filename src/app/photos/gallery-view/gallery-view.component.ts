import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface ManifestItem {
  filename: string;
  alt: string;
}

@Component({
  selector: 'app-gallery-view',
  imports: [], // Keep imports if needed, or remove if HttpClientModule is globally provided
  templateUrl: './gallery-view.component.html',
  styleUrl: './gallery-view.component.css'
})
export class GalleryViewComponent implements OnInit {
  @Input() galleryId!: string;
  images: ManifestItem[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    if (this.galleryId) {
      const manifestUrl = `assets/photos/${this.galleryId}/manifest.json`;
      this.http.get<ManifestItem[]>(manifestUrl).subscribe(data => {
        this.images = data;
      });
    }
  }
}
