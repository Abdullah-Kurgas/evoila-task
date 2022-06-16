import { Component, OnInit } from '@angular/core';
import { MatCalendar } from '@angular/material/datepicker';
import { Utils } from 'src/app/shared/Utils';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  utils = Utils;

  selected: Date = new Date();
  time = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];

  constructor() { }

  ngOnInit(): void {

  }

  changeWeek(type: string) {
    if (type == 'next')
      this.selected.setDate(this.selected.getDate() + 7);
    else
      this.selected.setDate(this.selected.getDate() - 7);

    this.selected = new Date(this.selected)

  }

  calendarChange(e: MatCalendar<any>) {

  }

  getDaysInWeek(id: number) {
    let day = this.selected.getDate();
    let weekDay = this.selected.getDay();

    return day - (weekDay - id);
  }

  getLastDayInMonth(month: number) {
    return new Date(this.selected.getFullYear(), this.selected.getMonth() - month, 31).getDate() < 31
      ?
      31 - new Date(this.selected.getFullYear(), this.selected.getMonth() - month, 31).getDate()
      :
      new Date(this.selected.getFullYear(), this.selected.getMonth() - month, 31).getDate();
  }
}
