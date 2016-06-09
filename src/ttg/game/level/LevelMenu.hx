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
	
	override public function load() 
	{
		super.load();
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
		testBox = new TestObject(this, 100, 100);
		addGameObject(testBox);
		addGameObject(new ButtonObject(this, 400, 250, 100, 50, "W góre", function(e) { 
			testBox.movement.y -= 50;
		} ));
		addGameObject(new ButtonObject(this, 400, 350, 100, 50, "W dół", function(e) {
			testBox.movement.y += 50;
		} ));
	}
	
}