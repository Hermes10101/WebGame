package ttg.game.level;

import flash.display.Sprite;
import haxe.ds.Vector;
import openfl.display.Bitmap;
import openfl.display.BitmapData;
import openfl.Assets;
import openfl.display.Tilesheet;
import openfl.geom.Matrix;
import openfl.geom.Point;
import openfl.geom.Rectangle;
import ttg.game.Main;

/**
 * ...
 * @author Tad
 */
class TileBackground extends Sprite
{
	private static var bgBitmap = Assets.getBitmapData("img/tlo.png");
	public static var bgTileSheet:Tilesheet = new Tilesheet(bgBitmap);
	
	var map:Array<Array<Int>>;
	
	public static function init()
	{
		for (i in 0...8)
		{
			for (j in 0...8)
			{
				bgTileSheet.addTileRect(new Rectangle(j * 40, i * 40, 40, 40));
			}
		}
	}
	
	public function new(m:Array<Array<Int>>) 
	{
		super();
		map = m;
		createBackground(map);
	}
	
	private function createBackground(map:Array<Array<Int>>)
	{
		for (i in 0...map.length)
		{
			var row:Array<Int> = map[i];
			for (j in 0...row.length)
			{
				bgTileSheet.drawTiles(graphics, [j * 40, i * 40, row[j]]);
			}
		}
	}
	
	public function render()
	{
		graphics.clear();
		createBackground(map);
	}
	
}