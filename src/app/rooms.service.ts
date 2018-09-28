import { Injectable } from '@angular/core';
import { TILE_TYPE } from './shared/enums/tile-type.enum';
import { Coordinate } from './shared/modules/coordinate.module';
import { RoomModule } from './shared/modules/room.module';
import { TileModule } from './shared/modules/tile.module';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  private rooms = new Array<RoomModule>();
  private index: number;

  constructor() {

    const wall          = new TileModule (TILE_TYPE.WALL, false, false);
    const ground        = new TileModule (TILE_TYPE.GROUND, false, false);
    const groundBox     = new TileModule (TILE_TYPE.GROUND, false, true);
    const groundMark    = new TileModule (TILE_TYPE.GROUND, true, false);
    const groundMarkBox = new TileModule (TILE_TYPE.GROUND, true, true);

    this.rooms.push( {
      name: '1 - Genesis',
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
      name: '2',
      tiles: [
        [ {...wall}, {...wall}, {...wall}, {...wall}, {...wall}, {...wall}, {...ground}],
        [ {...wall}, {...ground}, {...ground}, {...ground}, {...ground}, {...wall}, {...wall} ],
        [ {...wall}, {...ground}, {...groundBox}, {...groundBox}, {...ground}, {...ground}, {...wall} ],
        [ {...wall}, {...ground}, {...wall}, {...groundMark}, {...ground}, {...groundMark}, {...wall}],
        [ {...wall}, {...ground}, {...ground}, {...ground}, {...ground}, {...ground}, {...wall} ],
        [ {...wall}, {...wall}, {...wall}, {...wall}, {...wall}, {...wall}, {...wall} ]
      ],
      cursor: new Coordinate(1, 1)
    } );

    this.rooms.push( {
      name: '3',
      tiles: [
        [ {...ground}, {...ground}, {...wall}, {...wall}, {...wall}, {...wall}, {...ground}],
        [ {...wall}, {...wall}, {...wall}, {...ground}, {...ground}, {...wall}, {...ground}],
        [ {...wall}, {...ground}, {...ground}, {...groundMark}, {...groundBox}, {...wall}, {...wall} ],
        [ {...wall}, {...ground}, {...ground}, {...ground}, {...groundBox}, {...ground}, {...wall} ],
        [ {...wall}, {...ground}, {...wall}, {...groundMark}, {...ground}, {...ground}, {...wall}],
        [ {...wall}, {...ground}, {...ground}, {...ground}, {...ground}, {...ground}, {...wall} ],
        [ {...wall}, {...wall}, {...wall}, {...wall}, {...wall}, {...wall}, {...wall} ]
      ],
      cursor: new Coordinate(1, 2)
    } );

    this.rooms.push( {
      name: '4',
      tiles: [
        [ {...ground}, {...wall}, {...wall}, {...wall}, {...wall}, {...wall}, {...ground}],
        [ {...wall}, {...wall}, {...ground}, {...ground}, {...ground}, {...wall}, {...wall}],
        [ {...wall}, {...ground}, {...ground}, {...wall}, {...ground}, {...ground}, {...wall} ],
        [ {...wall}, {...ground}, {...groundBox}, {...groundMarkBox}, {...groundBox}, {...ground}, {...wall} ],
        [ {...wall}, {...ground}, {...ground}, {...groundMark}, {...ground}, {...ground}, {...wall} ],
        [ {...wall}, {...wall}, {...ground}, {...groundMark}, {...ground}, {...wall}, {...wall}],
        [ {...ground}, {...wall}, {...wall}, {...wall}, {...wall}, {...wall}, {...ground}]
      ],
      cursor: new Coordinate(2, 1)
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
