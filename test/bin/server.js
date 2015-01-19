/*
	socketio-client binding for haxe / test server
*/

// イニシャライズ
var fs = require( "fs" );
var server = require( "http" ).createServer( function( req, res ) {
     res.writeHead( 200, { "Content-Type":"text/html" } );
     var output = fs.readFileSync( "./index.html", "utf-8" );
     res.end( output );
}).listen( 8080 );
var io = require( "socket.io" ).listen( server );

// ユーザ管理ハッシュ
var userHash = {} ;

// 接続時
io.sockets.on("connection", function (socket) {
	socket.on("connected", function (name) {
		var msg = name + "が入った";
		userHash[ socket.id ] = name;
		console.log( "login: " + name );
		io.sockets.emit( "msg", { value: msg } );
	});
	socket.on( "msg", function (data) {
		console.log( "talk: " + data.value );
		io.sockets.emit( "msg", { value: data.value } );
	});
	// 切断時
	socket.on( "disconnect", function ( ) {
		if ( userHash[ socket.id ] ) {
			var msg = userHash[ socket.id ] + "が出てった";
			console.log( "logout: " + userHash[ socket.id ] );
			delete userHash[ socket.id ];
			io.sockets.emit( "msg", { value: msg } );
		}
	});
});
