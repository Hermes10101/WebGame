package ttg.game.gameobject;

import lime.math.Vector2;
import openfl.display.Bitmap;
import ttg.game.level.Level;
import ttg.game.input.Input;
import openfl.Assets;

/**
 * ...
 * @author Tad
 */
class TestObject extends GameObject
{
	public var movement:Vector2;
	var speed:Float = 10;
	var width:Float;
	var height:Float;
	var imgBmp:Bitmap;

	public function new(l:Level, x:Float, y:Float) 
	{
		super(l, x, y);
		movement = new Vector2();
		
		var imgData = Assets.getBitmapData("img/lokalizacje/las/sciezka_dolna_czesc.png");
		imgBmp = new Bitmap(imgData);
		sprite.addChild(imgBmp);
	}
	
	override public function update() 
	{
		super.update();
		if (Input.isKeyDown(37))
			movement.x -= speed;
		
		if (Input.isKeyDown(38))
			movement.y -= speed;
		
		if (Input.isKeyDown(39))
			movement.x += speed;
		
		if (Input.isKeyDown(40))
			movement.y += speed;
		
		x += movement.x;
		y += movement.y;
		
		imgBmp.x = x;
		imgBmp.y = y;
		
		movement = new Vector2();
	}
	
	override public function render() 
	{
		super.render();
	}
	
}