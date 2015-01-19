package;

import haxe.Json;
import js.Browser;
import js.html.InputElement;
import js.html.TextAreaElement;
import socketio.client.Socket;

/**
 * sockjs client binding for haxe / test
 */
class Main
{
	private var socketio:Socket;
	private var name:String;

	/**
	 * エントリポイント
	 */
	static public function main( )
	{
		new Main( );
	}

	/**
	 * コンストラクタ
	 */
	public function new( )
	{
		Browser.window.onload = function( d:Dynamic ) {
			this.start( );
		};
	}

	/**
	 * 開始
	 */
	private function start( ):Void
	{
		this.socketio = new Socket( "http://localhost:8080" );
		this.socketio.on( "connected", function( name ) { } );
		this.socketio.on( "disconnect", function( d:Dynamic ) { } );
		this.socketio.on( "msg", function( data:Dynamic ) {
			this.showMessage( data.value );
		} );

		// 名前リスト
		var nameList = [
			"ゆい", "あい", "はるな", "れいこ", "あきこ", "まなまな", "まや"
		];

		// 接続
		this.name = nameList[Std.random( nameList.length )];
		this.socketio.emit( "connected", this.name );
		this.showMessage( "ユーアー: " + this.name );

		// クリックイベント
		Browser.document.getElementById( "send" ).onclick = function( d:Dynamic ) {
			this.sendMessage( );
		};
	}

	/**
	 * メッセージ
	 */
	public function sendMessage( ):Void
	{
		var msg = cast( Browser.document.getElementById( "msg" ), InputElement ).value;
		this.socketio.emit( "msg", { value: this.name + " > " + msg } );
	}

	/**
	 * メッセージ表示
	 * @param	s	メッセージ
	 */
	public function showMessage( s:String ):Void
	{
		var memo:TextAreaElement = cast Browser.document.getElementById( "memo" );
		memo.value += s + "\n";
	}
}
