import { TileModule } from '../shared/modules/tile.module';
import { TILE_TYPE } from '../shared/enums/tile-type.enum';

describe('TileModule', () => {
  let tileModule: TileModule;

  beforeEach(() => {
    tileModule = new TileModule(TILE_TYPE.GROUND, true, false, false);
  });

  it('should create an instance', () => {
    expect(tileModule).toBeTruthy();
  });
});
