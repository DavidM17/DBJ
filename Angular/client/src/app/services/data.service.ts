import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class DataService {

  API_URI= ':3000';
  
  constructor(private http: HttpClient) { }

  getData(){

    return this.http.get(`${this.API_URI}/data`);
  }

  getDatas(date1:string,hour1:string,date2:string,hour2:string){

    return this.http.post(`${this.API_URI}/data/time/`,{date1,hour1,date2,hour2});

  }
}

