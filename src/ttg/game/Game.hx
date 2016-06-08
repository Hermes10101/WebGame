package ttg.game;
import ttg.game.level.Level;
import ttg.game.gameobject.TestObject;

/**
 * ...
 * @author Tad
 */
class Game
{
	var main:Main;
	var level:Level;

	public function new(m:Main) 
	{
		main = m;
	}
	
	public function init()
	{
		level = new Level(main);
		var obj:TestObject = new TestObject(level, 600, 300);
		level.addGameObject(obj);
	}
	
	public function update()
	{
		level.update();
		render();
	}
	
	public function render()
	{
		level.render();
	}
	
}