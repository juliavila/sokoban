import { Component, HostListener, OnInit } from '@angular/core';
import { KEY_CODE } from '../shared/enums/key-code.enum';
import { TileType } from '../shared/enums/tile-type.enum';
import { TileModule } from '../tile/tile.module';
import { Coordinate } from './../shared/modules/coordinate.module';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  tiles: TileModule[][];
  cursor: Coordinate;

  constructor() { }

  ngOnInit() {

    this.cursor = new Coordinate(1, 1);

    this.tiles = [];

    let wall          = new TileModule (TileType.WALL, false, false, false);
    let ground        = new TileModule (TileType.GROUND, false, false, false);
    let groundBox     = new TileModule (TileType.GROUND, false, false, true);
    let groundMark    = new TileModule (TileType.GROUND, true, false, false);
    let groundMarkBox = new TileModule (TileType.GROUND, true, false, true);

    this.tiles = [
      [ wall, wall, wall, wall, wall, ground ],
      [ wall, ground, ground, ground, wall, wall ],
      [ wall, groundMark, groundMarkBox, groundBox, ground, wall ],
      [ wall, ground, ground, wall, ground, wall],
      [ wall, ground, ground, ground, ground, wall ],
      [ wall, wall, wall, wall, wall, wall ]
    ];

    // for (let i = 0; i < 10; i++) {
    //   this.tiles[i] = [];

    //   for (let j = 0; j < 10; j++) {
    //     this.tiles[i][j] = new TileModule();
    //   }

    // }

  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {

    if (!Object.values(KEY_CODE).includes(event.keyCode)) return;

    let coordinate = this.cursor;

    let action = [];
    action[KEY_CODE.UP_ARROW]    = () => coordinate.y--;
    action[KEY_CODE.RIGHT_ARROW] = () => coordinate.x++;
    action[KEY_CODE.DOWN_ARROW]  = () => coordinate.y++;
    action[KEY_CODE.LEFT_ARROW]  = () => coordinate.x--;

    action[event.keyCode]();

    this.run(coordinate);
  }

  run(newCoordinete: Coordinate) {

    if (this.freeTile()) {
      this.cursor = newCoordinete;
    }

  }

  freeTile() {
    return true;
  }

  cursorHere(x: number, y: number): boolean {
    return x === this.cursor.x && y === this.cursor.y;
  }

}
