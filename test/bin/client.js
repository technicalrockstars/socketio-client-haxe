(function () { "use strict";
var Main = function() {
	var _g = this;
	window.onload = function(d) {
		_g.start();
	};
};
Main.__name__ = true;
Main.main = function() {
	new Main();
};
Main.prototype = {
	start: function() {
		var _g = this;
		this.socketio = new socketio.client.Socket("http://localhost:8080");
		this.socketio.on("connected",function(name) {
		});
		this.socketio.on("disconnect",function(d) {
		});
		this.socketio.on("msg",function(data) {
			_g.showMessage(data.value);
		});
		var nameList = ["ゆい","あい","はるな","れいこ","あきこ","まなまな","まや"];
		this.name = nameList[Std.random(nameList.length)];
		this.socketio.emit("connected",this.name);
		this.showMessage("ユーアー: " + this.name);
		window.document.getElementById("send").onclick = function(d1) {
			_g.sendMessage();
		};
	}
	,sendMessage: function() {
		var msg = (js.Boot.__cast(window.document.getElementById("msg") , HTMLInputElement)).value;
		this.socketio.emit("msg",{ value : this.name + " > " + msg});
	}
	,showMessage: function(s) {
		var memo = window.document.getElementById("memo");
		memo.value += s + "\n";
	}
	,__class__: Main
};
Math.__name__ = true;
var Std = function() { };
Std.__name__ = true;
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
};
Std.random = function(x) {
	if(x <= 0) return 0; else return Math.floor(Math.random() * x);
};
var js = {};
js.Boot = function() { };
js.Boot.__name__ = true;
js.Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) return Array; else return o.__class__;
};
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) str += "," + js.Boot.__string_rec(o[i],s); else str += js.Boot.__string_rec(o[i],s);
				}
				return str + ")";
			}
			var l = o.length;
			var i1;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js.Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str2 = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str2.length != 2) str2 += ", \n";
		str2 += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str2 += "\n" + s + "}";
		return str2;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
js.Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js.Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js.Boot.__interfLoop(cc.__super__,cl);
};
js.Boot.__instanceof = function(o,cl) {
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
				if(js.Boot.__interfLoop(js.Boot.getClass(o),cl)) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
};
js.Boot.__cast = function(o,t) {
	if(js.Boot.__instanceof(o,t)) return o; else throw "Cannot cast " + Std.string(o) + " to " + Std.string(t);
};
var socketio = {};
socketio.client = {};
socketio.client.Socket = function(url,opt) {
	if(url == null) url = "http://localhost";
	this.sobj = io.connect( url, opt );
};
socketio.client.Socket.__name__ = true;
socketio.client.Socket.prototype = {
	open: function() {
		this.sobj.open();
		return this;
	}
	,send: function(msg) {
		this.sobj.send(msg);
		return this;
	}
	,multiSend: function(msgs) {
		var _g = 0;
		while(_g < msgs.length) {
			var t = msgs[_g];
			++_g;
			this.sobj.send(t);
		}
		return this;
	}
	,emit: function(ev,d) {
		this.sobj.emit(ev,d);
		return this;
	}
	,close: function() {
		this.sobj.close();
		return this;
	}
	,on: function(event,fn) {
		this.sobj.on(event,fn);
		return this;
	}
	,once: function(event,fn) {
		this.sobj.once(event,fn);
		return this;
	}
	,off: function(event,fn) {
		this.sobj.off(event,fn);
		return this;
	}
	,listeners: function(event) {
		return this.sobj.listeners(event);
	}
	,hasListeners: function(event) {
		return this.sobj.hasListeners(event);
	}
	,__class__: socketio.client.Socket
};
Math.NaN = Number.NaN;
Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
Math.isFinite = function(i) {
	return isFinite(i);
};
Math.isNaN = function(i1) {
	return isNaN(i1);
};
String.prototype.__class__ = String;
String.__name__ = true;
Array.__name__ = true;
var Int = { __name__ : ["Int"]};
var Dynamic = { __name__ : ["Dynamic"]};
var Float = Number;
Float.__name__ = ["Float"];
var Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = { __name__ : ["Class"]};
var Enum = { };
Main.main();
})();
