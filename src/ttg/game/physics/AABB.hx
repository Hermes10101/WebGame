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
	
	override function checkCollision(other:Collider, velocity:Point)
	{
		if (other == this)
		{
			return false;
		}
		
		if (Std.is(other, AABB))
			return new Rectangle(rect.x + velocity.x, rect.y + velocity.y, rect.width, rect.height).intersects(cast(other, AABB).rect);
		
		if (Std.is(other, BorderCollider))
			return other.checkCollision(this, velocity);
			
		return false;
	}
	
	override function collide(other:Collider, velocity:Point)
	{
		if (other == this)
		{
			return;
		}
		
		if (Std.is(other, AABB))
			AABBvsAABB(rect, cast(other, AABB).rect, velocity);
		
		if (Std.is(other, BorderCollider))
			AABBvsBorder(rect, velocity, cast(other, BorderCollider));
	}
	
	public function AABBvsAABB(rect:Rectangle, otherRect:Rectangle, velocity:Point)
	{
		var xEntryDist, xExitDist, yEntryDist, yExitDist;
		
		if (velocity.x > 0)
		{
			xEntryDist = otherRect.x - rect.right;
			xExitDist = otherRect.right - rect.x;
		} else
		{
			xEntryDist = otherRect.right - rect.x;
			xExitDist = otherRect.x - rect.right;
		}
		if (velocity.y > 0)
		{
			yEntryDist = otherRect.y - rect.bottom;
			yExitDist = otherRect.bottom - rect.y;
		} else
		{
			yEntryDist = otherRect.bottom - rect.y;
			yExitDist = otherRect.y - rect.bottom;
		}
		
		var xEntryTime, xExitTime, yEntryTime, yExitTime;
		
		if (velocity.x != 0)
		{
			xEntryTime = xEntryDist / velocity.x;
			xExitTime = xExitDist / velocity.x;
		} else
		{
			xEntryTime = -99999999999;
			xExitTime = 9999999999;
		}
		if (velocity.y != 0)
		{
			yEntryTime = yEntryDist / velocity.y;
			yExitTime = yExitDist / velocity.y;
		} else
		{
			yEntryTime = -99999999999;
			yExitTime = 9999999999;
		}
		
		var entryTime = Math.max(xEntryTime, yEntryTime);
		var exitTime = Math.min(xExitTime, yExitTime);
		
		if (entryTime > exitTime || (xEntryTime < 0 && yEntryTime < 0) || xEntryTime > 1 || yEntryTime > 1)
			return;
		
		var normal:Point = new Point();
		
		if (xEntryTime > yEntryTime)
		{
			if (xEntryDist > 0)
			{
				normal.x = -1;
			} else
			{
				normal.x = 1;
			}
		} else
		{
			if (yEntryDist > 0)
			{
				normal.y = -1;
			} else
			{
				normal.y = 1;
			}
		}
		
		velocity.x *= entryTime;
		velocity.y *= entryTime;
	}
	
	public function AABBvsBorder(rect:Rectangle, velocity:Point, border:BorderCollider)
	{
		if (!border.axis)
		{
			if (!border.normal)
			{
				velocity.x = border.location - rect.x;
			} else
			{
				velocity.x = border.location - rect.right;
			}
		} else
		{
			if (!border.normal)
			{
				velocity.y = border.location - rect.top;
			} else
			{
				velocity.y = border.location - rect.bottom;
			}
		}
	}
	
	override public function debugDraw(graphics:Graphics) 
	{
		graphics.lineStyle(1, 0xff0000);
		graphics.drawRect(rect.x, rect.y, rect.width, rect.height);
	}
	
}