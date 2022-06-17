import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatCalendar } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { Utils } from 'src/app/shared/Utils';
import { ModalComponent } from '../modal/modal.component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  utils = Utils;

  selected: Date = new Date();
  time = [false, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 0, 1, 2, 3, 4, 5, 6, 7];

  appointments!: any[];

  constructor(private http: HttpClient, private modal: MatDialog) { }

  ngOnInit(): void {
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

  showAppointmentModal(appointments: any, hour: any, week: any) {
    let filteredAppointments: any[] = [];
    appointments.forEach((appointment: any) => {
      if (this.checkAppointments(appointment, hour, week, 'day')) {
        filteredAppointments.push(appointment);
      }
    });

    this.modal.open(ModalComponent, {
      data: filteredAppointments
    });
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

  checkAppointments(appointment: any, hour: any, week: any, type: string): boolean {
    let appointmentDate = new Date(appointment.date)

    if (type == 'week') {
      if (
        appointmentDate.toDateString().includes(week.name.substring(0, 3)) &&
        this.selected.toDateString() == appointmentDate.toDateString() &&
        hour == appointmentDate.getHours()) return true;
    } else if (type == 'day') {
      if (
        appointmentDate.toDateString().includes(week.name.substring(0, 3)) &&
        appointmentDate.getDay() == this.selected.getDay() &&
        appointmentDate.getFullYear() === this.selected.getFullYear()) return true
    } else if (type == 'next') {
      if(
        this.selected.getHours() > appointmentDate.getHours() &&
        appointmentDate.getFullYear() == this.selected.getFullYear() &&
        appointmentDate.getDate() == this.selected.getDate()
        ) return true;
    }

    return false;
  }
}
