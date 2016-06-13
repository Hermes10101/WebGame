package ttg.game.physics;
import flash.display.Graphics;
import openfl.geom.Point;
import openfl.geom.Rectangle;

/**
 * ...
 * @author Tad
 */
class AABB extends Collider
{
	public var rect:Rectangle;
	
	public function new(x:Float, y:Float, width:Float, height:Float) 
	{
		rect = new Rectangle(x, y, width, height);
	}
	
	public function update(x:Float, y:Float, width:Float, height:Float) 
	{
		rect.x = x;
		rect.y = y;
		rect.width = width;
		rect.height = height;
	}
	
	override function checkCollision(other:Collider, movement:Point)
	{
		if (other == this)
		{
			return false;
		}
		
		if (Std.is(other, AABB))
			return new Rectangle(rect.x + movement.x, rect.y + movement.y, rect.width, rect.height).intersects(cast(other, AABB).rect);
		
		if (Std.is(other, BorderCollider))
			return cast(other, BorderCollider).checkCollision(this, movement);
			
		return false;
	}
	
	override function collide(other:Collider, movement:Point)
	{
		if (other == this)
		{
			return;
		}
		
		if (Std.is(other, AABB))
			AABBvsAABB(rect, cast(other, AABB).rect, movement);
		
		if (Std.is(other, BorderCollider))
			AABBvsBorder(rect, movement, cast(other, BorderCollider));
	}
	
	public function AABBvsAABB(rect:Rectangle, otherRect:Rectangle, movement:Point)
	{
		var newX:Float = 0;
		var newY:Float = 0;
		
		if (rect.right + movement.x > otherRect.x && !(rect.x + movement.x < otherRect.right))
		{
			newX = Math.min(rect.right, otherRect.x) - Math.max(rect.right, otherRect.x);
		}
		if (rect.x + movement.x < otherRect.right && !(rect.right + movement.x > otherRect.x))
		{
			newX = Math.max(rect.x, otherRect.right) - Math.min(rect.x, otherRect.right);
		}
		
		if (rect.top + movement.y < otherRect.top && !(rect.y + movement.y < otherRect.top))
		{
			newY = Math.min(rect.top, otherRect.y) - Math.max(rect.top, otherRect.y);
		}
		if (rect.y + movement.y < otherRect.top && !(rect.top + movement.y < otherRect.top))
		{
			newY = Math.max(rect.y, otherRect.top) - Math.min(rect.y, otherRect.top);
		}
		
		movement.x = newX;
		movement.y = newY;
	}
	
	public function AABBvsBorder(rect:Rectangle, movement:Point, border:BorderCollider)
	{
		if (!border.axis)
		{
			if (!border.normal)
			{
				movement.x = border.location - rect.x;
			} else
			{
				movement.x = rect.right - border.location;
			}
		} else
		{
			if (!border.normal)
			{
				movement.y = border.location - rect.top;
			} else
			{
				movement.y = border.location - rect.bottom;
			}
		}
	}
	
	override public function debugDraw(graphics:Graphics) 
	{
		graphics.lineStyle(1, 0xff0000);
		graphics.drawRect(rect.x, rect.y, rect.width, rect.height);
	}
	
}