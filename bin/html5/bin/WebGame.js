(function (console, $hx_exports, $global) { "use strict";
$hx_exports.openfl = $hx_exports.openfl || {};
$hx_exports.lime = $hx_exports.lime || {};
var $hxClasses = {},$estr = function() { return js_Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var ApplicationMain = function() { };
$hxClasses["ApplicationMain"] = ApplicationMain;
ApplicationMain.__name__ = true;
ApplicationMain.config = null;
ApplicationMain.preloader = null;
ApplicationMain.create = function() {
	var app = new openfl_display_Application();
	app.create(ApplicationMain.config);
	var display = new NMEPreloader();
	ApplicationMain.preloader = new openfl_display_Preloader(display);
	app.setPreloader(ApplicationMain.preloader);
	ApplicationMain.preloader.onComplete.add(ApplicationMain.init);
	ApplicationMain.preloader.create(ApplicationMain.config);
	var urls = [];
	var types = [];
	urls.push("img/background/grass.png");
	types.push("IMAGE");
	urls.push("img/background/road.png");
	types.push("IMAGE");
	urls.push("img/background/tlo.png");
	types.push("IMAGE");
	urls.push("img/characters/player.png");
	types.push("IMAGE");
	urls.push("levels/1");
	types.push("TEXT");
	urls.push("levels/Menu");
	types.push("TEXT");
	if(ApplicationMain.config.assetsPrefix != null) {
		var _g1 = 0;
		var _g = urls.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(types[i] != "FONT") urls[i] = ApplicationMain.config.assetsPrefix + urls[i];
		}
	}
	ApplicationMain.preloader.load(urls,types);
	var result = app.exec();
};
ApplicationMain.init = function() {
	var loaded = 0;
	var total = 0;
	var library_onLoad = function(__) {
		loaded++;
		if(loaded == total) ApplicationMain.start();
	};
	ApplicationMain.preloader = null;
	if(total == 0) ApplicationMain.start();
};
ApplicationMain.main = function() {
	ApplicationMain.config = { build : "1", company : "TTGTeam", file : "WebGame", fps : 60, name : "WebGame", orientation : "", packageName : "ttg.game.WebGame", version : "1.0.0", windows : [{ antialiasing : 0, background : 0, borderless : false, depthBuffer : false, display : 0, fullscreen : false, hardware : false, height : 600, parameters : "{}", resizable : true, stencilBuffer : true, title : "WebGame", vsync : false, width : 800, x : null, y : null}]};
};
ApplicationMain.start = function() {
	var hasMain = false;
	var entryPoint = Type.resolveClass("ttg.game.Main");
	var _g = 0;
	var _g1 = Type.getClassFields(entryPoint);
	while(_g < _g1.length) {
		var methodName = _g1[_g];
		++_g;
		if(methodName == "main") {
			hasMain = true;
			break;
		}
	}
	lime_Assets.initialize();
	if(hasMain) Reflect.callMethod(entryPoint,Reflect.field(entryPoint,"main"),[]); else {
		var instance = Type.createInstance(DocumentClass,[]);
	}
	if(openfl_Lib.current.stage.window.__fullscreen) openfl_Lib.current.stage.dispatchEvent(new openfl_events_FullScreenEvent("fullScreen",false,false,true,true));
	openfl_Lib.current.stage.dispatchEvent(new openfl_events_Event("resize",false,false));
};
var openfl_events_IEventDispatcher = function() { };
$hxClasses["openfl.events.IEventDispatcher"] = openfl_events_IEventDispatcher;
openfl_events_IEventDispatcher.__name__ = true;
var openfl_events_EventDispatcher = function(target) {
	if(target != null) this.__targetDispatcher = target;
};
$hxClasses["openfl.events.EventDispatcher"] = openfl_events_EventDispatcher;
openfl_events_EventDispatcher.__name__ = true;
openfl_events_EventDispatcher.__interfaces__ = [openfl_events_IEventDispatcher];
openfl_events_EventDispatcher.__sortByPriority = function(l1,l2) {
	if(l1.priority == l2.priority) return 0; else if(l1.priority > l2.priority) return -1; else return 1;
};
openfl_events_EventDispatcher.prototype = {
	addEventListener: function(type,listener,useCapture,priority,useWeakReference) {
		if(useWeakReference == null) useWeakReference = false;
		if(priority == null) priority = 0;
		if(useCapture == null) useCapture = false;
		if(this.__eventMap == null) {
			this.__dispatching = new haxe_ds_StringMap();
			this.__eventMap = new haxe_ds_StringMap();
			this.__newEventMap = new haxe_ds_StringMap();
		}
		if(!this.__eventMap.exists(type)) {
			var list = [];
			list.push(new openfl_events__$EventDispatcher_Listener(listener,useCapture,priority));
			this.__eventMap.set(type,list);
		} else {
			var list1;
			if(this.__dispatching.get(type) == true) {
				if(!this.__newEventMap.exists(type)) {
					var _this = this.__eventMap.get(type);
					list1 = _this.slice();
					this.__newEventMap.set(type,list1);
				} else list1 = this.__newEventMap.get(type);
			} else list1 = this.__eventMap.get(type);
			var _g1 = 0;
			var _g = list1.length;
			while(_g1 < _g) {
				var i = _g1++;
				if(Reflect.compareMethods(list1[i].callback,listener)) return;
			}
			list1.push(new openfl_events__$EventDispatcher_Listener(listener,useCapture,priority));
			list1.sort(openfl_events_EventDispatcher.__sortByPriority);
		}
	}
	,dispatchEvent: function(event) {
		if(this.__targetDispatcher != null) event.target = this.__targetDispatcher; else event.target = this;
		return this.__dispatchEvent(event);
	}
	,hasEventListener: function(type) {
		if(this.__eventMap == null) return false;
		if(this.__dispatching.get(type) == true && this.__newEventMap.exists(type)) return this.__newEventMap.get(type).length > 0; else return this.__eventMap.exists(type);
	}
	,removeEventListener: function(type,listener,useCapture) {
		if(useCapture == null) useCapture = false;
		if(this.__eventMap == null) return;
		var list = this.__eventMap.get(type);
		if(list == null) return;
		var dispatching = this.__dispatching.get(type) == true;
		if(dispatching) {
			if(!this.__newEventMap.exists(type)) {
				var _this = this.__eventMap.get(type);
				list = _this.slice();
				this.__newEventMap.set(type,list);
			} else list = this.__newEventMap.get(type);
		}
		var _g1 = 0;
		var _g = list.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(list[i].match(listener,useCapture)) {
				list.splice(i,1);
				break;
			}
		}
		if(!dispatching) {
			if(list.length == 0) this.__eventMap.remove(type);
			if(!this.__eventMap.iterator().hasNext()) {
				this.__eventMap = null;
				this.__newEventMap = null;
			}
		}
	}
	,__dispatchEvent: function(event) {
		if(this.__eventMap == null || event == null) return false;
		var type = event.type;
		var list;
		if(this.__dispatching.get(type) == true) {
			list = this.__newEventMap.get(type);
			if(list == null) return false;
			list = list.slice();
		} else {
			list = this.__eventMap.get(type);
			if(list == null) return false;
			this.__dispatching.set(type,true);
		}
		if(event.target == null) {
			if(this.__targetDispatcher != null) event.target = this.__targetDispatcher; else event.target = this;
		}
		event.currentTarget = this;
		var capture = event.eventPhase == 1;
		var index = 0;
		var listener;
		while(index < list.length) {
			listener = list[index];
			if(listener.useCapture == capture) {
				listener.callback(event);
				if(event.__isCanceledNow) break;
			}
			if(listener == list[index]) index++;
		}
		if(this.__newEventMap != null && this.__newEventMap.exists(type)) {
			var list1 = this.__newEventMap.get(type);
			if(list1.length > 0) this.__eventMap.set(type,list1); else this.__eventMap.remove(type);
			if(!this.__eventMap.iterator().hasNext()) {
				this.__eventMap = null;
				this.__newEventMap = null;
			} else this.__newEventMap.remove(type);
		}
		this.__dispatching.set(event.type,false);
		return true;
	}
	,__class__: openfl_events_EventDispatcher
};
var openfl_display_IBitmapDrawable = function() { };
$hxClasses["openfl.display.IBitmapDrawable"] = openfl_display_IBitmapDrawable;
openfl_display_IBitmapDrawable.__name__ = true;
var openfl_display_DisplayObject = function() {
	this.__cacheAsBitmap = false;
	this.__maskCached = false;
	openfl_events_EventDispatcher.call(this);
	this.__alpha = 1;
	this.__transform = new openfl_geom_Matrix();
	this.__visible = true;
	this.__rotation = 0;
	this.__rotationSine = 0;
	this.__rotationCosine = 1;
	this.__renderTransform = new openfl_geom_Matrix();
	this.__offset = new openfl_geom_Point();
	this.__worldOffset = new openfl_geom_Point();
	this.__worldAlpha = 1;
	this.__worldTransform = new openfl_geom_Matrix();
	this.__worldColorTransform = new openfl_geom_ColorTransform();
	this.set_name("instance" + ++openfl_display_DisplayObject.__instanceCount);
};
$hxClasses["openfl.display.DisplayObject"] = openfl_display_DisplayObject;
openfl_display_DisplayObject.__name__ = true;
openfl_display_DisplayObject.__interfaces__ = [openfl_display_IBitmapDrawable];
openfl_display_DisplayObject.__super__ = openfl_events_EventDispatcher;
openfl_display_DisplayObject.prototype = $extend(openfl_events_EventDispatcher.prototype,{
	globalToLocal: function(pos) {
		pos = pos.clone();
		this.__getWorldTransform().__transformInversePoint(pos);
		return pos;
	}
	,__broadcast: function(event,notifyChilden) {
		if(this.__eventMap != null && this.hasEventListener(event.type)) {
			var result = openfl_events_EventDispatcher.prototype.__dispatchEvent.call(this,event);
			if(event.__isCanceled) return true;
			return result;
		}
		return false;
	}
	,__dispatchEvent: function(event) {
		var result = openfl_events_EventDispatcher.prototype.__dispatchEvent.call(this,event);
		if(event.__isCanceled) return true;
		if(event.bubbles && this.parent != null && this.parent != this) {
			event.eventPhase = 3;
			if(event.target == null) event.target = this;
			this.parent.__dispatchEvent(event);
		}
		return result;
	}
	,__enterFrame: function(deltaTime) {
	}
	,__getBounds: function(rect,matrix) {
		if(this.__graphics != null) this.__graphics.__getBounds(rect,matrix);
	}
	,__getCursor: function() {
		return null;
	}
	,__getInteractive: function(stack) {
		return false;
	}
	,__getRenderBounds: function(rect,matrix) {
		if(this.__scrollRect == null) this.__getBounds(rect,matrix); else {
			var r = openfl_geom_Rectangle.__temp;
			r.copyFrom(this.__scrollRect);
			r.__transform(r,matrix);
			rect.__expand(matrix.tx,matrix.ty,r.width,r.height);
		}
	}
	,__getWorldTransform: function() {
		if(this.__transformDirty || openfl_display_DisplayObject.__worldTransformDirty > 0) {
			var list = [];
			var current = this;
			var transformDirty = this.__transformDirty;
			if(this.parent == null) {
				if(transformDirty) this.__update(true,false);
			} else while(current.parent != null) {
				list.push(current);
				current = current.parent;
				if(current.__transformDirty) transformDirty = true;
			}
			if(transformDirty) {
				var i = list.length;
				while(--i >= 0) list[i].__update(true,false);
			}
		}
		return this.__worldTransform;
	}
	,__hitTest: function(x,y,shapeFlag,stack,interactiveOnly,hitObject) {
		if(this.__graphics != null) {
			if(!hitObject.get_visible() || this.__isMask) return false;
			if(this.get_mask() != null && !this.get_mask().__hitTestMask(x,y)) return false;
			if(this.__graphics.__hitTest(x,y,shapeFlag,this.__getWorldTransform())) {
				if(stack != null && !interactiveOnly) stack.push(hitObject);
				return true;
			}
		}
		return false;
	}
	,__hitTestMask: function(x,y) {
		if(this.__graphics != null) {
			if(this.__graphics.__hitTest(x,y,true,this.__getWorldTransform())) return true;
		}
		return false;
	}
	,__renderCairo: function(renderSession) {
		if(this.__graphics != null) openfl__$internal_renderer_cairo_CairoShape.render(this,renderSession);
	}
	,__renderCairoMask: function(renderSession) {
		if(this.__graphics != null) openfl__$internal_renderer_cairo_CairoGraphics.renderMask(this.__graphics,renderSession);
	}
	,__renderCanvas: function(renderSession) {
		if(this.__graphics != null) openfl__$internal_renderer_canvas_CanvasShape.render(this,renderSession);
	}
	,__renderCanvasMask: function(renderSession) {
		if(this.__graphics != null) openfl__$internal_renderer_canvas_CanvasGraphics.renderMask(this.__graphics,renderSession);
	}
	,__setStageReference: function(stage) {
		if(this.stage != stage) {
			if(this.stage != null) {
				if(this.stage.get_focus() == this) this.stage.set_focus(null);
				this.dispatchEvent(new openfl_events_Event("removedFromStage",false,false));
			}
			this.stage = stage;
			if(stage != null) this.dispatchEvent(new openfl_events_Event("addedToStage",false,false));
		}
	}
	,__setRenderDirty: function() {
		if(!this.__renderDirty) {
			this.__updateCachedBitmap = true;
			this.__updateFilters = this.get_filters() != null && this.get_filters().length > 0;
			this.__renderDirty = true;
			openfl_display_DisplayObject.__worldRenderDirty++;
		}
	}
	,__update: function(transformOnly,updateChildren,maskGraphics) {
		this.__renderable = this.get_visible() && this.get_scaleX() != 0 && this.get_scaleY() != 0 && !this.__isMask;
		this.__updateTransforms();
		if(this.parent != null && this.__isMask) this.__maskCached = false;
		if(updateChildren && this.__transformDirty) {
			this.__transformDirty = false;
			openfl_display_DisplayObject.__worldTransformDirty--;
		}
		if(!transformOnly && this.__mask != null && !this.__mask.__maskCached) {
			if(this.__maskGraphics == null) this.__maskGraphics = new openfl_display_Graphics();
			this.__maskGraphics.clear();
			this.__mask.__update(true,true,this.__maskGraphics);
			this.__mask.__maskCached = true;
		}
		if(maskGraphics != null) this.__updateMask(maskGraphics);
		if(!transformOnly && this.__cacheAsBitmap) {
			if(this.__updateCachedBitmap || this.__updateFilters) {
				if(this.__cachedBitmapBounds == null) this.__cachedBitmapBounds = new openfl_geom_Rectangle();
				if(this.cacheAsBitmapBounds != null) this.__cachedBitmapBounds.copyFrom(this.cacheAsBitmapBounds); else {
					this.__cachedBitmapBounds.setEmpty();
					this.__getRenderBounds(this.__cachedBitmapBounds,openfl_geom_Matrix.__identity);
				}
				if(this.__filters != null) {
					if(this.__cachedFilterBounds == null) this.__cachedFilterBounds = new openfl_geom_Rectangle();
					this.__cachedFilterBounds.setEmpty();
					openfl_filters_BitmapFilter.__expandBounds(this.__filters,this.__cachedFilterBounds,openfl_geom_Matrix.__identity);
					this.__cachedBitmapBounds.x += this.__cachedFilterBounds.x;
					this.__cachedBitmapBounds.y += this.__cachedFilterBounds.y;
				}
			}
		}
		if(!transformOnly) {
			if(!this.__worldColorTransform.__equals(this.get_transform().get_colorTransform())) this.__worldColorTransform = this.get_transform().get_colorTransform().__clone();
			if(this.parent != null) {
				this.__worldAlpha = this.get_alpha() * this.parent.__worldAlpha;
				this.__worldColorTransform.__combine(this.parent.__worldColorTransform);
				if(this.blendMode == null || this.blendMode == 10) this.__blendMode = this.parent.__blendMode;
				if(this.shader == null) this.__shader = this.parent.__shader;
			} else this.__worldAlpha = this.get_alpha();
			if(updateChildren && this.__renderDirty) this.__renderDirty = false;
		}
	}
	,__updateChildren: function(transformOnly) {
		this.__renderable = this.get_visible() && this.get_scaleX() != 0 && this.get_scaleY() != 0 && !this.__isMask;
		if(!this.__renderable && !this.__isMask) return;
		this.__worldAlpha = this.get_alpha();
		if(this.__transformDirty) {
			this.__transformDirty = false;
			openfl_display_DisplayObject.__worldTransformDirty--;
		}
	}
	,__updateMask: function(maskGraphics) {
		if(this.__graphics != null) {
			maskGraphics.__commands.overrideMatrix(this.__worldTransform);
			maskGraphics.__commands.append(this.__graphics.__commands);
			maskGraphics.set___dirty(true);
			maskGraphics.__visible = true;
			if(maskGraphics.__bounds == null) maskGraphics.__bounds = new openfl_geom_Rectangle();
			this.__graphics.__getBounds(maskGraphics.__bounds,openfl_geom_Matrix.__identity);
		}
	}
	,__updateTransforms: function(overrideTransform) {
		var overrided = overrideTransform != null;
		var local;
		if(overrided) local = overrideTransform.clone(); else local = this.__transform;
		if(this.__worldTransform == null) this.__worldTransform = new openfl_geom_Matrix();
		if(!overrided && this.parent != null) {
			var parentTransform = this.parent.__worldTransform;
			this.__worldTransform.a = local.a * parentTransform.a + local.b * parentTransform.c;
			this.__worldTransform.b = local.a * parentTransform.b + local.b * parentTransform.d;
			this.__worldTransform.c = local.c * parentTransform.a + local.d * parentTransform.c;
			this.__worldTransform.d = local.c * parentTransform.b + local.d * parentTransform.d;
			this.__worldTransform.tx = local.tx * parentTransform.a + local.ty * parentTransform.c + parentTransform.tx;
			this.__worldTransform.ty = local.tx * parentTransform.b + local.ty * parentTransform.d + parentTransform.ty;
			this.__worldOffset.copyFrom(this.parent.__worldOffset);
		} else {
			this.__worldTransform.copyFrom(local);
			this.__worldOffset.setTo(0,0);
		}
		if(this.__scrollRect != null) {
			this.__offset = this.__worldTransform.deltaTransformPoint(this.__scrollRect.get_topLeft());
			this.__worldOffset.offset(this.__offset.x,this.__offset.y);
		} else this.__offset.setTo(0,0);
		this.__renderTransform.copyFrom(this.__worldTransform);
		this.__renderTransform.translate(-this.__worldOffset.x,-this.__worldOffset.y);
	}
	,get_alpha: function() {
		return this.__alpha;
	}
	,get_filters: function() {
		if(this.__filters == null) return []; else return this.__filters.slice();
	}
	,get_mask: function() {
		return this.__mask;
	}
	,get_mouseX: function() {
		var mouseX;
		if(this.stage != null) mouseX = this.stage.__mouseX; else mouseX = openfl_Lib.current.stage.__mouseX;
		var mouseY;
		if(this.stage != null) mouseY = this.stage.__mouseY; else mouseY = openfl_Lib.current.stage.__mouseY;
		return this.__getWorldTransform().__transformInverseX(mouseX,mouseY);
	}
	,get_mouseY: function() {
		var mouseX;
		if(this.stage != null) mouseX = this.stage.__mouseX; else mouseX = openfl_Lib.current.stage.__mouseX;
		var mouseY;
		if(this.stage != null) mouseY = this.stage.__mouseY; else mouseY = openfl_Lib.current.stage.__mouseY;
		return this.__getWorldTransform().__transformInverseY(mouseX,mouseY);
	}
	,set_name: function(value) {
		return this.__name = value;
	}
	,get_scaleX: function() {
		if(this.__transform.b == 0) return this.__transform.a; else return Math.sqrt(this.__transform.a * this.__transform.a + this.__transform.b * this.__transform.b);
	}
	,set_scaleX: function(value) {
		if(this.__transform.c == 0) {
			if(value != this.__transform.a) {
				if(!this.__transformDirty) {
					this.__transformDirty = true;
					openfl_display_DisplayObject.__worldTransformDirty++;
				}
			}
			this.__transform.a = value;
		} else {
			var a = this.__rotationCosine * value;
			var b = this.__rotationSine * value;
			if(this.__transform.a != a || this.__transform.b != b) {
				if(!this.__transformDirty) {
					this.__transformDirty = true;
					openfl_display_DisplayObject.__worldTransformDirty++;
				}
			}
			this.__transform.a = a;
			this.__transform.b = b;
		}
		return value;
	}
	,get_scaleY: function() {
		if(this.__transform.c == 0) return this.__transform.d; else return Math.sqrt(this.__transform.c * this.__transform.c + this.__transform.d * this.__transform.d);
	}
	,set_scaleY: function(value) {
		if(this.__transform.c == 0) {
			if(value != this.__transform.d) {
				if(!this.__transformDirty) {
					this.__transformDirty = true;
					openfl_display_DisplayObject.__worldTransformDirty++;
				}
			}
			this.__transform.d = value;
		} else {
			var c = -this.__rotationSine * value;
			var d = this.__rotationCosine * value;
			if(this.__transform.d != d || this.__transform.c != c) {
				if(!this.__transformDirty) {
					this.__transformDirty = true;
					openfl_display_DisplayObject.__worldTransformDirty++;
				}
			}
			this.__transform.c = c;
			this.__transform.d = d;
		}
		return value;
	}
	,get_scrollRect: function() {
		if(this.__scrollRect == null) return null;
		return this.__scrollRect.clone();
	}
	,get_transform: function() {
		if(this.__objectTransform == null) this.__objectTransform = new openfl_geom_Transform(this);
		return this.__objectTransform;
	}
	,get_visible: function() {
		return this.__visible;
	}
	,get_x: function() {
		return this.__transform.tx;
	}
	,set_x: function(value) {
		if(value != this.__transform.tx) {
			if(!this.__transformDirty) {
				this.__transformDirty = true;
				openfl_display_DisplayObject.__worldTransformDirty++;
			}
		}
		return this.__transform.tx = value;
	}
	,get_y: function() {
		return this.__transform.ty;
	}
	,set_y: function(value) {
		if(value != this.__transform.ty) {
			if(!this.__transformDirty) {
				this.__transformDirty = true;
				openfl_display_DisplayObject.__worldTransformDirty++;
			}
		}
		return this.__transform.ty = value;
	}
	,__class__: openfl_display_DisplayObject
});
var openfl_display_InteractiveObject = function() {
	openfl_display_DisplayObject.call(this);
	this.doubleClickEnabled = false;
	this.mouseEnabled = true;
	this.needsSoftKeyboard = false;
	this.__tabEnabled = false;
	this.tabIndex = -1;
};
$hxClasses["openfl.display.InteractiveObject"] = openfl_display_InteractiveObject;
openfl_display_InteractiveObject.__name__ = true;
openfl_display_InteractiveObject.__super__ = openfl_display_DisplayObject;
openfl_display_InteractiveObject.prototype = $extend(openfl_display_DisplayObject.prototype,{
	__getInteractive: function(stack) {
		if(stack != null) {
			stack.push(this);
			if(this.parent != null) this.parent.__getInteractive(stack);
		}
		return true;
	}
	,__hitTest: function(x,y,shapeFlag,stack,interactiveOnly,hitObject) {
		if(!hitObject.get_visible() || this.__isMask || interactiveOnly && !this.mouseEnabled) return false;
		return openfl_display_DisplayObject.prototype.__hitTest.call(this,x,y,shapeFlag,stack,interactiveOnly,hitObject);
	}
	,get_tabEnabled: function() {
		return this.__tabEnabled;
	}
	,__class__: openfl_display_InteractiveObject
});
var openfl_display_DisplayObjectContainer = function() {
	openfl_display_InteractiveObject.call(this);
	this.mouseChildren = true;
	this.__children = [];
	this.__removedChildren = [];
};
$hxClasses["openfl.display.DisplayObjectContainer"] = openfl_display_DisplayObjectContainer;
openfl_display_DisplayObjectContainer.__name__ = true;
openfl_display_DisplayObjectContainer.__super__ = openfl_display_InteractiveObject;
openfl_display_DisplayObjectContainer.prototype = $extend(openfl_display_InteractiveObject.prototype,{
	addChild: function(child) {
		if(child != null) {
			if(child.parent != null) child.parent.removeChild(child);
			this.__children.push(child);
			child.parent = this;
			if(this.stage != null) child.__setStageReference(this.stage);
			if(!child.__transformDirty) {
				child.__transformDirty = true;
				openfl_display_DisplayObject.__worldTransformDirty++;
			}
			if(!child.__renderDirty) {
				child.__updateCachedBitmap = true;
				child.__updateFilters = child.get_filters() != null && child.get_filters().length > 0;
				child.__renderDirty = true;
				openfl_display_DisplayObject.__worldRenderDirty++;
			}
			if(!this.__renderDirty) {
				this.__updateCachedBitmap = true;
				this.__updateFilters = this.get_filters() != null && this.get_filters().length > 0;
				this.__renderDirty = true;
				openfl_display_DisplayObject.__worldRenderDirty++;
			}
			var event = new openfl_events_Event("added",true);
			event.target = child;
			child.__dispatchEvent(event);
		}
		return child;
	}
	,removeChild: function(child) {
		if(child != null && child.parent == this) {
			child.__dispatchEvent(new openfl_events_Event("removed",true));
			if(this.stage != null) child.__setStageReference(null);
			child.parent = null;
			HxOverrides.remove(this.__children,child);
			this.__removedChildren.push(child);
			if(!child.__transformDirty) {
				child.__transformDirty = true;
				openfl_display_DisplayObject.__worldTransformDirty++;
			}
			if(!child.__renderDirty) {
				child.__updateCachedBitmap = true;
				child.__updateFilters = child.get_filters() != null && child.get_filters().length > 0;
				child.__renderDirty = true;
				openfl_display_DisplayObject.__worldRenderDirty++;
			}
			if(!this.__renderDirty) {
				this.__updateCachedBitmap = true;
				this.__updateFilters = this.get_filters() != null && this.get_filters().length > 0;
				this.__renderDirty = true;
				openfl_display_DisplayObject.__worldRenderDirty++;
			}
		}
		return child;
	}
	,__broadcast: function(event,notifyChilden) {
		if(event.target == null) event.target = this;
		var result = openfl_display_InteractiveObject.prototype.__broadcast.call(this,event,notifyChilden);
		if(!event.__isCanceled && notifyChilden) {
			var _g = 0;
			var _g1 = this.__children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				child.__broadcast(event,true);
				if(event.__isCanceled) return true;
			}
		}
		return result;
	}
	,__enterFrame: function(deltaTime) {
		var _g = 0;
		var _g1 = this.__children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			child.__enterFrame(deltaTime);
		}
	}
	,__getBounds: function(rect,matrix) {
		openfl_display_InteractiveObject.prototype.__getBounds.call(this,rect,matrix);
		if(this.__children.length == 0) return;
		if(matrix != null) {
			this.__updateTransforms(matrix);
			this.__updateChildren(true);
		}
		var _g = 0;
		var _g1 = this.__children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child.get_scaleX() == 0 || child.get_scaleY() == 0) continue;
			child.__getBounds(rect,child.__worldTransform);
		}
		if(matrix != null) {
			this.__updateTransforms();
			this.__updateChildren(true);
		}
	}
	,__getRenderBounds: function(rect,matrix) {
		if(this.__scrollRect != null) {
			openfl_display_InteractiveObject.prototype.__getRenderBounds.call(this,rect,matrix);
			return;
		} else openfl_display_InteractiveObject.prototype.__getBounds.call(this,rect,matrix);
		if(this.__children.length == 0) return;
		if(matrix != null) {
			this.__updateTransforms(matrix);
			this.__updateChildren(true);
		}
		var _g = 0;
		var _g1 = this.__children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child.get_scaleX() == 0 || child.get_scaleY() == 0 || child.__isMask) continue;
			child.__getRenderBounds(rect,child.__worldTransform);
		}
		if(matrix != null) {
			this.__updateTransforms();
			this.__updateChildren(true);
		}
	}
	,__hitTest: function(x,y,shapeFlag,stack,interactiveOnly,hitObject) {
		if(!hitObject.get_visible() || this.__isMask || interactiveOnly && !this.mouseEnabled && !this.mouseChildren) return false;
		if(this.get_mask() != null && !this.get_mask().__hitTestMask(x,y)) return false;
		if(this.get_scrollRect() != null && !this.get_scrollRect().containsPoint(this.globalToLocal(new openfl_geom_Point(x,y)))) return false;
		var i = this.__children.length;
		if(interactiveOnly) {
			if(stack == null || !this.mouseChildren) {
				while(--i >= 0) if(this.__children[i].__hitTest(x,y,shapeFlag,null,true,this.__children[i])) {
					if(stack != null) stack.push(hitObject);
					return true;
				}
			} else if(stack != null) {
				var length = stack.length;
				var interactive = false;
				var hitTest = false;
				while(--i >= 0) {
					interactive = this.__children[i].__getInteractive(null);
					if(interactive || this.mouseEnabled && !hitTest) {
						if(this.__children[i].__hitTest(x,y,shapeFlag,stack,true,this.__children[i])) {
							hitTest = true;
							if(interactive) break;
						}
					}
				}
				if(hitTest) {
					stack.splice(length,0,hitObject);
					return true;
				}
			}
		} else while(--i >= 0) this.__children[i].__hitTest(x,y,shapeFlag,stack,false,this.__children[i]);
		return false;
	}
	,__hitTestMask: function(x,y) {
		var i = this.__children.length;
		while(--i >= 0) if(this.__children[i].__hitTestMask(x,y)) return true;
		return false;
	}
	,__renderCairo: function(renderSession) {
		if(!this.__renderable || this.__worldAlpha <= 0) return;
		openfl_display_InteractiveObject.prototype.__renderCairo.call(this,renderSession);
		if(this.get_scrollRect() != null) renderSession.maskManager.pushRect(this.get_scrollRect(),this.__worldTransform);
		if(this.__mask != null) renderSession.maskManager.pushMask(this.__mask);
		var _g = 0;
		var _g1 = this.__children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			child.__renderCairo(renderSession);
		}
		if(this.__removedChildren.length > 0) this.__removedChildren.splice(0,this.__removedChildren.length);
		if(this.__mask != null) renderSession.maskManager.popMask();
		if(this.get_scrollRect() != null) renderSession.maskManager.popRect();
	}
	,__renderCairoMask: function(renderSession) {
		if(this.__graphics != null) openfl__$internal_renderer_cairo_CairoGraphics.renderMask(this.__graphics,renderSession);
		var _g = 0;
		var _g1 = this.__children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			child.__renderCairoMask(renderSession);
		}
	}
	,__renderCanvas: function(renderSession) {
		if(!this.__renderable || this.__worldAlpha <= 0) return;
		openfl_display_InteractiveObject.prototype.__renderCanvas.call(this,renderSession);
		if(this.get_scrollRect() != null) renderSession.maskManager.pushRect(this.get_scrollRect(),this.__worldTransform);
		if(this.__mask != null) renderSession.maskManager.pushMask(this.__mask);
		var _g = 0;
		var _g1 = this.__children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			child.__renderCanvas(renderSession);
		}
		if(this.__removedChildren.length > 0) this.__removedChildren.splice(0,this.__removedChildren.length);
		if(this.__mask != null) renderSession.maskManager.popMask();
		if(this.get_scrollRect() != null) renderSession.maskManager.popRect();
	}
	,__renderCanvasMask: function(renderSession) {
		if(this.__graphics != null) openfl__$internal_renderer_canvas_CanvasGraphics.renderMask(this.__graphics,renderSession);
		var bounds = new openfl_geom_Rectangle();
		this.__getBounds(bounds,this.__transform);
		renderSession.context.rect(0,0,bounds.width,bounds.height);
	}
	,__setStageReference: function(stage) {
		if(this.stage != stage) {
			if(this.stage != null) this.__dispatchEvent(new openfl_events_Event("removedFromStage",false,false));
			this.stage = stage;
			if(stage != null) this.__dispatchEvent(new openfl_events_Event("addedToStage",false,false));
			if(this.__children != null) {
				var _g = 0;
				var _g1 = this.__children;
				while(_g < _g1.length) {
					var child = _g1[_g];
					++_g;
					child.__setStageReference(stage);
				}
			}
		}
	}
	,__update: function(transformOnly,updateChildren,maskGraphics) {
		openfl_display_InteractiveObject.prototype.__update.call(this,transformOnly,updateChildren,maskGraphics);
		if(!this.__renderable && !this.__isMask) return;
		if(updateChildren) {
			var _g = 0;
			var _g1 = this.__children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				child.__update(transformOnly,true,maskGraphics);
			}
		}
	}
	,__updateChildren: function(transformOnly) {
		openfl_display_InteractiveObject.prototype.__updateChildren.call(this,transformOnly);
		var _g = 0;
		var _g1 = this.__children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			child.__update(transformOnly,true);
		}
	}
	,__class__: openfl_display_DisplayObjectContainer
});
var openfl_display_Sprite = function() {
	openfl_display_DisplayObjectContainer.call(this);
	this.buttonMode = false;
	this.useHandCursor = true;
	this.loaderInfo = openfl_display_LoaderInfo.create(null);
};
$hxClasses["openfl.display.Sprite"] = openfl_display_Sprite;
openfl_display_Sprite.__name__ = true;
openfl_display_Sprite.__super__ = openfl_display_DisplayObjectContainer;
openfl_display_Sprite.prototype = $extend(openfl_display_DisplayObjectContainer.prototype,{
	__getCursor: function() {
		if(this.buttonMode && this.useHandCursor) return lime_ui_MouseCursor.POINTER; else return null;
	}
	,__hitTest: function(x,y,shapeFlag,stack,interactiveOnly,hitObject) {
		if(this.hitArea != null) {
			if(!this.hitArea.mouseEnabled) {
				this.hitArea.mouseEnabled = true;
				var hitTest = this.hitArea.__hitTest(x,y,shapeFlag,null,true,hitObject);
				this.hitArea.mouseEnabled = false;
				if(hitTest) stack[stack.length] = hitObject;
				return hitTest;
			}
		} else {
			if(!hitObject.get_visible() || this.__isMask || interactiveOnly && !this.mouseEnabled && !this.mouseChildren) return false;
			if(this.get_mask() != null && !this.get_mask().__hitTestMask(x,y)) return false;
			if(openfl_display_DisplayObjectContainer.prototype.__hitTest.call(this,x,y,shapeFlag,stack,interactiveOnly,hitObject)) return interactiveOnly; else if((!interactiveOnly || this.mouseEnabled) && this.__graphics != null && this.__graphics.__hitTest(x,y,shapeFlag,this.__getWorldTransform())) {
				if(stack != null) stack.push(hitObject);
				return true;
			}
		}
		return false;
	}
	,__hitTestMask: function(x,y) {
		if(openfl_display_DisplayObjectContainer.prototype.__hitTestMask.call(this,x,y)) return true; else if(this.__graphics != null && this.__graphics.__hitTest(x,y,true,this.__getWorldTransform())) return true;
		return false;
	}
	,get_graphics: function() {
		if(this.__graphics == null) {
			this.__graphics = new openfl_display_Graphics();
			this.__graphics.__owner = this;
		}
		return this.__graphics;
	}
	,get_tabEnabled: function() {
		return this.__tabEnabled || this.buttonMode;
	}
	,__class__: openfl_display_Sprite
});
var ttg_game_Main = function() {
	openfl_display_Sprite.call(this);
	this.addEventListener("addedToStage",$bind(this,this.onAdded));
};
$hxClasses["ttg.game.Main"] = ttg_game_Main;
ttg_game_Main.__name__ = true;
ttg_game_Main.__super__ = openfl_display_Sprite;
ttg_game_Main.prototype = $extend(openfl_display_Sprite.prototype,{
	enterFrame: function(e) {
		this.game.update();
	}
	,init: function() {
		this.stage.addEventListener("keyDown",ttg_game_input_Input.keyDown);
		this.stage.addEventListener("keyUp",ttg_game_input_Input.keyUp);
		this.game = new ttg_game_Game(this);
		this.game.init();
		this.stage.addEventListener("enterFrame",$bind(this,this.enterFrame));
	}
	,onAdded: function(e) {
		this.init();
	}
	,__class__: ttg_game_Main
});
var DocumentClass = function() {
	openfl_Lib.current.addChild(this);
	ttg_game_Main.call(this);
	this.dispatchEvent(new openfl_events_Event("addedToStage",false,false));
};
$hxClasses["DocumentClass"] = DocumentClass;
DocumentClass.__name__ = true;
DocumentClass.__super__ = ttg_game_Main;
DocumentClass.prototype = $extend(ttg_game_Main.prototype,{
	__class__: DocumentClass
});
var lime_AssetLibrary = function() {
	this.onChange = new lime_app_Event_$Void_$Void();
};
$hxClasses["lime.AssetLibrary"] = lime_AssetLibrary;
lime_AssetLibrary.__name__ = true;
lime_AssetLibrary.prototype = {
	exists: function(id,type) {
		return false;
	}
	,getBytes: function(id) {
		return null;
	}
	,getImage: function(id) {
		return null;
	}
	,getText: function(id) {
		var bytes = this.getBytes(id);
		if(bytes == null) return null; else return bytes.getString(0,bytes.length);
	}
	,isLocal: function(id,type) {
		return true;
	}
	,unload: function() {
	}
	,__class__: lime_AssetLibrary
};
var DefaultAssetLibrary = function() {
	this.type = new haxe_ds_StringMap();
	this.path = new haxe_ds_StringMap();
	lime_AssetLibrary.call(this);
	var id;
	id = "img/background/grass.png";
	this.path.set(id,id);
	this.type.set(id,"IMAGE");
	id = "img/background/road.png";
	this.path.set(id,id);
	this.type.set(id,"IMAGE");
	id = "img/background/tlo.png";
	this.path.set(id,id);
	this.type.set(id,"IMAGE");
	id = "img/characters/player.png";
	this.path.set(id,id);
	this.type.set(id,"IMAGE");
	id = "levels/1";
	this.path.set(id,id);
	this.type.set(id,"TEXT");
	id = "levels/Menu";
	this.path.set(id,id);
	this.type.set(id,"TEXT");
	var assetsPrefix = null;
	if(ApplicationMain.config != null && Object.prototype.hasOwnProperty.call(ApplicationMain.config,"assetsPrefix")) assetsPrefix = ApplicationMain.config.assetsPrefix;
	if(assetsPrefix != null) {
		var $it0 = this.path.keys();
		while( $it0.hasNext() ) {
			var k = $it0.next();
			var value = assetsPrefix + this.path.get(k);
			this.path.set(k,value);
		}
	}
};
$hxClasses["DefaultAssetLibrary"] = DefaultAssetLibrary;
DefaultAssetLibrary.__name__ = true;
DefaultAssetLibrary.__super__ = lime_AssetLibrary;
DefaultAssetLibrary.prototype = $extend(lime_AssetLibrary.prototype,{
	exists: function(id,type) {
		var requestedType;
		if(type != null) requestedType = js_Boot.__cast(type , String); else requestedType = null;
		var assetType = this.type.get(id);
		if(assetType != null) {
			if(assetType == requestedType || (requestedType == "SOUND" || requestedType == "MUSIC") && (assetType == "MUSIC" || assetType == "SOUND")) return true;
			if(requestedType == "BINARY" || requestedType == null || assetType == "BINARY" && requestedType == "TEXT") return true;
		}
		return false;
	}
	,getBytes: function(id) {
		var loader;
		var key = this.path.get(id);
		loader = lime_app_Preloader.loaders.get(key);
		if(loader == null) return null;
		var bytes = loader.bytes;
		if(bytes != null) return bytes; else return null;
	}
	,getImage: function(id) {
		return lime_graphics_Image.fromImageElement((function($this) {
			var $r;
			var key = $this.path.get(id);
			$r = lime_app_Preloader.images.get(key);
			return $r;
		}(this)));
	}
	,getText: function(id) {
		var loader;
		var key = this.path.get(id);
		loader = lime_app_Preloader.loaders.get(key);
		if(loader == null) return null;
		var bytes = loader.bytes;
		if(bytes != null) return bytes.getString(0,bytes.length); else return null;
	}
	,isLocal: function(id,type) {
		var requestedType;
		if(type != null) requestedType = js_Boot.__cast(type , String); else requestedType = null;
		return true;
	}
	,__class__: DefaultAssetLibrary
});
var EReg = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
$hxClasses["EReg"] = EReg;
EReg.__name__ = true;
EReg.prototype = {
	match: function(s) {
		if(this.r.global) this.r.lastIndex = 0;
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,__class__: EReg
};
var HxOverrides = function() { };
$hxClasses["HxOverrides"] = HxOverrides;
HxOverrides.__name__ = true;
HxOverrides.strDate = function(s) {
	var _g = s.length;
	switch(_g) {
	case 8:
		var k = s.split(":");
		var d = new Date();
		d.setTime(0);
		d.setUTCHours(k[0]);
		d.setUTCMinutes(k[1]);
		d.setUTCSeconds(k[2]);
		return d;
	case 10:
		var k1 = s.split("-");
		return new Date(k1[0],k1[1] - 1,k1[2],0,0,0);
	case 19:
		var k2 = s.split(" ");
		var y = k2[0].split("-");
		var t = k2[1].split(":");
		return new Date(y[0],y[1] - 1,y[2],t[0],t[1],t[2]);
	default:
		throw new js__$Boot_HaxeError("Invalid date format : " + s);
	}
};
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
};
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
};
HxOverrides.indexOf = function(a,obj,i) {
	var len = a.length;
	if(i < 0) {
		i += len;
		if(i < 0) i = 0;
	}
	while(i < len) {
		if(a[i] === obj) return i;
		i++;
	}
	return -1;
};
HxOverrides.remove = function(a,obj) {
	var i = HxOverrides.indexOf(a,obj,0);
	if(i == -1) return false;
	a.splice(i,1);
	return true;
};
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
var List = function() {
	this.length = 0;
};
$hxClasses["List"] = List;
List.__name__ = true;
List.prototype = {
	add: function(item) {
		var x = [item];
		if(this.h == null) this.h = x; else this.q[1] = x;
		this.q = x;
		this.length++;
	}
	,pop: function() {
		if(this.h == null) return null;
		var x = this.h[0];
		this.h = this.h[1];
		if(this.h == null) this.q = null;
		this.length--;
		return x;
	}
	,__class__: List
};
Math.__name__ = true;
var NMEPreloader = function() {
	openfl_display_Sprite.call(this);
	var backgroundColor = this.getBackgroundColor();
	var r = backgroundColor >> 16 & 255;
	var g = backgroundColor >> 8 & 255;
	var b = backgroundColor & 255;
	var perceivedLuminosity = 0.299 * r + 0.587 * g + 0.114 * b;
	var color = 0;
	if(perceivedLuminosity < 70) color = 16777215;
	var x = 30;
	var height = 7;
	var y = this.getHeight() / 2 - height / 2;
	var width = this.getWidth() - x * 2;
	var padding = 2;
	this.outline = new openfl_display_Sprite();
	this.outline.get_graphics().beginFill(color,0.07);
	this.outline.get_graphics().drawRect(0,0,width,height);
	this.outline.set_x(x);
	this.outline.set_y(y);
	this.addChild(this.outline);
	this.progress = new openfl_display_Sprite();
	this.progress.get_graphics().beginFill(color,0.35);
	this.progress.get_graphics().drawRect(0,0,width - padding * 2,height - padding * 2);
	this.progress.set_x(x + padding);
	this.progress.set_y(y + padding);
	this.progress.set_scaleX(0);
	this.addChild(this.progress);
};
$hxClasses["NMEPreloader"] = NMEPreloader;
NMEPreloader.__name__ = true;
NMEPreloader.__super__ = openfl_display_Sprite;
NMEPreloader.prototype = $extend(openfl_display_Sprite.prototype,{
	getBackgroundColor: function() {
		return 0;
	}
	,getHeight: function() {
		var height = 600;
		if(height > 0) return height; else return openfl_Lib.current.stage.stageHeight;
	}
	,getWidth: function() {
		var width = 800;
		if(width > 0) return width; else return openfl_Lib.current.stage.stageWidth;
	}
	,onInit: function() {
	}
	,onLoaded: function() {
		this.dispatchEvent(new openfl_events_Event("complete"));
	}
	,onUpdate: function(bytesLoaded,bytesTotal) {
		var percentLoaded = bytesLoaded / bytesTotal;
		if(percentLoaded > 1) percentLoaded = 1;
		this.progress.set_scaleX(percentLoaded);
	}
	,__class__: NMEPreloader
});
var Reflect = function() { };
$hxClasses["Reflect"] = Reflect;
Reflect.__name__ = true;
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( e ) {
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		return null;
	}
};
Reflect.callMethod = function(o,func,args) {
	return func.apply(o,args);
};
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) a.push(f);
		}
	}
	return a;
};
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && !(f.__name__ || f.__ename__);
};
Reflect.compareMethods = function(f1,f2) {
	if(f1 == f2) return true;
	if(!Reflect.isFunction(f1) || !Reflect.isFunction(f2)) return false;
	return f1.scope == f2.scope && f1.method == f2.method && f1.method != null;
};
var Std = function() { };
$hxClasses["Std"] = Std;
Std.__name__ = true;
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
Std["int"] = function(x) {
	return x | 0;
};
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
};
Std.parseFloat = function(x) {
	return parseFloat(x);
};
var StringTools = function() { };
$hxClasses["StringTools"] = StringTools;
StringTools.__name__ = true;
StringTools.startsWith = function(s,start) {
	return s.length >= start.length && HxOverrides.substr(s,0,start.length) == start;
};
StringTools.isSpace = function(s,pos) {
	var c = HxOverrides.cca(s,pos);
	return c > 8 && c < 14 || c == 32;
};
StringTools.ltrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,r)) r++;
	if(r > 0) return HxOverrides.substr(s,r,l - r); else return s;
};
StringTools.rtrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,l - r - 1)) r++;
	if(r > 0) return HxOverrides.substr(s,0,l - r); else return s;
};
StringTools.trim = function(s) {
	return StringTools.ltrim(StringTools.rtrim(s));
};
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
};
StringTools.hex = function(n,digits) {
	var s = "";
	var hexChars = "0123456789ABCDEF";
	do {
		s = hexChars.charAt(n & 15) + s;
		n >>>= 4;
	} while(n > 0);
	if(digits != null) while(s.length < digits) s = "0" + s;
	return s;
};
StringTools.fastCodeAt = function(s,index) {
	return s.charCodeAt(index);
};
var Type = function() { };
$hxClasses["Type"] = Type;
Type.__name__ = true;
Type.resolveClass = function(name) {
	var cl = $hxClasses[name];
	if(cl == null || !cl.__name__) return null;
	return cl;
};
Type.resolveEnum = function(name) {
	var e = $hxClasses[name];
	if(e == null || !e.__ename__) return null;
	return e;
};
Type.createInstance = function(cl,args) {
	var _g = args.length;
	switch(_g) {
	case 0:
		return new cl();
	case 1:
		return new cl(args[0]);
	case 2:
		return new cl(args[0],args[1]);
	case 3:
		return new cl(args[0],args[1],args[2]);
	case 4:
		return new cl(args[0],args[1],args[2],args[3]);
	case 5:
		return new cl(args[0],args[1],args[2],args[3],args[4]);
	case 6:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5]);
	case 7:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6]);
	case 8:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7]);
	default:
		throw new js__$Boot_HaxeError("Too many arguments");
	}
	return null;
};
Type.createEmptyInstance = function(cl) {
	function empty() {}; empty.prototype = cl.prototype;
	return new empty();
};
Type.createEnum = function(e,constr,params) {
	var f = Reflect.field(e,constr);
	if(f == null) throw new js__$Boot_HaxeError("No such constructor " + constr);
	if(Reflect.isFunction(f)) {
		if(params == null) throw new js__$Boot_HaxeError("Constructor " + constr + " need parameters");
		return Reflect.callMethod(e,f,params);
	}
	if(params != null && params.length != 0) throw new js__$Boot_HaxeError("Constructor " + constr + " does not need parameters");
	return f;
};
Type.getClassFields = function(c) {
	var a = Reflect.fields(c);
	HxOverrides.remove(a,"__name__");
	HxOverrides.remove(a,"__interfaces__");
	HxOverrides.remove(a,"__properties__");
	HxOverrides.remove(a,"__super__");
	HxOverrides.remove(a,"__meta__");
	HxOverrides.remove(a,"prototype");
	return a;
};
Type.getEnumConstructs = function(e) {
	var a = e.__constructs__;
	return a.slice();
};
var haxe_IMap = function() { };
$hxClasses["haxe.IMap"] = haxe_IMap;
haxe_IMap.__name__ = true;
var haxe__$Int64__$_$_$Int64 = function(high,low) {
	this.high = high;
	this.low = low;
};
$hxClasses["haxe._Int64.___Int64"] = haxe__$Int64__$_$_$Int64;
haxe__$Int64__$_$_$Int64.__name__ = true;
haxe__$Int64__$_$_$Int64.prototype = {
	__class__: haxe__$Int64__$_$_$Int64
};
var haxe_Timer = function(time_ms) {
	var me = this;
	this.id = setInterval(function() {
		me.run();
	},time_ms);
};
$hxClasses["haxe.Timer"] = haxe_Timer;
haxe_Timer.__name__ = true;
haxe_Timer.delay = function(f,time_ms) {
	var t = new haxe_Timer(time_ms);
	t.run = function() {
		t.stop();
		f();
	};
	return t;
};
haxe_Timer.stamp = function() {
	return new Date().getTime() / 1000;
};
haxe_Timer.prototype = {
	stop: function() {
		if(this.id == null) return;
		clearInterval(this.id);
		this.id = null;
	}
	,run: function() {
	}
	,__class__: haxe_Timer
};
var haxe_Unserializer = function(buf) {
	this.buf = buf;
	this.length = buf.length;
	this.pos = 0;
	this.scache = [];
	this.cache = [];
	var r = haxe_Unserializer.DEFAULT_RESOLVER;
	if(r == null) {
		r = Type;
		haxe_Unserializer.DEFAULT_RESOLVER = r;
	}
	this.setResolver(r);
};
$hxClasses["haxe.Unserializer"] = haxe_Unserializer;
haxe_Unserializer.__name__ = true;
haxe_Unserializer.initCodes = function() {
	var codes = [];
	var _g1 = 0;
	var _g = haxe_Unserializer.BASE64.length;
	while(_g1 < _g) {
		var i = _g1++;
		codes[haxe_Unserializer.BASE64.charCodeAt(i)] = i;
	}
	return codes;
};
haxe_Unserializer.prototype = {
	setResolver: function(r) {
		if(r == null) this.resolver = { resolveClass : function(_) {
			return null;
		}, resolveEnum : function(_1) {
			return null;
		}}; else this.resolver = r;
	}
	,get: function(p) {
		return this.buf.charCodeAt(p);
	}
	,readDigits: function() {
		var k = 0;
		var s = false;
		var fpos = this.pos;
		while(true) {
			var c = this.buf.charCodeAt(this.pos);
			if(c != c) break;
			if(c == 45) {
				if(this.pos != fpos) break;
				s = true;
				this.pos++;
				continue;
			}
			if(c < 48 || c > 57) break;
			k = k * 10 + (c - 48);
			this.pos++;
		}
		if(s) k *= -1;
		return k;
	}
	,readFloat: function() {
		var p1 = this.pos;
		while(true) {
			var c = this.buf.charCodeAt(this.pos);
			if(c >= 43 && c < 58 || c == 101 || c == 69) this.pos++; else break;
		}
		return Std.parseFloat(HxOverrides.substr(this.buf,p1,this.pos - p1));
	}
	,unserializeObject: function(o) {
		while(true) {
			if(this.pos >= this.length) throw new js__$Boot_HaxeError("Invalid object");
			if(this.buf.charCodeAt(this.pos) == 103) break;
			var k = this.unserialize();
			if(!(typeof(k) == "string")) throw new js__$Boot_HaxeError("Invalid object key");
			var v = this.unserialize();
			o[k] = v;
		}
		this.pos++;
	}
	,unserializeEnum: function(edecl,tag) {
		if(this.get(this.pos++) != 58) throw new js__$Boot_HaxeError("Invalid enum format");
		var nargs = this.readDigits();
		if(nargs == 0) return Type.createEnum(edecl,tag);
		var args = [];
		while(nargs-- > 0) args.push(this.unserialize());
		return Type.createEnum(edecl,tag,args);
	}
	,unserialize: function() {
		var _g = this.get(this.pos++);
		switch(_g) {
		case 110:
			return null;
		case 116:
			return true;
		case 102:
			return false;
		case 122:
			return 0;
		case 105:
			return this.readDigits();
		case 100:
			return this.readFloat();
		case 121:
			var len = this.readDigits();
			if(this.get(this.pos++) != 58 || this.length - this.pos < len) throw new js__$Boot_HaxeError("Invalid string length");
			var s = HxOverrides.substr(this.buf,this.pos,len);
			this.pos += len;
			s = decodeURIComponent(s.split("+").join(" "));
			this.scache.push(s);
			return s;
		case 107:
			return NaN;
		case 109:
			return -Infinity;
		case 112:
			return Infinity;
		case 97:
			var buf = this.buf;
			var a = [];
			this.cache.push(a);
			while(true) {
				var c = this.buf.charCodeAt(this.pos);
				if(c == 104) {
					this.pos++;
					break;
				}
				if(c == 117) {
					this.pos++;
					var n = this.readDigits();
					a[a.length + n - 1] = null;
				} else a.push(this.unserialize());
			}
			return a;
		case 111:
			var o = { };
			this.cache.push(o);
			this.unserializeObject(o);
			return o;
		case 114:
			var n1 = this.readDigits();
			if(n1 < 0 || n1 >= this.cache.length) throw new js__$Boot_HaxeError("Invalid reference");
			return this.cache[n1];
		case 82:
			var n2 = this.readDigits();
			if(n2 < 0 || n2 >= this.scache.length) throw new js__$Boot_HaxeError("Invalid string reference");
			return this.scache[n2];
		case 120:
			throw new js__$Boot_HaxeError(this.unserialize());
			break;
		case 99:
			var name = this.unserialize();
			var cl = this.resolver.resolveClass(name);
			if(cl == null) throw new js__$Boot_HaxeError("Class not found " + name);
			var o1 = Type.createEmptyInstance(cl);
			this.cache.push(o1);
			this.unserializeObject(o1);
			return o1;
		case 119:
			var name1 = this.unserialize();
			var edecl = this.resolver.resolveEnum(name1);
			if(edecl == null) throw new js__$Boot_HaxeError("Enum not found " + name1);
			var e = this.unserializeEnum(edecl,this.unserialize());
			this.cache.push(e);
			return e;
		case 106:
			var name2 = this.unserialize();
			var edecl1 = this.resolver.resolveEnum(name2);
			if(edecl1 == null) throw new js__$Boot_HaxeError("Enum not found " + name2);
			this.pos++;
			var index = this.readDigits();
			var tag = Type.getEnumConstructs(edecl1)[index];
			if(tag == null) throw new js__$Boot_HaxeError("Unknown enum index " + name2 + "@" + index);
			var e1 = this.unserializeEnum(edecl1,tag);
			this.cache.push(e1);
			return e1;
		case 108:
			var l = new List();
			this.cache.push(l);
			var buf1 = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) l.add(this.unserialize());
			this.pos++;
			return l;
		case 98:
			var h = new haxe_ds_StringMap();
			this.cache.push(h);
			var buf2 = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) {
				var s1 = this.unserialize();
				h.set(s1,this.unserialize());
			}
			this.pos++;
			return h;
		case 113:
			var h1 = new haxe_ds_IntMap();
			this.cache.push(h1);
			var buf3 = this.buf;
			var c1 = this.get(this.pos++);
			while(c1 == 58) {
				var i = this.readDigits();
				h1.set(i,this.unserialize());
				c1 = this.get(this.pos++);
			}
			if(c1 != 104) throw new js__$Boot_HaxeError("Invalid IntMap format");
			return h1;
		case 77:
			var h2 = new haxe_ds_ObjectMap();
			this.cache.push(h2);
			var buf4 = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) {
				var s2 = this.unserialize();
				h2.set(s2,this.unserialize());
			}
			this.pos++;
			return h2;
		case 118:
			var d;
			if(this.buf.charCodeAt(this.pos) >= 48 && this.buf.charCodeAt(this.pos) <= 57 && this.buf.charCodeAt(this.pos + 1) >= 48 && this.buf.charCodeAt(this.pos + 1) <= 57 && this.buf.charCodeAt(this.pos + 2) >= 48 && this.buf.charCodeAt(this.pos + 2) <= 57 && this.buf.charCodeAt(this.pos + 3) >= 48 && this.buf.charCodeAt(this.pos + 3) <= 57 && this.buf.charCodeAt(this.pos + 4) == 45) {
				var s3 = HxOverrides.substr(this.buf,this.pos,19);
				d = HxOverrides.strDate(s3);
				this.pos += 19;
			} else {
				var t = this.readFloat();
				var d1 = new Date();
				d1.setTime(t);
				d = d1;
			}
			this.cache.push(d);
			return d;
		case 115:
			var len1 = this.readDigits();
			var buf5 = this.buf;
			if(this.get(this.pos++) != 58 || this.length - this.pos < len1) throw new js__$Boot_HaxeError("Invalid bytes length");
			var codes = haxe_Unserializer.CODES;
			if(codes == null) {
				codes = haxe_Unserializer.initCodes();
				haxe_Unserializer.CODES = codes;
			}
			var i1 = this.pos;
			var rest = len1 & 3;
			var size;
			size = (len1 >> 2) * 3 + (rest >= 2?rest - 1:0);
			var max = i1 + (len1 - rest);
			var bytes = haxe_io_Bytes.alloc(size);
			var bpos = 0;
			while(i1 < max) {
				var c11 = codes[StringTools.fastCodeAt(buf5,i1++)];
				var c2 = codes[StringTools.fastCodeAt(buf5,i1++)];
				bytes.set(bpos++,c11 << 2 | c2 >> 4);
				var c3 = codes[StringTools.fastCodeAt(buf5,i1++)];
				bytes.set(bpos++,c2 << 4 | c3 >> 2);
				var c4 = codes[StringTools.fastCodeAt(buf5,i1++)];
				bytes.set(bpos++,c3 << 6 | c4);
			}
			if(rest >= 2) {
				var c12 = codes[StringTools.fastCodeAt(buf5,i1++)];
				var c21 = codes[StringTools.fastCodeAt(buf5,i1++)];
				bytes.set(bpos++,c12 << 2 | c21 >> 4);
				if(rest == 3) {
					var c31 = codes[StringTools.fastCodeAt(buf5,i1++)];
					bytes.set(bpos++,c21 << 4 | c31 >> 2);
				}
			}
			this.pos += len1;
			this.cache.push(bytes);
			return bytes;
		case 67:
			var name3 = this.unserialize();
			var cl1 = this.resolver.resolveClass(name3);
			if(cl1 == null) throw new js__$Boot_HaxeError("Class not found " + name3);
			var o2 = Type.createEmptyInstance(cl1);
			this.cache.push(o2);
			o2.hxUnserialize(this);
			if(this.get(this.pos++) != 103) throw new js__$Boot_HaxeError("Invalid custom data");
			return o2;
		case 65:
			var name4 = this.unserialize();
			var cl2 = this.resolver.resolveClass(name4);
			if(cl2 == null) throw new js__$Boot_HaxeError("Class not found " + name4);
			return cl2;
		case 66:
			var name5 = this.unserialize();
			var e2 = this.resolver.resolveEnum(name5);
			if(e2 == null) throw new js__$Boot_HaxeError("Enum not found " + name5);
			return e2;
		default:
		}
		this.pos--;
		throw new js__$Boot_HaxeError("Invalid char " + this.buf.charAt(this.pos) + " at position " + this.pos);
	}
	,__class__: haxe_Unserializer
};
var haxe_ds_IntMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.IntMap"] = haxe_ds_IntMap;
haxe_ds_IntMap.__name__ = true;
haxe_ds_IntMap.__interfaces__ = [haxe_IMap];
haxe_ds_IntMap.prototype = {
	set: function(key,value) {
		this.h[key] = value;
	}
	,remove: function(key) {
		if(!this.h.hasOwnProperty(key)) return false;
		delete(this.h[key]);
		return true;
	}
	,__class__: haxe_ds_IntMap
};
var haxe_ds_ObjectMap = function() {
	this.h = { };
	this.h.__keys__ = { };
};
$hxClasses["haxe.ds.ObjectMap"] = haxe_ds_ObjectMap;
haxe_ds_ObjectMap.__name__ = true;
haxe_ds_ObjectMap.__interfaces__ = [haxe_IMap];
haxe_ds_ObjectMap.prototype = {
	set: function(key,value) {
		var id = key.__id__ || (key.__id__ = ++haxe_ds_ObjectMap.count);
		this.h[id] = value;
		this.h.__keys__[id] = key;
	}
	,remove: function(key) {
		var id = key.__id__;
		if(this.h.__keys__[id] == null) return false;
		delete(this.h[id]);
		delete(this.h.__keys__[id]);
		return true;
	}
	,__class__: haxe_ds_ObjectMap
};
var haxe_ds__$StringMap_StringMapIterator = function(map,keys) {
	this.map = map;
	this.keys = keys;
	this.index = 0;
	this.count = keys.length;
};
$hxClasses["haxe.ds._StringMap.StringMapIterator"] = haxe_ds__$StringMap_StringMapIterator;
haxe_ds__$StringMap_StringMapIterator.__name__ = true;
haxe_ds__$StringMap_StringMapIterator.prototype = {
	hasNext: function() {
		return this.index < this.count;
	}
	,next: function() {
		return this.map.get(this.keys[this.index++]);
	}
	,__class__: haxe_ds__$StringMap_StringMapIterator
};
var haxe_ds_StringMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.StringMap"] = haxe_ds_StringMap;
haxe_ds_StringMap.__name__ = true;
haxe_ds_StringMap.__interfaces__ = [haxe_IMap];
haxe_ds_StringMap.prototype = {
	set: function(key,value) {
		if(__map_reserved[key] != null) this.setReserved(key,value); else this.h[key] = value;
	}
	,get: function(key) {
		if(__map_reserved[key] != null) return this.getReserved(key);
		return this.h[key];
	}
	,exists: function(key) {
		if(__map_reserved[key] != null) return this.existsReserved(key);
		return this.h.hasOwnProperty(key);
	}
	,setReserved: function(key,value) {
		if(this.rh == null) this.rh = { };
		this.rh["$" + key] = value;
	}
	,getReserved: function(key) {
		if(this.rh == null) return null; else return this.rh["$" + key];
	}
	,existsReserved: function(key) {
		if(this.rh == null) return false;
		return this.rh.hasOwnProperty("$" + key);
	}
	,remove: function(key) {
		if(__map_reserved[key] != null) {
			key = "$" + key;
			if(this.rh == null || !this.rh.hasOwnProperty(key)) return false;
			delete(this.rh[key]);
			return true;
		} else {
			if(!this.h.hasOwnProperty(key)) return false;
			delete(this.h[key]);
			return true;
		}
	}
	,keys: function() {
		var _this = this.arrayKeys();
		return HxOverrides.iter(_this);
	}
	,arrayKeys: function() {
		var out = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) out.push(key);
		}
		if(this.rh != null) {
			for( var key in this.rh ) {
			if(key.charCodeAt(0) == 36) out.push(key.substr(1));
			}
		}
		return out;
	}
	,iterator: function() {
		return new haxe_ds__$StringMap_StringMapIterator(this,this.arrayKeys());
	}
	,__class__: haxe_ds_StringMap
};
var haxe_ds__$Vector_Vector_$Impl_$ = {};
$hxClasses["haxe.ds._Vector.Vector_Impl_"] = haxe_ds__$Vector_Vector_$Impl_$;
haxe_ds__$Vector_Vector_$Impl_$.__name__ = true;
haxe_ds__$Vector_Vector_$Impl_$.blit = function(src,srcPos,dest,destPos,len) {
	var _g = 0;
	while(_g < len) {
		var i = _g++;
		dest[destPos + i] = src[srcPos + i];
	}
};
var haxe_io_Bytes = function(data) {
	this.length = data.byteLength;
	this.b = new Uint8Array(data);
	this.b.bufferValue = data;
	data.hxBytes = this;
	data.bytes = this.b;
};
$hxClasses["haxe.io.Bytes"] = haxe_io_Bytes;
haxe_io_Bytes.__name__ = true;
haxe_io_Bytes.alloc = function(length) {
	return new haxe_io_Bytes(new ArrayBuffer(length));
};
haxe_io_Bytes.ofData = function(b) {
	var hb = b.hxBytes;
	if(hb != null) return hb;
	return new haxe_io_Bytes(b);
};
haxe_io_Bytes.prototype = {
	set: function(pos,v) {
		this.b[pos] = v & 255;
	}
	,getString: function(pos,len) {
		if(pos < 0 || len < 0 || pos + len > this.length) throw new js__$Boot_HaxeError(haxe_io_Error.OutsideBounds);
		var s = "";
		var b = this.b;
		var fcc = String.fromCharCode;
		var i = pos;
		var max = pos + len;
		while(i < max) {
			var c = b[i++];
			if(c < 128) {
				if(c == 0) break;
				s += fcc(c);
			} else if(c < 224) s += fcc((c & 63) << 6 | b[i++] & 127); else if(c < 240) {
				var c2 = b[i++];
				s += fcc((c & 31) << 12 | (c2 & 127) << 6 | b[i++] & 127);
			} else {
				var c21 = b[i++];
				var c3 = b[i++];
				var u = (c & 15) << 18 | (c21 & 127) << 12 | (c3 & 127) << 6 | b[i++] & 127;
				s += fcc((u >> 10) + 55232);
				s += fcc(u & 1023 | 56320);
			}
		}
		return s;
	}
	,__class__: haxe_io_Bytes
};
var haxe_io_Eof = function() { };
$hxClasses["haxe.io.Eof"] = haxe_io_Eof;
haxe_io_Eof.__name__ = true;
haxe_io_Eof.prototype = {
	toString: function() {
		return "Eof";
	}
	,__class__: haxe_io_Eof
};
var haxe_io_Error = $hxClasses["haxe.io.Error"] = { __ename__ : true, __constructs__ : ["Blocked","Overflow","OutsideBounds","Custom"] };
haxe_io_Error.Blocked = ["Blocked",0];
haxe_io_Error.Blocked.toString = $estr;
haxe_io_Error.Blocked.__enum__ = haxe_io_Error;
haxe_io_Error.Overflow = ["Overflow",1];
haxe_io_Error.Overflow.toString = $estr;
haxe_io_Error.Overflow.__enum__ = haxe_io_Error;
haxe_io_Error.OutsideBounds = ["OutsideBounds",2];
haxe_io_Error.OutsideBounds.toString = $estr;
haxe_io_Error.OutsideBounds.__enum__ = haxe_io_Error;
haxe_io_Error.Custom = function(e) { var $x = ["Custom",3,e]; $x.__enum__ = haxe_io_Error; $x.toString = $estr; return $x; };
var haxe_io_FPHelper = function() { };
$hxClasses["haxe.io.FPHelper"] = haxe_io_FPHelper;
haxe_io_FPHelper.__name__ = true;
haxe_io_FPHelper.i32ToFloat = function(i) {
	var sign = 1 - (i >>> 31 << 1);
	var exp = i >>> 23 & 255;
	var sig = i & 8388607;
	if(sig == 0 && exp == 0) return 0.0;
	return sign * (1 + Math.pow(2,-23) * sig) * Math.pow(2,exp - 127);
};
haxe_io_FPHelper.floatToI32 = function(f) {
	if(f == 0) return 0;
	var af;
	if(f < 0) af = -f; else af = f;
	var exp = Math.floor(Math.log(af) / 0.6931471805599453);
	if(exp < -127) exp = -127; else if(exp > 128) exp = 128;
	var sig = Math.round((af / Math.pow(2,exp) - 1) * 8388608) & 8388607;
	return (f < 0?-2147483648:0) | exp + 127 << 23 | sig;
};
haxe_io_FPHelper.i64ToDouble = function(low,high) {
	var sign = 1 - (high >>> 31 << 1);
	var exp = (high >> 20 & 2047) - 1023;
	var sig = (high & 1048575) * 4294967296. + (low >>> 31) * 2147483648. + (low & 2147483647);
	if(sig == 0 && exp == -1023) return 0.0;
	return sign * (1.0 + Math.pow(2,-52) * sig) * Math.pow(2,exp);
};
haxe_io_FPHelper.doubleToI64 = function(v) {
	var i64 = haxe_io_FPHelper.i64tmp;
	if(v == 0) {
		i64.low = 0;
		i64.high = 0;
	} else {
		var av;
		if(v < 0) av = -v; else av = v;
		var exp = Math.floor(Math.log(av) / 0.6931471805599453);
		var sig;
		var v1 = (av / Math.pow(2,exp) - 1) * 4503599627370496.;
		sig = Math.round(v1);
		var sig_l = sig | 0;
		var sig_h = sig / 4294967296.0 | 0;
		i64.low = sig_l;
		i64.high = (v < 0?-2147483648:0) | exp + 1023 << 20 | sig_h;
	}
	return i64;
};
var haxe_io_Path = function(path) {
	switch(path) {
	case ".":case "..":
		this.dir = path;
		this.file = "";
		return;
	}
	var c1 = path.lastIndexOf("/");
	var c2 = path.lastIndexOf("\\");
	if(c1 < c2) {
		this.dir = HxOverrides.substr(path,0,c2);
		path = HxOverrides.substr(path,c2 + 1,null);
		this.backslash = true;
	} else if(c2 < c1) {
		this.dir = HxOverrides.substr(path,0,c1);
		path = HxOverrides.substr(path,c1 + 1,null);
	} else this.dir = null;
	var cp = path.lastIndexOf(".");
	if(cp != -1) {
		this.ext = HxOverrides.substr(path,cp + 1,null);
		this.file = HxOverrides.substr(path,0,cp);
	} else {
		this.ext = null;
		this.file = path;
	}
};
$hxClasses["haxe.io.Path"] = haxe_io_Path;
haxe_io_Path.__name__ = true;
haxe_io_Path.withoutExtension = function(path) {
	var s = new haxe_io_Path(path);
	s.ext = null;
	return s.toString();
};
haxe_io_Path.prototype = {
	toString: function() {
		return (this.dir == null?"":this.dir + (this.backslash?"\\":"/")) + this.file + (this.ext == null?"":"." + this.ext);
	}
	,__class__: haxe_io_Path
};
var js__$Boot_HaxeError = function(val) {
	Error.call(this);
	this.val = val;
	this.message = String(val);
	if(Error.captureStackTrace) Error.captureStackTrace(this,js__$Boot_HaxeError);
};
$hxClasses["js._Boot.HaxeError"] = js__$Boot_HaxeError;
js__$Boot_HaxeError.__name__ = true;
js__$Boot_HaxeError.__super__ = Error;
js__$Boot_HaxeError.prototype = $extend(Error.prototype,{
	__class__: js__$Boot_HaxeError
});
var js_Boot = function() { };
$hxClasses["js.Boot"] = js_Boot;
js_Boot.__name__ = true;
js_Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) return Array; else {
		var cl = o.__class__;
		if(cl != null) return cl;
		var name = js_Boot.__nativeClassName(o);
		if(name != null) return js_Boot.__resolveNativeClass(name);
		return null;
	}
};
js_Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str2 = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i1 = _g1++;
					if(i1 != 2) str2 += "," + js_Boot.__string_rec(o[i1],s); else str2 += js_Boot.__string_rec(o[i1],s);
				}
				return str2 + ")";
			}
			var l = o.length;
			var i;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js_Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
js_Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js_Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js_Boot.__interfLoop(cc.__super__,cl);
};
js_Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Array:
		return (o instanceof Array) && o.__enum__ == null;
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) return true;
				if(js_Boot.__interfLoop(js_Boot.getClass(o),cl)) return true;
			} else if(typeof(cl) == "object" && js_Boot.__isNativeObj(cl)) {
				if(o instanceof cl) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
};
js_Boot.__cast = function(o,t) {
	if(js_Boot.__instanceof(o,t)) return o; else throw new js__$Boot_HaxeError("Cannot cast " + Std.string(o) + " to " + Std.string(t));
};
js_Boot.__nativeClassName = function(o) {
	var name = js_Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") return null;
	return name;
};
js_Boot.__isNativeObj = function(o) {
	return js_Boot.__nativeClassName(o) != null;
};
js_Boot.__resolveNativeClass = function(name) {
	return $global[name];
};
var js_html_compat_ArrayBuffer = function(a) {
	if((a instanceof Array) && a.__enum__ == null) {
		this.a = a;
		this.byteLength = a.length;
	} else {
		var len = a;
		this.a = [];
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			this.a[i] = 0;
		}
		this.byteLength = len;
	}
};
$hxClasses["js.html.compat.ArrayBuffer"] = js_html_compat_ArrayBuffer;
js_html_compat_ArrayBuffer.__name__ = true;
js_html_compat_ArrayBuffer.sliceImpl = function(begin,end) {
	var u = new Uint8Array(this,begin,end == null?null:end - begin);
	var result = new ArrayBuffer(u.byteLength);
	var resultArray = new Uint8Array(result);
	resultArray.set(u);
	return result;
};
js_html_compat_ArrayBuffer.prototype = {
	slice: function(begin,end) {
		return new js_html_compat_ArrayBuffer(this.a.slice(begin,end));
	}
	,__class__: js_html_compat_ArrayBuffer
};
var js_html_compat_DataView = function(buffer,byteOffset,byteLength) {
	this.buf = buffer;
	if(byteOffset == null) this.offset = 0; else this.offset = byteOffset;
	if(byteLength == null) this.length = buffer.byteLength - this.offset; else this.length = byteLength;
	if(this.offset < 0 || this.length < 0 || this.offset + this.length > buffer.byteLength) throw new js__$Boot_HaxeError(haxe_io_Error.OutsideBounds);
};
$hxClasses["js.html.compat.DataView"] = js_html_compat_DataView;
js_html_compat_DataView.__name__ = true;
js_html_compat_DataView.prototype = {
	getInt8: function(byteOffset) {
		var v = this.buf.a[this.offset + byteOffset];
		if(v >= 128) return v - 256; else return v;
	}
	,getUint8: function(byteOffset) {
		return this.buf.a[this.offset + byteOffset];
	}
	,getInt16: function(byteOffset,littleEndian) {
		var v = this.getUint16(byteOffset,littleEndian);
		if(v >= 32768) return v - 65536; else return v;
	}
	,getUint16: function(byteOffset,littleEndian) {
		if(littleEndian) return this.buf.a[this.offset + byteOffset] | this.buf.a[this.offset + byteOffset + 1] << 8; else return this.buf.a[this.offset + byteOffset] << 8 | this.buf.a[this.offset + byteOffset + 1];
	}
	,getInt32: function(byteOffset,littleEndian) {
		var p = this.offset + byteOffset;
		var a = this.buf.a[p++];
		var b = this.buf.a[p++];
		var c = this.buf.a[p++];
		var d = this.buf.a[p++];
		if(littleEndian) return a | b << 8 | c << 16 | d << 24; else return d | c << 8 | b << 16 | a << 24;
	}
	,getUint32: function(byteOffset,littleEndian) {
		var v = this.getInt32(byteOffset,littleEndian);
		if(v < 0) return v + 4294967296.; else return v;
	}
	,getFloat32: function(byteOffset,littleEndian) {
		return haxe_io_FPHelper.i32ToFloat(this.getInt32(byteOffset,littleEndian));
	}
	,getFloat64: function(byteOffset,littleEndian) {
		var a = this.getInt32(byteOffset,littleEndian);
		var b = this.getInt32(byteOffset + 4,littleEndian);
		return haxe_io_FPHelper.i64ToDouble(littleEndian?a:b,littleEndian?b:a);
	}
	,setInt8: function(byteOffset,value) {
		if(value < 0) this.buf.a[byteOffset + this.offset] = value + 128 & 255; else this.buf.a[byteOffset + this.offset] = value & 255;
	}
	,setUint8: function(byteOffset,value) {
		this.buf.a[byteOffset + this.offset] = value & 255;
	}
	,setInt16: function(byteOffset,value,littleEndian) {
		this.setUint16(byteOffset,value < 0?value + 65536:value,littleEndian);
	}
	,setUint16: function(byteOffset,value,littleEndian) {
		var p = byteOffset + this.offset;
		if(littleEndian) {
			this.buf.a[p] = value & 255;
			this.buf.a[p++] = value >> 8 & 255;
		} else {
			this.buf.a[p++] = value >> 8 & 255;
			this.buf.a[p] = value & 255;
		}
	}
	,setInt32: function(byteOffset,value,littleEndian) {
		this.setUint32(byteOffset,value,littleEndian);
	}
	,setUint32: function(byteOffset,value,littleEndian) {
		var p = byteOffset + this.offset;
		if(littleEndian) {
			this.buf.a[p++] = value & 255;
			this.buf.a[p++] = value >> 8 & 255;
			this.buf.a[p++] = value >> 16 & 255;
			this.buf.a[p++] = value >>> 24;
		} else {
			this.buf.a[p++] = value >>> 24;
			this.buf.a[p++] = value >> 16 & 255;
			this.buf.a[p++] = value >> 8 & 255;
			this.buf.a[p++] = value & 255;
		}
	}
	,setFloat32: function(byteOffset,value,littleEndian) {
		this.setUint32(byteOffset,haxe_io_FPHelper.floatToI32(value),littleEndian);
	}
	,setFloat64: function(byteOffset,value,littleEndian) {
		var i64 = haxe_io_FPHelper.doubleToI64(value);
		if(littleEndian) {
			this.setUint32(byteOffset,i64.low);
			this.setUint32(byteOffset,i64.high);
		} else {
			this.setUint32(byteOffset,i64.high);
			this.setUint32(byteOffset,i64.low);
		}
	}
	,__class__: js_html_compat_DataView
};
var js_html_compat_Uint8Array = function() { };
$hxClasses["js.html.compat.Uint8Array"] = js_html_compat_Uint8Array;
js_html_compat_Uint8Array.__name__ = true;
js_html_compat_Uint8Array._new = function(arg1,offset,length) {
	var arr;
	if(typeof(arg1) == "number") {
		arr = [];
		var _g = 0;
		while(_g < arg1) {
			var i = _g++;
			arr[i] = 0;
		}
		arr.byteLength = arr.length;
		arr.byteOffset = 0;
		arr.buffer = new js_html_compat_ArrayBuffer(arr);
	} else if(js_Boot.__instanceof(arg1,js_html_compat_ArrayBuffer)) {
		var buffer = arg1;
		if(offset == null) offset = 0;
		if(length == null) length = buffer.byteLength - offset;
		if(offset == 0) arr = buffer.a; else arr = buffer.a.slice(offset,offset + length);
		arr.byteLength = arr.length;
		arr.byteOffset = offset;
		arr.buffer = buffer;
	} else if((arg1 instanceof Array) && arg1.__enum__ == null) {
		arr = arg1.slice();
		arr.byteLength = arr.length;
		arr.byteOffset = 0;
		arr.buffer = new js_html_compat_ArrayBuffer(arr);
	} else throw new js__$Boot_HaxeError("TODO " + Std.string(arg1));
	arr.subarray = js_html_compat_Uint8Array._subarray;
	arr.set = js_html_compat_Uint8Array._set;
	return arr;
};
js_html_compat_Uint8Array._set = function(arg,offset) {
	var t = this;
	if(js_Boot.__instanceof(arg.buffer,js_html_compat_ArrayBuffer)) {
		var a = arg;
		if(arg.byteLength + offset > t.byteLength) throw new js__$Boot_HaxeError("set() outside of range");
		var _g1 = 0;
		var _g = arg.byteLength;
		while(_g1 < _g) {
			var i = _g1++;
			t[i + offset] = a[i];
		}
	} else if((arg instanceof Array) && arg.__enum__ == null) {
		var a1 = arg;
		if(a1.length + offset > t.byteLength) throw new js__$Boot_HaxeError("set() outside of range");
		var _g11 = 0;
		var _g2 = a1.length;
		while(_g11 < _g2) {
			var i1 = _g11++;
			t[i1 + offset] = a1[i1];
		}
	} else throw new js__$Boot_HaxeError("TODO");
};
js_html_compat_Uint8Array._subarray = function(start,end) {
	var t = this;
	var a = js_html_compat_Uint8Array._new(t.slice(start,end));
	a.byteOffset = start;
	return a;
};
var lime_AssetCache = function() {
	this.enabled = true;
	this.audio = new haxe_ds_StringMap();
	this.font = new haxe_ds_StringMap();
	this.image = new haxe_ds_StringMap();
	this.version = Std["int"](Math.random() * 1000000);
};
$hxClasses["lime.AssetCache"] = lime_AssetCache;
lime_AssetCache.__name__ = true;
lime_AssetCache.prototype = {
	clear: function(prefix) {
		if(prefix == null) {
			this.audio = new haxe_ds_StringMap();
			this.font = new haxe_ds_StringMap();
			this.image = new haxe_ds_StringMap();
		} else {
			var keys = this.audio.keys();
			while( keys.hasNext() ) {
				var key = keys.next();
				if(StringTools.startsWith(key,prefix)) this.audio.remove(key);
			}
			var keys1 = this.font.keys();
			while( keys1.hasNext() ) {
				var key1 = keys1.next();
				if(StringTools.startsWith(key1,prefix)) this.font.remove(key1);
			}
			var keys2 = this.image.keys();
			while( keys2.hasNext() ) {
				var key2 = keys2.next();
				if(StringTools.startsWith(key2,prefix)) this.image.remove(key2);
			}
		}
	}
	,__class__: lime_AssetCache
};
var lime_app_Event_$Void_$Void = function() {
	this.canceled = false;
	this.__listeners = [];
	this.__priorities = [];
	this.__repeat = [];
};
$hxClasses["lime.app.Event_Void_Void"] = lime_app_Event_$Void_$Void;
lime_app_Event_$Void_$Void.__name__ = true;
lime_app_Event_$Void_$Void.prototype = {
	add: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		var _g1 = 0;
		var _g = this.__priorities.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(priority > this.__priorities[i]) {
				this.__listeners.splice(i,0,listener);
				this.__priorities.splice(i,0,priority);
				this.__repeat.splice(i,0,!once);
				return;
			}
		}
		this.__listeners.push(listener);
		this.__priorities.push(priority);
		this.__repeat.push(!once);
	}
	,remove: function(listener) {
		var i = this.__listeners.length;
		while(--i >= 0) if(Reflect.compareMethods(this.__listeners[i],listener)) {
			this.__listeners.splice(i,1);
			this.__priorities.splice(i,1);
			this.__repeat.splice(i,1);
		}
	}
	,dispatch: function() {
		this.canceled = false;
		var listeners = this.__listeners;
		var repeat = this.__repeat;
		var i = 0;
		while(i < listeners.length) {
			listeners[i]();
			if(!repeat[i]) this.remove(listeners[i]); else i++;
			if(this.canceled) break;
		}
	}
	,__class__: lime_app_Event_$Void_$Void
};
var lime_Assets = function() { };
$hxClasses["lime.Assets"] = lime_Assets;
lime_Assets.__name__ = true;
lime_Assets.getImage = function(id,useCache) {
	if(useCache == null) useCache = true;
	lime_Assets.initialize();
	if(useCache && lime_Assets.cache.enabled && lime_Assets.cache.image.exists(id)) {
		var image = lime_Assets.cache.image.get(id);
		if(lime_Assets.isValidImage(image)) return image;
	}
	var libraryName = id.substring(0,id.indexOf(":"));
	var symbolName;
	var pos = id.indexOf(":") + 1;
	symbolName = HxOverrides.substr(id,pos,null);
	var library = lime_Assets.getLibrary(libraryName);
	if(library != null) {
		if(library.exists(symbolName,"IMAGE")) {
			if(library.isLocal(symbolName,"IMAGE")) {
				var image1 = library.getImage(symbolName);
				if(useCache && lime_Assets.cache.enabled) lime_Assets.cache.image.set(id,image1);
				return image1;
			} else console.log("[Assets] Image asset \"" + id + "\" exists, but only asynchronously");
		} else console.log("[Assets] There is no Image asset with an ID of \"" + id + "\"");
	} else console.log("[Assets] There is no asset library named \"" + libraryName + "\"");
	return null;
};
lime_Assets.getLibrary = function(name) {
	if(name == null || name == "") name = "default";
	return lime_Assets.libraries.get(name);
};
lime_Assets.getText = function(id) {
	lime_Assets.initialize();
	var libraryName = id.substring(0,id.indexOf(":"));
	var symbolName;
	var pos = id.indexOf(":") + 1;
	symbolName = HxOverrides.substr(id,pos,null);
	var library = lime_Assets.getLibrary(libraryName);
	if(library != null) {
		if(library.exists(symbolName,"TEXT")) {
			if(library.isLocal(symbolName,"TEXT")) return library.getText(symbolName); else console.log("[Assets] String asset \"" + id + "\" exists, but only asynchronously");
		} else console.log("[Assets] There is no String asset with an ID of \"" + id + "\"");
	} else console.log("[Assets] There is no asset library named \"" + libraryName + "\"");
	return null;
};
lime_Assets.initialize = function() {
	if(!lime_Assets.initialized) {
		lime_Assets.registerLibrary("default",new DefaultAssetLibrary());
		lime_Assets.initialized = true;
	}
};
lime_Assets.isValidImage = function(buffer) {
	return true;
};
lime_Assets.registerLibrary = function(name,library) {
	if(lime_Assets.libraries.exists(name)) {
		if(lime_Assets.libraries.get(name) == library) return; else lime_Assets.unloadLibrary(name);
	}
	if(library != null) library.onChange.add(lime_Assets.library_onChange);
	lime_Assets.libraries.set(name,library);
};
lime_Assets.unloadLibrary = function(name) {
	lime_Assets.initialize();
	var library = lime_Assets.libraries.get(name);
	if(library != null) {
		lime_Assets.cache.clear(name + ":");
		library.onChange.remove(lime_Assets.library_onChange);
		library.unload();
	}
	lime_Assets.libraries.remove(name);
};
lime_Assets.library_onChange = function() {
	lime_Assets.cache.clear();
	lime_Assets.onChange.dispatch();
};
var lime__$backend_html5_HTML5Application = function(parent) {
	this.gameDeviceCache = new haxe_ds_IntMap();
	this.parent = parent;
	this.currentUpdate = 0;
	this.lastUpdate = 0;
	this.nextUpdate = 0;
	this.framePeriod = -1;
	lime_audio_AudioManager.init();
};
$hxClasses["lime._backend.html5.HTML5Application"] = lime__$backend_html5_HTML5Application;
lime__$backend_html5_HTML5Application.__name__ = true;
lime__$backend_html5_HTML5Application.prototype = {
	convertKeyCode: function(keyCode) {
		if(keyCode >= 65 && keyCode <= 90) return keyCode + 32;
		switch(keyCode) {
		case 16:
			return 1073742049;
		case 17:
			return 1073742048;
		case 18:
			return 1073742050;
		case 20:
			return 1073741881;
		case 144:
			return 1073741907;
		case 37:
			return 1073741904;
		case 38:
			return 1073741906;
		case 39:
			return 1073741903;
		case 40:
			return 1073741905;
		case 45:
			return 1073741897;
		case 46:
			return 127;
		case 36:
			return 1073741898;
		case 35:
			return 1073741901;
		case 33:
			return 1073741899;
		case 34:
			return 1073741902;
		case 112:
			return 1073741882;
		case 113:
			return 1073741883;
		case 114:
			return 1073741884;
		case 115:
			return 1073741885;
		case 116:
			return 1073741886;
		case 117:
			return 1073741887;
		case 118:
			return 1073741888;
		case 119:
			return 1073741889;
		case 120:
			return 1073741890;
		case 121:
			return 1073741891;
		case 122:
			return 1073741892;
		case 123:
			return 1073741893;
		case 124:
			return 1073741928;
		case 125:
			return 1073741929;
		case 126:
			return 1073741930;
		case 186:
			return 59;
		case 187:
			return 61;
		case 188:
			return 44;
		case 189:
			return 45;
		case 190:
			return 46;
		case 191:
			return 47;
		case 192:
			return 96;
		case 219:
			return 91;
		case 220:
			return 92;
		case 221:
			return 93;
		case 222:
			return 39;
		}
		return keyCode;
	}
	,create: function(config) {
	}
	,exec: function() {
		window.addEventListener("keydown",$bind(this,this.handleKeyEvent),false);
		window.addEventListener("keyup",$bind(this,this.handleKeyEvent),false);
		window.addEventListener("focus",$bind(this,this.handleWindowEvent),false);
		window.addEventListener("blur",$bind(this,this.handleWindowEvent),false);
		window.addEventListener("resize",$bind(this,this.handleWindowEvent),false);
		window.addEventListener("beforeunload",$bind(this,this.handleWindowEvent),false);
		
			if (!CanvasRenderingContext2D.prototype.isPointInStroke) {
				CanvasRenderingContext2D.prototype.isPointInStroke = function (path, x, y) {
					return false;
				};
			}
			
			var lastTime = 0;
			var vendors = ['ms', 'moz', 'webkit', 'o'];
			for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
				window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
				window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
			}
			
			if (!window.requestAnimationFrame)
				window.requestAnimationFrame = function(callback, element) {
					var currTime = new Date().getTime();
					var timeToCall = Math.max(0, 16 - (currTime - lastTime));
					var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
					  timeToCall);
					lastTime = currTime + timeToCall;
					return id;
				};
			
			if (!window.cancelAnimationFrame)
				window.cancelAnimationFrame = function(id) {
					clearTimeout(id);
				};
			
			window.requestAnimFrame = window.requestAnimationFrame;
		;
		this.lastUpdate = new Date().getTime();
		this.handleApplicationEvent();
		return 0;
	}
	,exit: function() {
	}
	,handleApplicationEvent: function(__) {
		this.updateGameDevices();
		this.currentUpdate = new Date().getTime();
		if(this.currentUpdate >= this.nextUpdate) {
			this.deltaTime = this.currentUpdate - this.lastUpdate;
			this.parent.onUpdate.dispatch(this.deltaTime | 0);
			if(this.parent.renderers[0] != null) {
				this.parent.renderers[0].onRender.dispatch();
				this.parent.renderers[0].flip();
			}
			if(this.framePeriod < 0) {
				this.nextUpdate = this.currentUpdate;
				this.nextUpdate = this.currentUpdate;
			} else this.nextUpdate = this.currentUpdate + this.framePeriod;
			this.lastUpdate = this.currentUpdate;
		}
		window.requestAnimationFrame($bind(this,this.handleApplicationEvent));
	}
	,handleKeyEvent: function(event) {
		if(this.parent.windows[0] != null) {
			var keyCode = this.convertKeyCode(event.keyCode != null?event.keyCode:event.which);
			var modifier;
			modifier = (event.shiftKey?3:0) | (event.ctrlKey?192:0) | (event.altKey?768:0) | (event.metaKey?3072:0);
			if(event.type == "keydown") {
				this.parent.windows[0].onKeyDown.dispatch(keyCode,modifier);
				if(this.parent.windows[0].onKeyDown.canceled) event.preventDefault();
			} else {
				this.parent.windows[0].onKeyUp.dispatch(keyCode,modifier);
				if(this.parent.windows[0].onKeyUp.canceled) event.preventDefault();
			}
		}
	}
	,handleWindowEvent: function(event) {
		if(this.parent.windows[0] != null) {
			var _g = event.type;
			switch(_g) {
			case "focus":
				this.parent.windows[0].onFocusIn.dispatch();
				this.parent.windows[0].onActivate.dispatch();
				break;
			case "blur":
				this.parent.windows[0].onFocusOut.dispatch();
				this.parent.windows[0].onDeactivate.dispatch();
				break;
			case "resize":
				var cacheWidth = this.parent.windows[0].__width;
				var cacheHeight = this.parent.windows[0].__height;
				this.parent.windows[0].backend.handleResize();
				if(this.parent.windows[0].__width != cacheWidth || this.parent.windows[0].__height != cacheHeight) this.parent.windows[0].onResize.dispatch(this.parent.windows[0].__width,this.parent.windows[0].__height);
				break;
			case "beforeunload":
				this.parent.windows[0].onClose.dispatch();
				break;
			}
		}
	}
	,setFrameRate: function(value) {
		if(value >= 60) this.framePeriod = -1; else if(value > 0) this.framePeriod = 1000 / value; else this.framePeriod = 1000;
		return value;
	}
	,updateGameDevices: function() {
		var devices = lime_ui_Joystick.__getDeviceData();
		if(devices == null) return;
		var id;
		var gamepad;
		var joystick;
		var data;
		var cache;
		var _g1 = 0;
		var _g = devices.length;
		while(_g1 < _g) {
			var i = _g1++;
			id = i;
			data = devices[id];
			if(data == null) continue;
			if(!this.gameDeviceCache.h.hasOwnProperty(id)) {
				cache = new lime__$backend_html5_GameDeviceData();
				cache.id = id;
				cache.connected = data.connected;
				var _g3 = 0;
				var _g2 = data.buttons.length;
				while(_g3 < _g2) {
					var i1 = _g3++;
					cache.buttons.push(data.buttons[i1].value);
				}
				var _g31 = 0;
				var _g21 = data.axes.length;
				while(_g31 < _g21) {
					var i2 = _g31++;
					cache.axes.push(data.axes[i2]);
				}
				if(data.mapping == "standard") cache.isGamepad = true;
				this.gameDeviceCache.h[id] = cache;
				if(data.connected) {
					lime_ui_Joystick.__connect(id);
					if(cache.isGamepad) lime_ui_Gamepad.__connect(id);
				}
			}
			cache = this.gameDeviceCache.h[id];
			joystick = lime_ui_Joystick.devices.h[id];
			gamepad = lime_ui_Gamepad.devices.h[id];
			if(data.connected) {
				var button;
				var value;
				var _g32 = 0;
				var _g22 = data.buttons.length;
				while(_g32 < _g22) {
					var i3 = _g32++;
					value = data.buttons[i3].value;
					if(value != cache.buttons[i3]) {
						if(i3 == 6) {
							joystick.onAxisMove.dispatch(data.axes.length,value);
							if(gamepad != null) gamepad.onAxisMove.dispatch(4,value);
						} else if(i3 == 7) {
							joystick.onAxisMove.dispatch(data.axes.length + 1,value);
							if(gamepad != null) gamepad.onAxisMove.dispatch(5,value);
						} else {
							if(value > 0) joystick.onButtonDown.dispatch(i3); else joystick.onButtonUp.dispatch(i3);
							if(gamepad != null) {
								switch(i3) {
								case 0:
									button = 0;
									break;
								case 1:
									button = 1;
									break;
								case 2:
									button = 2;
									break;
								case 3:
									button = 3;
									break;
								case 4:
									button = 9;
									break;
								case 5:
									button = 10;
									break;
								case 8:
									button = 4;
									break;
								case 9:
									button = 6;
									break;
								case 10:
									button = 7;
									break;
								case 11:
									button = 8;
									break;
								case 12:
									button = 11;
									break;
								case 13:
									button = 12;
									break;
								case 14:
									button = 13;
									break;
								case 15:
									button = 14;
									break;
								case 16:
									button = 5;
									break;
								default:
									continue;
								}
								if(value > 0) gamepad.onButtonDown.dispatch(button); else gamepad.onButtonUp.dispatch(button);
							}
						}
						cache.buttons[i3] = value;
					}
				}
				var _g33 = 0;
				var _g23 = data.axes.length;
				while(_g33 < _g23) {
					var i4 = _g33++;
					if(data.axes[i4] != cache.axes[i4]) {
						joystick.onAxisMove.dispatch(i4,data.axes[i4]);
						if(gamepad != null) gamepad.onAxisMove.dispatch(i4,data.axes[i4]);
						cache.axes[i4] = data.axes[i4];
					}
				}
			} else if(cache.connected) {
				cache.connected = false;
				lime_ui_Joystick.__disconnect(id);
				lime_ui_Gamepad.__disconnect(id);
			}
		}
	}
	,__class__: lime__$backend_html5_HTML5Application
};
var lime__$backend_html5_GameDeviceData = function() {
	this.connected = true;
	this.buttons = [];
	this.axes = [];
};
$hxClasses["lime._backend.html5.GameDeviceData"] = lime__$backend_html5_GameDeviceData;
lime__$backend_html5_GameDeviceData.__name__ = true;
lime__$backend_html5_GameDeviceData.prototype = {
	__class__: lime__$backend_html5_GameDeviceData
};
var lime__$backend_html5_HTML5Mouse = function() { };
$hxClasses["lime._backend.html5.HTML5Mouse"] = lime__$backend_html5_HTML5Mouse;
lime__$backend_html5_HTML5Mouse.__name__ = true;
lime__$backend_html5_HTML5Mouse.__cursor = null;
lime__$backend_html5_HTML5Mouse.__hidden = null;
lime__$backend_html5_HTML5Mouse.set_cursor = function(value) {
	if(lime__$backend_html5_HTML5Mouse.__cursor != value) {
		if(!lime__$backend_html5_HTML5Mouse.__hidden) {
			var _g = 0;
			var _g1 = lime_app_Application.current.windows;
			while(_g < _g1.length) {
				var $window = _g1[_g];
				++_g;
				switch(value[1]) {
				case 0:
					$window.backend.element.style.cursor = "default";
					break;
				case 1:
					$window.backend.element.style.cursor = "crosshair";
					break;
				case 3:
					$window.backend.element.style.cursor = "move";
					break;
				case 4:
					$window.backend.element.style.cursor = "pointer";
					break;
				case 5:
					$window.backend.element.style.cursor = "nesw-resize";
					break;
				case 6:
					$window.backend.element.style.cursor = "ns-resize";
					break;
				case 7:
					$window.backend.element.style.cursor = "nwse-resize";
					break;
				case 8:
					$window.backend.element.style.cursor = "ew-resize";
					break;
				case 9:
					$window.backend.element.style.cursor = "text";
					break;
				case 10:
					$window.backend.element.style.cursor = "wait";
					break;
				case 11:
					$window.backend.element.style.cursor = "wait";
					break;
				default:
					$window.backend.element.style.cursor = "auto";
				}
			}
		}
		lime__$backend_html5_HTML5Mouse.__cursor = value;
	}
	return lime__$backend_html5_HTML5Mouse.__cursor;
};
var lime__$backend_html5_HTML5Renderer = function(parent) {
	this.parent = parent;
};
$hxClasses["lime._backend.html5.HTML5Renderer"] = lime__$backend_html5_HTML5Renderer;
lime__$backend_html5_HTML5Renderer.__name__ = true;
lime__$backend_html5_HTML5Renderer.prototype = {
	create: function() {
		this.createContext();
		{
			var _g = this.parent.context;
			switch(_g[1]) {
			case 0:
				this.parent.window.backend.canvas.addEventListener("webglcontextlost",$bind(this,this.handleEvent),false);
				this.parent.window.backend.canvas.addEventListener("webglcontextrestored",$bind(this,this.handleEvent),false);
				break;
			default:
			}
		}
	}
	,createContext: function() {
		if(this.parent.window.backend.div != null) {
			this.parent.context = lime_graphics_RenderContext.DOM(this.parent.window.backend.div);
			this.parent.type = lime_graphics_RendererType.DOM;
		} else if(this.parent.window.backend.canvas != null) {
			var webgl = null;
			if(webgl == null) {
				this.parent.context = lime_graphics_RenderContext.CANVAS(this.parent.window.backend.canvas.getContext("2d"));
				this.parent.type = lime_graphics_RendererType.CANVAS;
			} else {
				lime_graphics_opengl_GL.context = webgl;
				this.parent.context = lime_graphics_RenderContext.OPENGL(lime_graphics_opengl_GL.context);
				this.parent.type = lime_graphics_RendererType.OPENGL;
			}
		}
	}
	,flip: function() {
	}
	,handleEvent: function(event) {
		var _g = event.type;
		switch(_g) {
		case "webglcontextlost":
			event.preventDefault();
			this.parent.context = null;
			this.parent.onContextLost.dispatch();
			break;
		case "webglcontextrestored":
			this.createContext();
			this.parent.onContextRestored.dispatch(this.parent.context);
			break;
		default:
		}
	}
	,__class__: lime__$backend_html5_HTML5Renderer
};
var lime__$backend_html5_HTML5Window = function(parent) {
	this.unusedTouchesPool = new List();
	this.currentTouches = new haxe_ds_IntMap();
	this.parent = parent;
	if(parent.config != null && Object.prototype.hasOwnProperty.call(parent.config,"element")) this.element = parent.config.element;
};
$hxClasses["lime._backend.html5.HTML5Window"] = lime__$backend_html5_HTML5Window;
lime__$backend_html5_HTML5Window.__name__ = true;
lime__$backend_html5_HTML5Window.textInput = null;
lime__$backend_html5_HTML5Window.prototype = {
	close: function() {
		this.parent.application.removeWindow(this.parent);
	}
	,create: function(application) {
		this.setWidth = this.parent.__width;
		this.setHeight = this.parent.__height;
		this.parent.id = lime__$backend_html5_HTML5Window.windowID++;
		if(js_Boot.__instanceof(this.element,HTMLCanvasElement)) this.canvas = this.element; else this.canvas = window.document.createElement("canvas");
		if(this.canvas != null) {
			var style = this.canvas.style;
			style.setProperty("-webkit-transform","translateZ(0)",null);
			style.setProperty("transform","translateZ(0)",null);
		} else if(this.div != null) {
			var style1 = this.div.style;
			style1.setProperty("-webkit-transform","translate3D(0,0,0)",null);
			style1.setProperty("transform","translate3D(0,0,0)",null);
			style1.position = "relative";
			style1.overflow = "hidden";
			style1.setProperty("-webkit-user-select","none",null);
			style1.setProperty("-moz-user-select","none",null);
			style1.setProperty("-ms-user-select","none",null);
			style1.setProperty("-o-user-select","none",null);
		}
		if(this.parent.__width == 0 && this.parent.__height == 0) {
			if(this.element != null) {
				this.parent.set_width(this.element.clientWidth);
				this.parent.set_height(this.element.clientHeight);
			} else {
				this.parent.set_width(window.innerWidth);
				this.parent.set_height(window.innerHeight);
			}
			this.parent.set_fullscreen(true);
		}
		if(this.canvas != null) {
			this.canvas.width = this.parent.__width;
			this.canvas.height = this.parent.__height;
		} else {
			this.div.style.width = this.parent.__width + "px";
			this.div.style.height = this.parent.__height + "px";
		}
		this.handleResize();
		if(this.element != null) {
			if(this.canvas != null) {
				if(this.element != this.canvas) this.element.appendChild(this.canvas);
			} else this.element.appendChild(this.div);
			var events = ["mousedown","mouseenter","mouseleave","mousemove","mouseup","wheel"];
			var _g = 0;
			while(_g < events.length) {
				var event = events[_g];
				++_g;
				this.element.addEventListener(event,$bind(this,this.handleMouseEvent),true);
			}
			window.document.addEventListener("dragstart",function(e) {
				if(e.target.nodeName.toLowerCase() == "img") {
					e.preventDefault();
					return false;
				}
				return true;
			},false);
			this.element.addEventListener("touchstart",$bind(this,this.handleTouchEvent),true);
			this.element.addEventListener("touchmove",$bind(this,this.handleTouchEvent),true);
			this.element.addEventListener("touchend",$bind(this,this.handleTouchEvent),true);
			this.element.addEventListener("gamepadconnected",$bind(this,this.handleGamepadEvent),true);
			this.element.addEventListener("gamepaddisconnected",$bind(this,this.handleGamepadEvent),true);
		}
	}
	,handleFocusEvent: function(event) {
		if(this.enableTextEvents) haxe_Timer.delay(function() {
			lime__$backend_html5_HTML5Window.textInput.focus();
		},20);
	}
	,handleGamepadEvent: function(event) {
		var _g = event.type;
		switch(_g) {
		case "gamepadconnected":
			lime_ui_Joystick.__connect(event.gamepad.index);
			if(event.gamepad.mapping == "standard") lime_ui_Gamepad.__connect(event.gamepad.index);
			break;
		case "gamepaddisconnected":
			lime_ui_Joystick.__disconnect(event.gamepad.index);
			lime_ui_Gamepad.__disconnect(event.gamepad.index);
			break;
		default:
		}
	}
	,handleInputEvent: function(event) {
		if(lime__$backend_html5_HTML5Window.textInput.value != "") {
			this.parent.onTextInput.dispatch(lime__$backend_html5_HTML5Window.textInput.value);
			lime__$backend_html5_HTML5Window.textInput.value = "";
		}
	}
	,handleMouseEvent: function(event) {
		var x = 0.0;
		var y = 0.0;
		if(event.type != "wheel") {
			if(this.element != null) {
				if(this.canvas != null) {
					var rect = this.canvas.getBoundingClientRect();
					x = (event.clientX - rect.left) * (this.parent.__width / rect.width);
					y = (event.clientY - rect.top) * (this.parent.__height / rect.height);
				} else if(this.div != null) {
					var rect1 = this.div.getBoundingClientRect();
					x = event.clientX - rect1.left;
					y = event.clientY - rect1.top;
				} else {
					var rect2 = this.element.getBoundingClientRect();
					x = (event.clientX - rect2.left) * (this.parent.__width / rect2.width);
					y = (event.clientY - rect2.top) * (this.parent.__height / rect2.height);
				}
			} else {
				x = event.clientX;
				y = event.clientY;
			}
			var _g = event.type;
			switch(_g) {
			case "mousedown":
				this.parent.onMouseDown.dispatch(x,y,event.button);
				break;
			case "mouseenter":
				this.parent.onEnter.dispatch();
				break;
			case "mouseleave":
				this.parent.onLeave.dispatch();
				break;
			case "mouseup":
				this.parent.onMouseUp.dispatch(x,y,event.button);
				break;
			case "mousemove":
				this.parent.onMouseMove.dispatch(x,y);
				break;
			default:
			}
		} else this.parent.onMouseWheel.dispatch(event.deltaX,-event.deltaY);
	}
	,handleResize: function() {
		var stretch = this.parent.__fullscreen || this.setWidth == 0 && this.setHeight == 0;
		if(this.element != null && (this.div == null || this.div != null && stretch)) {
			if(stretch) {
				if(this.parent.__width != this.element.clientWidth || this.parent.__height != this.element.clientHeight) {
					this.parent.set_width(this.element.clientWidth);
					this.parent.set_height(this.element.clientHeight);
					if(this.canvas != null) {
						if(this.element != this.canvas) {
							this.canvas.width = this.element.clientWidth;
							this.canvas.height = this.element.clientHeight;
						}
					} else {
						this.div.style.width = this.element.clientWidth + "px";
						this.div.style.height = this.element.clientHeight + "px";
					}
				}
			} else {
				var scaleX = this.element.clientWidth / this.setWidth;
				var scaleY = this.element.clientHeight / this.setHeight;
				var currentRatio = scaleX / scaleY;
				var targetRatio = Math.min(scaleX,scaleY);
				if(this.canvas != null) {
					if(this.element != this.canvas) {
						this.canvas.style.width = this.setWidth * targetRatio + "px";
						this.canvas.style.height = this.setHeight * targetRatio + "px";
						this.canvas.style.marginLeft = (this.element.clientWidth - this.setWidth * targetRatio) / 2 + "px";
						this.canvas.style.marginTop = (this.element.clientHeight - this.setHeight * targetRatio) / 2 + "px";
					}
				} else {
					this.div.style.width = this.setWidth * targetRatio + "px";
					this.div.style.height = this.setHeight * targetRatio + "px";
					this.div.style.marginLeft = (this.element.clientWidth - this.setWidth * targetRatio) / 2 + "px";
					this.div.style.marginTop = (this.element.clientHeight - this.setHeight * targetRatio) / 2 + "px";
				}
			}
		}
	}
	,handleTouchEvent: function(event) {
		event.preventDefault();
		var rect = null;
		if(this.element != null) {
			if(this.canvas != null) rect = this.canvas.getBoundingClientRect(); else if(this.div != null) rect = this.div.getBoundingClientRect(); else rect = this.element.getBoundingClientRect();
		}
		var windowWidth = this.setWidth;
		var windowHeight = this.setHeight;
		if(windowWidth == 0 || windowHeight == 0) {
			if(rect != null) {
				windowWidth = rect.width;
				windowHeight = rect.height;
			} else {
				windowWidth = 1;
				windowHeight = 1;
			}
		}
		var _g = 0;
		var _g1 = event.changedTouches;
		while(_g < _g1.length) {
			var data = _g1[_g];
			++_g;
			var x = 0.0;
			var y = 0.0;
			if(rect != null) {
				x = (data.clientX - rect.left) * (windowWidth / rect.width);
				y = (data.clientY - rect.top) * (windowHeight / rect.height);
			} else {
				x = data.clientX;
				y = data.clientY;
			}
			var _g2 = event.type;
			switch(_g2) {
			case "touchstart":
				var touch = this.unusedTouchesPool.pop();
				if(touch == null) touch = new lime_ui_Touch(x / windowWidth,y / windowHeight,data.identifier,0,0,data.force,this.parent.id); else {
					touch.x = x / windowWidth;
					touch.y = y / windowHeight;
					touch.id = data.identifier;
					touch.dx = 0;
					touch.dy = 0;
					touch.pressure = data.force;
					touch.device = this.parent.id;
				}
				this.currentTouches.h[data.identifier] = touch;
				lime_ui_Touch.onStart.dispatch(touch);
				if(this.primaryTouch == null) this.primaryTouch = touch;
				if(touch == this.primaryTouch) this.parent.onMouseDown.dispatch(x,y,0);
				break;
			case "touchend":
				var touch1 = this.currentTouches.h[data.identifier];
				if(touch1 != null) {
					var cacheX = touch1.x;
					var cacheY = touch1.y;
					touch1.x = x / windowWidth;
					touch1.y = y / windowHeight;
					touch1.dx = touch1.x - cacheX;
					touch1.dy = touch1.y - cacheY;
					touch1.pressure = data.force;
					lime_ui_Touch.onEnd.dispatch(touch1);
					this.currentTouches.remove(data.identifier);
					this.unusedTouchesPool.add(touch1);
					if(touch1 == this.primaryTouch) {
						this.parent.onMouseUp.dispatch(x,y,0);
						this.primaryTouch = null;
					}
				}
				break;
			case "touchmove":
				var touch2 = this.currentTouches.h[data.identifier];
				if(touch2 != null) {
					var cacheX1 = touch2.x;
					var cacheY1 = touch2.y;
					touch2.x = x / windowWidth;
					touch2.y = y / windowHeight;
					touch2.dx = touch2.x - cacheX1;
					touch2.dy = touch2.y - cacheY1;
					touch2.pressure = data.force;
					lime_ui_Touch.onMove.dispatch(touch2);
					if(touch2 == this.primaryTouch) this.parent.onMouseMove.dispatch(x,y);
				}
				break;
			default:
			}
		}
	}
	,resize: function(width,height) {
	}
	,setEnableTextEvents: function(value) {
		if(value) {
			if(lime__$backend_html5_HTML5Window.textInput == null) {
				lime__$backend_html5_HTML5Window.textInput = window.document.createElement("input");
				lime__$backend_html5_HTML5Window.textInput.type = "text";
				lime__$backend_html5_HTML5Window.textInput.style.position = "absolute";
				lime__$backend_html5_HTML5Window.textInput.style.opacity = "0";
				lime__$backend_html5_HTML5Window.textInput.style.color = "transparent";
				lime__$backend_html5_HTML5Window.textInput.value = "";
				lime__$backend_html5_HTML5Window.textInput.autocapitalize = "off";
				lime__$backend_html5_HTML5Window.textInput.autocorrect = "off";
				lime__$backend_html5_HTML5Window.textInput.autocomplete = "off";
				lime__$backend_html5_HTML5Window.textInput.style.left = "0px";
				lime__$backend_html5_HTML5Window.textInput.style.top = "50%";
				if(new EReg("(iPad|iPhone|iPod).*OS 8_","gi").match(window.navigator.userAgent)) {
					lime__$backend_html5_HTML5Window.textInput.style.fontSize = "0px";
					lime__$backend_html5_HTML5Window.textInput.style.width = "0px";
					lime__$backend_html5_HTML5Window.textInput.style.height = "0px";
				} else {
					lime__$backend_html5_HTML5Window.textInput.style.width = "1px";
					lime__$backend_html5_HTML5Window.textInput.style.height = "1px";
				}
				lime__$backend_html5_HTML5Window.textInput.style.pointerEvents = "none";
				lime__$backend_html5_HTML5Window.textInput.style.zIndex = "-10000000";
				window.document.body.appendChild(lime__$backend_html5_HTML5Window.textInput);
			}
			if(!this.enableTextEvents) {
				lime__$backend_html5_HTML5Window.textInput.addEventListener("input",$bind(this,this.handleInputEvent),true);
				lime__$backend_html5_HTML5Window.textInput.addEventListener("blur",$bind(this,this.handleFocusEvent),true);
			}
			lime__$backend_html5_HTML5Window.textInput.focus();
		} else if(lime__$backend_html5_HTML5Window.textInput != null) {
			lime__$backend_html5_HTML5Window.textInput.removeEventListener("input",$bind(this,this.handleInputEvent),true);
			lime__$backend_html5_HTML5Window.textInput.removeEventListener("blur",$bind(this,this.handleFocusEvent),true);
			lime__$backend_html5_HTML5Window.textInput.blur();
		}
		return this.enableTextEvents = value;
	}
	,setFullscreen: function(value) {
		return false;
	}
	,__class__: lime__$backend_html5_HTML5Window
};
var lime_app_IModule = function() { };
$hxClasses["lime.app.IModule"] = lime_app_IModule;
lime_app_IModule.__name__ = true;
lime_app_IModule.prototype = {
	__class__: lime_app_IModule
};
var lime_app_Module = function() {
	this.onExit = new lime_app_Event_$Int_$Void();
};
$hxClasses["lime.app.Module"] = lime_app_Module;
lime_app_Module.__name__ = true;
lime_app_Module.__interfaces__ = [lime_app_IModule];
lime_app_Module.prototype = {
	onGamepadAxisMove: function(gamepad,axis,value) {
	}
	,onGamepadButtonDown: function(gamepad,button) {
	}
	,onGamepadButtonUp: function(gamepad,button) {
	}
	,onGamepadConnect: function(gamepad) {
		console.log("onGamepadConnect (module)");
	}
	,onGamepadDisconnect: function(gamepad) {
	}
	,onJoystickAxisMove: function(joystick,axis,value) {
	}
	,onJoystickButtonDown: function(joystick,button) {
	}
	,onJoystickButtonUp: function(joystick,button) {
	}
	,onJoystickConnect: function(joystick) {
	}
	,onJoystickDisconnect: function(joystick) {
	}
	,onJoystickHatMove: function(joystick,hat,position) {
	}
	,onJoystickTrackballMove: function(joystick,trackball,value) {
	}
	,onKeyDown: function(window,keyCode,modifier) {
	}
	,onKeyUp: function(window,keyCode,modifier) {
	}
	,onModuleExit: function(code) {
	}
	,onMouseDown: function(window,x,y,button) {
	}
	,onMouseMove: function(window,x,y) {
	}
	,onMouseMoveRelative: function(window,x,y) {
	}
	,onMouseUp: function(window,x,y,button) {
	}
	,onMouseWheel: function(window,deltaX,deltaY) {
	}
	,onPreloadComplete: function() {
	}
	,onPreloadProgress: function(loaded,total) {
	}
	,onRenderContextLost: function(renderer) {
	}
	,onRenderContextRestored: function(renderer,context) {
	}
	,onTextEdit: function(window,text,start,length) {
	}
	,onTextInput: function(window,text) {
	}
	,onTouchEnd: function(touch) {
	}
	,onTouchMove: function(touch) {
	}
	,onTouchStart: function(touch) {
	}
	,onWindowActivate: function(window) {
	}
	,onWindowClose: function(window) {
	}
	,onWindowCreate: function(window) {
	}
	,onWindowDeactivate: function(window) {
	}
	,onWindowDropFile: function(window,file) {
	}
	,onWindowEnter: function(window) {
	}
	,onWindowFocusIn: function(window) {
	}
	,onWindowFocusOut: function(window) {
	}
	,onWindowFullscreen: function(window) {
	}
	,onWindowLeave: function(window) {
	}
	,onWindowMove: function(window,x,y) {
	}
	,onWindowMinimize: function(window) {
	}
	,onWindowResize: function(window,width,height) {
	}
	,onWindowRestore: function(window) {
	}
	,render: function(renderer) {
	}
	,update: function(deltaTime) {
	}
	,__class__: lime_app_Module
};
var lime_app_Application = function() {
	this.onUpdate = new lime_app_Event_$Int_$Void();
	lime_app_Module.call(this);
	if(lime_app_Application.current == null) lime_app_Application.current = this;
	this.modules = [];
	this.renderers = [];
	this.windows = [];
	this.windowByID = new haxe_ds_IntMap();
	this.backend = new lime__$backend_html5_HTML5Application(this);
	this.onExit.add($bind(this,this.onModuleExit));
	this.onUpdate.add($bind(this,this.update));
	lime_ui_Gamepad.onConnect.add($bind(this,this.__onGamepadConnect));
	lime_ui_Joystick.onConnect.add($bind(this,this.__onJoystickConnect));
	lime_ui_Touch.onStart.add($bind(this,this.onTouchStart));
	lime_ui_Touch.onMove.add($bind(this,this.onTouchMove));
	lime_ui_Touch.onEnd.add($bind(this,this.onTouchEnd));
};
$hxClasses["lime.app.Application"] = lime_app_Application;
lime_app_Application.__name__ = true;
lime_app_Application.current = null;
lime_app_Application.__super__ = lime_app_Module;
lime_app_Application.prototype = $extend(lime_app_Module.prototype,{
	addModule: function(module) {
		this.modules.push(module);
		if(this.windows.length > 0) {
			var _g = 0;
			var _g1 = this.windows;
			while(_g < _g1.length) {
				var $window = _g1[_g];
				++_g;
				module.onWindowCreate($window);
			}
			if(this.preloader == null || this.preloader.complete) module.onPreloadComplete();
		}
	}
	,addRenderer: function(renderer) {
		renderer.onRender.add((function(f,a1) {
			return function() {
				f(a1);
			};
		})($bind(this,this.render),renderer));
		renderer.onContextLost.add((function(f1,a11) {
			return function() {
				f1(a11);
			};
		})($bind(this,this.onRenderContextLost),renderer));
		renderer.onContextRestored.add((function(f2,a12) {
			return function(a2) {
				f2(a12,a2);
			};
		})($bind(this,this.onRenderContextRestored),renderer));
		this.renderers.push(renderer);
	}
	,createWindow: function(window) {
		window.onActivate.add((function(f,a1) {
			return function() {
				f(a1);
			};
		})($bind(this,this.onWindowActivate),window));
		window.onClose.add((function(f1,a11) {
			return function() {
				f1(a11);
			};
		})($bind(this,this.onWindowClose),window));
		window.onCreate.add((function(f2,a12) {
			return function() {
				f2(a12);
			};
		})($bind(this,this.onWindowCreate),window));
		window.onDeactivate.add((function(f3,a13) {
			return function() {
				f3(a13);
			};
		})($bind(this,this.onWindowDeactivate),window));
		window.onDropFile.add((function(f4,a14) {
			return function(a2) {
				f4(a14,a2);
			};
		})($bind(this,this.onWindowDropFile),window));
		window.onEnter.add((function(f5,a15) {
			return function() {
				f5(a15);
			};
		})($bind(this,this.onWindowEnter),window));
		window.onFocusIn.add((function(f6,a16) {
			return function() {
				f6(a16);
			};
		})($bind(this,this.onWindowFocusIn),window));
		window.onFocusOut.add((function(f7,a17) {
			return function() {
				f7(a17);
			};
		})($bind(this,this.onWindowFocusOut),window));
		window.onFullscreen.add((function(f8,a18) {
			return function() {
				f8(a18);
			};
		})($bind(this,this.onWindowFullscreen),window));
		window.onKeyDown.add((function(f9,a19) {
			return function(a21,a3) {
				f9(a19,a21,a3);
			};
		})($bind(this,this.onKeyDown),window));
		window.onKeyUp.add((function(f10,a110) {
			return function(a22,a31) {
				f10(a110,a22,a31);
			};
		})($bind(this,this.onKeyUp),window));
		window.onLeave.add((function(f11,a111) {
			return function() {
				f11(a111);
			};
		})($bind(this,this.onWindowLeave),window));
		window.onMinimize.add((function(f12,a112) {
			return function() {
				f12(a112);
			};
		})($bind(this,this.onWindowMinimize),window));
		window.onMouseDown.add((function(f13,a113) {
			return function(x,y,a23) {
				f13(a113,x,y,a23);
			};
		})($bind(this,this.onMouseDown),window));
		window.onMouseMove.add((function(f14,a114) {
			return function(x1,y1) {
				f14(a114,x1,y1);
			};
		})($bind(this,this.onMouseMove),window));
		window.onMouseMoveRelative.add((function(f15,a115) {
			return function(x2,y2) {
				f15(a115,x2,y2);
			};
		})($bind(this,this.onMouseMoveRelative),window));
		window.onMouseUp.add((function(f16,a116) {
			return function(x3,y3,a24) {
				f16(a116,x3,y3,a24);
			};
		})($bind(this,this.onMouseUp),window));
		window.onMouseWheel.add((function(f17,a117) {
			return function(a25,a32) {
				f17(a117,a25,a32);
			};
		})($bind(this,this.onMouseWheel),window));
		window.onMove.add((function(f18,a118) {
			return function(x4,y4) {
				f18(a118,x4,y4);
			};
		})($bind(this,this.onWindowMove),window));
		window.onResize.add((function(f19,a119) {
			return function(a26,a33) {
				f19(a119,a26,a33);
			};
		})($bind(this,this.onWindowResize),window));
		window.onRestore.add((function(f20,a120) {
			return function() {
				f20(a120);
			};
		})($bind(this,this.onWindowRestore),window));
		window.onTextEdit.add((function(f21,a121) {
			return function(a27,a34,a4) {
				f21(a121,a27,a34,a4);
			};
		})($bind(this,this.onTextEdit),window));
		window.onTextInput.add((function(f22,a122) {
			return function(a28) {
				f22(a122,a28);
			};
		})($bind(this,this.onTextInput),window));
		if(window.renderer == null) {
			var renderer = new lime_graphics_Renderer(window);
			this.addRenderer(renderer);
		}
		window.create(this);
		this.windows.push(window);
		this.windowByID.h[window.id] = window;
		window.onCreate.dispatch();
	}
	,exec: function() {
		lime_app_Application.current = this;
		return this.backend.exec();
	}
	,onGamepadAxisMove: function(gamepad,axis,value) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onGamepadAxisMove(gamepad,axis,value);
		}
	}
	,onGamepadButtonDown: function(gamepad,button) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onGamepadButtonDown(gamepad,button);
		}
	}
	,onGamepadButtonUp: function(gamepad,button) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onGamepadButtonUp(gamepad,button);
		}
	}
	,onGamepadConnect: function(gamepad) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onGamepadConnect(gamepad);
		}
	}
	,onGamepadDisconnect: function(gamepad) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onGamepadDisconnect(gamepad);
		}
	}
	,onJoystickAxisMove: function(joystick,axis,value) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onJoystickAxisMove(joystick,axis,value);
		}
	}
	,onJoystickButtonDown: function(joystick,button) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onJoystickButtonDown(joystick,button);
		}
	}
	,onJoystickButtonUp: function(joystick,button) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onJoystickButtonUp(joystick,button);
		}
	}
	,onJoystickConnect: function(joystick) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onJoystickConnect(joystick);
		}
	}
	,onJoystickDisconnect: function(joystick) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onJoystickDisconnect(joystick);
		}
	}
	,onJoystickHatMove: function(joystick,hat,position) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onJoystickHatMove(joystick,hat,position);
		}
	}
	,onJoystickTrackballMove: function(joystick,trackball,value) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onJoystickTrackballMove(joystick,trackball,value);
		}
	}
	,onKeyDown: function(window,keyCode,modifier) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onKeyDown(window,keyCode,modifier);
		}
	}
	,onKeyUp: function(window,keyCode,modifier) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onKeyUp(window,keyCode,modifier);
		}
	}
	,onModuleExit: function(code) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onModuleExit(code);
		}
		this.backend.exit();
	}
	,onMouseDown: function(window,x,y,button) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onMouseDown(window,x,y,button);
		}
	}
	,onMouseMove: function(window,x,y) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onMouseMove(window,x,y);
		}
	}
	,onMouseMoveRelative: function(window,x,y) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onMouseMoveRelative(window,x,y);
		}
	}
	,onMouseUp: function(window,x,y,button) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onMouseUp(window,x,y,button);
		}
	}
	,onMouseWheel: function(window,deltaX,deltaY) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onMouseWheel(window,deltaX,deltaY);
		}
	}
	,onPreloadComplete: function() {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onPreloadComplete();
		}
	}
	,onPreloadProgress: function(loaded,total) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onPreloadProgress(loaded,total);
		}
	}
	,onRenderContextLost: function(renderer) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onRenderContextLost(renderer);
		}
	}
	,onRenderContextRestored: function(renderer,context) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onRenderContextRestored(renderer,context);
		}
	}
	,onTextEdit: function(window,text,start,length) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onTextEdit(window,text,start,length);
		}
	}
	,onTextInput: function(window,text) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onTextInput(window,text);
		}
	}
	,onTouchEnd: function(touch) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onTouchEnd(touch);
		}
	}
	,onTouchMove: function(touch) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onTouchMove(touch);
		}
	}
	,onTouchStart: function(touch) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onTouchStart(touch);
		}
	}
	,onWindowActivate: function(window) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onWindowActivate(window);
		}
	}
	,onWindowClose: function(window) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onWindowClose(window);
		}
		this.removeWindow(window);
	}
	,onWindowCreate: function(window) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onWindowCreate(window);
		}
	}
	,onWindowDeactivate: function(window) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onWindowDeactivate(window);
		}
	}
	,onWindowDropFile: function(window,file) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onWindowDropFile(window,file);
		}
	}
	,onWindowEnter: function(window) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onWindowEnter(window);
		}
	}
	,onWindowFocusIn: function(window) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onWindowFocusIn(window);
		}
	}
	,onWindowFocusOut: function(window) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onWindowFocusOut(window);
		}
	}
	,onWindowFullscreen: function(window) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onWindowFullscreen(window);
		}
	}
	,onWindowLeave: function(window) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onWindowLeave(window);
		}
	}
	,onWindowMinimize: function(window) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onWindowMinimize(window);
		}
	}
	,onWindowMove: function(window,x,y) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onWindowMove(window,x,y);
		}
	}
	,onWindowResize: function(window,width,height) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onWindowResize(window,width,height);
		}
	}
	,onWindowRestore: function(window) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onWindowRestore(window);
		}
	}
	,removeWindow: function(window) {
		if(window != null && this.windowByID.h.hasOwnProperty(window.id)) {
			HxOverrides.remove(this.windows,window);
			this.windowByID.remove(window.id);
			window.close();
			if(this.windows[0] == window) this.window = null;
		}
	}
	,render: function(renderer) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.render(renderer);
		}
	}
	,setPreloader: function(preloader) {
		if(this.preloader != null) {
			this.preloader.onProgress.remove($bind(this,this.onPreloadProgress));
			this.preloader.onComplete.remove($bind(this,this.onPreloadComplete));
		}
		this.preloader = preloader;
		if(preloader.complete) this.onPreloadComplete(); else {
			preloader.onProgress.add($bind(this,this.onPreloadProgress));
			preloader.onComplete.add($bind(this,this.onPreloadComplete));
		}
	}
	,update: function(deltaTime) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.update(deltaTime);
		}
	}
	,__onGamepadConnect: function(gamepad) {
		this.onGamepadConnect(gamepad);
		gamepad.onAxisMove.add((function(f,a1) {
			return function(a2,a3) {
				f(a1,a2,a3);
			};
		})($bind(this,this.onGamepadAxisMove),gamepad));
		gamepad.onButtonDown.add((function(f1,a11) {
			return function(a21) {
				f1(a11,a21);
			};
		})($bind(this,this.onGamepadButtonDown),gamepad));
		gamepad.onButtonUp.add((function(f2,a12) {
			return function(a22) {
				f2(a12,a22);
			};
		})($bind(this,this.onGamepadButtonUp),gamepad));
		gamepad.onDisconnect.add((function(f3,a13) {
			return function() {
				f3(a13);
			};
		})($bind(this,this.onGamepadDisconnect),gamepad));
	}
	,__onJoystickConnect: function(joystick) {
		this.onJoystickConnect(joystick);
		joystick.onAxisMove.add((function(f,a1) {
			return function(a2,a3) {
				f(a1,a2,a3);
			};
		})($bind(this,this.onJoystickAxisMove),joystick));
		joystick.onButtonDown.add((function(f1,a11) {
			return function(a21) {
				f1(a11,a21);
			};
		})($bind(this,this.onJoystickButtonDown),joystick));
		joystick.onButtonUp.add((function(f2,a12) {
			return function(a22) {
				f2(a12,a22);
			};
		})($bind(this,this.onJoystickButtonUp),joystick));
		joystick.onDisconnect.add((function(f3,a13) {
			return function() {
				f3(a13);
			};
		})($bind(this,this.onJoystickDisconnect),joystick));
		joystick.onHatMove.add((function(f4,a14) {
			return function(a23,a31) {
				f4(a14,a23,a31);
			};
		})($bind(this,this.onJoystickHatMove),joystick));
		joystick.onTrackballMove.add((function(f5,a15) {
			return function(a24,a32) {
				f5(a15,a24,a32);
			};
		})($bind(this,this.onJoystickTrackballMove),joystick));
	}
	,__class__: lime_app_Application
});
var lime_app_Event_$Dynamic_$Void = function() {
	this.canceled = false;
	this.__listeners = [];
	this.__priorities = [];
	this.__repeat = [];
};
$hxClasses["lime.app.Event_Dynamic_Void"] = lime_app_Event_$Dynamic_$Void;
lime_app_Event_$Dynamic_$Void.__name__ = true;
lime_app_Event_$Dynamic_$Void.prototype = {
	add: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		var _g1 = 0;
		var _g = this.__priorities.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(priority > this.__priorities[i]) {
				this.__listeners.splice(i,0,listener);
				this.__priorities.splice(i,0,priority);
				this.__repeat.splice(i,0,!once);
				return;
			}
		}
		this.__listeners.push(listener);
		this.__priorities.push(priority);
		this.__repeat.push(!once);
	}
	,remove: function(listener) {
		var i = this.__listeners.length;
		while(--i >= 0) if(Reflect.compareMethods(this.__listeners[i],listener)) {
			this.__listeners.splice(i,1);
			this.__priorities.splice(i,1);
			this.__repeat.splice(i,1);
		}
	}
	,dispatch: function(a) {
		this.canceled = false;
		var listeners = this.__listeners;
		var repeat = this.__repeat;
		var i = 0;
		while(i < listeners.length) {
			listeners[i](a);
			if(!repeat[i]) this.remove(listeners[i]); else i++;
			if(this.canceled) break;
		}
	}
	,__class__: lime_app_Event_$Dynamic_$Void
};
var lime_app_Event_$Float_$Float_$Int_$Void = function() {
	this.canceled = false;
	this.__listeners = [];
	this.__priorities = [];
	this.__repeat = [];
};
$hxClasses["lime.app.Event_Float_Float_Int_Void"] = lime_app_Event_$Float_$Float_$Int_$Void;
lime_app_Event_$Float_$Float_$Int_$Void.__name__ = true;
lime_app_Event_$Float_$Float_$Int_$Void.prototype = {
	add: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		var _g1 = 0;
		var _g = this.__priorities.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(priority > this.__priorities[i]) {
				this.__listeners.splice(i,0,listener);
				this.__priorities.splice(i,0,priority);
				this.__repeat.splice(i,0,!once);
				return;
			}
		}
		this.__listeners.push(listener);
		this.__priorities.push(priority);
		this.__repeat.push(!once);
	}
	,remove: function(listener) {
		var i = this.__listeners.length;
		while(--i >= 0) if(Reflect.compareMethods(this.__listeners[i],listener)) {
			this.__listeners.splice(i,1);
			this.__priorities.splice(i,1);
			this.__repeat.splice(i,1);
		}
	}
	,dispatch: function(a,a1,a2) {
		this.canceled = false;
		var listeners = this.__listeners;
		var repeat = this.__repeat;
		var i = 0;
		while(i < listeners.length) {
			listeners[i](a,a1,a2);
			if(!repeat[i]) this.remove(listeners[i]); else i++;
			if(this.canceled) break;
		}
	}
	,__class__: lime_app_Event_$Float_$Float_$Int_$Void
};
var lime_app_Event_$Float_$Float_$Void = function() {
	this.canceled = false;
	this.__listeners = [];
	this.__priorities = [];
	this.__repeat = [];
};
$hxClasses["lime.app.Event_Float_Float_Void"] = lime_app_Event_$Float_$Float_$Void;
lime_app_Event_$Float_$Float_$Void.__name__ = true;
lime_app_Event_$Float_$Float_$Void.prototype = {
	add: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		var _g1 = 0;
		var _g = this.__priorities.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(priority > this.__priorities[i]) {
				this.__listeners.splice(i,0,listener);
				this.__priorities.splice(i,0,priority);
				this.__repeat.splice(i,0,!once);
				return;
			}
		}
		this.__listeners.push(listener);
		this.__priorities.push(priority);
		this.__repeat.push(!once);
	}
	,remove: function(listener) {
		var i = this.__listeners.length;
		while(--i >= 0) if(Reflect.compareMethods(this.__listeners[i],listener)) {
			this.__listeners.splice(i,1);
			this.__priorities.splice(i,1);
			this.__repeat.splice(i,1);
		}
	}
	,dispatch: function(a,a1) {
		this.canceled = false;
		var listeners = this.__listeners;
		var repeat = this.__repeat;
		var i = 0;
		while(i < listeners.length) {
			listeners[i](a,a1);
			if(!repeat[i]) this.remove(listeners[i]); else i++;
			if(this.canceled) break;
		}
	}
	,__class__: lime_app_Event_$Float_$Float_$Void
};
var lime_app_Event_$Int_$Float_$Void = function() {
	this.canceled = false;
	this.__listeners = [];
	this.__priorities = [];
	this.__repeat = [];
};
$hxClasses["lime.app.Event_Int_Float_Void"] = lime_app_Event_$Int_$Float_$Void;
lime_app_Event_$Int_$Float_$Void.__name__ = true;
lime_app_Event_$Int_$Float_$Void.prototype = {
	add: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		var _g1 = 0;
		var _g = this.__priorities.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(priority > this.__priorities[i]) {
				this.__listeners.splice(i,0,listener);
				this.__priorities.splice(i,0,priority);
				this.__repeat.splice(i,0,!once);
				return;
			}
		}
		this.__listeners.push(listener);
		this.__priorities.push(priority);
		this.__repeat.push(!once);
	}
	,remove: function(listener) {
		var i = this.__listeners.length;
		while(--i >= 0) if(Reflect.compareMethods(this.__listeners[i],listener)) {
			this.__listeners.splice(i,1);
			this.__priorities.splice(i,1);
			this.__repeat.splice(i,1);
		}
	}
	,dispatch: function(a,a1) {
		this.canceled = false;
		var listeners = this.__listeners;
		var repeat = this.__repeat;
		var i = 0;
		while(i < listeners.length) {
			listeners[i](a,a1);
			if(!repeat[i]) this.remove(listeners[i]); else i++;
			if(this.canceled) break;
		}
	}
	,__class__: lime_app_Event_$Int_$Float_$Void
};
var lime_app_Event_$Int_$Int_$Void = function() {
	this.canceled = false;
	this.__listeners = [];
	this.__priorities = [];
	this.__repeat = [];
};
$hxClasses["lime.app.Event_Int_Int_Void"] = lime_app_Event_$Int_$Int_$Void;
lime_app_Event_$Int_$Int_$Void.__name__ = true;
lime_app_Event_$Int_$Int_$Void.prototype = {
	add: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		var _g1 = 0;
		var _g = this.__priorities.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(priority > this.__priorities[i]) {
				this.__listeners.splice(i,0,listener);
				this.__priorities.splice(i,0,priority);
				this.__repeat.splice(i,0,!once);
				return;
			}
		}
		this.__listeners.push(listener);
		this.__priorities.push(priority);
		this.__repeat.push(!once);
	}
	,remove: function(listener) {
		var i = this.__listeners.length;
		while(--i >= 0) if(Reflect.compareMethods(this.__listeners[i],listener)) {
			this.__listeners.splice(i,1);
			this.__priorities.splice(i,1);
			this.__repeat.splice(i,1);
		}
	}
	,dispatch: function(a,a1) {
		this.canceled = false;
		var listeners = this.__listeners;
		var repeat = this.__repeat;
		var i = 0;
		while(i < listeners.length) {
			listeners[i](a,a1);
			if(!repeat[i]) this.remove(listeners[i]); else i++;
			if(this.canceled) break;
		}
	}
	,__class__: lime_app_Event_$Int_$Int_$Void
};
var lime_app_Event_$Int_$Void = function() {
	this.canceled = false;
	this.__listeners = [];
	this.__priorities = [];
	this.__repeat = [];
};
$hxClasses["lime.app.Event_Int_Void"] = lime_app_Event_$Int_$Void;
lime_app_Event_$Int_$Void.__name__ = true;
lime_app_Event_$Int_$Void.prototype = {
	add: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		var _g1 = 0;
		var _g = this.__priorities.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(priority > this.__priorities[i]) {
				this.__listeners.splice(i,0,listener);
				this.__priorities.splice(i,0,priority);
				this.__repeat.splice(i,0,!once);
				return;
			}
		}
		this.__listeners.push(listener);
		this.__priorities.push(priority);
		this.__repeat.push(!once);
	}
	,remove: function(listener) {
		var i = this.__listeners.length;
		while(--i >= 0) if(Reflect.compareMethods(this.__listeners[i],listener)) {
			this.__listeners.splice(i,1);
			this.__priorities.splice(i,1);
			this.__repeat.splice(i,1);
		}
	}
	,dispatch: function(a) {
		this.canceled = false;
		var listeners = this.__listeners;
		var repeat = this.__repeat;
		var i = 0;
		while(i < listeners.length) {
			listeners[i](a);
			if(!repeat[i]) this.remove(listeners[i]); else i++;
			if(this.canceled) break;
		}
	}
	,__class__: lime_app_Event_$Int_$Void
};
var lime_app_Event_$Int_$lime_$ui_$JoystickHatPosition_$Void = function() {
	this.canceled = false;
	this.__listeners = [];
	this.__priorities = [];
	this.__repeat = [];
};
$hxClasses["lime.app.Event_Int_lime_ui_JoystickHatPosition_Void"] = lime_app_Event_$Int_$lime_$ui_$JoystickHatPosition_$Void;
lime_app_Event_$Int_$lime_$ui_$JoystickHatPosition_$Void.__name__ = true;
lime_app_Event_$Int_$lime_$ui_$JoystickHatPosition_$Void.prototype = {
	add: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		var _g1 = 0;
		var _g = this.__priorities.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(priority > this.__priorities[i]) {
				this.__listeners.splice(i,0,listener);
				this.__priorities.splice(i,0,priority);
				this.__repeat.splice(i,0,!once);
				return;
			}
		}
		this.__listeners.push(listener);
		this.__priorities.push(priority);
		this.__repeat.push(!once);
	}
	,__class__: lime_app_Event_$Int_$lime_$ui_$JoystickHatPosition_$Void
};
var lime_app_Event_$String_$Int_$Int_$Void = function() {
	this.canceled = false;
	this.__listeners = [];
	this.__priorities = [];
	this.__repeat = [];
};
$hxClasses["lime.app.Event_String_Int_Int_Void"] = lime_app_Event_$String_$Int_$Int_$Void;
lime_app_Event_$String_$Int_$Int_$Void.__name__ = true;
lime_app_Event_$String_$Int_$Int_$Void.prototype = {
	add: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		var _g1 = 0;
		var _g = this.__priorities.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(priority > this.__priorities[i]) {
				this.__listeners.splice(i,0,listener);
				this.__priorities.splice(i,0,priority);
				this.__repeat.splice(i,0,!once);
				return;
			}
		}
		this.__listeners.push(listener);
		this.__priorities.push(priority);
		this.__repeat.push(!once);
	}
	,__class__: lime_app_Event_$String_$Int_$Int_$Void
};
var lime_app_Event_$String_$Void = function() {
	this.canceled = false;
	this.__listeners = [];
	this.__priorities = [];
	this.__repeat = [];
};
$hxClasses["lime.app.Event_String_Void"] = lime_app_Event_$String_$Void;
lime_app_Event_$String_$Void.__name__ = true;
lime_app_Event_$String_$Void.prototype = {
	add: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		var _g1 = 0;
		var _g = this.__priorities.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(priority > this.__priorities[i]) {
				this.__listeners.splice(i,0,listener);
				this.__priorities.splice(i,0,priority);
				this.__repeat.splice(i,0,!once);
				return;
			}
		}
		this.__listeners.push(listener);
		this.__priorities.push(priority);
		this.__repeat.push(!once);
	}
	,has: function(listener) {
		var _g = 0;
		var _g1 = this.__listeners;
		while(_g < _g1.length) {
			var l = _g1[_g];
			++_g;
			if(Reflect.compareMethods(l,listener)) return true;
		}
		return false;
	}
	,remove: function(listener) {
		var i = this.__listeners.length;
		while(--i >= 0) if(Reflect.compareMethods(this.__listeners[i],listener)) {
			this.__listeners.splice(i,1);
			this.__priorities.splice(i,1);
			this.__repeat.splice(i,1);
		}
	}
	,dispatch: function(a) {
		this.canceled = false;
		var listeners = this.__listeners;
		var repeat = this.__repeat;
		var i = 0;
		while(i < listeners.length) {
			listeners[i](a);
			if(!repeat[i]) this.remove(listeners[i]); else i++;
			if(this.canceled) break;
		}
	}
	,__class__: lime_app_Event_$String_$Void
};
var lime_app_Event_$lime_$graphics_$RenderContext_$Void = function() {
	this.canceled = false;
	this.__listeners = [];
	this.__priorities = [];
	this.__repeat = [];
};
$hxClasses["lime.app.Event_lime_graphics_RenderContext_Void"] = lime_app_Event_$lime_$graphics_$RenderContext_$Void;
lime_app_Event_$lime_$graphics_$RenderContext_$Void.__name__ = true;
lime_app_Event_$lime_$graphics_$RenderContext_$Void.prototype = {
	add: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		var _g1 = 0;
		var _g = this.__priorities.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(priority > this.__priorities[i]) {
				this.__listeners.splice(i,0,listener);
				this.__priorities.splice(i,0,priority);
				this.__repeat.splice(i,0,!once);
				return;
			}
		}
		this.__listeners.push(listener);
		this.__priorities.push(priority);
		this.__repeat.push(!once);
	}
	,remove: function(listener) {
		var i = this.__listeners.length;
		while(--i >= 0) if(Reflect.compareMethods(this.__listeners[i],listener)) {
			this.__listeners.splice(i,1);
			this.__priorities.splice(i,1);
			this.__repeat.splice(i,1);
		}
	}
	,dispatch: function(a) {
		this.canceled = false;
		var listeners = this.__listeners;
		var repeat = this.__repeat;
		var i = 0;
		while(i < listeners.length) {
			listeners[i](a);
			if(!repeat[i]) this.remove(listeners[i]); else i++;
			if(this.canceled) break;
		}
	}
	,__class__: lime_app_Event_$lime_$graphics_$RenderContext_$Void
};
var lime_app_Event_$lime_$ui_$GamepadAxis_$Float_$Void = function() {
	this.canceled = false;
	this.__listeners = [];
	this.__priorities = [];
	this.__repeat = [];
};
$hxClasses["lime.app.Event_lime_ui_GamepadAxis_Float_Void"] = lime_app_Event_$lime_$ui_$GamepadAxis_$Float_$Void;
lime_app_Event_$lime_$ui_$GamepadAxis_$Float_$Void.__name__ = true;
lime_app_Event_$lime_$ui_$GamepadAxis_$Float_$Void.prototype = {
	add: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		var _g1 = 0;
		var _g = this.__priorities.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(priority > this.__priorities[i]) {
				this.__listeners.splice(i,0,listener);
				this.__priorities.splice(i,0,priority);
				this.__repeat.splice(i,0,!once);
				return;
			}
		}
		this.__listeners.push(listener);
		this.__priorities.push(priority);
		this.__repeat.push(!once);
	}
	,remove: function(listener) {
		var i = this.__listeners.length;
		while(--i >= 0) if(Reflect.compareMethods(this.__listeners[i],listener)) {
			this.__listeners.splice(i,1);
			this.__priorities.splice(i,1);
			this.__repeat.splice(i,1);
		}
	}
	,dispatch: function(a,a1) {
		this.canceled = false;
		var listeners = this.__listeners;
		var repeat = this.__repeat;
		var i = 0;
		while(i < listeners.length) {
			listeners[i](a,a1);
			if(!repeat[i]) this.remove(listeners[i]); else i++;
			if(this.canceled) break;
		}
	}
	,__class__: lime_app_Event_$lime_$ui_$GamepadAxis_$Float_$Void
};
var lime_app_Event_$lime_$ui_$GamepadButton_$Void = function() {
	this.canceled = false;
	this.__listeners = [];
	this.__priorities = [];
	this.__repeat = [];
};
$hxClasses["lime.app.Event_lime_ui_GamepadButton_Void"] = lime_app_Event_$lime_$ui_$GamepadButton_$Void;
lime_app_Event_$lime_$ui_$GamepadButton_$Void.__name__ = true;
lime_app_Event_$lime_$ui_$GamepadButton_$Void.prototype = {
	add: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		var _g1 = 0;
		var _g = this.__priorities.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(priority > this.__priorities[i]) {
				this.__listeners.splice(i,0,listener);
				this.__priorities.splice(i,0,priority);
				this.__repeat.splice(i,0,!once);
				return;
			}
		}
		this.__listeners.push(listener);
		this.__priorities.push(priority);
		this.__repeat.push(!once);
	}
	,remove: function(listener) {
		var i = this.__listeners.length;
		while(--i >= 0) if(Reflect.compareMethods(this.__listeners[i],listener)) {
			this.__listeners.splice(i,1);
			this.__priorities.splice(i,1);
			this.__repeat.splice(i,1);
		}
	}
	,dispatch: function(a) {
		this.canceled = false;
		var listeners = this.__listeners;
		var repeat = this.__repeat;
		var i = 0;
		while(i < listeners.length) {
			listeners[i](a);
			if(!repeat[i]) this.remove(listeners[i]); else i++;
			if(this.canceled) break;
		}
	}
	,__class__: lime_app_Event_$lime_$ui_$GamepadButton_$Void
};
var lime_app_Event_$lime_$ui_$Gamepad_$Void = function() {
	this.canceled = false;
	this.__listeners = [];
	this.__priorities = [];
	this.__repeat = [];
};
$hxClasses["lime.app.Event_lime_ui_Gamepad_Void"] = lime_app_Event_$lime_$ui_$Gamepad_$Void;
lime_app_Event_$lime_$ui_$Gamepad_$Void.__name__ = true;
lime_app_Event_$lime_$ui_$Gamepad_$Void.prototype = {
	add: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		var _g1 = 0;
		var _g = this.__priorities.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(priority > this.__priorities[i]) {
				this.__listeners.splice(i,0,listener);
				this.__priorities.splice(i,0,priority);
				this.__repeat.splice(i,0,!once);
				return;
			}
		}
		this.__listeners.push(listener);
		this.__priorities.push(priority);
		this.__repeat.push(!once);
	}
	,remove: function(listener) {
		var i = this.__listeners.length;
		while(--i >= 0) if(Reflect.compareMethods(this.__listeners[i],listener)) {
			this.__listeners.splice(i,1);
			this.__priorities.splice(i,1);
			this.__repeat.splice(i,1);
		}
	}
	,dispatch: function(a) {
		this.canceled = false;
		var listeners = this.__listeners;
		var repeat = this.__repeat;
		var i = 0;
		while(i < listeners.length) {
			listeners[i](a);
			if(!repeat[i]) this.remove(listeners[i]); else i++;
			if(this.canceled) break;
		}
	}
	,__class__: lime_app_Event_$lime_$ui_$Gamepad_$Void
};
var lime_app_Event_$lime_$ui_$Joystick_$Void = function() {
	this.canceled = false;
	this.__listeners = [];
	this.__priorities = [];
	this.__repeat = [];
};
$hxClasses["lime.app.Event_lime_ui_Joystick_Void"] = lime_app_Event_$lime_$ui_$Joystick_$Void;
lime_app_Event_$lime_$ui_$Joystick_$Void.__name__ = true;
lime_app_Event_$lime_$ui_$Joystick_$Void.prototype = {
	add: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		var _g1 = 0;
		var _g = this.__priorities.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(priority > this.__priorities[i]) {
				this.__listeners.splice(i,0,listener);
				this.__priorities.splice(i,0,priority);
				this.__repeat.splice(i,0,!once);
				return;
			}
		}
		this.__listeners.push(listener);
		this.__priorities.push(priority);
		this.__repeat.push(!once);
	}
	,remove: function(listener) {
		var i = this.__listeners.length;
		while(--i >= 0) if(Reflect.compareMethods(this.__listeners[i],listener)) {
			this.__listeners.splice(i,1);
			this.__priorities.splice(i,1);
			this.__repeat.splice(i,1);
		}
	}
	,dispatch: function(a) {
		this.canceled = false;
		var listeners = this.__listeners;
		var repeat = this.__repeat;
		var i = 0;
		while(i < listeners.length) {
			listeners[i](a);
			if(!repeat[i]) this.remove(listeners[i]); else i++;
			if(this.canceled) break;
		}
	}
	,__class__: lime_app_Event_$lime_$ui_$Joystick_$Void
};
var lime_app_Event_$lime_$ui_$KeyCode_$lime_$ui_$KeyModifier_$Void = function() {
	this.canceled = false;
	this.__listeners = [];
	this.__priorities = [];
	this.__repeat = [];
};
$hxClasses["lime.app.Event_lime_ui_KeyCode_lime_ui_KeyModifier_Void"] = lime_app_Event_$lime_$ui_$KeyCode_$lime_$ui_$KeyModifier_$Void;
lime_app_Event_$lime_$ui_$KeyCode_$lime_$ui_$KeyModifier_$Void.__name__ = true;
lime_app_Event_$lime_$ui_$KeyCode_$lime_$ui_$KeyModifier_$Void.prototype = {
	add: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		var _g1 = 0;
		var _g = this.__priorities.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(priority > this.__priorities[i]) {
				this.__listeners.splice(i,0,listener);
				this.__priorities.splice(i,0,priority);
				this.__repeat.splice(i,0,!once);
				return;
			}
		}
		this.__listeners.push(listener);
		this.__priorities.push(priority);
		this.__repeat.push(!once);
	}
	,cancel: function() {
		this.canceled = true;
	}
	,remove: function(listener) {
		var i = this.__listeners.length;
		while(--i >= 0) if(Reflect.compareMethods(this.__listeners[i],listener)) {
			this.__listeners.splice(i,1);
			this.__priorities.splice(i,1);
			this.__repeat.splice(i,1);
		}
	}
	,dispatch: function(a,a1) {
		this.canceled = false;
		var listeners = this.__listeners;
		var repeat = this.__repeat;
		var i = 0;
		while(i < listeners.length) {
			listeners[i](a,a1);
			if(!repeat[i]) this.remove(listeners[i]); else i++;
			if(this.canceled) break;
		}
	}
	,__class__: lime_app_Event_$lime_$ui_$KeyCode_$lime_$ui_$KeyModifier_$Void
};
var lime_app_Event_$lime_$ui_$Touch_$Void = function() {
	this.canceled = false;
	this.__listeners = [];
	this.__priorities = [];
	this.__repeat = [];
};
$hxClasses["lime.app.Event_lime_ui_Touch_Void"] = lime_app_Event_$lime_$ui_$Touch_$Void;
lime_app_Event_$lime_$ui_$Touch_$Void.__name__ = true;
lime_app_Event_$lime_$ui_$Touch_$Void.prototype = {
	add: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		var _g1 = 0;
		var _g = this.__priorities.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(priority > this.__priorities[i]) {
				this.__listeners.splice(i,0,listener);
				this.__priorities.splice(i,0,priority);
				this.__repeat.splice(i,0,!once);
				return;
			}
		}
		this.__listeners.push(listener);
		this.__priorities.push(priority);
		this.__repeat.push(!once);
	}
	,remove: function(listener) {
		var i = this.__listeners.length;
		while(--i >= 0) if(Reflect.compareMethods(this.__listeners[i],listener)) {
			this.__listeners.splice(i,1);
			this.__priorities.splice(i,1);
			this.__repeat.splice(i,1);
		}
	}
	,dispatch: function(a) {
		this.canceled = false;
		var listeners = this.__listeners;
		var repeat = this.__repeat;
		var i = 0;
		while(i < listeners.length) {
			listeners[i](a);
			if(!repeat[i]) this.remove(listeners[i]); else i++;
			if(this.canceled) break;
		}
	}
	,__class__: lime_app_Event_$lime_$ui_$Touch_$Void
};
var lime_app_Future = function(work) {
	if(work != null) {
		if(lime_app_Future.__threadPool == null) {
			lime_app_Future.__threadPool = new lime_system_ThreadPool();
			lime_app_Future.__threadPool.doWork.add(lime_app_Future.threadPool_doWork);
			lime_app_Future.__threadPool.onComplete.add(lime_app_Future.threadPool_onComplete);
			lime_app_Future.__threadPool.onError.add(lime_app_Future.threadPool_onError);
		}
		var promise = new lime_app_Promise();
		promise.future = this;
		lime_app_Future.__threadPool.queue({ promise : promise, work : work});
	}
};
$hxClasses["lime.app.Future"] = lime_app_Future;
lime_app_Future.__name__ = true;
lime_app_Future.__threadPool = null;
lime_app_Future.threadPool_doWork = function(state) {
	try {
		var result = state.work();
		lime_app_Future.__threadPool.sendComplete({ promise : state.promise, result : result});
	} catch( e ) {
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		lime_app_Future.__threadPool.sendError({ promise : state.promise, error : e});
	}
};
lime_app_Future.threadPool_onComplete = function(state) {
	state.promise.complete(state.result);
};
lime_app_Future.threadPool_onError = function(state) {
	state.promise.error(state.error);
};
lime_app_Future.prototype = {
	onComplete: function(listener) {
		if(listener != null) {
			if(this.__completed) listener(this.value); else if(!this.__errored) {
				if(this.__completeListeners == null) this.__completeListeners = [];
				this.__completeListeners.push(listener);
			}
		}
		return this;
	}
	,__class__: lime_app_Future
};
var lime_app_Preloader = function() {
	this.total = 0;
	this.loaded = 0;
	this.onProgress = new lime_app_Event_$Int_$Int_$Void();
	this.onComplete = new lime_app_Event_$Void_$Void();
	this.onProgress.add($bind(this,this.update));
};
$hxClasses["lime.app.Preloader"] = lime_app_Preloader;
lime_app_Preloader.__name__ = true;
lime_app_Preloader.prototype = {
	create: function(config) {
	}
	,load: function(urls,types) {
		var url = null;
		var cacheVersion = lime_Assets.cache.version;
		var _g1 = 0;
		var _g = urls.length;
		while(_g1 < _g) {
			var i = _g1++;
			url = urls[i];
			var _g2 = types[i];
			switch(_g2) {
			case "IMAGE":
				if(!lime_app_Preloader.images.exists(url)) {
					var image = new Image();
					lime_app_Preloader.images.set(url,image);
					image.onload = $bind(this,this.image_onLoad);
					image.src = url + "?" + cacheVersion;
					this.total++;
				}
				break;
			case "BINARY":
				if(!lime_app_Preloader.loaders.exists(url)) {
					var loader = new lime_net_HTTPRequest();
					lime_app_Preloader.loaders.set(url,loader);
					this.total++;
				}
				break;
			case "TEXT":
				if(!lime_app_Preloader.loaders.exists(url)) {
					var loader1 = new lime_net_HTTPRequest();
					lime_app_Preloader.loaders.set(url,loader1);
					this.total++;
				}
				break;
			case "FONT":
				this.total++;
				this.loadFont(url);
				break;
			default:
			}
		}
		var $it0 = lime_app_Preloader.loaders.keys();
		while( $it0.hasNext() ) {
			var url1 = $it0.next();
			var loader2 = lime_app_Preloader.loaders.get(url1);
			var future = loader2.load(url1 + "?" + cacheVersion);
			future.onComplete($bind(this,this.loader_onComplete));
		}
		if(this.total == 0) this.start();
	}
	,loadFont: function(font) {
		var _g = this;
		if(window.document.fonts && ($_=window.document.fonts,$bind($_,$_.load))) window.document.fonts.load("1em '" + font + "'").then(function(_) {
			_g.loaded++;
			_g.onProgress.dispatch(_g.loaded,_g.total);
			if(_g.loaded == _g.total) _g.start();
		}); else {
			var node = window.document.createElement("span");
			node.innerHTML = "giItT1WQy@!-/#";
			var style = node.style;
			style.position = "absolute";
			style.left = "-10000px";
			style.top = "-10000px";
			style.fontSize = "300px";
			style.fontFamily = "sans-serif";
			style.fontVariant = "normal";
			style.fontStyle = "normal";
			style.fontWeight = "normal";
			style.letterSpacing = "0";
			window.document.body.appendChild(node);
			var width = node.offsetWidth;
			style.fontFamily = "'" + font + "', sans-serif";
			var interval = null;
			var found = false;
			var checkFont = function() {
				if(node.offsetWidth != width) {
					if(!found) {
						found = true;
						return false;
					}
					_g.loaded++;
					if(interval != null) window.clearInterval(interval);
					node.parentNode.removeChild(node);
					node = null;
					_g.onProgress.dispatch(_g.loaded,_g.total);
					if(_g.loaded == _g.total) _g.start();
					return true;
				}
				return false;
			};
			if(!checkFont()) interval = window.setInterval(checkFont,50);
		}
	}
	,start: function() {
		this.complete = true;
		this.onComplete.dispatch();
	}
	,update: function(loaded,total) {
	}
	,image_onLoad: function(_) {
		this.loaded++;
		this.onProgress.dispatch(this.loaded,this.total);
		if(this.loaded == this.total) this.start();
	}
	,loader_onComplete: function(_) {
		this.loaded++;
		this.onProgress.dispatch(this.loaded,this.total);
		if(this.loaded == this.total) this.start();
	}
	,__class__: lime_app_Preloader
};
var lime_app_Promise = function() {
	this.future = new lime_app_Future();
};
$hxClasses["lime.app.Promise"] = lime_app_Promise;
lime_app_Promise.__name__ = true;
lime_app_Promise.prototype = {
	complete: function(data) {
		if(!this.future.__errored) {
			this.future.__completed = true;
			this.future.value = data;
			if(this.future.__completeListeners != null) {
				var _g = 0;
				var _g1 = this.future.__completeListeners;
				while(_g < _g1.length) {
					var listener = _g1[_g];
					++_g;
					listener(data);
				}
				this.future.__completeListeners = null;
			}
		}
		return this;
	}
	,error: function(msg) {
		if(!this.future.__completed) {
			this.future.__errored = true;
			this.future.__errorMessage = msg;
			if(this.future.__errorListeners != null) {
				var _g = 0;
				var _g1 = this.future.__errorListeners;
				while(_g < _g1.length) {
					var listener = _g1[_g];
					++_g;
					listener(msg);
				}
				this.future.__errorListeners = null;
			}
		}
		return this;
	}
	,progress: function(progress) {
		if(!this.future.__errored && !this.future.__completed) {
			if(this.future.__progressListeners != null) {
				var _g = 0;
				var _g1 = this.future.__progressListeners;
				while(_g < _g1.length) {
					var listener = _g1[_g];
					++_g;
					listener(progress);
				}
			}
		}
		return this;
	}
	,__class__: lime_app_Promise
};
var lime_audio_ALAudioContext = function() { };
$hxClasses["lime.audio.ALAudioContext"] = lime_audio_ALAudioContext;
lime_audio_ALAudioContext.__name__ = true;
var lime_audio_ALCAudioContext = function() { };
$hxClasses["lime.audio.ALCAudioContext"] = lime_audio_ALCAudioContext;
lime_audio_ALCAudioContext.__name__ = true;
var lime_audio_AudioBuffer = function() { };
$hxClasses["lime.audio.AudioBuffer"] = lime_audio_AudioBuffer;
lime_audio_AudioBuffer.__name__ = true;
var lime_audio_AudioContext = $hxClasses["lime.audio.AudioContext"] = { __ename__ : true, __constructs__ : ["OPENAL","HTML5","WEB","FLASH","CUSTOM"] };
lime_audio_AudioContext.OPENAL = function(alc,al) { var $x = ["OPENAL",0,alc,al]; $x.__enum__ = lime_audio_AudioContext; $x.toString = $estr; return $x; };
lime_audio_AudioContext.HTML5 = function(context) { var $x = ["HTML5",1,context]; $x.__enum__ = lime_audio_AudioContext; $x.toString = $estr; return $x; };
lime_audio_AudioContext.WEB = function(context) { var $x = ["WEB",2,context]; $x.__enum__ = lime_audio_AudioContext; $x.toString = $estr; return $x; };
lime_audio_AudioContext.FLASH = function(context) { var $x = ["FLASH",3,context]; $x.__enum__ = lime_audio_AudioContext; $x.toString = $estr; return $x; };
lime_audio_AudioContext.CUSTOM = function(data) { var $x = ["CUSTOM",4,data]; $x.__enum__ = lime_audio_AudioContext; $x.toString = $estr; return $x; };
var lime_audio_AudioManager = function() { };
$hxClasses["lime.audio.AudioManager"] = lime_audio_AudioManager;
lime_audio_AudioManager.__name__ = true;
lime_audio_AudioManager.context = null;
lime_audio_AudioManager.init = function(context) {
	if(lime_audio_AudioManager.context == null) {
		if(context == null) try {
			window.AudioContext = window.AudioContext || window.webkitAudioContext;;
			lime_audio_AudioManager.context = lime_audio_AudioContext.WEB(new AudioContext ());
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			lime_audio_AudioManager.context = lime_audio_AudioContext.HTML5(new lime_audio_HTML5AudioContext());
		} else lime_audio_AudioManager.context = context;
	}
};
var lime_audio_AudioSource = function() { };
$hxClasses["lime.audio.AudioSource"] = lime_audio_AudioSource;
lime_audio_AudioSource.__name__ = true;
lime_audio_AudioSource.prototype = {
	__class__: lime_audio_AudioSource
};
var lime_audio_FlashAudioContext = function() { };
$hxClasses["lime.audio.FlashAudioContext"] = lime_audio_FlashAudioContext;
lime_audio_FlashAudioContext.__name__ = true;
var lime_audio_HTML5AudioContext = function() {
};
$hxClasses["lime.audio.HTML5AudioContext"] = lime_audio_HTML5AudioContext;
lime_audio_HTML5AudioContext.__name__ = true;
lime_audio_HTML5AudioContext.prototype = {
	__class__: lime_audio_HTML5AudioContext
};
var lime_graphics_ConsoleRenderContext = function() { };
$hxClasses["lime.graphics.ConsoleRenderContext"] = lime_graphics_ConsoleRenderContext;
lime_graphics_ConsoleRenderContext.__name__ = true;
lime_graphics_ConsoleRenderContext.prototype = {
	__class__: lime_graphics_ConsoleRenderContext
};
var lime_graphics_FlashRenderContext = function() { };
$hxClasses["lime.graphics.FlashRenderContext"] = lime_graphics_FlashRenderContext;
lime_graphics_FlashRenderContext.__name__ = true;
var lime_graphics_Image = function(buffer,offsetX,offsetY,width,height,color,type) {
	if(height == null) height = -1;
	if(width == null) width = -1;
	if(offsetY == null) offsetY = 0;
	if(offsetX == null) offsetX = 0;
	this.offsetX = offsetX;
	this.offsetY = offsetY;
	this.width = width;
	this.height = height;
	if(type == null) {
		if(lime_app_Application.current != null && lime_app_Application.current.renderers[0] != null) {
			var _g = lime_app_Application.current.renderers[0].context;
			switch(_g[1]) {
			case 2:case 1:
				this.type = lime_graphics_ImageType.CANVAS;
				break;
			case 3:
				this.type = lime_graphics_ImageType.FLASH;
				break;
			default:
				this.type = lime_graphics_ImageType.DATA;
			}
		} else this.type = lime_graphics_ImageType.DATA;
	} else this.type = type;
	if(buffer == null) {
		if(width > 0 && height > 0) {
			var _g1 = this.type;
			switch(_g1[1]) {
			case 0:
				this.buffer = new lime_graphics_ImageBuffer(null,width,height);
				lime_graphics_utils_ImageCanvasUtil.createCanvas(this,width,height);
				if(color != null) this.fillRect(new lime_math_Rectangle(0,0,width,height),color);
				break;
			case 1:
				this.buffer = new lime_graphics_ImageBuffer((function($this) {
					var $r;
					var elements = width * height * 4;
					var this1;
					if(elements != null) this1 = new Uint8Array(elements); else this1 = null;
					$r = this1;
					return $r;
				}(this)),width,height);
				if(color != null) this.fillRect(new lime_math_Rectangle(0,0,width,height),color);
				break;
			case 2:
				break;
			default:
			}
		}
	} else this.__fromImageBuffer(buffer);
};
$hxClasses["lime.graphics.Image"] = lime_graphics_Image;
lime_graphics_Image.__name__ = true;
lime_graphics_Image.fromCanvas = function(canvas) {
	if(canvas == null) return null;
	var buffer = new lime_graphics_ImageBuffer(null,canvas.width,canvas.height);
	buffer.set_src(canvas);
	return new lime_graphics_Image(buffer);
};
lime_graphics_Image.fromImageElement = function(image) {
	if(image == null) return null;
	var buffer = new lime_graphics_ImageBuffer(null,image.width,image.height);
	buffer.set_src(image);
	return new lime_graphics_Image(buffer);
};
lime_graphics_Image.prototype = {
	fillRect: function(rect,color,format) {
		rect = this.__clipRect(rect);
		if(this.buffer == null || rect == null) return;
		var _g = this.type;
		switch(_g[1]) {
		case 0:
			lime_graphics_utils_ImageCanvasUtil.fillRect(this,rect,color,format);
			break;
		case 1:
			lime_graphics_utils_ImageCanvasUtil.convertToData(this);
			if(this.buffer.data.length == 0) return;
			lime_graphics_utils_ImageDataUtil.fillRect(this,rect,color,format);
			break;
		case 2:
			rect.offset(this.offsetX,this.offsetY);
			var argb;
			if(format != null) switch(format) {
			case 1:
				argb = color;
				break;
			case 2:
				{
					var bgra = color;
					var argb1 = 0;
					argb1 = (bgra & 255 & 255) << 24 | (bgra >> 8 & 255 & 255) << 16 | (bgra >> 16 & 255 & 255) << 8 | bgra >> 24 & 255 & 255;
					argb = argb1;
				}
				break;
			default:
				{
					var rgba = color;
					var argb2 = 0;
					argb2 = (rgba & 255 & 255) << 24 | (rgba >> 24 & 255 & 255) << 16 | (rgba >> 16 & 255 & 255) << 8 | rgba >> 8 & 255 & 255;
					argb = argb2;
				}
			} else {
				var rgba1 = color;
				var argb3 = 0;
				argb3 = (rgba1 & 255 & 255) << 24 | (rgba1 >> 24 & 255 & 255) << 16 | (rgba1 >> 16 & 255 & 255) << 8 | rgba1 >> 8 & 255 & 255;
				argb = argb3;
			}
			this.buffer.__srcBitmapData.fillRect(rect.__toFlashRectangle(),argb);
			break;
		default:
		}
	}
	,__clipRect: function(r) {
		if(r == null) return null;
		if(r.x < 0) {
			r.width -= -r.x;
			r.x = 0;
			if(r.x + r.width <= 0) return null;
		}
		if(r.y < 0) {
			r.height -= -r.y;
			r.y = 0;
			if(r.y + r.height <= 0) return null;
		}
		if(r.x + r.width >= this.width) {
			r.width -= r.x + r.width - this.width;
			if(r.width <= 0) return null;
		}
		if(r.y + r.height >= this.height) {
			r.height -= r.y + r.height - this.height;
			if(r.height <= 0) return null;
		}
		return r;
	}
	,__fromImageBuffer: function(buffer) {
		this.buffer = buffer;
		if(buffer != null) {
			if(this.width == -1) this.width = buffer.width;
			if(this.height == -1) this.height = buffer.height;
		}
	}
	,get_rect: function() {
		return new lime_math_Rectangle(0,0,this.width,this.height);
	}
	,get_src: function() {
		if(this.buffer.__srcCanvas == null) lime_graphics_utils_ImageCanvasUtil.convertToCanvas(this);
		return this.buffer.get_src();
	}
	,get_transparent: function() {
		if(this.buffer == null) return false;
		return this.buffer.transparent;
	}
	,set_transparent: function(value) {
		if(this.buffer == null) return false;
		return this.buffer.transparent = value;
	}
	,__class__: lime_graphics_Image
};
var lime_graphics_ImageBuffer = function(data,width,height,bitsPerPixel,format) {
	if(bitsPerPixel == null) bitsPerPixel = 32;
	if(height == null) height = 0;
	if(width == null) width = 0;
	this.data = data;
	this.width = width;
	this.height = height;
	this.bitsPerPixel = bitsPerPixel;
	if(format == null) this.format = 0; else this.format = format;
	this.transparent = true;
};
$hxClasses["lime.graphics.ImageBuffer"] = lime_graphics_ImageBuffer;
lime_graphics_ImageBuffer.__name__ = true;
lime_graphics_ImageBuffer.prototype = {
	get_src: function() {
		if(this.__srcImage != null) return this.__srcImage;
		return this.__srcCanvas;
	}
	,set_src: function(value) {
		if(js_Boot.__instanceof(value,Image)) this.__srcImage = value; else if(js_Boot.__instanceof(value,HTMLCanvasElement)) {
			this.__srcCanvas = value;
			this.__srcContext = this.__srcCanvas.getContext("2d");
		}
		return value;
	}
	,get_stride: function() {
		return this.width * 4;
	}
	,__class__: lime_graphics_ImageBuffer
};
var lime_graphics_ImageType = $hxClasses["lime.graphics.ImageType"] = { __ename__ : true, __constructs__ : ["CANVAS","DATA","FLASH","CUSTOM"] };
lime_graphics_ImageType.CANVAS = ["CANVAS",0];
lime_graphics_ImageType.CANVAS.toString = $estr;
lime_graphics_ImageType.CANVAS.__enum__ = lime_graphics_ImageType;
lime_graphics_ImageType.DATA = ["DATA",1];
lime_graphics_ImageType.DATA.toString = $estr;
lime_graphics_ImageType.DATA.__enum__ = lime_graphics_ImageType;
lime_graphics_ImageType.FLASH = ["FLASH",2];
lime_graphics_ImageType.FLASH.toString = $estr;
lime_graphics_ImageType.FLASH.__enum__ = lime_graphics_ImageType;
lime_graphics_ImageType.CUSTOM = ["CUSTOM",3];
lime_graphics_ImageType.CUSTOM.toString = $estr;
lime_graphics_ImageType.CUSTOM.__enum__ = lime_graphics_ImageType;
var lime_graphics_RenderContext = $hxClasses["lime.graphics.RenderContext"] = { __ename__ : true, __constructs__ : ["OPENGL","CANVAS","DOM","FLASH","CAIRO","CONSOLE","CUSTOM","NONE"] };
lime_graphics_RenderContext.OPENGL = function(gl) { var $x = ["OPENGL",0,gl]; $x.__enum__ = lime_graphics_RenderContext; $x.toString = $estr; return $x; };
lime_graphics_RenderContext.CANVAS = function(context) { var $x = ["CANVAS",1,context]; $x.__enum__ = lime_graphics_RenderContext; $x.toString = $estr; return $x; };
lime_graphics_RenderContext.DOM = function(element) { var $x = ["DOM",2,element]; $x.__enum__ = lime_graphics_RenderContext; $x.toString = $estr; return $x; };
lime_graphics_RenderContext.FLASH = function(stage) { var $x = ["FLASH",3,stage]; $x.__enum__ = lime_graphics_RenderContext; $x.toString = $estr; return $x; };
lime_graphics_RenderContext.CAIRO = function(cairo) { var $x = ["CAIRO",4,cairo]; $x.__enum__ = lime_graphics_RenderContext; $x.toString = $estr; return $x; };
lime_graphics_RenderContext.CONSOLE = function(context) { var $x = ["CONSOLE",5,context]; $x.__enum__ = lime_graphics_RenderContext; $x.toString = $estr; return $x; };
lime_graphics_RenderContext.CUSTOM = function(data) { var $x = ["CUSTOM",6,data]; $x.__enum__ = lime_graphics_RenderContext; $x.toString = $estr; return $x; };
lime_graphics_RenderContext.NONE = ["NONE",7];
lime_graphics_RenderContext.NONE.toString = $estr;
lime_graphics_RenderContext.NONE.__enum__ = lime_graphics_RenderContext;
var lime_graphics_Renderer = function(window) {
	this.onRender = new lime_app_Event_$Void_$Void();
	this.onContextRestored = new lime_app_Event_$lime_$graphics_$RenderContext_$Void();
	this.onContextLost = new lime_app_Event_$Void_$Void();
	this.window = window;
	this.backend = new lime__$backend_html5_HTML5Renderer(this);
	this.window.renderer = this;
};
$hxClasses["lime.graphics.Renderer"] = lime_graphics_Renderer;
lime_graphics_Renderer.__name__ = true;
lime_graphics_Renderer.prototype = {
	create: function() {
		this.backend.create();
	}
	,flip: function() {
		this.backend.flip();
	}
	,__class__: lime_graphics_Renderer
};
var lime_graphics_RendererType = $hxClasses["lime.graphics.RendererType"] = { __ename__ : true, __constructs__ : ["OPENGL","CANVAS","DOM","FLASH","CAIRO","CONSOLE","CUSTOM"] };
lime_graphics_RendererType.OPENGL = ["OPENGL",0];
lime_graphics_RendererType.OPENGL.toString = $estr;
lime_graphics_RendererType.OPENGL.__enum__ = lime_graphics_RendererType;
lime_graphics_RendererType.CANVAS = ["CANVAS",1];
lime_graphics_RendererType.CANVAS.toString = $estr;
lime_graphics_RendererType.CANVAS.__enum__ = lime_graphics_RendererType;
lime_graphics_RendererType.DOM = ["DOM",2];
lime_graphics_RendererType.DOM.toString = $estr;
lime_graphics_RendererType.DOM.__enum__ = lime_graphics_RendererType;
lime_graphics_RendererType.FLASH = ["FLASH",3];
lime_graphics_RendererType.FLASH.toString = $estr;
lime_graphics_RendererType.FLASH.__enum__ = lime_graphics_RendererType;
lime_graphics_RendererType.CAIRO = ["CAIRO",4];
lime_graphics_RendererType.CAIRO.toString = $estr;
lime_graphics_RendererType.CAIRO.__enum__ = lime_graphics_RendererType;
lime_graphics_RendererType.CONSOLE = ["CONSOLE",5];
lime_graphics_RendererType.CONSOLE.toString = $estr;
lime_graphics_RendererType.CONSOLE.__enum__ = lime_graphics_RendererType;
lime_graphics_RendererType.CUSTOM = ["CUSTOM",6];
lime_graphics_RendererType.CUSTOM.toString = $estr;
lime_graphics_RendererType.CUSTOM.__enum__ = lime_graphics_RendererType;
var lime_graphics_cairo_Cairo = function() { };
$hxClasses["lime.graphics.cairo.Cairo"] = lime_graphics_cairo_Cairo;
lime_graphics_cairo_Cairo.__name__ = true;
lime_graphics_cairo_Cairo.prototype = {
	arc: function(xc,yc,radius,angle1,angle2) {
	}
	,clip: function() {
	}
	,curveTo: function(x1,y1,x2,y2,x3,y3) {
	}
	,identityMatrix: function() {
	}
	,lineTo: function(x,y) {
	}
	,moveTo: function(x,y) {
	}
	,newPath: function() {
	}
	,paint: function() {
	}
	,rectangle: function(x,y,width,height) {
	}
	,restore: function() {
	}
	,save: function() {
	}
	,setSourceRGB: function(r,g,b) {
	}
	,get_currentPoint: function() {
		return null;
	}
	,get_hasCurrentPoint: function() {
		return false;
	}
	,set_matrix: function(value) {
		return value;
	}
	,__class__: lime_graphics_cairo_Cairo
};
var lime_graphics_opengl_GL = function() { };
$hxClasses["lime.graphics.opengl.GL"] = lime_graphics_opengl_GL;
lime_graphics_opengl_GL.__name__ = true;
lime_graphics_opengl_GL.context = null;
var lime_graphics_utils_ImageCanvasUtil = function() { };
$hxClasses["lime.graphics.utils.ImageCanvasUtil"] = lime_graphics_utils_ImageCanvasUtil;
lime_graphics_utils_ImageCanvasUtil.__name__ = true;
lime_graphics_utils_ImageCanvasUtil.convertToCanvas = function(image) {
	var buffer = image.buffer;
	if(buffer.__srcImage != null) {
		if(buffer.__srcCanvas == null) {
			lime_graphics_utils_ImageCanvasUtil.createCanvas(image,buffer.__srcImage.width,buffer.__srcImage.height);
			buffer.__srcContext.drawImage(buffer.__srcImage,0,0);
		}
		buffer.__srcImage = null;
	} else if(buffer.data != null && buffer.__srcCanvas == null) {
		lime_graphics_utils_ImageCanvasUtil.createCanvas(image,buffer.width,buffer.height);
		lime_graphics_utils_ImageCanvasUtil.createImageData(image);
	} else if(buffer.data == null && buffer.__srcImageData != null) buffer.data = buffer.__srcImageData.data;
};
lime_graphics_utils_ImageCanvasUtil.convertToData = function(image) {
	if(image.buffer.data == null) {
		lime_graphics_utils_ImageCanvasUtil.convertToCanvas(image);
		lime_graphics_utils_ImageCanvasUtil.sync(image,false);
		lime_graphics_utils_ImageCanvasUtil.createImageData(image);
		image.buffer.__srcCanvas = null;
		image.buffer.__srcContext = null;
	}
};
lime_graphics_utils_ImageCanvasUtil.createCanvas = function(image,width,height) {
	var buffer = image.buffer;
	if(buffer.__srcCanvas == null) {
		buffer.__srcCanvas = window.document.createElement("canvas");
		buffer.__srcCanvas.width = width;
		buffer.__srcCanvas.height = height;
		if(!image.get_transparent()) {
			if(!image.get_transparent()) buffer.__srcCanvas.setAttribute("moz-opaque","true");
			buffer.__srcContext = buffer.__srcCanvas.getContext ("2d", { alpha: false });
		} else buffer.__srcContext = buffer.__srcCanvas.getContext("2d");
		buffer.__srcContext.mozImageSmoothingEnabled = false;
		buffer.__srcContext.msImageSmoothingEnabled = false;
		buffer.__srcContext.imageSmoothingEnabled = false;
	}
};
lime_graphics_utils_ImageCanvasUtil.createImageData = function(image) {
	var buffer = image.buffer;
	if(buffer.__srcImageData == null) {
		if(buffer.data == null) buffer.__srcImageData = buffer.__srcContext.getImageData(0,0,buffer.width,buffer.height); else {
			buffer.__srcImageData = buffer.__srcContext.createImageData(buffer.width,buffer.height);
			buffer.__srcImageData.data.set(buffer.data);
		}
		var elements = buffer.__srcImageData.data.buffer;
		var this1;
		if(elements != null) this1 = new Uint8Array(elements); else this1 = null;
		buffer.data = this1;
	}
};
lime_graphics_utils_ImageCanvasUtil.fillRect = function(image,rect,color,format) {
	lime_graphics_utils_ImageCanvasUtil.convertToCanvas(image);
	lime_graphics_utils_ImageCanvasUtil.sync(image,true);
	if(rect.x == 0 && rect.y == 0 && rect.width == image.width && rect.height == image.height) {
		if(image.get_transparent() && (color & 255) == 0) {
			image.buffer.__srcCanvas.width = image.buffer.width;
			return;
		}
	}
	var r;
	var g;
	var b;
	var a;
	if(format == 1) {
		r = color >> 16 & 255;
		g = color >> 8 & 255;
		b = color & 255;
		if(image.get_transparent()) a = color >> 24 & 255; else a = 255;
	} else {
		r = color >> 24 & 255;
		g = color >> 16 & 255;
		b = color >> 8 & 255;
		if(image.get_transparent()) a = color & 255; else a = 255;
	}
	image.buffer.__srcContext.fillStyle = "rgba(" + r + ", " + g + ", " + b + ", " + a / 255 + ")";
	image.buffer.__srcContext.fillRect(rect.x + image.offsetX,rect.y + image.offsetY,rect.width + image.offsetX,rect.height + image.offsetY);
};
lime_graphics_utils_ImageCanvasUtil.sync = function(image,clear) {
	if(image.dirty && image.buffer.__srcImageData != null && image.type != lime_graphics_ImageType.DATA) {
		image.buffer.__srcContext.putImageData(image.buffer.__srcImageData,0,0);
		image.buffer.data = null;
		image.dirty = false;
	}
	if(clear) {
		image.buffer.__srcImageData = null;
		image.buffer.data = null;
	}
};
var lime_graphics_utils_ImageDataUtil = function() { };
$hxClasses["lime.graphics.utils.ImageDataUtil"] = lime_graphics_utils_ImageDataUtil;
lime_graphics_utils_ImageDataUtil.__name__ = true;
lime_graphics_utils_ImageDataUtil.fillRect = function(image,rect,color,format) {
	var fillColor;
	switch(format) {
	case 1:
		{
			var argb = color;
			var rgba = 0;
			rgba = (argb >> 16 & 255 & 255) << 24 | (argb >> 8 & 255 & 255) << 16 | (argb & 255 & 255) << 8 | argb >> 24 & 255 & 255;
			fillColor = rgba;
		}
		break;
	case 2:
		{
			var bgra = color;
			var rgba1 = 0;
			rgba1 = (bgra >> 8 & 255 & 255) << 24 | (bgra >> 16 & 255 & 255) << 16 | (bgra >> 24 & 255 & 255) << 8 | bgra & 255 & 255;
			fillColor = rgba1;
		}
		break;
	default:
		fillColor = color;
	}
	if(!image.get_transparent()) {
		fillColor = (fillColor >> 24 & 255 & 255) << 24 | (fillColor >> 16 & 255 & 255) << 16 | (fillColor >> 8 & 255 & 255) << 8 | 255;
		255;
	}
	var data = image.buffer.data;
	if(data == null) return;
	var format1 = image.buffer.format;
	var premultiplied = image.buffer.premultiplied;
	var dataView = new lime_graphics_utils__$ImageDataUtil_ImageDataView(image,rect);
	var row;
	var _g1 = 0;
	var _g = dataView.height;
	while(_g1 < _g) {
		var y = _g1++;
		row = dataView.offset + dataView.stride * y;
		var _g3 = 0;
		var _g2 = dataView.width;
		while(_g3 < _g2) {
			var x = _g3++;
			var offset = row + x * 4;
			if(premultiplied) {
				if((fillColor & 255) == 0) {
					if(fillColor != 0) fillColor = 0;
				} else if((fillColor & 255) != 255) {
					lime_math_color__$RGBA_RGBA_$Impl_$.a16 = lime_math_color__$RGBA_RGBA_$Impl_$.__alpha16[fillColor & 255];
					fillColor = ((fillColor >> 24 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.a16 >> 16 & 255) << 24 | ((fillColor >> 16 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.a16 >> 16 & 255) << 16 | ((fillColor >> 8 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.a16 >> 16 & 255) << 8 | fillColor & 255 & 255;
				}
			}
			switch(format1) {
			case 2:
				data[offset] = fillColor >> 8 & 255;
				data[offset + 1] = fillColor >> 16 & 255;
				data[offset + 2] = fillColor >> 24 & 255;
				data[offset + 3] = fillColor & 255;
				break;
			case 0:
				data[offset] = fillColor >> 24 & 255;
				data[offset + 1] = fillColor >> 16 & 255;
				data[offset + 2] = fillColor >> 8 & 255;
				data[offset + 3] = fillColor & 255;
				break;
			case 1:
				data[offset] = fillColor & 255;
				data[offset + 1] = fillColor >> 24 & 255;
				data[offset + 2] = fillColor >> 16 & 255;
				data[offset + 3] = fillColor >> 8 & 255;
				break;
			}
		}
	}
	image.dirty = true;
};
var lime_graphics_utils__$ImageDataUtil_ImageDataView = function(image,rect) {
	this.image = image;
	if(rect == null) this.rect = image.get_rect(); else {
		if(rect.x < 0) rect.x = 0;
		if(rect.y < 0) rect.y = 0;
		if(rect.x + rect.width > image.width) rect.width = image.width - rect.x;
		if(rect.y + rect.height > image.height) rect.height = image.height - rect.y;
		if(rect.width < 0) rect.width = 0;
		if(rect.height < 0) rect.height = 0;
		this.rect = rect;
	}
	this.stride = image.buffer.get_stride();
	this.x = Math.ceil(this.rect.x);
	this.y = Math.ceil(this.rect.y);
	this.width = Math.floor(this.rect.width);
	this.height = Math.floor(this.rect.height);
	this.offset = this.stride * (this.y + image.offsetY) + (this.x + image.offsetX) * 4;
};
$hxClasses["lime.graphics.utils._ImageDataUtil.ImageDataView"] = lime_graphics_utils__$ImageDataUtil_ImageDataView;
lime_graphics_utils__$ImageDataUtil_ImageDataView.__name__ = true;
lime_graphics_utils__$ImageDataUtil_ImageDataView.prototype = {
	__class__: lime_graphics_utils__$ImageDataUtil_ImageDataView
};
var lime_math_Matrix3 = function(a,b,c,d,tx,ty) {
	if(ty == null) ty = 0;
	if(tx == null) tx = 0;
	if(d == null) d = 1;
	if(c == null) c = 0;
	if(b == null) b = 0;
	if(a == null) a = 1;
	this.a = a;
	this.b = b;
	this.c = c;
	this.d = d;
	this.tx = tx;
	this.ty = ty;
};
$hxClasses["lime.math.Matrix3"] = lime_math_Matrix3;
lime_math_Matrix3.__name__ = true;
lime_math_Matrix3.prototype = {
	__class__: lime_math_Matrix3
};
var lime_math_Rectangle = function(x,y,width,height) {
	if(height == null) height = 0;
	if(width == null) width = 0;
	if(y == null) y = 0;
	if(x == null) x = 0;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
};
$hxClasses["lime.math.Rectangle"] = lime_math_Rectangle;
lime_math_Rectangle.__name__ = true;
lime_math_Rectangle.prototype = {
	offset: function(dx,dy) {
		this.x += dx;
		this.y += dy;
	}
	,__toFlashRectangle: function() {
		return null;
	}
	,__class__: lime_math_Rectangle
};
var lime_math_Vector2 = function(x,y) {
	if(y == null) y = 0;
	if(x == null) x = 0;
	this.x = x;
	this.y = y;
};
$hxClasses["lime.math.Vector2"] = lime_math_Vector2;
lime_math_Vector2.__name__ = true;
lime_math_Vector2.prototype = {
	__class__: lime_math_Vector2
};
var lime_math_Vector4 = function() { };
$hxClasses["lime.math.Vector4"] = lime_math_Vector4;
lime_math_Vector4.__name__ = true;
var lime_math_color__$RGBA_RGBA_$Impl_$ = {};
$hxClasses["lime.math.color._RGBA.RGBA_Impl_"] = lime_math_color__$RGBA_RGBA_$Impl_$;
lime_math_color__$RGBA_RGBA_$Impl_$.__name__ = true;
lime_math_color__$RGBA_RGBA_$Impl_$.__alpha16 = null;
lime_math_color__$RGBA_RGBA_$Impl_$.__clamp = null;
lime_math_color__$RGBA_RGBA_$Impl_$.a16 = null;
var lime_net_HTTPRequest = function() {
	this.promise = new lime_app_Promise();
};
$hxClasses["lime.net.HTTPRequest"] = lime_net_HTTPRequest;
lime_net_HTTPRequest.__name__ = true;
lime_net_HTTPRequest.prototype = {
	load: function(url) {
		var _g = this;
		this.bytesLoaded = 0;
		this.bytesTotal = 0;
		var request = new XMLHttpRequest();
		request.addEventListener("progress",$bind(this,this.request_onProgress),false);
		request.onreadystatechange = function() {
			if(request.readyState != 4) return;
			if(request.status != null && request.status >= 200 && request.status <= 400) {
				_g.bytes = lime_utils_Bytes.ofData(request.response);
				_g.promise.complete(_g.bytes);
			} else _g.promise.error(request.status);
		};
		request.open("GET",url,true);
		request.responseType = "arraybuffer";
		request.send("");
		return this.promise.future;
	}
	,request_onProgress: function(event) {
		this.promise.progress(event.loaded / event.total);
	}
	,__class__: lime_net_HTTPRequest
};
var lime_system_Clipboard = function() { };
$hxClasses["lime.system.Clipboard"] = lime_system_Clipboard;
lime_system_Clipboard.__name__ = true;
lime_system_Clipboard.get_text = function() {
	return null;
};
lime_system_Clipboard.set_text = function(value) {
	return null;
};
var lime_system_System = function() { };
$hxClasses["lime.system.System"] = lime_system_System;
lime_system_System.__name__ = true;
lime_system_System.embed = $hx_exports.lime.embed = function(element,width,height,background,assetsPrefix) {
	var htmlElement = null;
	if(typeof(element) == "string") htmlElement = window.document.getElementById(js_Boot.__cast(element , String)); else if(element == null) htmlElement = window.document.createElement("div"); else htmlElement = element;
	var color = null;
	if(background != null) {
		background = StringTools.replace(background,"#","");
		if(background.indexOf("0x") > -1) color = Std.parseInt(background); else color = Std.parseInt("0x" + background);
	}
	if(width == null) width = 0;
	if(height == null) height = 0;
	ApplicationMain.config.windows[0].background = color;
	ApplicationMain.config.windows[0].element = htmlElement;
	ApplicationMain.config.windows[0].width = width;
	ApplicationMain.config.windows[0].height = height;
	ApplicationMain.config.assetsPrefix = assetsPrefix;
	ApplicationMain.create();
};
lime_system_System.getTimer = function() {
	return new Date().getTime();
};
var lime_system_ThreadPool = function(minThreads,maxThreads) {
	if(maxThreads == null) maxThreads = 1;
	if(minThreads == null) minThreads = 0;
	this.onError = new lime_app_Event_$Dynamic_$Void();
	this.onComplete = new lime_app_Event_$Dynamic_$Void();
	this.doWork = new lime_app_Event_$Dynamic_$Void();
	this.minThreads = minThreads;
	this.maxThreads = maxThreads;
	this.currentThreads = 0;
};
$hxClasses["lime.system.ThreadPool"] = lime_system_ThreadPool;
lime_system_ThreadPool.__name__ = true;
lime_system_ThreadPool.prototype = {
	queue: function(state) {
		this.doWork.dispatch(state);
	}
	,sendComplete: function(state) {
		this.onComplete.dispatch(state);
	}
	,sendError: function(state) {
		this.onError.dispatch(state);
	}
	,__class__: lime_system_ThreadPool
};
var lime_text_Font = function() { };
$hxClasses["lime.text.Font"] = lime_text_Font;
lime_text_Font.__name__ = true;
var lime_ui_Gamepad = function(id) {
	this.onDisconnect = new lime_app_Event_$Void_$Void();
	this.onButtonUp = new lime_app_Event_$lime_$ui_$GamepadButton_$Void();
	this.onButtonDown = new lime_app_Event_$lime_$ui_$GamepadButton_$Void();
	this.onAxisMove = new lime_app_Event_$lime_$ui_$GamepadAxis_$Float_$Void();
	this.id = id;
	this.connected = true;
};
$hxClasses["lime.ui.Gamepad"] = lime_ui_Gamepad;
lime_ui_Gamepad.__name__ = true;
lime_ui_Gamepad.__connect = function(id) {
	if(!lime_ui_Gamepad.devices.h.hasOwnProperty(id)) {
		var gamepad = new lime_ui_Gamepad(id);
		lime_ui_Gamepad.devices.h[id] = gamepad;
		lime_ui_Gamepad.onConnect.dispatch(gamepad);
	}
};
lime_ui_Gamepad.__disconnect = function(id) {
	var gamepad = lime_ui_Gamepad.devices.h[id];
	if(gamepad != null) gamepad.connected = false;
	lime_ui_Gamepad.devices.remove(id);
	if(gamepad != null) gamepad.onDisconnect.dispatch();
};
lime_ui_Gamepad.prototype = {
	get_guid: function() {
		var devices = lime_ui_Joystick.__getDeviceData();
		return devices[this.id].id;
	}
	,get_name: function() {
		var devices = lime_ui_Joystick.__getDeviceData();
		return devices[this.id].id;
	}
	,__class__: lime_ui_Gamepad
};
var lime_ui_Joystick = function(id) {
	this.onTrackballMove = new lime_app_Event_$Int_$Float_$Void();
	this.onHatMove = new lime_app_Event_$Int_$lime_$ui_$JoystickHatPosition_$Void();
	this.onDisconnect = new lime_app_Event_$Void_$Void();
	this.onButtonUp = new lime_app_Event_$Int_$Void();
	this.onButtonDown = new lime_app_Event_$Int_$Void();
	this.onAxisMove = new lime_app_Event_$Int_$Float_$Void();
	this.id = id;
	this.connected = true;
};
$hxClasses["lime.ui.Joystick"] = lime_ui_Joystick;
lime_ui_Joystick.__name__ = true;
lime_ui_Joystick.__connect = function(id) {
	if(!lime_ui_Joystick.devices.h.hasOwnProperty(id)) {
		var joystick = new lime_ui_Joystick(id);
		lime_ui_Joystick.devices.h[id] = joystick;
		lime_ui_Joystick.onConnect.dispatch(joystick);
	}
};
lime_ui_Joystick.__disconnect = function(id) {
	var joystick = lime_ui_Joystick.devices.h[id];
	if(joystick != null) joystick.connected = false;
	lime_ui_Joystick.devices.remove(id);
	if(joystick != null) joystick.onDisconnect.dispatch();
};
lime_ui_Joystick.__getDeviceData = function() {
	if(navigator.getGamepads) return navigator.getGamepads(); else if(navigator.webkitGetGamepads) return navigator.webkitGetGamepads(); else return null;
};
lime_ui_Joystick.prototype = {
	__class__: lime_ui_Joystick
};
var lime_ui__$KeyModifier_KeyModifier_$Impl_$ = {};
$hxClasses["lime.ui._KeyModifier.KeyModifier_Impl_"] = lime_ui__$KeyModifier_KeyModifier_$Impl_$;
lime_ui__$KeyModifier_KeyModifier_$Impl_$.__name__ = true;
lime_ui__$KeyModifier_KeyModifier_$Impl_$.get_altKey = function(this1) {
	return (this1 & 256) > 0 || (this1 & 512) > 0;
};
lime_ui__$KeyModifier_KeyModifier_$Impl_$.get_ctrlKey = function(this1) {
	return (this1 & 64) > 0 || (this1 & 128) > 0;
};
lime_ui__$KeyModifier_KeyModifier_$Impl_$.get_metaKey = function(this1) {
	return (this1 & 1024) > 0 || (this1 & 2048) > 0;
};
lime_ui__$KeyModifier_KeyModifier_$Impl_$.get_shiftKey = function(this1) {
	return (this1 & 1) > 0 || (this1 & 2) > 0;
};
var lime_ui_Mouse = function() { };
$hxClasses["lime.ui.Mouse"] = lime_ui_Mouse;
lime_ui_Mouse.__name__ = true;
lime_ui_Mouse.set_cursor = function(value) {
	return lime__$backend_html5_HTML5Mouse.set_cursor(value);
};
var lime_ui_MouseCursor = $hxClasses["lime.ui.MouseCursor"] = { __ename__ : true, __constructs__ : ["ARROW","CROSSHAIR","DEFAULT","MOVE","POINTER","RESIZE_NESW","RESIZE_NS","RESIZE_NWSE","RESIZE_WE","TEXT","WAIT","WAIT_ARROW","CUSTOM"] };
lime_ui_MouseCursor.ARROW = ["ARROW",0];
lime_ui_MouseCursor.ARROW.toString = $estr;
lime_ui_MouseCursor.ARROW.__enum__ = lime_ui_MouseCursor;
lime_ui_MouseCursor.CROSSHAIR = ["CROSSHAIR",1];
lime_ui_MouseCursor.CROSSHAIR.toString = $estr;
lime_ui_MouseCursor.CROSSHAIR.__enum__ = lime_ui_MouseCursor;
lime_ui_MouseCursor.DEFAULT = ["DEFAULT",2];
lime_ui_MouseCursor.DEFAULT.toString = $estr;
lime_ui_MouseCursor.DEFAULT.__enum__ = lime_ui_MouseCursor;
lime_ui_MouseCursor.MOVE = ["MOVE",3];
lime_ui_MouseCursor.MOVE.toString = $estr;
lime_ui_MouseCursor.MOVE.__enum__ = lime_ui_MouseCursor;
lime_ui_MouseCursor.POINTER = ["POINTER",4];
lime_ui_MouseCursor.POINTER.toString = $estr;
lime_ui_MouseCursor.POINTER.__enum__ = lime_ui_MouseCursor;
lime_ui_MouseCursor.RESIZE_NESW = ["RESIZE_NESW",5];
lime_ui_MouseCursor.RESIZE_NESW.toString = $estr;
lime_ui_MouseCursor.RESIZE_NESW.__enum__ = lime_ui_MouseCursor;
lime_ui_MouseCursor.RESIZE_NS = ["RESIZE_NS",6];
lime_ui_MouseCursor.RESIZE_NS.toString = $estr;
lime_ui_MouseCursor.RESIZE_NS.__enum__ = lime_ui_MouseCursor;
lime_ui_MouseCursor.RESIZE_NWSE = ["RESIZE_NWSE",7];
lime_ui_MouseCursor.RESIZE_NWSE.toString = $estr;
lime_ui_MouseCursor.RESIZE_NWSE.__enum__ = lime_ui_MouseCursor;
lime_ui_MouseCursor.RESIZE_WE = ["RESIZE_WE",8];
lime_ui_MouseCursor.RESIZE_WE.toString = $estr;
lime_ui_MouseCursor.RESIZE_WE.__enum__ = lime_ui_MouseCursor;
lime_ui_MouseCursor.TEXT = ["TEXT",9];
lime_ui_MouseCursor.TEXT.toString = $estr;
lime_ui_MouseCursor.TEXT.__enum__ = lime_ui_MouseCursor;
lime_ui_MouseCursor.WAIT = ["WAIT",10];
lime_ui_MouseCursor.WAIT.toString = $estr;
lime_ui_MouseCursor.WAIT.__enum__ = lime_ui_MouseCursor;
lime_ui_MouseCursor.WAIT_ARROW = ["WAIT_ARROW",11];
lime_ui_MouseCursor.WAIT_ARROW.toString = $estr;
lime_ui_MouseCursor.WAIT_ARROW.__enum__ = lime_ui_MouseCursor;
lime_ui_MouseCursor.CUSTOM = ["CUSTOM",12];
lime_ui_MouseCursor.CUSTOM.toString = $estr;
lime_ui_MouseCursor.CUSTOM.__enum__ = lime_ui_MouseCursor;
var lime_ui_Touch = function(x,y,id,dx,dy,pressure,device) {
	this.x = x;
	this.y = y;
	this.id = id;
	this.dx = dx;
	this.dy = dy;
	this.pressure = pressure;
	this.device = device;
};
$hxClasses["lime.ui.Touch"] = lime_ui_Touch;
lime_ui_Touch.__name__ = true;
lime_ui_Touch.prototype = {
	__class__: lime_ui_Touch
};
var lime_ui_Window = function(config) {
	this.onTextInput = new lime_app_Event_$String_$Void();
	this.onTextEdit = new lime_app_Event_$String_$Int_$Int_$Void();
	this.onRestore = new lime_app_Event_$Void_$Void();
	this.onResize = new lime_app_Event_$Int_$Int_$Void();
	this.onMove = new lime_app_Event_$Float_$Float_$Void();
	this.onMouseWheel = new lime_app_Event_$Float_$Float_$Void();
	this.onMouseUp = new lime_app_Event_$Float_$Float_$Int_$Void();
	this.onMouseMoveRelative = new lime_app_Event_$Float_$Float_$Void();
	this.onMouseMove = new lime_app_Event_$Float_$Float_$Void();
	this.onMouseDown = new lime_app_Event_$Float_$Float_$Int_$Void();
	this.onMinimize = new lime_app_Event_$Void_$Void();
	this.onLeave = new lime_app_Event_$Void_$Void();
	this.onKeyUp = new lime_app_Event_$lime_$ui_$KeyCode_$lime_$ui_$KeyModifier_$Void();
	this.onKeyDown = new lime_app_Event_$lime_$ui_$KeyCode_$lime_$ui_$KeyModifier_$Void();
	this.onFullscreen = new lime_app_Event_$Void_$Void();
	this.onFocusOut = new lime_app_Event_$Void_$Void();
	this.onFocusIn = new lime_app_Event_$Void_$Void();
	this.onEnter = new lime_app_Event_$Void_$Void();
	this.onDropFile = new lime_app_Event_$String_$Void();
	this.onDeactivate = new lime_app_Event_$Void_$Void();
	this.onCreate = new lime_app_Event_$Void_$Void();
	this.onClose = new lime_app_Event_$Void_$Void();
	this.onActivate = new lime_app_Event_$Void_$Void();
	this.config = config;
	this.__width = 0;
	this.__height = 0;
	this.__fullscreen = false;
	this.__scale = 1;
	this.__x = 0;
	this.__y = 0;
	this.__title = "";
	this.id = -1;
	if(config != null) {
		if(Object.prototype.hasOwnProperty.call(config,"width")) this.__width = config.width;
		if(Object.prototype.hasOwnProperty.call(config,"height")) this.__height = config.height;
		if(Object.prototype.hasOwnProperty.call(config,"x")) this.__x = config.x;
		if(Object.prototype.hasOwnProperty.call(config,"y")) this.__y = config.y;
		if(Object.prototype.hasOwnProperty.call(config,"fullscreen")) this.__fullscreen = config.fullscreen;
		if(Object.prototype.hasOwnProperty.call(config,"borderless")) this.__borderless = config.borderless;
		if(Object.prototype.hasOwnProperty.call(config,"resizable")) this.__resizable = config.resizable;
		if(Object.prototype.hasOwnProperty.call(config,"title")) this.__title = config.title;
	}
	this.backend = new lime__$backend_html5_HTML5Window(this);
};
$hxClasses["lime.ui.Window"] = lime_ui_Window;
lime_ui_Window.__name__ = true;
lime_ui_Window.prototype = {
	close: function() {
		this.backend.close();
	}
	,create: function(application) {
		this.application = application;
		this.backend.create(application);
		if(this.renderer != null) this.renderer.create();
	}
	,resize: function(width,height) {
		this.backend.resize(width,height);
		this.__width = width;
		this.__height = height;
	}
	,set_fullscreen: function(value) {
		return this.__fullscreen = this.backend.setFullscreen(value);
	}
	,set_height: function(value) {
		this.resize(this.__width,value);
		return this.__height;
	}
	,set_width: function(value) {
		this.resize(value,this.__height);
		return this.__width;
	}
	,__class__: lime_ui_Window
};
var lime_utils_Bytes = function(length,bytesData) {
	haxe_io_Bytes.call(this,bytesData);
};
$hxClasses["lime.utils.Bytes"] = lime_utils_Bytes;
lime_utils_Bytes.__name__ = true;
lime_utils_Bytes.alloc = function(length) {
	var bytes = haxe_io_Bytes.alloc(length);
	return new lime_utils_Bytes(bytes.length,bytes.b.bufferValue);
};
lime_utils_Bytes.ofData = function(b) {
	var bytes = haxe_io_Bytes.ofData(b);
	return new lime_utils_Bytes(bytes.length,bytes.b.bufferValue);
};
lime_utils_Bytes.__super__ = haxe_io_Bytes;
lime_utils_Bytes.prototype = $extend(haxe_io_Bytes.prototype,{
	__class__: lime_utils_Bytes
});
var openfl_IAssetCache = function() { };
$hxClasses["openfl.IAssetCache"] = openfl_IAssetCache;
openfl_IAssetCache.__name__ = true;
openfl_IAssetCache.prototype = {
	__class__: openfl_IAssetCache
};
var openfl_AssetCache = function() {
	this.__enabled = true;
	this.bitmapData = new haxe_ds_StringMap();
	this.font = new haxe_ds_StringMap();
	this.sound = new haxe_ds_StringMap();
};
$hxClasses["openfl.AssetCache"] = openfl_AssetCache;
openfl_AssetCache.__name__ = true;
openfl_AssetCache.__interfaces__ = [openfl_IAssetCache];
openfl_AssetCache.prototype = {
	getBitmapData: function(id) {
		return this.bitmapData.get(id);
	}
	,hasBitmapData: function(id) {
		return this.bitmapData.exists(id);
	}
	,setBitmapData: function(id,bitmapData) {
		this.bitmapData.set(id,bitmapData);
	}
	,get_enabled: function() {
		return this.__enabled;
	}
	,__class__: openfl_AssetCache
};
var openfl_Assets = function() { };
$hxClasses["openfl.Assets"] = openfl_Assets;
openfl_Assets.__name__ = true;
openfl_Assets.getBitmapData = function(id,useCache) {
	if(useCache == null) useCache = true;
	if(useCache && openfl_Assets.cache.get_enabled() && openfl_Assets.cache.hasBitmapData(id)) {
		var bitmapData = openfl_Assets.cache.getBitmapData(id);
		if(openfl_Assets.isValidBitmapData(bitmapData)) return bitmapData;
	}
	var image = lime_Assets.getImage(id,false);
	if(image != null) {
		var bitmapData1 = openfl_display_BitmapData.fromImage(image);
		if(useCache && openfl_Assets.cache.get_enabled()) openfl_Assets.cache.setBitmapData(id,bitmapData1);
		return bitmapData1;
	}
	return null;
};
openfl_Assets.getText = function(id) {
	return lime_Assets.getText(id);
};
openfl_Assets.isValidBitmapData = function(bitmapData) {
	return bitmapData != null && bitmapData.image != null;
};
var openfl_display_MovieClip = function() {
	openfl_display_Sprite.call(this);
	this.__currentFrame = 0;
	this.__currentLabels = [];
	this.__totalFrames = 0;
	this.enabled = true;
};
$hxClasses["openfl.display.MovieClip"] = openfl_display_MovieClip;
openfl_display_MovieClip.__name__ = true;
openfl_display_MovieClip.__super__ = openfl_display_Sprite;
openfl_display_MovieClip.prototype = $extend(openfl_display_Sprite.prototype,{
	__class__: openfl_display_MovieClip
});
var openfl_display_LoaderInfo = function() {
	openfl_events_EventDispatcher.call(this);
	this.applicationDomain = openfl_system_ApplicationDomain.currentDomain;
	this.bytesLoaded = 0;
	this.bytesTotal = 0;
	this.childAllowsParent = true;
	this.parameters = { };
};
$hxClasses["openfl.display.LoaderInfo"] = openfl_display_LoaderInfo;
openfl_display_LoaderInfo.__name__ = true;
openfl_display_LoaderInfo.create = function(loader) {
	var loaderInfo = new openfl_display_LoaderInfo();
	loaderInfo.uncaughtErrorEvents = new openfl_events_UncaughtErrorEvents();
	if(loader != null) loaderInfo.loader = loader; else loaderInfo.url = openfl_display_LoaderInfo.__rootURL;
	return loaderInfo;
};
openfl_display_LoaderInfo.__super__ = openfl_events_EventDispatcher;
openfl_display_LoaderInfo.prototype = $extend(openfl_events_EventDispatcher.prototype,{
	__class__: openfl_display_LoaderInfo
});
var openfl_system_ApplicationDomain = function(parentDomain) {
	if(parentDomain != null) this.parentDomain = parentDomain; else this.parentDomain = openfl_system_ApplicationDomain.currentDomain;
};
$hxClasses["openfl.system.ApplicationDomain"] = openfl_system_ApplicationDomain;
openfl_system_ApplicationDomain.__name__ = true;
openfl_system_ApplicationDomain.prototype = {
	__class__: openfl_system_ApplicationDomain
};
var openfl_events_UncaughtErrorEvents = function() {
	openfl_events_EventDispatcher.call(this);
};
$hxClasses["openfl.events.UncaughtErrorEvents"] = openfl_events_UncaughtErrorEvents;
openfl_events_UncaughtErrorEvents.__name__ = true;
openfl_events_UncaughtErrorEvents.__super__ = openfl_events_EventDispatcher;
openfl_events_UncaughtErrorEvents.prototype = $extend(openfl_events_EventDispatcher.prototype,{
	__class__: openfl_events_UncaughtErrorEvents
});
var openfl_geom_Matrix = function(a,b,c,d,tx,ty) {
	if(ty == null) ty = 0;
	if(tx == null) tx = 0;
	if(d == null) d = 1;
	if(c == null) c = 0;
	if(b == null) b = 0;
	if(a == null) a = 1;
	this.a = a;
	this.b = b;
	this.c = c;
	this.d = d;
	this.tx = tx;
	this.ty = ty;
};
$hxClasses["openfl.geom.Matrix"] = openfl_geom_Matrix;
openfl_geom_Matrix.__name__ = true;
openfl_geom_Matrix.prototype = {
	clone: function() {
		return new openfl_geom_Matrix(this.a,this.b,this.c,this.d,this.tx,this.ty);
	}
	,copyFrom: function(sourceMatrix) {
		this.a = sourceMatrix.a;
		this.b = sourceMatrix.b;
		this.c = sourceMatrix.c;
		this.d = sourceMatrix.d;
		this.tx = sourceMatrix.tx;
		this.ty = sourceMatrix.ty;
	}
	,deltaTransformPoint: function(point) {
		return new openfl_geom_Point(point.x * this.a + point.y * this.c,point.x * this.b + point.y * this.d);
	}
	,identity: function() {
		this.a = 1;
		this.b = 0;
		this.c = 0;
		this.d = 1;
		this.tx = 0;
		this.ty = 0;
	}
	,invert: function() {
		var norm = this.a * this.d - this.b * this.c;
		if(norm == 0) {
			this.a = this.b = this.c = this.d = 0;
			this.tx = -this.tx;
			this.ty = -this.ty;
		} else {
			norm = 1.0 / norm;
			var a1 = this.d * norm;
			this.d = this.a * norm;
			this.a = a1;
			this.b *= -norm;
			this.c *= -norm;
			var tx1 = -this.a * this.tx - this.c * this.ty;
			this.ty = -this.b * this.tx - this.d * this.ty;
			this.tx = tx1;
		}
		return this;
	}
	,rotate: function(theta) {
		var cos = Math.cos(theta);
		var sin = Math.sin(theta);
		var a1 = this.a * cos - this.b * sin;
		this.b = this.a * sin + this.b * cos;
		this.a = a1;
		var c1 = this.c * cos - this.d * sin;
		this.d = this.c * sin + this.d * cos;
		this.c = c1;
		var tx1 = this.tx * cos - this.ty * sin;
		this.ty = this.tx * sin + this.ty * cos;
		this.tx = tx1;
	}
	,setTo: function(a,b,c,d,tx,ty) {
		this.a = a;
		this.b = b;
		this.c = c;
		this.d = d;
		this.tx = tx;
		this.ty = ty;
	}
	,transformPoint: function(pos) {
		return new openfl_geom_Point(pos.x * this.a + pos.y * this.c + this.tx,pos.x * this.b + pos.y * this.d + this.ty);
	}
	,translate: function(dx,dy) {
		this.tx += dx;
		this.ty += dy;
	}
	,__toMatrix3: function() {
		return new lime_math_Matrix3(this.a,this.b,this.c,this.d,this.tx,this.ty);
	}
	,__transformInversePoint: function(point) {
		var norm = this.a * this.d - this.b * this.c;
		if(norm == 0) {
			point.x = -this.tx;
			point.y = -this.ty;
		} else {
			var px = 1.0 / norm * (this.c * (this.ty - point.y) + this.d * (point.x - this.tx));
			point.y = 1.0 / norm * (this.a * (point.y - this.ty) + this.b * (this.tx - point.x));
			point.x = px;
		}
	}
	,__transformInverseX: function(px,py) {
		var norm = this.a * this.d - this.b * this.c;
		if(norm == 0) return -this.tx; else return 1.0 / norm * (this.c * (this.ty - py) + this.d * (px - this.tx));
	}
	,__transformInverseY: function(px,py) {
		var norm = this.a * this.d - this.b * this.c;
		if(norm == 0) return -this.ty; else return 1.0 / norm * (this.a * (py - this.ty) + this.b * (this.tx - px));
	}
	,__class__: openfl_geom_Matrix
};
var openfl_geom_Point = function(x,y) {
	if(y == null) y = 0;
	if(x == null) x = 0;
	this.x = x;
	this.y = y;
};
$hxClasses["openfl.geom.Point"] = openfl_geom_Point;
openfl_geom_Point.__name__ = true;
openfl_geom_Point.prototype = {
	add: function(v) {
		return new openfl_geom_Point(v.x + this.x,v.y + this.y);
	}
	,clone: function() {
		return new openfl_geom_Point(this.x,this.y);
	}
	,copyFrom: function(sourcePoint) {
		this.x = sourcePoint.x;
		this.y = sourcePoint.y;
	}
	,offset: function(dx,dy) {
		this.x += dx;
		this.y += dy;
	}
	,setTo: function(xa,ya) {
		this.x = xa;
		this.y = ya;
	}
	,__class__: openfl_geom_Point
};
var openfl_geom_ColorTransform = function(redMultiplier,greenMultiplier,blueMultiplier,alphaMultiplier,redOffset,greenOffset,blueOffset,alphaOffset) {
	if(alphaOffset == null) alphaOffset = 0;
	if(blueOffset == null) blueOffset = 0;
	if(greenOffset == null) greenOffset = 0;
	if(redOffset == null) redOffset = 0;
	if(alphaMultiplier == null) alphaMultiplier = 1;
	if(blueMultiplier == null) blueMultiplier = 1;
	if(greenMultiplier == null) greenMultiplier = 1;
	if(redMultiplier == null) redMultiplier = 1;
	this.redMultiplier = redMultiplier;
	this.greenMultiplier = greenMultiplier;
	this.blueMultiplier = blueMultiplier;
	this.alphaMultiplier = alphaMultiplier;
	this.redOffset = redOffset;
	this.greenOffset = greenOffset;
	this.blueOffset = blueOffset;
	this.alphaOffset = alphaOffset;
};
$hxClasses["openfl.geom.ColorTransform"] = openfl_geom_ColorTransform;
openfl_geom_ColorTransform.__name__ = true;
openfl_geom_ColorTransform.prototype = {
	__clone: function() {
		return new openfl_geom_ColorTransform(this.redMultiplier,this.greenMultiplier,this.blueMultiplier,this.alphaMultiplier,this.redOffset,this.greenOffset,this.blueOffset,this.alphaOffset);
	}
	,__combine: function(ct) {
		this.redMultiplier *= ct.redMultiplier;
		this.greenMultiplier *= ct.greenMultiplier;
		this.blueMultiplier *= ct.blueMultiplier;
		this.alphaMultiplier *= ct.alphaMultiplier;
		this.redOffset += ct.redOffset;
		this.greenOffset += ct.greenOffset;
		this.blueOffset += ct.blueOffset;
		this.alphaOffset += ct.alphaOffset;
	}
	,__equals: function(ct,skipAlphaMultiplier) {
		if(skipAlphaMultiplier == null) skipAlphaMultiplier = false;
		return ct != null && this.redMultiplier == ct.redMultiplier && this.greenMultiplier == ct.greenMultiplier && this.blueMultiplier == ct.blueMultiplier && (skipAlphaMultiplier || this.alphaMultiplier == ct.alphaMultiplier) && this.redOffset == ct.redOffset && this.greenOffset == ct.greenOffset && this.blueOffset == ct.blueOffset && this.alphaOffset == ct.alphaOffset;
	}
	,__class__: openfl_geom_ColorTransform
};
var openfl_Lib = function() { };
$hxClasses["openfl.Lib"] = openfl_Lib;
openfl_Lib.__name__ = true;
openfl_Lib.application = null;
openfl_Lib.embed = $hx_exports.openfl.embed = function(elementName,width,height,background,assetsPrefix) {
	lime_system_System.embed(elementName,width,height,background,assetsPrefix);
};
openfl_Lib.getTimer = function() {
	return lime_system_System.getTimer();
};
var openfl_VectorData = function() {
	this.length = 0;
};
$hxClasses["openfl.VectorData"] = openfl_VectorData;
openfl_VectorData.__name__ = true;
openfl_VectorData.prototype = {
	__class__: openfl_VectorData
};
var openfl__$internal_renderer_AbstractMaskManager = function(renderSession) {
	this.renderSession = renderSession;
};
$hxClasses["openfl._internal.renderer.AbstractMaskManager"] = openfl__$internal_renderer_AbstractMaskManager;
openfl__$internal_renderer_AbstractMaskManager.__name__ = true;
openfl__$internal_renderer_AbstractMaskManager.prototype = {
	pushMask: function(mask) {
	}
	,pushRect: function(rect,transform) {
	}
	,popMask: function() {
	}
	,popRect: function() {
	}
	,saveState: function() {
	}
	,restoreState: function() {
	}
	,__class__: openfl__$internal_renderer_AbstractMaskManager
};
var openfl__$internal_renderer_AbstractRenderer = function(width,height) {
	this.width = width;
	this.height = height;
};
$hxClasses["openfl._internal.renderer.AbstractRenderer"] = openfl__$internal_renderer_AbstractRenderer;
openfl__$internal_renderer_AbstractRenderer.__name__ = true;
openfl__$internal_renderer_AbstractRenderer.prototype = {
	render: function(stage) {
	}
	,resize: function(width,height) {
	}
	,__class__: openfl__$internal_renderer_AbstractRenderer
};
var openfl__$internal_renderer_DrawCommandBuffer = function() {
	this.types = [];
	this.b = [];
	this.i = [];
	this.f = [];
	this.o = [];
	this.ff = [];
	this.ii = [];
	this.ts = [];
};
$hxClasses["openfl._internal.renderer.DrawCommandBuffer"] = openfl__$internal_renderer_DrawCommandBuffer;
openfl__$internal_renderer_DrawCommandBuffer.__name__ = true;
openfl__$internal_renderer_DrawCommandBuffer.prototype = {
	append: function(other) {
		var data = new openfl__$internal_renderer_DrawCommandReader(other);
		var _g = 0;
		var _g1 = other.types;
		while(_g < _g1.length) {
			var type = _g1[_g];
			++_g;
			switch(type[1]) {
			case 0:
				var c = data.readBeginBitmapFill();
				this.beginBitmapFill(openfl__$internal_renderer__$DrawCommandReader_BeginBitmapFillView_$Impl_$.get_bitmap(c),openfl__$internal_renderer__$DrawCommandReader_BeginBitmapFillView_$Impl_$.get_matrix(c),openfl__$internal_renderer__$DrawCommandReader_BeginBitmapFillView_$Impl_$.get_repeat(c),openfl__$internal_renderer__$DrawCommandReader_BeginBitmapFillView_$Impl_$.get_smooth(c));
				break;
			case 1:
				var c1 = data.readBeginFill();
				this.beginFill(openfl__$internal_renderer__$DrawCommandReader_BeginFillView_$Impl_$.get_color(c1),openfl__$internal_renderer__$DrawCommandReader_BeginFillView_$Impl_$.get_alpha(c1));
				break;
			case 2:
				var c2 = data.readBeginGradientFill();
				this.beginGradientFill(openfl__$internal_renderer__$DrawCommandReader_BeginGradientFillView_$Impl_$.get_type(c2),openfl__$internal_renderer__$DrawCommandReader_BeginGradientFillView_$Impl_$.get_colors(c2),openfl__$internal_renderer__$DrawCommandReader_BeginGradientFillView_$Impl_$.get_alphas(c2),openfl__$internal_renderer__$DrawCommandReader_BeginGradientFillView_$Impl_$.get_ratios(c2),openfl__$internal_renderer__$DrawCommandReader_BeginGradientFillView_$Impl_$.get_matrix(c2),openfl__$internal_renderer__$DrawCommandReader_BeginGradientFillView_$Impl_$.get_spreadMethod(c2),openfl__$internal_renderer__$DrawCommandReader_BeginGradientFillView_$Impl_$.get_interpolationMethod(c2),openfl__$internal_renderer__$DrawCommandReader_BeginGradientFillView_$Impl_$.get_focalPointRatio(c2));
				break;
			case 3:
				var c3 = data.readCubicCurveTo();
				this.cubicCurveTo(openfl__$internal_renderer__$DrawCommandReader_CubicCurveToView_$Impl_$.get_controlX1(c3),openfl__$internal_renderer__$DrawCommandReader_CubicCurveToView_$Impl_$.get_controlY1(c3),openfl__$internal_renderer__$DrawCommandReader_CubicCurveToView_$Impl_$.get_controlX2(c3),openfl__$internal_renderer__$DrawCommandReader_CubicCurveToView_$Impl_$.get_controlY2(c3),openfl__$internal_renderer__$DrawCommandReader_CubicCurveToView_$Impl_$.get_anchorX(c3),openfl__$internal_renderer__$DrawCommandReader_CubicCurveToView_$Impl_$.get_anchorY(c3));
				break;
			case 4:
				var c4 = data.readCurveTo();
				this.curveTo(openfl__$internal_renderer__$DrawCommandReader_CurveToView_$Impl_$.get_controlX(c4),openfl__$internal_renderer__$DrawCommandReader_CurveToView_$Impl_$.get_controlY(c4),openfl__$internal_renderer__$DrawCommandReader_CurveToView_$Impl_$.get_anchorX(c4),openfl__$internal_renderer__$DrawCommandReader_CurveToView_$Impl_$.get_anchorY(c4));
				break;
			case 5:
				var c5 = data.readDrawCircle();
				this.drawCircle(openfl__$internal_renderer__$DrawCommandReader_DrawCircleView_$Impl_$.get_x(c5),openfl__$internal_renderer__$DrawCommandReader_DrawCircleView_$Impl_$.get_y(c5),openfl__$internal_renderer__$DrawCommandReader_DrawCircleView_$Impl_$.get_radius(c5));
				break;
			case 6:
				var c6 = data.readDrawEllipse();
				this.drawEllipse(openfl__$internal_renderer__$DrawCommandReader_DrawEllipseView_$Impl_$.get_x(c6),openfl__$internal_renderer__$DrawCommandReader_DrawEllipseView_$Impl_$.get_y(c6),openfl__$internal_renderer__$DrawCommandReader_DrawEllipseView_$Impl_$.get_width(c6),openfl__$internal_renderer__$DrawCommandReader_DrawEllipseView_$Impl_$.get_height(c6));
				break;
			case 7:
				var c7 = data.readDrawPath();
				this.drawPath(openfl__$internal_renderer__$DrawCommandReader_DrawPathView_$Impl_$.get_commands(c7),openfl__$internal_renderer__$DrawCommandReader_DrawPathView_$Impl_$.get_data(c7),openfl__$internal_renderer__$DrawCommandReader_DrawPathView_$Impl_$.get_winding(c7));
				break;
			case 8:
				var c8 = data.readDrawRect();
				this.drawRect(openfl__$internal_renderer__$DrawCommandReader_DrawRectView_$Impl_$.get_x(c8),openfl__$internal_renderer__$DrawCommandReader_DrawRectView_$Impl_$.get_y(c8),openfl__$internal_renderer__$DrawCommandReader_DrawRectView_$Impl_$.get_width(c8),openfl__$internal_renderer__$DrawCommandReader_DrawRectView_$Impl_$.get_height(c8));
				break;
			case 9:
				var c9 = data.readDrawRoundRect();
				this.drawRoundRect(openfl__$internal_renderer__$DrawCommandReader_DrawRoundRectView_$Impl_$.get_x(c9),openfl__$internal_renderer__$DrawCommandReader_DrawRoundRectView_$Impl_$.get_y(c9),openfl__$internal_renderer__$DrawCommandReader_DrawRoundRectView_$Impl_$.get_width(c9),openfl__$internal_renderer__$DrawCommandReader_DrawRoundRectView_$Impl_$.get_height(c9),openfl__$internal_renderer__$DrawCommandReader_DrawRoundRectView_$Impl_$.get_ellipseWidth(c9),openfl__$internal_renderer__$DrawCommandReader_DrawRoundRectView_$Impl_$.get_ellipseHeight(c9));
				break;
			case 10:
				var c10 = data.readDrawTiles();
				this.drawTiles(openfl__$internal_renderer__$DrawCommandReader_DrawTilesView_$Impl_$.get_sheet(c10),openfl__$internal_renderer__$DrawCommandReader_DrawTilesView_$Impl_$.get_tileData(c10),openfl__$internal_renderer__$DrawCommandReader_DrawTilesView_$Impl_$.get_smooth(c10),openfl__$internal_renderer__$DrawCommandReader_DrawTilesView_$Impl_$.get_flags(c10),openfl__$internal_renderer__$DrawCommandReader_DrawTilesView_$Impl_$.get_shader(c10),openfl__$internal_renderer__$DrawCommandReader_DrawTilesView_$Impl_$.get_count(c10));
				break;
			case 11:
				var c11 = data.readDrawTriangles();
				this.drawTriangles(openfl__$internal_renderer__$DrawCommandReader_DrawTrianglesView_$Impl_$.get_vertices(c11),openfl__$internal_renderer__$DrawCommandReader_DrawTrianglesView_$Impl_$.get_indices(c11),openfl__$internal_renderer__$DrawCommandReader_DrawTrianglesView_$Impl_$.get_uvtData(c11),openfl__$internal_renderer__$DrawCommandReader_DrawTrianglesView_$Impl_$.get_culling(c11));
				break;
			case 12:
				var c12 = data.readEndFill();
				this.endFill();
				break;
			case 13:
				var c13 = data.readLineBitmapStyle();
				this.lineBitmapStyle(openfl__$internal_renderer__$DrawCommandReader_LineBitmapStyleView_$Impl_$.get_bitmap(c13),openfl__$internal_renderer__$DrawCommandReader_LineBitmapStyleView_$Impl_$.get_matrix(c13),openfl__$internal_renderer__$DrawCommandReader_LineBitmapStyleView_$Impl_$.get_repeat(c13),openfl__$internal_renderer__$DrawCommandReader_LineBitmapStyleView_$Impl_$.get_smooth(c13));
				break;
			case 14:
				var c14 = data.readLineGradientStyle();
				this.lineGradientStyle(openfl__$internal_renderer__$DrawCommandReader_LineGradientStyleView_$Impl_$.get_type(c14),openfl__$internal_renderer__$DrawCommandReader_LineGradientStyleView_$Impl_$.get_colors(c14),openfl__$internal_renderer__$DrawCommandReader_LineGradientStyleView_$Impl_$.get_alphas(c14),openfl__$internal_renderer__$DrawCommandReader_LineGradientStyleView_$Impl_$.get_ratios(c14),openfl__$internal_renderer__$DrawCommandReader_LineGradientStyleView_$Impl_$.get_matrix(c14),openfl__$internal_renderer__$DrawCommandReader_LineGradientStyleView_$Impl_$.get_spreadMethod(c14),openfl__$internal_renderer__$DrawCommandReader_LineGradientStyleView_$Impl_$.get_interpolationMethod(c14),openfl__$internal_renderer__$DrawCommandReader_LineGradientStyleView_$Impl_$.get_focalPointRatio(c14));
				break;
			case 15:
				var c15 = data.readLineStyle();
				this.lineStyle(openfl__$internal_renderer__$DrawCommandReader_LineStyleView_$Impl_$.get_thickness(c15),openfl__$internal_renderer__$DrawCommandReader_LineStyleView_$Impl_$.get_color(c15),openfl__$internal_renderer__$DrawCommandReader_LineStyleView_$Impl_$.get_alpha(c15),openfl__$internal_renderer__$DrawCommandReader_LineStyleView_$Impl_$.get_pixelHinting(c15),openfl__$internal_renderer__$DrawCommandReader_LineStyleView_$Impl_$.get_scaleMode(c15),openfl__$internal_renderer__$DrawCommandReader_LineStyleView_$Impl_$.get_caps(c15),openfl__$internal_renderer__$DrawCommandReader_LineStyleView_$Impl_$.get_joints(c15),openfl__$internal_renderer__$DrawCommandReader_LineStyleView_$Impl_$.get_miterLimit(c15));
				break;
			case 16:
				var c16 = data.readLineTo();
				this.lineTo(openfl__$internal_renderer__$DrawCommandReader_LineToView_$Impl_$.get_x(c16),openfl__$internal_renderer__$DrawCommandReader_LineToView_$Impl_$.get_y(c16));
				break;
			case 17:
				var c17 = data.readMoveTo();
				this.moveTo(openfl__$internal_renderer__$DrawCommandReader_MoveToView_$Impl_$.get_x(c17),openfl__$internal_renderer__$DrawCommandReader_MoveToView_$Impl_$.get_y(c17));
				break;
			case 18:
				var c18 = data.readOverrideMatrix();
				this.overrideMatrix(openfl__$internal_renderer__$DrawCommandReader_OverrideMatrixView_$Impl_$.get_matrix(c18));
				break;
			default:
			}
		}
		data.destroy();
		return other;
	}
	,beginBitmapFill: function(bitmap,matrix,repeat,smooth) {
		this.types.push(openfl__$internal_renderer_DrawCommandType.BEGIN_BITMAP_FILL);
		this.o.push(bitmap);
		this.o.push(matrix);
		this.b.push(repeat);
		this.b.push(smooth);
	}
	,beginFill: function(color,alpha) {
		this.types.push(openfl__$internal_renderer_DrawCommandType.BEGIN_FILL);
		this.i.push(color);
		this.f.push(alpha);
	}
	,beginGradientFill: function(type,colors,alphas,ratios,matrix,spreadMethod,interpolationMethod,focalPointRatio) {
		this.types.push(openfl__$internal_renderer_DrawCommandType.BEGIN_GRADIENT_FILL);
		this.o.push(type);
		this.ii.push(colors);
		this.ff.push(alphas);
		this.ii.push(ratios);
		this.o.push(matrix);
		this.o.push(spreadMethod);
		this.o.push(interpolationMethod);
		this.f.push(focalPointRatio);
	}
	,clear: function() {
		this.types.splice(0,this.types.length);
		this.b.splice(0,this.b.length);
		this.i.splice(0,this.i.length);
		this.f.splice(0,this.f.length);
		this.o.splice(0,this.o.length);
		this.ff.splice(0,this.ff.length);
		this.ii.splice(0,this.ii.length);
		this.ts.splice(0,this.ts.length);
	}
	,cubicCurveTo: function(controlX1,controlY1,controlX2,controlY2,anchorX,anchorY) {
		this.types.push(openfl__$internal_renderer_DrawCommandType.CUBIC_CURVE_TO);
		this.f.push(controlX1);
		this.f.push(controlY1);
		this.f.push(controlX2);
		this.f.push(controlY2);
		this.f.push(anchorX);
		this.f.push(anchorY);
	}
	,curveTo: function(controlX,controlY,anchorX,anchorY) {
		this.types.push(openfl__$internal_renderer_DrawCommandType.CURVE_TO);
		this.f.push(controlX);
		this.f.push(controlY);
		this.f.push(anchorX);
		this.f.push(anchorY);
	}
	,drawCircle: function(x,y,radius) {
		this.types.push(openfl__$internal_renderer_DrawCommandType.DRAW_CIRCLE);
		this.f.push(x);
		this.f.push(y);
		this.f.push(radius);
	}
	,drawEllipse: function(x,y,width,height) {
		this.types.push(openfl__$internal_renderer_DrawCommandType.DRAW_ELLIPSE);
		this.f.push(x);
		this.f.push(y);
		this.f.push(width);
		this.f.push(height);
	}
	,drawPath: function(commands,data,winding) {
		this.types.push(openfl__$internal_renderer_DrawCommandType.DRAW_PATH);
		this.o.push(commands);
		this.o.push(data);
		this.o.push(winding);
	}
	,drawRect: function(x,y,width,height) {
		this.types.push(openfl__$internal_renderer_DrawCommandType.DRAW_RECT);
		this.f.push(x);
		this.f.push(y);
		this.f.push(width);
		this.f.push(height);
	}
	,drawRoundRect: function(x,y,width,height,ellipseWidth,ellipseHeight) {
		this.types.push(openfl__$internal_renderer_DrawCommandType.DRAW_ROUND_RECT);
		this.f.push(x);
		this.f.push(y);
		this.f.push(width);
		this.f.push(height);
		this.f.push(ellipseWidth);
		this.o.push(ellipseHeight);
	}
	,drawTiles: function(sheet,tileData,smooth,flags,shader,count) {
		this.types.push(openfl__$internal_renderer_DrawCommandType.DRAW_TILES);
		this.ts.push(sheet);
		this.ff.push(tileData);
		this.b.push(smooth);
		this.i.push(flags);
		this.o.push(shader);
		this.i.push(count);
	}
	,drawTriangles: function(vertices,indices,uvtData,culling) {
		this.types.push(openfl__$internal_renderer_DrawCommandType.DRAW_TRIANGLES);
		this.o.push(vertices);
		this.o.push(indices);
		this.o.push(uvtData);
		this.o.push(culling);
	}
	,endFill: function() {
		this.types.push(openfl__$internal_renderer_DrawCommandType.END_FILL);
	}
	,lineBitmapStyle: function(bitmap,matrix,repeat,smooth) {
		this.types.push(openfl__$internal_renderer_DrawCommandType.LINE_BITMAP_STYLE);
		this.o.push(bitmap);
		this.o.push(matrix);
		this.b.push(repeat);
		this.b.push(smooth);
	}
	,lineGradientStyle: function(type,colors,alphas,ratios,matrix,spreadMethod,interpolationMethod,focalPointRatio) {
		this.types.push(openfl__$internal_renderer_DrawCommandType.LINE_GRADIENT_STYLE);
		this.o.push(type);
		this.ii.push(colors);
		this.ff.push(alphas);
		this.ii.push(ratios);
		this.o.push(matrix);
		this.o.push(spreadMethod);
		this.o.push(interpolationMethod);
		this.f.push(focalPointRatio);
	}
	,lineStyle: function(thickness,color,alpha,pixelHinting,scaleMode,caps,joints,miterLimit) {
		this.types.push(openfl__$internal_renderer_DrawCommandType.LINE_STYLE);
		this.o.push(thickness);
		this.i.push(color);
		this.f.push(alpha);
		this.b.push(pixelHinting);
		this.o.push(scaleMode);
		this.o.push(caps);
		this.o.push(joints);
		this.f.push(miterLimit);
	}
	,lineTo: function(x,y) {
		this.types.push(openfl__$internal_renderer_DrawCommandType.LINE_TO);
		this.f.push(x);
		this.f.push(y);
	}
	,moveTo: function(x,y) {
		this.types.push(openfl__$internal_renderer_DrawCommandType.MOVE_TO);
		this.f.push(x);
		this.f.push(y);
	}
	,overrideMatrix: function(matrix) {
		this.types.push(openfl__$internal_renderer_DrawCommandType.OVERRIDE_MATRIX);
		this.o.push(matrix);
	}
	,get_length: function() {
		return this.types.length;
	}
	,__class__: openfl__$internal_renderer_DrawCommandBuffer
};
var openfl__$internal_renderer_DrawCommandReader = function(buffer) {
	this.buffer = buffer;
	this.bPos = this.iPos = this.fPos = this.oPos = this.ffPos = this.iiPos = this.tsPos = 0;
	this.prev = openfl__$internal_renderer_DrawCommandType.UNKNOWN;
};
$hxClasses["openfl._internal.renderer.DrawCommandReader"] = openfl__$internal_renderer_DrawCommandReader;
openfl__$internal_renderer_DrawCommandReader.__name__ = true;
openfl__$internal_renderer_DrawCommandReader.prototype = {
	advance: function() {
		var _g = this.prev;
		switch(_g[1]) {
		case 0:
			this.oPos += 2;
			this.bPos += 2;
			break;
		case 1:
			this.iPos += 1;
			this.fPos += 1;
			break;
		case 2:
			this.oPos += 4;
			this.iiPos += 2;
			this.ffPos += 1;
			this.fPos += 1;
			break;
		case 3:
			this.fPos += 6;
			break;
		case 4:
			this.fPos += 4;
			break;
		case 5:
			this.fPos += 3;
			break;
		case 6:
			this.fPos += 4;
			break;
		case 7:
			this.oPos += 3;
			break;
		case 8:
			this.fPos += 4;
			break;
		case 9:
			this.fPos += 5;
			this.oPos += 1;
			break;
		case 10:
			this.tsPos += 1;
			this.ffPos += 1;
			this.bPos += 1;
			this.iPos += 2;
			this.oPos += 1;
			break;
		case 11:
			this.oPos += 4;
			break;
		case 12:
			break;
		case 13:
			this.oPos += 2;
			this.bPos += 2;
			break;
		case 14:
			this.oPos += 4;
			this.iiPos += 2;
			this.ffPos += 1;
			this.fPos += 1;
			break;
		case 15:
			this.oPos += 4;
			this.iPos += 1;
			this.fPos += 2;
			this.bPos += 1;
			break;
		case 16:
			this.fPos += 2;
			break;
		case 17:
			this.fPos += 2;
			break;
		case 18:
			this.oPos += 1;
			break;
		default:
		}
	}
	,bool: function(index) {
		return this.buffer.b[this.bPos + index];
	}
	,destroy: function() {
		this.buffer = null;
		this.reset();
	}
	,fArr: function(index) {
		return this.buffer.ff[this.ffPos + index];
	}
	,'float': function(index) {
		return this.buffer.f[this.fPos + index];
	}
	,iArr: function(index) {
		return this.buffer.ii[this.iiPos + index];
	}
	,'int': function(index) {
		return this.buffer.i[this.iPos + index];
	}
	,obj: function(index) {
		return this.buffer.o[this.oPos + index];
	}
	,readBeginBitmapFill: function() {
		this.advance();
		this.prev = openfl__$internal_renderer_DrawCommandType.BEGIN_BITMAP_FILL;
		return openfl__$internal_renderer__$DrawCommandReader_BeginBitmapFillView_$Impl_$._new(this);
	}
	,readBeginFill: function() {
		this.advance();
		this.prev = openfl__$internal_renderer_DrawCommandType.BEGIN_FILL;
		return openfl__$internal_renderer__$DrawCommandReader_BeginFillView_$Impl_$._new(this);
	}
	,readBeginGradientFill: function() {
		this.advance();
		this.prev = openfl__$internal_renderer_DrawCommandType.BEGIN_GRADIENT_FILL;
		return openfl__$internal_renderer__$DrawCommandReader_BeginGradientFillView_$Impl_$._new(this);
	}
	,readCubicCurveTo: function() {
		this.advance();
		this.prev = openfl__$internal_renderer_DrawCommandType.CUBIC_CURVE_TO;
		return openfl__$internal_renderer__$DrawCommandReader_CubicCurveToView_$Impl_$._new(this);
	}
	,readCurveTo: function() {
		this.advance();
		this.prev = openfl__$internal_renderer_DrawCommandType.CURVE_TO;
		return openfl__$internal_renderer__$DrawCommandReader_CurveToView_$Impl_$._new(this);
	}
	,readDrawCircle: function() {
		this.advance();
		this.prev = openfl__$internal_renderer_DrawCommandType.DRAW_CIRCLE;
		return openfl__$internal_renderer__$DrawCommandReader_DrawCircleView_$Impl_$._new(this);
	}
	,readDrawEllipse: function() {
		this.advance();
		this.prev = openfl__$internal_renderer_DrawCommandType.DRAW_ELLIPSE;
		return openfl__$internal_renderer__$DrawCommandReader_DrawEllipseView_$Impl_$._new(this);
	}
	,readDrawPath: function() {
		this.advance();
		this.prev = openfl__$internal_renderer_DrawCommandType.DRAW_PATH;
		return openfl__$internal_renderer__$DrawCommandReader_DrawPathView_$Impl_$._new(this);
	}
	,readDrawRect: function() {
		this.advance();
		this.prev = openfl__$internal_renderer_DrawCommandType.DRAW_RECT;
		return openfl__$internal_renderer__$DrawCommandReader_DrawRectView_$Impl_$._new(this);
	}
	,readDrawRoundRect: function() {
		this.advance();
		this.prev = openfl__$internal_renderer_DrawCommandType.DRAW_ROUND_RECT;
		return openfl__$internal_renderer__$DrawCommandReader_DrawRoundRectView_$Impl_$._new(this);
	}
	,readDrawTiles: function() {
		this.advance();
		this.prev = openfl__$internal_renderer_DrawCommandType.DRAW_TILES;
		return openfl__$internal_renderer__$DrawCommandReader_DrawTilesView_$Impl_$._new(this);
	}
	,readDrawTriangles: function() {
		this.advance();
		this.prev = openfl__$internal_renderer_DrawCommandType.DRAW_TRIANGLES;
		return openfl__$internal_renderer__$DrawCommandReader_DrawTrianglesView_$Impl_$._new(this);
	}
	,readEndFill: function() {
		this.advance();
		this.prev = openfl__$internal_renderer_DrawCommandType.END_FILL;
		return openfl__$internal_renderer__$DrawCommandReader_EndFillView_$Impl_$._new(this);
	}
	,readLineBitmapStyle: function() {
		this.advance();
		this.prev = openfl__$internal_renderer_DrawCommandType.LINE_BITMAP_STYLE;
		return openfl__$internal_renderer__$DrawCommandReader_LineBitmapStyleView_$Impl_$._new(this);
	}
	,readLineGradientStyle: function() {
		this.advance();
		this.prev = openfl__$internal_renderer_DrawCommandType.LINE_GRADIENT_STYLE;
		return openfl__$internal_renderer__$DrawCommandReader_LineGradientStyleView_$Impl_$._new(this);
	}
	,readLineStyle: function() {
		this.advance();
		this.prev = openfl__$internal_renderer_DrawCommandType.LINE_STYLE;
		return openfl__$internal_renderer__$DrawCommandReader_LineStyleView_$Impl_$._new(this);
	}
	,readLineTo: function() {
		this.advance();
		this.prev = openfl__$internal_renderer_DrawCommandType.LINE_TO;
		return openfl__$internal_renderer__$DrawCommandReader_LineToView_$Impl_$._new(this);
	}
	,readMoveTo: function() {
		this.advance();
		this.prev = openfl__$internal_renderer_DrawCommandType.MOVE_TO;
		return openfl__$internal_renderer__$DrawCommandReader_MoveToView_$Impl_$._new(this);
	}
	,readOverrideMatrix: function() {
		this.advance();
		this.prev = openfl__$internal_renderer_DrawCommandType.OVERRIDE_MATRIX;
		return openfl__$internal_renderer__$DrawCommandReader_OverrideMatrixView_$Impl_$._new(this);
	}
	,reset: function() {
		this.bPos = this.iPos = this.fPos = this.oPos = this.ffPos = this.iiPos = this.tsPos = 0;
	}
	,skip: function(type) {
		this.advance();
		this.prev = type;
	}
	,Tilesheet: function(index) {
		return this.buffer.ts[this.tsPos + index];
	}
	,__class__: openfl__$internal_renderer_DrawCommandReader
};
var openfl__$internal_renderer__$DrawCommandReader_BeginBitmapFillView_$Impl_$ = {};
$hxClasses["openfl._internal.renderer._DrawCommandReader.BeginBitmapFillView_Impl_"] = openfl__$internal_renderer__$DrawCommandReader_BeginBitmapFillView_$Impl_$;
openfl__$internal_renderer__$DrawCommandReader_BeginBitmapFillView_$Impl_$.__name__ = true;
openfl__$internal_renderer__$DrawCommandReader_BeginBitmapFillView_$Impl_$._new = function(d) {
	return d;
};
openfl__$internal_renderer__$DrawCommandReader_BeginBitmapFillView_$Impl_$.get_bitmap = function(this1) {
	return this1.obj(0);
};
openfl__$internal_renderer__$DrawCommandReader_BeginBitmapFillView_$Impl_$.get_matrix = function(this1) {
	return this1.obj(1);
};
openfl__$internal_renderer__$DrawCommandReader_BeginBitmapFillView_$Impl_$.get_repeat = function(this1) {
	return this1.bool(0);
};
openfl__$internal_renderer__$DrawCommandReader_BeginBitmapFillView_$Impl_$.get_smooth = function(this1) {
	return this1.bool(1);
};
var openfl__$internal_renderer__$DrawCommandReader_BeginFillView_$Impl_$ = {};
$hxClasses["openfl._internal.renderer._DrawCommandReader.BeginFillView_Impl_"] = openfl__$internal_renderer__$DrawCommandReader_BeginFillView_$Impl_$;
openfl__$internal_renderer__$DrawCommandReader_BeginFillView_$Impl_$.__name__ = true;
openfl__$internal_renderer__$DrawCommandReader_BeginFillView_$Impl_$._new = function(d) {
	return d;
};
openfl__$internal_renderer__$DrawCommandReader_BeginFillView_$Impl_$.get_color = function(this1) {
	return this1["int"](0);
};
openfl__$internal_renderer__$DrawCommandReader_BeginFillView_$Impl_$.get_alpha = function(this1) {
	return this1["float"](0);
};
var openfl__$internal_renderer__$DrawCommandReader_BeginGradientFillView_$Impl_$ = {};
$hxClasses["openfl._internal.renderer._DrawCommandReader.BeginGradientFillView_Impl_"] = openfl__$internal_renderer__$DrawCommandReader_BeginGradientFillView_$Impl_$;
openfl__$internal_renderer__$DrawCommandReader_BeginGradientFillView_$Impl_$.__name__ = true;
openfl__$internal_renderer__$DrawCommandReader_BeginGradientFillView_$Impl_$._new = function(d) {
	return d;
};
openfl__$internal_renderer__$DrawCommandReader_BeginGradientFillView_$Impl_$.get_type = function(this1) {
	return this1.obj(0);
};
openfl__$internal_renderer__$DrawCommandReader_BeginGradientFillView_$Impl_$.get_colors = function(this1) {
	return this1.iArr(0);
};
openfl__$internal_renderer__$DrawCommandReader_BeginGradientFillView_$Impl_$.get_alphas = function(this1) {
	return this1.fArr(0);
};
openfl__$internal_renderer__$DrawCommandReader_BeginGradientFillView_$Impl_$.get_ratios = function(this1) {
	return this1.iArr(1);
};
openfl__$internal_renderer__$DrawCommandReader_BeginGradientFillView_$Impl_$.get_matrix = function(this1) {
	return this1.obj(1);
};
openfl__$internal_renderer__$DrawCommandReader_BeginGradientFillView_$Impl_$.get_spreadMethod = function(this1) {
	return this1.obj(2);
};
openfl__$internal_renderer__$DrawCommandReader_BeginGradientFillView_$Impl_$.get_interpolationMethod = function(this1) {
	return this1.obj(3);
};
openfl__$internal_renderer__$DrawCommandReader_BeginGradientFillView_$Impl_$.get_focalPointRatio = function(this1) {
	return this1["float"](0);
};
var openfl__$internal_renderer__$DrawCommandReader_CubicCurveToView_$Impl_$ = {};
$hxClasses["openfl._internal.renderer._DrawCommandReader.CubicCurveToView_Impl_"] = openfl__$internal_renderer__$DrawCommandReader_CubicCurveToView_$Impl_$;
openfl__$internal_renderer__$DrawCommandReader_CubicCurveToView_$Impl_$.__name__ = true;
openfl__$internal_renderer__$DrawCommandReader_CubicCurveToView_$Impl_$._new = function(d) {
	return d;
};
openfl__$internal_renderer__$DrawCommandReader_CubicCurveToView_$Impl_$.get_controlX1 = function(this1) {
	return this1["float"](0);
};
openfl__$internal_renderer__$DrawCommandReader_CubicCurveToView_$Impl_$.get_controlY1 = function(this1) {
	return this1["float"](1);
};
openfl__$internal_renderer__$DrawCommandReader_CubicCurveToView_$Impl_$.get_controlX2 = function(this1) {
	return this1["float"](2);
};
openfl__$internal_renderer__$DrawCommandReader_CubicCurveToView_$Impl_$.get_controlY2 = function(this1) {
	return this1["float"](3);
};
openfl__$internal_renderer__$DrawCommandReader_CubicCurveToView_$Impl_$.get_anchorX = function(this1) {
	return this1["float"](4);
};
openfl__$internal_renderer__$DrawCommandReader_CubicCurveToView_$Impl_$.get_anchorY = function(this1) {
	return this1["float"](5);
};
var openfl__$internal_renderer__$DrawCommandReader_CurveToView_$Impl_$ = {};
$hxClasses["openfl._internal.renderer._DrawCommandReader.CurveToView_Impl_"] = openfl__$internal_renderer__$DrawCommandReader_CurveToView_$Impl_$;
openfl__$internal_renderer__$DrawCommandReader_CurveToView_$Impl_$.__name__ = true;
openfl__$internal_renderer__$DrawCommandReader_CurveToView_$Impl_$._new = function(d) {
	return d;
};
openfl__$internal_renderer__$DrawCommandReader_CurveToView_$Impl_$.get_controlX = function(this1) {
	return this1["float"](0);
};
openfl__$internal_renderer__$DrawCommandReader_CurveToView_$Impl_$.get_controlY = function(this1) {
	return this1["float"](1);
};
openfl__$internal_renderer__$DrawCommandReader_CurveToView_$Impl_$.get_anchorX = function(this1) {
	return this1["float"](2);
};
openfl__$internal_renderer__$DrawCommandReader_CurveToView_$Impl_$.get_anchorY = function(this1) {
	return this1["float"](3);
};
var openfl__$internal_renderer__$DrawCommandReader_DrawCircleView_$Impl_$ = {};
$hxClasses["openfl._internal.renderer._DrawCommandReader.DrawCircleView_Impl_"] = openfl__$internal_renderer__$DrawCommandReader_DrawCircleView_$Impl_$;
openfl__$internal_renderer__$DrawCommandReader_DrawCircleView_$Impl_$.__name__ = true;
openfl__$internal_renderer__$DrawCommandReader_DrawCircleView_$Impl_$._new = function(d) {
	return d;
};
openfl__$internal_renderer__$DrawCommandReader_DrawCircleView_$Impl_$.get_x = function(this1) {
	return this1["float"](0);
};
openfl__$internal_renderer__$DrawCommandReader_DrawCircleView_$Impl_$.get_y = function(this1) {
	return this1["float"](1);
};
openfl__$internal_renderer__$DrawCommandReader_DrawCircleView_$Impl_$.get_radius = function(this1) {
	return this1["float"](2);
};
var openfl__$internal_renderer__$DrawCommandReader_DrawEllipseView_$Impl_$ = {};
$hxClasses["openfl._internal.renderer._DrawCommandReader.DrawEllipseView_Impl_"] = openfl__$internal_renderer__$DrawCommandReader_DrawEllipseView_$Impl_$;
openfl__$internal_renderer__$DrawCommandReader_DrawEllipseView_$Impl_$.__name__ = true;
openfl__$internal_renderer__$DrawCommandReader_DrawEllipseView_$Impl_$._new = function(d) {
	return d;
};
openfl__$internal_renderer__$DrawCommandReader_DrawEllipseView_$Impl_$.get_x = function(this1) {
	return this1["float"](0);
};
openfl__$internal_renderer__$DrawCommandReader_DrawEllipseView_$Impl_$.get_y = function(this1) {
	return this1["float"](1);
};
openfl__$internal_renderer__$DrawCommandReader_DrawEllipseView_$Impl_$.get_width = function(this1) {
	return this1["float"](2);
};
openfl__$internal_renderer__$DrawCommandReader_DrawEllipseView_$Impl_$.get_height = function(this1) {
	return this1["float"](3);
};
var openfl__$internal_renderer__$DrawCommandReader_DrawPathView_$Impl_$ = {};
$hxClasses["openfl._internal.renderer._DrawCommandReader.DrawPathView_Impl_"] = openfl__$internal_renderer__$DrawCommandReader_DrawPathView_$Impl_$;
openfl__$internal_renderer__$DrawCommandReader_DrawPathView_$Impl_$.__name__ = true;
openfl__$internal_renderer__$DrawCommandReader_DrawPathView_$Impl_$._new = function(d) {
	return d;
};
openfl__$internal_renderer__$DrawCommandReader_DrawPathView_$Impl_$.get_commands = function(this1) {
	return this1.obj(0);
};
openfl__$internal_renderer__$DrawCommandReader_DrawPathView_$Impl_$.get_data = function(this1) {
	return this1.obj(1);
};
openfl__$internal_renderer__$DrawCommandReader_DrawPathView_$Impl_$.get_winding = function(this1) {
	return this1.obj(2);
};
var openfl__$internal_renderer__$DrawCommandReader_DrawRectView_$Impl_$ = {};
$hxClasses["openfl._internal.renderer._DrawCommandReader.DrawRectView_Impl_"] = openfl__$internal_renderer__$DrawCommandReader_DrawRectView_$Impl_$;
openfl__$internal_renderer__$DrawCommandReader_DrawRectView_$Impl_$.__name__ = true;
openfl__$internal_renderer__$DrawCommandReader_DrawRectView_$Impl_$._new = function(d) {
	return d;
};
openfl__$internal_renderer__$DrawCommandReader_DrawRectView_$Impl_$.get_x = function(this1) {
	return this1["float"](0);
};
openfl__$internal_renderer__$DrawCommandReader_DrawRectView_$Impl_$.get_y = function(this1) {
	return this1["float"](1);
};
openfl__$internal_renderer__$DrawCommandReader_DrawRectView_$Impl_$.get_width = function(this1) {
	return this1["float"](2);
};
openfl__$internal_renderer__$DrawCommandReader_DrawRectView_$Impl_$.get_height = function(this1) {
	return this1["float"](3);
};
var openfl__$internal_renderer__$DrawCommandReader_DrawRoundRectView_$Impl_$ = {};
$hxClasses["openfl._internal.renderer._DrawCommandReader.DrawRoundRectView_Impl_"] = openfl__$internal_renderer__$DrawCommandReader_DrawRoundRectView_$Impl_$;
openfl__$internal_renderer__$DrawCommandReader_DrawRoundRectView_$Impl_$.__name__ = true;
openfl__$internal_renderer__$DrawCommandReader_DrawRoundRectView_$Impl_$._new = function(d) {
	return d;
};
openfl__$internal_renderer__$DrawCommandReader_DrawRoundRectView_$Impl_$.get_x = function(this1) {
	return this1["float"](0);
};
openfl__$internal_renderer__$DrawCommandReader_DrawRoundRectView_$Impl_$.get_y = function(this1) {
	return this1["float"](1);
};
openfl__$internal_renderer__$DrawCommandReader_DrawRoundRectView_$Impl_$.get_width = function(this1) {
	return this1["float"](2);
};
openfl__$internal_renderer__$DrawCommandReader_DrawRoundRectView_$Impl_$.get_height = function(this1) {
	return this1["float"](3);
};
openfl__$internal_renderer__$DrawCommandReader_DrawRoundRectView_$Impl_$.get_ellipseWidth = function(this1) {
	return this1["float"](4);
};
openfl__$internal_renderer__$DrawCommandReader_DrawRoundRectView_$Impl_$.get_ellipseHeight = function(this1) {
	return this1.obj(0);
};
var openfl__$internal_renderer__$DrawCommandReader_DrawTilesView_$Impl_$ = {};
$hxClasses["openfl._internal.renderer._DrawCommandReader.DrawTilesView_Impl_"] = openfl__$internal_renderer__$DrawCommandReader_DrawTilesView_$Impl_$;
openfl__$internal_renderer__$DrawCommandReader_DrawTilesView_$Impl_$.__name__ = true;
openfl__$internal_renderer__$DrawCommandReader_DrawTilesView_$Impl_$._new = function(d) {
	return d;
};
openfl__$internal_renderer__$DrawCommandReader_DrawTilesView_$Impl_$.get_sheet = function(this1) {
	return this1.Tilesheet(0);
};
openfl__$internal_renderer__$DrawCommandReader_DrawTilesView_$Impl_$.get_tileData = function(this1) {
	return this1.fArr(0);
};
openfl__$internal_renderer__$DrawCommandReader_DrawTilesView_$Impl_$.get_smooth = function(this1) {
	return this1.bool(0);
};
openfl__$internal_renderer__$DrawCommandReader_DrawTilesView_$Impl_$.get_flags = function(this1) {
	return this1["int"](0);
};
openfl__$internal_renderer__$DrawCommandReader_DrawTilesView_$Impl_$.get_shader = function(this1) {
	return this1.obj(0);
};
openfl__$internal_renderer__$DrawCommandReader_DrawTilesView_$Impl_$.get_count = function(this1) {
	return this1["int"](1);
};
var openfl__$internal_renderer__$DrawCommandReader_DrawTrianglesView_$Impl_$ = {};
$hxClasses["openfl._internal.renderer._DrawCommandReader.DrawTrianglesView_Impl_"] = openfl__$internal_renderer__$DrawCommandReader_DrawTrianglesView_$Impl_$;
openfl__$internal_renderer__$DrawCommandReader_DrawTrianglesView_$Impl_$.__name__ = true;
openfl__$internal_renderer__$DrawCommandReader_DrawTrianglesView_$Impl_$._new = function(d) {
	return d;
};
openfl__$internal_renderer__$DrawCommandReader_DrawTrianglesView_$Impl_$.get_vertices = function(this1) {
	return this1.obj(0);
};
openfl__$internal_renderer__$DrawCommandReader_DrawTrianglesView_$Impl_$.get_indices = function(this1) {
	return this1.obj(1);
};
openfl__$internal_renderer__$DrawCommandReader_DrawTrianglesView_$Impl_$.get_uvtData = function(this1) {
	return this1.obj(2);
};
openfl__$internal_renderer__$DrawCommandReader_DrawTrianglesView_$Impl_$.get_culling = function(this1) {
	return this1.obj(3);
};
var openfl__$internal_renderer__$DrawCommandReader_EndFillView_$Impl_$ = {};
$hxClasses["openfl._internal.renderer._DrawCommandReader.EndFillView_Impl_"] = openfl__$internal_renderer__$DrawCommandReader_EndFillView_$Impl_$;
openfl__$internal_renderer__$DrawCommandReader_EndFillView_$Impl_$.__name__ = true;
openfl__$internal_renderer__$DrawCommandReader_EndFillView_$Impl_$._new = function(d) {
	return d;
};
var openfl__$internal_renderer__$DrawCommandReader_LineBitmapStyleView_$Impl_$ = {};
$hxClasses["openfl._internal.renderer._DrawCommandReader.LineBitmapStyleView_Impl_"] = openfl__$internal_renderer__$DrawCommandReader_LineBitmapStyleView_$Impl_$;
openfl__$internal_renderer__$DrawCommandReader_LineBitmapStyleView_$Impl_$.__name__ = true;
openfl__$internal_renderer__$DrawCommandReader_LineBitmapStyleView_$Impl_$._new = function(d) {
	return d;
};
openfl__$internal_renderer__$DrawCommandReader_LineBitmapStyleView_$Impl_$.get_bitmap = function(this1) {
	return this1.obj(0);
};
openfl__$internal_renderer__$DrawCommandReader_LineBitmapStyleView_$Impl_$.get_matrix = function(this1) {
	return this1.obj(1);
};
openfl__$internal_renderer__$DrawCommandReader_LineBitmapStyleView_$Impl_$.get_repeat = function(this1) {
	return this1.bool(0);
};
openfl__$internal_renderer__$DrawCommandReader_LineBitmapStyleView_$Impl_$.get_smooth = function(this1) {
	return this1.bool(1);
};
var openfl__$internal_renderer__$DrawCommandReader_LineGradientStyleView_$Impl_$ = {};
$hxClasses["openfl._internal.renderer._DrawCommandReader.LineGradientStyleView_Impl_"] = openfl__$internal_renderer__$DrawCommandReader_LineGradientStyleView_$Impl_$;
openfl__$internal_renderer__$DrawCommandReader_LineGradientStyleView_$Impl_$.__name__ = true;
openfl__$internal_renderer__$DrawCommandReader_LineGradientStyleView_$Impl_$._new = function(d) {
	return d;
};
openfl__$internal_renderer__$DrawCommandReader_LineGradientStyleView_$Impl_$.get_type = function(this1) {
	return this1.obj(0);
};
openfl__$internal_renderer__$DrawCommandReader_LineGradientStyleView_$Impl_$.get_colors = function(this1) {
	return this1.iArr(0);
};
openfl__$internal_renderer__$DrawCommandReader_LineGradientStyleView_$Impl_$.get_alphas = function(this1) {
	return this1.fArr(0);
};
openfl__$internal_renderer__$DrawCommandReader_LineGradientStyleView_$Impl_$.get_ratios = function(this1) {
	return this1.iArr(1);
};
openfl__$internal_renderer__$DrawCommandReader_LineGradientStyleView_$Impl_$.get_matrix = function(this1) {
	return this1.obj(1);
};
openfl__$internal_renderer__$DrawCommandReader_LineGradientStyleView_$Impl_$.get_spreadMethod = function(this1) {
	return this1.obj(2);
};
openfl__$internal_renderer__$DrawCommandReader_LineGradientStyleView_$Impl_$.get_interpolationMethod = function(this1) {
	return this1.obj(3);
};
openfl__$internal_renderer__$DrawCommandReader_LineGradientStyleView_$Impl_$.get_focalPointRatio = function(this1) {
	return this1["float"](0);
};
var openfl__$internal_renderer__$DrawCommandReader_LineStyleView_$Impl_$ = {};
$hxClasses["openfl._internal.renderer._DrawCommandReader.LineStyleView_Impl_"] = openfl__$internal_renderer__$DrawCommandReader_LineStyleView_$Impl_$;
openfl__$internal_renderer__$DrawCommandReader_LineStyleView_$Impl_$.__name__ = true;
openfl__$internal_renderer__$DrawCommandReader_LineStyleView_$Impl_$._new = function(d) {
	return d;
};
openfl__$internal_renderer__$DrawCommandReader_LineStyleView_$Impl_$.get_thickness = function(this1) {
	return this1.obj(0);
};
openfl__$internal_renderer__$DrawCommandReader_LineStyleView_$Impl_$.get_color = function(this1) {
	return this1["int"](0);
};
openfl__$internal_renderer__$DrawCommandReader_LineStyleView_$Impl_$.get_alpha = function(this1) {
	return this1["float"](0);
};
openfl__$internal_renderer__$DrawCommandReader_LineStyleView_$Impl_$.get_pixelHinting = function(this1) {
	return this1.bool(0);
};
openfl__$internal_renderer__$DrawCommandReader_LineStyleView_$Impl_$.get_scaleMode = function(this1) {
	return this1.obj(1);
};
openfl__$internal_renderer__$DrawCommandReader_LineStyleView_$Impl_$.get_caps = function(this1) {
	return this1.obj(2);
};
openfl__$internal_renderer__$DrawCommandReader_LineStyleView_$Impl_$.get_joints = function(this1) {
	return this1.obj(3);
};
openfl__$internal_renderer__$DrawCommandReader_LineStyleView_$Impl_$.get_miterLimit = function(this1) {
	return this1["float"](1);
};
var openfl__$internal_renderer__$DrawCommandReader_LineToView_$Impl_$ = {};
$hxClasses["openfl._internal.renderer._DrawCommandReader.LineToView_Impl_"] = openfl__$internal_renderer__$DrawCommandReader_LineToView_$Impl_$;
openfl__$internal_renderer__$DrawCommandReader_LineToView_$Impl_$.__name__ = true;
openfl__$internal_renderer__$DrawCommandReader_LineToView_$Impl_$._new = function(d) {
	return d;
};
openfl__$internal_renderer__$DrawCommandReader_LineToView_$Impl_$.get_x = function(this1) {
	return this1["float"](0);
};
openfl__$internal_renderer__$DrawCommandReader_LineToView_$Impl_$.get_y = function(this1) {
	return this1["float"](1);
};
var openfl__$internal_renderer__$DrawCommandReader_MoveToView_$Impl_$ = {};
$hxClasses["openfl._internal.renderer._DrawCommandReader.MoveToView_Impl_"] = openfl__$internal_renderer__$DrawCommandReader_MoveToView_$Impl_$;
openfl__$internal_renderer__$DrawCommandReader_MoveToView_$Impl_$.__name__ = true;
openfl__$internal_renderer__$DrawCommandReader_MoveToView_$Impl_$._new = function(d) {
	return d;
};
openfl__$internal_renderer__$DrawCommandReader_MoveToView_$Impl_$.get_x = function(this1) {
	return this1["float"](0);
};
openfl__$internal_renderer__$DrawCommandReader_MoveToView_$Impl_$.get_y = function(this1) {
	return this1["float"](1);
};
var openfl__$internal_renderer__$DrawCommandReader_OverrideMatrixView_$Impl_$ = {};
$hxClasses["openfl._internal.renderer._DrawCommandReader.OverrideMatrixView_Impl_"] = openfl__$internal_renderer__$DrawCommandReader_OverrideMatrixView_$Impl_$;
openfl__$internal_renderer__$DrawCommandReader_OverrideMatrixView_$Impl_$.__name__ = true;
openfl__$internal_renderer__$DrawCommandReader_OverrideMatrixView_$Impl_$._new = function(d) {
	return d;
};
openfl__$internal_renderer__$DrawCommandReader_OverrideMatrixView_$Impl_$.get_matrix = function(this1) {
	return this1.obj(0);
};
var openfl__$internal_renderer_DrawCommandType = $hxClasses["openfl._internal.renderer.DrawCommandType"] = { __ename__ : true, __constructs__ : ["BEGIN_BITMAP_FILL","BEGIN_FILL","BEGIN_GRADIENT_FILL","CUBIC_CURVE_TO","CURVE_TO","DRAW_CIRCLE","DRAW_ELLIPSE","DRAW_PATH","DRAW_RECT","DRAW_ROUND_RECT","DRAW_TILES","DRAW_TRIANGLES","END_FILL","LINE_BITMAP_STYLE","LINE_GRADIENT_STYLE","LINE_STYLE","LINE_TO","MOVE_TO","OVERRIDE_MATRIX","UNKNOWN"] };
openfl__$internal_renderer_DrawCommandType.BEGIN_BITMAP_FILL = ["BEGIN_BITMAP_FILL",0];
openfl__$internal_renderer_DrawCommandType.BEGIN_BITMAP_FILL.toString = $estr;
openfl__$internal_renderer_DrawCommandType.BEGIN_BITMAP_FILL.__enum__ = openfl__$internal_renderer_DrawCommandType;
openfl__$internal_renderer_DrawCommandType.BEGIN_FILL = ["BEGIN_FILL",1];
openfl__$internal_renderer_DrawCommandType.BEGIN_FILL.toString = $estr;
openfl__$internal_renderer_DrawCommandType.BEGIN_FILL.__enum__ = openfl__$internal_renderer_DrawCommandType;
openfl__$internal_renderer_DrawCommandType.BEGIN_GRADIENT_FILL = ["BEGIN_GRADIENT_FILL",2];
openfl__$internal_renderer_DrawCommandType.BEGIN_GRADIENT_FILL.toString = $estr;
openfl__$internal_renderer_DrawCommandType.BEGIN_GRADIENT_FILL.__enum__ = openfl__$internal_renderer_DrawCommandType;
openfl__$internal_renderer_DrawCommandType.CUBIC_CURVE_TO = ["CUBIC_CURVE_TO",3];
openfl__$internal_renderer_DrawCommandType.CUBIC_CURVE_TO.toString = $estr;
openfl__$internal_renderer_DrawCommandType.CUBIC_CURVE_TO.__enum__ = openfl__$internal_renderer_DrawCommandType;
openfl__$internal_renderer_DrawCommandType.CURVE_TO = ["CURVE_TO",4];
openfl__$internal_renderer_DrawCommandType.CURVE_TO.toString = $estr;
openfl__$internal_renderer_DrawCommandType.CURVE_TO.__enum__ = openfl__$internal_renderer_DrawCommandType;
openfl__$internal_renderer_DrawCommandType.DRAW_CIRCLE = ["DRAW_CIRCLE",5];
openfl__$internal_renderer_DrawCommandType.DRAW_CIRCLE.toString = $estr;
openfl__$internal_renderer_DrawCommandType.DRAW_CIRCLE.__enum__ = openfl__$internal_renderer_DrawCommandType;
openfl__$internal_renderer_DrawCommandType.DRAW_ELLIPSE = ["DRAW_ELLIPSE",6];
openfl__$internal_renderer_DrawCommandType.DRAW_ELLIPSE.toString = $estr;
openfl__$internal_renderer_DrawCommandType.DRAW_ELLIPSE.__enum__ = openfl__$internal_renderer_DrawCommandType;
openfl__$internal_renderer_DrawCommandType.DRAW_PATH = ["DRAW_PATH",7];
openfl__$internal_renderer_DrawCommandType.DRAW_PATH.toString = $estr;
openfl__$internal_renderer_DrawCommandType.DRAW_PATH.__enum__ = openfl__$internal_renderer_DrawCommandType;
openfl__$internal_renderer_DrawCommandType.DRAW_RECT = ["DRAW_RECT",8];
openfl__$internal_renderer_DrawCommandType.DRAW_RECT.toString = $estr;
openfl__$internal_renderer_DrawCommandType.DRAW_RECT.__enum__ = openfl__$internal_renderer_DrawCommandType;
openfl__$internal_renderer_DrawCommandType.DRAW_ROUND_RECT = ["DRAW_ROUND_RECT",9];
openfl__$internal_renderer_DrawCommandType.DRAW_ROUND_RECT.toString = $estr;
openfl__$internal_renderer_DrawCommandType.DRAW_ROUND_RECT.__enum__ = openfl__$internal_renderer_DrawCommandType;
openfl__$internal_renderer_DrawCommandType.DRAW_TILES = ["DRAW_TILES",10];
openfl__$internal_renderer_DrawCommandType.DRAW_TILES.toString = $estr;
openfl__$internal_renderer_DrawCommandType.DRAW_TILES.__enum__ = openfl__$internal_renderer_DrawCommandType;
openfl__$internal_renderer_DrawCommandType.DRAW_TRIANGLES = ["DRAW_TRIANGLES",11];
openfl__$internal_renderer_DrawCommandType.DRAW_TRIANGLES.toString = $estr;
openfl__$internal_renderer_DrawCommandType.DRAW_TRIANGLES.__enum__ = openfl__$internal_renderer_DrawCommandType;
openfl__$internal_renderer_DrawCommandType.END_FILL = ["END_FILL",12];
openfl__$internal_renderer_DrawCommandType.END_FILL.toString = $estr;
openfl__$internal_renderer_DrawCommandType.END_FILL.__enum__ = openfl__$internal_renderer_DrawCommandType;
openfl__$internal_renderer_DrawCommandType.LINE_BITMAP_STYLE = ["LINE_BITMAP_STYLE",13];
openfl__$internal_renderer_DrawCommandType.LINE_BITMAP_STYLE.toString = $estr;
openfl__$internal_renderer_DrawCommandType.LINE_BITMAP_STYLE.__enum__ = openfl__$internal_renderer_DrawCommandType;
openfl__$internal_renderer_DrawCommandType.LINE_GRADIENT_STYLE = ["LINE_GRADIENT_STYLE",14];
openfl__$internal_renderer_DrawCommandType.LINE_GRADIENT_STYLE.toString = $estr;
openfl__$internal_renderer_DrawCommandType.LINE_GRADIENT_STYLE.__enum__ = openfl__$internal_renderer_DrawCommandType;
openfl__$internal_renderer_DrawCommandType.LINE_STYLE = ["LINE_STYLE",15];
openfl__$internal_renderer_DrawCommandType.LINE_STYLE.toString = $estr;
openfl__$internal_renderer_DrawCommandType.LINE_STYLE.__enum__ = openfl__$internal_renderer_DrawCommandType;
openfl__$internal_renderer_DrawCommandType.LINE_TO = ["LINE_TO",16];
openfl__$internal_renderer_DrawCommandType.LINE_TO.toString = $estr;
openfl__$internal_renderer_DrawCommandType.LINE_TO.__enum__ = openfl__$internal_renderer_DrawCommandType;
openfl__$internal_renderer_DrawCommandType.MOVE_TO = ["MOVE_TO",17];
openfl__$internal_renderer_DrawCommandType.MOVE_TO.toString = $estr;
openfl__$internal_renderer_DrawCommandType.MOVE_TO.__enum__ = openfl__$internal_renderer_DrawCommandType;
openfl__$internal_renderer_DrawCommandType.OVERRIDE_MATRIX = ["OVERRIDE_MATRIX",18];
openfl__$internal_renderer_DrawCommandType.OVERRIDE_MATRIX.toString = $estr;
openfl__$internal_renderer_DrawCommandType.OVERRIDE_MATRIX.__enum__ = openfl__$internal_renderer_DrawCommandType;
openfl__$internal_renderer_DrawCommandType.UNKNOWN = ["UNKNOWN",19];
openfl__$internal_renderer_DrawCommandType.UNKNOWN.toString = $estr;
openfl__$internal_renderer_DrawCommandType.UNKNOWN.__enum__ = openfl__$internal_renderer_DrawCommandType;
var openfl__$internal_renderer_RenderSession = function() {
};
$hxClasses["openfl._internal.renderer.RenderSession"] = openfl__$internal_renderer_RenderSession;
openfl__$internal_renderer_RenderSession.__name__ = true;
openfl__$internal_renderer_RenderSession.prototype = {
	__class__: openfl__$internal_renderer_RenderSession
};
var openfl__$internal_renderer_cairo_CairoGraphics = function() { };
$hxClasses["openfl._internal.renderer.cairo.CairoGraphics"] = openfl__$internal_renderer_cairo_CairoGraphics;
openfl__$internal_renderer_cairo_CairoGraphics.__name__ = true;
openfl__$internal_renderer_cairo_CairoGraphics.cairo = null;
openfl__$internal_renderer_cairo_CairoGraphics.drawRoundRect = function(x,y,width,height,ellipseWidth,ellipseHeight) {
	if(ellipseHeight == null) ellipseHeight = ellipseWidth;
	ellipseWidth *= 0.5;
	ellipseHeight *= 0.5;
	if(ellipseWidth > width / 2) ellipseWidth = width / 2;
	if(ellipseHeight > height / 2) ellipseHeight = height / 2;
	var xe = x + width;
	var ye = y + height;
	var cx1 = -ellipseWidth + ellipseWidth * openfl__$internal_renderer_cairo_CairoGraphics.SIN45;
	var cx2 = -ellipseWidth + ellipseWidth * openfl__$internal_renderer_cairo_CairoGraphics.TAN22;
	var cy1 = -ellipseHeight + ellipseHeight * openfl__$internal_renderer_cairo_CairoGraphics.SIN45;
	var cy2 = -ellipseHeight + ellipseHeight * openfl__$internal_renderer_cairo_CairoGraphics.TAN22;
	openfl__$internal_renderer_cairo_CairoGraphics.cairo.moveTo(xe,ye - ellipseHeight);
	openfl__$internal_renderer_cairo_CairoGraphics.quadraticCurveTo(xe,ye + cy2,xe + cx1,ye + cy1);
	openfl__$internal_renderer_cairo_CairoGraphics.quadraticCurveTo(xe + cx2,ye,xe - ellipseWidth,ye);
	openfl__$internal_renderer_cairo_CairoGraphics.cairo.lineTo(x + ellipseWidth,ye);
	openfl__$internal_renderer_cairo_CairoGraphics.quadraticCurveTo(x - cx2,ye,x - cx1,ye + cy1);
	openfl__$internal_renderer_cairo_CairoGraphics.quadraticCurveTo(x,ye + cy2,x,ye - ellipseHeight);
	openfl__$internal_renderer_cairo_CairoGraphics.cairo.lineTo(x,y + ellipseHeight);
	openfl__$internal_renderer_cairo_CairoGraphics.quadraticCurveTo(x,y - cy2,x - cx1,y - cy1);
	openfl__$internal_renderer_cairo_CairoGraphics.quadraticCurveTo(x - cx2,y,x + ellipseWidth,y);
	openfl__$internal_renderer_cairo_CairoGraphics.cairo.lineTo(xe - ellipseWidth,y);
	openfl__$internal_renderer_cairo_CairoGraphics.quadraticCurveTo(xe + cx2,y,xe + cx1,y - cy1);
	openfl__$internal_renderer_cairo_CairoGraphics.quadraticCurveTo(xe,y - cy2,xe,y + ellipseHeight);
	openfl__$internal_renderer_cairo_CairoGraphics.cairo.lineTo(xe,ye - ellipseHeight);
};
openfl__$internal_renderer_cairo_CairoGraphics.quadraticCurveTo = function(cx,cy,x,y) {
	var current = null;
	if(!openfl__$internal_renderer_cairo_CairoGraphics.cairo.get_hasCurrentPoint()) {
		openfl__$internal_renderer_cairo_CairoGraphics.cairo.moveTo(cx,cy);
		current = new lime_math_Vector2(cx,cy);
	} else current = openfl__$internal_renderer_cairo_CairoGraphics.cairo.get_currentPoint();
	var cx1 = current.x + 0.66666666666666663 * (cx - current.x);
	var cy1 = current.y + 0.66666666666666663 * (cy - current.y);
	var cx2 = x + 0.66666666666666663 * (cx - x);
	var cy2 = y + 0.66666666666666663 * (cy - y);
	openfl__$internal_renderer_cairo_CairoGraphics.cairo.curveTo(cx1,cy1,cx2,cy2,x,y);
};
openfl__$internal_renderer_cairo_CairoGraphics.renderMask = function(graphics,renderSession) {
	if(graphics.__commands.get_length() != 0) {
		var cairo = renderSession.cairo;
		var positionX = 0.0;
		var positionY = 0.0;
		var offsetX = 0;
		var offsetY = 0;
		var data = new openfl__$internal_renderer_DrawCommandReader(graphics.__commands);
		var _g = 0;
		var _g1 = graphics.__commands.types;
		while(_g < _g1.length) {
			var type = _g1[_g];
			++_g;
			switch(type[1]) {
			case 3:
				var c = data.readCubicCurveTo();
				cairo.curveTo(openfl__$internal_renderer__$DrawCommandReader_CubicCurveToView_$Impl_$.get_controlX1(c) - offsetX,openfl__$internal_renderer__$DrawCommandReader_CubicCurveToView_$Impl_$.get_controlY1(c) - offsetY,openfl__$internal_renderer__$DrawCommandReader_CubicCurveToView_$Impl_$.get_controlX2(c) - offsetX,openfl__$internal_renderer__$DrawCommandReader_CubicCurveToView_$Impl_$.get_controlY2(c) - offsetY,openfl__$internal_renderer__$DrawCommandReader_CubicCurveToView_$Impl_$.get_anchorX(c) - offsetX,openfl__$internal_renderer__$DrawCommandReader_CubicCurveToView_$Impl_$.get_anchorY(c) - offsetY);
				positionX = openfl__$internal_renderer__$DrawCommandReader_CubicCurveToView_$Impl_$.get_anchorX(c);
				positionY = openfl__$internal_renderer__$DrawCommandReader_CubicCurveToView_$Impl_$.get_anchorX(c);
				break;
			case 4:
				var c1 = data.readCurveTo();
				openfl__$internal_renderer_cairo_CairoGraphics.quadraticCurveTo(openfl__$internal_renderer__$DrawCommandReader_CurveToView_$Impl_$.get_controlX(c1) - offsetX,openfl__$internal_renderer__$DrawCommandReader_CurveToView_$Impl_$.get_controlY(c1) - offsetY,openfl__$internal_renderer__$DrawCommandReader_CurveToView_$Impl_$.get_anchorX(c1) - offsetX,openfl__$internal_renderer__$DrawCommandReader_CurveToView_$Impl_$.get_anchorY(c1) - offsetY);
				positionX = openfl__$internal_renderer__$DrawCommandReader_CurveToView_$Impl_$.get_anchorX(c1);
				positionY = openfl__$internal_renderer__$DrawCommandReader_CurveToView_$Impl_$.get_anchorY(c1);
				break;
			case 5:
				var c2 = data.readDrawCircle();
				cairo.arc(openfl__$internal_renderer__$DrawCommandReader_DrawCircleView_$Impl_$.get_x(c2) - offsetX,openfl__$internal_renderer__$DrawCommandReader_DrawCircleView_$Impl_$.get_y(c2) - offsetY,openfl__$internal_renderer__$DrawCommandReader_DrawCircleView_$Impl_$.get_radius(c2),0,Math.PI * 2);
				break;
			case 6:
				var c3 = data.readDrawEllipse();
				var x = openfl__$internal_renderer__$DrawCommandReader_DrawEllipseView_$Impl_$.get_x(c3);
				var y = openfl__$internal_renderer__$DrawCommandReader_DrawEllipseView_$Impl_$.get_y(c3);
				var width = openfl__$internal_renderer__$DrawCommandReader_DrawEllipseView_$Impl_$.get_width(c3);
				var height = openfl__$internal_renderer__$DrawCommandReader_DrawEllipseView_$Impl_$.get_height(c3);
				x -= offsetX;
				y -= offsetY;
				var kappa = .5522848;
				var ox = width / 2 * kappa;
				var oy = height / 2 * kappa;
				var xe = x + width;
				var ye = y + height;
				var xm = x + width / 2;
				var ym = y + height / 2;
				cairo.moveTo(x,ym);
				cairo.curveTo(x,ym - oy,xm - ox,y,xm,y);
				cairo.curveTo(xm + ox,y,xe,ym - oy,xe,ym);
				cairo.curveTo(xe,ym + oy,xm + ox,ye,xm,ye);
				cairo.curveTo(xm - ox,ye,x,ym + oy,x,ym);
				break;
			case 8:
				var c4 = data.readDrawRect();
				cairo.rectangle(openfl__$internal_renderer__$DrawCommandReader_DrawRectView_$Impl_$.get_x(c4) - offsetX,openfl__$internal_renderer__$DrawCommandReader_DrawRectView_$Impl_$.get_y(c4) - offsetY,openfl__$internal_renderer__$DrawCommandReader_DrawRectView_$Impl_$.get_width(c4),openfl__$internal_renderer__$DrawCommandReader_DrawRectView_$Impl_$.get_height(c4));
				break;
			case 9:
				var c5 = data.readDrawRoundRect();
				openfl__$internal_renderer_cairo_CairoGraphics.drawRoundRect(openfl__$internal_renderer__$DrawCommandReader_DrawRoundRectView_$Impl_$.get_x(c5) - offsetX,openfl__$internal_renderer__$DrawCommandReader_DrawRoundRectView_$Impl_$.get_y(c5) - offsetY,openfl__$internal_renderer__$DrawCommandReader_DrawRoundRectView_$Impl_$.get_width(c5),openfl__$internal_renderer__$DrawCommandReader_DrawRoundRectView_$Impl_$.get_height(c5),openfl__$internal_renderer__$DrawCommandReader_DrawRoundRectView_$Impl_$.get_ellipseWidth(c5),openfl__$internal_renderer__$DrawCommandReader_DrawRoundRectView_$Impl_$.get_ellipseHeight(c5));
				break;
			case 16:
				var c6 = data.readLineTo();
				cairo.lineTo(openfl__$internal_renderer__$DrawCommandReader_LineToView_$Impl_$.get_x(c6) - offsetX,openfl__$internal_renderer__$DrawCommandReader_LineToView_$Impl_$.get_y(c6) - offsetY);
				positionX = openfl__$internal_renderer__$DrawCommandReader_LineToView_$Impl_$.get_x(c6);
				positionY = openfl__$internal_renderer__$DrawCommandReader_LineToView_$Impl_$.get_y(c6);
				break;
			case 17:
				var c7 = data.readMoveTo();
				cairo.moveTo(openfl__$internal_renderer__$DrawCommandReader_MoveToView_$Impl_$.get_x(c7) - offsetX,openfl__$internal_renderer__$DrawCommandReader_MoveToView_$Impl_$.get_y(c7) - offsetY);
				positionX = openfl__$internal_renderer__$DrawCommandReader_MoveToView_$Impl_$.get_x(c7);
				positionY = openfl__$internal_renderer__$DrawCommandReader_MoveToView_$Impl_$.get_y(c7);
				break;
			default:
				data.skip(type);
			}
		}
		data.destroy();
	}
};
var openfl__$internal_renderer_cairo_CairoMaskManager = function(renderSession) {
	openfl__$internal_renderer_AbstractMaskManager.call(this,renderSession);
};
$hxClasses["openfl._internal.renderer.cairo.CairoMaskManager"] = openfl__$internal_renderer_cairo_CairoMaskManager;
openfl__$internal_renderer_cairo_CairoMaskManager.__name__ = true;
openfl__$internal_renderer_cairo_CairoMaskManager.__super__ = openfl__$internal_renderer_AbstractMaskManager;
openfl__$internal_renderer_cairo_CairoMaskManager.prototype = $extend(openfl__$internal_renderer_AbstractMaskManager.prototype,{
	pushMask: function(mask) {
		var cairo = this.renderSession.cairo;
		cairo.save();
		var transform = mask.__getWorldTransform();
		cairo.set_matrix(transform.__toMatrix3());
		cairo.newPath();
		mask.__renderCairoMask(this.renderSession);
		cairo.clip();
	}
	,pushRect: function(rect,transform) {
		var cairo = this.renderSession.cairo;
		cairo.save();
		cairo.set_matrix(new lime_math_Matrix3(transform.a,transform.c,transform.b,transform.d,transform.tx,transform.ty));
		cairo.newPath();
		cairo.rectangle(rect.x,rect.y,rect.width,rect.height);
		cairo.clip();
	}
	,popMask: function() {
		this.renderSession.cairo.restore();
	}
	,popRect: function() {
		this.renderSession.cairo.restore();
	}
	,__class__: openfl__$internal_renderer_cairo_CairoMaskManager
});
var openfl__$internal_renderer_cairo_CairoRenderer = function() { };
$hxClasses["openfl._internal.renderer.cairo.CairoRenderer"] = openfl__$internal_renderer_cairo_CairoRenderer;
openfl__$internal_renderer_cairo_CairoRenderer.__name__ = true;
openfl__$internal_renderer_cairo_CairoRenderer.__super__ = openfl__$internal_renderer_AbstractRenderer;
openfl__$internal_renderer_cairo_CairoRenderer.prototype = $extend(openfl__$internal_renderer_AbstractRenderer.prototype,{
	render: function(stage) {
		this.cairo.identityMatrix();
		if(stage.__clearBeforeRender) {
			this.cairo.setSourceRGB(stage.__colorSplit[0],stage.__colorSplit[1],stage.__colorSplit[2]);
			this.cairo.paint();
		}
		stage.__renderCairo(this.renderSession);
	}
	,__class__: openfl__$internal_renderer_cairo_CairoRenderer
});
var openfl__$internal_renderer_cairo_CairoShape = function() { };
$hxClasses["openfl._internal.renderer.cairo.CairoShape"] = openfl__$internal_renderer_cairo_CairoShape;
openfl__$internal_renderer_cairo_CairoShape.__name__ = true;
openfl__$internal_renderer_cairo_CairoShape.render = function(shape,renderSession) {
};
var openfl__$internal_renderer_cairo_CairoTextField = function() { };
$hxClasses["openfl._internal.renderer.cairo.CairoTextField"] = openfl__$internal_renderer_cairo_CairoTextField;
openfl__$internal_renderer_cairo_CairoTextField.__name__ = true;
openfl__$internal_renderer_cairo_CairoTextField.render = function(textField,renderSession) {
};
var openfl__$internal_renderer_canvas_CanvasGraphics = function() { };
$hxClasses["openfl._internal.renderer.canvas.CanvasGraphics"] = openfl__$internal_renderer_canvas_CanvasGraphics;
openfl__$internal_renderer_canvas_CanvasGraphics.__name__ = true;
openfl__$internal_renderer_canvas_CanvasGraphics.bitmapFill = null;
openfl__$internal_renderer_canvas_CanvasGraphics.bitmapRepeat = null;
openfl__$internal_renderer_canvas_CanvasGraphics.bounds = null;
openfl__$internal_renderer_canvas_CanvasGraphics.graphics = null;
openfl__$internal_renderer_canvas_CanvasGraphics.hasFill = null;
openfl__$internal_renderer_canvas_CanvasGraphics.hasStroke = null;
openfl__$internal_renderer_canvas_CanvasGraphics.hitTesting = null;
openfl__$internal_renderer_canvas_CanvasGraphics.inversePendingMatrix = null;
openfl__$internal_renderer_canvas_CanvasGraphics.pendingMatrix = null;
openfl__$internal_renderer_canvas_CanvasGraphics.context = null;
openfl__$internal_renderer_canvas_CanvasGraphics.closePath = function() {
	if(openfl__$internal_renderer_canvas_CanvasGraphics.context.strokeStyle == null) return;
	openfl__$internal_renderer_canvas_CanvasGraphics.context.closePath();
	openfl__$internal_renderer_canvas_CanvasGraphics.context.stroke();
	openfl__$internal_renderer_canvas_CanvasGraphics.context.beginPath();
};
openfl__$internal_renderer_canvas_CanvasGraphics.createBitmapFill = function(bitmap,bitmapRepeat) {
	bitmap.__sync();
	return openfl__$internal_renderer_canvas_CanvasGraphics.context.createPattern(bitmap.image.get_src(),bitmapRepeat?"repeat":"no-repeat");
};
openfl__$internal_renderer_canvas_CanvasGraphics.createGradientPattern = function(type,colors,alphas,ratios,matrix,spreadMethod,interpolationMethod,focalPointRatio) {
	var gradientFill = null;
	switch(type) {
	case 1:
		if(matrix == null) matrix = new openfl_geom_Matrix();
		var point = matrix.transformPoint(new openfl_geom_Point(1638.4,0));
		gradientFill = openfl__$internal_renderer_canvas_CanvasGraphics.context.createRadialGradient(matrix.tx,matrix.ty,0,matrix.tx,matrix.ty,(point.x - matrix.tx) / 2);
		break;
	case 0:
		var matrix1;
		if(matrix != null) matrix1 = matrix; else matrix1 = new openfl_geom_Matrix();
		var point1 = matrix1.transformPoint(new openfl_geom_Point(-819.2,0));
		var point2 = matrix1.transformPoint(new openfl_geom_Point(819.2,0));
		gradientFill = openfl__$internal_renderer_canvas_CanvasGraphics.context.createLinearGradient(point1.x,point1.y,point2.x,point2.y);
		break;
	}
	var _g1 = 0;
	var _g = colors.length;
	while(_g1 < _g) {
		var i = _g1++;
		var rgb = colors[i];
		var alpha = alphas[i];
		var r = (rgb & 16711680) >>> 16;
		var g = (rgb & 65280) >>> 8;
		var b = rgb & 255;
		var ratio = ratios[i] / 255;
		if(ratio < 0) ratio = 0;
		if(ratio > 1) ratio = 1;
		gradientFill.addColorStop(ratio,"rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")");
	}
	return gradientFill;
};
openfl__$internal_renderer_canvas_CanvasGraphics.createTempPatternCanvas = function(bitmap,repeat,width,height) {
	var canvas = window.document.createElement("canvas");
	var context = canvas.getContext("2d");
	canvas.width = width;
	canvas.height = height;
	context.fillStyle = context.createPattern(bitmap.image.get_src(),repeat?"repeat":"no-repeat");
	context.beginPath();
	context.moveTo(0,0);
	context.lineTo(0,height);
	context.lineTo(width,height);
	context.lineTo(width,0);
	context.lineTo(0,0);
	context.closePath();
	if(!openfl__$internal_renderer_canvas_CanvasGraphics.hitTesting) context.fill();
	return canvas;
};
openfl__$internal_renderer_canvas_CanvasGraphics.drawRoundRect = function(x,y,width,height,ellipseWidth,ellipseHeight) {
	if(ellipseHeight == null) ellipseHeight = ellipseWidth;
	ellipseWidth *= 0.5;
	ellipseHeight *= 0.5;
	if(ellipseWidth > width / 2) ellipseWidth = width / 2;
	if(ellipseHeight > height / 2) ellipseHeight = height / 2;
	var xe = x + width;
	var ye = y + height;
	var cx1 = -ellipseWidth + ellipseWidth * openfl__$internal_renderer_canvas_CanvasGraphics.SIN45;
	var cx2 = -ellipseWidth + ellipseWidth * openfl__$internal_renderer_canvas_CanvasGraphics.TAN22;
	var cy1 = -ellipseHeight + ellipseHeight * openfl__$internal_renderer_canvas_CanvasGraphics.SIN45;
	var cy2 = -ellipseHeight + ellipseHeight * openfl__$internal_renderer_canvas_CanvasGraphics.TAN22;
	openfl__$internal_renderer_canvas_CanvasGraphics.context.moveTo(xe,ye - ellipseHeight);
	openfl__$internal_renderer_canvas_CanvasGraphics.context.quadraticCurveTo(xe,ye + cy2,xe + cx1,ye + cy1);
	openfl__$internal_renderer_canvas_CanvasGraphics.context.quadraticCurveTo(xe + cx2,ye,xe - ellipseWidth,ye);
	openfl__$internal_renderer_canvas_CanvasGraphics.context.lineTo(x + ellipseWidth,ye);
	openfl__$internal_renderer_canvas_CanvasGraphics.context.quadraticCurveTo(x - cx2,ye,x - cx1,ye + cy1);
	openfl__$internal_renderer_canvas_CanvasGraphics.context.quadraticCurveTo(x,ye + cy2,x,ye - ellipseHeight);
	openfl__$internal_renderer_canvas_CanvasGraphics.context.lineTo(x,y + ellipseHeight);
	openfl__$internal_renderer_canvas_CanvasGraphics.context.quadraticCurveTo(x,y - cy2,x - cx1,y - cy1);
	openfl__$internal_renderer_canvas_CanvasGraphics.context.quadraticCurveTo(x - cx2,y,x + ellipseWidth,y);
	openfl__$internal_renderer_canvas_CanvasGraphics.context.lineTo(xe - ellipseWidth,y);
	openfl__$internal_renderer_canvas_CanvasGraphics.context.quadraticCurveTo(xe + cx2,y,xe + cx1,y - cy1);
	openfl__$internal_renderer_canvas_CanvasGraphics.context.quadraticCurveTo(xe,y - cy2,xe,y + ellipseHeight);
	openfl__$internal_renderer_canvas_CanvasGraphics.context.lineTo(xe,ye - ellipseHeight);
};
openfl__$internal_renderer_canvas_CanvasGraphics.endFill = function() {
	openfl__$internal_renderer_canvas_CanvasGraphics.context.beginPath();
	openfl__$internal_renderer_canvas_CanvasGraphics.playCommands(openfl__$internal_renderer_canvas_CanvasGraphics.fillCommands,false);
	openfl__$internal_renderer_canvas_CanvasGraphics.fillCommands.clear();
};
openfl__$internal_renderer_canvas_CanvasGraphics.endStroke = function() {
	openfl__$internal_renderer_canvas_CanvasGraphics.context.beginPath();
	openfl__$internal_renderer_canvas_CanvasGraphics.playCommands(openfl__$internal_renderer_canvas_CanvasGraphics.strokeCommands,true);
	openfl__$internal_renderer_canvas_CanvasGraphics.context.closePath();
	openfl__$internal_renderer_canvas_CanvasGraphics.strokeCommands.clear();
};
openfl__$internal_renderer_canvas_CanvasGraphics.hitTest = function(graphics,x,y) {
	if(graphics.__commands.get_length() == 0 || openfl__$internal_renderer_canvas_CanvasGraphics.bounds == null || openfl__$internal_renderer_canvas_CanvasGraphics.bounds.width <= 0 || openfl__$internal_renderer_canvas_CanvasGraphics.bounds.height <= 0) return false; else {
		openfl__$internal_renderer_canvas_CanvasGraphics.hitTesting = true;
		x -= openfl__$internal_renderer_canvas_CanvasGraphics.bounds.x;
		y -= openfl__$internal_renderer_canvas_CanvasGraphics.bounds.y;
		if(graphics.__canvas == null) {
			graphics.__canvas = window.document.createElement("canvas");
			graphics.__context = graphics.__canvas.getContext("2d");
		}
		openfl__$internal_renderer_canvas_CanvasGraphics.context = graphics.__context;
		openfl__$internal_renderer_canvas_CanvasGraphics.fillCommands.clear();
		openfl__$internal_renderer_canvas_CanvasGraphics.strokeCommands.clear();
		openfl__$internal_renderer_canvas_CanvasGraphics.hasFill = false;
		openfl__$internal_renderer_canvas_CanvasGraphics.hasStroke = false;
		openfl__$internal_renderer_canvas_CanvasGraphics.bitmapFill = null;
		openfl__$internal_renderer_canvas_CanvasGraphics.bitmapRepeat = false;
		openfl__$internal_renderer_canvas_CanvasGraphics.context.beginPath();
		var data = new openfl__$internal_renderer_DrawCommandReader(graphics.__commands);
		var _g = 0;
		var _g1 = graphics.__commands.types;
		while(_g < _g1.length) {
			var type = _g1[_g];
			++_g;
			switch(type[1]) {
			case 3:
				var c = data.readCubicCurveTo();
				openfl__$internal_renderer_canvas_CanvasGraphics.fillCommands.cubicCurveTo(openfl__$internal_renderer__$DrawCommandReader_CubicCurveToView_$Impl_$.get_controlX1(c),openfl__$internal_renderer__$DrawCommandReader_CubicCurveToView_$Impl_$.get_controlY1(c),openfl__$internal_renderer__$DrawCommandReader_CubicCurveToView_$Impl_$.get_controlX2(c),openfl__$internal_renderer__$DrawCommandReader_CubicCurveToView_$Impl_$.get_controlY2(c),openfl__$internal_renderer__$DrawCommandReader_CubicCurveToView_$Impl_$.get_anchorX(c),openfl__$internal_renderer__$DrawCommandReader_CubicCurveToView_$Impl_$.get_anchorY(c));
				openfl__$internal_renderer_canvas_CanvasGraphics.strokeCommands.cubicCurveTo(openfl__$internal_renderer__$DrawCommandReader_CubicCurveToView_$Impl_$.get_controlX1(c),openfl__$internal_renderer__$DrawCommandReader_CubicCurveToView_$Impl_$.get_controlY1(c),openfl__$internal_renderer__$DrawCommandReader_CubicCurveToView_$Impl_$.get_controlX2(c),openfl__$internal_renderer__$DrawCommandReader_CubicCurveToView_$Impl_$.get_controlY2(c),openfl__$internal_renderer__$DrawCommandReader_CubicCurveToView_$Impl_$.get_anchorX(c),openfl__$internal_renderer__$DrawCommandReader_CubicCurveToView_$Impl_$.get_anchorY(c));
				break;
			case 4:
				var c1 = data.readCurveTo();
				openfl__$internal_renderer_canvas_CanvasGraphics.fillCommands.curveTo(openfl__$internal_renderer__$DrawCommandReader_CurveToView_$Impl_$.get_controlX(c1),openfl__$internal_renderer__$DrawCommandReader_CurveToView_$Impl_$.get_controlY(c1),openfl__$internal_renderer__$DrawCommandReader_CurveToView_$Impl_$.get_anchorX(c1),openfl__$internal_renderer__$DrawCommandReader_CurveToView_$Impl_$.get_anchorY(c1));
				openfl__$internal_renderer_canvas_CanvasGraphics.strokeCommands.curveTo(openfl__$internal_renderer__$DrawCommandReader_CurveToView_$Impl_$.get_controlX(c1),openfl__$internal_renderer__$DrawCommandReader_CurveToView_$Impl_$.get_controlY(c1),openfl__$internal_renderer__$DrawCommandReader_CurveToView_$Impl_$.get_anchorX(c1),openfl__$internal_renderer__$DrawCommandReader_CurveToView_$Impl_$.get_anchorY(c1));
				break;
			case 16:
				var c2 = data.readLineTo();
				openfl__$internal_renderer_canvas_CanvasGraphics.fillCommands.lineTo(openfl__$internal_renderer__$DrawCommandReader_LineToView_$Impl_$.get_x(c2),openfl__$internal_renderer__$DrawCommandReader_LineToView_$Impl_$.get_y(c2));
				openfl__$internal_renderer_canvas_CanvasGraphics.strokeCommands.lineTo(openfl__$internal_renderer__$DrawCommandReader_LineToView_$Impl_$.get_x(c2),openfl__$internal_renderer__$DrawCommandReader_LineToView_$Impl_$.get_y(c2));
				break;
			case 17:
				var c3 = data.readMoveTo();
				openfl__$internal_renderer_canvas_CanvasGraphics.fillCommands.moveTo(openfl__$internal_renderer__$DrawCommandReader_MoveToView_$Impl_$.get_x(c3),openfl__$internal_renderer__$DrawCommandReader_MoveToView_$Impl_$.get_y(c3));
				openfl__$internal_renderer_canvas_CanvasGraphics.strokeCommands.moveTo(openfl__$internal_renderer__$DrawCommandReader_MoveToView_$Impl_$.get_x(c3),openfl__$internal_renderer__$DrawCommandReader_MoveToView_$Impl_$.get_y(c3));
				break;
			case 14:
				var c4 = data.readLineGradientStyle();
				openfl__$internal_renderer_canvas_CanvasGraphics.strokeCommands.lineGradientStyle(openfl__$internal_renderer__$DrawCommandReader_LineGradientStyleView_$Impl_$.get_type(c4),openfl__$internal_renderer__$DrawCommandReader_LineGradientStyleView_$Impl_$.get_colors(c4),openfl__$internal_renderer__$DrawCommandReader_LineGradientStyleView_$Impl_$.get_alphas(c4),openfl__$internal_renderer__$DrawCommandReader_LineGradientStyleView_$Impl_$.get_ratios(c4),openfl__$internal_renderer__$DrawCommandReader_LineGradientStyleView_$Impl_$.get_matrix(c4),openfl__$internal_renderer__$DrawCommandReader_LineGradientStyleView_$Impl_$.get_spreadMethod(c4),openfl__$internal_renderer__$DrawCommandReader_LineGradientStyleView_$Impl_$.get_interpolationMethod(c4),openfl__$internal_renderer__$DrawCommandReader_LineGradientStyleView_$Impl_$.get_focalPointRatio(c4));
				break;
			case 13:
				var c5 = data.readLineBitmapStyle();
				openfl__$internal_renderer_canvas_CanvasGraphics.strokeCommands.lineBitmapStyle(openfl__$internal_renderer__$DrawCommandReader_LineBitmapStyleView_$Impl_$.get_bitmap(c5),openfl__$internal_renderer__$DrawCommandReader_LineBitmapStyleView_$Impl_$.get_matrix(c5),openfl__$internal_renderer__$DrawCommandReader_LineBitmapStyleView_$Impl_$.get_repeat(c5),openfl__$internal_renderer__$DrawCommandReader_LineBitmapStyleView_$Impl_$.get_smooth(c5));
				break;
			case 15:
				var c6 = data.readLineStyle();
				openfl__$internal_renderer_canvas_CanvasGraphics.strokeCommands.lineStyle(openfl__$internal_renderer__$DrawCommandReader_LineStyleView_$Impl_$.get_thickness(c6),openfl__$internal_renderer__$DrawCommandReader_LineStyleView_$Impl_$.get_color(c6),1,openfl__$internal_renderer__$DrawCommandReader_LineStyleView_$Impl_$.get_pixelHinting(c6),openfl__$internal_renderer__$DrawCommandReader_LineStyleView_$Impl_$.get_scaleMode(c6),openfl__$internal_renderer__$DrawCommandReader_LineStyleView_$Impl_$.get_caps(c6),openfl__$internal_renderer__$DrawCommandReader_LineStyleView_$Impl_$.get_joints(c6),openfl__$internal_renderer__$DrawCommandReader_LineStyleView_$Impl_$.get_miterLimit(c6));
				break;
			case 12:
				data.readEndFill();
				openfl__$internal_renderer_canvas_CanvasGraphics.endFill();
				openfl__$internal_renderer_canvas_CanvasGraphics.endStroke();
				if(openfl__$internal_renderer_canvas_CanvasGraphics.hasFill && openfl__$internal_renderer_canvas_CanvasGraphics.context.isPointInPath(x,y)) {
					data.destroy();
					return true;
				}
				if(openfl__$internal_renderer_canvas_CanvasGraphics.hasStroke && openfl__$internal_renderer_canvas_CanvasGraphics.context.isPointInStroke(x,y)) {
					data.destroy();
					return true;
				}
				openfl__$internal_renderer_canvas_CanvasGraphics.hasFill = false;
				openfl__$internal_renderer_canvas_CanvasGraphics.bitmapFill = null;
				break;
			case 0:case 1:case 2:
				openfl__$internal_renderer_canvas_CanvasGraphics.endFill();
				openfl__$internal_renderer_canvas_CanvasGraphics.endStroke();
				if(openfl__$internal_renderer_canvas_CanvasGraphics.hasFill && openfl__$internal_renderer_canvas_CanvasGraphics.context.isPointInPath(x,y)) {
					data.destroy();
					return true;
				}
				if(openfl__$internal_renderer_canvas_CanvasGraphics.hasStroke && openfl__$internal_renderer_canvas_CanvasGraphics.context.isPointInStroke(x,y)) {
					data.destroy();
					return true;
				}
				if(type == openfl__$internal_renderer_DrawCommandType.BEGIN_BITMAP_FILL) {
					var c7 = data.readBeginBitmapFill();
					openfl__$internal_renderer_canvas_CanvasGraphics.fillCommands.beginBitmapFill(openfl__$internal_renderer__$DrawCommandReader_BeginBitmapFillView_$Impl_$.get_bitmap(c7),openfl__$internal_renderer__$DrawCommandReader_BeginBitmapFillView_$Impl_$.get_matrix(c7),openfl__$internal_renderer__$DrawCommandReader_BeginBitmapFillView_$Impl_$.get_repeat(c7),openfl__$internal_renderer__$DrawCommandReader_BeginBitmapFillView_$Impl_$.get_smooth(c7));
					openfl__$internal_renderer_canvas_CanvasGraphics.strokeCommands.beginBitmapFill(openfl__$internal_renderer__$DrawCommandReader_BeginBitmapFillView_$Impl_$.get_bitmap(c7),openfl__$internal_renderer__$DrawCommandReader_BeginBitmapFillView_$Impl_$.get_matrix(c7),openfl__$internal_renderer__$DrawCommandReader_BeginBitmapFillView_$Impl_$.get_repeat(c7),openfl__$internal_renderer__$DrawCommandReader_BeginBitmapFillView_$Impl_$.get_smooth(c7));
				} else if(type == openfl__$internal_renderer_DrawCommandType.BEGIN_GRADIENT_FILL) {
					var c8 = data.readBeginGradientFill();
					openfl__$internal_renderer_canvas_CanvasGraphics.fillCommands.beginGradientFill(openfl__$internal_renderer__$DrawCommandReader_BeginGradientFillView_$Impl_$.get_type(c8),openfl__$internal_renderer__$DrawCommandReader_BeginGradientFillView_$Impl_$.get_colors(c8),openfl__$internal_renderer__$DrawCommandReader_BeginGradientFillView_$Impl_$.get_alphas(c8),openfl__$internal_renderer__$DrawCommandReader_BeginGradientFillView_$Impl_$.get_ratios(c8),openfl__$internal_renderer__$DrawCommandReader_BeginGradientFillView_$Impl_$.get_matrix(c8),openfl__$internal_renderer__$DrawCommandReader_BeginGradientFillView_$Impl_$.get_spreadMethod(c8),openfl__$internal_renderer__$DrawCommandReader_BeginGradientFillView_$Impl_$.get_interpolationMethod(c8),openfl__$internal_renderer__$DrawCommandReader_BeginGradientFillView_$Impl_$.get_focalPointRatio(c8));
					openfl__$internal_renderer_canvas_CanvasGraphics.strokeCommands.beginGradientFill(openfl__$internal_renderer__$DrawCommandReader_BeginGradientFillView_$Impl_$.get_type(c8),openfl__$internal_renderer__$DrawCommandReader_BeginGradientFillView_$Impl_$.get_colors(c8),openfl__$internal_renderer__$DrawCommandReader_BeginGradientFillView_$Impl_$.get_alphas(c8),openfl__$internal_renderer__$DrawCommandReader_BeginGradientFillView_$Impl_$.get_ratios(c8),openfl__$internal_renderer__$DrawCommandReader_BeginGradientFillView_$Impl_$.get_matrix(c8),openfl__$internal_renderer__$DrawCommandReader_BeginGradientFillView_$Impl_$.get_spreadMethod(c8),openfl__$internal_renderer__$DrawCommandReader_BeginGradientFillView_$Impl_$.get_interpolationMethod(c8),openfl__$internal_renderer__$DrawCommandReader_BeginGradientFillView_$Impl_$.get_focalPointRatio(c8));
				} else {
					var c9 = data.readBeginFill();
					openfl__$internal_renderer_canvas_CanvasGraphics.fillCommands.beginFill(openfl__$internal_renderer__$DrawCommandReader_BeginFillView_$Impl_$.get_color(c9),1);
					openfl__$internal_renderer_canvas_CanvasGraphics.strokeCommands.beginFill(openfl__$internal_renderer__$DrawCommandReader_BeginFillView_$Impl_$.get_color(c9),1);
				}
				break;
			case 5:
				var c10 = data.readDrawCircle();
				openfl__$internal_renderer_canvas_CanvasGraphics.fillCommands.drawCircle(openfl__$internal_renderer__$DrawCommandReader_DrawCircleView_$Impl_$.get_x(c10),openfl__$internal_renderer__$DrawCommandReader_DrawCircleView_$Impl_$.get_y(c10),openfl__$internal_renderer__$DrawCommandReader_DrawCircleView_$Impl_$.get_radius(c10));
				openfl__$internal_renderer_canvas_CanvasGraphics.strokeCommands.drawCircle(openfl__$internal_renderer__$DrawCommandReader_DrawCircleView_$Impl_$.get_x(c10),openfl__$internal_renderer__$DrawCommandReader_DrawCircleView_$Impl_$.get_y(c10),openfl__$internal_renderer__$DrawCommandReader_DrawCircleView_$Impl_$.get_radius(c10));
				break;
			case 6:
				var c11 = data.readDrawEllipse();
				openfl__$internal_renderer_canvas_CanvasGraphics.fillCommands.drawEllipse(openfl__$internal_renderer__$DrawCommandReader_DrawEllipseView_$Impl_$.get_x(c11),openfl__$internal_renderer__$DrawCommandReader_DrawEllipseView_$Impl_$.get_y(c11),openfl__$internal_renderer__$DrawCommandReader_DrawEllipseView_$Impl_$.get_width(c11),openfl__$internal_renderer__$DrawCommandReader_DrawEllipseView_$Impl_$.get_height(c11));
				openfl__$internal_renderer_canvas_CanvasGraphics.strokeCommands.drawEllipse(openfl__$internal_renderer__$DrawCommandReader_DrawEllipseView_$Impl_$.get_x(c11),openfl__$internal_renderer__$DrawCommandReader_DrawEllipseView_$Impl_$.get_y(c11),openfl__$internal_renderer__$DrawCommandReader_DrawEllipseView_$Impl_$.get_width(c11),openfl__$internal_renderer__$DrawCommandReader_DrawEllipseView_$Impl_$.get_height(c11));
				break;
			case 8:
				var c12 = data.readDrawRect();
				openfl__$internal_renderer_canvas_CanvasGraphics.fillCommands.drawRect(openfl__$internal_renderer__$DrawCommandReader_DrawRectView_$Impl_$.get_x(c12),openfl__$internal_renderer__$DrawCommandReader_DrawRectView_$Impl_$.get_y(c12),openfl__$internal_renderer__$DrawCommandReader_DrawRectView_$Impl_$.get_width(c12),openfl__$internal_renderer__$DrawCommandReader_DrawRectView_$Impl_$.get_height(c12));
				openfl__$internal_renderer_canvas_CanvasGraphics.strokeCommands.drawRect(openfl__$internal_renderer__$DrawCommandReader_DrawRectView_$Impl_$.get_x(c12),openfl__$internal_renderer__$DrawCommandReader_DrawRectView_$Impl_$.get_y(c12),openfl__$internal_renderer__$DrawCommandReader_DrawRectView_$Impl_$.get_width(c12),openfl__$internal_renderer__$DrawCommandReader_DrawRectView_$Impl_$.get_height(c12));
				break;
			case 9:
				var c13 = data.readDrawRoundRect();
				openfl__$internal_renderer_canvas_CanvasGraphics.fillCommands.drawRoundRect(openfl__$internal_renderer__$DrawCommandReader_DrawRoundRectView_$Impl_$.get_x(c13),openfl__$internal_renderer__$DrawCommandReader_DrawRoundRectView_$Impl_$.get_y(c13),openfl__$internal_renderer__$DrawCommandReader_DrawRoundRectView_$Impl_$.get_width(c13),openfl__$internal_renderer__$DrawCommandReader_DrawRoundRectView_$Impl_$.get_height(c13),openfl__$internal_renderer__$DrawCommandReader_DrawRoundRectView_$Impl_$.get_ellipseWidth(c13),openfl__$internal_renderer__$DrawCommandReader_DrawRoundRectView_$Impl_$.get_ellipseHeight(c13));
				openfl__$internal_renderer_canvas_CanvasGraphics.strokeCommands.drawRoundRect(openfl__$internal_renderer__$DrawCommandReader_DrawRoundRectView_$Impl_$.get_x(c13),openfl__$internal_renderer__$DrawCommandReader_DrawRoundRectView_$Impl_$.get_y(c13),openfl__$internal_renderer__$DrawCommandReader_DrawRoundRectView_$Impl_$.get_width(c13),openfl__$internal_renderer__$DrawCommandReader_DrawRoundRectView_$Impl_$.get_height(c13),openfl__$internal_renderer__$DrawCommandReader_DrawRoundRectView_$Impl_$.get_ellipseWidth(c13),openfl__$internal_renderer__$DrawCommandReader_DrawRoundRectView_$Impl_$.get_ellipseHeight(c13));
				break;
			default:
				data.skip(type);
			}
		}
		if(openfl__$internal_renderer_canvas_CanvasGraphics.fillCommands.get_length() > 0) openfl__$internal_renderer_canvas_CanvasGraphics.endFill();
		if(openfl__$internal_renderer_canvas_CanvasGraphics.strokeCommands.get_length() > 0) openfl__$internal_renderer_canvas_CanvasGraphics.endStroke();
		data.destroy();
		if(openfl__$internal_renderer_canvas_CanvasGraphics.hasFill && openfl__$internal_renderer_canvas_CanvasGraphics.context.isPointInPath(x,y)) return true;
		if(openfl__$internal_renderer_canvas_CanvasGraphics.hasStroke && openfl__$internal_renderer_canvas_CanvasGraphics.context.isPointInStroke(x,y)) return true;
	}
	return false;
};
openfl__$internal_renderer_canvas_CanvasGraphics.normalizeUVT = function(uvt,skipT) {
	if(skipT == null) skipT = false;
	var max = -Infinity;
	var tmp = -Infinity;
	var len = uvt.length;
	var _g1 = 1;
	var _g = len + 1;
	while(_g1 < _g) {
		var t = _g1++;
		if(skipT && t % 3 == 0) continue;
		tmp = uvt.data[t - 1];
		if(max < tmp) max = tmp;
	}
	var result;
	var this1;
	this1 = new openfl_VectorData();
	var this2;
	this2 = new Array(0);
	this1.data = this2;
	this1.length = 0;
	this1.fixed = false;
	result = this1;
	var _g11 = 1;
	var _g2 = len + 1;
	while(_g11 < _g2) {
		var t1 = _g11++;
		if(skipT && t1 % 3 == 0) continue;
		if(!result.fixed) {
			result.length++;
			if(result.data.length < result.length) {
				var data;
				var this3;
				this3 = new Array(result.data.length + 10);
				data = this3;
				haxe_ds__$Vector_Vector_$Impl_$.blit(result.data,0,data,0,result.data.length);
				result.data = data;
			}
			result.data[result.length - 1] = uvt.data[t1 - 1] / max;
		}
		result.length;
	}
	return { max : max, uvt : result};
};
openfl__$internal_renderer_canvas_CanvasGraphics.playCommands = function(commands,stroke) {
	if(stroke == null) stroke = false;
	openfl__$internal_renderer_canvas_CanvasGraphics.bounds = openfl__$internal_renderer_canvas_CanvasGraphics.graphics.__bounds;
	var offsetX = openfl__$internal_renderer_canvas_CanvasGraphics.bounds.x;
	var offsetY = openfl__$internal_renderer_canvas_CanvasGraphics.bounds.y;
	var positionX = 0.0;
	var positionY = 0.0;
	var closeGap = false;
	var startX = 0.0;
	var startY = 0.0;
	var data = new openfl__$internal_renderer_DrawCommandReader(commands);
	var _g = 0;
	var _g1 = commands.types;
	while(_g < _g1.length) {
		var type = _g1[_g];
		++_g;
		switch(type[1]) {
		case 3:
			var c = data.readCubicCurveTo();
			openfl__$internal_renderer_canvas_CanvasGraphics.context.bezierCurveTo(openfl__$internal_renderer__$DrawCommandReader_CubicCurveToView_$Impl_$.get_controlX1(c) - offsetX,openfl__$internal_renderer__$DrawCommandReader_CubicCurveToView_$Impl_$.get_controlY1(c) - offsetY,openfl__$internal_renderer__$DrawCommandReader_CubicCurveToView_$Impl_$.get_controlX2(c) - offsetX,openfl__$internal_renderer__$DrawCommandReader_CubicCurveToView_$Impl_$.get_controlY2(c) - offsetY,openfl__$internal_renderer__$DrawCommandReader_CubicCurveToView_$Impl_$.get_anchorX(c) - offsetX,openfl__$internal_renderer__$DrawCommandReader_CubicCurveToView_$Impl_$.get_anchorY(c) - offsetY);
			break;
		case 4:
			var c1 = data.readCurveTo();
			openfl__$internal_renderer_canvas_CanvasGraphics.context.quadraticCurveTo(openfl__$internal_renderer__$DrawCommandReader_CurveToView_$Impl_$.get_controlX(c1) - offsetX,openfl__$internal_renderer__$DrawCommandReader_CurveToView_$Impl_$.get_controlY(c1) - offsetY,openfl__$internal_renderer__$DrawCommandReader_CurveToView_$Impl_$.get_anchorX(c1) - offsetX,openfl__$internal_renderer__$DrawCommandReader_CurveToView_$Impl_$.get_anchorY(c1) - offsetY);
			break;
		case 5:
			var c2 = data.readDrawCircle();
			openfl__$internal_renderer_canvas_CanvasGraphics.context.moveTo(openfl__$internal_renderer__$DrawCommandReader_DrawCircleView_$Impl_$.get_x(c2) - offsetX + openfl__$internal_renderer__$DrawCommandReader_DrawCircleView_$Impl_$.get_radius(c2),openfl__$internal_renderer__$DrawCommandReader_DrawCircleView_$Impl_$.get_y(c2) - offsetY);
			openfl__$internal_renderer_canvas_CanvasGraphics.context.arc(openfl__$internal_renderer__$DrawCommandReader_DrawCircleView_$Impl_$.get_x(c2) - offsetX,openfl__$internal_renderer__$DrawCommandReader_DrawCircleView_$Impl_$.get_y(c2) - offsetY,openfl__$internal_renderer__$DrawCommandReader_DrawCircleView_$Impl_$.get_radius(c2),0,Math.PI * 2,true);
			break;
		case 6:
			var c3 = data.readDrawEllipse();
			var x = openfl__$internal_renderer__$DrawCommandReader_DrawEllipseView_$Impl_$.get_x(c3);
			var y = openfl__$internal_renderer__$DrawCommandReader_DrawEllipseView_$Impl_$.get_y(c3);
			var width = openfl__$internal_renderer__$DrawCommandReader_DrawEllipseView_$Impl_$.get_width(c3);
			var height = openfl__$internal_renderer__$DrawCommandReader_DrawEllipseView_$Impl_$.get_height(c3);
			x -= offsetX;
			y -= offsetY;
			var kappa = .5522848;
			var ox = width / 2 * kappa;
			var oy = height / 2 * kappa;
			var xe = x + width;
			var ye = y + height;
			var xm = x + width / 2;
			var ym = y + height / 2;
			openfl__$internal_renderer_canvas_CanvasGraphics.context.moveTo(x,ym);
			openfl__$internal_renderer_canvas_CanvasGraphics.context.bezierCurveTo(x,ym - oy,xm - ox,y,xm,y);
			openfl__$internal_renderer_canvas_CanvasGraphics.context.bezierCurveTo(xm + ox,y,xe,ym - oy,xe,ym);
			openfl__$internal_renderer_canvas_CanvasGraphics.context.bezierCurveTo(xe,ym + oy,xm + ox,ye,xm,ye);
			openfl__$internal_renderer_canvas_CanvasGraphics.context.bezierCurveTo(xm - ox,ye,x,ym + oy,x,ym);
			break;
		case 9:
			var c4 = data.readDrawRoundRect();
			openfl__$internal_renderer_canvas_CanvasGraphics.drawRoundRect(openfl__$internal_renderer__$DrawCommandReader_DrawRoundRectView_$Impl_$.get_x(c4) - offsetX,openfl__$internal_renderer__$DrawCommandReader_DrawRoundRectView_$Impl_$.get_y(c4) - offsetY,openfl__$internal_renderer__$DrawCommandReader_DrawRoundRectView_$Impl_$.get_width(c4),openfl__$internal_renderer__$DrawCommandReader_DrawRoundRectView_$Impl_$.get_height(c4),openfl__$internal_renderer__$DrawCommandReader_DrawRoundRectView_$Impl_$.get_ellipseWidth(c4),openfl__$internal_renderer__$DrawCommandReader_DrawRoundRectView_$Impl_$.get_ellipseHeight(c4));
			break;
		case 16:
			var c5 = data.readLineTo();
			openfl__$internal_renderer_canvas_CanvasGraphics.context.lineTo(openfl__$internal_renderer__$DrawCommandReader_LineToView_$Impl_$.get_x(c5) - offsetX,openfl__$internal_renderer__$DrawCommandReader_LineToView_$Impl_$.get_y(c5) - offsetY);
			positionX = openfl__$internal_renderer__$DrawCommandReader_LineToView_$Impl_$.get_x(c5);
			positionY = openfl__$internal_renderer__$DrawCommandReader_LineToView_$Impl_$.get_y(c5);
			break;
		case 17:
			var c6 = data.readMoveTo();
			openfl__$internal_renderer_canvas_CanvasGraphics.context.moveTo(openfl__$internal_renderer__$DrawCommandReader_MoveToView_$Impl_$.get_x(c6) - offsetX,openfl__$internal_renderer__$DrawCommandReader_MoveToView_$Impl_$.get_y(c6) - offsetY);
			positionX = openfl__$internal_renderer__$DrawCommandReader_MoveToView_$Impl_$.get_x(c6);
			positionY = openfl__$internal_renderer__$DrawCommandReader_MoveToView_$Impl_$.get_y(c6);
			closeGap = true;
			startX = openfl__$internal_renderer__$DrawCommandReader_MoveToView_$Impl_$.get_x(c6);
			startY = openfl__$internal_renderer__$DrawCommandReader_MoveToView_$Impl_$.get_y(c6);
			break;
		case 15:
			var c7 = data.readLineStyle();
			if(stroke && openfl__$internal_renderer_canvas_CanvasGraphics.hasStroke) {
				openfl__$internal_renderer_canvas_CanvasGraphics.context.closePath();
				if(!openfl__$internal_renderer_canvas_CanvasGraphics.hitTesting) openfl__$internal_renderer_canvas_CanvasGraphics.context.stroke();
				openfl__$internal_renderer_canvas_CanvasGraphics.context.beginPath();
			}
			openfl__$internal_renderer_canvas_CanvasGraphics.context.moveTo(positionX - offsetX,positionY - offsetY);
			if(openfl__$internal_renderer__$DrawCommandReader_LineStyleView_$Impl_$.get_thickness(c7) == null) openfl__$internal_renderer_canvas_CanvasGraphics.hasStroke = false; else {
				if(openfl__$internal_renderer__$DrawCommandReader_LineStyleView_$Impl_$.get_thickness(c7) > 0) openfl__$internal_renderer_canvas_CanvasGraphics.context.lineWidth = openfl__$internal_renderer__$DrawCommandReader_LineStyleView_$Impl_$.get_thickness(c7); else openfl__$internal_renderer_canvas_CanvasGraphics.context.lineWidth = 1;
				if(openfl__$internal_renderer__$DrawCommandReader_LineStyleView_$Impl_$.get_joints(c7) == null) openfl__$internal_renderer_canvas_CanvasGraphics.context.lineJoin = "round"; else openfl__$internal_renderer_canvas_CanvasGraphics.context.lineJoin = openfl_display__$JointStyle_JointStyle_$Impl_$.toString(openfl__$internal_renderer__$DrawCommandReader_LineStyleView_$Impl_$.get_joints(c7)).toLowerCase();
				if(openfl__$internal_renderer__$DrawCommandReader_LineStyleView_$Impl_$.get_caps(c7) == null) openfl__$internal_renderer_canvas_CanvasGraphics.context.lineCap = "round"; else {
					var _g2 = openfl__$internal_renderer__$DrawCommandReader_LineStyleView_$Impl_$.get_caps(c7);
					switch(_g2) {
					case 0:
						openfl__$internal_renderer_canvas_CanvasGraphics.context.lineCap = "butt";
						break;
					default:
						openfl__$internal_renderer_canvas_CanvasGraphics.context.lineCap = openfl_display__$CapsStyle_CapsStyle_$Impl_$.toString(openfl__$internal_renderer__$DrawCommandReader_LineStyleView_$Impl_$.get_caps(c7)).toLowerCase();
					}
				}
				openfl__$internal_renderer_canvas_CanvasGraphics.context.miterLimit = openfl__$internal_renderer__$DrawCommandReader_LineStyleView_$Impl_$.get_miterLimit(c7);
				if(openfl__$internal_renderer__$DrawCommandReader_LineStyleView_$Impl_$.get_alpha(c7) == 1) openfl__$internal_renderer_canvas_CanvasGraphics.context.strokeStyle = "#" + StringTools.hex(openfl__$internal_renderer__$DrawCommandReader_LineStyleView_$Impl_$.get_color(c7) & 16777215,6); else {
					var r = (openfl__$internal_renderer__$DrawCommandReader_LineStyleView_$Impl_$.get_color(c7) & 16711680) >>> 16;
					var g = (openfl__$internal_renderer__$DrawCommandReader_LineStyleView_$Impl_$.get_color(c7) & 65280) >>> 8;
					var b = openfl__$internal_renderer__$DrawCommandReader_LineStyleView_$Impl_$.get_color(c7) & 255;
					openfl__$internal_renderer_canvas_CanvasGraphics.context.strokeStyle = "rgba(" + r + ", " + g + ", " + b + ", " + openfl__$internal_renderer__$DrawCommandReader_LineStyleView_$Impl_$.get_alpha(c7) + ")";
				}
				openfl__$internal_renderer_canvas_CanvasGraphics.hasStroke = true;
			}
			break;
		case 14:
			var c8 = data.readLineGradientStyle();
			if(stroke && openfl__$internal_renderer_canvas_CanvasGraphics.hasStroke) openfl__$internal_renderer_canvas_CanvasGraphics.closePath();
			openfl__$internal_renderer_canvas_CanvasGraphics.context.moveTo(positionX - offsetX,positionY - offsetY);
			openfl__$internal_renderer_canvas_CanvasGraphics.context.strokeStyle = openfl__$internal_renderer_canvas_CanvasGraphics.createGradientPattern(openfl__$internal_renderer__$DrawCommandReader_LineGradientStyleView_$Impl_$.get_type(c8),openfl__$internal_renderer__$DrawCommandReader_LineGradientStyleView_$Impl_$.get_colors(c8),openfl__$internal_renderer__$DrawCommandReader_LineGradientStyleView_$Impl_$.get_alphas(c8),openfl__$internal_renderer__$DrawCommandReader_LineGradientStyleView_$Impl_$.get_ratios(c8),openfl__$internal_renderer__$DrawCommandReader_LineGradientStyleView_$Impl_$.get_matrix(c8),openfl__$internal_renderer__$DrawCommandReader_LineGradientStyleView_$Impl_$.get_spreadMethod(c8),openfl__$internal_renderer__$DrawCommandReader_LineGradientStyleView_$Impl_$.get_interpolationMethod(c8),openfl__$internal_renderer__$DrawCommandReader_LineGradientStyleView_$Impl_$.get_focalPointRatio(c8));
			openfl__$internal_renderer_canvas_CanvasGraphics.hasStroke = true;
			break;
		case 13:
			var c9 = data.readLineBitmapStyle();
			if(stroke && openfl__$internal_renderer_canvas_CanvasGraphics.hasStroke) openfl__$internal_renderer_canvas_CanvasGraphics.closePath();
			openfl__$internal_renderer_canvas_CanvasGraphics.context.moveTo(positionX - offsetX,positionY - offsetY);
			openfl__$internal_renderer_canvas_CanvasGraphics.context.strokeStyle = openfl__$internal_renderer_canvas_CanvasGraphics.createBitmapFill(openfl__$internal_renderer__$DrawCommandReader_LineBitmapStyleView_$Impl_$.get_bitmap(c9),openfl__$internal_renderer__$DrawCommandReader_LineBitmapStyleView_$Impl_$.get_repeat(c9));
			openfl__$internal_renderer_canvas_CanvasGraphics.hasStroke = true;
			break;
		case 0:
			var c10 = data.readBeginBitmapFill();
			openfl__$internal_renderer_canvas_CanvasGraphics.context.fillStyle = openfl__$internal_renderer_canvas_CanvasGraphics.createBitmapFill(openfl__$internal_renderer__$DrawCommandReader_BeginBitmapFillView_$Impl_$.get_bitmap(c10),true);
			openfl__$internal_renderer_canvas_CanvasGraphics.hasFill = true;
			if(openfl__$internal_renderer__$DrawCommandReader_BeginBitmapFillView_$Impl_$.get_matrix(c10) != null) {
				openfl__$internal_renderer_canvas_CanvasGraphics.pendingMatrix = openfl__$internal_renderer__$DrawCommandReader_BeginBitmapFillView_$Impl_$.get_matrix(c10);
				openfl__$internal_renderer_canvas_CanvasGraphics.inversePendingMatrix = openfl__$internal_renderer__$DrawCommandReader_BeginBitmapFillView_$Impl_$.get_matrix(c10).clone();
				openfl__$internal_renderer_canvas_CanvasGraphics.inversePendingMatrix.invert();
			} else {
				openfl__$internal_renderer_canvas_CanvasGraphics.pendingMatrix = null;
				openfl__$internal_renderer_canvas_CanvasGraphics.inversePendingMatrix = null;
			}
			break;
		case 1:
			var c11 = data.readBeginFill();
			if(openfl__$internal_renderer__$DrawCommandReader_BeginFillView_$Impl_$.get_alpha(c11) < 0.005) openfl__$internal_renderer_canvas_CanvasGraphics.hasFill = false; else {
				if(openfl__$internal_renderer__$DrawCommandReader_BeginFillView_$Impl_$.get_alpha(c11) == 1) openfl__$internal_renderer_canvas_CanvasGraphics.context.fillStyle = "#" + StringTools.hex(openfl__$internal_renderer__$DrawCommandReader_BeginFillView_$Impl_$.get_color(c11),6); else {
					var r1 = (openfl__$internal_renderer__$DrawCommandReader_BeginFillView_$Impl_$.get_color(c11) & 16711680) >>> 16;
					var g1 = (openfl__$internal_renderer__$DrawCommandReader_BeginFillView_$Impl_$.get_color(c11) & 65280) >>> 8;
					var b1 = openfl__$internal_renderer__$DrawCommandReader_BeginFillView_$Impl_$.get_color(c11) & 255;
					openfl__$internal_renderer_canvas_CanvasGraphics.context.fillStyle = "rgba(" + r1 + ", " + g1 + ", " + b1 + ", " + openfl__$internal_renderer__$DrawCommandReader_BeginFillView_$Impl_$.get_alpha(c11) + ")";
				}
				openfl__$internal_renderer_canvas_CanvasGraphics.bitmapFill = null;
				openfl__$internal_renderer_canvas_CanvasGraphics.hasFill = true;
			}
			break;
		case 2:
			var c12 = data.readBeginGradientFill();
			openfl__$internal_renderer_canvas_CanvasGraphics.context.fillStyle = openfl__$internal_renderer_canvas_CanvasGraphics.createGradientPattern(openfl__$internal_renderer__$DrawCommandReader_BeginGradientFillView_$Impl_$.get_type(c12),openfl__$internal_renderer__$DrawCommandReader_BeginGradientFillView_$Impl_$.get_colors(c12),openfl__$internal_renderer__$DrawCommandReader_BeginGradientFillView_$Impl_$.get_alphas(c12),openfl__$internal_renderer__$DrawCommandReader_BeginGradientFillView_$Impl_$.get_ratios(c12),openfl__$internal_renderer__$DrawCommandReader_BeginGradientFillView_$Impl_$.get_matrix(c12),openfl__$internal_renderer__$DrawCommandReader_BeginGradientFillView_$Impl_$.get_spreadMethod(c12),openfl__$internal_renderer__$DrawCommandReader_BeginGradientFillView_$Impl_$.get_interpolationMethod(c12),openfl__$internal_renderer__$DrawCommandReader_BeginGradientFillView_$Impl_$.get_focalPointRatio(c12));
			openfl__$internal_renderer_canvas_CanvasGraphics.bitmapFill = null;
			openfl__$internal_renderer_canvas_CanvasGraphics.hasFill = true;
			break;
		case 8:
			var c13 = data.readDrawRect();
			var optimizationUsed = false;
			if(openfl__$internal_renderer_canvas_CanvasGraphics.bitmapFill != null) {
				var st = 0;
				var sr = 0;
				var sb = 0;
				var sl = 0;
				var canOptimizeMatrix = true;
				if(openfl__$internal_renderer_canvas_CanvasGraphics.pendingMatrix != null) {
					if(openfl__$internal_renderer_canvas_CanvasGraphics.pendingMatrix.b != 0 || openfl__$internal_renderer_canvas_CanvasGraphics.pendingMatrix.c != 0) canOptimizeMatrix = false; else {
						var stl = openfl__$internal_renderer_canvas_CanvasGraphics.inversePendingMatrix.transformPoint(new openfl_geom_Point(openfl__$internal_renderer__$DrawCommandReader_DrawRectView_$Impl_$.get_x(c13),openfl__$internal_renderer__$DrawCommandReader_DrawRectView_$Impl_$.get_y(c13)));
						var sbr = openfl__$internal_renderer_canvas_CanvasGraphics.inversePendingMatrix.transformPoint(new openfl_geom_Point(openfl__$internal_renderer__$DrawCommandReader_DrawRectView_$Impl_$.get_x(c13) + openfl__$internal_renderer__$DrawCommandReader_DrawRectView_$Impl_$.get_width(c13),openfl__$internal_renderer__$DrawCommandReader_DrawRectView_$Impl_$.get_y(c13) + openfl__$internal_renderer__$DrawCommandReader_DrawRectView_$Impl_$.get_height(c13)));
						st = stl.y;
						sl = stl.x;
						sb = sbr.y;
						sr = sbr.x;
					}
				} else {
					st = openfl__$internal_renderer__$DrawCommandReader_DrawRectView_$Impl_$.get_y(c13);
					sl = openfl__$internal_renderer__$DrawCommandReader_DrawRectView_$Impl_$.get_x(c13);
					sb = openfl__$internal_renderer__$DrawCommandReader_DrawRectView_$Impl_$.get_y(c13) + openfl__$internal_renderer__$DrawCommandReader_DrawRectView_$Impl_$.get_height(c13);
					sr = openfl__$internal_renderer__$DrawCommandReader_DrawRectView_$Impl_$.get_x(c13) + openfl__$internal_renderer__$DrawCommandReader_DrawRectView_$Impl_$.get_width(c13);
				}
				if(canOptimizeMatrix && st >= 0 && sl >= 0 && sr <= openfl__$internal_renderer_canvas_CanvasGraphics.bitmapFill.width && sb <= openfl__$internal_renderer_canvas_CanvasGraphics.bitmapFill.height) {
					optimizationUsed = true;
					if(!openfl__$internal_renderer_canvas_CanvasGraphics.hitTesting) openfl__$internal_renderer_canvas_CanvasGraphics.context.drawImage(openfl__$internal_renderer_canvas_CanvasGraphics.bitmapFill.image.get_src(),sl,st,sr - sl,sb - st,openfl__$internal_renderer__$DrawCommandReader_DrawRectView_$Impl_$.get_x(c13) - offsetX,openfl__$internal_renderer__$DrawCommandReader_DrawRectView_$Impl_$.get_y(c13) - offsetY,openfl__$internal_renderer__$DrawCommandReader_DrawRectView_$Impl_$.get_width(c13),openfl__$internal_renderer__$DrawCommandReader_DrawRectView_$Impl_$.get_height(c13));
				}
			}
			if(!optimizationUsed) openfl__$internal_renderer_canvas_CanvasGraphics.context.rect(openfl__$internal_renderer__$DrawCommandReader_DrawRectView_$Impl_$.get_x(c13) - offsetX,openfl__$internal_renderer__$DrawCommandReader_DrawRectView_$Impl_$.get_y(c13) - offsetY,openfl__$internal_renderer__$DrawCommandReader_DrawRectView_$Impl_$.get_width(c13),openfl__$internal_renderer__$DrawCommandReader_DrawRectView_$Impl_$.get_height(c13));
			break;
		default:
			data.skip(type);
		}
	}
	data.destroy();
	if(stroke && openfl__$internal_renderer_canvas_CanvasGraphics.hasStroke) {
		if(openfl__$internal_renderer_canvas_CanvasGraphics.hasFill && closeGap) openfl__$internal_renderer_canvas_CanvasGraphics.context.lineTo(startX - offsetX,startY - offsetY); else if(closeGap && positionX == startX && positionY == startY) openfl__$internal_renderer_canvas_CanvasGraphics.context.closePath();
		if(!openfl__$internal_renderer_canvas_CanvasGraphics.hitTesting) openfl__$internal_renderer_canvas_CanvasGraphics.context.stroke();
	}
	if(!stroke) {
		if(openfl__$internal_renderer_canvas_CanvasGraphics.hasFill || openfl__$internal_renderer_canvas_CanvasGraphics.bitmapFill != null) {
			openfl__$internal_renderer_canvas_CanvasGraphics.context.translate(-openfl__$internal_renderer_canvas_CanvasGraphics.bounds.x,-openfl__$internal_renderer_canvas_CanvasGraphics.bounds.y);
			if(openfl__$internal_renderer_canvas_CanvasGraphics.pendingMatrix != null) {
				openfl__$internal_renderer_canvas_CanvasGraphics.context.transform(openfl__$internal_renderer_canvas_CanvasGraphics.pendingMatrix.a,openfl__$internal_renderer_canvas_CanvasGraphics.pendingMatrix.b,openfl__$internal_renderer_canvas_CanvasGraphics.pendingMatrix.c,openfl__$internal_renderer_canvas_CanvasGraphics.pendingMatrix.d,openfl__$internal_renderer_canvas_CanvasGraphics.pendingMatrix.tx,openfl__$internal_renderer_canvas_CanvasGraphics.pendingMatrix.ty);
				if(!openfl__$internal_renderer_canvas_CanvasGraphics.hitTesting) openfl__$internal_renderer_canvas_CanvasGraphics.context.fill();
				openfl__$internal_renderer_canvas_CanvasGraphics.context.transform(openfl__$internal_renderer_canvas_CanvasGraphics.inversePendingMatrix.a,openfl__$internal_renderer_canvas_CanvasGraphics.inversePendingMatrix.b,openfl__$internal_renderer_canvas_CanvasGraphics.inversePendingMatrix.c,openfl__$internal_renderer_canvas_CanvasGraphics.inversePendingMatrix.d,openfl__$internal_renderer_canvas_CanvasGraphics.inversePendingMatrix.tx,openfl__$internal_renderer_canvas_CanvasGraphics.inversePendingMatrix.ty);
			} else if(!openfl__$internal_renderer_canvas_CanvasGraphics.hitTesting) openfl__$internal_renderer_canvas_CanvasGraphics.context.fill();
			openfl__$internal_renderer_canvas_CanvasGraphics.context.translate(openfl__$internal_renderer_canvas_CanvasGraphics.bounds.x,openfl__$internal_renderer_canvas_CanvasGraphics.bounds.y);
			openfl__$internal_renderer_canvas_CanvasGraphics.context.closePath();
		}
	}
};
openfl__$internal_renderer_canvas_CanvasGraphics.render = function(graphics,renderSession) {
	var directRender = false;
	if(graphics.__dirty || directRender) {
		openfl__$internal_renderer_canvas_CanvasGraphics.hitTesting = false;
		openfl__$internal_renderer_canvas_CanvasGraphics.graphics = graphics;
		openfl__$internal_renderer_canvas_CanvasGraphics.bounds = graphics.__bounds;
		if(!graphics.__visible || graphics.__commands.get_length() == 0 || openfl__$internal_renderer_canvas_CanvasGraphics.bounds == null || openfl__$internal_renderer_canvas_CanvasGraphics.bounds.width <= 0 || openfl__$internal_renderer_canvas_CanvasGraphics.bounds.height <= 0) {
			graphics.__canvas = null;
			graphics.__context = null;
			graphics.__bitmap = null;
		} else {
			if(directRender) {
				openfl__$internal_renderer_canvas_CanvasGraphics.context = renderSession.context;
				openfl__$internal_renderer_canvas_CanvasGraphics.bounds.setTo(0,0,openfl__$internal_renderer_canvas_CanvasGraphics.context.canvas.width,openfl__$internal_renderer_canvas_CanvasGraphics.context.canvas.width);
			} else {
				if(graphics.__canvas == null) {
					graphics.__canvas = window.document.createElement("canvas");
					graphics.__context = graphics.__canvas.getContext("2d");
				}
				openfl__$internal_renderer_canvas_CanvasGraphics.context = graphics.__context;
				graphics.__canvas.width = Math.ceil(openfl__$internal_renderer_canvas_CanvasGraphics.bounds.width);
				graphics.__canvas.height = Math.ceil(openfl__$internal_renderer_canvas_CanvasGraphics.bounds.height);
			}
			openfl__$internal_renderer_canvas_CanvasGraphics.fillCommands.clear();
			openfl__$internal_renderer_canvas_CanvasGraphics.strokeCommands.clear();
			openfl__$internal_renderer_canvas_CanvasGraphics.hasFill = false;
			openfl__$internal_renderer_canvas_CanvasGraphics.hasStroke = false;
			openfl__$internal_renderer_canvas_CanvasGraphics.bitmapFill = null;
			openfl__$internal_renderer_canvas_CanvasGraphics.bitmapRepeat = false;
			var data = new openfl__$internal_renderer_DrawCommandReader(graphics.__commands);
			var _g = 0;
			var _g1 = graphics.__commands.types;
			try {
				while(_g < _g1.length) {
					var type = _g1[_g];
					++_g;
					switch(type[1]) {
					case 3:
						var c = data.readCubicCurveTo();
						openfl__$internal_renderer_canvas_CanvasGraphics.fillCommands.cubicCurveTo(openfl__$internal_renderer__$DrawCommandReader_CubicCurveToView_$Impl_$.get_controlX1(c),openfl__$internal_renderer__$DrawCommandReader_CubicCurveToView_$Impl_$.get_controlY1(c),openfl__$internal_renderer__$DrawCommandReader_CubicCurveToView_$Impl_$.get_controlX2(c),openfl__$internal_renderer__$DrawCommandReader_CubicCurveToView_$Impl_$.get_controlY2(c),openfl__$internal_renderer__$DrawCommandReader_CubicCurveToView_$Impl_$.get_anchorX(c),openfl__$internal_renderer__$DrawCommandReader_CubicCurveToView_$Impl_$.get_anchorY(c));
						openfl__$internal_renderer_canvas_CanvasGraphics.strokeCommands.cubicCurveTo(openfl__$internal_renderer__$DrawCommandReader_CubicCurveToView_$Impl_$.get_controlX1(c),openfl__$internal_renderer__$DrawCommandReader_CubicCurveToView_$Impl_$.get_controlY1(c),openfl__$internal_renderer__$DrawCommandReader_CubicCurveToView_$Impl_$.get_controlX2(c),openfl__$internal_renderer__$DrawCommandReader_CubicCurveToView_$Impl_$.get_controlY2(c),openfl__$internal_renderer__$DrawCommandReader_CubicCurveToView_$Impl_$.get_anchorX(c),openfl__$internal_renderer__$DrawCommandReader_CubicCurveToView_$Impl_$.get_anchorY(c));
						break;
					case 4:
						var c1 = data.readCurveTo();
						openfl__$internal_renderer_canvas_CanvasGraphics.fillCommands.curveTo(openfl__$internal_renderer__$DrawCommandReader_CurveToView_$Impl_$.get_controlX(c1),openfl__$internal_renderer__$DrawCommandReader_CurveToView_$Impl_$.get_controlY(c1),openfl__$internal_renderer__$DrawCommandReader_CurveToView_$Impl_$.get_anchorX(c1),openfl__$internal_renderer__$DrawCommandReader_CurveToView_$Impl_$.get_anchorY(c1));
						openfl__$internal_renderer_canvas_CanvasGraphics.strokeCommands.curveTo(openfl__$internal_renderer__$DrawCommandReader_CurveToView_$Impl_$.get_controlX(c1),openfl__$internal_renderer__$DrawCommandReader_CurveToView_$Impl_$.get_controlY(c1),openfl__$internal_renderer__$DrawCommandReader_CurveToView_$Impl_$.get_anchorX(c1),openfl__$internal_renderer__$DrawCommandReader_CurveToView_$Impl_$.get_anchorY(c1));
						break;
					case 16:
						var c2 = data.readLineTo();
						openfl__$internal_renderer_canvas_CanvasGraphics.fillCommands.lineTo(openfl__$internal_renderer__$DrawCommandReader_LineToView_$Impl_$.get_x(c2),openfl__$internal_renderer__$DrawCommandReader_LineToView_$Impl_$.get_y(c2));
						openfl__$internal_renderer_canvas_CanvasGraphics.strokeCommands.lineTo(openfl__$internal_renderer__$DrawCommandReader_LineToView_$Impl_$.get_x(c2),openfl__$internal_renderer__$DrawCommandReader_LineToView_$Impl_$.get_y(c2));
						break;
					case 17:
						var c3 = data.readMoveTo();
						openfl__$internal_renderer_canvas_CanvasGraphics.fillCommands.moveTo(openfl__$internal_renderer__$DrawCommandReader_MoveToView_$Impl_$.get_x(c3),openfl__$internal_renderer__$DrawCommandReader_MoveToView_$Impl_$.get_y(c3));
						openfl__$internal_renderer_canvas_CanvasGraphics.strokeCommands.moveTo(openfl__$internal_renderer__$DrawCommandReader_MoveToView_$Impl_$.get_x(c3),openfl__$internal_renderer__$DrawCommandReader_MoveToView_$Impl_$.get_y(c3));
						break;
					case 12:
						data.readEndFill();
						openfl__$internal_renderer_canvas_CanvasGraphics.endFill();
						openfl__$internal_renderer_canvas_CanvasGraphics.endStroke();
						openfl__$internal_renderer_canvas_CanvasGraphics.hasFill = false;
						openfl__$internal_renderer_canvas_CanvasGraphics.bitmapFill = null;
						break;
					case 15:
						var c4 = data.readLineStyle();
						openfl__$internal_renderer_canvas_CanvasGraphics.strokeCommands.lineStyle(openfl__$internal_renderer__$DrawCommandReader_LineStyleView_$Impl_$.get_thickness(c4),openfl__$internal_renderer__$DrawCommandReader_LineStyleView_$Impl_$.get_color(c4),openfl__$internal_renderer__$DrawCommandReader_LineStyleView_$Impl_$.get_alpha(c4),openfl__$internal_renderer__$DrawCommandReader_LineStyleView_$Impl_$.get_pixelHinting(c4),openfl__$internal_renderer__$DrawCommandReader_LineStyleView_$Impl_$.get_scaleMode(c4),openfl__$internal_renderer__$DrawCommandReader_LineStyleView_$Impl_$.get_caps(c4),openfl__$internal_renderer__$DrawCommandReader_LineStyleView_$Impl_$.get_joints(c4),openfl__$internal_renderer__$DrawCommandReader_LineStyleView_$Impl_$.get_miterLimit(c4));
						break;
					case 14:
						var c5 = data.readLineGradientStyle();
						openfl__$internal_renderer_canvas_CanvasGraphics.strokeCommands.lineGradientStyle(openfl__$internal_renderer__$DrawCommandReader_LineGradientStyleView_$Impl_$.get_type(c5),openfl__$internal_renderer__$DrawCommandReader_LineGradientStyleView_$Impl_$.get_colors(c5),openfl__$internal_renderer__$DrawCommandReader_LineGradientStyleView_$Impl_$.get_alphas(c5),openfl__$internal_renderer__$DrawCommandReader_LineGradientStyleView_$Impl_$.get_ratios(c5),openfl__$internal_renderer__$DrawCommandReader_LineGradientStyleView_$Impl_$.get_matrix(c5),openfl__$internal_renderer__$DrawCommandReader_LineGradientStyleView_$Impl_$.get_spreadMethod(c5),openfl__$internal_renderer__$DrawCommandReader_LineGradientStyleView_$Impl_$.get_interpolationMethod(c5),openfl__$internal_renderer__$DrawCommandReader_LineGradientStyleView_$Impl_$.get_focalPointRatio(c5));
						break;
					case 13:
						var c6 = data.readLineBitmapStyle();
						openfl__$internal_renderer_canvas_CanvasGraphics.strokeCommands.lineBitmapStyle(openfl__$internal_renderer__$DrawCommandReader_LineBitmapStyleView_$Impl_$.get_bitmap(c6),openfl__$internal_renderer__$DrawCommandReader_LineBitmapStyleView_$Impl_$.get_matrix(c6),openfl__$internal_renderer__$DrawCommandReader_LineBitmapStyleView_$Impl_$.get_repeat(c6),openfl__$internal_renderer__$DrawCommandReader_LineBitmapStyleView_$Impl_$.get_smooth(c6));
						break;
					case 0:case 1:case 2:
						openfl__$internal_renderer_canvas_CanvasGraphics.endFill();
						openfl__$internal_renderer_canvas_CanvasGraphics.endStroke();
						if(type == openfl__$internal_renderer_DrawCommandType.BEGIN_BITMAP_FILL) {
							var c7 = data.readBeginBitmapFill();
							openfl__$internal_renderer_canvas_CanvasGraphics.fillCommands.beginBitmapFill(openfl__$internal_renderer__$DrawCommandReader_BeginBitmapFillView_$Impl_$.get_bitmap(c7),openfl__$internal_renderer__$DrawCommandReader_BeginBitmapFillView_$Impl_$.get_matrix(c7),openfl__$internal_renderer__$DrawCommandReader_BeginBitmapFillView_$Impl_$.get_repeat(c7),openfl__$internal_renderer__$DrawCommandReader_BeginBitmapFillView_$Impl_$.get_smooth(c7));
							openfl__$internal_renderer_canvas_CanvasGraphics.strokeCommands.beginBitmapFill(openfl__$internal_renderer__$DrawCommandReader_BeginBitmapFillView_$Impl_$.get_bitmap(c7),openfl__$internal_renderer__$DrawCommandReader_BeginBitmapFillView_$Impl_$.get_matrix(c7),openfl__$internal_renderer__$DrawCommandReader_BeginBitmapFillView_$Impl_$.get_repeat(c7),openfl__$internal_renderer__$DrawCommandReader_BeginBitmapFillView_$Impl_$.get_smooth(c7));
						} else if(type == openfl__$internal_renderer_DrawCommandType.BEGIN_GRADIENT_FILL) {
							var c8 = data.readBeginGradientFill();
							openfl__$internal_renderer_canvas_CanvasGraphics.fillCommands.beginGradientFill(openfl__$internal_renderer__$DrawCommandReader_BeginGradientFillView_$Impl_$.get_type(c8),openfl__$internal_renderer__$DrawCommandReader_BeginGradientFillView_$Impl_$.get_colors(c8),openfl__$internal_renderer__$DrawCommandReader_BeginGradientFillView_$Impl_$.get_alphas(c8),openfl__$internal_renderer__$DrawCommandReader_BeginGradientFillView_$Impl_$.get_ratios(c8),openfl__$internal_renderer__$DrawCommandReader_BeginGradientFillView_$Impl_$.get_matrix(c8),openfl__$internal_renderer__$DrawCommandReader_BeginGradientFillView_$Impl_$.get_spreadMethod(c8),openfl__$internal_renderer__$DrawCommandReader_BeginGradientFillView_$Impl_$.get_interpolationMethod(c8),openfl__$internal_renderer__$DrawCommandReader_BeginGradientFillView_$Impl_$.get_focalPointRatio(c8));
							openfl__$internal_renderer_canvas_CanvasGraphics.strokeCommands.beginGradientFill(openfl__$internal_renderer__$DrawCommandReader_BeginGradientFillView_$Impl_$.get_type(c8),openfl__$internal_renderer__$DrawCommandReader_BeginGradientFillView_$Impl_$.get_colors(c8),openfl__$internal_renderer__$DrawCommandReader_BeginGradientFillView_$Impl_$.get_alphas(c8),openfl__$internal_renderer__$DrawCommandReader_BeginGradientFillView_$Impl_$.get_ratios(c8),openfl__$internal_renderer__$DrawCommandReader_BeginGradientFillView_$Impl_$.get_matrix(c8),openfl__$internal_renderer__$DrawCommandReader_BeginGradientFillView_$Impl_$.get_spreadMethod(c8),openfl__$internal_renderer__$DrawCommandReader_BeginGradientFillView_$Impl_$.get_interpolationMethod(c8),openfl__$internal_renderer__$DrawCommandReader_BeginGradientFillView_$Impl_$.get_focalPointRatio(c8));
						} else {
							var c9 = data.readBeginFill();
							openfl__$internal_renderer_canvas_CanvasGraphics.fillCommands.beginFill(openfl__$internal_renderer__$DrawCommandReader_BeginFillView_$Impl_$.get_color(c9),openfl__$internal_renderer__$DrawCommandReader_BeginFillView_$Impl_$.get_alpha(c9));
							openfl__$internal_renderer_canvas_CanvasGraphics.strokeCommands.beginFill(openfl__$internal_renderer__$DrawCommandReader_BeginFillView_$Impl_$.get_color(c9),openfl__$internal_renderer__$DrawCommandReader_BeginFillView_$Impl_$.get_alpha(c9));
						}
						break;
					case 5:
						var c10 = data.readDrawCircle();
						openfl__$internal_renderer_canvas_CanvasGraphics.fillCommands.drawCircle(openfl__$internal_renderer__$DrawCommandReader_DrawCircleView_$Impl_$.get_x(c10),openfl__$internal_renderer__$DrawCommandReader_DrawCircleView_$Impl_$.get_y(c10),openfl__$internal_renderer__$DrawCommandReader_DrawCircleView_$Impl_$.get_radius(c10));
						openfl__$internal_renderer_canvas_CanvasGraphics.strokeCommands.drawCircle(openfl__$internal_renderer__$DrawCommandReader_DrawCircleView_$Impl_$.get_x(c10),openfl__$internal_renderer__$DrawCommandReader_DrawCircleView_$Impl_$.get_y(c10),openfl__$internal_renderer__$DrawCommandReader_DrawCircleView_$Impl_$.get_radius(c10));
						break;
					case 6:
						var c11 = data.readDrawEllipse();
						openfl__$internal_renderer_canvas_CanvasGraphics.fillCommands.drawEllipse(openfl__$internal_renderer__$DrawCommandReader_DrawEllipseView_$Impl_$.get_x(c11),openfl__$internal_renderer__$DrawCommandReader_DrawEllipseView_$Impl_$.get_y(c11),openfl__$internal_renderer__$DrawCommandReader_DrawEllipseView_$Impl_$.get_width(c11),openfl__$internal_renderer__$DrawCommandReader_DrawEllipseView_$Impl_$.get_height(c11));
						openfl__$internal_renderer_canvas_CanvasGraphics.strokeCommands.drawEllipse(openfl__$internal_renderer__$DrawCommandReader_DrawEllipseView_$Impl_$.get_x(c11),openfl__$internal_renderer__$DrawCommandReader_DrawEllipseView_$Impl_$.get_y(c11),openfl__$internal_renderer__$DrawCommandReader_DrawEllipseView_$Impl_$.get_width(c11),openfl__$internal_renderer__$DrawCommandReader_DrawEllipseView_$Impl_$.get_height(c11));
						break;
					case 8:
						var c12 = data.readDrawRect();
						openfl__$internal_renderer_canvas_CanvasGraphics.fillCommands.drawRect(openfl__$internal_renderer__$DrawCommandReader_DrawRectView_$Impl_$.get_x(c12),openfl__$internal_renderer__$DrawCommandReader_DrawRectView_$Impl_$.get_y(c12),openfl__$internal_renderer__$DrawCommandReader_DrawRectView_$Impl_$.get_width(c12),openfl__$internal_renderer__$DrawCommandReader_DrawRectView_$Impl_$.get_height(c12));
						openfl__$internal_renderer_canvas_CanvasGraphics.strokeCommands.drawRect(openfl__$internal_renderer__$DrawCommandReader_DrawRectView_$Impl_$.get_x(c12),openfl__$internal_renderer__$DrawCommandReader_DrawRectView_$Impl_$.get_y(c12),openfl__$internal_renderer__$DrawCommandReader_DrawRectView_$Impl_$.get_width(c12),openfl__$internal_renderer__$DrawCommandReader_DrawRectView_$Impl_$.get_height(c12));
						break;
					case 9:
						var c13 = data.readDrawRoundRect();
						openfl__$internal_renderer_canvas_CanvasGraphics.fillCommands.drawRoundRect(openfl__$internal_renderer__$DrawCommandReader_DrawRoundRectView_$Impl_$.get_x(c13),openfl__$internal_renderer__$DrawCommandReader_DrawRoundRectView_$Impl_$.get_y(c13),openfl__$internal_renderer__$DrawCommandReader_DrawRoundRectView_$Impl_$.get_width(c13),openfl__$internal_renderer__$DrawCommandReader_DrawRoundRectView_$Impl_$.get_height(c13),openfl__$internal_renderer__$DrawCommandReader_DrawRoundRectView_$Impl_$.get_ellipseWidth(c13),openfl__$internal_renderer__$DrawCommandReader_DrawRoundRectView_$Impl_$.get_ellipseHeight(c13));
						openfl__$internal_renderer_canvas_CanvasGraphics.strokeCommands.drawRoundRect(openfl__$internal_renderer__$DrawCommandReader_DrawRoundRectView_$Impl_$.get_x(c13),openfl__$internal_renderer__$DrawCommandReader_DrawRoundRectView_$Impl_$.get_y(c13),openfl__$internal_renderer__$DrawCommandReader_DrawRoundRectView_$Impl_$.get_width(c13),openfl__$internal_renderer__$DrawCommandReader_DrawRoundRectView_$Impl_$.get_height(c13),openfl__$internal_renderer__$DrawCommandReader_DrawRoundRectView_$Impl_$.get_ellipseWidth(c13),openfl__$internal_renderer__$DrawCommandReader_DrawRoundRectView_$Impl_$.get_ellipseHeight(c13));
						break;
					case 11:
						openfl__$internal_renderer_canvas_CanvasGraphics.endFill();
						openfl__$internal_renderer_canvas_CanvasGraphics.endStroke();
						var c14 = data.readDrawTriangles();
						var v = openfl__$internal_renderer__$DrawCommandReader_DrawTrianglesView_$Impl_$.get_vertices(c14);
						var ind = openfl__$internal_renderer__$DrawCommandReader_DrawTrianglesView_$Impl_$.get_indices(c14);
						var uvt = openfl__$internal_renderer__$DrawCommandReader_DrawTrianglesView_$Impl_$.get_uvtData(c14);
						var pattern = null;
						var colorFill = openfl__$internal_renderer_canvas_CanvasGraphics.bitmapFill == null;
						if(colorFill && uvt != null) throw "__break__";
						if(!colorFill) {
							if(uvt == null) {
								var this1;
								this1 = new openfl_VectorData();
								var this2;
								this2 = new Array(0);
								this1.data = this2;
								this1.length = 0;
								this1.fixed = false;
								uvt = this1;
								var _g3 = 0;
								var _g2 = v.length / 2 | 0;
								while(_g3 < _g2) {
									var i1 = _g3++;
									if(!uvt.fixed) {
										uvt.length++;
										if(uvt.data.length < uvt.length) {
											var data1;
											var this3;
											this3 = new Array(uvt.data.length + 10);
											data1 = this3;
											haxe_ds__$Vector_Vector_$Impl_$.blit(uvt.data,0,data1,0,uvt.data.length);
											uvt.data = data1;
										}
										uvt.data[uvt.length - 1] = v.data[i1 * 2] / openfl__$internal_renderer_canvas_CanvasGraphics.bitmapFill.width;
									}
									uvt.length;
									if(!uvt.fixed) {
										uvt.length++;
										if(uvt.data.length < uvt.length) {
											var data2;
											var this4;
											this4 = new Array(uvt.data.length + 10);
											data2 = this4;
											haxe_ds__$Vector_Vector_$Impl_$.blit(uvt.data,0,data2,0,uvt.data.length);
											uvt.data = data2;
										}
										uvt.data[uvt.length - 1] = v.data[i1 * 2 + 1] / openfl__$internal_renderer_canvas_CanvasGraphics.bitmapFill.height;
									}
									uvt.length;
								}
							}
							var skipT = uvt.length != v.length;
							var normalizedUVT = openfl__$internal_renderer_canvas_CanvasGraphics.normalizeUVT(uvt,skipT);
							var maxUVT = normalizedUVT.max;
							uvt = normalizedUVT.uvt;
							if(maxUVT > 1) pattern = openfl__$internal_renderer_canvas_CanvasGraphics.createTempPatternCanvas(openfl__$internal_renderer_canvas_CanvasGraphics.bitmapFill,openfl__$internal_renderer_canvas_CanvasGraphics.bitmapRepeat,openfl__$internal_renderer_canvas_CanvasGraphics.bounds.width | 0,openfl__$internal_renderer_canvas_CanvasGraphics.bounds.height | 0); else pattern = openfl__$internal_renderer_canvas_CanvasGraphics.createTempPatternCanvas(openfl__$internal_renderer_canvas_CanvasGraphics.bitmapFill,openfl__$internal_renderer_canvas_CanvasGraphics.bitmapRepeat,openfl__$internal_renderer_canvas_CanvasGraphics.bitmapFill.width,openfl__$internal_renderer_canvas_CanvasGraphics.bitmapFill.height);
						}
						var i = 0;
						var l = ind.length;
						var a_;
						var b_;
						var c_;
						var iax;
						var iay;
						var ibx;
						var iby;
						var icx;
						var icy;
						var x1;
						var y1;
						var x2;
						var y2;
						var x3;
						var y3;
						var uvx1;
						var uvy1;
						var uvx2;
						var uvy2;
						var uvx3;
						var uvy3;
						var denom;
						var t1;
						var t2;
						var t3;
						var t4;
						var dx;
						var dy;
						while(i < l) {
							a_ = i;
							b_ = i + 1;
							c_ = i + 2;
							iax = ind.data[a_] * 2;
							iay = ind.data[a_] * 2 + 1;
							ibx = ind.data[b_] * 2;
							iby = ind.data[b_] * 2 + 1;
							icx = ind.data[c_] * 2;
							icy = ind.data[c_] * 2 + 1;
							x1 = v.data[iax];
							y1 = v.data[iay];
							x2 = v.data[ibx];
							y2 = v.data[iby];
							x3 = v.data[icx];
							y3 = v.data[icy];
							var _g21 = openfl__$internal_renderer__$DrawCommandReader_DrawTrianglesView_$Impl_$.get_culling(c14);
							switch(_g21) {
							case 2:
								if(!((x2 - x1) * (y3 - y1) - (y2 - y1) * (x3 - x1) < 0)) {
									i += 3;
									continue;
								}
								break;
							case 0:
								if((x2 - x1) * (y3 - y1) - (y2 - y1) * (x3 - x1) < 0) {
									i += 3;
									continue;
								}
								break;
							default:
							}
							if(colorFill) {
								openfl__$internal_renderer_canvas_CanvasGraphics.context.beginPath();
								openfl__$internal_renderer_canvas_CanvasGraphics.context.moveTo(x1,y1);
								openfl__$internal_renderer_canvas_CanvasGraphics.context.lineTo(x2,y2);
								openfl__$internal_renderer_canvas_CanvasGraphics.context.lineTo(x3,y3);
								openfl__$internal_renderer_canvas_CanvasGraphics.context.closePath();
								if(!openfl__$internal_renderer_canvas_CanvasGraphics.hitTesting) openfl__$internal_renderer_canvas_CanvasGraphics.context.fill();
								i += 3;
								continue;
							}
							openfl__$internal_renderer_canvas_CanvasGraphics.context.save();
							openfl__$internal_renderer_canvas_CanvasGraphics.context.beginPath();
							openfl__$internal_renderer_canvas_CanvasGraphics.context.moveTo(x1,y1);
							openfl__$internal_renderer_canvas_CanvasGraphics.context.lineTo(x2,y2);
							openfl__$internal_renderer_canvas_CanvasGraphics.context.lineTo(x3,y3);
							openfl__$internal_renderer_canvas_CanvasGraphics.context.closePath();
							openfl__$internal_renderer_canvas_CanvasGraphics.context.clip();
							uvx1 = uvt.data[iax] * pattern.width;
							uvx2 = uvt.data[ibx] * pattern.width;
							uvx3 = uvt.data[icx] * pattern.width;
							uvy1 = uvt.data[iay] * pattern.height;
							uvy2 = uvt.data[iby] * pattern.height;
							uvy3 = uvt.data[icy] * pattern.height;
							denom = uvx1 * (uvy3 - uvy2) - uvx2 * uvy3 + uvx3 * uvy2 + (uvx2 - uvx3) * uvy1;
							if(denom == 0) {
								i += 3;
								continue;
							}
							t1 = -(uvy1 * (x3 - x2) - uvy2 * x3 + uvy3 * x2 + (uvy2 - uvy3) * x1) / denom;
							t2 = (uvy2 * y3 + uvy1 * (y2 - y3) - uvy3 * y2 + (uvy3 - uvy2) * y1) / denom;
							t3 = (uvx1 * (x3 - x2) - uvx2 * x3 + uvx3 * x2 + (uvx2 - uvx3) * x1) / denom;
							t4 = -(uvx2 * y3 + uvx1 * (y2 - y3) - uvx3 * y2 + (uvx3 - uvx2) * y1) / denom;
							dx = (uvx1 * (uvy3 * x2 - uvy2 * x3) + uvy1 * (uvx2 * x3 - uvx3 * x2) + (uvx3 * uvy2 - uvx2 * uvy3) * x1) / denom;
							dy = (uvx1 * (uvy3 * y2 - uvy2 * y3) + uvy1 * (uvx2 * y3 - uvx3 * y2) + (uvx3 * uvy2 - uvx2 * uvy3) * y1) / denom;
							openfl__$internal_renderer_canvas_CanvasGraphics.context.transform(t1,t2,t3,t4,dx,dy);
							openfl__$internal_renderer_canvas_CanvasGraphics.context.drawImage(pattern,0,0);
							openfl__$internal_renderer_canvas_CanvasGraphics.context.restore();
							i += 3;
						}
						break;
					case 10:
						var c15 = data.readDrawTiles();
						var useScale = (openfl__$internal_renderer__$DrawCommandReader_DrawTilesView_$Impl_$.get_flags(c15) & 1) > 0;
						var offsetX = openfl__$internal_renderer_canvas_CanvasGraphics.bounds.x;
						var offsetY = openfl__$internal_renderer_canvas_CanvasGraphics.bounds.y;
						var useRotation = (openfl__$internal_renderer__$DrawCommandReader_DrawTilesView_$Impl_$.get_flags(c15) & 2) > 0;
						var useTransform = (openfl__$internal_renderer__$DrawCommandReader_DrawTilesView_$Impl_$.get_flags(c15) & 16) > 0;
						var useRGB = (openfl__$internal_renderer__$DrawCommandReader_DrawTilesView_$Impl_$.get_flags(c15) & 4) > 0;
						var useAlpha = (openfl__$internal_renderer__$DrawCommandReader_DrawTilesView_$Impl_$.get_flags(c15) & 8) > 0;
						var useRect = (openfl__$internal_renderer__$DrawCommandReader_DrawTilesView_$Impl_$.get_flags(c15) & 32) > 0;
						var useOrigin = (openfl__$internal_renderer__$DrawCommandReader_DrawTilesView_$Impl_$.get_flags(c15) & 64) > 0;
						var useBlendAdd = (openfl__$internal_renderer__$DrawCommandReader_DrawTilesView_$Impl_$.get_flags(c15) & 65536) > 0;
						if(useTransform) {
							useScale = false;
							useRotation = false;
						}
						var scaleIndex = 0;
						var rotationIndex = 0;
						var rgbIndex = 0;
						var alphaIndex = 0;
						var transformIndex = 0;
						var numValues = 3;
						if(useRect) if(useOrigin) numValues = 8; else numValues = 6;
						if(useScale) {
							scaleIndex = numValues;
							numValues++;
						}
						if(useRotation) {
							rotationIndex = numValues;
							numValues++;
						}
						if(useTransform) {
							transformIndex = numValues;
							numValues += 4;
						}
						if(useRGB) {
							rgbIndex = numValues;
							numValues += 3;
						}
						if(useAlpha) {
							alphaIndex = numValues;
							numValues++;
						}
						var totalCount = openfl__$internal_renderer__$DrawCommandReader_DrawTilesView_$Impl_$.get_tileData(c15).length;
						if(openfl__$internal_renderer__$DrawCommandReader_DrawTilesView_$Impl_$.get_count(c15) >= 0 && totalCount > openfl__$internal_renderer__$DrawCommandReader_DrawTilesView_$Impl_$.get_count(c15)) totalCount = openfl__$internal_renderer__$DrawCommandReader_DrawTilesView_$Impl_$.get_count(c15);
						var itemCount = totalCount / numValues | 0;
						var index = 0;
						var rect = null;
						var center = null;
						var previousTileID = -1;
						var surface;
						openfl__$internal_renderer__$DrawCommandReader_DrawTilesView_$Impl_$.get_sheet(c15).__bitmap.__sync();
						surface = openfl__$internal_renderer__$DrawCommandReader_DrawTilesView_$Impl_$.get_sheet(c15).__bitmap.image.get_src();
						if(useBlendAdd) openfl__$internal_renderer_canvas_CanvasGraphics.context.globalCompositeOperation = "lighter";
						while(index < totalCount) {
							var tileID;
							if(!useRect) tileID = Std["int"](openfl__$internal_renderer__$DrawCommandReader_DrawTilesView_$Impl_$.get_tileData(c15)[index + 2]); else tileID = -1;
							if(!useRect && tileID != previousTileID) {
								rect = openfl__$internal_renderer__$DrawCommandReader_DrawTilesView_$Impl_$.get_sheet(c15).__tileRects[tileID];
								center = openfl__$internal_renderer__$DrawCommandReader_DrawTilesView_$Impl_$.get_sheet(c15).__centerPoints[tileID];
								previousTileID = tileID;
							} else if(useRect) {
								rect = openfl__$internal_renderer__$DrawCommandReader_DrawTilesView_$Impl_$.get_sheet(c15).__rectTile;
								rect.setTo(openfl__$internal_renderer__$DrawCommandReader_DrawTilesView_$Impl_$.get_tileData(c15)[index + 2],openfl__$internal_renderer__$DrawCommandReader_DrawTilesView_$Impl_$.get_tileData(c15)[index + 3],openfl__$internal_renderer__$DrawCommandReader_DrawTilesView_$Impl_$.get_tileData(c15)[index + 4],openfl__$internal_renderer__$DrawCommandReader_DrawTilesView_$Impl_$.get_tileData(c15)[index + 5]);
								center = openfl__$internal_renderer__$DrawCommandReader_DrawTilesView_$Impl_$.get_sheet(c15).__point;
								if(useOrigin) center.setTo(openfl__$internal_renderer__$DrawCommandReader_DrawTilesView_$Impl_$.get_tileData(c15)[index + 6],openfl__$internal_renderer__$DrawCommandReader_DrawTilesView_$Impl_$.get_tileData(c15)[index + 7]); else center.setTo(0,0);
							}
							if(rect != null && rect.width > 0 && rect.height > 0 && center != null) {
								openfl__$internal_renderer_canvas_CanvasGraphics.context.save();
								openfl__$internal_renderer_canvas_CanvasGraphics.context.translate(openfl__$internal_renderer__$DrawCommandReader_DrawTilesView_$Impl_$.get_tileData(c15)[index] - offsetX,openfl__$internal_renderer__$DrawCommandReader_DrawTilesView_$Impl_$.get_tileData(c15)[index + 1] - offsetY);
								if(useRotation) openfl__$internal_renderer_canvas_CanvasGraphics.context.rotate(openfl__$internal_renderer__$DrawCommandReader_DrawTilesView_$Impl_$.get_tileData(c15)[index + rotationIndex]);
								var scale = 1.0;
								if(useScale) scale = openfl__$internal_renderer__$DrawCommandReader_DrawTilesView_$Impl_$.get_tileData(c15)[index + scaleIndex];
								if(useTransform) openfl__$internal_renderer_canvas_CanvasGraphics.context.transform(openfl__$internal_renderer__$DrawCommandReader_DrawTilesView_$Impl_$.get_tileData(c15)[index + transformIndex],openfl__$internal_renderer__$DrawCommandReader_DrawTilesView_$Impl_$.get_tileData(c15)[index + transformIndex + 1],openfl__$internal_renderer__$DrawCommandReader_DrawTilesView_$Impl_$.get_tileData(c15)[index + transformIndex + 2],openfl__$internal_renderer__$DrawCommandReader_DrawTilesView_$Impl_$.get_tileData(c15)[index + transformIndex + 3],0,0);
								if(useAlpha) openfl__$internal_renderer_canvas_CanvasGraphics.context.globalAlpha = openfl__$internal_renderer__$DrawCommandReader_DrawTilesView_$Impl_$.get_tileData(c15)[index + alphaIndex];
								openfl__$internal_renderer_canvas_CanvasGraphics.context.imageSmoothingEnabled = openfl__$internal_renderer__$DrawCommandReader_DrawTilesView_$Impl_$.get_smooth(c15);
								openfl__$internal_renderer_canvas_CanvasGraphics.context.drawImage(surface,rect.x,rect.y,rect.width,rect.height,-center.x * scale,-center.y * scale,rect.width * scale,rect.height * scale);
								openfl__$internal_renderer_canvas_CanvasGraphics.context.restore();
							}
							index += numValues;
						}
						if(useBlendAdd) openfl__$internal_renderer_canvas_CanvasGraphics.context.globalCompositeOperation = "source-over";
						break;
					default:
						data.skip(type);
					}
				}
			} catch( e ) { if( e != "__break__" ) throw e; }
			if(openfl__$internal_renderer_canvas_CanvasGraphics.fillCommands.get_length() > 0) openfl__$internal_renderer_canvas_CanvasGraphics.endFill();
			if(openfl__$internal_renderer_canvas_CanvasGraphics.strokeCommands.get_length() > 0) openfl__$internal_renderer_canvas_CanvasGraphics.endStroke();
			data.destroy();
			graphics.__bitmap = openfl_display_BitmapData.fromCanvas(graphics.__canvas);
		}
		graphics.set___dirty(false);
	}
};
openfl__$internal_renderer_canvas_CanvasGraphics.renderMask = function(graphics,renderSession) {
	if(graphics.__commands.get_length() != 0) {
		openfl__$internal_renderer_canvas_CanvasGraphics.context = renderSession.context;
		var positionX = 0.0;
		var positionY = 0.0;
		var offsetX = 0;
		var offsetY = 0;
		var data = new openfl__$internal_renderer_DrawCommandReader(graphics.__commands);
		var _g = 0;
		var _g1 = graphics.__commands.types;
		while(_g < _g1.length) {
			var type = _g1[_g];
			++_g;
			switch(type[1]) {
			case 3:
				var c = data.readCubicCurveTo();
				openfl__$internal_renderer_canvas_CanvasGraphics.context.bezierCurveTo(openfl__$internal_renderer__$DrawCommandReader_CubicCurveToView_$Impl_$.get_controlX1(c) - offsetX,openfl__$internal_renderer__$DrawCommandReader_CubicCurveToView_$Impl_$.get_controlY1(c) - offsetY,openfl__$internal_renderer__$DrawCommandReader_CubicCurveToView_$Impl_$.get_controlX2(c) - offsetX,openfl__$internal_renderer__$DrawCommandReader_CubicCurveToView_$Impl_$.get_controlY2(c) - offsetY,openfl__$internal_renderer__$DrawCommandReader_CubicCurveToView_$Impl_$.get_anchorX(c) - offsetX,openfl__$internal_renderer__$DrawCommandReader_CubicCurveToView_$Impl_$.get_anchorY(c) - offsetY);
				positionX = openfl__$internal_renderer__$DrawCommandReader_CubicCurveToView_$Impl_$.get_anchorX(c);
				positionY = openfl__$internal_renderer__$DrawCommandReader_CubicCurveToView_$Impl_$.get_anchorY(c);
				break;
			case 4:
				var c1 = data.readCurveTo();
				openfl__$internal_renderer_canvas_CanvasGraphics.context.quadraticCurveTo(openfl__$internal_renderer__$DrawCommandReader_CurveToView_$Impl_$.get_controlX(c1) - offsetX,openfl__$internal_renderer__$DrawCommandReader_CurveToView_$Impl_$.get_controlY(c1) - offsetY,openfl__$internal_renderer__$DrawCommandReader_CurveToView_$Impl_$.get_anchorX(c1) - offsetX,openfl__$internal_renderer__$DrawCommandReader_CurveToView_$Impl_$.get_anchorY(c1) - offsetY);
				positionX = openfl__$internal_renderer__$DrawCommandReader_CurveToView_$Impl_$.get_anchorX(c1);
				positionY = openfl__$internal_renderer__$DrawCommandReader_CurveToView_$Impl_$.get_anchorY(c1);
				break;
			case 5:
				var c2 = data.readDrawCircle();
				openfl__$internal_renderer_canvas_CanvasGraphics.context.arc(openfl__$internal_renderer__$DrawCommandReader_DrawCircleView_$Impl_$.get_x(c2) - offsetX,openfl__$internal_renderer__$DrawCommandReader_DrawCircleView_$Impl_$.get_y(c2) - offsetY,openfl__$internal_renderer__$DrawCommandReader_DrawCircleView_$Impl_$.get_radius(c2),0,Math.PI * 2,true);
				break;
			case 6:
				var c3 = data.readDrawEllipse();
				var x = openfl__$internal_renderer__$DrawCommandReader_DrawEllipseView_$Impl_$.get_x(c3);
				var y = openfl__$internal_renderer__$DrawCommandReader_DrawEllipseView_$Impl_$.get_y(c3);
				var width = openfl__$internal_renderer__$DrawCommandReader_DrawEllipseView_$Impl_$.get_width(c3);
				var height = openfl__$internal_renderer__$DrawCommandReader_DrawEllipseView_$Impl_$.get_height(c3);
				x -= offsetX;
				y -= offsetY;
				var kappa = .5522848;
				var ox = width / 2 * kappa;
				var oy = height / 2 * kappa;
				var xe = x + width;
				var ye = y + height;
				var xm = x + width / 2;
				var ym = y + height / 2;
				openfl__$internal_renderer_canvas_CanvasGraphics.context.moveTo(x,ym);
				openfl__$internal_renderer_canvas_CanvasGraphics.context.bezierCurveTo(x,ym - oy,xm - ox,y,xm,y);
				openfl__$internal_renderer_canvas_CanvasGraphics.context.bezierCurveTo(xm + ox,y,xe,ym - oy,xe,ym);
				openfl__$internal_renderer_canvas_CanvasGraphics.context.bezierCurveTo(xe,ym + oy,xm + ox,ye,xm,ye);
				openfl__$internal_renderer_canvas_CanvasGraphics.context.bezierCurveTo(xm - ox,ye,x,ym + oy,x,ym);
				break;
			case 8:
				var c4 = data.readDrawRect();
				openfl__$internal_renderer_canvas_CanvasGraphics.context.rect(openfl__$internal_renderer__$DrawCommandReader_DrawRectView_$Impl_$.get_x(c4) - offsetX,openfl__$internal_renderer__$DrawCommandReader_DrawRectView_$Impl_$.get_y(c4) - offsetY,openfl__$internal_renderer__$DrawCommandReader_DrawRectView_$Impl_$.get_width(c4),openfl__$internal_renderer__$DrawCommandReader_DrawRectView_$Impl_$.get_height(c4));
				break;
			case 9:
				var c5 = data.readDrawRoundRect();
				openfl__$internal_renderer_canvas_CanvasGraphics.drawRoundRect(openfl__$internal_renderer__$DrawCommandReader_DrawRoundRectView_$Impl_$.get_x(c5) - offsetX,openfl__$internal_renderer__$DrawCommandReader_DrawRoundRectView_$Impl_$.get_y(c5) - offsetY,openfl__$internal_renderer__$DrawCommandReader_DrawRoundRectView_$Impl_$.get_width(c5),openfl__$internal_renderer__$DrawCommandReader_DrawRoundRectView_$Impl_$.get_height(c5),openfl__$internal_renderer__$DrawCommandReader_DrawRoundRectView_$Impl_$.get_ellipseWidth(c5),openfl__$internal_renderer__$DrawCommandReader_DrawRoundRectView_$Impl_$.get_ellipseHeight(c5));
				break;
			case 16:
				var c6 = data.readLineTo();
				openfl__$internal_renderer_canvas_CanvasGraphics.context.lineTo(openfl__$internal_renderer__$DrawCommandReader_LineToView_$Impl_$.get_x(c6) - offsetX,openfl__$internal_renderer__$DrawCommandReader_LineToView_$Impl_$.get_y(c6) - offsetY);
				positionX = openfl__$internal_renderer__$DrawCommandReader_LineToView_$Impl_$.get_x(c6);
				positionY = openfl__$internal_renderer__$DrawCommandReader_LineToView_$Impl_$.get_y(c6);
				break;
			case 17:
				var c7 = data.readMoveTo();
				openfl__$internal_renderer_canvas_CanvasGraphics.context.moveTo(openfl__$internal_renderer__$DrawCommandReader_MoveToView_$Impl_$.get_x(c7) - offsetX,openfl__$internal_renderer__$DrawCommandReader_MoveToView_$Impl_$.get_y(c7) - offsetY);
				positionX = openfl__$internal_renderer__$DrawCommandReader_MoveToView_$Impl_$.get_x(c7);
				positionY = openfl__$internal_renderer__$DrawCommandReader_MoveToView_$Impl_$.get_y(c7);
				break;
			default:
				data.skip(type);
			}
		}
		data.destroy();
	}
};
var openfl__$internal_renderer_canvas_CanvasMaskManager = function(renderSession) {
	openfl__$internal_renderer_AbstractMaskManager.call(this,renderSession);
};
$hxClasses["openfl._internal.renderer.canvas.CanvasMaskManager"] = openfl__$internal_renderer_canvas_CanvasMaskManager;
openfl__$internal_renderer_canvas_CanvasMaskManager.__name__ = true;
openfl__$internal_renderer_canvas_CanvasMaskManager.__super__ = openfl__$internal_renderer_AbstractMaskManager;
openfl__$internal_renderer_canvas_CanvasMaskManager.prototype = $extend(openfl__$internal_renderer_AbstractMaskManager.prototype,{
	pushMask: function(mask) {
		var context = this.renderSession.context;
		context.save();
		var transform = mask.__getWorldTransform();
		context.setTransform(transform.a,transform.b,transform.c,transform.d,transform.tx,transform.ty);
		context.beginPath();
		mask.__renderCanvasMask(this.renderSession);
		context.clip();
	}
	,pushRect: function(rect,transform) {
		var context = this.renderSession.context;
		context.save();
		context.setTransform(transform.a,transform.b,transform.c,transform.d,transform.tx,transform.ty);
		context.beginPath();
		context.rect(rect.x,rect.y,rect.width,rect.height);
		context.clip();
	}
	,popMask: function() {
		this.renderSession.context.restore();
	}
	,popRect: function() {
		this.renderSession.context.restore();
	}
	,__class__: openfl__$internal_renderer_canvas_CanvasMaskManager
});
var openfl__$internal_renderer_canvas_CanvasRenderer = function(width,height,context) {
	openfl__$internal_renderer_AbstractRenderer.call(this,width,height);
	this.context = context;
	this.renderSession = new openfl__$internal_renderer_RenderSession();
	this.renderSession.context = context;
	this.renderSession.roundPixels = true;
	this.renderSession.renderer = this;
	this.renderSession.maskManager = new openfl__$internal_renderer_canvas_CanvasMaskManager(this.renderSession);
};
$hxClasses["openfl._internal.renderer.canvas.CanvasRenderer"] = openfl__$internal_renderer_canvas_CanvasRenderer;
openfl__$internal_renderer_canvas_CanvasRenderer.__name__ = true;
openfl__$internal_renderer_canvas_CanvasRenderer.__super__ = openfl__$internal_renderer_AbstractRenderer;
openfl__$internal_renderer_canvas_CanvasRenderer.prototype = $extend(openfl__$internal_renderer_AbstractRenderer.prototype,{
	render: function(stage) {
		this.context.setTransform(1,0,0,1,0,0);
		this.context.globalAlpha = 1;
		if(!stage.__transparent && stage.__clearBeforeRender) {
			this.context.fillStyle = stage.__colorString;
			this.context.fillRect(0,0,stage.stageWidth,stage.stageHeight);
		} else if(stage.__transparent && stage.__clearBeforeRender) this.context.clearRect(0,0,stage.stageWidth,stage.stageHeight);
		stage.__renderCanvas(this.renderSession);
	}
	,__class__: openfl__$internal_renderer_canvas_CanvasRenderer
});
var openfl__$internal_renderer_canvas_CanvasShape = function() { };
$hxClasses["openfl._internal.renderer.canvas.CanvasShape"] = openfl__$internal_renderer_canvas_CanvasShape;
openfl__$internal_renderer_canvas_CanvasShape.__name__ = true;
openfl__$internal_renderer_canvas_CanvasShape.render = function(shape,renderSession) {
	if(!shape.__renderable || shape.__worldAlpha <= 0) return;
	var graphics = shape.__graphics;
	if(graphics != null) {
		openfl__$internal_renderer_canvas_CanvasGraphics.render(graphics,renderSession);
		if(graphics.__canvas != null) {
			var context = renderSession.context;
			var scrollRect = shape.get_scrollRect();
			if(graphics.__bounds.width > 0 && graphics.__bounds.height > 0 && (scrollRect == null || scrollRect.width > 0 && scrollRect.height > 0)) {
				if(shape.__mask != null) renderSession.maskManager.pushMask(shape.__mask);
				context.globalAlpha = shape.__worldAlpha;
				var transform = shape.__renderTransform;
				if(renderSession.roundPixels) context.setTransform(transform.a,transform.b,transform.c,transform.d,transform.tx | 0,transform.ty | 0); else context.setTransform(transform.a,transform.b,transform.c,transform.d,transform.tx,transform.ty);
				if(scrollRect == null) context.drawImage(graphics.__canvas,graphics.__bounds.x,graphics.__bounds.y); else context.drawImage(graphics.__canvas,Math.ceil(graphics.__bounds.x + scrollRect.x),Math.ceil(graphics.__bounds.y + scrollRect.y),scrollRect.width,scrollRect.height,Math.ceil(graphics.__bounds.x + scrollRect.x),Math.ceil(graphics.__bounds.y + scrollRect.y),scrollRect.width,scrollRect.height);
				if(shape.__mask != null) renderSession.maskManager.popMask();
			}
		}
	}
};
var openfl__$internal_renderer_canvas_CanvasTextField = function() { };
$hxClasses["openfl._internal.renderer.canvas.CanvasTextField"] = openfl__$internal_renderer_canvas_CanvasTextField;
openfl__$internal_renderer_canvas_CanvasTextField.__name__ = true;
openfl__$internal_renderer_canvas_CanvasTextField.context = null;
openfl__$internal_renderer_canvas_CanvasTextField.render = function(textField,renderSession) {
	if(textField.__dirty) {
		var textEngine = textField.__textEngine;
		textField.__updateLayout();
		if((textEngine.text == null || textEngine.text == "") && !textEngine.background && !textEngine.border && !textEngine.__hasFocus || (textEngine.width <= 0 || textEngine.height <= 0) && textEngine.autoSize != 2) {
			textField.__graphics.__canvas = null;
			textField.__graphics.__context = null;
			textField.__graphics.set___dirty(false);
			textField.__dirty = false;
		} else {
			var bounds = textEngine.bounds;
			if(textField.__graphics == null || textField.__graphics.__canvas == null) {
				if(textField.__graphics == null) textField.__graphics = new openfl_display_Graphics();
				textField.__graphics.__canvas = window.document.createElement("canvas");
				textField.__graphics.__context = textField.__graphics.__canvas.getContext("2d");
				textField.__graphics.__bounds = new openfl_geom_Rectangle(0,0,bounds.width,bounds.height);
			}
			var graphics = textField.__graphics;
			openfl__$internal_renderer_canvas_CanvasTextField.context = graphics.__context;
			if(textEngine.text != null && textEngine.text != "" || textEngine.__hasFocus) {
				var text = textEngine.text;
				if(textEngine.displayAsPassword) {
					var length = text.length;
					var mask = "";
					var _g = 0;
					while(_g < length) {
						var i = _g++;
						mask += "*";
					}
					text = mask;
				}
				graphics.__canvas.width = Math.ceil(bounds.width);
				graphics.__canvas.height = Math.ceil(bounds.height);
				if(textEngine.antiAliasType != 0 || textEngine.gridFitType != 1) {
					graphics.__context.mozImageSmoothingEnabled = true;
					graphics.__context.msImageSmoothingEnabled = true;
					graphics.__context.imageSmoothingEnabled = true;
				} else {
					graphics.__context.mozImageSmoothingEnabled = false;
					graphics.__context.msImageSmoothingEnabled = false;
					graphics.__context.imageSmoothingEnabled = false;
				}
				if(textEngine.border || textEngine.background) {
					openfl__$internal_renderer_canvas_CanvasTextField.context.rect(0.5,0.5,bounds.width - 1,bounds.height - 1);
					if(textEngine.background) {
						openfl__$internal_renderer_canvas_CanvasTextField.context.fillStyle = "#" + StringTools.hex(textEngine.backgroundColor,6);
						openfl__$internal_renderer_canvas_CanvasTextField.context.fill();
					}
					if(textEngine.border) {
						openfl__$internal_renderer_canvas_CanvasTextField.context.lineWidth = 1;
						openfl__$internal_renderer_canvas_CanvasTextField.context.strokeStyle = "#" + StringTools.hex(textEngine.borderColor,6);
						openfl__$internal_renderer_canvas_CanvasTextField.context.stroke();
					}
				}
				openfl__$internal_renderer_canvas_CanvasTextField.context.textBaseline = "top";
				openfl__$internal_renderer_canvas_CanvasTextField.context.textAlign = "start";
				var scrollX = -textField.get_scrollH();
				var scrollY = 0.0;
				var _g1 = 0;
				var _g2 = textField.get_scrollV() - 1;
				while(_g1 < _g2) {
					var i1 = _g1++;
					scrollY -= textEngine.lineHeights[i1];
				}
				var advance;
				var offsetY = 0.0;
				var applyHack = new EReg("(iPad|iPhone|iPod|Firefox)","g").match(window.navigator.userAgent);
				var _g3 = 0;
				var _g11 = textEngine.layoutGroups;
				while(_g3 < _g11.length) {
					var group = _g11[_g3];
					++_g3;
					if(group.lineIndex < textField.get_scrollV() - 1) continue;
					if(group.lineIndex > textField.get_scrollV() + textEngine.bottomScrollV - 2) break;
					openfl__$internal_renderer_canvas_CanvasTextField.context.font = openfl__$internal_text_TextEngine.getFont(group.format);
					openfl__$internal_renderer_canvas_CanvasTextField.context.fillStyle = "#" + StringTools.hex(group.format.color,6);
					if(applyHack) offsetY = group.format.size * 0.185;
					openfl__$internal_renderer_canvas_CanvasTextField.context.fillText(text.substring(group.startIndex,group.endIndex),group.offsetX + scrollX,group.offsetY + offsetY + scrollY);
					if(textField.__caretIndex > -1 && textEngine.selectable) {
						if(textField.__selectionIndex == textField.__caretIndex) {
							if(textField.__showCursor && group.startIndex <= textField.__caretIndex && group.endIndex >= textField.__caretIndex) {
								advance = 0.0;
								var _g31 = 0;
								var _g21 = textField.__caretIndex - group.startIndex;
								while(_g31 < _g21) {
									var i2 = _g31++;
									if(group.advances.length <= i2) break;
									advance += group.advances[i2];
								}
								openfl__$internal_renderer_canvas_CanvasTextField.context.fillRect(group.offsetX + advance,group.offsetY,1,group.height);
							}
						} else if(group.startIndex <= textField.__caretIndex && group.endIndex >= textField.__caretIndex || group.startIndex <= textField.__selectionIndex && group.endIndex >= textField.__selectionIndex) {
							var selectionStart = Std["int"](Math.min(textField.__selectionIndex,textField.__caretIndex));
							var selectionEnd = Std["int"](Math.max(textField.__selectionIndex,textField.__caretIndex));
							if(group.startIndex > selectionStart) selectionStart = group.startIndex;
							if(group.endIndex < selectionEnd) selectionEnd = group.endIndex;
							var start;
							var end;
							start = textField.getCharBoundaries(selectionStart);
							if(selectionEnd >= textEngine.text.length) {
								end = textField.getCharBoundaries(textEngine.text.length - 1);
								end.x += end.width + 2;
							} else end = textField.getCharBoundaries(selectionEnd);
							if(start != null && end != null) {
								openfl__$internal_renderer_canvas_CanvasTextField.context.fillStyle = "#000000";
								openfl__$internal_renderer_canvas_CanvasTextField.context.fillRect(start.x,start.y,end.x - start.x,group.height);
								openfl__$internal_renderer_canvas_CanvasTextField.context.fillStyle = "#FFFFFF";
								openfl__$internal_renderer_canvas_CanvasTextField.context.fillText(text.substring(selectionStart,selectionEnd),scrollX + start.x,group.offsetY + offsetY + scrollY);
							}
						}
					}
				}
			} else {
				graphics.__canvas.width = Math.ceil(bounds.width);
				graphics.__canvas.height = Math.ceil(bounds.height);
				if(textEngine.border || textEngine.background) {
					if(textEngine.border) openfl__$internal_renderer_canvas_CanvasTextField.context.rect(0.5,0.5,bounds.width - 1,bounds.height - 1); else openfl__$internal_renderer_canvas_CanvasTextField.context.rect(0,0,bounds.width,bounds.height);
					if(textEngine.background) {
						openfl__$internal_renderer_canvas_CanvasTextField.context.fillStyle = "#" + StringTools.hex(textEngine.backgroundColor,6);
						openfl__$internal_renderer_canvas_CanvasTextField.context.fill();
					}
					if(textEngine.border) {
						openfl__$internal_renderer_canvas_CanvasTextField.context.lineWidth = 1;
						openfl__$internal_renderer_canvas_CanvasTextField.context.lineCap = "square";
						openfl__$internal_renderer_canvas_CanvasTextField.context.strokeStyle = "#" + StringTools.hex(textEngine.borderColor,6);
						openfl__$internal_renderer_canvas_CanvasTextField.context.stroke();
					}
				}
			}
			graphics.__bitmap = openfl_display_BitmapData.fromCanvas(textField.__graphics.__canvas);
			textField.__dirty = false;
			graphics.set___dirty(false);
		}
	}
};
var openfl__$internal_renderer_dom_DOMMaskManager = function(renderSession) {
	openfl__$internal_renderer_AbstractMaskManager.call(this,renderSession);
};
$hxClasses["openfl._internal.renderer.dom.DOMMaskManager"] = openfl__$internal_renderer_dom_DOMMaskManager;
openfl__$internal_renderer_dom_DOMMaskManager.__name__ = true;
openfl__$internal_renderer_dom_DOMMaskManager.__super__ = openfl__$internal_renderer_AbstractMaskManager;
openfl__$internal_renderer_dom_DOMMaskManager.prototype = $extend(openfl__$internal_renderer_AbstractMaskManager.prototype,{
	pushMask: function(mask) {
	}
	,pushRect: function(rect,transform) {
	}
	,popMask: function() {
	}
	,__class__: openfl__$internal_renderer_dom_DOMMaskManager
});
var openfl_geom_Rectangle = function(x,y,width,height) {
	if(height == null) height = 0;
	if(width == null) width = 0;
	if(y == null) y = 0;
	if(x == null) x = 0;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
};
$hxClasses["openfl.geom.Rectangle"] = openfl_geom_Rectangle;
openfl_geom_Rectangle.__name__ = true;
openfl_geom_Rectangle.prototype = {
	clone: function() {
		return new openfl_geom_Rectangle(this.x,this.y,this.width,this.height);
	}
	,contains: function(x,y) {
		return x >= this.x && y >= this.y && x < this.get_right() && y < this.get_bottom();
	}
	,containsPoint: function(point) {
		return this.contains(point.x,point.y);
	}
	,copyFrom: function(sourceRect) {
		this.x = sourceRect.x;
		this.y = sourceRect.y;
		this.width = sourceRect.width;
		this.height = sourceRect.height;
	}
	,intersects: function(toIntersect) {
		var x0;
		if(this.x < toIntersect.x) x0 = toIntersect.x; else x0 = this.x;
		var x1;
		if(this.get_right() > toIntersect.get_right()) x1 = toIntersect.get_right(); else x1 = this.get_right();
		if(x1 <= x0) return false;
		var y0;
		if(this.y < toIntersect.y) y0 = toIntersect.y; else y0 = this.y;
		var y1;
		if(this.get_bottom() > toIntersect.get_bottom()) y1 = toIntersect.get_bottom(); else y1 = this.get_bottom();
		return y1 > y0;
	}
	,setEmpty: function() {
		this.x = this.y = this.width = this.height = 0;
	}
	,setTo: function(xa,ya,widtha,heighta) {
		this.x = xa;
		this.y = ya;
		this.width = widtha;
		this.height = heighta;
	}
	,__expand: function(x,y,width,height) {
		if(this.width == 0 && this.height == 0) {
			this.x = x;
			this.y = y;
			this.width = width;
			this.height = height;
			return;
		}
		var cacheRight = this.get_right();
		var cacheBottom = this.get_bottom();
		if(this.x > x) {
			this.x = x;
			this.width = cacheRight - x;
		}
		if(this.y > y) {
			this.y = y;
			this.height = cacheBottom - y;
		}
		if(cacheRight < x + width) this.width = x + width - this.x;
		if(cacheBottom < y + height) this.height = y + height - this.y;
	}
	,__transform: function(rect,m) {
		var tx0 = m.a * this.x + m.c * this.y;
		var tx1 = tx0;
		var ty0 = m.b * this.x + m.d * this.y;
		var ty1 = ty0;
		var tx = m.a * (this.x + this.width) + m.c * this.y;
		var ty = m.b * (this.x + this.width) + m.d * this.y;
		if(tx < tx0) tx0 = tx;
		if(ty < ty0) ty0 = ty;
		if(tx > tx1) tx1 = tx;
		if(ty > ty1) ty1 = ty;
		tx = m.a * (this.x + this.width) + m.c * (this.y + this.height);
		ty = m.b * (this.x + this.width) + m.d * (this.y + this.height);
		if(tx < tx0) tx0 = tx;
		if(ty < ty0) ty0 = ty;
		if(tx > tx1) tx1 = tx;
		if(ty > ty1) ty1 = ty;
		tx = m.a * this.x + m.c * (this.y + this.height);
		ty = m.b * this.x + m.d * (this.y + this.height);
		if(tx < tx0) tx0 = tx;
		if(ty < ty0) ty0 = ty;
		if(tx > tx1) tx1 = tx;
		if(ty > ty1) ty1 = ty;
		rect.setTo(tx0 + m.tx,ty0 + m.ty,tx1 - tx0,ty1 - ty0);
	}
	,get_bottom: function() {
		return this.y + this.height;
	}
	,get_left: function() {
		return this.x;
	}
	,get_right: function() {
		return this.x + this.width;
	}
	,get_top: function() {
		return this.y;
	}
	,get_topLeft: function() {
		return new openfl_geom_Point(this.x,this.y);
	}
	,__class__: openfl_geom_Rectangle
};
var openfl__$internal_renderer_opengl_utils_RenderTexture = function() { };
$hxClasses["openfl._internal.renderer.opengl.utils.RenderTexture"] = openfl__$internal_renderer_opengl_utils_RenderTexture;
openfl__$internal_renderer_opengl_utils_RenderTexture.__name__ = true;
var openfl__$internal_text_TextEngine = function(textField) {
	this.textField = textField;
	this.width = 100;
	this.height = 100;
	this.text = "";
	this.bounds = new openfl_geom_Rectangle(0,0,0,0);
	this.type = 0;
	this.autoSize = 2;
	this.displayAsPassword = false;
	this.embedFonts = false;
	this.selectable = true;
	this.borderColor = 0;
	this.border = false;
	this.backgroundColor = 16777215;
	this.background = false;
	this.gridFitType = 1;
	this.maxChars = 0;
	this.multiline = false;
	this.sharpness = 0;
	this.scrollH = 0;
	this.scrollV = 1;
	this.wordWrap = false;
	this.lineAscents = [];
	this.lineBreaks = [];
	this.lineDescents = [];
	this.lineLeadings = [];
	this.lineHeights = [];
	this.lineWidths = [];
	this.layoutGroups = [];
	this.textFormatRanges = [];
	openfl__$internal_text_TextEngine.__canvas = window.document.createElement("canvas");
	openfl__$internal_text_TextEngine.__context = openfl__$internal_text_TextEngine.__canvas.getContext("2d");
};
$hxClasses["openfl._internal.text.TextEngine"] = openfl__$internal_text_TextEngine;
openfl__$internal_text_TextEngine.__name__ = true;
openfl__$internal_text_TextEngine.__canvas = null;
openfl__$internal_text_TextEngine.__context = null;
openfl__$internal_text_TextEngine.getFont = function(format) {
	var font;
	if(format.italic) font = "italic "; else font = "normal ";
	font += "normal ";
	if(format.bold) font += "bold "; else font += "normal ";
	font += format.size + "px";
	font += "/" + (format.size + format.leading + 6) + "px ";
	font += "" + (function($this) {
		var $r;
		var _g = format.font;
		$r = (function($this) {
			var $r;
			switch(_g) {
			case "_sans":
				$r = "sans-serif";
				break;
			case "_serif":
				$r = "serif";
				break;
			case "_typewriter":
				$r = "monospace";
				break;
			default:
				$r = "'" + format.font + "'";
			}
			return $r;
		}($this));
		return $r;
	}(this));
	return font;
};
openfl__$internal_text_TextEngine.prototype = {
	getBounds: function() {
		var padding;
		if(this.border) padding = 1; else padding = 0;
		this.bounds.width = this.width + padding;
		this.bounds.height = this.height + padding;
	}
	,getLineMeasurements: function() {
		this.lineAscents.splice(0,this.lineAscents.length);
		this.lineDescents.splice(0,this.lineDescents.length);
		this.lineLeadings.splice(0,this.lineLeadings.length);
		this.lineHeights.splice(0,this.lineHeights.length);
		this.lineWidths.splice(0,this.lineWidths.length);
		var currentLineAscent = 0.0;
		var currentLineDescent = 0.0;
		var currentLineLeading = null;
		var currentLineHeight = 0.0;
		var currentLineWidth = 0.0;
		this.textWidth = 0;
		this.textHeight = 0;
		this.numLines = 1;
		this.bottomScrollV = 0;
		this.maxScrollH = 0;
		var _g = 0;
		var _g1 = this.layoutGroups;
		while(_g < _g1.length) {
			var group = _g1[_g];
			++_g;
			while(group.lineIndex > this.numLines - 1) {
				this.lineAscents.push(currentLineAscent);
				this.lineDescents.push(currentLineDescent);
				this.lineLeadings.push(currentLineLeading != null?currentLineLeading:0);
				this.lineHeights.push(currentLineHeight);
				this.lineWidths.push(currentLineWidth);
				currentLineAscent = 0;
				currentLineDescent = 0;
				currentLineLeading = null;
				currentLineHeight = 0;
				currentLineWidth = 0;
				this.numLines++;
				if(this.textHeight <= this.height - 2) this.bottomScrollV++;
			}
			currentLineAscent = Math.max(currentLineAscent,group.ascent);
			currentLineDescent = Math.max(currentLineDescent,group.descent);
			if(currentLineLeading == null) currentLineLeading = group.leading; else currentLineLeading = Std["int"](Math.max(currentLineLeading,group.leading));
			currentLineHeight = Math.max(currentLineHeight,group.height);
			currentLineWidth = group.offsetX - 2 + group.width;
			if(currentLineWidth > this.textWidth) this.textWidth = currentLineWidth;
			this.textHeight = group.offsetY - 2 + group.ascent + group.descent;
		}
		this.lineAscents.push(currentLineAscent);
		this.lineDescents.push(currentLineDescent);
		this.lineLeadings.push(currentLineLeading != null?currentLineLeading:0);
		this.lineHeights.push(currentLineHeight);
		this.lineWidths.push(currentLineWidth);
		if(this.numLines == 1) {
			this.bottomScrollV = 1;
			if(currentLineLeading > 0) this.textHeight += currentLineLeading;
		} else if(this.textHeight <= this.height - 2) this.bottomScrollV++;
		if(this.textWidth > this.width - 4) this.maxScrollH = this.textWidth - this.width + 4 | 0; else this.maxScrollH = 0;
		this.maxScrollV = this.numLines - this.bottomScrollV + 1;
	}
	,getLayoutGroups: function() {
		var _g = this;
		this.layoutGroups.splice(0,this.layoutGroups.length);
		var rangeIndex = -1;
		var formatRange = null;
		var font = null;
		var currentFormat = openfl_text_TextField.__defaultTextFormat.clone();
		var leading = 0;
		var ascent = 0.0;
		var descent = 0.0;
		var layoutGroup;
		var advances;
		var widthValue;
		var heightValue = 0.0;
		var spaceWidth = 0.0;
		var previousSpaceIndex = 0;
		var spaceIndex = this.text.indexOf(" ");
		var breakIndex = this.text.indexOf("\n");
		var marginRight = 0.0;
		var offsetX = 2.0;
		var offsetY = 2.0;
		var textIndex = 0;
		var lineIndex = 0;
		var lineFormat = null;
		if(rangeIndex < _g.textFormatRanges.length - 1) {
			rangeIndex++;
			formatRange = _g.textFormatRanges[rangeIndex];
			currentFormat.__merge(formatRange.format);
			openfl__$internal_text_TextEngine.__context.font = openfl__$internal_text_TextEngine.getFont(currentFormat);
			ascent = currentFormat.size;
			descent = currentFormat.size * 0.185;
			leading = currentFormat.leading;
			heightValue = ascent + descent + leading;
			if(spaceIndex > -1) spaceWidth = openfl__$internal_text_TextEngine.__context.measureText(" ").width;
		}
		lineFormat = formatRange.format;
		var wrap;
		while(textIndex < this.text.length) if(breakIndex > -1 && (spaceIndex == -1 || breakIndex < spaceIndex) && formatRange.end >= breakIndex) {
			layoutGroup = new openfl__$internal_text_TextLayoutGroup(formatRange.format,textIndex,breakIndex);
			var text = this.text;
			var advances1 = [];
			var _g1 = textIndex;
			while(_g1 < breakIndex) {
				var i = _g1++;
				advances1.push(openfl__$internal_text_TextEngine.__context.measureText(text.charAt(i)).width);
			}
			layoutGroup.advances = advances1;
			layoutGroup.offsetX = offsetX;
			layoutGroup.ascent = ascent;
			layoutGroup.descent = descent;
			layoutGroup.leading = leading;
			layoutGroup.lineIndex = lineIndex;
			layoutGroup.offsetY = offsetY;
			var advances2 = layoutGroup.advances;
			var width = 0.0;
			var _g2 = 0;
			while(_g2 < advances2.length) {
				var advance = advances2[_g2];
				++_g2;
				width += advance;
			}
			layoutGroup.width = width;
			layoutGroup.height = heightValue;
			this.layoutGroups.push(layoutGroup);
			offsetY += heightValue;
			offsetX = 2;
			if(this.wordWrap && layoutGroup.offsetX + layoutGroup.width > this.width - 2) {
				layoutGroup.offsetY = offsetY;
				layoutGroup.offsetX = offsetX;
				offsetY += heightValue;
				lineIndex++;
			}
			textIndex = breakIndex + 1;
			breakIndex = this.text.indexOf("\n",textIndex);
			lineIndex++;
			if(formatRange.end == breakIndex) {
				if(rangeIndex < _g.textFormatRanges.length - 1) {
					rangeIndex++;
					formatRange = _g.textFormatRanges[rangeIndex];
					currentFormat.__merge(formatRange.format);
					openfl__$internal_text_TextEngine.__context.font = openfl__$internal_text_TextEngine.getFont(currentFormat);
					ascent = currentFormat.size;
					descent = currentFormat.size * 0.185;
					leading = currentFormat.leading;
					heightValue = ascent + descent + leading;
					if(spaceIndex > -1) spaceWidth = openfl__$internal_text_TextEngine.__context.measureText(" ").width;
				}
				lineFormat = formatRange.format;
			}
		} else if(formatRange.end >= spaceIndex && spaceIndex > -1) {
			layoutGroup = null;
			wrap = false;
			while(true) {
				if(spaceIndex == -1) spaceIndex = formatRange.end;
				var text1 = this.text;
				var advances3 = [];
				var _g3 = textIndex;
				while(_g3 < spaceIndex) {
					var i1 = _g3++;
					advances3.push(openfl__$internal_text_TextEngine.__context.measureText(text1.charAt(i1)).width);
				}
				advances = advances3;
				var width1 = 0.0;
				var _g4 = 0;
				while(_g4 < advances.length) {
					var advance1 = advances[_g4];
					++_g4;
					width1 += advance1;
				}
				widthValue = width1;
				if(this.wordWrap) {
					if(offsetX + widthValue > this.width - 2) wrap = true;
				}
				if(wrap) {
					offsetY += heightValue;
					var i2 = this.layoutGroups.length - 1;
					var offsetCount = 0;
					while(true) {
						layoutGroup = this.layoutGroups[i2];
						if(i2 > 0 && layoutGroup.startIndex > previousSpaceIndex) offsetCount++; else break;
						i2--;
					}
					lineIndex++;
					offsetX = 2;
					if(offsetCount > 0) {
						var bumpX = this.layoutGroups[this.layoutGroups.length - offsetCount].offsetX;
						var _g11 = this.layoutGroups.length - offsetCount;
						var _g5 = this.layoutGroups.length;
						while(_g11 < _g5) {
							var i3 = _g11++;
							layoutGroup = this.layoutGroups[i3];
							layoutGroup.offsetX -= bumpX;
							layoutGroup.offsetY = offsetY;
							layoutGroup.lineIndex = lineIndex;
							offsetX += layoutGroup.width;
						}
					}
					layoutGroup = new openfl__$internal_text_TextLayoutGroup(formatRange.format,textIndex,spaceIndex);
					layoutGroup.advances = advances;
					layoutGroup.offsetX = offsetX;
					layoutGroup.ascent = ascent;
					layoutGroup.descent = descent;
					layoutGroup.leading = leading;
					layoutGroup.lineIndex = lineIndex;
					layoutGroup.offsetY = offsetY;
					layoutGroup.width = widthValue;
					layoutGroup.height = heightValue;
					this.layoutGroups.push(layoutGroup);
					offsetX = widthValue + spaceWidth;
					marginRight = spaceWidth;
					wrap = false;
				} else {
					if(layoutGroup != null && textIndex == spaceIndex) {
						if(formatRange.format.align != 2) layoutGroup.endIndex = spaceIndex;
						layoutGroup.advances.push(spaceWidth);
						marginRight += spaceWidth;
					} else if(layoutGroup == null || lineFormat.align == 2) {
						layoutGroup = new openfl__$internal_text_TextLayoutGroup(formatRange.format,textIndex,spaceIndex);
						layoutGroup.advances = advances;
						layoutGroup.offsetX = offsetX;
						layoutGroup.ascent = ascent;
						layoutGroup.descent = descent;
						layoutGroup.leading = leading;
						layoutGroup.lineIndex = lineIndex;
						layoutGroup.offsetY = offsetY;
						layoutGroup.width = widthValue;
						layoutGroup.height = heightValue;
						this.layoutGroups.push(layoutGroup);
						layoutGroup.advances.push(spaceWidth);
						marginRight = spaceWidth;
					} else {
						layoutGroup.endIndex = spaceIndex;
						layoutGroup.advances = layoutGroup.advances.concat(advances);
						layoutGroup.width += marginRight + widthValue;
						layoutGroup.advances.push(spaceWidth);
						marginRight = spaceWidth;
					}
					offsetX += widthValue + spaceWidth;
				}
				textIndex = spaceIndex + 1;
				previousSpaceIndex = spaceIndex;
				spaceIndex = this.text.indexOf(" ",previousSpaceIndex + 1);
				if(formatRange.end <= previousSpaceIndex) {
					layoutGroup = null;
					if(rangeIndex < _g.textFormatRanges.length - 1) {
						rangeIndex++;
						formatRange = _g.textFormatRanges[rangeIndex];
						currentFormat.__merge(formatRange.format);
						openfl__$internal_text_TextEngine.__context.font = openfl__$internal_text_TextEngine.getFont(currentFormat);
						ascent = currentFormat.size;
						descent = currentFormat.size * 0.185;
						leading = currentFormat.leading;
						heightValue = ascent + descent + leading;
						if(spaceIndex > -1) spaceWidth = openfl__$internal_text_TextEngine.__context.measureText(" ").width;
					}
				}
				if(spaceIndex > breakIndex && breakIndex > -1 || textIndex > this.text.length || spaceIndex > formatRange.end || spaceIndex == -1 && breakIndex > -1) break;
			}
		} else {
			if(textIndex >= formatRange.end) break;
			layoutGroup = new openfl__$internal_text_TextLayoutGroup(formatRange.format,textIndex,formatRange.end);
			var text2 = this.text;
			var advances4 = [];
			var _g6 = textIndex;
			while(_g6 < formatRange.end) {
				var i4 = _g6++;
				advances4.push(openfl__$internal_text_TextEngine.__context.measureText(text2.charAt(i4)).width);
			}
			layoutGroup.advances = advances4;
			layoutGroup.offsetX = offsetX;
			layoutGroup.ascent = ascent;
			layoutGroup.descent = descent;
			layoutGroup.leading = leading;
			layoutGroup.lineIndex = lineIndex;
			layoutGroup.offsetY = offsetY;
			var advances5 = layoutGroup.advances;
			var width2 = 0.0;
			var _g7 = 0;
			while(_g7 < advances5.length) {
				var advance2 = advances5[_g7];
				++_g7;
				width2 += advance2;
			}
			layoutGroup.width = width2;
			layoutGroup.height = heightValue;
			this.layoutGroups.push(layoutGroup);
			offsetX += layoutGroup.width;
			textIndex = formatRange.end;
			if(rangeIndex < _g.textFormatRanges.length - 1) {
				rangeIndex++;
				formatRange = _g.textFormatRanges[rangeIndex];
				currentFormat.__merge(formatRange.format);
				openfl__$internal_text_TextEngine.__context.font = openfl__$internal_text_TextEngine.getFont(currentFormat);
				ascent = currentFormat.size;
				descent = currentFormat.size * 0.185;
				leading = currentFormat.leading;
				heightValue = ascent + descent + leading;
				if(spaceIndex > -1) spaceWidth = openfl__$internal_text_TextEngine.__context.measureText(" ").width;
			}
		}
	}
	,setTextAlignment: function() {
		var lineIndex = -1;
		var offsetX = 0.0;
		var group;
		var lineLength;
		var _g1 = 0;
		var _g = this.layoutGroups.length;
		while(_g1 < _g) {
			var i = _g1++;
			group = this.layoutGroups[i];
			if(group.lineIndex != lineIndex) {
				lineIndex = group.lineIndex;
				var _g2 = group.format.align;
				switch(_g2) {
				case 0:
					if(this.lineWidths[lineIndex] < this.width - 4) offsetX = Math.round((this.width - 4 - this.lineWidths[lineIndex]) / 2); else offsetX = 0;
					break;
				case 4:
					if(this.lineWidths[lineIndex] < this.width - 4) offsetX = Math.round(this.width - 4 - this.lineWidths[lineIndex]); else offsetX = 0;
					break;
				case 2:
					if(this.lineWidths[lineIndex] < this.width - 4) {
						lineLength = 1;
						var _g4 = i + 1;
						var _g3 = this.layoutGroups.length;
						while(_g4 < _g3) {
							var j = _g4++;
							if(this.layoutGroups[j].lineIndex == lineIndex) lineLength++; else break;
						}
						if(lineLength > 1) {
							group = this.layoutGroups[i + lineLength - 1];
							if(group.endIndex < this.text.length && this.text.charAt(group.endIndex) != "\n") {
								offsetX = (this.width - 4 - this.lineWidths[lineIndex]) / (lineLength - 1);
								var _g31 = 1;
								while(_g31 < lineLength) {
									var j1 = _g31++;
									this.layoutGroups[i + j1].offsetX += offsetX * j1;
								}
							}
						}
					}
					offsetX = 0;
					break;
				default:
					offsetX = 0;
				}
			}
			if(offsetX > 0) group.offsetX += offsetX;
		}
	}
	,update: function() {
		if(this.text == null || StringTools.trim(this.text) == "" || this.textFormatRanges.length == 0) {
			this.lineAscents.splice(0,this.lineAscents.length);
			this.lineBreaks.splice(0,this.lineBreaks.length);
			this.lineDescents.splice(0,this.lineDescents.length);
			this.lineLeadings.splice(0,this.lineLeadings.length);
			this.lineHeights.splice(0,this.lineHeights.length);
			this.lineWidths.splice(0,this.lineWidths.length);
			this.layoutGroups.splice(0,this.layoutGroups.length);
			this.textWidth = 0;
			this.textHeight = 0;
			this.numLines = 1;
			this.maxScrollH = 0;
			this.maxScrollV = 1;
			this.bottomScrollV = 1;
		} else {
			this.getLayoutGroups();
			this.getLineMeasurements();
			this.setTextAlignment();
		}
		this.getBounds();
	}
	,__class__: openfl__$internal_text_TextEngine
};
var openfl__$internal_text_TextFormatRange = function(format,start,end) {
	this.format = format;
	this.start = start;
	this.end = end;
};
$hxClasses["openfl._internal.text.TextFormatRange"] = openfl__$internal_text_TextFormatRange;
openfl__$internal_text_TextFormatRange.__name__ = true;
openfl__$internal_text_TextFormatRange.prototype = {
	__class__: openfl__$internal_text_TextFormatRange
};
var openfl__$internal_text_TextLayoutGroup = function(format,startIndex,endIndex) {
	this.format = format;
	this.startIndex = startIndex;
	this.endIndex = endIndex;
};
$hxClasses["openfl._internal.text.TextLayoutGroup"] = openfl__$internal_text_TextLayoutGroup;
openfl__$internal_text_TextLayoutGroup.__name__ = true;
openfl__$internal_text_TextLayoutGroup.prototype = {
	__class__: openfl__$internal_text_TextLayoutGroup
};
var openfl_display_Application = function() {
	lime_app_Application.call(this);
	if(openfl_Lib.application == null) openfl_Lib.application = this;
};
$hxClasses["openfl.display.Application"] = openfl_display_Application;
openfl_display_Application.__name__ = true;
openfl_display_Application.__super__ = lime_app_Application;
openfl_display_Application.prototype = $extend(lime_app_Application.prototype,{
	create: function(config) {
		this.config = config;
		this.backend.create(config);
		if(config != null) {
			if(Object.prototype.hasOwnProperty.call(config,"fps")) this.backend.setFrameRate(config.fps);
			if(Object.prototype.hasOwnProperty.call(config,"windows")) {
				var _g = 0;
				var _g1 = config.windows;
				while(_g < _g1.length) {
					var windowConfig = _g1[_g];
					++_g;
					var $window = new openfl_display_Window(windowConfig);
					this.createWindow($window);
					break;
				}
			}
			if(this.preloader == null || this.preloader.complete) this.onPreloadComplete();
		}
	}
	,__class__: openfl_display_Application
});
var openfl_display_BitmapData = function(width,height,transparent,fillColor) {
	if(fillColor == null) fillColor = -1;
	if(transparent == null) transparent = true;
	this.transparent = transparent;
	if(width == null) width = 0; else width = width;
	if(height == null) height = 0; else height = height;
	if(width < 0) width = 0; else width = width;
	if(height < 0) height = 0; else height = height;
	this.width = width;
	this.height = height;
	this.rect = new openfl_geom_Rectangle(0,0,width,height);
	if(width > 0 && height > 0) {
		if(transparent) {
			if((fillColor & -16777216) == 0) fillColor = 0;
		} else fillColor = -16777216 | fillColor & 16777215;
		fillColor = fillColor << 8 | fillColor >> 24 & 255;
		this.image = new lime_graphics_Image(null,0,0,width,height,fillColor);
		this.image.set_transparent(transparent);
		this.__isValid = true;
	}
	this.__createUVs();
	this.__worldTransform = new openfl_geom_Matrix();
	this.__worldColorTransform = new openfl_geom_ColorTransform();
};
$hxClasses["openfl.display.BitmapData"] = openfl_display_BitmapData;
openfl_display_BitmapData.__name__ = true;
openfl_display_BitmapData.__interfaces__ = [openfl_display_IBitmapDrawable];
openfl_display_BitmapData.fromCanvas = function(canvas,transparent) {
	if(transparent == null) transparent = true;
	if(canvas == null) return null;
	var bitmapData = new openfl_display_BitmapData(0,0,transparent);
	bitmapData.__fromImage(lime_graphics_Image.fromCanvas(canvas));
	bitmapData.image.set_transparent(transparent);
	return bitmapData;
};
openfl_display_BitmapData.fromImage = function(image,transparent) {
	if(transparent == null) transparent = true;
	if(image == null || image.buffer == null) return null;
	var bitmapData = new openfl_display_BitmapData(0,0,transparent);
	bitmapData.__fromImage(image);
	bitmapData.image.set_transparent(transparent);
	return bitmapData;
};
openfl_display_BitmapData.prototype = {
	__createUVs: function(x0,y0,x1,y1,x2,y2,x3,y3) {
		if(y3 == null) y3 = 1;
		if(x3 == null) x3 = 0;
		if(y2 == null) y2 = 1;
		if(x2 == null) x2 = 1;
		if(y1 == null) y1 = 0;
		if(x1 == null) x1 = 1;
		if(y0 == null) y0 = 0;
		if(x0 == null) x0 = 0;
		if(this.__uvData == null) this.__uvData = new openfl_display_TextureUvs();
		this.__uvData.x0 = x0;
		this.__uvData.y0 = y0;
		this.__uvData.x1 = x1;
		this.__uvData.y1 = y1;
		this.__uvData.x2 = x2;
		this.__uvData.y2 = y2;
		this.__uvData.x3 = x3;
		this.__uvData.y3 = y3;
	}
	,__fromImage: function(image) {
		if(image != null && image.buffer != null) {
			this.image = image;
			this.width = image.width;
			this.height = image.height;
			this.rect = new openfl_geom_Rectangle(0,0,image.width,image.height);
			this.__isValid = true;
		}
	}
	,__sync: function() {
		lime_graphics_utils_ImageCanvasUtil.sync(this.image,false);
	}
	,__class__: openfl_display_BitmapData
};
var openfl_display_TextureUvs = function() {
	this.y3 = 0;
	this.y2 = 0;
	this.y1 = 0;
	this.y0 = 0;
	this.x3 = 0;
	this.x2 = 0;
	this.x1 = 0;
	this.x0 = 0;
};
$hxClasses["openfl.display.TextureUvs"] = openfl_display_TextureUvs;
openfl_display_TextureUvs.__name__ = true;
openfl_display_TextureUvs.prototype = {
	__class__: openfl_display_TextureUvs
};
var openfl_display__$CapsStyle_CapsStyle_$Impl_$ = {};
$hxClasses["openfl.display._CapsStyle.CapsStyle_Impl_"] = openfl_display__$CapsStyle_CapsStyle_$Impl_$;
openfl_display__$CapsStyle_CapsStyle_$Impl_$.__name__ = true;
openfl_display__$CapsStyle_CapsStyle_$Impl_$.toString = function(value) {
	switch(value) {
	case 0:
		return "none";
	case 1:
		return "round";
	case 2:
		return "square";
	default:
		return null;
	}
};
var openfl_text_TextField = function() {
	openfl_display_InteractiveObject.call(this);
	this.__caretIndex = -1;
	this.__graphics = new openfl_display_Graphics();
	this.__textEngine = new openfl__$internal_text_TextEngine(this);
	this.__layoutDirty = true;
	this.__tabEnabled = true;
	if(openfl_text_TextField.__defaultTextFormat == null) {
		openfl_text_TextField.__defaultTextFormat = new openfl_text_TextFormat("Times New Roman",12,0,false,false,false,"","",3,0,0,0,0);
		openfl_text_TextField.__defaultTextFormat.blockIndent = 0;
		openfl_text_TextField.__defaultTextFormat.bullet = false;
		openfl_text_TextField.__defaultTextFormat.letterSpacing = 0;
		openfl_text_TextField.__defaultTextFormat.kerning = false;
	}
	this.__textFormat = openfl_text_TextField.__defaultTextFormat.clone();
	this.__textEngine.textFormatRanges.push(new openfl__$internal_text_TextFormatRange(this.__textFormat,0,0));
	this.addEventListener("mouseDown",$bind(this,this.this_onMouseDown));
};
$hxClasses["openfl.text.TextField"] = openfl_text_TextField;
openfl_text_TextField.__name__ = true;
openfl_text_TextField.__defaultTextFormat = null;
openfl_text_TextField.__super__ = openfl_display_InteractiveObject;
openfl_text_TextField.prototype = $extend(openfl_display_InteractiveObject.prototype,{
	getCharBoundaries: function(charIndex) {
		if(charIndex < 0 || charIndex > this.__textEngine.text.length - 1) return null;
		this.__updateLayout();
		var _g = 0;
		var _g1 = this.__textEngine.layoutGroups;
		while(_g < _g1.length) {
			var group = _g1[_g];
			++_g;
			if(charIndex >= group.startIndex && charIndex <= group.endIndex) {
				var x = group.offsetX;
				var _g3 = 0;
				var _g2 = charIndex - group.startIndex;
				while(_g3 < _g2) {
					var i = _g3++;
					x += group.advances[i];
				}
				return new openfl_geom_Rectangle(x,group.offsetY,group.advances[charIndex - group.startIndex],group.ascent + group.descent);
			}
		}
		return null;
	}
	,replaceSelectedText: function(value) {
		if(value == "" && this.__selectionIndex == this.__caretIndex) return;
		var startIndex;
		if(this.__caretIndex < this.__selectionIndex) startIndex = this.__caretIndex; else startIndex = this.__selectionIndex;
		var endIndex;
		if(this.__caretIndex > this.__selectionIndex) endIndex = this.__caretIndex; else endIndex = this.__selectionIndex;
		this.replaceText(startIndex,endIndex,value);
		this.__caretIndex = startIndex + value.length;
		this.__selectionIndex = this.__caretIndex;
	}
	,replaceText: function(beginIndex,endIndex,newText) {
		if(endIndex < beginIndex || beginIndex < 0 || endIndex > this.__textEngine.text.length || newText == null) return;
		this.__textEngine.text = this.__textEngine.text.substring(0,beginIndex) + newText + this.__textEngine.text.substring(endIndex);
		var offset = newText.length - (endIndex - beginIndex);
		var i = 0;
		var range;
		while(i < this.__textEngine.textFormatRanges.length) {
			range = this.__textEngine.textFormatRanges[i];
			if(range.start <= beginIndex && range.end >= endIndex) {
				range.end += offset;
				i++;
			} else if(range.start >= beginIndex && range.end <= endIndex) {
				this.__textEngine.textFormatRanges.splice(i,1);
				offset -= range.end - range.start;
			} else if(range.start > beginIndex && range.start <= endIndex) {
				range.start += offset;
				i++;
			} else i++;
		}
		this.__dirty = true;
		this.__layoutDirty = true;
	}
	,setTextFormat: function(format,beginIndex,endIndex) {
		if(endIndex == null) endIndex = 0;
		if(beginIndex == null) beginIndex = 0;
		if(format.font != null) this.__textFormat.font = format.font;
		if(format.size != null) this.__textFormat.size = format.size;
		if(format.color != null) this.__textFormat.color = format.color;
		if(format.bold != null) this.__textFormat.bold = format.bold;
		if(format.italic != null) this.__textFormat.italic = format.italic;
		if(format.underline != null) this.__textFormat.underline = format.underline;
		if(format.url != null) this.__textFormat.url = format.url;
		if(format.target != null) this.__textFormat.target = format.target;
		if(format.align != null) this.__textFormat.align = format.align;
		if(format.leftMargin != null) this.__textFormat.leftMargin = format.leftMargin;
		if(format.rightMargin != null) this.__textFormat.rightMargin = format.rightMargin;
		if(format.indent != null) this.__textFormat.indent = format.indent;
		if(format.leading != null) this.__textFormat.leading = format.leading;
		if(format.blockIndent != null) this.__textFormat.blockIndent = format.blockIndent;
		if(format.bullet != null) this.__textFormat.bullet = format.bullet;
		if(format.kerning != null) this.__textFormat.kerning = format.kerning;
		if(format.letterSpacing != null) this.__textFormat.letterSpacing = format.letterSpacing;
		if(format.tabStops != null) this.__textFormat.tabStops = format.tabStops;
		this.__dirty = true;
		this.__layoutDirty = true;
	}
	,__getBounds: function(rect,matrix) {
		this.__updateLayout();
		var bounds = openfl_geom_Rectangle.__temp;
		this.__textEngine.bounds.__transform(bounds,matrix);
		rect.__expand(bounds.x,bounds.y,bounds.width,bounds.height);
	}
	,__getCursor: function() {
		if(this.__textEngine.selectable) return lime_ui_MouseCursor.TEXT; else return null;
	}
	,__getPosition: function(x,y) {
		this.__updateLayout();
		x += this.get_scrollH();
		var _g1 = 0;
		var _g = this.get_scrollV() - 1;
		while(_g1 < _g) {
			var i = _g1++;
			y += this.__textEngine.lineHeights[i];
		}
		if(y > this.__textEngine.textHeight) y = this.__textEngine.textHeight;
		var firstGroup = true;
		var group;
		var nextGroup;
		var _g11 = 0;
		var _g2 = this.__textEngine.layoutGroups.length;
		while(_g11 < _g2) {
			var i1 = _g11++;
			group = this.__textEngine.layoutGroups[i1];
			if(i1 < this.__textEngine.layoutGroups.length - 1) nextGroup = this.__textEngine.layoutGroups[i1 + 1]; else nextGroup = null;
			if(firstGroup) {
				if(y < group.offsetY) y = group.offsetY;
				if(x < group.offsetX) x = group.offsetX;
				firstGroup = false;
			}
			if(y >= group.offsetY && y <= group.offsetY + group.height || nextGroup == null) {
				if(x >= group.offsetX && x <= group.offsetX + group.width || (nextGroup == null || nextGroup.lineIndex != group.lineIndex)) {
					var advance = 0.0;
					var _g3 = 0;
					var _g21 = group.advances.length;
					while(_g3 < _g21) {
						var i2 = _g3++;
						advance += group.advances[i2];
						if(x <= group.offsetX + advance) {
							if(x <= group.offsetX + (advance - group.advances[i2]) + group.advances[i2] / 2) return group.startIndex + i2; else if(group.startIndex + i2 < group.endIndex) return group.startIndex + i2 + 1; else return group.endIndex;
						}
					}
					return group.endIndex;
				}
			}
		}
		return this.__textEngine.text.length;
	}
	,__hitTest: function(x,y,shapeFlag,stack,interactiveOnly,hitObject) {
		if(!hitObject.get_visible() || this.__isMask || interactiveOnly && !this.mouseEnabled) return false;
		if(this.get_mask() != null && !this.get_mask().__hitTestMask(x,y)) return false;
		this.__getWorldTransform();
		this.__updateLayout();
		var px = this.__worldTransform.__transformInverseX(x,y);
		var py = this.__worldTransform.__transformInverseY(x,y);
		if(this.__textEngine.bounds.contains(px,py)) {
			if(stack != null) stack.push(hitObject);
			return true;
		}
		return false;
	}
	,__hitTestMask: function(x,y) {
		this.__getWorldTransform();
		this.__updateLayout();
		var px = this.__worldTransform.__transformInverseX(x,y);
		var py = this.__worldTransform.__transformInverseY(x,y);
		if(this.__textEngine.bounds.contains(px,py)) return true;
		return false;
	}
	,__renderCairo: function(renderSession) {
		openfl__$internal_renderer_cairo_CairoTextField.render(this,renderSession);
		openfl_display_InteractiveObject.prototype.__renderCairo.call(this,renderSession);
	}
	,__renderCanvas: function(renderSession) {
		openfl__$internal_renderer_canvas_CanvasTextField.render(this,renderSession);
		if(this.__textEngine.antiAliasType == 0 && this.__textEngine.gridFitType == 1) {
			var smoothingEnabled = renderSession.context.imageSmoothingEnabled;
			if(smoothingEnabled) {
				renderSession.context.mozImageSmoothingEnabled = false;
				renderSession.context.msImageSmoothingEnabled = false;
				renderSession.context.imageSmoothingEnabled = false;
			}
			openfl_display_InteractiveObject.prototype.__renderCanvas.call(this,renderSession);
			if(smoothingEnabled) {
				renderSession.context.mozImageSmoothingEnabled = true;
				renderSession.context.msImageSmoothingEnabled = true;
				renderSession.context.imageSmoothingEnabled = true;
			}
		} else openfl_display_InteractiveObject.prototype.__renderCanvas.call(this,renderSession);
	}
	,__startCursorTimer: function() {
		this.__cursorTimer = haxe_Timer.delay($bind(this,this.__startCursorTimer),600);
		this.__showCursor = !this.__showCursor;
		this.__dirty = true;
	}
	,__startTextInput: function() {
		if(this.__caretIndex < 0) {
			this.__caretIndex = this.__textEngine.text.length;
			this.__selectionIndex = this.__caretIndex;
		}
		if(this.stage != null) {
			this.stage.window.backend.setEnableTextEvents(true);
			if(!this.__inputEnabled) {
				this.stage.window.backend.setEnableTextEvents(true);
				if(!this.stage.window.onTextInput.has($bind(this,this.window_onTextInput))) {
					this.stage.window.onTextInput.add($bind(this,this.window_onTextInput));
					this.stage.window.onKeyDown.add($bind(this,this.window_onKeyDown));
				}
				this.__inputEnabled = true;
				this.__startCursorTimer();
			}
		}
	}
	,__stopCursorTimer: function() {
		if(this.__cursorTimer != null) {
			this.__cursorTimer.stop();
			this.__cursorTimer = null;
		}
		if(this.__showCursor) {
			this.__showCursor = false;
			this.__dirty = true;
		}
	}
	,__stopTextInput: function() {
		if(this.__inputEnabled && this.stage != null) {
			this.stage.window.backend.setEnableTextEvents(false);
			this.stage.window.onTextInput.remove($bind(this,this.window_onTextInput));
			this.stage.window.onKeyDown.remove($bind(this,this.window_onKeyDown));
			this.__inputEnabled = false;
			this.__stopCursorTimer();
		}
	}
	,__updateLayout: function() {
		if(this.__layoutDirty) {
			this.__textEngine.update();
			if(this.__textEngine.autoSize != 2) {
				var cacheWidth = this.__textEngine.width;
				var cacheHeight = this.__textEngine.height;
				var _g = this.__textEngine.autoSize;
				switch(_g) {
				case 1:case 3:case 0:
					if(!this.__textEngine.wordWrap) this.__textEngine.width = this.__textEngine.textWidth + 4;
					this.__textEngine.height = this.__textEngine.textHeight + 4;
					break;
				default:
				}
				if(this.__textEngine.width != cacheWidth) {
					var _g1 = this.__textEngine.autoSize;
					switch(_g1) {
					case 3:
						var _g11 = this;
						_g11.set_x(_g11.get_x() + (cacheWidth - this.__textEngine.width));
						break;
					case 0:
						var _g12 = this;
						_g12.set_x(_g12.get_x() + (cacheWidth - this.__textEngine.width) / 2);
						break;
					default:
					}
				}
				this.__textEngine.getBounds();
			}
			this.__layoutDirty = false;
		}
	}
	,set_defaultTextFormat: function(value) {
		this.__textFormat.__merge(value);
		this.__layoutDirty = true;
		this.__dirty = true;
		return value;
	}
	,set_height: function(value) {
		if(this.get_scaleY() != 1 || value != this.__textEngine.height) {
			if(!this.__transformDirty) {
				this.__transformDirty = true;
				openfl_display_DisplayObject.__worldTransformDirty++;
			}
			this.__dirty = true;
			this.__layoutDirty = true;
		}
		this.set_scaleY(1);
		return this.__textEngine.height = value;
	}
	,get_scrollH: function() {
		return this.__textEngine.scrollH;
	}
	,get_scrollV: function() {
		return this.__textEngine.scrollV;
	}
	,get_selectable: function() {
		return this.__textEngine.selectable;
	}
	,set_selectable: function(value) {
		if(value != this.__textEngine.selectable && this.get_type() == 1) {
			if(this.stage != null && this.stage.get_focus() == this) this.__startTextInput(); else if(!value) this.__stopTextInput();
		}
		return this.__textEngine.selectable = value;
	}
	,set_text: function(value) {
		if(this.__isHTML || this.__textEngine.text != value) {
			this.__dirty = true;
			this.__layoutDirty = true;
		} else return value;
		if(this.__textEngine.textFormatRanges.length > 1) this.__textEngine.textFormatRanges.splice(1,this.__textEngine.textFormatRanges.length - 1);
		var range = this.__textEngine.textFormatRanges[0];
		range.format = this.__textFormat;
		range.start = 0;
		range.end = value.length;
		this.__isHTML = false;
		return this.__textEngine.text = value;
	}
	,get_textWidth: function() {
		this.__updateLayout();
		return this.__textEngine.textWidth;
	}
	,get_textHeight: function() {
		this.__updateLayout();
		return this.__textEngine.textHeight;
	}
	,get_type: function() {
		return this.__textEngine.type;
	}
	,set_width: function(value) {
		if(this.get_scaleX() != 1 || this.__textEngine.width != value) {
			if(!this.__transformDirty) {
				this.__transformDirty = true;
				openfl_display_DisplayObject.__worldTransformDirty++;
			}
			this.__dirty = true;
			this.__layoutDirty = true;
		}
		this.set_scaleX(1);
		return this.__textEngine.width = value;
	}
	,stage_onMouseMove: function(event) {
		if(this.stage == null) return;
		if(this.__textEngine.selectable && this.__selectionIndex >= 0) {
			this.__updateLayout();
			var position = this.__getPosition(this.get_mouseX(),this.get_mouseY());
			if(position != this.__caretIndex) {
				this.__caretIndex = position;
				this.__dirty = true;
			}
		}
	}
	,stage_onMouseUp: function(event) {
		if(this.stage == null) return;
		this.stage.removeEventListener("mouseMove",$bind(this,this.stage_onMouseMove));
		this.stage.removeEventListener("mouseUp",$bind(this,this.stage_onMouseUp));
		if(this.stage.get_focus() == this) {
			this.__getWorldTransform();
			this.__updateLayout();
			var px = this.__worldTransform.__transformInverseX(this.get_x(),this.get_y());
			var py = this.__worldTransform.__transformInverseY(this.get_x(),this.get_y());
			var upPos = this.__getPosition(this.get_mouseX(),this.get_mouseY());
			var leftPos;
			var rightPos;
			leftPos = Std["int"](Math.min(this.__selectionIndex,upPos));
			rightPos = Std["int"](Math.max(this.__selectionIndex,upPos));
			this.__selectionIndex = leftPos;
			this.__caretIndex = rightPos;
			if(this.__inputEnabled) {
				this.this_onFocusIn(null);
				this.__stopCursorTimer();
				this.__startCursorTimer();
			}
		}
	}
	,this_onFocusIn: function(event) {
		if(this.get_selectable() && this.get_type() == 1 && this.stage != null && this.stage.get_focus() == this) this.__startTextInput();
	}
	,this_onMouseDown: function(event) {
		if(!this.get_selectable()) return;
		this.__updateLayout();
		this.__caretIndex = this.__getPosition(this.get_mouseX(),this.get_mouseY());
		this.__selectionIndex = this.__caretIndex;
		this.__dirty = true;
		this.stage.addEventListener("mouseMove",$bind(this,this.stage_onMouseMove));
		this.stage.addEventListener("mouseUp",$bind(this,this.stage_onMouseUp));
	}
	,window_onKeyDown: function(key,modifier) {
		switch(key) {
		case 8:
			if(this.__selectionIndex == this.__caretIndex && this.__caretIndex > 0) this.__selectionIndex = this.__caretIndex - 1;
			if(this.__selectionIndex != this.__caretIndex) {
				this.replaceSelectedText("");
				this.__selectionIndex = this.__caretIndex;
				this.dispatchEvent(new openfl_events_Event("change",true));
			}
			break;
		case 127:
			if(this.__selectionIndex == this.__caretIndex && this.__caretIndex < this.__textEngine.text.length) this.__selectionIndex = this.__caretIndex + 1;
			if(this.__selectionIndex != this.__caretIndex) {
				this.replaceSelectedText("");
				this.__selectionIndex = this.__caretIndex;
				this.dispatchEvent(new openfl_events_Event("change",true));
			}
			break;
		case 1073741904:
			if(lime_ui__$KeyModifier_KeyModifier_$Impl_$.get_shiftKey(modifier)) {
				if(this.__caretIndex > 0) this.__caretIndex--;
			} else {
				if(this.__selectionIndex == this.__caretIndex) {
					if(this.__caretIndex > 0) this.__caretIndex--;
				} else this.__caretIndex = Std["int"](Math.min(this.__caretIndex,this.__selectionIndex));
				this.__selectionIndex = this.__caretIndex;
			}
			this.__stopCursorTimer();
			this.__startCursorTimer();
			break;
		case 1073741903:
			if(lime_ui__$KeyModifier_KeyModifier_$Impl_$.get_shiftKey(modifier)) {
				if(this.__caretIndex < this.__textEngine.text.length) this.__caretIndex++;
			} else {
				if(this.__selectionIndex == this.__caretIndex) {
					if(this.__caretIndex < this.__textEngine.text.length) this.__caretIndex++;
				} else this.__caretIndex = Std["int"](Math.max(this.__caretIndex,this.__selectionIndex));
				this.__selectionIndex = this.__caretIndex;
			}
			this.__stopCursorTimer();
			this.__startCursorTimer();
			break;
		case 99:
			if(modifier == 64 || modifier == 128) lime_system_Clipboard.set_text(this.__textEngine.text.substring(this.__caretIndex,this.__selectionIndex));
			break;
		case 120:
			if(modifier == 64 || modifier == 128) {
				lime_system_Clipboard.set_text(this.__textEngine.text.substring(this.__caretIndex,this.__selectionIndex));
				if(this.__caretIndex != this.__selectionIndex) {
					this.replaceSelectedText("");
					this.dispatchEvent(new openfl_events_Event("change",true));
				}
			}
			break;
		case 118:
			if(modifier == 64 || modifier == 128) {
				var text = lime_system_Clipboard.get_text();
				if(text != null) this.replaceSelectedText(text); else this.replaceSelectedText("");
				this.dispatchEvent(new openfl_events_Event("change",true));
			} else this.__textEngine.textFormatRanges[this.__textEngine.textFormatRanges.length - 1].end = this.__textEngine.text.length;
			break;
		default:
		}
	}
	,window_onTextInput: function(value) {
		this.replaceSelectedText(value);
		this.dispatchEvent(new openfl_events_Event("change",true));
	}
	,__class__: openfl_text_TextField
});
var openfl_display_FPS = function(x,y,color) {
	if(color == null) color = 0;
	if(y == null) y = 10;
	if(x == null) x = 10;
	openfl_text_TextField.call(this);
	this.set_x(x);
	this.set_y(y);
	this.currentFPS = 0;
	this.set_selectable(false);
	this.mouseEnabled = false;
	this.set_defaultTextFormat(new openfl_text_TextFormat("_sans",12,color));
	this.set_text("FPS: ");
	this.cacheCount = 0;
	this.times = [];
	this.addEventListener("enterFrame",$bind(this,this.this_onEnterFrame));
};
$hxClasses["openfl.display.FPS"] = openfl_display_FPS;
openfl_display_FPS.__name__ = true;
openfl_display_FPS.__super__ = openfl_text_TextField;
openfl_display_FPS.prototype = $extend(openfl_text_TextField.prototype,{
	this_onEnterFrame: function(event) {
		var currentTime = haxe_Timer.stamp();
		this.times.push(currentTime);
		while(this.times[0] < currentTime - 1) this.times.shift();
		var currentCount = this.times.length;
		this.currentFPS = Math.round((currentCount + this.cacheCount) / 2);
		if(currentCount != this.cacheCount) this.set_text("FPS: " + this.currentFPS);
		this.cacheCount = currentCount;
	}
	,__class__: openfl_display_FPS
});
var openfl_display_FrameLabel = function() { };
$hxClasses["openfl.display.FrameLabel"] = openfl_display_FrameLabel;
openfl_display_FrameLabel.__name__ = true;
openfl_display_FrameLabel.__super__ = openfl_events_EventDispatcher;
openfl_display_FrameLabel.prototype = $extend(openfl_events_EventDispatcher.prototype,{
	__class__: openfl_display_FrameLabel
});
var openfl_display_Graphics = function() {
	this.__dirty = true;
	this.__commands = new openfl__$internal_renderer_DrawCommandBuffer();
	this.__strokePadding = 0;
	this.__positionX = 0;
	this.__positionY = 0;
	this.__hardware = true;
	this.moveTo(0,0);
};
$hxClasses["openfl.display.Graphics"] = openfl_display_Graphics;
openfl_display_Graphics.__name__ = true;
openfl_display_Graphics.prototype = {
	beginFill: function(color,alpha) {
		if(alpha == null) alpha = 1;
		if(color == null) color = 0;
		this.__commands.beginFill(color & 16777215,alpha);
		if(alpha > 0) this.__visible = true;
	}
	,clear: function() {
		this.__commands.clear();
		this.__strokePadding = 0;
		if(this.__bounds != null) {
			this.set___dirty(true);
			this.__transformDirty = true;
			this.__bounds = null;
		}
		this.__visible = false;
		this.__hardware = true;
		this.moveTo(0,0);
	}
	,drawRect: function(x,y,width,height) {
		if(width <= 0 || height <= 0) return;
		this.__inflateBounds(x - this.__strokePadding,y - this.__strokePadding);
		this.__inflateBounds(x + width + this.__strokePadding,y + height + this.__strokePadding);
		this.__commands.drawRect(x,y,width,height);
		this.set___dirty(true);
	}
	,drawTiles: function(sheet,tileData,smooth,flags,shader,count) {
		if(count == null) count = -1;
		if(flags == null) flags = 0;
		if(smooth == null) smooth = false;
		var useScale = (flags & 1) > 0;
		var useRotation = (flags & 2) > 0;
		var useRGB = (flags & 4) > 0;
		var useAlpha = (flags & 8) > 0;
		var useTransform = (flags & 16) > 0;
		var useColorTransform = (flags & 128) > 0;
		var useRect = (flags & 32) > 0;
		var useOrigin = (flags & 64) > 0;
		var rect = openfl_geom_Rectangle.__temp;
		var matrix = openfl_geom_Matrix.__temp;
		var numValues = 3;
		var totalCount = count;
		if(count < 0) totalCount = tileData.length;
		if(useTransform || useScale || useRotation || useRGB || useAlpha || useColorTransform) {
			var scaleIndex = 0;
			var rotationIndex = 0;
			var transformIndex = 0;
			if(useRect) if(useOrigin) numValues = 8; else numValues = 6;
			if(useScale) {
				scaleIndex = numValues;
				numValues++;
			}
			if(useRotation) {
				rotationIndex = numValues;
				numValues++;
			}
			if(useTransform) {
				transformIndex = numValues;
				numValues += 4;
			}
			if(useRGB) numValues += 3;
			if(useAlpha) numValues++;
			if(useColorTransform) numValues += 4;
			var itemCount = totalCount / numValues | 0;
			var index = 0;
			var cacheID = -1;
			var x;
			var y;
			var id;
			var scale;
			var rotation;
			var tileWidth;
			var tileHeight;
			var originX;
			var originY;
			var tile = null;
			var tilePoint = null;
			while(index < totalCount) {
				x = tileData[index];
				y = tileData[index + 1];
				if(!useRect) id = tileData[index + 2] | 0; else id = -1;
				scale = 1.0;
				rotation = 0.0;
				if(useScale) scale = tileData[index + scaleIndex];
				if(useRotation) rotation = tileData[index + rotationIndex];
				if(id < 0) tile = null; else if(!useRect && cacheID != id) {
					cacheID = id;
					tile = sheet.__tileRects[id];
					tilePoint = sheet.__centerPoints[id];
				} else if(useRect) {
					tile = sheet.__rectTile;
					tile.setTo(tileData[index + 2],tileData[index + 3],tileData[index + 4],tileData[index + 5]);
					tilePoint = sheet.__point;
					if(useOrigin) tilePoint.setTo(tileData[index + 6] / tile.width,tileData[index + 7] / tile.height); else tilePoint.setTo(0,0);
				}
				if(tile != null) {
					if(useTransform) {
						rect.setTo(0,0,tile.width,tile.height);
						matrix.setTo(tileData[index + transformIndex],tileData[index + transformIndex + 1],tileData[index + transformIndex + 2],tileData[index + transformIndex + 3],0,0);
						originX = tilePoint.x * scale;
						originY = tilePoint.y * scale;
						matrix.translate(x - (originX * matrix.a + originY * matrix.c + matrix.tx),y - (originX * matrix.b + originY * matrix.d + matrix.ty));
						rect.__transform(rect,matrix);
						this.__inflateBounds(rect.x,rect.y);
						this.__inflateBounds(rect.get_right(),rect.get_bottom());
					} else {
						tileWidth = tile.width * scale;
						tileHeight = tile.height * scale;
						x -= tilePoint.x * tileWidth;
						y -= tilePoint.y * tileHeight;
						if(rotation != 0) {
							rect.setTo(0,0,tileWidth,tileHeight);
							matrix.identity();
							matrix.rotate(rotation);
							matrix.translate(x,y);
							rect.__transform(rect,matrix);
							this.__inflateBounds(rect.x,rect.y);
							this.__inflateBounds(rect.get_right(),rect.get_bottom());
						} else {
							this.__inflateBounds(x,y);
							this.__inflateBounds(x + tileWidth,y + tileHeight);
						}
					}
				}
				index += numValues;
			}
		} else {
			var x1;
			var y1;
			var id1;
			var tile1;
			var centerPoint;
			var originX1;
			var originY1;
			var rect1 = openfl_geom_Rectangle.__temp;
			var index1 = 0;
			while(index1 < totalCount) {
				x1 = tileData[index1++];
				y1 = tileData[index1++];
				if(!useRect) id1 = Std["int"](tileData[index1++]); else id1 = -1;
				originX1 = 0.0;
				originY1 = 0.0;
				if(useRect) {
					rect1.setTo(tileData[index1++],tileData[index1++],tileData[index1++],tileData[index1++]);
					if(useOrigin) {
						originX1 = tileData[index1++];
						originY1 = tileData[index1++];
					}
					this.__inflateBounds(x1 - originX1,y1 - originY1);
					this.__inflateBounds(x1 - originX1 + rect1.width,y1 - originY1 + rect1.height);
				} else {
					tile1 = sheet.__tileRects[id1];
					if(tile1 != null) {
						centerPoint = sheet.__centerPoints[id1];
						originX1 = centerPoint.x * tile1.width;
						originY1 = centerPoint.y * tile1.height;
						this.__inflateBounds(x1 - originX1,y1 - originY1);
						this.__inflateBounds(x1 - originX1 + tile1.width,y1 - originY1 + tile1.height);
					}
				}
			}
		}
		this.__commands.drawTiles(sheet,tileData,smooth,flags,shader,count);
		this.set___dirty(true);
		this.__visible = true;
	}
	,endFill: function() {
		this.__commands.endFill();
	}
	,lineStyle: function(thickness,color,alpha,pixelHinting,scaleMode,caps,joints,miterLimit) {
		if(miterLimit == null) miterLimit = 3;
		if(scaleMode == null) scaleMode = 2;
		if(pixelHinting == null) pixelHinting = false;
		if(alpha == null) alpha = 1;
		if(color == null) color = 0;
		if(thickness != null) {
			if(joints == 1) {
				if(thickness > this.__strokePadding) this.__strokePadding = thickness;
			} else if(thickness / 2 > this.__strokePadding) this.__strokePadding = thickness / 2;
		}
		this.__commands.lineStyle(thickness,color,alpha,pixelHinting,scaleMode,caps,joints,miterLimit);
		if(thickness != null) this.__visible = true;
	}
	,lineTo: function(x,y) {
		this.__inflateBounds(this.__positionX - this.__strokePadding,this.__positionY - this.__strokePadding);
		this.__inflateBounds(this.__positionX + this.__strokePadding,this.__positionY + this.__strokePadding);
		this.__positionX = x;
		this.__positionY = y;
		this.__inflateBounds(this.__positionX - this.__strokePadding,this.__positionY - this.__strokePadding);
		this.__inflateBounds(this.__positionX + this.__strokePadding * 2,this.__positionY + this.__strokePadding);
		this.__commands.lineTo(x,y);
		this.__hardware = false;
		this.set___dirty(true);
	}
	,moveTo: function(x,y) {
		this.__positionX = x;
		this.__positionY = y;
		this.__commands.moveTo(x,y);
	}
	,__getBounds: function(rect,matrix) {
		if(this.__bounds == null) return;
		var bounds = openfl_geom_Rectangle.__temp;
		this.__bounds.__transform(bounds,matrix);
		rect.__expand(bounds.x,bounds.y,bounds.width,bounds.height);
	}
	,__hitTest: function(x,y,shapeFlag,matrix) {
		if(this.__bounds == null) return false;
		var px = matrix.__transformInverseX(x,y);
		var py = matrix.__transformInverseY(x,y);
		if(px > this.__bounds.x && py > this.__bounds.y && this.__bounds.contains(px,py)) {
			if(shapeFlag) return openfl__$internal_renderer_canvas_CanvasGraphics.hitTest(this,px,py);
			return true;
		}
		return false;
	}
	,__inflateBounds: function(x,y) {
		if(this.__bounds == null) {
			this.__bounds = new openfl_geom_Rectangle(x,y,0,0);
			this.__transformDirty = true;
			return;
		}
		if(x < this.__bounds.x) {
			this.__bounds.width += this.__bounds.x - x;
			this.__bounds.x = x;
			this.__transformDirty = true;
		}
		if(y < this.__bounds.y) {
			this.__bounds.height += this.__bounds.y - y;
			this.__bounds.y = y;
			this.__transformDirty = true;
		}
		if(x > this.__bounds.x + this.__bounds.width) this.__bounds.width = x - this.__bounds.x;
		if(y > this.__bounds.y + this.__bounds.height) this.__bounds.height = y - this.__bounds.y;
	}
	,set___dirty: function(value) {
		if(value && this.__owner != null) this.__owner.__setRenderDirty();
		return this.__dirty = value;
	}
	,__class__: openfl_display_Graphics
};
var openfl_display__$JointStyle_JointStyle_$Impl_$ = {};
$hxClasses["openfl.display._JointStyle.JointStyle_Impl_"] = openfl_display__$JointStyle_JointStyle_$Impl_$;
openfl_display__$JointStyle_JointStyle_$Impl_$.__name__ = true;
openfl_display__$JointStyle_JointStyle_$Impl_$.toString = function(value) {
	switch(value) {
	case 0:
		return "bevel";
	case 1:
		return "miter";
	case 2:
		return "round";
	default:
		return null;
	}
};
var openfl_display_Loader = function() { };
$hxClasses["openfl.display.Loader"] = openfl_display_Loader;
openfl_display_Loader.__name__ = true;
openfl_display_Loader.__super__ = openfl_display_DisplayObjectContainer;
openfl_display_Loader.prototype = $extend(openfl_display_DisplayObjectContainer.prototype,{
	__class__: openfl_display_Loader
});
var openfl_display_Preloader = function(display) {
	lime_app_Preloader.call(this);
	if(display != null) {
		this.display = display;
		openfl_Lib.current.addChild(display);
		if(js_Boot.__instanceof(display,NMEPreloader)) (js_Boot.__cast(display , NMEPreloader)).onInit();
	}
};
$hxClasses["openfl.display.Preloader"] = openfl_display_Preloader;
openfl_display_Preloader.__name__ = true;
openfl_display_Preloader.__super__ = lime_app_Preloader;
openfl_display_Preloader.prototype = $extend(lime_app_Preloader.prototype,{
	load: function(urls,types) {
		var sounds = [];
		var url = null;
		var _g1 = 0;
		var _g = urls.length;
		while(_g1 < _g) {
			var i = _g1++;
			url = urls[i];
			var _g2 = types[i];
			switch(_g2) {
			case "MUSIC":case "SOUND":
				var sound = haxe_io_Path.withoutExtension(url);
				if(!HxOverrides.remove(sounds,sound)) this.total++;
				sounds.push(sound);
				break;
			default:
			}
		}
		var _g3 = 0;
		while(_g3 < sounds.length) {
			var soundName = sounds[_g3];
			++_g3;
			var sound1 = new openfl_media_Sound();
			sound1.addEventListener("complete",$bind(this,this.sound_onComplete));
			sound1.addEventListener("ioError",$bind(this,this.sound_onIOError));
			sound1.load(new openfl_net_URLRequest(soundName + ".ogg"));
		}
		lime_app_Preloader.prototype.load.call(this,urls,types);
	}
	,start: function() {
		if(this.display != null && js_Boot.__instanceof(this.display,NMEPreloader)) {
			this.display.addEventListener("complete",$bind(this,this.display_onComplete));
			(js_Boot.__cast(this.display , NMEPreloader)).onLoaded();
		} else lime_app_Preloader.prototype.start.call(this);
	}
	,update: function(loaded,total) {
		if(this.display != null && js_Boot.__instanceof(this.display,NMEPreloader)) (js_Boot.__cast(this.display , NMEPreloader)).onUpdate(loaded,total);
	}
	,display_onComplete: function(event) {
		this.display.removeEventListener("complete",$bind(this,this.display_onComplete));
		openfl_Lib.current.removeChild(this.display);
		openfl_Lib.current.stage.set_focus(null);
		this.display = null;
		lime_app_Preloader.prototype.start.call(this);
	}
	,sound_onComplete: function(event) {
		this.loaded++;
		this.onProgress.dispatch(this.loaded,this.total);
		if(this.loaded == this.total) this.start();
	}
	,sound_onIOError: function(event) {
		this.loaded++;
		this.onProgress.dispatch(this.loaded,this.total);
		if(this.loaded == this.total) this.start();
	}
	,__class__: openfl_display_Preloader
});
var openfl_display_Shader = function() { };
$hxClasses["openfl.display.Shader"] = openfl_display_Shader;
openfl_display_Shader.__name__ = true;
var openfl_display_Stage = function(window,color) {
	openfl_display_DisplayObjectContainer.call(this);
	this.application = window.application;
	this.window = window;
	if(color == null) {
		this.__transparent = true;
		this.set_color(0);
	} else this.set_color(color);
	this.set_name(null);
	this.__deltaTime = 0;
	this.__displayState = 2;
	this.__mouseX = 0;
	this.__mouseY = 0;
	this.__lastClickTime = 0;
	this.stageWidth = window.__width * window.__scale | 0;
	this.stageHeight = window.__height * window.__scale | 0;
	this.stage = this;
	this.align = 6;
	this.allowsFullScreen = false;
	this.allowsFullScreenInteractive = false;
	this.quality = 1;
	this.scaleMode = 2;
	this.stageFocusRect = true;
	this.__macKeyboard = /AppleWebKit/.test (navigator.userAgent) && /Mobile\/\w+/.test (navigator.userAgent) || /Mac/.test (navigator.platform);
	this.__clearBeforeRender = true;
	this.__stack = [];
	this.__mouseOutStack = [];
	var this1;
	this1 = new openfl_VectorData();
	var this2;
	this2 = new Array(0);
	this1.data = this2;
	this1.length = 0;
	this1.fixed = false;
	this.stage3Ds = this1;
	var this3 = this.stage3Ds;
	var x = new openfl_display_Stage3D();
	if(!this3.fixed) {
		this3.length++;
		if(this3.data.length < this3.length) {
			var data;
			var this4;
			this4 = new Array(this3.data.length + 10);
			data = this4;
			haxe_ds__$Vector_Vector_$Impl_$.blit(this3.data,0,data,0,this3.data.length);
			this3.data = data;
		}
		this3.data[this3.length - 1] = x;
	}
	this3.length;
	if(openfl_Lib.current.stage == null) this.stage.addChild(openfl_Lib.current);
};
$hxClasses["openfl.display.Stage"] = openfl_display_Stage;
openfl_display_Stage.__name__ = true;
openfl_display_Stage.__interfaces__ = [lime_app_IModule];
openfl_display_Stage.__super__ = openfl_display_DisplayObjectContainer;
openfl_display_Stage.prototype = $extend(openfl_display_DisplayObjectContainer.prototype,{
	globalToLocal: function(pos) {
		return pos.clone();
	}
	,onGamepadAxisMove: function(gamepad,axis,value) {
		openfl_ui_GameInput.__onGamepadAxisMove(gamepad,axis,value);
	}
	,onGamepadButtonDown: function(gamepad,button) {
		openfl_ui_GameInput.__onGamepadButtonDown(gamepad,button);
	}
	,onGamepadButtonUp: function(gamepad,button) {
		openfl_ui_GameInput.__onGamepadButtonUp(gamepad,button);
	}
	,onGamepadConnect: function(gamepad) {
		openfl_ui_GameInput.__onGamepadConnect(gamepad);
	}
	,onGamepadDisconnect: function(gamepad) {
		openfl_ui_GameInput.__onGamepadDisconnect(gamepad);
	}
	,onJoystickAxisMove: function(joystick,axis,value) {
	}
	,onJoystickButtonDown: function(joystick,button) {
	}
	,onJoystickButtonUp: function(joystick,button) {
	}
	,onJoystickConnect: function(joystick) {
	}
	,onJoystickDisconnect: function(joystick) {
	}
	,onJoystickHatMove: function(joystick,hat,position) {
	}
	,onJoystickTrackballMove: function(joystick,trackball,value) {
	}
	,onKeyDown: function(window,keyCode,modifier) {
		if(this.window == null || this.window != window) return;
		this.__onKey("keyDown",keyCode,modifier);
	}
	,onKeyUp: function(window,keyCode,modifier) {
		if(this.window == null || this.window != window) return;
		this.__onKey("keyUp",keyCode,modifier);
	}
	,onModuleExit: function(code) {
		if(this.window != null) {
			var event = new openfl_events_Event("deactivate");
			this.__broadcast(event,true);
		}
	}
	,onMouseDown: function(window,x,y,button) {
		if(this.window == null || this.window != window) return;
		var type;
		switch(button) {
		case 1:
			type = "middleMouseDown";
			break;
		case 2:
			type = "rightMouseDown";
			break;
		default:
			type = "mouseDown";
		}
		this.__onMouse(type,x * window.__scale | 0,y * window.__scale | 0,button);
	}
	,onMouseMove: function(window,x,y) {
		if(this.window == null || this.window != window) return;
		this.__onMouse("mouseMove",x * window.__scale | 0,y * window.__scale | 0,0);
	}
	,onMouseMoveRelative: function(window,x,y) {
	}
	,onMouseUp: function(window,x,y,button) {
		if(this.window == null || this.window != window) return;
		var type;
		switch(button) {
		case 1:
			type = "middleMouseUp";
			break;
		case 2:
			type = "rightMouseUp";
			break;
		default:
			type = "mouseUp";
		}
		this.__onMouse(type,x * window.__scale | 0,y * window.__scale | 0,button);
	}
	,onMouseWheel: function(window,deltaX,deltaY) {
		if(this.window == null || this.window != window) return;
		this.__onMouseWheel(deltaX * window.__scale | 0,deltaY * window.__scale | 0);
	}
	,onPreloadComplete: function() {
	}
	,onPreloadProgress: function(loaded,total) {
	}
	,onRenderContextLost: function(renderer) {
	}
	,onRenderContextRestored: function(renderer,context) {
	}
	,onTextEdit: function(window,text,start,length) {
	}
	,onTextInput: function(window,text) {
		if(this.window == null || this.window != window) return;
		var stack = [];
		if(this.__focus == null) this.__getInteractive(stack); else this.__focus.__getInteractive(stack);
		var event = new openfl_events_TextEvent("textInput",true,false,text);
		if(stack.length > 0) {
			stack.reverse();
			this.__fireEvent(event,stack);
		} else this.__broadcast(event,true);
	}
	,onTouchMove: function(touch) {
		this.__onTouch("touchMove",touch);
	}
	,onTouchEnd: function(touch) {
		this.__onTouch("touchEnd",touch);
	}
	,onTouchStart: function(touch) {
		this.__onTouch("touchBegin",touch);
	}
	,onWindowActivate: function(window) {
		if(this.window == null || this.window != window) return;
		var event = new openfl_events_Event("activate");
		this.__broadcast(event,true);
	}
	,onWindowClose: function(window) {
		if(this.window == window) this.window = null;
	}
	,onWindowCreate: function(window) {
		if(this.window == null || this.window != window) return;
		if(window.renderer != null) {
			var _g = window.renderer.context;
			switch(_g[1]) {
			case 0:
				var gl = _g[2];
				break;
			case 1:
				var context = _g[2];
				this.__renderer = new openfl__$internal_renderer_canvas_CanvasRenderer(this.stageWidth,this.stageHeight,context);
				break;
			case 2:
				var element = _g[2];
				break;
			case 4:
				var cairo = _g[2];
				break;
			case 5:
				var ctx = _g[2];
				break;
			default:
			}
		}
	}
	,onWindowDeactivate: function(window) {
		if(this.window == null || this.window != window) return;
		var event = new openfl_events_Event("deactivate");
		this.__broadcast(event,true);
	}
	,onWindowDropFile: function(window,file) {
	}
	,onWindowEnter: function(window) {
	}
	,onWindowFocusIn: function(window) {
		if(this.window == null || this.window != window) return;
		var event = new openfl_events_FocusEvent("focusIn",true,false,null,false,0);
		this.__broadcast(event,true);
	}
	,onWindowFocusOut: function(window) {
		if(this.window == null || this.window != window) return;
		var event = new openfl_events_FocusEvent("focusOut",true,false,null,false,0);
		this.__broadcast(event,true);
	}
	,onWindowFullscreen: function(window) {
		if(this.window == null || this.window != window) return;
		if(this.__displayState == 2) this.__displayState = 1;
	}
	,onWindowLeave: function(window) {
		if(this.window == null || this.window != window) return;
		this.__dispatchEvent(new openfl_events_Event("mouseLeave"));
	}
	,onWindowMinimize: function(window) {
	}
	,onWindowMove: function(window,x,y) {
	}
	,onWindowResize: function(window,width,height) {
		if(this.window == null || this.window != window) return;
		if(this.__displayState != 2 && !window.__fullscreen) this.__displayState = 2;
		this.stageWidth = width * window.__scale | 0;
		this.stageHeight = height * window.__scale | 0;
		if(this.__renderer != null) this.__renderer.resize(this.stageWidth,this.stageHeight);
		var event = new openfl_events_Event("resize");
		this.__broadcast(event,false);
	}
	,onWindowRestore: function(window) {
	}
	,render: function(renderer) {
		if(renderer.window == null || renderer.window != this.window) return;
		if(this.application != null && this.application.windows.length > 0) {
			if(!this.__transformDirty) {
				this.__transformDirty = true;
				openfl_display_DisplayObject.__worldTransformDirty++;
			}
			if(!this.__renderDirty) {
				this.__updateCachedBitmap = true;
				this.__updateFilters = this.get_filters() != null && this.get_filters().length > 0;
				this.__renderDirty = true;
				openfl_display_DisplayObject.__worldRenderDirty++;
			}
		}
		if(this.__rendering) return;
		this.__rendering = true;
		this.__broadcast(new openfl_events_Event("enterFrame"),true);
		if(this.__invalidated) {
			this.__invalidated = false;
			this.__broadcast(new openfl_events_Event("render"),true);
		}
		this.__renderable = true;
		this.__enterFrame(this.__deltaTime);
		this.__deltaTime = 0;
		this.__update(false,true);
		if(this.__renderer != null) {
			{
				var _g = renderer.context;
				switch(_g[1]) {
				case 4:
					var cairo = _g[2];
					(js_Boot.__cast(this.__renderer , openfl__$internal_renderer_cairo_CairoRenderer)).cairo = cairo;
					this.__renderer.renderSession.cairo = cairo;
					break;
				default:
				}
			}
			this.__renderer.render(this);
		}
		this.__rendering = false;
	}
	,update: function(deltaTime) {
		this.__deltaTime = deltaTime;
	}
	,__drag: function(mouse) {
		var parent = this.__dragObject.parent;
		if(parent != null) mouse = parent.globalToLocal(mouse);
		var x = mouse.x + this.__dragOffsetX;
		var y = mouse.y + this.__dragOffsetY;
		if(this.__dragBounds != null) {
			if(x < this.__dragBounds.x) x = this.__dragBounds.x; else if(x > this.__dragBounds.get_right()) x = this.__dragBounds.get_right();
			if(y < this.__dragBounds.y) y = this.__dragBounds.y; else if(y > this.__dragBounds.get_bottom()) y = this.__dragBounds.get_bottom();
		}
		this.__dragObject.set_x(x);
		this.__dragObject.set_y(y);
	}
	,__fireEvent: function(event,stack) {
		var length = stack.length;
		if(length == 0) {
			event.eventPhase = 2;
			event.target.__broadcast(event,false);
		} else {
			event.eventPhase = 1;
			event.target = stack[stack.length - 1];
			var _g1 = 0;
			var _g = length - 1;
			while(_g1 < _g) {
				var i = _g1++;
				stack[i].__broadcast(event,false);
				if(event.__isCanceled) return;
			}
			event.eventPhase = 2;
			event.target.__broadcast(event,false);
			if(event.__isCanceled) return;
			if(event.bubbles) {
				event.eventPhase = 3;
				var i1 = length - 2;
				while(i1 >= 0) {
					stack[i1].__broadcast(event,false);
					if(event.__isCanceled) return;
					i1--;
				}
			}
		}
	}
	,__getInteractive: function(stack) {
		if(stack != null) stack.push(this);
		return true;
	}
	,__onKey: function(type,keyCode,modifier) {
		openfl_events_MouseEvent.__altKey = lime_ui__$KeyModifier_KeyModifier_$Impl_$.get_altKey(modifier);
		openfl_events_MouseEvent.__commandKey = lime_ui__$KeyModifier_KeyModifier_$Impl_$.get_metaKey(modifier);
		openfl_events_MouseEvent.__ctrlKey = lime_ui__$KeyModifier_KeyModifier_$Impl_$.get_ctrlKey(modifier);
		openfl_events_MouseEvent.__shiftKey = lime_ui__$KeyModifier_KeyModifier_$Impl_$.get_shiftKey(modifier);
		var stack = [];
		if(this.__focus == null) this.__getInteractive(stack); else this.__focus.__getInteractive(stack);
		if(stack.length > 0) {
			var keyLocation;
			switch(keyCode) {
			case 1073742048:case 1073742049:case 1073742050:case 1073742051:
				keyLocation = 1;
				break;
			case 1073742052:case 1073742053:case 1073742054:case 1073742055:
				keyLocation = 2;
				break;
			case 1073741908:case 1073741909:case 1073741910:case 1073741911:case 1073741912:case 1073741913:case 1073741914:case 1073741915:case 1073741916:case 1073741917:case 1073741918:case 1073741919:case 1073741920:case 1073741921:case 1073741922:case 1073741923:case 1073742044:
				keyLocation = 3;
				break;
			default:
				keyLocation = 0;
			}
			var keyCode1;
			switch(keyCode) {
			case 8:
				keyCode1 = 8;
				break;
			case 9:
				keyCode1 = 9;
				break;
			case 13:
				keyCode1 = 13;
				break;
			case 27:
				keyCode1 = 27;
				break;
			case 32:
				keyCode1 = 32;
				break;
			case 33:
				keyCode1 = 49;
				break;
			case 34:
				keyCode1 = 222;
				break;
			case 35:
				keyCode1 = 51;
				break;
			case 36:
				keyCode1 = 52;
				break;
			case 37:
				keyCode1 = 53;
				break;
			case 38:
				keyCode1 = 55;
				break;
			case 39:
				keyCode1 = 222;
				break;
			case 40:
				keyCode1 = 57;
				break;
			case 41:
				keyCode1 = 48;
				break;
			case 42:
				keyCode1 = 56;
				break;
			case 44:
				keyCode1 = 188;
				break;
			case 45:
				keyCode1 = 189;
				break;
			case 46:
				keyCode1 = 190;
				break;
			case 47:
				keyCode1 = 191;
				break;
			case 48:
				keyCode1 = 48;
				break;
			case 49:
				keyCode1 = 49;
				break;
			case 50:
				keyCode1 = 50;
				break;
			case 51:
				keyCode1 = 51;
				break;
			case 52:
				keyCode1 = 52;
				break;
			case 53:
				keyCode1 = 53;
				break;
			case 54:
				keyCode1 = 54;
				break;
			case 55:
				keyCode1 = 55;
				break;
			case 56:
				keyCode1 = 56;
				break;
			case 57:
				keyCode1 = 57;
				break;
			case 58:
				keyCode1 = 186;
				break;
			case 59:
				keyCode1 = 186;
				break;
			case 60:
				keyCode1 = 60;
				break;
			case 61:
				keyCode1 = 187;
				break;
			case 62:
				keyCode1 = 190;
				break;
			case 63:
				keyCode1 = 191;
				break;
			case 64:
				keyCode1 = 50;
				break;
			case 91:
				keyCode1 = 219;
				break;
			case 92:
				keyCode1 = 220;
				break;
			case 93:
				keyCode1 = 221;
				break;
			case 94:
				keyCode1 = 54;
				break;
			case 95:
				keyCode1 = 189;
				break;
			case 96:
				keyCode1 = 192;
				break;
			case 97:
				keyCode1 = 65;
				break;
			case 98:
				keyCode1 = 66;
				break;
			case 99:
				keyCode1 = 67;
				break;
			case 100:
				keyCode1 = 68;
				break;
			case 101:
				keyCode1 = 69;
				break;
			case 102:
				keyCode1 = 70;
				break;
			case 103:
				keyCode1 = 71;
				break;
			case 104:
				keyCode1 = 72;
				break;
			case 105:
				keyCode1 = 73;
				break;
			case 106:
				keyCode1 = 74;
				break;
			case 107:
				keyCode1 = 75;
				break;
			case 108:
				keyCode1 = 76;
				break;
			case 109:
				keyCode1 = 77;
				break;
			case 110:
				keyCode1 = 78;
				break;
			case 111:
				keyCode1 = 79;
				break;
			case 112:
				keyCode1 = 80;
				break;
			case 113:
				keyCode1 = 81;
				break;
			case 114:
				keyCode1 = 82;
				break;
			case 115:
				keyCode1 = 83;
				break;
			case 116:
				keyCode1 = 84;
				break;
			case 117:
				keyCode1 = 85;
				break;
			case 118:
				keyCode1 = 86;
				break;
			case 119:
				keyCode1 = 87;
				break;
			case 120:
				keyCode1 = 88;
				break;
			case 121:
				keyCode1 = 89;
				break;
			case 122:
				keyCode1 = 90;
				break;
			case 127:
				keyCode1 = 46;
				break;
			case 1073741881:
				keyCode1 = 20;
				break;
			case 1073741882:
				keyCode1 = 112;
				break;
			case 1073741883:
				keyCode1 = 113;
				break;
			case 1073741884:
				keyCode1 = 114;
				break;
			case 1073741885:
				keyCode1 = 115;
				break;
			case 1073741886:
				keyCode1 = 116;
				break;
			case 1073741887:
				keyCode1 = 117;
				break;
			case 1073741888:
				keyCode1 = 118;
				break;
			case 1073741889:
				keyCode1 = 119;
				break;
			case 1073741890:
				keyCode1 = 120;
				break;
			case 1073741891:
				keyCode1 = 121;
				break;
			case 1073741892:
				keyCode1 = 122;
				break;
			case 1073741893:
				keyCode1 = 123;
				break;
			case 1073741894:
				keyCode1 = 301;
				break;
			case 1073741895:
				keyCode1 = 145;
				break;
			case 1073741896:
				keyCode1 = 19;
				break;
			case 1073741897:
				keyCode1 = 45;
				break;
			case 1073741898:
				keyCode1 = 36;
				break;
			case 1073741899:
				keyCode1 = 33;
				break;
			case 1073741901:
				keyCode1 = 35;
				break;
			case 1073741902:
				keyCode1 = 34;
				break;
			case 1073741903:
				keyCode1 = 39;
				break;
			case 1073741904:
				keyCode1 = 37;
				break;
			case 1073741905:
				keyCode1 = 40;
				break;
			case 1073741906:
				keyCode1 = 38;
				break;
			case 1073741907:
				keyCode1 = 144;
				break;
			case 1073741908:
				keyCode1 = 111;
				break;
			case 1073741909:
				keyCode1 = 106;
				break;
			case 1073741910:
				keyCode1 = 109;
				break;
			case 1073741911:
				keyCode1 = 107;
				break;
			case 1073741912:
				keyCode1 = 108;
				break;
			case 1073741913:
				keyCode1 = 97;
				break;
			case 1073741914:
				keyCode1 = 98;
				break;
			case 1073741915:
				keyCode1 = 99;
				break;
			case 1073741916:
				keyCode1 = 100;
				break;
			case 1073741917:
				keyCode1 = 101;
				break;
			case 1073741918:
				keyCode1 = 102;
				break;
			case 1073741919:
				keyCode1 = 103;
				break;
			case 1073741920:
				keyCode1 = 104;
				break;
			case 1073741921:
				keyCode1 = 105;
				break;
			case 1073741922:
				keyCode1 = 96;
				break;
			case 1073741923:
				keyCode1 = 110;
				break;
			case 1073741925:
				keyCode1 = 302;
				break;
			case 1073741928:
				keyCode1 = 124;
				break;
			case 1073741929:
				keyCode1 = 125;
				break;
			case 1073741930:
				keyCode1 = 126;
				break;
			case 1073741982:
				keyCode1 = 13;
				break;
			case 1073742044:
				keyCode1 = 110;
				break;
			case 1073742048:
				keyCode1 = 17;
				break;
			case 1073742049:
				keyCode1 = 16;
				break;
			case 1073742050:
				keyCode1 = 18;
				break;
			case 1073742051:
				keyCode1 = 15;
				break;
			case 1073742052:
				keyCode1 = 17;
				break;
			case 1073742053:
				keyCode1 = 16;
				break;
			case 1073742054:
				keyCode1 = 18;
				break;
			case 1073742055:
				keyCode1 = 15;
				break;
			default:
				keyCode1 = keyCode;
			}
			var charCode = openfl_ui_Keyboard.__getCharCode(keyCode1,lime_ui__$KeyModifier_KeyModifier_$Impl_$.get_shiftKey(modifier));
			var event = new openfl_events_KeyboardEvent(type,true,false,charCode,keyCode1,keyLocation,this.__macKeyboard?lime_ui__$KeyModifier_KeyModifier_$Impl_$.get_ctrlKey(modifier) || lime_ui__$KeyModifier_KeyModifier_$Impl_$.get_metaKey(modifier):lime_ui__$KeyModifier_KeyModifier_$Impl_$.get_ctrlKey(modifier),lime_ui__$KeyModifier_KeyModifier_$Impl_$.get_altKey(modifier),lime_ui__$KeyModifier_KeyModifier_$Impl_$.get_shiftKey(modifier),lime_ui__$KeyModifier_KeyModifier_$Impl_$.get_ctrlKey(modifier),lime_ui__$KeyModifier_KeyModifier_$Impl_$.get_metaKey(modifier));
			stack.reverse();
			this.__fireEvent(event,stack);
			if(event.__isCanceled) {
				if(type == "keyDown") this.window.onKeyDown.cancel(); else this.window.onKeyUp.cancel();
			}
		}
	}
	,__onMouse: function(type,x,y,button) {
		if(button > 2) return;
		this.__mouseX = x;
		this.__mouseY = y;
		var stack = [];
		var target = null;
		var targetPoint = new openfl_geom_Point(x,y);
		if(this.__hitTest(x,y,true,stack,true,this)) target = stack[stack.length - 1]; else {
			target = this;
			stack = [this];
		}
		if(target == null) target = this;
		var clickType = null;
		switch(type) {
		case "mouseDown":
			if(target.get_tabEnabled()) this.set_focus(target); else this.set_focus(null);
			this.__mouseDownLeft = target;
			break;
		case "middleMouseDown":
			this.__mouseDownMiddle = target;
			break;
		case "rightMouseDown":
			this.__mouseDownRight = target;
			break;
		case "mouseUp":
			if(this.__mouseDownLeft == target) clickType = "click";
			this.__mouseDownLeft = null;
			break;
		case "middleMouseUp":
			if(this.__mouseDownMiddle == target) clickType = "middleClick";
			this.__mouseDownMiddle = null;
			break;
		case "rightMouseUp":
			if(this.__mouseDownRight == target) clickType = "rightClick";
			this.__mouseDownRight = null;
			break;
		default:
		}
		this.__fireEvent(openfl_events_MouseEvent.__create(type,button,this.__mouseX,this.__mouseY,target == this?targetPoint:target.globalToLocal(targetPoint),target),stack);
		if(clickType != null) {
			this.__fireEvent(openfl_events_MouseEvent.__create(clickType,button,this.__mouseX,this.__mouseY,target == this?targetPoint:target.globalToLocal(targetPoint),target),stack);
			if(type == "mouseUp" && (js_Boot.__cast(target , openfl_display_InteractiveObject)).doubleClickEnabled) {
				var currentTime = openfl_Lib.getTimer();
				if(currentTime - this.__lastClickTime < 500) {
					this.__fireEvent(openfl_events_MouseEvent.__create("doubleClick",button,this.__mouseX,this.__mouseY,target == this?targetPoint:target.globalToLocal(targetPoint),target),stack);
					this.__lastClickTime = 0;
				} else this.__lastClickTime = currentTime;
			}
		}
		var cursor = null;
		var _g = 0;
		while(_g < stack.length) {
			var target1 = stack[_g];
			++_g;
			cursor = target1.__getCursor();
			if(cursor != null) {
				lime_ui_Mouse.set_cursor(cursor);
				break;
			}
		}
		if(cursor == null) lime_ui_Mouse.set_cursor(lime_ui_MouseCursor.ARROW);
		var event;
		var localPoint;
		var _g1 = 0;
		var _g11 = this.__mouseOutStack;
		while(_g1 < _g11.length) {
			var target2 = _g11[_g1];
			++_g1;
			if(HxOverrides.indexOf(stack,target2,0) == -1) {
				HxOverrides.remove(this.__mouseOutStack,target2);
				localPoint = target2.globalToLocal(targetPoint);
				event = openfl_events_MouseEvent.__create("mouseOut",button,this.__mouseX,this.__mouseY,localPoint,target2);
				event.bubbles = false;
				target2.__dispatchEvent(event);
			}
		}
		var _g2 = 0;
		while(_g2 < stack.length) {
			var target3 = stack[_g2];
			++_g2;
			if(HxOverrides.indexOf(this.__mouseOutStack,target3,0) == -1) {
				if(target3.hasEventListener("mouseOver")) {
					localPoint = target3.globalToLocal(targetPoint);
					event = openfl_events_MouseEvent.__create("mouseOver",button,this.__mouseX,this.__mouseY,localPoint,target3);
					event.bubbles = false;
					target3.__dispatchEvent(event);
				}
				if(target3.hasEventListener("mouseOut")) this.__mouseOutStack.push(target3);
			}
		}
		if(this.__dragObject != null) this.__drag(targetPoint);
	}
	,__onMouseWheel: function(deltaX,deltaY) {
		var x = this.__mouseX;
		var y = this.__mouseY;
		var stack = [];
		if(!this.__hitTest(x,y,false,stack,true,this)) stack = [this];
		var target = stack[stack.length - 1];
		var targetPoint = new openfl_geom_Point(x,y);
		var delta = deltaY | 0;
		this.__fireEvent(openfl_events_MouseEvent.__create("mouseWheel",0,this.__mouseX,this.__mouseY,target == this?targetPoint:target.globalToLocal(targetPoint),target,delta),stack);
	}
	,__onTouch: function(type,touch) {
		var point = new openfl_geom_Point(touch.x * this.stageWidth,touch.y * this.stageHeight);
		this.__mouseX = point.x;
		this.__mouseY = point.y;
		var __stack = [];
		if(this.__hitTest(this.__mouseX,this.__mouseY,false,__stack,true,this)) {
			var target = __stack[__stack.length - 1];
			if(target == null) target = this;
			var localPoint = target.globalToLocal(point);
			var touchEvent = openfl_events_TouchEvent.__create(type,null,this.__mouseX,this.__mouseY,localPoint,target);
			touchEvent.touchPointID = touch.id;
			touchEvent.isPrimaryTouchPoint = true;
			this.__fireEvent(touchEvent,__stack);
		} else {
			var touchEvent1 = openfl_events_TouchEvent.__create(type,null,this.__mouseX,this.__mouseY,point,this);
			touchEvent1.touchPointID = touch.id;
			touchEvent1.isPrimaryTouchPoint = true;
			this.__fireEvent(touchEvent1,[this.stage]);
		}
	}
	,__update: function(transformOnly,updateChildren,maskGrahpics) {
		if(transformOnly) {
			if(openfl_display_DisplayObject.__worldTransformDirty > 0) {
				openfl_display_DisplayObjectContainer.prototype.__update.call(this,true,updateChildren,maskGrahpics);
				if(updateChildren) {
					openfl_display_DisplayObject.__worldTransformDirty = 0;
					this.__dirty = true;
				}
			}
		} else if(openfl_display_DisplayObject.__worldTransformDirty > 0 || this.__dirty || openfl_display_DisplayObject.__worldRenderDirty > 0) {
			openfl_display_DisplayObjectContainer.prototype.__update.call(this,false,updateChildren,maskGrahpics);
			if(updateChildren) {
				openfl_display_DisplayObject.__worldTransformDirty = 0;
				openfl_display_DisplayObject.__worldRenderDirty = 0;
				this.__dirty = false;
			}
		}
	}
	,get_mouseX: function() {
		return this.__mouseX;
	}
	,get_mouseY: function() {
		return this.__mouseY;
	}
	,set_color: function(value) {
		var r = (value & 16711680) >>> 16;
		var g = (value & 65280) >>> 8;
		var b = value & 255;
		this.__colorSplit = [r / 255,g / 255,b / 255];
		this.__colorString = "#" + StringTools.hex(value,6);
		return this.__color = value;
	}
	,get_focus: function() {
		return this.__focus;
	}
	,set_focus: function(value) {
		if(value != this.__focus) {
			var oldFocus = this.__focus;
			this.__focus = value;
			if(oldFocus != null) {
				var event = new openfl_events_FocusEvent("focusOut",true,false,this.__focus,false,0);
				this.__stack = [];
				oldFocus.__getInteractive(this.__stack);
				this.__stack.reverse();
				this.__fireEvent(event,this.__stack);
			}
			if(this.__focus != null) {
				var event1 = new openfl_events_FocusEvent("focusIn",true,false,oldFocus,false,0);
				this.__stack = [];
				value.__getInteractive(this.__stack);
				this.__stack.reverse();
				this.__fireEvent(event1,this.__stack);
			}
		}
		return this.__focus;
	}
	,__class__: openfl_display_Stage
});
var openfl_display_Stage3D = function() {
	openfl_events_EventDispatcher.call(this);
};
$hxClasses["openfl.display.Stage3D"] = openfl_display_Stage3D;
openfl_display_Stage3D.__name__ = true;
openfl_display_Stage3D.__super__ = openfl_events_EventDispatcher;
openfl_display_Stage3D.prototype = $extend(openfl_events_EventDispatcher.prototype,{
	__class__: openfl_display_Stage3D
});
var openfl_display_Tilesheet = function(image) {
	this.__bitmap = image;
	this.__centerPoints = [];
	this.__tileRects = [];
	this.__tileUVs = [];
	this.__rectTile = new openfl_geom_Rectangle();
	this.__rectUV = new openfl_geom_Rectangle();
	this.__point = new openfl_geom_Point();
};
$hxClasses["openfl.display.Tilesheet"] = openfl_display_Tilesheet;
openfl_display_Tilesheet.__name__ = true;
openfl_display_Tilesheet.prototype = {
	addTileRect: function(rectangle,centerPoint) {
		this.__tileRects.push(rectangle);
		if(centerPoint == null) centerPoint = openfl_display_Tilesheet.__defaultPoint;
		this.__centerPoints.push(centerPoint);
		this.__tileUVs.push(new openfl_geom_Rectangle(rectangle.get_left() / this.__bitmap.width,rectangle.get_top() / this.__bitmap.height,rectangle.get_right() / this.__bitmap.width,rectangle.get_bottom() / this.__bitmap.height));
		return this.__tileRects.length - 1;
	}
	,drawTiles: function(graphics,tileData,smooth,flags,count) {
		if(count == null) count = -1;
		if(flags == null) flags = 0;
		if(smooth == null) smooth = false;
		graphics.drawTiles(this,tileData,smooth,flags,null,count);
	}
	,__class__: openfl_display_Tilesheet
};
var openfl_display_Window = function(config) {
	lime_ui_Window.call(this,config);
};
$hxClasses["openfl.display.Window"] = openfl_display_Window;
openfl_display_Window.__name__ = true;
openfl_display_Window.__super__ = lime_ui_Window;
openfl_display_Window.prototype = $extend(lime_ui_Window.prototype,{
	create: function(application) {
		lime_ui_Window.prototype.create.call(this,application);
		this.stage = new openfl_display_Stage(this,Object.prototype.hasOwnProperty.call(this.config,"background")?this.config.background:16777215);
		application.addModule(this.stage);
	}
	,__class__: openfl_display_Window
});
var openfl_events_Event = function(type,bubbles,cancelable) {
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = false;
	this.type = type;
	this.bubbles = bubbles;
	this.cancelable = cancelable;
	this.eventPhase = 2;
};
$hxClasses["openfl.events.Event"] = openfl_events_Event;
openfl_events_Event.__name__ = true;
openfl_events_Event.prototype = {
	__class__: openfl_events_Event
};
var openfl_events_ActivityEvent = function(type,bubbles,cancelable,activating) {
	if(activating == null) activating = false;
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = false;
	openfl_events_Event.call(this,type,bubbles,cancelable);
	this.activating = activating;
};
$hxClasses["openfl.events.ActivityEvent"] = openfl_events_ActivityEvent;
openfl_events_ActivityEvent.__name__ = true;
openfl_events_ActivityEvent.__super__ = openfl_events_Event;
openfl_events_ActivityEvent.prototype = $extend(openfl_events_Event.prototype,{
	__class__: openfl_events_ActivityEvent
});
var openfl_events_TextEvent = function(type,bubbles,cancelable,text) {
	if(text == null) text = "";
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = false;
	openfl_events_Event.call(this,type,bubbles,cancelable);
	this.text = text;
};
$hxClasses["openfl.events.TextEvent"] = openfl_events_TextEvent;
openfl_events_TextEvent.__name__ = true;
openfl_events_TextEvent.__super__ = openfl_events_Event;
openfl_events_TextEvent.prototype = $extend(openfl_events_Event.prototype,{
	__class__: openfl_events_TextEvent
});
var openfl_events_ErrorEvent = function(type,bubbles,cancelable,text,id) {
	if(id == null) id = 0;
	if(text == null) text = "";
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = false;
	openfl_events_TextEvent.call(this,type,bubbles,cancelable,text);
	this.errorID = id;
};
$hxClasses["openfl.events.ErrorEvent"] = openfl_events_ErrorEvent;
openfl_events_ErrorEvent.__name__ = true;
openfl_events_ErrorEvent.__super__ = openfl_events_TextEvent;
openfl_events_ErrorEvent.prototype = $extend(openfl_events_TextEvent.prototype,{
	__class__: openfl_events_ErrorEvent
});
var openfl_events__$EventDispatcher_Listener = function(callback,useCapture,priority) {
	this.callback = callback;
	this.useCapture = useCapture;
	this.priority = priority;
};
$hxClasses["openfl.events._EventDispatcher.Listener"] = openfl_events__$EventDispatcher_Listener;
openfl_events__$EventDispatcher_Listener.__name__ = true;
openfl_events__$EventDispatcher_Listener.prototype = {
	match: function(callback,useCapture) {
		return Reflect.compareMethods(this.callback,callback) && this.useCapture == useCapture;
	}
	,__class__: openfl_events__$EventDispatcher_Listener
};
var openfl_events_FocusEvent = function(type,bubbles,cancelable,relatedObject,shiftKey,keyCode) {
	if(keyCode == null) keyCode = 0;
	if(shiftKey == null) shiftKey = false;
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = false;
	openfl_events_Event.call(this,type,bubbles,cancelable);
	this.keyCode = keyCode;
	this.shiftKey = shiftKey;
	this.relatedObject = relatedObject;
};
$hxClasses["openfl.events.FocusEvent"] = openfl_events_FocusEvent;
openfl_events_FocusEvent.__name__ = true;
openfl_events_FocusEvent.__super__ = openfl_events_Event;
openfl_events_FocusEvent.prototype = $extend(openfl_events_Event.prototype,{
	__class__: openfl_events_FocusEvent
});
var openfl_events_FullScreenEvent = function(type,bubbles,cancelable,fullScreen,interactive) {
	if(interactive == null) interactive = false;
	if(fullScreen == null) fullScreen = false;
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = false;
	openfl_events_ActivityEvent.call(this,type,bubbles,cancelable);
	this.fullScreen = fullScreen;
	this.interactive = interactive;
};
$hxClasses["openfl.events.FullScreenEvent"] = openfl_events_FullScreenEvent;
openfl_events_FullScreenEvent.__name__ = true;
openfl_events_FullScreenEvent.__super__ = openfl_events_ActivityEvent;
openfl_events_FullScreenEvent.prototype = $extend(openfl_events_ActivityEvent.prototype,{
	__class__: openfl_events_FullScreenEvent
});
var openfl_events_GameInputEvent = function(type,bubbles,cancelable,device) {
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = true;
	openfl_events_Event.call(this,type,bubbles,cancelable);
	this.device = device;
};
$hxClasses["openfl.events.GameInputEvent"] = openfl_events_GameInputEvent;
openfl_events_GameInputEvent.__name__ = true;
openfl_events_GameInputEvent.__super__ = openfl_events_Event;
openfl_events_GameInputEvent.prototype = $extend(openfl_events_Event.prototype,{
	__class__: openfl_events_GameInputEvent
});
var openfl_events_IOErrorEvent = function(type,bubbles,cancelable,text,id) {
	if(id == null) id = 0;
	if(text == null) text = "";
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = true;
	openfl_events_ErrorEvent.call(this,type,bubbles,cancelable,text,id);
};
$hxClasses["openfl.events.IOErrorEvent"] = openfl_events_IOErrorEvent;
openfl_events_IOErrorEvent.__name__ = true;
openfl_events_IOErrorEvent.__super__ = openfl_events_ErrorEvent;
openfl_events_IOErrorEvent.prototype = $extend(openfl_events_ErrorEvent.prototype,{
	__class__: openfl_events_IOErrorEvent
});
var openfl_events_KeyboardEvent = function(type,bubbles,cancelable,charCodeValue,keyCodeValue,keyLocationValue,ctrlKeyValue,altKeyValue,shiftKeyValue,controlKeyValue,commandKeyValue) {
	if(commandKeyValue == null) commandKeyValue = false;
	if(controlKeyValue == null) controlKeyValue = false;
	if(shiftKeyValue == null) shiftKeyValue = false;
	if(altKeyValue == null) altKeyValue = false;
	if(ctrlKeyValue == null) ctrlKeyValue = false;
	if(keyCodeValue == null) keyCodeValue = 0;
	if(charCodeValue == null) charCodeValue = 0;
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = false;
	openfl_events_Event.call(this,type,bubbles,cancelable);
	this.charCode = charCodeValue;
	this.keyCode = keyCodeValue;
	if(keyLocationValue != null) this.keyLocation = keyLocationValue; else this.keyLocation = 0;
	this.ctrlKey = ctrlKeyValue;
	this.altKey = altKeyValue;
	this.shiftKey = shiftKeyValue;
	this.controlKey = controlKeyValue;
	this.commandKey = commandKeyValue;
};
$hxClasses["openfl.events.KeyboardEvent"] = openfl_events_KeyboardEvent;
openfl_events_KeyboardEvent.__name__ = true;
openfl_events_KeyboardEvent.__super__ = openfl_events_Event;
openfl_events_KeyboardEvent.prototype = $extend(openfl_events_Event.prototype,{
	__class__: openfl_events_KeyboardEvent
});
var openfl_events_MouseEvent = function(type,bubbles,cancelable,localX,localY,relatedObject,ctrlKey,altKey,shiftKey,buttonDown,delta,commandKey,clickCount) {
	if(clickCount == null) clickCount = 0;
	if(commandKey == null) commandKey = false;
	if(delta == null) delta = 0;
	if(buttonDown == null) buttonDown = false;
	if(shiftKey == null) shiftKey = false;
	if(altKey == null) altKey = false;
	if(ctrlKey == null) ctrlKey = false;
	if(localY == null) localY = 0;
	if(localX == null) localX = 0;
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = true;
	openfl_events_Event.call(this,type,bubbles,cancelable);
	this.shiftKey = shiftKey;
	this.altKey = altKey;
	this.ctrlKey = ctrlKey;
	this.bubbles = bubbles;
	this.relatedObject = relatedObject;
	this.delta = delta;
	this.localX = localX;
	this.localY = localY;
	this.buttonDown = buttonDown;
	this.commandKey = commandKey;
	this.clickCount = clickCount;
};
$hxClasses["openfl.events.MouseEvent"] = openfl_events_MouseEvent;
openfl_events_MouseEvent.__name__ = true;
openfl_events_MouseEvent.__altKey = null;
openfl_events_MouseEvent.__buttonDown = null;
openfl_events_MouseEvent.__commandKey = null;
openfl_events_MouseEvent.__ctrlKey = null;
openfl_events_MouseEvent.__shiftKey = null;
openfl_events_MouseEvent.__create = function(type,button,stageX,stageY,local,target,delta) {
	if(delta == null) delta = 0;
	switch(type) {
	case "mouseDown":
		openfl_events_MouseEvent.__buttonDown = true;
		break;
	case "mouseUp":
		openfl_events_MouseEvent.__buttonDown = false;
		break;
	default:
	}
	var event = new openfl_events_MouseEvent(type,true,false,local.x,local.y,null,openfl_events_MouseEvent.__ctrlKey,openfl_events_MouseEvent.__altKey,openfl_events_MouseEvent.__shiftKey,openfl_events_MouseEvent.__buttonDown,delta,openfl_events_MouseEvent.__commandKey);
	event.stageX = stageX;
	event.stageY = stageY;
	event.target = target;
	return event;
};
openfl_events_MouseEvent.__super__ = openfl_events_Event;
openfl_events_MouseEvent.prototype = $extend(openfl_events_Event.prototype,{
	__class__: openfl_events_MouseEvent
});
var openfl_events_TouchEvent = function(type,bubbles,cancelable,touchPointID,isPrimaryTouchPoint,localX,localY,sizeX,sizeY,pressure,relatedObject,ctrlKey,altKey,shiftKey,commandKey,controlKey,timestamp,touchIntent,samples,isTouchPointCanceled) {
	if(isTouchPointCanceled == null) isTouchPointCanceled = false;
	if(timestamp == null) timestamp = 0;
	if(controlKey == null) controlKey = false;
	if(commandKey == null) commandKey = false;
	if(shiftKey == null) shiftKey = false;
	if(altKey == null) altKey = false;
	if(ctrlKey == null) ctrlKey = false;
	if(pressure == null) pressure = 0;
	if(sizeY == null) sizeY = 0;
	if(sizeX == null) sizeX = 0;
	if(localY == null) localY = 0;
	if(localX == null) localX = 0;
	if(isPrimaryTouchPoint == null) isPrimaryTouchPoint = false;
	if(touchPointID == null) touchPointID = 0;
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = true;
	openfl_events_Event.call(this,type,bubbles,cancelable);
	this.touchPointID = touchPointID;
	this.isPrimaryTouchPoint = isPrimaryTouchPoint;
	this.localX = localX;
	this.localY = localY;
	this.sizeX = sizeX;
	this.sizeY = sizeY;
	this.pressure = pressure;
	this.relatedObject = relatedObject;
	this.ctrlKey = ctrlKey;
	this.altKey = altKey;
	this.shiftKey = shiftKey;
	this.commandKey = commandKey;
	this.controlKey = controlKey;
};
$hxClasses["openfl.events.TouchEvent"] = openfl_events_TouchEvent;
openfl_events_TouchEvent.__name__ = true;
openfl_events_TouchEvent.__create = function(type,touch,stageX,stageY,local,target) {
	var evt = new openfl_events_TouchEvent(type,true,false,0,true,local.x,local.y,1,1,1);
	evt.stageX = stageX;
	evt.stageY = stageY;
	evt.target = target;
	return evt;
};
openfl_events_TouchEvent.__super__ = openfl_events_Event;
openfl_events_TouchEvent.prototype = $extend(openfl_events_Event.prototype,{
	__class__: openfl_events_TouchEvent
});
var openfl_filters_BitmapFilter = function() { };
$hxClasses["openfl.filters.BitmapFilter"] = openfl_filters_BitmapFilter;
openfl_filters_BitmapFilter.__name__ = true;
openfl_filters_BitmapFilter.__expandBounds = function(filters,rect,matrix) {
	var r = openfl_geom_Rectangle.__temp;
	r.setEmpty();
	var _g = 0;
	while(_g < filters.length) {
		var filter = filters[_g];
		++_g;
		filter.__growBounds(r);
	}
	r.__transform(r,matrix);
	rect.__expand(r.x,r.y,r.width,r.height);
};
openfl_filters_BitmapFilter.prototype = {
	__growBounds: function(rect) {
	}
	,__class__: openfl_filters_BitmapFilter
};
var openfl_geom_Matrix3D = function() { };
$hxClasses["openfl.geom.Matrix3D"] = openfl_geom_Matrix3D;
openfl_geom_Matrix3D.__name__ = true;
openfl_geom_Matrix3D.prototype = {
	__class__: openfl_geom_Matrix3D
};
var openfl_geom_Transform = function(displayObject) {
	this.__colorTransform = new openfl_geom_ColorTransform();
	this.concatenatedColorTransform = new openfl_geom_ColorTransform();
	this.pixelBounds = new openfl_geom_Rectangle();
	this.__displayObject = displayObject;
	this.__hasMatrix = true;
};
$hxClasses["openfl.geom.Transform"] = openfl_geom_Transform;
openfl_geom_Transform.__name__ = true;
openfl_geom_Transform.prototype = {
	get_colorTransform: function() {
		return this.__colorTransform;
	}
	,__class__: openfl_geom_Transform
};
var openfl_geom_Vector3D = function() { };
$hxClasses["openfl.geom.Vector3D"] = openfl_geom_Vector3D;
openfl_geom_Vector3D.__name__ = true;
var openfl_media_ID3Info = function() { };
$hxClasses["openfl.media.ID3Info"] = openfl_media_ID3Info;
openfl_media_ID3Info.__name__ = true;
var openfl_media_Sound = function(stream,context) {
	openfl_events_EventDispatcher.call(this,this);
	this.bytesLoaded = 0;
	this.bytesTotal = 0;
	this.id3 = null;
	this.isBuffering = false;
	this.url = null;
	if(stream != null) this.load(stream,context);
};
$hxClasses["openfl.media.Sound"] = openfl_media_Sound;
openfl_media_Sound.__name__ = true;
openfl_media_Sound.__super__ = openfl_events_EventDispatcher;
openfl_media_Sound.prototype = $extend(openfl_events_EventDispatcher.prototype,{
	load: function(stream,context) {
		this.url = stream.url;
		this.__soundID = haxe_io_Path.withoutExtension(stream.url);
		if(!openfl_media_Sound.__registeredSounds.exists(this.__soundID)) {
			openfl_media_Sound.__registeredSounds.set(this.__soundID,true);
			createjs.Sound.addEventListener("fileload",$bind(this,this.SoundJS_onFileLoad));
			createjs.Sound.addEventListener("fileerror",$bind(this,this.SoundJS_onFileError));
			createjs.Sound.registerSound(this.url,this.__soundID);
		} else this.dispatchEvent(new openfl_events_Event("complete"));
	}
	,SoundJS_onFileLoad: function(event) {
		if(event.id == this.__soundID) {
			createjs.Sound.removeEventListener("fileload",$bind(this,this.SoundJS_onFileLoad));
			createjs.Sound.removeEventListener("fileerror",$bind(this,this.SoundJS_onFileError));
			this.dispatchEvent(new openfl_events_Event("complete"));
		}
	}
	,SoundJS_onFileError: function(event) {
		if(event.id == this.__soundID) {
			createjs.Sound.removeEventListener("fileload",$bind(this,this.SoundJS_onFileLoad));
			createjs.Sound.removeEventListener("fileerror",$bind(this,this.SoundJS_onFileError));
			this.dispatchEvent(new openfl_events_IOErrorEvent("ioError"));
		}
	}
	,__class__: openfl_media_Sound
});
var openfl_media_SoundChannel = function(soundInstance) {
	openfl_events_EventDispatcher.call(this,this);
	this.leftPeak = 1;
	this.rightPeak = 1;
	if(soundInstance != null) {
		this.__soundInstance = soundInstance;
		this.__soundInstance.addEventListener("complete",$bind(this,this.source_onComplete));
		this.__isValid = true;
	}
};
$hxClasses["openfl.media.SoundChannel"] = openfl_media_SoundChannel;
openfl_media_SoundChannel.__name__ = true;
openfl_media_SoundChannel.__super__ = openfl_events_EventDispatcher;
openfl_media_SoundChannel.prototype = $extend(openfl_events_EventDispatcher.prototype,{
	stop: function() {
		if(!this.__isValid) return;
		this.__soundInstance.stop();
	}
	,__dispose: function() {
		if(!this.__isValid) return;
		this.__soundInstance.stop();
		this.__soundInstance = null;
		this.__isValid = false;
	}
	,get_position: function() {
		if(!this.__isValid) return 0;
		return this.__soundInstance.getPosition();
	}
	,set_position: function(value) {
		if(!this.__isValid) return 0;
		this.__soundInstance.setPosition(value | 0);
		return this.__soundInstance.getPosition();
	}
	,get_soundTransform: function() {
		if(!this.__isValid) return new openfl_media_SoundTransform();
		return new openfl_media_SoundTransform(this.__soundInstance.getVolume(),this.__soundInstance.getPan());
	}
	,set_soundTransform: function(value) {
		if(!this.__isValid) return value;
		this.__soundInstance.setVolume(value.volume);
		this.__soundInstance.setPan(value.pan);
		return value;
	}
	,soundInstance_onComplete: function(_) {
		this.dispatchEvent(new openfl_events_Event("soundComplete"));
	}
	,source_onComplete: function() {
		this.__dispose();
		this.dispatchEvent(new openfl_events_Event("soundComplete"));
	}
	,__class__: openfl_media_SoundChannel
});
var openfl_media_SoundLoaderContext = function() { };
$hxClasses["openfl.media.SoundLoaderContext"] = openfl_media_SoundLoaderContext;
openfl_media_SoundLoaderContext.__name__ = true;
var openfl_media_SoundTransform = function(vol,panning) {
	if(panning == null) panning = 0;
	if(vol == null) vol = 1;
	this.volume = vol;
	this.pan = panning;
	this.leftToLeft = 0;
	this.leftToRight = 0;
	this.rightToLeft = 0;
	this.rightToRight = 0;
};
$hxClasses["openfl.media.SoundTransform"] = openfl_media_SoundTransform;
openfl_media_SoundTransform.__name__ = true;
openfl_media_SoundTransform.prototype = {
	__class__: openfl_media_SoundTransform
};
var openfl_net_URLRequest = function(inURL) {
	if(inURL != null) this.url = inURL;
	this.requestHeaders = [];
	this.method = openfl_net__$URLRequestMethod_URLRequestMethod_$Impl_$.toString(1);
	this.contentType = null;
};
$hxClasses["openfl.net.URLRequest"] = openfl_net_URLRequest;
openfl_net_URLRequest.__name__ = true;
openfl_net_URLRequest.prototype = {
	__class__: openfl_net_URLRequest
};
var openfl_net_URLRequestHeader = function() { };
$hxClasses["openfl.net.URLRequestHeader"] = openfl_net_URLRequestHeader;
openfl_net_URLRequestHeader.__name__ = true;
var openfl_net__$URLRequestMethod_URLRequestMethod_$Impl_$ = {};
$hxClasses["openfl.net._URLRequestMethod.URLRequestMethod_Impl_"] = openfl_net__$URLRequestMethod_URLRequestMethod_$Impl_$;
openfl_net__$URLRequestMethod_URLRequestMethod_$Impl_$.__name__ = true;
openfl_net__$URLRequestMethod_URLRequestMethod_$Impl_$.toString = function(value) {
	switch(value) {
	case 0:
		return "DELETE";
	case 1:
		return "GET";
	case 2:
		return "HEAD";
	case 3:
		return "OPTIONS";
	case 4:
		return "POST";
	case 5:
		return "PUT";
	default:
		return null;
	}
};
var openfl_text_Font = function() { };
$hxClasses["openfl.text.Font"] = openfl_text_Font;
openfl_text_Font.__name__ = true;
openfl_text_Font.__super__ = lime_text_Font;
openfl_text_Font.prototype = $extend(lime_text_Font.prototype,{
	__class__: openfl_text_Font
});
var openfl_text_TextFormat = function(font,size,color,bold,italic,underline,url,target,align,leftMargin,rightMargin,indent,leading) {
	this.font = font;
	this.size = size;
	this.color = color;
	this.bold = bold;
	this.italic = italic;
	this.underline = underline;
	this.url = url;
	this.target = target;
	this.align = align;
	this.leftMargin = leftMargin;
	this.rightMargin = rightMargin;
	this.indent = indent;
	this.leading = leading;
};
$hxClasses["openfl.text.TextFormat"] = openfl_text_TextFormat;
openfl_text_TextFormat.__name__ = true;
openfl_text_TextFormat.prototype = {
	clone: function() {
		var newFormat = new openfl_text_TextFormat(this.font,this.size,this.color,this.bold,this.italic,this.underline,this.url,this.target);
		newFormat.align = this.align;
		newFormat.leftMargin = this.leftMargin;
		newFormat.rightMargin = this.rightMargin;
		newFormat.indent = this.indent;
		newFormat.leading = this.leading;
		newFormat.blockIndent = this.blockIndent;
		newFormat.bullet = this.bullet;
		newFormat.kerning = this.kerning;
		newFormat.letterSpacing = this.letterSpacing;
		newFormat.tabStops = this.tabStops;
		return newFormat;
	}
	,__merge: function(format) {
		if(format.font != null) this.font = format.font;
		if(format.size != null) this.size = format.size;
		if(format.color != null) this.color = format.color;
		if(format.bold != null) this.bold = format.bold;
		if(format.italic != null) this.italic = format.italic;
		if(format.underline != null) this.underline = format.underline;
		if(format.url != null) this.url = format.url;
		if(format.target != null) this.target = format.target;
		if(format.align != null) this.align = format.align;
		if(format.leftMargin != null) this.leftMargin = format.leftMargin;
		if(format.rightMargin != null) this.rightMargin = format.rightMargin;
		if(format.indent != null) this.indent = format.indent;
		if(format.leading != null) this.leading = format.leading;
		if(format.blockIndent != null) this.blockIndent = format.blockIndent;
		if(format.bullet != null) this.bullet = format.bullet;
		if(format.kerning != null) this.kerning = format.kerning;
		if(format.letterSpacing != null) this.letterSpacing = format.letterSpacing;
		if(format.tabStops != null) this.tabStops = format.tabStops;
	}
	,__class__: openfl_text_TextFormat
};
var openfl_ui_GameInput = function() { };
$hxClasses["openfl.ui.GameInput"] = openfl_ui_GameInput;
openfl_ui_GameInput.__name__ = true;
openfl_ui_GameInput.__getDevice = function(gamepad) {
	if(gamepad == null) return null;
	if(!(openfl_ui_GameInput.__devices.h.__keys__[gamepad.__id__] != null)) {
		var device = new openfl_ui_GameInputDevice(gamepad.get_guid(),gamepad.get_name());
		openfl_ui_GameInput.__deviceList.push(device);
		openfl_ui_GameInput.__devices.set(gamepad,device);
		openfl_ui_GameInput.numDevices = openfl_ui_GameInput.__deviceList.length;
	}
	return openfl_ui_GameInput.__devices.h[gamepad.__id__];
};
openfl_ui_GameInput.__onGamepadAxisMove = function(gamepad,axis,value) {
	var device = openfl_ui_GameInput.__getDevice(gamepad);
	if(device == null) return;
	if(device.enabled) {
		if(!device.__axis.h.hasOwnProperty(axis)) {
			var control1 = new openfl_ui_GameInputControl(device,"AXIS_" + (function($this) {
				var $r;
				switch(axis) {
				case 0:
					$r = "LEFT_X";
					break;
				case 1:
					$r = "LEFT_Y";
					break;
				case 2:
					$r = "RIGHT_X";
					break;
				case 3:
					$r = "RIGHT_Y";
					break;
				case 4:
					$r = "TRIGGER_LEFT";
					break;
				case 5:
					$r = "TRIGGER_RIGHT";
					break;
				default:
					$r = "UNKNOWN (" + axis + ")";
				}
				return $r;
			}(this)),-1,1);
			device.__axis.h[axis] = control1;
			device.__controls.push(control1);
		}
		var control = device.__axis.h[axis];
		control.value = value;
		control.dispatchEvent(new openfl_events_Event("change"));
	}
};
openfl_ui_GameInput.__onGamepadButtonDown = function(gamepad,button) {
	var device = openfl_ui_GameInput.__getDevice(gamepad);
	if(device == null) return;
	if(device.enabled) {
		if(!device.__button.h.hasOwnProperty(button)) {
			var control1 = new openfl_ui_GameInputControl(device,"BUTTON_" + (function($this) {
				var $r;
				switch(button) {
				case 0:
					$r = "A";
					break;
				case 1:
					$r = "B";
					break;
				case 2:
					$r = "X";
					break;
				case 3:
					$r = "Y";
					break;
				case 4:
					$r = "BACK";
					break;
				case 5:
					$r = "GUIDE";
					break;
				case 6:
					$r = "START";
					break;
				case 7:
					$r = "LEFT_STICK";
					break;
				case 8:
					$r = "RIGHT_STICK";
					break;
				case 9:
					$r = "LEFT_SHOULDER";
					break;
				case 10:
					$r = "RIGHT_SHOULDER";
					break;
				case 11:
					$r = "DPAD_UP";
					break;
				case 12:
					$r = "DPAD_DOWN";
					break;
				case 13:
					$r = "DPAD_LEFT";
					break;
				case 14:
					$r = "DPAD_RIGHT";
					break;
				default:
					$r = "UNKNOWN (" + button + ")";
				}
				return $r;
			}(this)),0,1);
			device.__button.h[button] = control1;
			device.__controls.push(control1);
		}
		var control = device.__button.h[button];
		control.value = 1;
		control.dispatchEvent(new openfl_events_Event("change"));
	}
};
openfl_ui_GameInput.__onGamepadButtonUp = function(gamepad,button) {
	var device = openfl_ui_GameInput.__getDevice(gamepad);
	if(device == null) return;
	if(device.enabled) {
		if(!device.__button.h.hasOwnProperty(button)) {
			var control1 = new openfl_ui_GameInputControl(device,"BUTTON_" + (function($this) {
				var $r;
				switch(button) {
				case 0:
					$r = "A";
					break;
				case 1:
					$r = "B";
					break;
				case 2:
					$r = "X";
					break;
				case 3:
					$r = "Y";
					break;
				case 4:
					$r = "BACK";
					break;
				case 5:
					$r = "GUIDE";
					break;
				case 6:
					$r = "START";
					break;
				case 7:
					$r = "LEFT_STICK";
					break;
				case 8:
					$r = "RIGHT_STICK";
					break;
				case 9:
					$r = "LEFT_SHOULDER";
					break;
				case 10:
					$r = "RIGHT_SHOULDER";
					break;
				case 11:
					$r = "DPAD_UP";
					break;
				case 12:
					$r = "DPAD_DOWN";
					break;
				case 13:
					$r = "DPAD_LEFT";
					break;
				case 14:
					$r = "DPAD_RIGHT";
					break;
				default:
					$r = "UNKNOWN (" + button + ")";
				}
				return $r;
			}(this)),0,1);
			device.__button.h[button] = control1;
			device.__controls.push(control1);
		}
		var control = device.__button.h[button];
		control.value = 0;
		control.dispatchEvent(new openfl_events_Event("change"));
	}
};
openfl_ui_GameInput.__onGamepadConnect = function(gamepad) {
	var device = openfl_ui_GameInput.__getDevice(gamepad);
	if(device == null) return;
	var _g = 0;
	var _g1 = openfl_ui_GameInput.__instances;
	while(_g < _g1.length) {
		var instance = _g1[_g];
		++_g;
		instance.dispatchEvent(new openfl_events_GameInputEvent("deviceAdded",null,null,device));
	}
};
openfl_ui_GameInput.__onGamepadDisconnect = function(gamepad) {
	var device = openfl_ui_GameInput.__devices.h[gamepad.__id__];
	if(device != null) {
		if(openfl_ui_GameInput.__devices.h.__keys__[gamepad.__id__] != null) {
			var x = openfl_ui_GameInput.__devices.h[gamepad.__id__];
			HxOverrides.remove(openfl_ui_GameInput.__deviceList,x);
			openfl_ui_GameInput.__devices.remove(gamepad);
		}
		openfl_ui_GameInput.numDevices = openfl_ui_GameInput.__deviceList.length;
		var _g = 0;
		var _g1 = openfl_ui_GameInput.__instances;
		while(_g < _g1.length) {
			var instance = _g1[_g];
			++_g;
			instance.dispatchEvent(new openfl_events_GameInputEvent("deviceRemoved",null,null,device));
		}
	}
};
openfl_ui_GameInput.__super__ = openfl_events_EventDispatcher;
openfl_ui_GameInput.prototype = $extend(openfl_events_EventDispatcher.prototype,{
	__class__: openfl_ui_GameInput
});
var openfl_ui_GameInputControl = function(device,id,minValue,maxValue,value) {
	if(value == null) value = 0;
	openfl_events_EventDispatcher.call(this);
	this.device = device;
	this.id = id;
	this.minValue = minValue;
	this.maxValue = maxValue;
	this.value = value;
};
$hxClasses["openfl.ui.GameInputControl"] = openfl_ui_GameInputControl;
openfl_ui_GameInputControl.__name__ = true;
openfl_ui_GameInputControl.__super__ = openfl_events_EventDispatcher;
openfl_ui_GameInputControl.prototype = $extend(openfl_events_EventDispatcher.prototype,{
	__class__: openfl_ui_GameInputControl
});
var openfl_ui_GameInputDevice = function(id,name) {
	this.__controls = [];
	this.__button = new haxe_ds_IntMap();
	this.__axis = new haxe_ds_IntMap();
	this.id = id;
	this.name = name;
	var control;
	var _g = 0;
	while(_g < 6) {
		var i = _g++;
		control = new openfl_ui_GameInputControl(this,"AXIS_" + i,-1,1);
		this.__axis.h[i] = control;
		this.__controls.push(control);
	}
	var _g1 = 0;
	while(_g1 < 15) {
		var i1 = _g1++;
		control = new openfl_ui_GameInputControl(this,"BUTTON_" + i1,0,1);
		this.__button.h[i1] = control;
		this.__controls.push(control);
	}
};
$hxClasses["openfl.ui.GameInputDevice"] = openfl_ui_GameInputDevice;
openfl_ui_GameInputDevice.__name__ = true;
openfl_ui_GameInputDevice.prototype = {
	__class__: openfl_ui_GameInputDevice
};
var openfl_ui_Keyboard = function() { };
$hxClasses["openfl.ui.Keyboard"] = openfl_ui_Keyboard;
openfl_ui_Keyboard.__name__ = true;
openfl_ui_Keyboard.__getCharCode = function(key,shift) {
	if(shift == null) shift = false;
	if(!shift) {
		switch(key) {
		case 8:
			return 8;
		case 9:
			return 9;
		case 13:
			return 13;
		case 27:
			return 27;
		case 32:
			return 32;
		case 186:
			return 59;
		case 187:
			return 61;
		case 188:
			return 44;
		case 189:
			return 45;
		case 190:
			return 46;
		case 191:
			return 47;
		case 192:
			return 96;
		case 219:
			return 91;
		case 220:
			return 92;
		case 221:
			return 93;
		case 222:
			return 39;
		}
		if(key >= 48 && key <= 57) return key - 48 + 48;
		if(key >= 65 && key <= 90) return key - 65 + 97;
	} else {
		switch(key) {
		case 48:
			return 41;
		case 49:
			return 33;
		case 50:
			return 64;
		case 51:
			return 35;
		case 52:
			return 36;
		case 53:
			return 37;
		case 54:
			return 94;
		case 55:
			return 38;
		case 56:
			return 42;
		case 57:
			return 40;
		case 186:
			return 58;
		case 187:
			return 43;
		case 188:
			return 60;
		case 189:
			return 95;
		case 190:
			return 62;
		case 191:
			return 63;
		case 192:
			return 126;
		case 219:
			return 123;
		case 220:
			return 124;
		case 221:
			return 125;
		case 222:
			return 34;
		}
		if(key >= 65 && key <= 90) return key - 65 + 65;
	}
	if(key >= 96 && key <= 105) return key - 96 + 48;
	switch(key) {
	case 106:
		return 42;
	case 107:
		return 43;
	case 108:
		return 44;
	case 110:
		return 45;
	case 111:
		return 46;
	case 46:
		return 127;
	case 13:
		return 13;
	case 8:
		return 8;
	}
	return 0;
};
var openfl_utils_IDataOutput = function() { };
$hxClasses["openfl.utils.IDataOutput"] = openfl_utils_IDataOutput;
openfl_utils_IDataOutput.__name__ = true;
openfl_utils_IDataOutput.prototype = {
	__class__: openfl_utils_IDataOutput
};
var openfl_utils_IDataInput = function() { };
$hxClasses["openfl.utils.IDataInput"] = openfl_utils_IDataInput;
openfl_utils_IDataInput.__name__ = true;
openfl_utils_IDataInput.prototype = {
	__class__: openfl_utils_IDataInput
};
var openfl_utils_ByteArrayData = function() { };
$hxClasses["openfl.utils.ByteArrayData"] = openfl_utils_ByteArrayData;
openfl_utils_ByteArrayData.__name__ = true;
openfl_utils_ByteArrayData.__interfaces__ = [openfl_utils_IDataOutput,openfl_utils_IDataInput];
openfl_utils_ByteArrayData.__super__ = haxe_io_Bytes;
openfl_utils_ByteArrayData.prototype = $extend(haxe_io_Bytes.prototype,{
	__class__: openfl_utils_ByteArrayData
});
var haxe_lang_Iterator = function() { };
$hxClasses["haxe.lang.Iterator"] = haxe_lang_Iterator;
haxe_lang_Iterator.__name__ = true;
haxe_lang_Iterator.prototype = {
	__class__: haxe_lang_Iterator
};
var haxe_lang_Iterable = function() { };
$hxClasses["haxe.lang.Iterable"] = haxe_lang_Iterable;
haxe_lang_Iterable.__name__ = true;
haxe_lang_Iterable.prototype = {
	__class__: haxe_lang_Iterable
};
var ttg_game_GameState = $hxClasses["ttg.game.GameState"] = { __ename__ : true, __constructs__ : ["Playing","Paused"] };
ttg_game_GameState.Playing = ["Playing",0];
ttg_game_GameState.Playing.toString = $estr;
ttg_game_GameState.Playing.__enum__ = ttg_game_GameState;
ttg_game_GameState.Paused = ["Paused",1];
ttg_game_GameState.Paused.toString = $estr;
ttg_game_GameState.Paused.__enum__ = ttg_game_GameState;
var ttg_game_Game = function(m) {
	this.state = ttg_game_GameState.Playing;
	this.main = m;
	this.fps = new openfl_display_FPS(10,10,15658734);
};
$hxClasses["ttg.game.Game"] = ttg_game_Game;
ttg_game_Game.__name__ = true;
ttg_game_Game.prototype = {
	init: function() {
		ttg_game_level_TileBackground.init();
		this.loadLevel(new ttg_game_level_LevelMenu(this.main));
	}
	,update: function() {
		if(this.state == ttg_game_GameState.Playing) this.level.update();
		this.render();
	}
	,render: function() {
		this.level.render();
	}
	,loadLevel: function(l) {
		if(this.level != null) this.level.exit();
		l.load(this);
		this.level = l;
		this.main.addChild(this.fps);
	}
	,__class__: ttg_game_Game
};
var ttg_game_gameobject_GameObject = function(l,x,y) {
	this.x = x;
	this.y = y;
	this.sprite = new openfl_display_Sprite();
	this.level = l;
	l.main.addChild(this.sprite);
	l.addGameObject(this);
};
$hxClasses["ttg.game.gameobject.GameObject"] = ttg_game_gameobject_GameObject;
ttg_game_gameobject_GameObject.__name__ = true;
ttg_game_gameobject_GameObject.prototype = {
	update: function() {
	}
	,render: function() {
		this.sprite.get_graphics().clear();
	}
	,destroy: function() {
		this.level.main.removeChild(this.sprite);
	}
	,__class__: ttg_game_gameobject_GameObject
};
var ttg_game_gameobject_PhysObject = function(l,x,y,col) {
	this.friction = 1;
	ttg_game_gameobject_GameObject.call(this,l,x,y);
	this.velocity = new openfl_geom_Point();
	this.forces = [];
	this.collider = col;
};
$hxClasses["ttg.game.gameobject.PhysObject"] = ttg_game_gameobject_PhysObject;
ttg_game_gameobject_PhysObject.__name__ = true;
ttg_game_gameobject_PhysObject.__super__ = ttg_game_gameobject_GameObject;
ttg_game_gameobject_PhysObject.prototype = $extend(ttg_game_gameobject_GameObject.prototype,{
	update: function() {
		var netForce = new openfl_geom_Point();
		var _g = 0;
		var _g1 = this.forces;
		while(_g < _g1.length) {
			var f = _g1[_g];
			++_g;
			netForce = netForce.add(f);
		}
		this.forces = [];
		this.velocity = this.velocity.add(netForce);
		this.addForce(new openfl_geom_Point(-this.velocity.x * this.friction,-this.velocity.y * this.friction));
		var _g2 = 0;
		var _g11 = this.level.colliders;
		while(_g2 < _g11.length) {
			var col = _g11[_g2];
			++_g2;
			if(this.collider.checkCollision(col,this.velocity)) this.collider.collide(col,this.velocity);
		}
		this.x += this.velocity.x;
		this.y += this.velocity.y;
		ttg_game_gameobject_GameObject.prototype.update.call(this);
	}
	,addForce: function(f) {
		this.forces.push(f);
	}
	,__class__: ttg_game_gameobject_PhysObject
});
var ttg_game_gameobject_PlayerObject = function(l,x,y) {
	this.stepTimer = 0;
	this.step = 30;
	this.state = 0;
	ttg_game_gameobject_PhysObject.call(this,l,x,y,new ttg_game_physics_AABB(x,y,40,40));
	this.image = ttg_game_level_TileBackground.createTilesheet("img/characters/player.png");
};
$hxClasses["ttg.game.gameobject.PlayerObject"] = ttg_game_gameobject_PlayerObject;
ttg_game_gameobject_PlayerObject.__name__ = true;
ttg_game_gameobject_PlayerObject.__super__ = ttg_game_gameobject_PhysObject;
ttg_game_gameobject_PlayerObject.prototype = $extend(ttg_game_gameobject_PhysObject.prototype,{
	update: function() {
		(js_Boot.__cast(this.collider , ttg_game_physics_AABB)).update(this.x,this.y,40,40);
		if(ttg_game_input_Input.isKeyDown(16)) this.speed = ttg_game_gameobject_PlayerObject.runSpeed; else this.speed = ttg_game_gameobject_PlayerObject.walkSpeed;
		this.state = 0;
		if(this.velocity.y > 0) {
			this.step = 45 / (this.velocity.y * this.velocity.y) | 0;
			if(this.stepTimer >= 0 && this.stepTimer < this.step) this.state = 1;
			if(this.stepTimer >= this.step && this.stepTimer < this.step * 2) this.state = 2;
			this.stepTimer++;
			if(this.stepTimer >= this.step * 2) this.stepTimer = 0;
		}
		if(ttg_game_input_Input.isKeyDown(65)) this.addForce(new openfl_geom_Point(-this.speed / 60,0));
		if(ttg_game_input_Input.isKeyDown(87)) this.addForce(new openfl_geom_Point(0,-this.speed / 60));
		if(ttg_game_input_Input.isKeyDown(68)) this.addForce(new openfl_geom_Point(this.speed / 60,0));
		if(ttg_game_input_Input.isKeyDown(83)) this.addForce(new openfl_geom_Point(0,this.speed / 60));
		ttg_game_gameobject_PhysObject.prototype.update.call(this);
	}
	,render: function() {
		ttg_game_gameobject_PhysObject.prototype.render.call(this);
		this.image.drawTiles(this.sprite.get_graphics(),[this.x,this.y,this.state]);
	}
	,__class__: ttg_game_gameobject_PlayerObject
});
var ttg_game_gameobject_TestObject = function(l,x,y) {
	this.speed = 5;
	ttg_game_gameobject_GameObject.call(this,l,x,y);
	this.width = 100;
	this.height = 100;
	this.velocity = new openfl_geom_Point();
	this.hitBox = new ttg_game_physics_AABB(x - this.width / 2,y - this.height / 2,this.width,this.height);
	l.addCollider(this.hitBox);
};
$hxClasses["ttg.game.gameobject.TestObject"] = ttg_game_gameobject_TestObject;
ttg_game_gameobject_TestObject.__name__ = true;
ttg_game_gameobject_TestObject.__super__ = ttg_game_gameobject_GameObject;
ttg_game_gameobject_TestObject.prototype = $extend(ttg_game_gameobject_GameObject.prototype,{
	update: function() {
		ttg_game_gameobject_GameObject.prototype.update.call(this);
		if(ttg_game_input_Input.isKeyDown(65)) this.velocity.x -= this.speed;
		if(ttg_game_input_Input.isKeyDown(87)) this.velocity.y -= this.speed;
		if(ttg_game_input_Input.isKeyDown(68)) this.velocity.x += this.speed;
		if(ttg_game_input_Input.isKeyDown(83)) this.velocity.y += this.speed;
		this.hitBox.update(this.x - this.width / 2,this.y - this.height / 2,this.width,this.height);
		var _g = 0;
		var _g1 = this.level.colliders;
		while(_g < _g1.length) {
			var col = _g1[_g];
			++_g;
			if(this.hitBox.checkCollision(col,this.velocity)) this.hitBox.collide(col,this.velocity);
		}
		this.x += this.velocity.x;
		this.y += this.velocity.y;
		this.velocity = new openfl_geom_Point();
	}
	,render: function() {
		ttg_game_gameobject_GameObject.prototype.render.call(this);
		this.sprite.get_graphics().beginFill(65280);
		this.sprite.get_graphics().drawRect(this.x - this.width / 2,this.y - this.height / 2,this.width,this.height);
		this.sprite.get_graphics().endFill();
	}
	,__class__: ttg_game_gameobject_TestObject
});
var ttg_game_gameobject_Trigger = function(l,x,y,col,tgt,func) {
	ttg_game_gameobject_GameObject.call(this,l,x,y);
	this.collider = col;
	this.target = tgt;
	this.activate = func;
};
$hxClasses["ttg.game.gameobject.Trigger"] = ttg_game_gameobject_Trigger;
ttg_game_gameobject_Trigger.__name__ = true;
ttg_game_gameobject_Trigger.__super__ = ttg_game_gameobject_GameObject;
ttg_game_gameobject_Trigger.prototype = $extend(ttg_game_gameobject_GameObject.prototype,{
	activate: function() {
	}
	,update: function() {
		ttg_game_gameobject_GameObject.prototype.update.call(this);
		if(this.collider.checkCollision(this.target,new openfl_geom_Point())) this.activate();
	}
	,__class__: ttg_game_gameobject_Trigger
});
var ttg_game_gameobject_ui_ButtonObject = function(l,x,y,w,h,t,onClicked) {
	var _g = this;
	ttg_game_gameobject_GameObject.call(this,l,x,y);
	this.width = w;
	this.height = h;
	this.textField = new openfl_text_TextField();
	this.textField.setTextFormat(new openfl_text_TextFormat("Verdana",20,1118481));
	this.textField.set_text(t);
	this.textField.set_x(x - this.textField.get_textWidth() / 2);
	this.textField.set_y(y - this.textField.get_textHeight() / 2);
	this.textField.set_width(this.textField.get_textWidth());
	this.textField.set_height(this.textField.get_textHeight());
	this.textField.set_selectable(false);
	this.sprite.addChild(this.textField);
	this.sprite.addEventListener("click",onClicked);
	this.sprite.addEventListener("mouseOver",function(e) {
		_g.hovered = true;
	});
	this.sprite.addEventListener("mouseOut",function(e1) {
		_g.hovered = false;
	});
};
$hxClasses["ttg.game.gameobject.ui.ButtonObject"] = ttg_game_gameobject_ui_ButtonObject;
ttg_game_gameobject_ui_ButtonObject.__name__ = true;
ttg_game_gameobject_ui_ButtonObject.__super__ = ttg_game_gameobject_GameObject;
ttg_game_gameobject_ui_ButtonObject.prototype = $extend(ttg_game_gameobject_GameObject.prototype,{
	render: function() {
		ttg_game_gameobject_GameObject.prototype.render.call(this);
		this.sprite.get_graphics().lineStyle(2,5592405);
		this.sprite.get_graphics().beginFill(this.hovered?11184810:16777215);
		this.sprite.get_graphics().drawRect(this.x - this.width / 2,this.y - this.height / 2,this.width,this.height);
		this.sprite.get_graphics().endFill();
	}
	,__class__: ttg_game_gameobject_ui_ButtonObject
});
var ttg_game_input_Input = function() { };
$hxClasses["ttg.game.input.Input"] = ttg_game_input_Input;
ttg_game_input_Input.__name__ = true;
ttg_game_input_Input.keyDown = function(e) {
	ttg_game_input_Input.keysDown[e.keyCode] = true;
};
ttg_game_input_Input.keyUp = function(e) {
	ttg_game_input_Input.keysDown[e.keyCode] = false;
};
ttg_game_input_Input.isKeyDown = function(keyCode) {
	return ttg_game_input_Input.keysDown[keyCode];
};
var ttg_game_level_Level = function(m) {
	this.objects = [];
	this.colliders = [];
	this.main = m;
	this.debugSprite = new openfl_display_Sprite();
};
$hxClasses["ttg.game.level.Level"] = ttg_game_level_Level;
ttg_game_level_Level.__name__ = true;
ttg_game_level_Level.prototype = {
	addGameObject: function(obj) {
		this.objects.push(obj);
	}
	,addCollider: function(col) {
		this.colliders.push(col);
	}
	,update: function() {
		var _g = 0;
		var _g1 = this.objects;
		while(_g < _g1.length) {
			var obj = _g1[_g];
			++_g;
			obj.update();
		}
	}
	,render: function() {
		this.bg.render();
		var _g = 0;
		var _g1 = this.objects;
		while(_g < _g1.length) {
			var obj = _g1[_g];
			++_g;
			obj.render();
		}
		this.debugSprite.get_graphics().clear();
		var _g2 = 0;
		var _g11 = this.colliders;
		while(_g2 < _g11.length) {
			var col = _g11[_g2];
			++_g2;
			col.debugDraw(this.debugSprite.get_graphics());
		}
	}
	,load: function(game) {
	}
	,exit: function() {
		var _g = 0;
		var _g1 = this.objects;
		while(_g < _g1.length) {
			var obj = _g1[_g];
			++_g;
			obj.destroy();
		}
		this.main.removeChild(this.bg);
	}
	,__class__: ttg_game_level_Level
};
var ttg_game_level_Level1 = function(m) {
	ttg_game_level_Level.call(this,m);
};
$hxClasses["ttg.game.level.Level1"] = ttg_game_level_Level1;
ttg_game_level_Level1.__name__ = true;
ttg_game_level_Level1.__super__ = ttg_game_level_Level;
ttg_game_level_Level1.prototype = $extend(ttg_game_level_Level.prototype,{
	load: function(game) {
		var _g = this;
		ttg_game_level_Level.prototype.load.call(this,game);
		this.bg = new ttg_game_level_TileBackground("levels/1");
		this.main.addChild(this.bg);
		new ttg_game_gameobject_ui_ButtonObject(this,700,500,100,50,"Menu",function(e) {
			game.loadLevel(new ttg_game_level_LevelMenu(_g.main));
		});
		var obj = new ttg_game_gameobject_TestObject(this,700,300);
		var trigger = new ttg_game_gameobject_Trigger(this,50,50,new ttg_game_physics_TriggerCollider(new ttg_game_physics_AABB(50,50,75,75)),obj.hitBox,function() {
			console.log("TRIGGERED!");
		});
		this.addCollider(trigger.collider);
		this.addCollider(new ttg_game_physics_AABB(150,150,500,50));
		this.addCollider(new ttg_game_physics_AABB(150,200,50,200));
		this.addCollider(new ttg_game_physics_AABB(150,400,500,50));
		this.addCollider(new ttg_game_physics_BorderCollider(false,false,0));
		this.addCollider(new ttg_game_physics_BorderCollider(true,false,0));
		this.addCollider(new ttg_game_physics_BorderCollider(false,true,800));
		this.addCollider(new ttg_game_physics_BorderCollider(true,true,600));
		this.main.addChild(this.debugSprite);
	}
	,__class__: ttg_game_level_Level1
});
var ttg_game_level_LevelMenu = function(m) {
	ttg_game_level_Level.call(this,m);
};
$hxClasses["ttg.game.level.LevelMenu"] = ttg_game_level_LevelMenu;
ttg_game_level_LevelMenu.__name__ = true;
ttg_game_level_LevelMenu.__super__ = ttg_game_level_Level;
ttg_game_level_LevelMenu.prototype = $extend(ttg_game_level_Level.prototype,{
	load: function(game) {
		var _g = this;
		ttg_game_level_Level.prototype.load.call(this,game);
		this.bg = new ttg_game_level_TileBackground("levels/Menu");
		this.main.addChild(this.bg);
		new ttg_game_gameobject_ui_ButtonObject(this,400,300,200,100,"Poziom 1",function(e) {
			game.loadLevel(new ttg_game_level_Level1(_g.main));
		});
		new ttg_game_gameobject_ui_ButtonObject(this,400,400,200,100,"Player Test",function(e1) {
			game.loadLevel(new ttg_game_level_LevelPlayerTest(_g.main));
		});
		this.main.addChild(this.debugSprite);
	}
	,__class__: ttg_game_level_LevelMenu
});
var ttg_game_level_LevelPlayerTest = function(m) {
	ttg_game_level_Level.call(this,m);
};
$hxClasses["ttg.game.level.LevelPlayerTest"] = ttg_game_level_LevelPlayerTest;
ttg_game_level_LevelPlayerTest.__name__ = true;
ttg_game_level_LevelPlayerTest.__super__ = ttg_game_level_Level;
ttg_game_level_LevelPlayerTest.prototype = $extend(ttg_game_level_Level.prototype,{
	load: function(game) {
		var _g = this;
		ttg_game_level_Level.prototype.load.call(this,game);
		this.bg = new ttg_game_level_TileBackground("levels/1");
		this.main.addChild(this.bg);
		var player = new ttg_game_gameobject_PlayerObject(this,23,45);
		var trigger = new ttg_game_gameobject_Trigger(this,50,50,new ttg_game_physics_TriggerCollider(new ttg_game_physics_AABB(700,600,100,100)),player.collider,function() {
			game.loadLevel(new ttg_game_level_LevelMenu(_g.main));
		});
		this.addCollider(new ttg_game_physics_AABB(150,150,500,50));
		this.addCollider(player.collider);
		this.addCollider(trigger.collider);
		this.main.addChild(this.debugSprite);
	}
	,__class__: ttg_game_level_LevelPlayerTest
});
var ttg_game_level_TileBackground = function(path) {
	openfl_display_Sprite.call(this);
	var unserializer = new haxe_Unserializer(openfl_Assets.getText(path));
	this.map = unserializer.unserialize();
};
$hxClasses["ttg.game.level.TileBackground"] = ttg_game_level_TileBackground;
ttg_game_level_TileBackground.__name__ = true;
ttg_game_level_TileBackground.init = function() {
	var value = ttg_game_level_TileBackground.createTilesheet("img/background/grass.png");
	ttg_game_level_TileBackground.bgTileSheets.set("grass",value);
	var value1 = ttg_game_level_TileBackground.createTilesheet("img/background/road.png");
	ttg_game_level_TileBackground.bgTileSheets.set("road",value1);
	var value2 = ttg_game_level_TileBackground.createTilesheet("img/background/grass.png");
	ttg_game_level_TileBackground.bgTileSheets.set("tlo",value2);
};
ttg_game_level_TileBackground.createTilesheet = function(imgPath) {
	var img = openfl_Assets.getBitmapData(imgPath);
	var sheet = new openfl_display_Tilesheet(img);
	var sheetWidth;
	sheetWidth = js_Boot.__cast(img.width / 40 , Int);
	var sheetHeight;
	sheetHeight = js_Boot.__cast(img.width / 40 , Int);
	var _g = 0;
	while(_g < sheetWidth) {
		var i = _g++;
		var _g1 = 0;
		while(_g1 < sheetHeight) {
			var j = _g1++;
			sheet.addTileRect(new openfl_geom_Rectangle(j * 40,i * 40,40,40));
		}
	}
	return sheet;
};
ttg_game_level_TileBackground.__super__ = openfl_display_Sprite;
ttg_game_level_TileBackground.prototype = $extend(openfl_display_Sprite.prototype,{
	createBackground: function(map) {
		var _g1 = 0;
		var _g = map.length;
		while(_g1 < _g) {
			var i = _g1++;
			var row = map[i];
			var _g3 = 0;
			var _g2 = row.length;
			while(_g3 < _g2) {
				var j = _g3++;
				var parts = row[j].split(".");
				var id = Std.parseInt(parts[1]);
				ttg_game_level_TileBackground.bgTileSheets.get(parts[0]).drawTiles(this.get_graphics(),[j * 40,i * 40,id]);
			}
		}
		this.get_graphics().endFill();
	}
	,render: function() {
		this.get_graphics().clear();
		this.createBackground(this.map);
	}
	,__class__: ttg_game_level_TileBackground
});
var ttg_game_physics_Collider = function() { };
$hxClasses["ttg.game.physics.Collider"] = ttg_game_physics_Collider;
ttg_game_physics_Collider.__name__ = true;
ttg_game_physics_Collider.prototype = {
	checkCollision: function(other,velocity) {
		return false;
	}
	,collide: function(other,velocity) {
	}
	,debugDraw: function(graphics) {
	}
	,__class__: ttg_game_physics_Collider
};
var ttg_game_physics_AABB = function(x,y,width,height) {
	this.rect = new openfl_geom_Rectangle(x,y,width,height);
};
$hxClasses["ttg.game.physics.AABB"] = ttg_game_physics_AABB;
ttg_game_physics_AABB.__name__ = true;
ttg_game_physics_AABB.__super__ = ttg_game_physics_Collider;
ttg_game_physics_AABB.prototype = $extend(ttg_game_physics_Collider.prototype,{
	update: function(x,y,width,height) {
		this.rect.x = x;
		this.rect.y = y;
		this.rect.width = width;
		this.rect.height = height;
	}
	,checkCollision: function(other,velocity) {
		if(other == this) return false;
		if(js_Boot.__instanceof(other,ttg_game_physics_AABB)) return new openfl_geom_Rectangle(this.rect.x + velocity.x,this.rect.y + velocity.y,this.rect.width,this.rect.height).intersects((js_Boot.__cast(other , ttg_game_physics_AABB)).rect);
		if(js_Boot.__instanceof(other,ttg_game_physics_BorderCollider)) return other.checkCollision(this,velocity);
		return false;
	}
	,collide: function(other,velocity) {
		if(other == this) return;
		if(js_Boot.__instanceof(other,ttg_game_physics_AABB)) this.AABBvsAABB(this.rect,(js_Boot.__cast(other , ttg_game_physics_AABB)).rect,velocity);
		if(js_Boot.__instanceof(other,ttg_game_physics_BorderCollider)) this.AABBvsBorder(this.rect,velocity,js_Boot.__cast(other , ttg_game_physics_BorderCollider));
	}
	,AABBvsAABB: function(rect,otherRect,velocity) {
		var xEntryDist;
		var xExitDist;
		var yEntryDist;
		var yExitDist;
		if(velocity.x > 0) {
			xEntryDist = otherRect.x - rect.get_right();
			xExitDist = otherRect.get_right() - rect.x;
		} else {
			xEntryDist = otherRect.get_right() - rect.x;
			xExitDist = otherRect.x - rect.get_right();
		}
		if(velocity.y > 0) {
			yEntryDist = otherRect.y - rect.get_bottom();
			yExitDist = otherRect.get_bottom() - rect.y;
		} else {
			yEntryDist = otherRect.get_bottom() - rect.y;
			yExitDist = otherRect.y - rect.get_bottom();
		}
		var xEntryTime;
		var xExitTime;
		var yEntryTime;
		var yExitTime;
		if(velocity.x != 0) {
			xEntryTime = xEntryDist / velocity.x;
			xExitTime = xExitDist / velocity.x;
		} else {
			xEntryTime = -99999999999;
			xExitTime = 9999999999;
		}
		if(velocity.y != 0) {
			yEntryTime = yEntryDist / velocity.y;
			yExitTime = yExitDist / velocity.y;
		} else {
			yEntryTime = -99999999999;
			yExitTime = 9999999999;
		}
		var entryTime = Math.max(xEntryTime,yEntryTime);
		var exitTime = Math.min(xExitTime,yExitTime);
		if(entryTime > exitTime || xEntryTime < 0 && yEntryTime < 0 || xEntryTime > 1 || yEntryTime > 1) return;
		var normal = new openfl_geom_Point();
		if(xEntryTime > yEntryTime) {
			if(xEntryDist > 0) normal.x = -1; else normal.x = 1;
		} else if(yEntryDist > 0) normal.y = -1; else normal.y = 1;
		velocity.x *= entryTime;
		velocity.y *= entryTime;
	}
	,AABBvsBorder: function(rect,velocity,border) {
		if(!border.axis) {
			if(!border.normal) velocity.x = border.location - rect.x; else velocity.x = border.location - rect.get_right();
		} else if(!border.normal) velocity.y = border.location - rect.get_top(); else velocity.y = border.location - rect.get_bottom();
	}
	,debugDraw: function(graphics) {
		graphics.lineStyle(1,16711680);
		graphics.drawRect(this.rect.x,this.rect.y,this.rect.width,this.rect.height);
	}
	,__class__: ttg_game_physics_AABB
});
var ttg_game_physics_BorderCollider = function(a,n,l) {
	this.axis = a;
	this.normal = n;
	this.location = l;
};
$hxClasses["ttg.game.physics.BorderCollider"] = ttg_game_physics_BorderCollider;
ttg_game_physics_BorderCollider.__name__ = true;
ttg_game_physics_BorderCollider.__super__ = ttg_game_physics_Collider;
ttg_game_physics_BorderCollider.prototype = $extend(ttg_game_physics_Collider.prototype,{
	checkCollision: function(other,velocity) {
		if(other == this) return false;
		if(!this.axis) {
			if(!this.normal) {
				var otherLeft = 0;
				if(js_Boot.__instanceof(other,ttg_game_physics_AABB)) {
					otherLeft = (js_Boot.__cast(other , ttg_game_physics_AABB)).rect.x + velocity.x;
					return otherLeft < this.location;
				}
				return false;
			} else {
				var otherRight = 0;
				if(js_Boot.__instanceof(other,ttg_game_physics_AABB)) {
					otherRight = (js_Boot.__cast(other , ttg_game_physics_AABB)).rect.get_right() + velocity.x;
					return otherRight > this.location;
				}
				return false;
			}
		} else if(!this.normal) {
			var otherTop = 0;
			if(js_Boot.__instanceof(other,ttg_game_physics_AABB)) {
				otherTop = (js_Boot.__cast(other , ttg_game_physics_AABB)).rect.get_top() + velocity.y;
				return otherTop < this.location;
			}
			return false;
		} else {
			var otherBottom = 0;
			if(js_Boot.__instanceof(other,ttg_game_physics_AABB)) {
				otherBottom = (js_Boot.__cast(other , ttg_game_physics_AABB)).rect.get_bottom() + velocity.y;
				return otherBottom > this.location;
			}
			return false;
		}
		return false;
	}
	,debugDraw: function(graphics) {
		graphics.lineStyle(3,16711680);
		if(this.axis) {
			graphics.moveTo(0,this.location);
			graphics.lineTo(800,this.location);
		} else {
			graphics.moveTo(this.location,0);
			graphics.lineTo(this.location,600);
		}
	}
	,__class__: ttg_game_physics_BorderCollider
});
var ttg_game_physics_TriggerCollider = function(col) {
	this.collider = col;
};
$hxClasses["ttg.game.physics.TriggerCollider"] = ttg_game_physics_TriggerCollider;
ttg_game_physics_TriggerCollider.__name__ = true;
ttg_game_physics_TriggerCollider.__super__ = ttg_game_physics_Collider;
ttg_game_physics_TriggerCollider.prototype = $extend(ttg_game_physics_Collider.prototype,{
	checkCollision: function(other,velocity) {
		return this.collider.checkCollision(other,velocity);
	}
	,debugDraw: function(graphics) {
		if(js_Boot.__instanceof(this.collider,ttg_game_physics_AABB)) {
			var rect;
			rect = (js_Boot.__cast(this.collider , ttg_game_physics_AABB)).rect;
			graphics.lineStyle(0,0,0);
			graphics.beginFill(5574929,0.5);
			graphics.drawRect(rect.x,rect.y,rect.width,rect.height);
			graphics.endFill();
		}
	}
	,__class__: ttg_game_physics_TriggerCollider
});
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
if(Array.prototype.indexOf) HxOverrides.indexOf = function(a,o,i) {
	return Array.prototype.indexOf.call(a,o,i);
};
$hxClasses.Math = Math;
String.prototype.__class__ = $hxClasses.String = String;
String.__name__ = true;
$hxClasses.Array = Array;
Array.__name__ = true;
Date.prototype.__class__ = $hxClasses.Date = Date;
Date.__name__ = ["Date"];
var Int = $hxClasses.Int = { __name__ : ["Int"]};
var Dynamic = $hxClasses.Dynamic = { __name__ : ["Dynamic"]};
var Float = $hxClasses.Float = Number;
Float.__name__ = ["Float"];
var Bool = $hxClasses.Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = $hxClasses.Class = { __name__ : ["Class"]};
var Enum = { };
var __map_reserved = {}
var ArrayBuffer = $global.ArrayBuffer || js_html_compat_ArrayBuffer;
if(ArrayBuffer.prototype.slice == null) ArrayBuffer.prototype.slice = js_html_compat_ArrayBuffer.sliceImpl;
var DataView = $global.DataView || js_html_compat_DataView;
var Uint8Array = $global.Uint8Array || js_html_compat_Uint8Array._new;
var this1;
this1 = new Uint32Array(256);
lime_math_color__$RGBA_RGBA_$Impl_$.__alpha16 = this1;
var _g = 0;
while(_g < 256) {
	var i = _g++;
	var val = Math.ceil(i * 257.00392156862745);
	lime_math_color__$RGBA_RGBA_$Impl_$.__alpha16[i] = val;
}
var this2;
this2 = new Uint8Array(510);
lime_math_color__$RGBA_RGBA_$Impl_$.__clamp = this2;
var _g1 = 0;
while(_g1 < 255) {
	var i1 = _g1++;
	lime_math_color__$RGBA_RGBA_$Impl_$.__clamp[i1] = i1;
}
var _g11 = 255;
var _g2 = 511;
while(_g11 < _g2) {
	var i2 = _g11++;
	lime_math_color__$RGBA_RGBA_$Impl_$.__clamp[i2] = 255;
}
if(window.createjs != null) createjs.Sound.alternateExtensions = ["ogg","mp3","wav"];
openfl_display_DisplayObject.__instanceCount = 0;
openfl_display_DisplayObject.__worldRenderDirty = 0;
openfl_display_DisplayObject.__worldTransformDirty = 0;
haxe_Unserializer.DEFAULT_RESOLVER = Type;
haxe_Unserializer.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
haxe_Unserializer.CODES = null;
haxe_ds_ObjectMap.count = 0;
haxe_io_FPHelper.i64tmp = (function($this) {
	var $r;
	var x = new haxe__$Int64__$_$_$Int64(0,0);
	$r = x;
	return $r;
}(this));
js_Boot.__toStr = {}.toString;
js_html_compat_Uint8Array.BYTES_PER_ELEMENT = 1;
lime_Assets.cache = new lime_AssetCache();
lime_Assets.libraries = new haxe_ds_StringMap();
lime_Assets.onChange = new lime_app_Event_$Void_$Void();
lime_Assets.initialized = false;
lime__$backend_html5_HTML5Window.windowID = 0;
lime_app_Preloader.images = new haxe_ds_StringMap();
lime_app_Preloader.loaders = new haxe_ds_StringMap();
lime_ui_Gamepad.devices = new haxe_ds_IntMap();
lime_ui_Gamepad.onConnect = new lime_app_Event_$lime_$ui_$Gamepad_$Void();
lime_ui_Joystick.devices = new haxe_ds_IntMap();
lime_ui_Joystick.onConnect = new lime_app_Event_$lime_$ui_$Joystick_$Void();
lime_ui_Touch.onEnd = new lime_app_Event_$lime_$ui_$Touch_$Void();
lime_ui_Touch.onMove = new lime_app_Event_$lime_$ui_$Touch_$Void();
lime_ui_Touch.onStart = new lime_app_Event_$lime_$ui_$Touch_$Void();
openfl_Assets.cache = new openfl_AssetCache();
openfl_display_LoaderInfo.__rootURL = window.document.URL;
openfl_system_ApplicationDomain.currentDomain = new openfl_system_ApplicationDomain(null);
openfl_geom_Matrix.__identity = new openfl_geom_Matrix();
openfl_geom_Matrix.__temp = new openfl_geom_Matrix();
openfl_Lib.current = new openfl_display_MovieClip();
openfl__$internal_renderer_cairo_CairoGraphics.SIN45 = 0.70710678118654752440084436210485;
openfl__$internal_renderer_cairo_CairoGraphics.TAN22 = 0.4142135623730950488016887242097;
openfl__$internal_renderer_canvas_CanvasGraphics.SIN45 = 0.70710678118654752440084436210485;
openfl__$internal_renderer_canvas_CanvasGraphics.TAN22 = 0.4142135623730950488016887242097;
openfl__$internal_renderer_canvas_CanvasGraphics.fillCommands = new openfl__$internal_renderer_DrawCommandBuffer();
openfl__$internal_renderer_canvas_CanvasGraphics.strokeCommands = new openfl__$internal_renderer_DrawCommandBuffer();
openfl_geom_Rectangle.__temp = new openfl_geom_Rectangle();
openfl_display_Tilesheet.__defaultPoint = new openfl_geom_Point(0,0);
openfl_media_Sound.__registeredSounds = new haxe_ds_StringMap();
openfl_ui_GameInput.numDevices = 0;
openfl_ui_GameInput.__deviceList = [];
openfl_ui_GameInput.__devices = new haxe_ds_ObjectMap();
openfl_ui_GameInput.__instances = [];
ttg_game_gameobject_PlayerObject.walkSpeed = 80;
ttg_game_gameobject_PlayerObject.runSpeed = 100;
ttg_game_input_Input.keysDown = [];
ttg_game_level_TileBackground.bgTileSheets = new haxe_ds_StringMap();
ApplicationMain.main();
})(typeof console != "undefined" ? console : {log:function(){}}, typeof window != "undefined" ? window : exports, typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
