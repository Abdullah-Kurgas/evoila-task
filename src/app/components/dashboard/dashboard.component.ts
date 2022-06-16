import { HttpClient } from '@angular/common/http';
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
  time = [false,8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 0, 1, 2, 3, 4, 5, 6, 7];

  appointments!: any[];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // console.log(new Date('2019-03-09T11:00:00.000+0000'));

    this.http.get('./assets/data.json').subscribe((res: any) => {
      this.appointments = res.data.appointments.nodes;
    });
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

  checkAppointments(appointment: any, hour: any, week: any): boolean {
    let appointmentDate = new Date(appointment.date)

    if (appointmentDate.toDateString().includes(week.name.substring(0, 3)) && this.selected.toDateString() == appointmentDate.toDateString() && hour == appointmentDate.getHours()) {

      console.log(appointmentDate, this.selected.toDateString());
      return true;
    };

    return false;
  }
}
