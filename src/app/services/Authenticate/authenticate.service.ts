import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/models/User/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  private headers: HttpHeaders;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
  }
  Authenticate(username: string, pass: string): Observable<User[]> {
    return this.http.post<User[]>(environment.apiProviderUrl + '/api/v1/User/Authenticate?username=' + username + '&password=' + pass, { headers: this.headers }).pipe(
      map(res => {
        if (res.length === 0) {
          return res;
        } else {
          return res;
        }
      }),
    );
    // }
  }
}
