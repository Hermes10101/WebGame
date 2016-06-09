package ttg.game.gameobject.ui;

import haxe.Constraints.Function;
import openfl.text.TextField;
import openfl.text.TextFormat;
import ttg.game.gameobject.GameObject;
import ttg.game.level.Level;
import openfl.events.MouseEvent;

/**
 * ...
 * @author Tad
 */
class ButtonObject extends GameObject
{
	public var textField:TextField;
	private var width:Float;
	private var height:Float;
	private var hovered:Bool;
	
	public function new(l:Level, x:Float, y:Float, w:Float, h:Float, t:String, onClicked:MouseEvent->Void) 
	{
		super(l, x, y);
		width = w;
		height = h;
		
		textField = new TextField();
		textField.setTextFormat(new TextFormat("Verdana", 20, 0x111111));
		textField.text = t;
		textField.x = x - textField.textWidth / 2;
		textField.y = y - textField.textHeight / 2;
		textField.width = textField.textWidth;
		textField.height = textField.textHeight;
		textField.selectable = false;
		sprite.addChild(textField);
		
		sprite.addEventListener(MouseEvent.CLICK, onClicked);
		sprite.addEventListener(MouseEvent.MOUSE_OVER, function(e) { hovered = true; });
		sprite.addEventListener(MouseEvent.MOUSE_OUT, function(e) { hovered = false; });
	}
	
	override public function render() 
	{
		super.render();
		sprite.graphics.lineStyle(2, 0x555555);
		
		sprite.graphics.beginFill(hovered ? 0xaaaaaa : 0xffffff);
		sprite.graphics.drawRect(x - width/2, y - height/2, width, height);
		sprite.graphics.endFill();
	}
	
}