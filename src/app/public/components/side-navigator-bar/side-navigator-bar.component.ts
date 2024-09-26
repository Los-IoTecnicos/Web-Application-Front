import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-side-navigator-bar',
  templateUrl: './side-navigator-bar.component.html',
  styleUrls: ['./side-navigator-bar.component.css']
})
export class SideNavigatorBarComponent {

  constructor(private router: Router) {}

  onNavItemSelected(route: string) {

    this.router.navigate([`/${route}`]);
  }

  onSettingsClick() {
    this.router.navigate([`/profile`]);
    console.log('Settings clicked');
  }
}
