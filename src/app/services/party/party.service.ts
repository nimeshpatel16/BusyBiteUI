import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { Party } from 'src/app/models/party/party.model';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PartyService {

  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
  }
  getPartyName(filter: { firstName: string } = { firstName: '' }): Observable<Party[]> {
    // if (filter.firstName.length === 3) {
    return this.http.get<Party[]>(environment.apiCompanyUrl + '/api/v1/Supplier/' + filter.firstName,
      { headers: this.headers }).pipe(
        map(res => {
          if (res.length === 0) {
            let dataTransform: Party[] = [];
            dataTransform = [{ partyName: 'please enter at least 3 characters.' }] as Party[];
            return dataTransform;
          } else {
            return res;
          }


        }),
      );
    // }
  }


  getFakePartyName(filter: { firstName: string } = { firstName: '' }): Observable<Party[]> {
    return from(new Promise(resolve => resolve([{ partyName: 'please enter at least 3 characters.' }] as Party[])));
  }
}
