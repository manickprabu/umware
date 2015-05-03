package framework {
	
	import flash.display.*;
	import flash.events.*;
	import flash.text.TextField;
	import fl.transitions.Tween;
	import fl.transitions.easing.*;
	
	public class index extends MovieClips {
		
		private var configXML:String = "";
		private var Data:XML;
		private var fBanner:FlashBanner;
		private var PH_Banner:MovieClip;
		private var FullScreenButton:fullScreenButton;
		
		public function index():void {
			this.configXML 	= root.loaderInfo.parameters.configPath;
			stage.scaleMode = StageScaleMode.NO_SCALE;
			
			PH_Banner 			= new MovieClip();
			addChilds([PH_Banner]);
			
			var loadXML:LoadXML = new LoadXML(this.configXML || "config.xml");
			loadXML.addEventListener("COMPLETE", LoadXMLComplete);
			loadXML.addEventListener("ERROR",    LoadXMLComplete);
		}
		
		private function getFullScreen(status:Boolean = true):void {
			if(!status) {
				tryRemoveChild(FullScreenButton);
				return;
			}
			FullScreenButton	= new fullScreenButton();
			FullScreenButton.addEventListener(MouseEvent.CLICK, toggleFullscreen);
			addChild(FullScreenButton);
			FullScreenButton.x = Data.FullScreen.@x;
			FullScreenButton.y = Data.FullScreen.@y;
			FullScreenButton.alpha = 0;
			setChildIndex(FullScreenButton, numChildren - 1);
		}
		
		private function LoadXMLComplete(event:Event):void {
			if(event.type == 'COMPLETE') {
				msg = 'success';
				Data = event.target.getData;
				
				startBanners();
				getFullScreen();
				
				getMsgBox(isTrue(Data.MsgBox.@visible));
			} else {
				msg = 'xml failed';
			} 
		}
		
		private function startBanners():void {
			msg = Data.Banner.@path;
			fBanner = new FlashBanner(Data.Banner);
			fBanner.addEventListener("INIT", fBannerInit);
			fBanner.mask = Mask;
			addChild(fBanner);
			Mask.x = BG.x+1;
			Mask.y = BG.y+1;
			Mask.height = BG.height - 2;
			Mask.width = BG.width - 2;
		}
		private function fBannerInit(event:Event):void {
			//var temp1 = new Tween(preloader, "alpha", Regular.easeOut, 1,0,1,true);
			//var temp2 = new Tween(FullScreenButton, "alpha", Regular.easeOut, 0,1,1,true);
			preloader.alpha = 0;
			FullScreenButton.alpha = 1;
		}
		
		private function toggleFullscreen(event:MouseEvent):void {
			if (stage.displayState == StageDisplayState.NORMAL) {
          		stage.displayState=StageDisplayState.FULL_SCREEN;
 	    	} else {
 	        	stage.displayState=StageDisplayState.NORMAL;
 	    	}
		}
		
		private function getMsgBox(status:Boolean = false):void {
			msgBox.x = 2000;
			if(!status) return;
			
			msgBox.x = 10;	msgBox.y = 10;
			setChildIndex(msgBox, numChildren - 1);
		}
		
		private function set msg(str:String):void {
			msgBox.appendText(str + '\n');
		}
	}
}