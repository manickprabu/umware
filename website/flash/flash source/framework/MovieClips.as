package framework {
	
	import flash.display.*;
	import flash.geom.Rectangle;
	import flash.display.*;
	
	public class  MovieClips extends MovieClip {
		
		public function MovieClips():void {}
		
		public function tryRemoveChild(child):void {
			try {
				removeChild(child);
			}catch(e){};
		}
		
		public function addChilds(Instences:Array):void {
			for(var i=0; i<Instences.length; i++) {
				addChild(Instences[i]);
			}
		}
		
		public function isTrue(exp:*):Boolean {
			if(exp == true || exp == "true" || exp == 't' || exp == 1 || exp == "True" || exp == "T") 
				return true;
			
			return false;
		}
		
		public function duplicateDisplayObject(target:DisplayObject, autoAdd:Boolean = false):DisplayObject {
			// create duplicate
			var targetClass:Class = Object(target).constructor;
			var duplicate:DisplayObject = new targetClass();
			
			// duplicate properties
			duplicate.transform = target.transform;
			duplicate.filters = target.filters;
			duplicate.cacheAsBitmap = target.cacheAsBitmap;
			duplicate.opaqueBackground = target.opaqueBackground;
			if (target.scale9Grid) {
				var rect:Rectangle = target.scale9Grid;
				// WAS Flash 9 bug where returned scale9Grid is 20x larger than assigned
				// rect.x /= 20, rect.y /= 20, rect.width /= 20, rect.height /= 20;
				duplicate.scale9Grid = rect;
			}
			// add to target parent's display list
			// if autoAdd was provided as true
			if (autoAdd && target.parent) {
				target.parent.addChild(duplicate);
			}
		
			return duplicate;
		}
		
	}
}