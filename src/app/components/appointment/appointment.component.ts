import { Component, Input, OnInit } from '@angular/core';
import { Appointment } from 'src/app/shared/interfaces/appointment';
import { Utils } from 'src/app/shared/Utils';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {

  utils = Utils;

  @Input() selected!: Date;
  @Input() appointment!: Appointment;


  constructor() { }

  ngOnInit(): void { }

  checkNextAppointment(appointment: Appointment) {
    if (
      this.selected.getHours() < this.utils.getDateObj(appointment.date).getHours() &&
      this.utils.getDateObj(appointment.date).getFullYear() == this.selected.getFullYear() &&
      this.utils.getDateObj(appointment.date).getDate() == this.selected.getDate()
    ) return true;

    return false;
  }

}
