import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Citas } from '../components/models/citas';

@Injectable({
  providedIn: 'root'
})
export class CitasService {
  base = environment.URL;
  citasURL= `${this.base}citas/`

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Citas[]> {
    return this.httpClient.get<Citas[]>(`${this.citasURL}`);
  }

  public detail(id: string): Observable<Citas> {
    return this.httpClient.get<Citas>(`${this.citasURL}${id}`);
  }

  public save(citas: Citas): Observable<any> {
    return this.httpClient.post<any>(`${this.citasURL}`, citas);
  }

  public update(id: string, citas: Citas): Observable<any> {
    return this.httpClient.put<any>(`${this.citasURL}${id}`, citas);
  }

  public delete(id: string): Observable<any> {
    return this.httpClient.delete<any>(`${this.citasURL}${id}`);
  }
}
