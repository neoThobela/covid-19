import { Component, OnInit } from '@angular/core';
import { MyServiceService } from '../my-service.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  countryData: any;
  countryActiveData: any;
  country: any;
  myControl = new FormControl();
  options:[]=[];
  filteredOptions: Observable<any>;

  constructor(private service: MyServiceService) {}

  ngOnInit(): void {
    this.getCountryDatafromService();
    this.getCasesDataFromService();

// this.options=this.countryData.filter((country:{country:any}) => country.country == country)

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.name)),
      map(name => (name ? this._filter(name) : this.options.slice())),
    );
  }

  displayFn(user:any) {
    return user && user.name ? user.name : '';
  }
   _filter(name: any){
    const filterValue = name.toLowerCase();

    return this.countryData.filter((option:any) => option.country.toLowerCase().includes(filterValue));
  }

  getCountryDatafromService() {
    this.service.getCountryData().subscribe((data: any) => {
      this.countryData = data;
      this.options=this.countryData.filter((country:{country:any}) => country.country )

      console.log('option', this.options);
    });
  }

  getCasesDataFromService() {
    this.service.getCasesData(this.country).subscribe((data: any) => {
      this.countryActiveData = data;
      console.log('h', data);
    });
  }
  // displayfn(subject: any) {
  //   return subject ? subject.country : undefined;
  // }

  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(
      this.countryActiveData,
      event.previousIndex,
      event.currentIndex
    );
  }
  displayData(selectedCountry: any) {
    //   // let newArray=this.options.push(selectedCountry)
    //   let country = this.countryData.filter((element:any) => {
    //    return  element['country'] == selectedCountry['country']
    this.country = selectedCountry;
    console.log('this2', this.country);
  }

  // }
}
