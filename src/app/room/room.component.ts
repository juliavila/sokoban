import { Component, OnInit } from '@angular/core';
import { TileModule } from '../tile/tile.module';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  tiles: TileModule[][];

  constructor() { }

  ngOnInit() {
    this.tiles = [];
    
    for (let i = 0; i < 10; i++) {
      this.tiles[i] = [];

      for (let j = 0; j < 10; j++) {
        this.tiles[i][j] = new TileModule();
      }

    }

  }

}
