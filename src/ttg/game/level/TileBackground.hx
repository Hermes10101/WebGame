package ttg.game.level;

import flash.display.Sprite;
import haxe.Unserializer;
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
	public static var bgTileSheets:Map<String, Tilesheet> = new Map<String, Tilesheet>();
	
	var map:Array<Array<String>>;
	
	public static function init()
	{
		bgTileSheets.set("grass", createTilesheet("img/background/grass.png"));
		bgTileSheets.set("road", createTilesheet("img/background/road.png"));
		bgTileSheets.set("tlo", createTilesheet("img/background/grass.png"));
	}
	
	public function new(path:String) 
	{
		super();
		var unserializer:Unserializer = new Unserializer(Assets.getText(path));
		
		map = unserializer.unserialize();
	}
	
	public static function createTilesheet(imgPath:String):Tilesheet
	{
		var img:BitmapData = Assets.getBitmapData(imgPath);
		var sheet:Tilesheet = new Tilesheet(img);
		
		var sheetWidth:Int = cast(img.width / 40, Int);
		var sheetHeight:Int = cast(img.width / 40, Int);
		
		for (i in 0...sheetWidth)
		{
			for (j in 0...sheetHeight)
			{
				sheet.addTileRect(new Rectangle(j * 40, i * 40, 40, 40));
			}
		}
		
		return sheet;
	}
	
	private function createBackground(map:Array<Array<String>>)
	{
		for (i in 0...map.length)
		{
			var row:Array<String> = map[i];
			for (j in 0...row.length)
			{
				var parts:Array<String> = row[j].split(".");
				var id:Int = Std.parseInt(parts[1]);
				
				bgTileSheets.get(parts[0]).drawTiles(graphics, [j * 40, i * 40, id]);
			}
		}
		graphics.endFill();
	}
	
	public function render()
	{
		graphics.clear();
		createBackground(map);
	}
	
}