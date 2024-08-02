import { Component, HostListener } from '@angular/core';

type photoGalleries = Array<{ url: string; title: string; src: string }>;

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css'],
})
export class PhotosComponent {
  public getScreenWidth: any;
  public getScreenHeight: any;
  public galleryColCount: number = 3;
  public pageIndex: number = 0;
  public pageSize: number = 9;
  galleries: photoGalleries = [
    {
      url: 'https://photos.app.goo.gl/B9ELcKPEATAf6k8i6',
      title: '2024 St Paul Highland Games',
      src: '../../assets/2024_St_Paul_Highland_Games.JPG',
    },{
      url: 'https://photos.app.goo.gl/E2BVrkf8bvvChPMe9',
      title: '2024 Taps at the Tower',
      src: '../../assets/2024_Taps_at_the_Tower.jpg',
    },{
      url: 'https://photos.app.goo.gl/e7wygMNtPP8UJgqN8',
      title: '2024 Chicago Highland Games',
      src: '../../assets/2024_Chicago_Highland_Games.jpg',
    },{
      url: 'https://photos.app.goo.gl/yn5sgDmApiA8UxvK8',
      title: '2024 St Louis Highland Games',
      src: '../../assets/2024_St_Louis_Highland_Games.JPG',
    },{
      url: 'https://photos.app.goo.gl/pHn3fjgB3hqykvov8',
      title: '2024 St Patrick\'s Parades',
      src: '../../assets/2024_St_Patricks_Parades.JPG',
    },{
      url: 'https://photos.google.com/share/AF1QipMW5ZoPtMXvo_044NOaC3GfwhoOEBeohJZCjPVxZXz_IzNhgCMQCcLmdGzMlayZkA?key=ZWp2UkxUNTZPbW5BeUFsRlFBZW5XVGNVczBCTjhn',
      title: '2023 Kansas City Ceilidh',
      src: '../../assets/2023_Kansas_City_Ceilidh.jpg',
    },{
      url: 'https://photos.google.com/share/AF1QipNqq6cJUEW5SdZlAfvZV1aVHGqxFky8lL6AoHetk8rdZvFt_101GfRTeKTsM4xUxg?key=NzRLVUpMbnZ4WDFreDBNN3dqQXFwbzhLUkZXUWFB',
      title: '2023 Ceilidh at the Crossroads',
      src: '../../assets/2023_Crossroads_Ceilidh.JPG',
    },{
      url: 'https://photos.google.com/share/AF1QipOFjzdLuWzF-7AHbSxPUqHEOghkQT1aMVZVKUjgroUaN1vT3faekHUPoa3ZKmHVhg?obfsgid=114877729105713615766',
      title: '2023 Kirking of the Tartan',
      src: '../../assets/2023_Kirking_of_the_Tartan.JPG',
    },{
      url: 'https://photos.google.com/share/AF1QipMfordv4ZLQ9v5QNJ191cCXdaxVJmngbKwSSuPtLzc4Btsy3EGn8zRaPnHxkNhkuw?obfsgid=114877729105713615766',
      title: '2023 St Andrew Day',
      src: '../../assets/2023_St_Andrew_Day.JPG',
    },{
      url: 'https://photos.app.goo.gl/eYvawdeiMfrFz5bb8',
      title: '2023 Irish Festival',
      src: '../../assets/2023_Irish_Festival.jpg',
    },
    {
      url: 'https://photos.app.goo.gl/X3eD7H4GKKNXX1eD6',
      title: '2023 Ethnic Festival',
      src: '../../assets/2023_Ethnic_Festival.jpg',
    },
    {
      url: 'https://photos.app.goo.gl/RNcsoMzd3iXxdKvR8',
      title: '2023 Taps at the Tower',
      src: '../../assets/2023_Taps_at_the_Tower.jpg',
    },
    {
      url: 'https://photos.app.goo.gl/F8eaSSV245fAK3Km6',
      title: '2023 Chicago Games',
      src: '../../assets/2023_Chicago_Games.jpg',
    },
    {
      url: 'https://youtu.be/LJxuIyDMtcI',
      title: "2023 Kansas City St Patrick's Day Parade",
      src: '../../assets/2023_KC_St_Patricks_Parade.jpg',
    },
    {
      url: 'https://photos.app.goo.gl/e6XY3eByAmNXE86M8',
      title: '2023 Robert Burns Dinner',
      src: '../../assets/2023_Burns_Dinner.jpg',
    },
    {
      url: 'https://photos.app.goo.gl/bMxBgaaXFSYg8okt7',
      title: '2022 Tulsa Scot Fest',
      src: '../../assets/2022_Tulsa_Scot_Fest.jpg',
    },
    {
      url: 'https://photos.app.goo.gl/La6YWjLQwvdkDMYf7',
      title: '2022 Taps at the Tower',
      src: '../../assets/2022_Taps_at_the_Tower.jpg',
    },
    {
      url: 'https://photos.app.goo.gl/bs3hoS7W1KbEnkjy6',
      title: '2022 KC St Patricks Parade',
      src: '../../assets/2022_KC_St_Patricks_Parade.jpg',
    },
    {
      url: 'https://photos.app.goo.gl/Q89qoH2iZWWvKGNe7',
      title: '2022 Irish Festival',
      src: '../../assets/2022_Irish_Festival.jpg',
    },
    {
      url: 'https://photos.app.goo.gl/8La2wPmMyUjHQBBt8',
      title: '2022 Diplomatic Ball',
      src: '../../assets/2022_Diplomatic_Ball.jpg',
    },
    {
      url: 'https://photos.app.goo.gl/8B2r95q164Xu4NZF6',
      title: '2022 Baker Graduation',
      src: '../../assets/2022_Baker_Graduation.jpg',
    },
    {
      url: 'https://photos.app.goo.gl/pAf16o5K1phfPnTX6',
      title: '2021 Ethnic Featival',
      src: '../../assets/2021_Ethnic_Featival.jpg',
    },
    {
      url: 'https://photos.google.com/share/AF1QipOaSWg9m-WQ2BPvveEVwaH5haqIO9PRV7EhM8W_NeV0f3u8cGasRWc_DBZgJJ97fA?key=YjloZXQ3NnMwYzRwVjlVUlQwdDVHNlBFQTVIVkxn',
      title: '2021 ScotsFest Tulsa',
      src: '../../assets/2021_ScotsFest_Tulsa.jpg',
    },
    {
      url: 'https://photos.google.com/share/AF1QipPt-AYq4GMhKVbTbIA410QjMUiVE0aof4ZqmjH7qaMyH5_LvBsGiCx2BahJ12p7pA?key=RzNNRUk0cW9CbE5hS0o3RzJGa0JFVzh6UXNXeGNn',
      title: '2021 KC Irish Fest',
      src: '../../assets/2021_Irish_fest.jpg',
    },
    {
      url: 'https://photos.google.com/share/AF1QipNWSOG_psFbb-DosyMO9eESjf0CsfNjIxIreE3tx7Sxq7a8hPv5UUof8lQ2OIBhHw?key=Rkh0dkpjUFJEUmNfY014ZVpaQUI1RVBSYTNQUEpR',
      title: '2021 Baker Graduation',
      src: '../../assets/2021_Baker_Graduation.jpg',
    },
    {
      url: 'https://photos.google.com/share/AF1QipP4G08bn60p4CnfWDaBhtdbtkZKDRepo2mCl836PpkI7bE32bP4n-UOhgS7TEK0wQ?key=UlpFRm5BRWZwUjM3RkNockw0Rm1LcjVDank5SnFn',
      title: '2020 Robert Burns Dinner',
      src: '../../assets/2020_Burns_Dinner.jpg',
    },
    {
      url: 'https://photos.google.com/share/AF1QipPXKnot56m7bShKGF1fb6bzTH10q2SZkyFoLFxNO_qAKdUDzLWvCwBVd7UOVwWXLQ?key=M1VURVRjM0dFNnZRWEFrS0RGdkdRd09YQy1RNmlB',
      title: "2019 St Patrick's Parade",
      src: '../../assets/2019_St_Paddy_Parade.jpg',
    },
    {
      url: 'https://photos.google.com/share/AF1QipPpIhD9k4dncW19gKmQvuykng1UX3V7RyVa05pGNAOb5eIfojLMhJfDJmNJCr2LrA?key=RmhmVDl1ZHZpMEw4MzhMNl8tdlM0VExtOXFrZW1B',
      title: '2019 Minnestoa Highland Games',
      src: '../../assets/2019_Minnesota.jpg',
    },
    {
      url: 'https://photos.app.goo.gl/sYv7WhBsphyARi9d8',
      title: '2019 Burns Dinner',
      src: '../../assets/2019_Burns_Dinner.jpg',
    },
    {
      url: 'https://photos.google.com/share/AF1QipME3-2XGnU44dhG5dMljkr4JDEV32n7leyhw_n4P7zPxTF83RTANRjLSR1S10YOcQ?key=REZTNmo4cGtoa21JSzVIdllqSVVIYVNXakdLOEl3',
      title: '2018 Kirking of the Tartan',
      src: '../../assets/2018_Kirking_Tartan.jpg',
    },
    {
      url: 'https://photos.app.goo.gl/4xkaWNenjVyN9pZj7',
      title: '2018 KCDC Event',
      src: '../../assets/2018_KCDC_Event.jpg',
    },
    {
      url: 'https://photos.app.goo.gl/AfwBHSc8hCnmraLV6',
      title: '2018 Ethnic Festival',
      src: '../../assets/2018_Ethnic_Festival.jpg',
    },
    {
      url: 'https://photos.app.goo.gl/xMWYmv6CxcdFkyKa8',
      title: '2018 Estes Park Colorado Games',
      src: '../../assets/2018_Estes_Park_Colorado_Games.jpg',
    },
    {
      url: 'https://photos.app.goo.gl/ZbGCihEvg1BvEV629',
      title: '2017 Chiefs Arrowhead Performance',
      src: '../../assets/2017_Chiefs_Arrowhead_Performance.jpg',
    },
    {
      url: 'https://photos.app.goo.gl/329HjnKPtaujHVf6A',
      title: '2017 Chicago Games',
      src: '../../assets/2017_Chicago_Games.jpg',
    },
    {
      url: 'https://photos.app.goo.gl/e1SvAPuy9N3NUFjg7',
      title: '2017 Burns Dinner',
      src: '../../assets/2017_Burns_dinner.jpg',
    },
    {
      url: 'https://photos.google.com/share/AF1QipODVwOKR377fGI_fi-nkgt5KyyBlQDYCkAc0J2xNqf1XDWVpgqCoCmbQUGB8V706g?key=RXJHcXFBMlFOLWwxNzhIRUx3czBubHVCajJrRmF3',
      title: '2014 Special Forces Ball',
      src: '../../assets/2014_Special_Forces_Ball.jpg',
    },
    {
      url: 'https://photos.google.com/share/AF1QipPzXBd0_vhyNzVB9iNCErVin5F3c2vSwjDXGB5bKUXxQNxDPkSckuZO71zwcG232A?key=a2cyQzV1MUZwTW5CbURFckV0NW8zZWpBWkt4ZFR3',
      title: '2012 Concert with the Chieftains',
      src: '../../assets/2012_Chieftains.jpg',
    },
    {
      url: 'https://photos.app.goo.gl/VYt59hoj4niDhNT86',
      title: '1970 Highland Games',
      src: '../../assets/1970_Highland_Games.jpg',
    },
    {
      url: 'https://photos.app.goo.gl/NjfAMmHt86jc8BAJ9',
      title: '1964 KC Memorial Day Parade',
      src: '../../assets/1964_KC_Memorial_Day_Parade.jpg',
    },
    {
      url: 'https://photos.app.goo.gl/B6FXcFCXmBpASen28',
      title: '1963 Band Rehersal',
      src: '../../assets/1963_Band_Rehersal.jpg',
    },
    
  ];

  currentGalleriesPage: photoGalleries = [];

  ngOnInit() {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;

    if (this.getScreenWidth < 1000 && this.getScreenWidth > 729) {
      this.galleryColCount = 2;
    } else if (this.getScreenWidth < 730) {
      this.galleryColCount = 1;
    }
    this.getServerData({
      previousPageIndex: 0,
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      length: this.galleries.length,
    });
  }

  public getServerData(event?: any) {
    console.table(event);
    this.pageSize = event.pageSize;
    let start = event.pageIndex * this.pageSize;
    let end = start + this.pageSize;
    this.currentGalleriesPage = this.galleries.slice(start, end);
    return event;
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
