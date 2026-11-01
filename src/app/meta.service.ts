import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

const SITE_URL = 'https://www.kcpipeband.org';

@Injectable({
  providedIn: 'root',
})
export class MetaService {
  constructor(
    private title: Title,
    private meta: Meta,
    @Inject(DOCUMENT) private document: Document
  ) {}

  updateTitle(title: string) {
    if (title) {
      this.title.setTitle(title);
    }
  }

  updateDescription(description: string) {
    if (description) {
      this.meta.updateTag({ name: 'description', content: description });
    }
  }

  updateCanonical(path: string) {
    let link = this.document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.rel = 'canonical';
      this.document.head.appendChild(link);
    }
    link.href = SITE_URL + path.split(/[?#]/)[0];
  }
}