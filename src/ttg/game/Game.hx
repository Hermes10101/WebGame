package ttg.game;
import openfl.display.FPS;
import ttg.game.level.Level;
import ttg.game.gameobject.TestObject;
import ttg.game.level.LevelMenu;
import ttg.game.level.TileBackground;

/**
 * ...
 * @author Tad
 */
class Game
{
	var main:Main;
	var level:Level;
	var fps:FPS;

	public function new(m:Main) 
	{
		main = m;
		fps = new FPS(10, 10, 0xeeeeee);
	}
	
	public function init()
	{
		TileBackground.init();
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
		main.addChild(fps);
	}
}