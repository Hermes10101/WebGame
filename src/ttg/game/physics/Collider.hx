package ttg.game.physics;
import flash.display.Graphics;
import openfl.geom.Point;

/**
 * ...
 * @author Tad
 */
class Collider
{
	public function checkCollision(other:Collider, movement:Point):Bool { return false; }
	public function collide(other:Collider, movement:Point) {}
	public function debugDraw(graphics:Graphics) {};
}