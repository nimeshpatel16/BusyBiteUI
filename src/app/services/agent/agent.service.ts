import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Agent } from 'src/app/models/agent/agent.model';
import { Observable, from } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AgentService {

  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
  }
  getAgentName(filter: { firstName: string } = { firstName: '' }): Observable<Agent[]> {
    // if (filter.firstName.length === 3) {
    return this.http.get<Agent[]>(environment.apiCompanyUrl + '/api/v1/Agent/' + filter.firstName,
      { headers: this.headers }).pipe(
        map(res => {
          if (res.length === 0) {
            let dataTransform: Agent[] = [];
            dataTransform = [{ agentName: 'please enter at least 3 characters.' }] as Agent[];
            return dataTransform;
          } else {
            return res;
          }


        }),
      );
    // }
  }


  getFakeAgentName(filter: { firstName: string } = { firstName: '' }): Observable<Agent[]> {
    return from(new Promise(resolve => resolve([{ agentName: 'please enter at least 3 characters.' }] as Agent[])));
  }
}
