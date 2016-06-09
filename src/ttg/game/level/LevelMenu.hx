package ttg.game.level;

import ttg.game.Main;
import ttg.game.gameobject.TestObject;
import ttg.game.gameobject.ui.ButtonObject;

/**
 * ...
 * @author Tad
 */
class LevelMenu extends Level
{
	var testBox:TestObject;

	public function new(m:Main) 
	{
		super(m);
	}
	
	override public function load(game) 
	{
		super.load(game);
		bg = new TileBackground(main, [
		[0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
		[0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
		[0, 0, 0, 0, 3, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
		[0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
		[0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
		[0, 0, 0, 1, 0, 4, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 1, 0, 0],
		[4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
		[0, 0, 0, 0, 0, 4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
		[0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
		[0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
		[0, 2, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
		[0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 1, 0, 0],
		[0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0],
		[0, 0, 0, 0, 0, 4, 2, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0],
		[0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0]
		]);
		main.addChild(bg);
		addGameObject(new ButtonObject(this, 400, 300, 200, 100, "Poziom 1", function(e) { 
			game.loadLevel(new Level1(main));
		} ));
	}
	
}