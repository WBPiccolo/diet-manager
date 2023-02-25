import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DietService {
  constructor(private http: HttpClient) {}

  baseEndpoint = 'http://localhost:8000/';
  endpoints = {
    getDietData: this.baseEndpoint + 'getDietData',
  };

  getDietData(): Observable<any> {
    return this.http.get<any>(this.endpoints.getDietData);
  }
}
