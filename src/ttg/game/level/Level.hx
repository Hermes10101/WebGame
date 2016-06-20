package ttg.game.level;
import flash.display.Sprite;
import ttg.game.Game;
import ttg.game.Main;
import ttg.game.gameobject.GameObject;
import ttg.game.physics.Collider;

/**
 * ...
 * @author Tad
 */
class Level
{
	public var objects:Array<GameObject>;
	public var main:Main;
	var bg:TileBackground;
	public var colliders:Array<Collider>;
	var debugSprite:Sprite;
	
	public function new(m:Main) 
	{
		objects = new Array<GameObject>();
		colliders = new Array<Collider>();
		main = m;
		debugSprite = new Sprite();
	}
	
	public function addGameObject(obj:GameObject)
	{
		objects.push(obj);
	}
	
	public function addCollider(col:Collider)
	{
		colliders.push(col);
	}
	
	public function update()
	{
		for (obj in objects)
		{
			obj.update();
		}
	}
	
	public function render()
	{
		bg.render();
		for (obj in objects)
		{
			obj.render();
		}
		debugSprite.graphics.clear();
		for (col in colliders)
		{
			col.debugDraw(debugSprite.graphics);
		}
	}
	
	public function load(game:Game)
	{
		
	}
	
	public function exit()
	{
		for (obj in objects)
		{
			obj.destroy();
		}
		main.removeChild(bg);
	}
}