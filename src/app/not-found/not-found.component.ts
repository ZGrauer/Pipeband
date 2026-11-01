import { Component, OnDestroy, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css'],
})
export class NotFoundComponent implements OnInit, OnDestroy {
  constructor(private meta: Meta) {}

  // CloudFront serves the app with status 200 for unknown URLs, so tell crawlers not to index them.
  ngOnInit() {
    this.meta.updateTag({ name: 'robots', content: 'noindex' });
  }

  ngOnDestroy() {
    this.meta.removeTag('name="robots"');
  }
}
