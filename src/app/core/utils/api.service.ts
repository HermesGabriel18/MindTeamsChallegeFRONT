import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private _http: HttpClient) {}

  get(url?: string, options?: any, fullUrl?: boolean): Observable<any> {
    return this._http.get(
      fullUrl ? url : `${environment.apiUrl}${url}`,
      options ? options : this._options()
    );
  }

  getNormal(url: string, options?: any): Observable<any> {
    return this._http.get(`${url}`, options);
  }

  put(url: string, body: any = {}): Observable<any> {
    return this._http.put(
      `${environment.apiUrl}${url}`,
      JSON.stringify(body),
      this._options()
    );
  }

  patch(
    url: string,
    body: any = {},
    options?: any,
    fullUrl?: boolean
  ): Observable<any> {
    return this._http.patch(
      fullUrl ? url : `${environment.apiUrl}${url}`,
      JSON.stringify(body),
      options ? options : this._options()
    );
  }

  post(
    url: string,
    body: any = {},
    options?: any,
    fullUrl?: boolean
  ): Observable<any> {
    return this._http.post(
      fullUrl ? url : `${environment.apiUrl}${url}`,
      JSON.stringify(body),
      options ? options : this._options()
    );
  }

  delete(url: string, options?: any, fullUrl?: boolean): Observable<any> {
    return this._http.delete(
      fullUrl ? url : `${environment.apiUrl}${url}`,
      options ? options : this._options()
    );
  }

  private _options = () => ({ headers: this.headers });
}
