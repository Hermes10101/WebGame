package ttg.game.input;
import openfl.events.KeyboardEvent;

/**
 * ...
 * @author Tad
 */
class Input
{
	static var keysDown:Array<Bool> = [];
	
	public static function keyDown(e:KeyboardEvent)
	{
		keysDown[e.keyCode] = true;
	}
	
	public static function keyUp(e:KeyboardEvent)
	{
		keysDown[e.keyCode] = false;
	}
	
	public static function isKeyDown(keyCode:Int):Bool
	{
		return keysDown[keyCode];
	}
}