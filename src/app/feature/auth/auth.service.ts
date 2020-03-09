import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { tap, catchError } from "rxjs/operators";
import { AuthModule } from "./auth.module";
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { DeezerApiCredentials } from "../../../environments/environment";

@Injectable()
export class AuthService {
  private appId = "398684";
  private redirectUri = "http://127.0.0.1:4200/playlists";
  private permissions = "basic_access,email,offline_access,manage_library,delete_library";
  private responseType = "token";

  authUrl = `https://connect.deezer.com/oauth/auth.php?app_id=${this.appId}&redirect_uri=${this.redirectUri}&perms=${this.permissions}&response_type=${this.responseType}`;

  private baseAuthUrl = "https://connect.deezer.com/oauth/auth.php?";
  private authOptions = new HttpHeaders({
    "app_id": this.appId,
    "redirect_uri": this.redirectUri,
    "perms": this.permissions,
    "response_type": this.responseType
  });

  constructor(private http: HttpClient, private router: Router) { }

  login() {
    // return this.http.get("auth/", { headers: this.authOptions }).pipe(
    //   tap(res => console.log("AUTH SERVICE RESPONSE: ", res)),
    //   catchError(err => {
    //     console.log("CATCH ERROR: ", err);
    //     return of([]);
    //   })
    // );
    console.log("LOGGING IN.....");
    const authUrl = `app_id=${this.appId}&redirect_uri=${this.redirectUri}&perms=${this.permissions}&response_type=${this.responseType}`;
    // this.router.navigateByUrl("/auth");
    `/auth?${authUrl}`;
    console.log("LOGGED IN.....");
  }
}
