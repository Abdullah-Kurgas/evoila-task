import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { GraphqlService } from 'src/app/services/graphql.service';
import { Appointment } from 'src/app/shared/interfaces/appointment';
import { AppState } from 'src/app/shared/interfaces/appState';
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

  time = 8;

  appointments!: Appointment[];

  constructor(private graphqlService: GraphqlService, private store: Store<AppState>) {
    this.store.select((store) => store.date).subscribe((date: Date) => {
      this.selected = date;
    });
  }

  ngOnInit(): void {
    this.graphqlService.executeAllNodes().subscribe((res: any) => {
      this.appointments = res.data.allNodes;
    })
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
        this.utils.getDateObj(appointment.date).getMonth() == this.selected.getMonth() &&
        this.selected.getDate() == this.todaysDay.getDate()
      ) {
        filteredAppointments.push(appointment);
      }
    });

    return filteredAppointments.length != 0 ? filteredAppointments[0] : undefined;
  }
}
