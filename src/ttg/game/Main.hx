package ttg.game;

import openfl.display.Sprite;
import openfl.events.Event;
import openfl.events.KeyboardEvent;
import openfl.text.TextField;
import ttg.game.input.Input;

/**
 * ...
 * @author Tad
 */
class Main extends Sprite 
{
	var game:Game;
	
	public function enterFrame(e)
	{
		game.update();
	}
	
	public function init()
	{
		stage.addEventListener(KeyboardEvent.KEY_DOWN, Input.keyDown);
		stage.addEventListener(KeyboardEvent.KEY_UP, Input.keyUp);
		
		game = new Game(this);
		game.init();
		
		stage.addEventListener(Event.ENTER_FRAME, enterFrame);
	}
	
	public function onAdded(e)
	{
		init();
	}
	
	public function new() 
	{
		super();
		addEventListener(Event.ADDED_TO_STAGE, onAdded);
	}

}