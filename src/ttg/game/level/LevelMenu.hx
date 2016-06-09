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