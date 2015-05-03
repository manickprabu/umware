package framework {
	
	import flash.events.*;

	public class Navigator extends BannerNavigator {
		
		private var Instences:Array = new Array();
		private var difference:Number = 3;
		public var selectedIndex:Number = 1;
		
		public function Navigator():void { 
			left.visible = instence.visible = right.visible = false;
		}
		
		public function set dataProvider(data:Number):void {
			left.visible = instence.visible = right.visible = true;
			left.addEventListener(MouseEvent.CLICK, NavigatorClick);
			right.addEventListener(MouseEvent.CLICK, NavigatorClick);
			
			Instences.push(instence);
			
			for(var i=0; i<data-1; i++) {
				var ins = duplicateDisplayObject(instence, true);
				Instences.push(ins);
			}
			
			for(i=0; i<Instences.length; i++) {
				Instences[i].x = (i * (20 + difference) ) + 20;
				Instences[i].count.text = i+1;
				Instences[i].id = i;
				Instences[i].addEventListener("SELECTED", itemSelected);
			}
			right.x = Instences[ Instences.length-1 ].x + 40;
		}
		
		//dataProvider(5);
		
		public function set SelectedIndex(value:Number):void {
			if(value != selectedIndex) {
				Instences[selectedIndex].gotoAndStop(1);
				selectedIndex = value;
				Instences[selectedIndex].isSelected = true;
				Instences[selectedIndex].gotoAndStop(2);
			}
		}
		
		private function itemSelected(event:Event):void {
			SelectedIndex = event.target.id;
			dispatchEvent( new Event('SELECTED') );
		}
		
		private function NavigatorClick(event:Event):void {
			var index:Number;
			
			trace(selectedIndex);
			
			if(event.target.name == 'left') 
				index = selectedIndex-1;
			else if(event.target.name == 'right')
				index = selectedIndex+1;
			
			if(index < 0) index = Instences.length-1;
			if(index > Instences.length-1) index = 0;
			
			SelectedIndex = index;
			dispatchEvent( new Event('SELECTED') );
		}
		
	}
}