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
		
		bg = new TileBackground("levels/Menu");
		main.addChild(bg);
		
		new ButtonObject(this, 400, 300, 200, 100, "Poziom 1", function(e) { 
			game.loadLevel(new Level1(main));
		} );
		new ButtonObject(this, 400, 400, 200, 100, "Player Test", function(e) { 
			game.loadLevel(new LevelPlayerTest(main));
		} );
		
		main.addChild(debugSprite);
	}
	
}