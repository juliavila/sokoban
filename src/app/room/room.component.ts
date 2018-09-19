import { Component, HostListener, OnInit } from '@angular/core';
import { KEY_CODE } from '../shared/enums/key-code.enum';
import { TILE_TYPE } from '../shared/enums/tile-type.enum';
import { DIRECTION } from '../shared/enums/direction.enum';
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
  totalMoves: number;

  constructor() { }

  ngOnInit() {

    this.cursor = new Coordinate(1, 1);
    this.totalMoves = 0;

    this.tiles = [];

    let wall          = new TileModule (TILE_TYPE.WALL, false, false, false);
    let ground        = new TileModule (TILE_TYPE.GROUND, false, false, false);
    let groundBox     = new TileModule (TILE_TYPE.GROUND, false, false, true);
    let groundMark    = new TileModule (TILE_TYPE.GROUND, true, false, false);
    let groundMarkBox = new TileModule (TILE_TYPE.GROUND, true, false, true);

    this.tiles = [
      [ {...wall}, {...wall}, {...wall}, {...wall}, {...wall}, {...ground}],
      [ {...wall}, {...ground}, {...ground}, {...ground}, {...wall}, {...wall} ],
      [ {...wall}, {...groundMark}, {...groundMarkBox}, {...groundBox}, {...ground}, {...wall} ],
      [ {...wall}, {...ground}, {...ground}, {...wall}, {...ground}, {...wall}],
      [ {...wall}, {...ground}, {...ground}, {...ground}, {...ground}, {...wall} ],
      [ {...wall}, {...wall}, {...wall}, {...wall}, {...wall}, {...wall} ]
    ];

    // for (let i = 0; i < 10; i++) {
    //   this.tiles[i] = [];
    //   for (let j = 0; j < 10; j++) {
    //     this.tiles[i][j] = new TileModule();
    //   }
    // }

  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent): void {

    if (!Object.values(KEY_CODE).includes(event.keyCode)) return;

    let directions = [];
    directions[KEY_CODE.UP_ARROW]    = DIRECTION.UP;
    directions[KEY_CODE.RIGHT_ARROW] = DIRECTION.RIGHT;
    directions[KEY_CODE.DOWN_ARROW]  = DIRECTION.DOWN;
    directions[KEY_CODE.LEFT_ARROW]  = DIRECTION.LEFT;

    this.run(directions[event.keyCode]);
  }
  
  run(direction: DIRECTION) {

    let newCoordinate: Coordinate = this.nextCoordinate(this.cursor, direction);
    
    if ( this.moveCursor(newCoordinate) ) return;
    
    this.pushBox(newCoordinate, direction);

  }

  moveCursor(coordinate: Coordinate): boolean {
    if (!this.freeTile(coordinate)) return false;

    this.cursor = coordinate;
    this.totalMoves++;

    console.log(this.checkWin());

    return true;
  }

  pushBox(coordinate: Coordinate, direction): boolean {

    if ( !this.tiles[coordinate.y][coordinate.x].boxHere ) return false;

    let boxNewCoordinate = this.nextCoordinate(coordinate, direction);
      
    if ( !this.freeTile(boxNewCoordinate) ) return false;

    this.tiles[coordinate.y][coordinate.x].boxHere = false;
    this.tiles[boxNewCoordinate.y][boxNewCoordinate.x].boxHere = true;
    this.moveCursor(coordinate);

    return true;
  }
  
  nextCoordinate(coordinate: Coordinate, direction: DIRECTION): Coordinate {
    
    let next = { ...coordinate };

    let actions = [];
    actions[DIRECTION.UP]    = () => next.y--;
    actions[DIRECTION.RIGHT] = () => next.x++;
    actions[DIRECTION.DOWN]  = () => next.y++;
    actions[DIRECTION.LEFT]  = () => next.x--;

    actions[direction]();
    return next;
  }

  freeTile(coordinate: Coordinate) {
    let tile = this.tiles[coordinate.y][coordinate.x];
    return tile.type === TILE_TYPE.GROUND && !tile.boxHere;
  }

  cursorHere(x: number, y: number): boolean {
    return x === this.cursor.x && y === this.cursor.y;
  }

  checkWin(): boolean {
    return this.tiles.every( line => !line.some( tile => (tile.isMark && !tile.boxHere) ) );
  }

}
