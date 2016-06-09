package ttg.game.level;
import ttg.game.Game;
import ttg.game.Main;
import ttg.game.gameobject.GameObject;

/**
 * ...
 * @author Tad
 */
class Level
{
	var objects:Array<GameObject>;
	public var main:Main;
	var bg:TileBackground;
	
	public function new(m:Main) 
	{
		objects = new Array<GameObject>();
		main = m;
	}
	
	public function addGameObject(obj:GameObject)
	{
		objects.push(obj);
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
	}
}