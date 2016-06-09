package ttg.game.level;

import flash.display.Sprite;
import haxe.ds.Vector;
import openfl.display.Bitmap;
import openfl.display.BitmapData;
import openfl.Assets;
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
	var tileNames:Array<String> = [
		"trawa",
		"trawa_kamienie",
		"trawa_kwiatki",
		"drzewo",
		"sciezka"
	];
	
	public function new(m:Main, map:Array<Array<Int>>) 
	{
		super();
		var bgData = new BitmapData(800, 600);
		createBackground(bgData, map);
		var bitMap = new Bitmap(bgData);
		addChild(bitMap);
	}
	
	private function createBackground(bgData:BitmapData, map:Array<Array<Int>>)
	{
		for (i in 0...map.length)
		{
			var row:Array<Int> = map[i];
			for (j in 0...row.length)
			{
				bgData.draw(Assets.getBitmapData("img/lokalizacje/las/" + tileNames[row[j]] + ".png"), new Matrix(1, 0, 0, 1, j * 40, i * 40));
			}
		}
	}
	
	public function render()
	{
		this.graphics.clear();
	}
	
}