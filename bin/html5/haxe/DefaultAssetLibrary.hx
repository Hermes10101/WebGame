package;


import haxe.Timer;
import haxe.Unserializer;
import lime.app.Future;
import lime.app.Preloader;
import lime.app.Promise;
import lime.audio.AudioSource;
import lime.audio.openal.AL;
import lime.audio.AudioBuffer;
import lime.graphics.Image;
import lime.net.HTTPRequest;
import lime.system.CFFI;
import lime.text.Font;
import lime.utils.Bytes;
import lime.utils.UInt8Array;
import lime.Assets;

#if sys
import sys.FileSystem;
#end

#if flash
import flash.display.Bitmap;
import flash.display.BitmapData;
import flash.display.Loader;
import flash.events.Event;
import flash.events.IOErrorEvent;
import flash.events.ProgressEvent;
import flash.media.Sound;
import flash.net.URLLoader;
import flash.net.URLRequest;
#end


class DefaultAssetLibrary extends AssetLibrary {
	
	
	public var className (default, null) = new Map <String, Dynamic> ();
	public var path (default, null) = new Map <String, String> ();
	public var type (default, null) = new Map <String, AssetType> ();
	
	private var lastModified:Float;
	private var timer:Timer;
	
	
	public function new () {
		
		super ();
		
		#if (openfl && !flash)
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		#end
		
		#if flash
		
		className.set ("img/lokalizacje/las/drzewo.png", __ASSET__img_lokalizacje_las_drzewo_png);
		type.set ("img/lokalizacje/las/drzewo.png", AssetType.IMAGE);
		className.set ("img/lokalizacje/las/grzyby.png", __ASSET__img_lokalizacje_las_grzyby_png);
		type.set ("img/lokalizacje/las/grzyby.png", AssetType.IMAGE);
		className.set ("img/lokalizacje/las/korona_drzewa.png", __ASSET__img_lokalizacje_las_korona_drzewa_png);
		type.set ("img/lokalizacje/las/korona_drzewa.png", AssetType.IMAGE);
		className.set ("img/lokalizacje/las/rowagoraprawe.png", __ASSET__img_lokalizacje_las_rowagoraprawe_png);
		type.set ("img/lokalizacje/las/rowagoraprawe.png", AssetType.IMAGE);
		className.set ("img/lokalizacje/las/rowcentrum.png", __ASSET__img_lokalizacje_las_rowcentrum_png);
		type.set ("img/lokalizacje/las/rowcentrum.png", AssetType.IMAGE);
		className.set ("img/lokalizacje/las/rowdol.png", __ASSET__img_lokalizacje_las_rowdol_png);
		type.set ("img/lokalizacje/las/rowdol.png", AssetType.IMAGE);
		className.set ("img/lokalizacje/las/rowdollewa.png", __ASSET__img_lokalizacje_las_rowdollewa_png);
		type.set ("img/lokalizacje/las/rowdollewa.png", AssetType.IMAGE);
		className.set ("img/lokalizacje/las/rowdolprawe.png", __ASSET__img_lokalizacje_las_rowdolprawe_png);
		type.set ("img/lokalizacje/las/rowdolprawe.png", AssetType.IMAGE);
		className.set ("img/lokalizacje/las/rowgora.png", __ASSET__img_lokalizacje_las_rowgora_png);
		type.set ("img/lokalizacje/las/rowgora.png", AssetType.IMAGE);
		className.set ("img/lokalizacje/las/rowgoralewa.png", __ASSET__img_lokalizacje_las_rowgoralewa_png);
		type.set ("img/lokalizacje/las/rowgoralewa.png", AssetType.IMAGE);
		className.set ("img/lokalizacje/las/rowlewaczesc.png", __ASSET__img_lokalizacje_las_rowlewaczesc_png);
		type.set ("img/lokalizacje/las/rowlewaczesc.png", AssetType.IMAGE);
		className.set ("img/lokalizacje/las/rowlewakoncowka.png", __ASSET__img_lokalizacje_las_rowlewakoncowka_png);
		type.set ("img/lokalizacje/las/rowlewakoncowka.png", AssetType.IMAGE);
		className.set ("img/lokalizacje/las/rowprawaczesc.png", __ASSET__img_lokalizacje_las_rowprawaczesc_png);
		type.set ("img/lokalizacje/las/rowprawaczesc.png", AssetType.IMAGE);
		className.set ("img/lokalizacje/las/rowprawakoncowka.png", __ASSET__img_lokalizacje_las_rowprawakoncowka_png);
		type.set ("img/lokalizacje/las/rowprawakoncowka.png", AssetType.IMAGE);
		className.set ("img/lokalizacje/las/sciezka.png", __ASSET__img_lokalizacje_las_sciezka_png);
		type.set ("img/lokalizacje/las/sciezka.png", AssetType.IMAGE);
		className.set ("img/lokalizacje/las/sciezka_dolna_czesc.png", __ASSET__img_lokalizacje_las_sciezka_dolna_czesc_png);
		type.set ("img/lokalizacje/las/sciezka_dolna_czesc.png", AssetType.IMAGE);
		className.set ("img/lokalizacje/las/sciezka_gorna czesc.png", __ASSET__img_lokalizacje_las_sciezka_gorna_czesc_png);
		type.set ("img/lokalizacje/las/sciezka_gorna czesc.png", AssetType.IMAGE);
		className.set ("img/lokalizacje/las/trawa.png", __ASSET__img_lokalizacje_las_trawa_png);
		type.set ("img/lokalizacje/las/trawa.png", AssetType.IMAGE);
		className.set ("img/lokalizacje/las/trawa_kamienie.png", __ASSET__img_lokalizacje_las_trawa_kamienie_png);
		type.set ("img/lokalizacje/las/trawa_kamienie.png", AssetType.IMAGE);
		className.set ("img/lokalizacje/las/trawa_kwiatki.png", __ASSET__img_lokalizacje_las_trawa_kwiatki_png);
		type.set ("img/lokalizacje/las/trawa_kwiatki.png", AssetType.IMAGE);
		
		
		#elseif html5
		
		var id;
		id = "img/lokalizacje/las/drzewo.png";
		path.set (id, id);
		
		type.set (id, AssetType.IMAGE);
		id = "img/lokalizacje/las/grzyby.png";
		path.set (id, id);
		
		type.set (id, AssetType.IMAGE);
		id = "img/lokalizacje/las/korona_drzewa.png";
		path.set (id, id);
		
		type.set (id, AssetType.IMAGE);
		id = "img/lokalizacje/las/rowagoraprawe.png";
		path.set (id, id);
		
		type.set (id, AssetType.IMAGE);
		id = "img/lokalizacje/las/rowcentrum.png";
		path.set (id, id);
		
		type.set (id, AssetType.IMAGE);
		id = "img/lokalizacje/las/rowdol.png";
		path.set (id, id);
		
		type.set (id, AssetType.IMAGE);
		id = "img/lokalizacje/las/rowdollewa.png";
		path.set (id, id);
		
		type.set (id, AssetType.IMAGE);
		id = "img/lokalizacje/las/rowdolprawe.png";
		path.set (id, id);
		
		type.set (id, AssetType.IMAGE);
		id = "img/lokalizacje/las/rowgora.png";
		path.set (id, id);
		
		type.set (id, AssetType.IMAGE);
		id = "img/lokalizacje/las/rowgoralewa.png";
		path.set (id, id);
		
		type.set (id, AssetType.IMAGE);
		id = "img/lokalizacje/las/rowlewaczesc.png";
		path.set (id, id);
		
		type.set (id, AssetType.IMAGE);
		id = "img/lokalizacje/las/rowlewakoncowka.png";
		path.set (id, id);
		
		type.set (id, AssetType.IMAGE);
		id = "img/lokalizacje/las/rowprawaczesc.png";
		path.set (id, id);
		
		type.set (id, AssetType.IMAGE);
		id = "img/lokalizacje/las/rowprawakoncowka.png";
		path.set (id, id);
		
		type.set (id, AssetType.IMAGE);
		id = "img/lokalizacje/las/sciezka.png";
		path.set (id, id);
		
		type.set (id, AssetType.IMAGE);
		id = "img/lokalizacje/las/sciezka_dolna_czesc.png";
		path.set (id, id);
		
		type.set (id, AssetType.IMAGE);
		id = "img/lokalizacje/las/sciezka_gorna czesc.png";
		path.set (id, id);
		
		type.set (id, AssetType.IMAGE);
		id = "img/lokalizacje/las/trawa.png";
		path.set (id, id);
		
		type.set (id, AssetType.IMAGE);
		id = "img/lokalizacje/las/trawa_kamienie.png";
		path.set (id, id);
		
		type.set (id, AssetType.IMAGE);
		id = "img/lokalizacje/las/trawa_kwiatki.png";
		path.set (id, id);
		
		type.set (id, AssetType.IMAGE);
		
		
		var assetsPrefix = null;
		if (ApplicationMain.config != null && Reflect.hasField (ApplicationMain.config, "assetsPrefix")) {
			assetsPrefix = ApplicationMain.config.assetsPrefix;
		}
		if (assetsPrefix != null) {
			for (k in path.keys()) {
				path.set(k, assetsPrefix + path[k]);
			}
		}
		
		#else
		
		#if (windows || mac || linux)
		
		var useManifest = false;
		
		className.set ("img/lokalizacje/las/drzewo.png", __ASSET__img_lokalizacje_las_drzewo_png);
		type.set ("img/lokalizacje/las/drzewo.png", AssetType.IMAGE);
		
		className.set ("img/lokalizacje/las/grzyby.png", __ASSET__img_lokalizacje_las_grzyby_png);
		type.set ("img/lokalizacje/las/grzyby.png", AssetType.IMAGE);
		
		className.set ("img/lokalizacje/las/korona_drzewa.png", __ASSET__img_lokalizacje_las_korona_drzewa_png);
		type.set ("img/lokalizacje/las/korona_drzewa.png", AssetType.IMAGE);
		
		className.set ("img/lokalizacje/las/rowagoraprawe.png", __ASSET__img_lokalizacje_las_rowagoraprawe_png);
		type.set ("img/lokalizacje/las/rowagoraprawe.png", AssetType.IMAGE);
		
		className.set ("img/lokalizacje/las/rowcentrum.png", __ASSET__img_lokalizacje_las_rowcentrum_png);
		type.set ("img/lokalizacje/las/rowcentrum.png", AssetType.IMAGE);
		
		className.set ("img/lokalizacje/las/rowdol.png", __ASSET__img_lokalizacje_las_rowdol_png);
		type.set ("img/lokalizacje/las/rowdol.png", AssetType.IMAGE);
		
		className.set ("img/lokalizacje/las/rowdollewa.png", __ASSET__img_lokalizacje_las_rowdollewa_png);
		type.set ("img/lokalizacje/las/rowdollewa.png", AssetType.IMAGE);
		
		className.set ("img/lokalizacje/las/rowdolprawe.png", __ASSET__img_lokalizacje_las_rowdolprawe_png);
		type.set ("img/lokalizacje/las/rowdolprawe.png", AssetType.IMAGE);
		
		className.set ("img/lokalizacje/las/rowgora.png", __ASSET__img_lokalizacje_las_rowgora_png);
		type.set ("img/lokalizacje/las/rowgora.png", AssetType.IMAGE);
		
		className.set ("img/lokalizacje/las/rowgoralewa.png", __ASSET__img_lokalizacje_las_rowgoralewa_png);
		type.set ("img/lokalizacje/las/rowgoralewa.png", AssetType.IMAGE);
		
		className.set ("img/lokalizacje/las/rowlewaczesc.png", __ASSET__img_lokalizacje_las_rowlewaczesc_png);
		type.set ("img/lokalizacje/las/rowlewaczesc.png", AssetType.IMAGE);
		
		className.set ("img/lokalizacje/las/rowlewakoncowka.png", __ASSET__img_lokalizacje_las_rowlewakoncowka_png);
		type.set ("img/lokalizacje/las/rowlewakoncowka.png", AssetType.IMAGE);
		
		className.set ("img/lokalizacje/las/rowprawaczesc.png", __ASSET__img_lokalizacje_las_rowprawaczesc_png);
		type.set ("img/lokalizacje/las/rowprawaczesc.png", AssetType.IMAGE);
		
		className.set ("img/lokalizacje/las/rowprawakoncowka.png", __ASSET__img_lokalizacje_las_rowprawakoncowka_png);
		type.set ("img/lokalizacje/las/rowprawakoncowka.png", AssetType.IMAGE);
		
		className.set ("img/lokalizacje/las/sciezka.png", __ASSET__img_lokalizacje_las_sciezka_png);
		type.set ("img/lokalizacje/las/sciezka.png", AssetType.IMAGE);
		
		className.set ("img/lokalizacje/las/sciezka_dolna_czesc.png", __ASSET__img_lokalizacje_las_sciezka_dolna_czesc_png);
		type.set ("img/lokalizacje/las/sciezka_dolna_czesc.png", AssetType.IMAGE);
		
		className.set ("img/lokalizacje/las/sciezka_gorna czesc.png", __ASSET__img_lokalizacje_las_sciezka_gorna_czesc_png);
		type.set ("img/lokalizacje/las/sciezka_gorna czesc.png", AssetType.IMAGE);
		
		className.set ("img/lokalizacje/las/trawa.png", __ASSET__img_lokalizacje_las_trawa_png);
		type.set ("img/lokalizacje/las/trawa.png", AssetType.IMAGE);
		
		className.set ("img/lokalizacje/las/trawa_kamienie.png", __ASSET__img_lokalizacje_las_trawa_kamienie_png);
		type.set ("img/lokalizacje/las/trawa_kamienie.png", AssetType.IMAGE);
		
		className.set ("img/lokalizacje/las/trawa_kwiatki.png", __ASSET__img_lokalizacje_las_trawa_kwiatki_png);
		type.set ("img/lokalizacje/las/trawa_kwiatki.png", AssetType.IMAGE);
		
		
		if (useManifest) {
			
			loadManifest ();
			
			if (Sys.args ().indexOf ("-livereload") > -1) {
				
				var path = FileSystem.fullPath ("manifest");
				lastModified = FileSystem.stat (path).mtime.getTime ();
				
				timer = new Timer (2000);
				timer.run = function () {
					
					var modified = FileSystem.stat (path).mtime.getTime ();
					
					if (modified > lastModified) {
						
						lastModified = modified;
						loadManifest ();
						
						onChange.dispatch ();
						
					}
					
				}
				
			}
			
		}
		
		#else
		
		loadManifest ();
		
		#end
		#end
		
	}
	
	
	public override function exists (id:String, type:String):Bool {
		
		var requestedType = type != null ? cast (type, AssetType) : null;
		var assetType = this.type.get (id);
		
		if (assetType != null) {
			
			if (assetType == requestedType || ((requestedType == SOUND || requestedType == MUSIC) && (assetType == MUSIC || assetType == SOUND))) {
				
				return true;
				
			}
			
			#if flash
			
			if (requestedType == BINARY && (assetType == BINARY || assetType == TEXT || assetType == IMAGE)) {
				
				return true;
				
			} else if (requestedType == TEXT && assetType == BINARY) {
				
				return true;
				
			} else if (requestedType == null || path.exists (id)) {
				
				return true;
				
			}
			
			#else
			
			if (requestedType == BINARY || requestedType == null || (assetType == BINARY && requestedType == TEXT)) {
				
				return true;
				
			}
			
			#end
			
		}
		
		return false;
		
	}
	
	
	public override function getAudioBuffer (id:String):AudioBuffer {
		
		#if flash
		
		var buffer = new AudioBuffer ();
		buffer.src = cast (Type.createInstance (className.get (id), []), Sound);
		return buffer;
		
		#elseif html5
		
		return null;
		//return new Sound (new URLRequest (path.get (id)));
		
		#else
		
		if (className.exists(id)) return AudioBuffer.fromBytes (cast (Type.createInstance (className.get (id), []), Bytes));
		else return AudioBuffer.fromFile (path.get (id));
		
		#end
		
	}
	
	
	public override function getBytes (id:String):Bytes {
		
		#if flash
		
		switch (type.get (id)) {
			
			case TEXT, BINARY:
				
				return Bytes.ofData (cast (Type.createInstance (className.get (id), []), flash.utils.ByteArray));
			
			case IMAGE:
				
				var bitmapData = cast (Type.createInstance (className.get (id), []), BitmapData);
				return Bytes.ofData (bitmapData.getPixels (bitmapData.rect));
			
			default:
				
				return null;
			
		}
		
		return cast (Type.createInstance (className.get (id), []), Bytes);
		
		#elseif html5
		
		var loader = Preloader.loaders.get (path.get (id));
		
		if (loader == null) {
			
			return null;
			
		}
		
		var bytes = loader.bytes;
		
		if (bytes != null) {
			
			return bytes;
			
		} else {
			
			return null;
		}
		
		#else
		
		if (className.exists(id)) return cast (Type.createInstance (className.get (id), []), Bytes);
		else return Bytes.readFile (path.get (id));
		
		#end
		
	}
	
	
	public override function getFont (id:String):Font {
		
		#if flash
		
		var src = Type.createInstance (className.get (id), []);
		
		var font = new Font (src.fontName);
		font.src = src;
		return font;
		
		#elseif html5
		
		return cast (Type.createInstance (className.get (id), []), Font);
		
		#else
		
		if (className.exists (id)) {
			
			var fontClass = className.get (id);
			return cast (Type.createInstance (fontClass, []), Font);
			
		} else {
			
			return Font.fromFile (path.get (id));
			
		}
		
		#end
		
	}
	
	
	public override function getImage (id:String):Image {
		
		#if flash
		
		return Image.fromBitmapData (cast (Type.createInstance (className.get (id), []), BitmapData));
		
		#elseif html5
		
		return Image.fromImageElement (Preloader.images.get (path.get (id)));
		
		#else
		
		if (className.exists (id)) {
			
			var fontClass = className.get (id);
			return cast (Type.createInstance (fontClass, []), Image);
			
		} else {
			
			return Image.fromFile (path.get (id));
			
		}
		
		#end
		
	}
	
	
	/*public override function getMusic (id:String):Dynamic {
		
		#if flash
		
		return cast (Type.createInstance (className.get (id), []), Sound);
		
		#elseif openfl_html5
		
		//var sound = new Sound ();
		//sound.__buffer = true;
		//sound.load (new URLRequest (path.get (id)));
		//return sound;
		return null;
		
		#elseif html5
		
		return null;
		//return new Sound (new URLRequest (path.get (id)));
		
		#else
		
		return null;
		//if (className.exists(id)) return cast (Type.createInstance (className.get (id), []), Sound);
		//else return new Sound (new URLRequest (path.get (id)), null, true);
		
		#end
		
	}*/
	
	
	public override function getPath (id:String):String {
		
		//#if ios
		
		//return SystemPath.applicationDirectory + "/assets/" + path.get (id);
		
		//#else
		
		return path.get (id);
		
		//#end
		
	}
	
	
	public override function getText (id:String):String {
		
		#if html5
		
		var loader = Preloader.loaders.get (path.get (id));
		
		if (loader == null) {
			
			return null;
			
		}
		
		var bytes = loader.bytes;
		
		if (bytes != null) {
			
			return bytes.getString (0, bytes.length);
			
		} else {
			
			return null;
		}
		
		#else
		
		var bytes = getBytes (id);
		
		if (bytes == null) {
			
			return null;
			
		} else {
			
			return bytes.getString (0, bytes.length);
			
		}
		
		#end
		
	}
	
	
	public override function isLocal (id:String, type:String):Bool {
		
		var requestedType = type != null ? cast (type, AssetType) : null;
		
		#if flash
		
		//if (requestedType != AssetType.MUSIC && requestedType != AssetType.SOUND) {
			
			return className.exists (id);
			
		//}
		
		#end
		
		return true;
		
	}
	
	
	public override function list (type:String):Array<String> {
		
		var requestedType = type != null ? cast (type, AssetType) : null;
		var items = [];
		
		for (id in this.type.keys ()) {
			
			if (requestedType == null || exists (id, type)) {
				
				items.push (id);
				
			}
			
		}
		
		return items;
		
	}
	
	
	public override function loadAudioBuffer (id:String):Future<AudioBuffer> {
		
		var promise = new Promise<AudioBuffer> ();
		
		#if (flash)
		
		if (path.exists (id)) {
			
			var soundLoader = new Sound ();
			soundLoader.addEventListener (Event.COMPLETE, function (event) {
				
				var audioBuffer:AudioBuffer = new AudioBuffer();
				audioBuffer.src = event.currentTarget;
				promise.complete (audioBuffer);
				
			});
			soundLoader.addEventListener (ProgressEvent.PROGRESS, function (event) {
				
				if (event.bytesTotal == 0) {
					
					promise.progress (0);
					
				} else {
					
					promise.progress (event.bytesLoaded / event.bytesTotal);
					
				}
				
			});
			soundLoader.addEventListener (IOErrorEvent.IO_ERROR, promise.error);
			soundLoader.load (new URLRequest (path.get (id)));
			
		} else {
			
			promise.complete (getAudioBuffer (id));
			
		}
		
		#else
		
		promise.completeWith (new Future<AudioBuffer> (function () return getAudioBuffer (id)));
		
		#end
		
		return promise.future;
		
	}
	
	
	public override function loadBytes (id:String):Future<Bytes> {
		
		var promise = new Promise<Bytes> ();
		
		#if flash
		
		if (path.exists (id)) {
			
			var loader = new URLLoader ();
			loader.dataFormat = flash.net.URLLoaderDataFormat.BINARY;
			loader.addEventListener (Event.COMPLETE, function (event:Event) {
				
				var bytes = Bytes.ofData (event.currentTarget.data);
				promise.complete (bytes);
				
			});
			loader.addEventListener (ProgressEvent.PROGRESS, function (event) {
				
				if (event.bytesTotal == 0) {
					
					promise.progress (0);
					
				} else {
					
					promise.progress (event.bytesLoaded / event.bytesTotal);
					
				}
				
			});
			loader.addEventListener (IOErrorEvent.IO_ERROR, promise.error);
			loader.load (new URLRequest (path.get (id)));
			
		} else {
			
			promise.complete (getBytes (id));
			
		}
		
		#elseif html5
		
		if (path.exists (id)) {
			
			var request = new HTTPRequest ();
			promise.completeWith (request.load (path.get (id) + "?" + Assets.cache.version));
			
		} else {
			
			promise.complete (getBytes (id));
			
		}
		
		#else
		
		promise.completeWith (new Future<Bytes> (function () return getBytes (id)));
		
		#end
		
		return promise.future;
		
	}
	
	
	public override function loadImage (id:String):Future<Image> {
		
		var promise = new Promise<Image> ();
		
		#if flash
		
		if (path.exists (id)) {
			
			var loader = new Loader ();
			loader.contentLoaderInfo.addEventListener (Event.COMPLETE, function (event:Event) {
				
				var bitmapData = cast (event.currentTarget.content, Bitmap).bitmapData;
				promise.complete (Image.fromBitmapData (bitmapData));
				
			});
			loader.contentLoaderInfo.addEventListener (ProgressEvent.PROGRESS, function (event) {
				
				if (event.bytesTotal == 0) {
					
					promise.progress (0);
					
				} else {
					
					promise.progress (event.bytesLoaded / event.bytesTotal);
					
				}
				
			});
			loader.contentLoaderInfo.addEventListener (IOErrorEvent.IO_ERROR, promise.error);
			loader.load (new URLRequest (path.get (id)));
			
		} else {
			
			promise.complete (getImage (id));
			
		}
		
		#elseif html5
		
		if (path.exists (id)) {
			
			var image = new js.html.Image ();
			image.onload = function (_):Void {
				
				promise.complete (Image.fromImageElement (image));
				
			}
			image.onerror = promise.error;
			image.src = path.get (id) + "?" + Assets.cache.version;
			
		} else {
			
			promise.complete (getImage (id));
			
		}
		
		#else
		
		promise.completeWith (new Future<Image> (function () return getImage (id)));
		
		#end
		
		return promise.future;
		
	}
	
	
	#if (!flash && !html5)
	private function loadManifest ():Void {
		
		try {
			
			#if blackberry
			var bytes = Bytes.readFile ("app/native/manifest");
			#elseif tizen
			var bytes = Bytes.readFile ("../res/manifest");
			#elseif emscripten
			var bytes = Bytes.readFile ("assets/manifest");
			#elseif (mac && java)
			var bytes = Bytes.readFile ("../Resources/manifest");
			#elseif (ios || tvos)
			var bytes = Bytes.readFile ("assets/manifest");
			#else
			var bytes = Bytes.readFile ("manifest");
			#end
			
			if (bytes != null) {
				
				if (bytes.length > 0) {
					
					var data = bytes.getString (0, bytes.length);
					
					if (data != null && data.length > 0) {
						
						var manifest:Array<Dynamic> = Unserializer.run (data);
						
						for (asset in manifest) {
							
							if (!className.exists (asset.id)) {
								
								#if (ios || tvos)
								path.set (asset.id, "assets/" + asset.path);
								#else
								path.set (asset.id, asset.path);
								#end
								type.set (asset.id, cast (asset.type, AssetType));
								
							}
							
						}
						
					}
					
				}
				
			} else {
				
				trace ("Warning: Could not load asset manifest (bytes was null)");
				
			}
		
		} catch (e:Dynamic) {
			
			trace ('Warning: Could not load asset manifest (${e})');
			
		}
		
	}
	#end
	
	
	public override function loadText (id:String):Future<String> {
		
		var promise = new Promise<String> ();
		
		#if html5
		
		if (path.exists (id)) {
			
			var request = new HTTPRequest ();
			var future = request.load (path.get (id) + "?" + Assets.cache.version);
			future.onProgress (function (progress) promise.progress (progress));
			future.onError (function (msg) promise.error (msg));
			future.onComplete (function (bytes) promise.complete (bytes.getString (0, bytes.length)));
			
		} else {
			
			promise.complete (getText (id));
			
		}
		
		#else
		
		promise.completeWith (loadBytes (id).then (function (bytes) {
			
			return new Future<String> (function () {
				
				if (bytes == null) {
					
					return null;
					
				} else {
					
					return bytes.getString (0, bytes.length);
					
				}
				
			});
			
		}));
		
		#end
		
		return promise.future;
		
	}
	
	
}


