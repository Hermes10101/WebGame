package ttg.game.level;

import ttg.game.Game;
import ttg.game.Main;
import ttg.game.gameobject.PlayerObject;
import ttg.game.gameobject.Trigger;
import ttg.game.physics.TriggerCollider;
import ttg.game.physics.AABB;

/**
 * ...
 * @author Tad
 */
class LevelPlayerTest extends Level
{

	public function new(m:Main) 
	{
		super(m);
	}
	
	override public function load(game:Game) 
	{
		super.load(game);
		
		bg = new TileBackground("levels/1");
		main.addChild(bg);
		
		var player:PlayerObject = new PlayerObject(this, 23, 45);
		
		var trigger:Trigger = new Trigger(this, 50, 50, new TriggerCollider(new AABB(700, 600, 100, 100)), player.collider, function() { game.loadLevel(new LevelMenu(main)); });
		
		addCollider(new AABB(150, 150, 500, 50));
		addCollider(player.collider);
		addCollider(trigger.collider);
		
		main.addChild(debugSprite);
	}
	
}