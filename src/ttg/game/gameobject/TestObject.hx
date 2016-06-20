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
	public var velocity:Point;
	var speed:Float = 5;
	var width:Float;
	var height:Float;
	var hitBox:AABB;

	public function new(l:Level, x:Float, y:Float) 
	{
		super(l, x, y);
		width = 100;
		height = 100;
		velocity = new Point();
		hitBox = new AABB(x - width / 2, y - height / 2, width, height);
		l.addCollider(hitBox);
	}
	
	override public function update() 
	{
		super.update();
		if (Input.isKeyDown(37))
			velocity.x -= speed;
		
		if (Input.isKeyDown(38))
			velocity.y -= speed;
		
		if (Input.isKeyDown(39))
			velocity.x += speed;
		
		if (Input.isKeyDown(40))
			velocity.y += speed;
		
		hitBox.update(x - (width / 2), y - (height / 2), width, height);
		for (col in level.colliders)
		{
			if (hitBox.checkCollision(col, velocity))
			{
				hitBox.collide(col, velocity);
			}
		}
		
		x += velocity.x;
		y += velocity.y;
		
		velocity = new Point();
	}
	
	override public function render() 
	{
		super.render();
		sprite.graphics.beginFill(0x00ff00);
		sprite.graphics.drawRect(x - width / 2, y - height / 2, width, height);
		sprite.graphics.endFill();
	}
	
}