import { Component, OnInit } from '@angular/core';
import { RoomReservationService} from '../../../services/room-reservation.service';
import * as moment from 'moment';

@Component({
  selector: 'app-addreservation',
  templateUrl: './addreservation.component.html',
  styleUrls: ['./addreservation.component.css']
})
export class AddreservationComponent implements OnInit {

  addReservationData:any={}
  response:string=''

  constructor( private _roomService : RoomReservationService) { }

  ngOnInit(): void {
  }

  now = new Date();
  year = this.now.getFullYear();
  month = this.now.getMonth();
  day = this.now.getDate();
  minDate1 = moment({year: this.year, month: this.month, day: this.day}).format('YYYY-MM-DD');
  minDate2 = moment({year: this.year, month: this.month, day: this.day+1}).format('YYYY-MM-DD');
  
    

  addReservation(){
    if(new Date(this.addReservationData.checkInDate).getTime()  >  new Date(this.addReservationData.checkOutDate).getTime()){
      this.response='Check-In should be lesser than Check-Out'
    }
    else{
    this._roomService.addReservation(this.addReservationData)
      .subscribe(
        res =>{
          if(res.includes('Cast to ObjectId failed for value')){
            this.response = "Id not found. Enter id again"
          }
          else{
          this.response = res;
          }
          
        },
        err => {
          this.response =err.message
          console.log(err)
        }
      )
    }

  }

}
