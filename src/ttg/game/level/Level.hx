package ttg.game.level;
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
		for (obj in objects)
		{
			obj.render();
		}
	}
	
	public function load()
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