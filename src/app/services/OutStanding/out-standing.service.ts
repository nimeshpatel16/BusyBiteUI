import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { searchparams } from 'src/app/models/search-param/searchparams.model';
import { Ouststanding } from 'src/app/models/Ouststanding/ouststanding.model';
import { RequestOutStandingSummary } from 'src/app/models/Ouststanding/request-out-standing-summary.model';
import { OutStandingSummary } from 'src/app/models/Ouststanding/out-standing-summary.model';
import { RequestOutStandingDetail } from 'src/app/models/Ouststanding/request-out-standing-detail.model';
import { OutStandingDetail } from 'src/app/models/Ouststanding/out-standing-detail.model';
import { FinancialYear } from 'src/app/models/finYear/finyear.model';

@Injectable({
  providedIn: 'root'
})
export class OutStandingService {
  private headers: HttpHeaders;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
  }
  LoadData(chartsearchParam: RequestOutStandingSummary): Observable<OutStandingSummary[]> {
    return this.http.post<OutStandingSummary[]>(environment.apiProviderUrl + '/api/v1/Oustanding/OutStandingList'
      , chartsearchParam, { headers: this.headers }).pipe(
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

  LoadOutStandingDetails(chartsearchParam: RequestOutStandingDetail): Observable<OutStandingDetail[]> {
    return this.http.post<OutStandingDetail[]>(environment.apiProviderUrl + '/api/v1/Oustanding/OutStandingByParty'
      , chartsearchParam, { headers: this.headers }).pipe(
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

  // GetFinancialYear(): Observable<FinancialYear[]> {
  //   return this.http.get<FinancialYear[]>(environment.apiProviderUrl + '/api/v1/Oustanding/FinYear'
  //     ,  { headers: this.headers }).pipe(
  //       map(res => {
  //         if (res.length === 0) {
  //           return res;
  //         } else {
  //           return res;
  //         }
  //       }),
  //     );
  //   // }
  // }

}
