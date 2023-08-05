import { Component } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  public showMenu = false;

  constructor(
    public userService: UserService
  ) { }

  public toggleMenu(): void {
    this.showMenu = !this.showMenu;
  }

}
