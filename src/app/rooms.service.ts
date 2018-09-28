import { Injectable, OnInit } from '@angular/core';
import { RoomModule } from './shared/modules/room.module';
import { TileModule } from './shared/modules/tile.module';
import { TILE_TYPE } from './shared/enums/tile-type.enum';
import { Coordinate } from './shared/modules/coordinate.module';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  private rooms = new Array<RoomModule>();
  private index: number;

  constructor() { 

    let wall          = new TileModule (TILE_TYPE.WALL, false, false);
    let ground        = new TileModule (TILE_TYPE.GROUND, false, false);
    let groundBox     = new TileModule (TILE_TYPE.GROUND, false, true);
    let groundMark    = new TileModule (TILE_TYPE.GROUND, true, false);
    let groundMarkBox = new TileModule (TILE_TYPE.GROUND, true, true);

    this.rooms.push( { 
      name: "1 - Genesis",
      tiles: [
        [ {...wall}, {...wall}, {...wall}, {...wall}, {...wall}, {...ground}],
        [ {...wall}, {...ground}, {...ground}, {...ground}, {...wall}, {...wall} ],
        [ {...wall}, {...groundMark}, {...groundMarkBox}, {...groundBox}, {...ground}, {...wall} ],
        [ {...wall}, {...ground}, {...ground}, {...wall}, {...ground}, {...wall}],
        [ {...wall}, {...ground}, {...ground}, {...ground}, {...ground}, {...wall} ],
        [ {...wall}, {...wall}, {...wall}, {...wall}, {...wall}, {...wall} ]
      ],
      cursor: new Coordinate(1, 1)
    } );

    this.rooms.push( { 
      name: "2 - Genesis",
      tiles: [
        [ {...wall}, {...wall}, {...wall}, {...wall}, {...wall}, {...ground}],
        [ {...wall}, {...ground}, {...ground}, {...ground}, {...wall}, {...wall} ],
        [ {...wall}, {...groundMark}, {...groundMarkBox}, {...groundBox}, {...ground}, {...wall} ],
        [ {...wall}, {...ground}, {...ground}, {...wall}, {...ground}, {...wall}],
        [ {...wall}, {...ground}, {...ground}, {...ground}, {...ground}, {...wall} ],
        [ {...wall}, {...wall}, {...wall}, {...wall}, {...wall}, {...wall} ]
      ],
      cursor: new Coordinate(1, 1)
    } );

    this.index = 0;
  }

  // Essa lógica só funciona quando há mais de uma sala;

  getCurrentRoom() {
    return this.rooms[this.index];
  }

  getNextRoom() {
    this.index = (this.index === this.rooms.length - 1) ? 0 : this.index + 1; 
    return this.getCurrentRoom();
  }

  getPreviousRoom() {
    this.index = (!this.index) ? this.rooms.length - 1 : this.index - 1;
    return this.getCurrentRoom();
  }

}
