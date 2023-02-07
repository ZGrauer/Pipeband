import { Component } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'KC St. Andrews Pipes and Drums';
  currentRoute: string = 'home';
  isMembersRoute: boolean = false;

  navLinks: any[];
  activeLinkIndex = -1;

  constructor(private router: Router) {
    this.navLinks = [
      {
        label: 'Home',
        link: './',
        index: 0,
      },
      {
        label: 'About Us',
        link: './about',
        index: 1,
      },
      {
        label: 'Hire Us',
        link: './hire',
        index: 2,
      },
      {
        label: 'Music',
        link: './music',
        index: 3,
      },
      {
        label: 'Performances',
        link: './schedule',
        index: 4,
      },
      {
        label: 'Contact',
        link: './contact',
        index: 5,
      },
      {
        label: 'Members',
        link: './members',
        index: 6,
      },
    ];

    /*
    Removed Merch since we don't have any to sell yet

    {
        label: 'Merchandise',
        link: './merch',
        index: 5,
      },
      */

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
          this.currentRoute = event.url;
          this.isMembersRoute = this.currentRoute == '/members' ? true : false;
          console.log(event);
      }
  });
  }

  ngOnInit(): void {
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(
        this.navLinks.find((tab) => tab.link === '.' + this.router.url)
      );
    });
  }
}
