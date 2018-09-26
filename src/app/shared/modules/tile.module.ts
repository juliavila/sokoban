import { NgModule } from '@angular/core';
import { TILE_TYPE } from '../enums/tile-type.enum';

@NgModule()
export class TileModule {
  type: TILE_TYPE;
  isMark: boolean;
  cursorHere: boolean;
  boxHere: boolean;

  constructor(type: TILE_TYPE, isMark: boolean, cursorHere: boolean, boxHere: boolean) {
    this.type = type;
    this.isMark = isMark;
    this.boxHere = boxHere;
  }
}
