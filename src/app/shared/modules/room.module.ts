import { NgModule } from '@angular/core';
import { TileModule } from './tile.module';
import { Coordinate } from './coordinate.module';

@NgModule()
export class RoomModule {
  tiles: Array<Array<TileModule>>;
  cursor: Coordinate;
  name: string;
}
