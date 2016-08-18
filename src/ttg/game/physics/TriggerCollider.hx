package ttg.game.physics;
import flash.display.Graphics;
import openfl.geom.Point;
import openfl.geom.Rectangle;
import ttg.game.physics.Collider;

/**
 * ...
 * @author Tad
 */
class TriggerCollider extends Collider
{
	private var collider:Collider;
	
	public function new(col:Collider) 
	{
		collider = col;
	}
	
	override public function checkCollision(other:Collider, velocity:Point):Bool 
	{
		return collider.checkCollision(other, velocity);
	}
	
	override public function debugDraw(graphics:Graphics) 
	{
		if (Std.is(collider, AABB))
		{
			var rect:Rectangle = cast(collider, AABB).rect;
			
			graphics.lineStyle(0, 0, 0);
			graphics.beginFill(0x551111, 0.5);
			graphics.drawRect(rect.x, rect.y, rect.width, rect.height);
			graphics.endFill();
		}
	}
}