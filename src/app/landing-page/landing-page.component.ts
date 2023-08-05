import { Component } from '@angular/core';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {
  public showMenu = false;

  constructor(
    public userService: UserService
  ) { }

  public signIn(): void {
    this.userService.keycloakService.login();
  }

  public signOut(): void {
    this.userService.keycloakService.logout();
  }

  public register(): void {
    this.userService.keycloakService.register();
  }
  
  public toggleMenu(): void {
    this.showMenu = !this.showMenu;
  }

}
