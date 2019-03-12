import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class DataService {

  API_URI= 'http://ec2-54-196-78-241.compute-1.amazonaws.com:3000';
  
  constructor(private http: HttpClient) { }

  getData(){

    return this.http.get(`${this.API_URI}/data`);
  }
}