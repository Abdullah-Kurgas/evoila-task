import { Component, EventEmitter, OnInit } from '@angular/core';
import { GraphqlService } from 'src/app/services/graphql.service';
import { Appointment } from 'src/app/shared/interfaces/appointment';
import { Utils } from 'src/app/shared/Utils';

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

  appointments!: Appointment[];

  constructor(private graphqlService: GraphqlService) { }

  ngOnInit(): void {
    this.graphqlService.executeAllNodes().subscribe((res: any) => {
      this.appointments = res.data.allNodes;
    })
  }

  // Func from big-calendar comp (func for arrows)
  changeWeek(date: Date){
    this.selected = date;
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

  // Func for showing next appointment
  checkNextAppointment(appointments: Appointment[]) {
    let filteredAppointments: Appointment[] = [];

    appointments?.forEach((appointment: Appointment) => {
      if (
        this.selected.getHours() < this.utils.getDateObj(appointment.date).getHours() &&
        this.utils.getDateObj(appointment.date).getFullYear() == this.selected.getFullYear() &&
        this.utils.getDateObj(appointment.date).getDate() == this.selected.getDate() &&
        this.selected.getDate() == this.todaysDay.getDate()
      ) {
        filteredAppointments.push(appointment);
      }
    });
    
    return filteredAppointments.length != 0 ? filteredAppointments[0] : undefined;
  }
}
