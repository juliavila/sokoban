import { NgModule } from '@angular/core';
import { TileType } from '../shared/enums/tile-type.enum';

@NgModule()
export class TileModule {
  type: TileType;
  isMark: boolean;
  cursorHere: boolean;
  boxHere: boolean;

  constructor(type: TileType, isMark: boolean, cursorHere: boolean, boxHere: boolean) {
    this.type = type;
    this.isMark = isMark;
    this.cursorHere = cursorHere;
    this.boxHere = boxHere;
  }
}
