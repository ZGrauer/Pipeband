import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  showConcertBanner: boolean = true;

  dismissBanner(): void {
    this.showConcertBanner = false;
    // Store dismissal in localStorage so it stays dismissed
    localStorage.setItem('concertBannerDismissed', 'true');
  }

  ngOnInit(): void {
    // Check if user has already dismissed the banner
    const dismissed = localStorage.getItem('concertBannerDismissed');
    if (dismissed === 'true') {
      this.showConcertBanner = false;
    }
  }
}
