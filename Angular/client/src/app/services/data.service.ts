import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class DataService {

  API_URI= 'localhost:3000';
  
  constructor(private http: HttpClient) { }

  getData(){

    return this.http.get(`${this.API_URI}/data`);
  }

  getDatas(date1:string,date2:string){

    return this.http.get(`${this.API_URI}/data/${date1}/${date2}`);

  }
}