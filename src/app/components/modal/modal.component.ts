import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  appointment: any;
  appointmentDate!: Date;
  itemNumber: number = 0;

  constructor(
    public modal: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit(): void {
    this.appointment = this.data[this.itemNumber];

    this.appointmentDate = new Date(this.appointment?.date);
  }

  changeApointment(type: string) {
    if (type == 'next') {
      this.itemNumber++;
    }else{
      this.itemNumber--;
    }
    this.appointment = this.data[this.itemNumber];
    this.appointmentDate = new Date(this.appointment?.date);
  }

}
