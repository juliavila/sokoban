import { Component, OnInit, Input } from '@angular/core';
import { TileModule } from './tile.module';
import { TileType } from '../shared/enums/tile-type.enum';

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
