import { Component, OnInit } from '@angular/core';
import { TileModule } from './shared/modules/tile.module';
import { TILE_TYPE } from './shared/enums/tile-type.enum';
import { RoomModule } from './shared/modules/room.module';
import { Coordinate } from './shared/modules/coordinate.module';
import { RoomsService } from './rooms.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{

  room: RoomModule;
  totalMoves: number;
  win: boolean;

  constructor(public roomsService: RoomsService) {}

  ngOnInit() {
    this.room = this.roomsService.getCurrentRoom();
  }

  next() {
    this.room = this.roomsService.getNextRoom();
  }

  previous() {
    this.room = this.roomsService.getPreviousRoom();
  }
}
