package ttg.game.gameobject;

import flash.geom.Point;
import openfl.display.Tilesheet;
import ttg.game.level.Level;
import ttg.game.level.TileBackground;
import ttg.game.physics.AABB;
import ttg.game.physics.Collider;
import ttg.game.input.Input;
import ttg.game.input.KeyBindings;

/**
 * ...
 * @author Tad
 */
class PlayerObject extends PhysObject
{
	private var speed:Float;
	private static var walkSpeed:Float = 80;
	private static var runSpeed:Float = 100;
	
	private var image:Tilesheet;
	private var state:Int = 0;
	private var step:Int = 30;
	private var stepTimer:Int = 0;
	
	public function new(l:Level, x:Float, y:Float)
	{
		super(l, x, y, new AABB(x, y, 40, 40));
		
		image = TileBackground.createTilesheet("img/characters/player.png");
	}
	
	override public function update() 
	{
		cast(collider, AABB).update(x, y, 40, 40);
		
		if (Input.isKeyDown(KeyBindings.SPRINT))
		{
			speed = runSpeed;
		} else
		{
			speed = walkSpeed;
		}
		
		state = 0;
		if (velocity.y > 0)
		{
			step = Std.int(45 / (velocity.y*velocity.y));
			if (stepTimer >= 0 && stepTimer < step)
			{
				state = 1;
			}
			if (stepTimer >= step && stepTimer < step * 2)
			{
				state = 2;
			}
			stepTimer++;
			if (stepTimer >= step * 2)
			{
				stepTimer = 0;
			}
		}
		
		if (Input.isKeyDown(KeyBindings.LEFT))
			addForce(new Point(-speed/60, 0));
		
		if (Input.isKeyDown(KeyBindings.UP))
			addForce(new Point(0, -speed/60));
		
		if (Input.isKeyDown(KeyBindings.RIGHT))
			addForce(new Point(speed/60, 0));
		
		if (Input.isKeyDown(KeyBindings.DOWN))
			addForce(new Point(0, speed/60));
		
		super.update();
	}
	
	override public function render() 
	{
		super.render();
		image.drawTiles(sprite.graphics, [x, y, state]);
	}
}