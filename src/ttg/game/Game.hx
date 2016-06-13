package ttg.game;

import openfl.display.FPS;
import ttg.game.level.Level;
import ttg.game.level.LevelMenu;
import ttg.game.level.TileBackground;

/**
 * ...
 * @author Tad
 */
enum GameState
{
	Playing;
	Paused;
}
 
class Game
{
	var main:Main;
	var level:Level;
	var fps:FPS;
	var state:GameState = GameState.Playing;

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
		if (state == GameState.Playing)
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