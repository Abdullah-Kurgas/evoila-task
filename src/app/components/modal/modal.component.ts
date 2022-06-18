import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Appointment } from 'src/app/shared/interfaces/appointment';
import { Utils } from 'src/app/shared/Utils';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  utils = Utils;

  appointment!: Appointment;
  itemNumber: number = 0;

  constructor(
    public modal: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {appointments: Appointment[],appointmentId: string }
  ) {}

  ngOnInit(): void {
    this.data.appointments.forEach((appointment: Appointment, i: number) => {
      if (appointment.id == this.data.appointmentId) this.itemNumber = i;
    });

    this.appointment = this.data.appointments[this.itemNumber];
  }

  changeApointment(type: string): void {
    if (type == 'next') {
      this.itemNumber++;
    } else {
      this.itemNumber--;
    }
    this.appointment = this.data.appointments[this.itemNumber];
  }
}
