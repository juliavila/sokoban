import { Component, Input, OnInit } from '@angular/core';
import { TileType } from '../shared/enums/tile-type.enum';
import { TileModule } from './tile.module';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.css']
})
export class TileComponent implements OnInit {

  @Input() tile: TileModule;
  @Input() cursorHere: boolean;

  tileType = TileType;

  constructor() { }

  ngOnInit() {
  }

}
