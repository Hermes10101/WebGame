package ttg.game.gameobject;

import openfl.geom.Point;
import ttg.game.input.Input;
import ttg.game.level.Level;
import ttg.game.physics.AABB;
import ttg.game.physics.Collider;

/**
 * ...
 * @author Tad
 */
class TestObject extends GameObject
{
	public var movement:Point;
	var speed:Float = 5;
	var width:Float;
	var height:Float;
	var hitBox:AABB;

	public function new(l:Level, x:Float, y:Float) 
	{
		super(l, x, y);
		width = 100;
		height = 100;
		movement = new Point();
		hitBox = new AABB(x - width / 2, y - height / 2, width, height);
		l.addCollider(hitBox);
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
		
		hitBox.update(x - (width / 2), y - (height / 2), width, height);
		for (col in level.colliders)
		{
			if (hitBox.checkCollision(col, movement))
			{
				hitBox.collide(col, movement);
			}
		}
		
		x += movement.x;
		y += movement.y;
		
		movement = new Point();
	}
	
	override public function render() 
	{
		super.render();
		sprite.graphics.beginFill(0x00ff00);
		sprite.graphics.drawRect(x - width / 2, y - height / 2, width, height);
		sprite.graphics.endFill();
	}
	
}