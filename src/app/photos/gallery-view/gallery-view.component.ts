import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface ManifestItem {
  filename: string;
  alt: string;
}

@Component({
  selector: 'app-gallery-view',
  templateUrl: './gallery-view.component.html',
  styleUrls: ['./gallery-view.component.css'],
})
export class GalleryViewComponent implements OnInit {
  @Input() galleryId!: string;
  images: ManifestItem[] = [];

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    this.galleryId = this.route.snapshot.paramMap.get('galleryId') ?? '';
  }

  ngOnInit(): void {
    if (this.galleryId) {
      const manifestUrl = `assets/photos/${this.galleryId}/manifest.json`;
      console.log('Manifest URL:', manifestUrl); // Log the URL for debugging
      // Fetch the manifest file
      this.http.get<ManifestItem[]>(manifestUrl).subscribe(data => {
        this.images = data;
      });
    }
  }
}
