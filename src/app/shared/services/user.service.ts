import { Injectable } from "@angular/core";
import { KeycloakService } from "keycloak-angular";
import { KeycloakProfile } from "keycloak-js";

@Injectable({
    providedIn: 'root',
  })
  export class UserService {
    public isLoggedIn = false;
    public userProfile: KeycloakProfile | null = null;

    constructor(
        public keycloakService: KeycloakService
      ) { 
        this.keycloakService.isLoggedIn().then(isLoggedIn => {
            this.isLoggedIn = isLoggedIn;

            if (this.isLoggedIn) {
                this.keycloakService.loadUserProfile().then(userProfile => {
                    this.userProfile = userProfile;
                });
            }
        });
      }
  }