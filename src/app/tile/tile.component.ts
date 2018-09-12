import { Component, OnInit, Input } from '@angular/core';
import { TileModule } from './tile.module';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.css']
})
export class TileComponent implements OnInit {

  @Input() tile: TileModule;

  constructor() { }

  ngOnInit() {
  }

}
