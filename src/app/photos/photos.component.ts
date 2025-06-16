/*
To add a new photo gallery:

1.  **Prepare Gallery ID:**
    Choose a unique `galleryId` for your new gallery (e.g., "2024_My_Event_Name").
    This ID will be used for the folder name and in the component data.

2.  **Create Asset Folder:**
    Create a new folder under `src/assets/photos/` using the `galleryId` from step 1.
    Example: `src/assets/photos/2024_My_Event_Name/`

3.  **Add Images:**
    Place all full-size images for this gallery into the newly created folder.

4.  **Create manifest.json:**
    Inside the gallery's asset folder (e.g., `src/assets/photos/2024_My_Event_Name/`),
    create a `manifest.json` file. This file lists all images in the gallery.
    The structure should be an array of objects, each with "filename" and "alt" properties:
    [
      { "filename": "image1.jpg", "alt": "Descriptive text for image 1" },
      { "filename": "image2.png", "alt": "Descriptive text for image 2" },
      ...
    ]

5.  **Add Thumbnail:**
    Add a thumbnail image for this gallery to the main `src/assets/` folder (or wherever
    thumbnails are generally kept, e.g., `src/assets/thumbnails/`).
    Example: `src/assets/2024_My_Event_Name_thumbnail.jpg`

6.  **Update Galleries Array:**
    In this file (`photos.component.ts`), add a new object to the `galleries` array.
    This object should include:
    - `galleryId`: The ID from step 1.
    - `title`: The display title for the gallery.
    - `src`: The path to the thumbnail image (from step 5, relative to this component,
             e.g., '../../assets/2024_My_Event_Name_thumbnail.jpg').

    Example entry:
    {
      galleryId: '2024_My_Event_Name',
      title: '2024 My Event Name',
      src: '../../assets/2024_My_Event_Name_thumbnail.jpg',
    }

// --- Helper Scripts for manifest.json ---
// To simplify the creation of the `manifest.json` file for a new gallery,
// you can use the provided helper scripts located in the `scripts/` directory.
//
// These scripts will scan a target gallery folder for images (jpg, jpeg, png, gif, webp)
// and prompt you to enter alt text for each image. They will then generate
// the `manifest.json` file in that gallery folder.
//
// If `manifest.json` already exists, the scripts will ask for confirmation before overwriting.
//
// **Using the Bash script (for Linux/macOS):**
// 1. Open your terminal.
// 2. Navigate to the project root directory.
// 3. Make sure the script is executable: `chmod +x ./scripts/generate_manifest.sh`
// 4. Run the script, providing the path to your gallery's asset folder:
//    `./scripts/generate_manifest.sh ./src/assets/photos/YOUR_GALLERY_ID/`
//    (Replace `YOUR_GALLERY_ID` with the actual ID of your gallery)
//
// **Using the PowerShell script (for Windows):**
// 1. Open PowerShell.
// 2. Navigate to the project root directory.
// 3. You may need to adjust your execution policy to run local scripts.
//    If so, you can run: `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass` (for the current session)
// 4. Run the script, providing the path to your gallery's asset folder:
//    `./scripts/Generate-Manifest.ps1 -DirectoryPath ./src/assets/photos/YOUR_GALLERY_ID/`
//    (Replace `YOUR_GALLERY_ID` with the actual ID of your gallery)
*/
import { Component, HostListener } from '@angular/core';

