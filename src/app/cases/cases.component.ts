import { Component, OnInit, Input } from '@angular/core';
import { MyServiceService } from '../my-service.service';

@Component({
  selector: 'app-cases',
  templateUrl: './cases.component.html',
  styleUrls: ['./cases.component.scss'],
})
export class CasesComponent implements OnInit {
  @Input() item: any;
  items;
  myCountry: any = 'south africa';
  constructor(private service: MyServiceService) {}

  ngOnInit(): void {
    this.getCasesDataFromService();
  }
  ngAfterViewInit(): void {}

  show();
  show() {
    this.items = this.item;
    console.log('this', this.item);
  }

  getCasesDataFromService() {
    this.service.getCasesData(this.myCountry).subscribe((data: any) => {
      this.item = data;
      console.log('h', data);
    });
  }
}
