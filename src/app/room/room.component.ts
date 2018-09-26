import { Component, HostListener, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { KEY_CODE } from '../shared/enums/key-code.enum';
import { TILE_TYPE } from '../shared/enums/tile-type.enum';
import { DIRECTION } from '../shared/enums/direction.enum';
import { TileModule } from '../shared/modules/tile.module';
import { Coordinate } from '../shared/modules/coordinate.module';
import { RoomModule } from '../shared/modules/room.module';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  @Input() room: RoomModule;
  @Output() totalMoves: EventEmitter<number> = new EventEmitter();
  @Output() win: EventEmitter<boolean> = new EventEmitter();

  cursor: Coordinate;

  private _counter: number;

  public get counter(): number {
    return this._counter;
  }

  public set counter(value) {
    this._counter = value;
    this.totalMoves.emit(value);
  }

  constructor() { }

  ngOnInit() {
    this.cursor = new Coordinate(1, 1);
    this.counter = 0;
    this.win.emit(false);
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
    this.counter++;

    return true;
  }

  pushBox(coordinate: Coordinate, direction): boolean {

    if ( !this.room.tiles[coordinate.y][coordinate.x].boxHere ) return false;

    let boxNewCoordinate = this.nextCoordinate(coordinate, direction);
      
    if ( !this.freeTile(boxNewCoordinate) ) return false;

    this.room.tiles[coordinate.y][coordinate.x].boxHere = false;
    this.room.tiles[boxNewCoordinate.y][boxNewCoordinate.x].boxHere = true;
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
    let tile = this.room.tiles[coordinate.y][coordinate.x];
    return tile.type === TILE_TYPE.GROUND && !tile.boxHere;
  }

  cursorHere(x: number, y: number): boolean {
    return x === this.cursor.x && y === this.cursor.y;
  }

  checkWin(): boolean {
    let win = this.room.tiles.every( line => !line.some( tile => (tile.isMark && !tile.boxHere) ) );
    this.win.emit(win);
    return win;
    return true;
  }

}
