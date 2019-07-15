import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { Observable, from } from 'rxjs';
import { Company } from 'src/app/models/company/company.model';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
  }
  getCompanyName(filter: { firstName: string } = { firstName: '' }): Observable<Company[]> {
    debugger;
    // if (filter.firstName.length === 3) {
    return this.http.get<Company[]>(environment.apiCompanyUrl + '/api/v1/Company/' + filter.firstName,
      { headers: this.headers }).pipe(
        map(res => {
          if (res.length === 0) {
            let dataTransform: Company[] = [];
            dataTransform = [{ CompanyName: 'please enter at least 3 characters.' }] as Company[];
            return dataTransform;
          } else {
            return res;
          }


        }),
      );
    // }
  }


  getFakeCompanyName(filter: { firstName: string } = { firstName: '' }): Observable<Company[]> {
    return from(new Promise(resolve => resolve([{ CompanyName: 'please enter at least 3 characters.' }] as Company[])));
  }
}
