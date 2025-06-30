import { Component } from '@angular/core';
import {
  Router,
  Event,
  NavigationStart,
  NavigationEnd,
  NavigationError,
  ActivatedRoute,
  Data,
} from '@angular/router';
import { MetaService } from './meta.service';
import { filter, map, mergeMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'KC St. Andrews Pipes and Drums';
  currentRoute: string = 'home';
  isMembersRoute: boolean = false;
  public isLoading: boolean = false;

  navLinks: any[];
  activeLinkIndex = -1;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private metaService: MetaService
  ) {
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
        label: 'Photo Gallery',
        link: './photo',
        index: 4,
      },
      {
        label: 'Performances',
        link: './schedule',
        index: 5,
      },
      {
        label: 'Contact',
        link: './contact',
        index: 6,
      },
      {
        label: 'Members',
        link: './members',
        index: 7,
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
      if (event instanceof NavigationStart) {
        this.isLoading = true;
      } else if (event instanceof NavigationEnd || event instanceof NavigationError) {
        this.isLoading = false;
        if (event instanceof NavigationEnd) {
          this.currentRoute = event.url;
          this.isMembersRoute = this.currentRoute == '/members' ? true : false;
          console.log(event);
        }
      }
    });
  }

  ngOnInit(): void {
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(
        this.navLinks.find((tab) => tab.link === '.' + this.router.url)
      );
    });

    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map((route) => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter((route) => route.outlet === 'primary'),
        mergeMap((route) => route.data),
        tap(({ title, description }: Data) => {
          this.metaService.updateTitle(title);
          this.metaService.updateDescription(description);
        })
      )
      .subscribe();
  }
}
