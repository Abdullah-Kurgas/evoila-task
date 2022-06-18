import { Component, OnInit } from '@angular/core';
import { GraphqlService } from 'src/app/services/graphql.service';
import { Utils } from 'src/app/shared/Utils';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  utils = Utils;

  selected: Date = new Date();

  time = [false, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

  appointments!: any[];

  constructor(private graphqlService: GraphqlService) { }

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

  checkNextAppointment(appointment: any) {
    if (
      this.selected.getHours() < this.utils.getDateObj(appointment.date).getHours() &&
      this.utils.getDateObj(appointment.date).getFullYear() == this.selected.getFullYear() &&
      this.utils.getDateObj(appointment.date).getDate() == this.selected.getDate()
    ) return true;

    return false;
  }
}