type photoGalleries = Array<{ galleryId: string; title: string; src: string }>;

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
      galleryId: '2025_Burns_Dinner_Gallery',
      title: '2025 Robert Burns Dinner',
      src: '../../assets/2025_Burns_Dinner_Gallery.jpg',
    },{
      galleryId: '2025_KC_St_Patricks_Parade',
      title: '2025 Kansas City St Patrick\'s Parade',
      src: '../../assets/2025_KC_St_Patricks_Parade.jpg',
    },{
      galleryId: '2025_emporia_parade',
      title: '2025 Brookside & Emporia St Patrick\'s Day Parade',
      src: '../../assets/2025_emporia_parade.JPG',
    },{
      galleryId: '2024_Tulsa_Scotfest',
      title: '2024 Tulsa Scotfest',
      src: '../../assets/2024_Tulsa_Scotfest.jpg',
    },{
      galleryId: '2024_KC_Irish_Festival',
      title: '2024 Kansas City Irish Festival',
      src: '../../assets/2024_Irish_fest.jpg',
    },{
      galleryId: '2024_St_Paul_Competition',
      title: '2024 St Paul Highland Games',
      src: '../../assets/2024_St_Paul_Highland_Games.JPG',
    },{
      galleryId: '2024_Taps_at_the_Tower',
      title: '2024 Taps at the Tower',
      src: '../../assets/2024_Taps_at_the_Tower.jpg',
    },{
      galleryId: '2024_Chicago_Games',
      title: '2024 Chicago Highland Games',
      src: '../../assets/2024_Chicago_Highland_Games.jpg',
    },{
      galleryId: '2024_St_Louis_Competition',
      title: '2024 St Louis Highland Games',
      src: '../../assets/2024_St_Louis_Highland_Games.JPG',
    },{
      galleryId: '2024_St_Patrick_Parades',
      title: '2024 St Patrick\'s Parades',
      src: '../../assets/2024_St_Patricks_Parades.JPG',
    },{
      galleryId: '2023_Kansas_City_Ceilidh',
      title: '2023 Kansas City Ceilidh',
      src: '../../assets/2023_Kansas_City_Ceilidh.jpg',
    },{
      galleryId: '2023_Ceilidh_at_the_Crossroads',
      title: '2023 Ceilidh at the Crossroads',
      src: '../../assets/2023_Crossroads_Ceilidh.JPG',
    },{
      galleryId: '2023_Kirking_of_the_Tartans',
      title: '2023 Kirking of the Tartan',
      src: '../../assets/2023_Kirking_of_the_Tartan.JPG',
    },{
      galleryId: '2023_St_Andrew_Day',
      title: '2023 St Andrew Day',
      src: '../../assets/2023_St_Andrew_Day.JPG',
    },{
      galleryId: '2023_Irish_Festival',
      title: '2023 Irish Festival',
      src: '../../assets/2023_Irish_Festival.jpg',
    },
    {
      galleryId: '2023_Ethnic_Festival',
      title: '2023 Ethnic Festival',
      src: '../../assets/2023_Ethnic_Festival.jpg',
    },
    {
      galleryId: '2023_Taps_at_the_Tower',
      title: '2023 Taps at the Tower',
      src: '../../assets/2023_Taps_at_the_Tower.jpg',
    },
    {
      galleryId: '2023_Chicago_Games',
      title: '2023 Chicago Games',
      src: '../../assets/2023_Chicago_Games.jpg',
    },
    {
      galleryId: '2023_Robert_Burns_Dinner',
      title: '2023 Robert Burns Dinner',
      src: '../../assets/2023_Burns_Dinner.jpg',
    },
    {
      galleryId: '2022_Tulsa_Scot_Fest',
      title: '2022 Tulsa Scot Fest',
      src: '../../assets/2022_Tulsa_Scot_Fest.jpg',
    },
    {
      galleryId: '2022_Taps_at_the_Tower',
      title: '2022 Taps at the Tower',
      src: '../../assets/2022_Taps_at_the_Tower.jpg',
    },
    {
      galleryId: '2022_KC_St_Patricks_Parade',
      title: '2022 KC St Patricks Parade',
      src: '../../assets/2022_KC_St_Patricks_Parade.jpg',
    },
    {
      galleryId: '2022_Irish_Festival',
      title: '2022 Irish Festival',
      src: '../../assets/2022_Irish_Festival.jpg',
    },
    {
      galleryId: '2022_Diplomatic_Ball',
      title: '2022 Diplomatic Ball',
      src: '../../assets/2022_Diplomatic_Ball.jpg',
    },
    {
      galleryId: '2022_Baker_Graduation',
      title: '2022 Baker Graduation',
      src: '../../assets/2022_Baker_Graduation.jpg',
    },
    {
      galleryId: '2021_Ethnic_Featival',
      title: '2021 Ethnic Featival',
      src: '../../assets/2021_Ethnic_Featival.jpg',
    },
    {
      galleryId: '2021_ScotsFest_Tulsa',
      title: '2021 ScotsFest Tulsa',
      src: '../../assets/2021_ScotsFest_Tulsa.jpg',
    },
    {
      galleryId: '2021_KC_Irish_Festival',
      title: '2021 KC Irish Fest',
      src: '../../assets/2021_Irish_fest.jpg',
    },
    {
      galleryId: '2021_Baker_Graduation',
      title: '2021 Baker Graduation',
      src: '../../assets/2021_Baker_Graduation.jpg',
    },
    {
      galleryId: '2020_Burns_Dinner',
      title: '2020 Robert Burns Dinner',
      src: '../../assets/2020_Burns_Dinner.jpg',
    },
    {
      galleryId: '2019_St_Pattys_Parade',
      title: "2019 St Patrick's Parade",
      src: '../../assets/2019_St_Paddy_Parade.jpg',
    },
    {
      galleryId: '2019_Minnesota_Highland_Games',
      title: '2019 Minnestoa Highland Games',
      src: '../../assets/2019_Minnesota.jpg',
    },
    {
      galleryId: '2019_Burns_Dinner', 
      title: '2019 Burns Dinner',
      src: '../../assets/2019_Burns_Dinner.jpg',
    },
    {
      galleryId: '2018_Kirking_of_the_Tartan', 
      title: '2018 Kirking of the Tartan',
      src: '../../assets/2018_Kirking_Tartan.jpg',
    },
    {
      galleryId: '2018_KCDC_Event',
      title: '2018 KCDC Event',
      src: '../../assets/2018_KCDC_Event.jpg',
    },
    {
      galleryId: '2018_Ethnic_Festival',
      title: '2018 Ethnic Festival',
      src: '../../assets/2018_Ethnic_Festival.jpg',
    },
    {
      galleryId: '2018_Estes_Park_Colorado_Games',
      title: '2018 Estes Park Colorado Games',
      src: '../../assets/2018_Estes_Park_Colorado_Games.jpg',
    },
    {
      galleryId: '2017_Chiefs_Arrowhead_Performance',
      title: '2017 Chiefs Arrowhead Performance',
      src: '../../assets/2017_Chiefs_Arrowhead_Performance.jpg',
    },
    {
      galleryId: '2017_Chicago_Games',
      title: '2017 Chicago Games',
      src: '../../assets/2017_Chicago_Games.jpg',
    },
    {
      galleryId: '2017_Burns_Dinner',
      title: '2017 Burns Dinner',
      src: '../../assets/2017_Burns_dinner.jpg',
    },
    {
      galleryId: '2015_Burns_Dinner',
      title: '2015 Burns Dinner',
      src: '../../assets/photos/2015_Burns_Dinner/thumbs/150124_001  a_thumb.webp',
    },
    {
      galleryId: '2015_Chieftains',
      title: '2015 Chieftains Concert',
      src: '../../assets/photos/2015_Chieftains/thumbs/220317 01_thumb.webp',
    },
    {
      galleryId: '2015_Kirking_of_the_Tartan',
      title: '2015 Kirking of the Tartan',
      src: '../../assets/photos/2015_Kirking_of_the_Tartan/thumbs/151115_27 a_thumb.webp',
    },
    {
      galleryId: '2014_Special_Forces_Ball',
      title: '2014 Special Forces Ball',
      src: '../../assets/2014_Special_Forces_Ball.jpg',
    },
    {
      galleryId: '2012_Chieftains',
      title: '2012 Concert with the Chieftains',
      src: '../../assets/2012_Chieftains.jpg',
    },
    {
      galleryId: '1999',
      title: '1999',
      src: '../../assets/photos/1999/thumbs/1999 KC Highlan Games 01_thumb.webp',
    },
    {
      galleryId: '1997',
      title: '1997',
      src: '../../assets/photos/1997/thumbs/1997 Alma Highland Games Grade 3 1st Place - 1st ever win in any grade_thumb.webp',
    },
    {
      galleryId: '1996',
      title: '1996',
      src: '../../assets/photos/1996/thumbs/1996 Kansas City Ethnic Festival_thumb.webp',
    },
    {
      galleryId: '1995',
      title: '1995',
      src: '../../assets/photos/1995/thumbs/1995 Baker University Commencement - Rick Southall, Billie McKee, Lee Wilson_thumb.webp',
    },
    {
      galleryId: '1994',
      title: '1994',
      src: '../../assets/photos/1994/thumbs/1994 Burns Dinner Adams Mark Hotel12_thumb.webp',
    },
    {
      galleryId: '1992',
      title: '1992',
      src: '../../assets/photos/1992/thumbs/1992-08 Kansas City Ethnic Festival, Swope Park Mo - Steve Chandler_thumb.webp',
    },
    {
      galleryId: '1983',
      title: '1983',
      src: '../../assets/photos/1983/thumbs/1983 Glasgow_thumb.webp',
    },
    {
      galleryId: '1982',
      title: '1982',
      src: '../../assets/photos/1982/thumbs/1982 Grant Park Chicago Highland Games - Grade 2 - Won 1st Place_thumb.webp',
    },
    {
      galleryId: '1978',
      title: '1978',
      src: '../../assets/photos/1978/thumbs/1978-8-20 Toronto - G2 Comp 4_thumb.webp',
    },
    {
      galleryId: '1976',
      title: '1976',
      src: '../../assets/photos/1976/thumbs/1976-2-27 Oklahoma City - Charlie McKee_thumb.webp',
    },
    {
      galleryId: '1974',
      title: '1974',
      src: '../../assets/photos/1974/thumbs/1974-6-8 Midlothian - 12_thumb.webp',
    },
    {
      galleryId: '1973',
      title: '1973',
      src: '../../assets/photos/1973/thumbs/1973-5-26 Alma - First Massed Bands 2_thumb.webp',
    },
    {
      galleryId: '1972',
      title: '1972',
      src: '../../assets/photos/1972/thumbs/1972-5-27 Alma - Band Comp_thumb.webp',
    },
    {
      galleryId: '1971',
      title: '1971',
      src: '../../assets/photos/1971/thumbs/1971-5-21 Alma - Always Practicing_thumb.webp',
    },
    {
      galleryId: '1970_Highland_Games',
      title: '1970 Highland Games',
      src: '../../assets/1970_Highland_Games.jpg',
    },
    {
      galleryId: '1969',
      title: '1969',
      src: '../../assets/photos/1969/thumbs/1969-5-7 Churchill Memorial Dedication - Band Members_thumb.webp',
    },
    {
      galleryId: '1966',
      title: '1966',
      src: '../../assets/photos/1966/thumbs/1966 - Austin TX HG 1_thumb.webp',
    },
    {
      galleryId: '1964_KC_Memorial_Day_Parade',
      title: '1964 KC Memorial Day Parade',
      src: '../../assets/1964_KC_Memorial_Day_Parade.jpg',
    },
    {
      galleryId: '1963_St_Andrew_Pipes_Drums',
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
