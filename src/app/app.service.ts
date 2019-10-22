import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  // private serviceUrl = 'http://127.0.0.1:8080';
  private serviceUrl = 'http://106.13.130.5:8787';
  constructor(private http: HttpClient) { }

  /** GET heroes from the server */
  getHeroes(data: any): Observable<any> {
    const d = Object.assign({}, data);
    return this.http.post<any>(this.serviceUrl + '/api/xyy-voting-data', d);
  }
}
