import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MyServiceService {

  constructor(private http:HttpClient) { }
  getCountryData(){
    return this.http.get("https://disease.sh/v3/covid-19/countries/")
  }

  getCasesData(country:any){
    return this.http.get(`https://disease.sh/v3/covid-19/countries/${country}`)
  }
  
}


