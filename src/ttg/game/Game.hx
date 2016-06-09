package ttg.game;
import ttg.game.level.Level;
import ttg.game.gameobject.TestObject;
import ttg.game.level.LevelMenu;

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
		loadLevel(new LevelMenu(main));
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
	
	public function loadLevel(l:Level)
	{
		if (level != null)
			level.exit();
			
		l.load(this);
		level = l;
	}
	
}