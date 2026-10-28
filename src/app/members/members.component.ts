import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { SHEET_MUSIC } from './sheet-music/sheet-music.data';
import { isNew } from './sheet-music/sheet-music.utils';
import { PLAYLISTS } from './resources/resources.data';

export interface MembersTab {
  path: string;
  label: string;
  shortLabel: string; // shown on phones so all tabs fit
  icon: string;
}

// Shell for the members area: header, tab bar, and the active tab's route.
@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  tabs: MembersTab[] = [
    { path: 'music', label: 'Sheet Music', shortLabel: 'Music', icon: 'library_music' },
    { path: 'competitions', label: 'Competitions', shortLabel: 'Results', icon: 'emoji_events' },
    { path: 'resources', label: 'Resources', shortLabel: 'Resources', icon: 'school' },
    { path: 'info', label: 'Band Info', shortLabel: 'Info', icon: 'groups' },
  ];

  newScoreCount = SHEET_MUSIC.filter(row => isNew(row)).length;
  newPlaylist = PLAYLISTS.find(link => link.isNew);

  constructor(private _authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.isLoggedIn();
  }

  isLoggedIn() {
    if (!this._authService.loggedIn()) {
      this.router.navigate(['/login']);
    }
  }

  logout() {
    this._authService.logout();
    this.router.navigate(['/login']);
  }
}
