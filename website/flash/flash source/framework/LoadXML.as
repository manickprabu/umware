package framework {
	
	import flash.net.URLLoader;
	import flash.net.URLRequest;
	import flash.events.Event;
	import flash.display.Sprite;
	import flash.events.EventDispatcher;
	import flash.events.IOErrorEvent;

	public class LoadXML extends Sprite {
		
		public var m_url:String;
		
		private var m_xmlObj	:XML;
		private var m_request	:URLRequest;
		private var m_loader	:URLLoader 	= new URLLoader();
		
		public function LoadXML(param):void {
			this.m_url	= param;
			m_request	= new URLRequest( this.m_url );
			m_loader.addEventListener(Event.COMPLETE, XMLLoadComplete);
			m_loader.addEventListener(IOErrorEvent.IO_ERROR, XMLLoadErrorHandler);
			m_loader.load(m_request);
		}
		
		private function XMLLoadComplete(event:Event):void {
			m_xmlObj 	= new XML(event.target.data);
			dispatchEvent( new Event('COMPLETE') );
		}
		
		private function XMLLoadErrorHandler(event:Event):void {
			dispatchEvent( new Event('ERROR') );
		}
		
		public function get getData():XML {
			return m_xmlObj;
		}
	}
}