package ttg.game.physics;
import flash.display.Graphics;
import openfl.geom.Point;
import ttg.game.physics.Collider;

/**
 * ...
 * @author Tad
 */
class BorderCollider extends Collider
{
	public var axis:Bool; //false -> x | true -> y
	public var normal:Bool; //false -> - | true -> +
	public var location:Float;
	
	public function new(a:Bool, n:Bool, l:Float) 
	{
		axis = a;
		normal = n;
		location = l;
	}
	
	override public function checkCollision(other:Collider, velocity:Point):Bool 
	{
		if (other == this)
			return false;
		
		if (!axis)
		{
			if (!normal)
			{
				var otherLeft = null;
				
				if (Std.is(other, AABB))
					otherLeft = cast(other, AABB).rect.x + velocity.x;
				
				if (otherLeft == null)
					return false;
				
				return otherLeft < location;
			} else
			{
				var otherRight = null;
				
				if (Std.is(other, AABB))
					otherRight = cast(other, AABB).rect.right + velocity.x;
				
				if (otherRight == null)
					return false;
				
				return otherRight > location;
			}
		} else
		{
			if (!normal)
			{
				var otherTop = null;
				
				if (Std.is(other, AABB))
					otherTop = cast(other, AABB).rect.top + velocity.y;
				
				if (otherTop == null)
					return false;
				
				return otherTop < location;
			} else
			{
				var otherBottom = null;
				
				if (Std.is(other, AABB))
					otherBottom = cast(other, AABB).rect.bottom + velocity.y;
				
				if (otherBottom == null)
					return false;
				
				return otherBottom > location;
			}
		}
		
		return false;
	}
	
	override public function debugDraw(graphics:Graphics) 
	{
		graphics.lineStyle(3, 0xff0000);
		
		if (axis)
		{
			graphics.moveTo(0, location);
			graphics.lineTo(800, location);
		} else
		{
			graphics.moveTo(location, 0);
			graphics.lineTo(location, 600);
		}
	}
}