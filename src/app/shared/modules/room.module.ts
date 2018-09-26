import { NgModule } from '@angular/core';
import { TileModule } from './tile.module';

@NgModule()
export class RoomModule {
  tiles: Array<Array<TileModule>>;
}
