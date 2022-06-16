import { Component, OnInit } from '@angular/core';
import { Utils } from 'src/app/shared/Utils';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  selected: Date = new Date();
  time = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];

  utils = Utils;

  constructor() { }

  ngOnInit(): void {
  }

  calendarChange(e:any){
    console.log(e);
  }

  getDaysInWeek(id: number){
    let day = this.selected.getDate();
    let weekDay = this.selected.getDay();
    
    return day - (weekDay - id);
  }
}
