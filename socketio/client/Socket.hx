/*
	Socket IO Client ver 1.0 for Haxe
		Programed by Yui Kinomoto

	TODO:
		Haxedocをキチンとする
		Dynamicを潰せる部分を潰す

	メモ:
		socket io clientの SocketとEmitterのバインド
		たぶんホントはSocket->Emitterという感じ
*/
package socketio.client.Socket;

class Socket
{
	/// socketioオブジェクト
	public var sobj( default, null ):Dynamic;

	/**
	 * コンストラクタ
	 * @param	url	URL
	 * @param	opt	オプション
	 */
	public function new( url:String = "http://localhost", ?opt:Dynamic ):Void
	{
		// なんとかする
		this.sobj = untyped __js__("io( url, opt )");
	}

	/**
	 * ソケットを開く
	 * @return	これ自身
	 */
	public function open( ):Socket
	{
		this.sobj.open( );

		return this;
	}

	/**
	 * 送信
	 * @param	msg	メッセージ
	 * @return	これ自身
	 */
	public function send( msg:String ):Socket
	{
		this.sobj.send( msg );
		return this;
	}

	/**
	 * 代用品 - 複数送信
	 * @param	msgs	メッセージの配列
	 * @return	これ自身
	 */
	public function multiSend( msgs:Array<String> ):Socket
	{
		for ( t in msgs ) {
			this.sobj.send( t );
		}
		return this;
	}

	/**
	 * emitのオーバーライド
	 * @param	ev	イベント名
	 * @param	fn	コールバック関数
	 * @return	これ自身
	 */
	public function emit( ev:String, fn:Dynamic->Void ):Socket
	{
		this.sobj.emit( ev, fn );
		return this;
	}

	/**
	 * 手動で閉じる
	 * @return	これ自身
	 */
	public function close( ):Socket
	{
		this.sobj.close( );
		return this;
	}

	/**
	 * イベントリスナーを定義
	 * @param	event	イベント名
	 * @param	fn		コールバック関数
	 * @return	これ自身
	 */
	public function on( event:String, fn:Dynamic->Void ):Socket
	{
		this.sobj.on( event, fn );
		return this;
	}

	/**
	 * (1回のみ使う)イベントリスナーを定義
	 * @param	event	イベント名
	 * @param	fn		コールバック関数
	 * @return	これ自身
	 */
	public function once( event:String, fn:Dynamic->Void ):Socket
	{
		this.sobj.once( event, fn );
		return this;
	}

	/**
	 * イベントリスナーを削除
	 * @param	event	イベント名
	 * @param	fn		コールバック関数
	 * @return	これ自身
	 */
	public function off( event:String, fn:Dynamic->Void ):Socket
	{
		this.sobj.off( event, fn );
		return this;
	}

	/**
	 * 指定したイベントのコールバック関数を配列で返す
	 * @param	event	イベント名
	 * @return	コールバック関数一覧
	 */
	public function listeners( event:String ):Array<Dynamic->Void>
	{
		return this.sobj.listeners( event );
	}

	/**
	 * 指定したイベントはコールバック関数があるか？
	 * @param	event	イベント名
	 * @return	あればtrue
	 */
	public function hasListeners( event:String ):Bool
	{
		return this.sobj.hasListeners( event );
	}

}