#if !display
#if flash

@:keep @:bind #if display private #end class __ASSET__img_lokalizacje_las_drzewo_png extends flash.display.BitmapData { public function new () { super (0, 0, true, 0); } }
@:keep @:bind #if display private #end class __ASSET__img_lokalizacje_las_grzyby_png extends flash.display.BitmapData { public function new () { super (0, 0, true, 0); } }
@:keep @:bind #if display private #end class __ASSET__img_lokalizacje_las_korona_drzewa_png extends flash.display.BitmapData { public function new () { super (0, 0, true, 0); } }
@:keep @:bind #if display private #end class __ASSET__img_lokalizacje_las_rowagoraprawe_png extends flash.display.BitmapData { public function new () { super (0, 0, true, 0); } }
@:keep @:bind #if display private #end class __ASSET__img_lokalizacje_las_rowcentrum_png extends flash.display.BitmapData { public function new () { super (0, 0, true, 0); } }
@:keep @:bind #if display private #end class __ASSET__img_lokalizacje_las_rowdol_png extends flash.display.BitmapData { public function new () { super (0, 0, true, 0); } }
@:keep @:bind #if display private #end class __ASSET__img_lokalizacje_las_rowdollewa_png extends flash.display.BitmapData { public function new () { super (0, 0, true, 0); } }
@:keep @:bind #if display private #end class __ASSET__img_lokalizacje_las_rowdolprawe_png extends flash.display.BitmapData { public function new () { super (0, 0, true, 0); } }
@:keep @:bind #if display private #end class __ASSET__img_lokalizacje_las_rowgora_png extends flash.display.BitmapData { public function new () { super (0, 0, true, 0); } }
@:keep @:bind #if display private #end class __ASSET__img_lokalizacje_las_rowgoralewa_png extends flash.display.BitmapData { public function new () { super (0, 0, true, 0); } }
@:keep @:bind #if display private #end class __ASSET__img_lokalizacje_las_rowlewaczesc_png extends flash.display.BitmapData { public function new () { super (0, 0, true, 0); } }
@:keep @:bind #if display private #end class __ASSET__img_lokalizacje_las_rowlewakoncowka_png extends flash.display.BitmapData { public function new () { super (0, 0, true, 0); } }
@:keep @:bind #if display private #end class __ASSET__img_lokalizacje_las_rowprawaczesc_png extends flash.display.BitmapData { public function new () { super (0, 0, true, 0); } }
@:keep @:bind #if display private #end class __ASSET__img_lokalizacje_las_rowprawakoncowka_png extends flash.display.BitmapData { public function new () { super (0, 0, true, 0); } }
@:keep @:bind #if display private #end class __ASSET__img_lokalizacje_las_sciezka_png extends flash.display.BitmapData { public function new () { super (0, 0, true, 0); } }
@:keep @:bind #if display private #end class __ASSET__img_lokalizacje_las_sciezka_dolna_czesc_png extends flash.display.BitmapData { public function new () { super (0, 0, true, 0); } }
@:keep @:bind #if display private #end class __ASSET__img_lokalizacje_las_sciezka_gorna_czesc_png extends flash.display.BitmapData { public function new () { super (0, 0, true, 0); } }
@:keep @:bind #if display private #end class __ASSET__img_lokalizacje_las_trawa_png extends flash.display.BitmapData { public function new () { super (0, 0, true, 0); } }
@:keep @:bind #if display private #end class __ASSET__img_lokalizacje_las_trawa_kamienie_png extends flash.display.BitmapData { public function new () { super (0, 0, true, 0); } }
@:keep @:bind #if display private #end class __ASSET__img_lokalizacje_las_trawa_kwiatki_png extends flash.display.BitmapData { public function new () { super (0, 0, true, 0); } }


