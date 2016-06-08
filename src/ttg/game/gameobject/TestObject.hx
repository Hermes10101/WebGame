package ttg.game.gameobject;

import lime.math.Vector2;
import ttg.game.level.Level;
import ttg.game.input.Input;

/**
 * ...
 * @author Tad
 */
class TestObject extends GameObject
{
	var movement:Vector2;
	var speed:Float = 10;

	public function new(l:Level, x:Float, y:Float) 
	{
		super(l, x, y);
		movement = new Vector2();
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
		
		movement = new Vector2();
	}
	
	override public function render() 
	{
		super.render();
		sprite.graphics.beginFill(0xffffff);
		sprite.graphics.drawRect(x - 50, y - 50, 100, 100);
		sprite.graphics.endFill();
	}
	
}