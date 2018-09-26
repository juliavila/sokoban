import { Component, Input, OnInit } from '@angular/core';
import { TILE_TYPE } from '../shared/enums/tile-type.enum';
import { TileModule } from '../shared/modules/tile.module';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.css']
})
export class TileComponent implements OnInit {

  @Input() tile: TileModule;
  @Input() cursorHere: boolean;

  tileType = TILE_TYPE;

  constructor() { }

  ngOnInit() {
  }

}