#elseif html5























#else



#if (windows || mac || linux || cpp)


@:image("assets/img/lokalizacje/las/drzewo.png") #if display private #end class __ASSET__img_lokalizacje_las_drzewo_png extends lime.graphics.Image {}
@:image("assets/img/lokalizacje/las/grzyby.png") #if display private #end class __ASSET__img_lokalizacje_las_grzyby_png extends lime.graphics.Image {}
@:image("assets/img/lokalizacje/las/korona_drzewa.png") #if display private #end class __ASSET__img_lokalizacje_las_korona_drzewa_png extends lime.graphics.Image {}
@:image("assets/img/lokalizacje/las/rowagoraprawe.png") #if display private #end class __ASSET__img_lokalizacje_las_rowagoraprawe_png extends lime.graphics.Image {}
@:image("assets/img/lokalizacje/las/rowcentrum.png") #if display private #end class __ASSET__img_lokalizacje_las_rowcentrum_png extends lime.graphics.Image {}
@:image("assets/img/lokalizacje/las/rowdol.png") #if display private #end class __ASSET__img_lokalizacje_las_rowdol_png extends lime.graphics.Image {}
@:image("assets/img/lokalizacje/las/rowdollewa.png") #if display private #end class __ASSET__img_lokalizacje_las_rowdollewa_png extends lime.graphics.Image {}
@:image("assets/img/lokalizacje/las/rowdolprawe.png") #if display private #end class __ASSET__img_lokalizacje_las_rowdolprawe_png extends lime.graphics.Image {}
@:image("assets/img/lokalizacje/las/rowgora.png") #if display private #end class __ASSET__img_lokalizacje_las_rowgora_png extends lime.graphics.Image {}
@:image("assets/img/lokalizacje/las/rowgoralewa.png") #if display private #end class __ASSET__img_lokalizacje_las_rowgoralewa_png extends lime.graphics.Image {}
@:image("assets/img/lokalizacje/las/rowlewaczesc.png") #if display private #end class __ASSET__img_lokalizacje_las_rowlewaczesc_png extends lime.graphics.Image {}
@:image("assets/img/lokalizacje/las/rowlewakoncowka.png") #if display private #end class __ASSET__img_lokalizacje_las_rowlewakoncowka_png extends lime.graphics.Image {}
@:image("assets/img/lokalizacje/las/rowprawaczesc.png") #if display private #end class __ASSET__img_lokalizacje_las_rowprawaczesc_png extends lime.graphics.Image {}
@:image("assets/img/lokalizacje/las/rowprawakoncowka.png") #if display private #end class __ASSET__img_lokalizacje_las_rowprawakoncowka_png extends lime.graphics.Image {}
@:image("assets/img/lokalizacje/las/sciezka.png") #if display private #end class __ASSET__img_lokalizacje_las_sciezka_png extends lime.graphics.Image {}
@:image("assets/img/lokalizacje/las/sciezka_dolna_czesc.png") #if display private #end class __ASSET__img_lokalizacje_las_sciezka_dolna_czesc_png extends lime.graphics.Image {}
@:image("assets/img/lokalizacje/las/sciezka_gorna czesc.png") #if display private #end class __ASSET__img_lokalizacje_las_sciezka_gorna_czesc_png extends lime.graphics.Image {}
@:image("assets/img/lokalizacje/las/trawa.png") #if display private #end class __ASSET__img_lokalizacje_las_trawa_png extends lime.graphics.Image {}
@:image("assets/img/lokalizacje/las/trawa_kamienie.png") #if display private #end class __ASSET__img_lokalizacje_las_trawa_kamienie_png extends lime.graphics.Image {}
@:image("assets/img/lokalizacje/las/trawa_kwiatki.png") #if display private #end class __ASSET__img_lokalizacje_las_trawa_kwiatki_png extends lime.graphics.Image {}



#end
#end

#if (openfl && !flash)

#end

#end