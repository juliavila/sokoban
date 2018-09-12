import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TileType } from '../shared/enums/tile-type.enum';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class TileModule {
  type: TileType;
  cursorHere: boolean;
  boxHere: boolean;
}
