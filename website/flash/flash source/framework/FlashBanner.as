package framework {
	
	import flash.net.URLLoader;
	import flash.net.URLRequest;
	import flash.events.Event;
	import flash.display.Sprite;
	import flash.events.EventDispatcher;
	import flash.events.IOErrorEvent;
	import flash.display.Loader;
	import flash.display.Bitmap;
	import flash.display.BitmapData;
	import flash.utils.*;
	import fl.transitions.Tween;
	import fl.transitions.easing.*;
	
	public class FlashBanner extends bannerCanvas {
		
		private var ImageList:XMLList;
		private var ImageLdr:Loader;
		private var ImageArray:Array = new Array();
		private var currentImage:Number = 0;
		private var interval:int;
		private var myNavigator:Navigator;
		private var prevSelectedIndex:Number = -1;
		
		public function FlashBanner(list:XMLList):void {
			ImageList = list;
			
			for(var i=0; i<ImageList.item.length(); i++) {  
				ImageLdr = new Loader();
				ImageLdr.load( new URLRequest(ImageList.@path + ImageList.item[i].toString()) );
				ImageLdr.contentLoaderInfo.addEventListener(Event.COMPLETE, onLoadComplete);
			}
			
			myNavigator = new Navigator();
			addChild(myNavigator);
			myNavigator.x = ImageList.@navigatorX;
			myNavigator.y = ImageList.@navigatorY;
			myNavigator.alpha = 0;
			myNavigator.dataProvider = ImageList.item.length();
			myNavigator.addEventListener("SELECTED", myNavigatorSelected);
		}
		
		private function myNavigatorSelected(event:Event):void {			
			currentImage = event.target.selectedIndex;
			clearInterval(interval);
			Looping();
			interval = setInterval(Looping, ImageList.@delay);
		}
		
		public function onLoadComplete(event:Event):void {
			var thumbnail:Sprite = new Sprite();
			
			var bigImage:Bitmap = new Bitmap();
			bigImage = event.target.content as Bitmap;
			bigImage.smoothing = true;
			bigImage.alpha = 0;
			addChild(bigImage);
			ImageArray.push(bigImage);
			
			if(ImageArray.length == 2) {
				Looping();
				dispatchEvent( new Event("INIT") );
				//new Tween(myNavigator, "alpha", Regular.easeOut, 0,1,1,true);
				myNavigator.alpha = 1;
				interval = setInterval(Looping, ImageList.@delay);
			}
		}
		
		private function Looping():void {
			if(prevSelectedIndex != -1)
				new Tween(ImageArray[prevSelectedIndex], "alpha", Regular.easeOut, 1,0,1,true);
			
			myNavigator.SelectedIndex = currentImage;
			fadeIn( ImageArray[currentImage] );
			prevSelectedIndex = currentImage;
			
			if(currentImage < ImageArray.length-1) 
				currentImage++;
			else 
				currentImage = 0;
			
		}
		
		private function fadeIn(obj):void { 
			new Tween(obj, "alpha", Regular.easeOut,0,1,1,true);
			//setChildIndex(obj, numChildren - 1);
			setChildIndex(myNavigator, numChildren-1);
		}
		
	}
}