import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Appointment } from 'src/app/shared/interfaces/appointment';
import { Utils } from 'src/app/shared/Utils';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-big-calendar',
  templateUrl: './big-calendar.component.html',
  styleUrls: ['./big-calendar.component.scss']
})
export class BigCalendarComponent implements OnInit {

  utils = Utils;

  @Input() todaysDay!: Date;
  @Input() selected!: Date;
  @Input() appointments!: Appointment[];
  @Input() time!: any[];

  constructor(private modal: MatDialog) { }

  ngOnInit(): void { }

  // Calendar arrows func
  changeWeek(type: string): void {
    if (type == 'next') this.selected.setDate(this.selected.getDate() + 7);
    else this.selected.setDate(this.selected.getDate() - 7);

    this.selected = new Date(this.selected);
  }

  // Appointment click func
  showAppointmentModal(appointments: Appointment[], id: string, hour: any, week: any): void {
    let filteredAppointments: Appointment[] = [];

    appointments.forEach((appointment: Appointment) => {
      if (this.checkAppointments(appointment, 'day', hour, week)) {
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
  checkAppointments(appointment: Appointment, type: string, hour?: any, week?: any, i?: number): boolean {
    let appointmentDate: Date = new Date(appointment.date);

    if (type == 'week') {
      if (
        appointmentDate.toDateString().includes(week.name.substring(0, 3)) &&
        this.showDayOfWeek(i! - 1) == appointmentDate.getDate() &&
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
    }

    return false;
  }

}
