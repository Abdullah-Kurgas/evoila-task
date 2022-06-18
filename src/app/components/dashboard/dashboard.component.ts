import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GraphqlService } from 'src/app/services/graphql.service';
import { Utils } from 'src/app/shared/Utils';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  utils = Utils;

  selected: Date = new Date();
  todaysDay: Date = new Date();

  time = [false, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

  appointments!: any[];

  constructor(private modal: MatDialog, private graphqlService: GraphqlService) { }

  ngOnInit(): void {
    this.graphqlService.executeAllNodes().subscribe((res: any) => {
      this.appointments = res.data.allNodes;
    })
  }

  // Big calendar arrows func
  changeWeek(type: string): void {
    if (type == 'next') this.selected.setDate(this.selected.getDate() + 7);
    else this.selected.setDate(this.selected.getDate() - 7);

    this.selected = new Date(this.selected);
  }

  // Small calendar event emitter
  calendarChange(date: string): void {
    let dateChanged = date
      .toString()
      .replace(
        '00:00:00',
        this.utils.generateTime(new Date().getHours(), 2).toString()
      );
    this.selected = new Date(dateChanged);
  }

  // Appointment click func
  showAppointmentModal(
    appointments: any,
    id: string,
    hour: any,
    week: any
  ): void {
    let filteredAppointments: any[] = [];

    appointments.forEach((appointment: any) => {
      if (this.checkAppointments(appointment,'day', hour, week)) {
        filteredAppointments.push(appointment);
      }
    });

    this.modal.open(ModalComponent, {
      data: {
        appointments: filteredAppointments.sort((a, b) => {
          if (
            this.utils.getDateObj(a.date).getHours() <
            this.utils.getDateObj(b.date).getHours()
          )
            return -1;
          if (
            this.utils.getDateObj(a.date).getHours() >
            this.utils.getDateObj(b.date).getHours()
          )
            return 1;
          return 0;
        }),
        appointmentId: id,
      },
    });
  }

  // Func for showing days in big calendar
  generateDayInWeek(id: number): number {
    let day = this.selected.getDate();
    let weekDay = this.selected.getDay();

    return day - (weekDay - id);
  }

  // Get Day of week in number
  showDayOfWeek(day: number) {
    return this.generateDayInWeek(day) <= 0
      ? this.getLastDayInMonth(1) + this.generateDayInWeek(day)
      : this.getLastDayInMonth(0) < this.generateDayInWeek(day)
        ? this.generateDayInWeek(day) - this.getLastDayInMonth(0)
        : this.generateDayInWeek(day);
  }

  // Func for getting last day in previous month
  getLastDayInMonth(month: number): number {
    return new Date(
      this.selected.getFullYear(),
      this.selected.getMonth() - month,
      31
    ).getDate() < 31
      ? 31 -
      new Date(
        this.selected.getFullYear(),
        this.selected.getMonth() - month,
        31
      ).getDate()
      : new Date(
        this.selected.getFullYear(),
        this.selected.getMonth() - month,
        31
      ).getDate();
  }

  // Func for putting every appointment in it's correct position
  checkAppointments(
    appointment: any,
    type: string,
    hour?: any,
    week?: any,
    i?: any,
  ): boolean {
    let appointmentDate: Date = new Date(appointment.date);

    if (type == 'week') {
      if (
        appointmentDate.toDateString().includes(week.name.substring(0, 3)) &&
        this.showDayOfWeek(i-1) == appointmentDate.getDate() &&
        appointmentDate.getMonth() == this.selected.getMonth() &&
        appointmentDate.getFullYear() == this.selected.getFullYear() &&
        hour == appointmentDate.getHours()
      )
        return true;
    } else if (type == 'day') {
      if (
        appointmentDate.toDateString().includes(week.name.substring(0, 3)) &&
        appointmentDate.getFullYear() === this.selected.getFullYear()
      )
        return true;
    } else if (type == 'next') {
      if (
        this.selected.getHours() < appointmentDate.getHours() &&
        appointmentDate.getFullYear() == this.selected.getFullYear() &&
        appointmentDate.getDate() == this.selected.getDate()
      )
        return true;
    }

    return false;
  }
}
