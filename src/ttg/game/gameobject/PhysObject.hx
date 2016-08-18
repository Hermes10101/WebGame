package ttg.game.gameobject;

import flash.geom.Point;
import ttg.game.level.Level;
import ttg.game.physics.Collider;

/**
 * ...
 * @author Tad
 */
class PhysObject extends GameObject
{
	private var velocity:Point;
	private var forces:Array<Point>;
	public var collider:Collider;
	
	public var friction:Float = 1;

	public function new(l:Level, x:Float, y:Float, col:Collider) 
	{
		super(l, x, y);
		velocity = new Point();
		forces = new Array<Point>();
		collider = col;
	}
	
	//Podklasy powinny używać super.update na końcu
	override public function update() 
	{
		var netForce:Point = new Point();
		for (f in forces)
		{
			netForce = netForce.add(f);
		}
		forces = new Array<Point>();
		
		velocity = velocity.add(netForce);
		addForce(new Point(-velocity.x * friction, -velocity.y * friction));
		
		for (col in level.colliders)
		{
			if (collider.checkCollision(col, velocity))
			{
				collider.collide(col, velocity);
			}
		}
		
		x += velocity.x;
		y += velocity.y;
		super.update();
	}
	
	public function addForce(f:Point)
	{
		forces.push(f);
	}
	
	public function addForceOverTime(f:Point, t:Int)
	{
		
	}
}