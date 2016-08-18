package ttg.game.gameobject;

import flash.geom.Point;
import ttg.game.level.Level;
import ttg.game.physics.Collider;
import ttg.game.physics.TriggerCollider;

/**
 * ...
 * @author Tad
 */
class Trigger extends GameObject
{
	public var collider:TriggerCollider;
	private var target:Collider;
	
	private dynamic function activate(){}

	public function new(l:Level, x:Float, y:Float, col:TriggerCollider, tgt:Collider, func)
	{
		super(l, x, y);
		collider = col;
		target = tgt;
		activate = func;
	}
	
	override public function update() 
	{
		super.update();
		if (collider.checkCollision(target, new Point()))
			activate();
	}
}