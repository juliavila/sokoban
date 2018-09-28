import { Component, OnInit } from '@angular/core';
import { TileModule } from './shared/modules/tile.module';
import { TILE_TYPE } from './shared/enums/tile-type.enum';
import { RoomModule } from './shared/modules/room.module';
import { Coordinate } from './shared/modules/coordinate.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{

  actualRoom: RoomModule;
  totalMoves: number;
  win: boolean;

  ngOnInit() {
    this.actualRoom = new RoomModule();

    let wall          = new TileModule (TILE_TYPE.WALL, false, false, false);
    let ground        = new TileModule (TILE_TYPE.GROUND, false, false, false);
    let groundBox     = new TileModule (TILE_TYPE.GROUND, false, false, true);
    let groundMark    = new TileModule (TILE_TYPE.GROUND, true, false, false);
    let groundMarkBox = new TileModule (TILE_TYPE.GROUND, true, false, true);

    this.actualRoom = { 
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
    };
  }
}
