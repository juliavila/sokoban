import { Component, OnInit, HostListener } from '@angular/core';
import { TileModule } from '../tile/tile.module';
import { TileType } from '../shared/enums/tile-type.enum';
import { KEY_CODE } from '../shared/enums/key-code.enum';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  tiles: TileModule[][];
  player: { x: number; y: number; };

  constructor() { }

  ngOnInit() {

    this.player = { x: 1, y: 1 };

    this.tiles = [];

    let wall          = new TileModule (TileType.WALL, false, false, false);
    let ground        = new TileModule (TileType.GROUND, false, false, false);
    let groundBox     = new TileModule (TileType.GROUND, false, false, true);
    let groundMark    = new TileModule (TileType.GROUND, true, false, false);
    let groundMarkBox = new TileModule (TileType.GROUND, true, false, true);

    this.tiles = [
      [ wall, wall, wall, wall, wall, ground ],
      [ wall, ground, ground, ground, wall, wall ],
      [ wall, groundMark, groundMarkBox, groundBox, ground, wall ],
      [ wall, ground, ground, wall, ground, wall],
      [ wall, ground, ground, ground, ground, wall ],
      [ wall, wall, wall, wall, wall, wall ]
    ];

    // for (let i = 0; i < 10; i++) {
    //   this.tiles[i] = [];

    //   for (let j = 0; j < 10; j++) {
    //     this.tiles[i][j] = new TileModule();
    //   }

    // }

  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {

    // TODO: tratrar key do evento
    let action = [];

    action[KEY_CODE.UP_ARROW]     = () =>{ this.player.x++ };
    action[KEY_CODE.RIGHT_ARROW]  = () =>{ this.player.y++ };
    action[KEY_CODE.DOWN_ARROW]   = () =>{ this.player.x-- };
    action[KEY_CODE.LEFT_ARROW]   = () =>{ this.player.y-- };
    
    action[event.keyCode]();
    console.log(this.player);
  }

  cursorHere(x: number, y: number): boolean {
    return x === this.player.x && y === this.player.y;
  }

}
