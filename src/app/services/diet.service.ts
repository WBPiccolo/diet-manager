import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DietService {
  constructor(private http: HttpClient) {}

  baseEndpoint = 'http://localhost:8000/';
  endpoints = {
    getDietData: this.baseEndpoint + 'getDietData',
  };

  getDietData() {
    return this.http.get(this.endpoints.getDietData);
  }
}
