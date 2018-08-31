game.module("engine.storage").body(function() {
    game.createClass("Storage", {
        id: "",
        supported: !1,
        init: function(t) {
            this.id = t || game.Storage.id, this.supported = this._isSupported()
        },
        clear: function() {
            for (var t = localStorage.length - 1; t >= 0; t--) {
                var e = localStorage.key(t); - 1 !== e.indexOf(this.id + ".") && localStorage.removeItem(e)
            }
        },
        get: function(t, e) {
            var o = localStorage.getItem(this.id + "." + t);
            if (null === o) return e;
            try {
                return this._decode(o)
            } catch (t) {
                return o
            }
        },
        has: function(t) {
            return null !== localStorage.getItem(this.id + "." + t)
        },
        remove: function(t) {
            localStorage.removeItem(this.id + "." + t)
        },
        set: function(t, e) {
            return this.supported && localStorage.setItem(this.id + "." + t, this._encode(e)), e
        },
        _decode: function(t) {
            return JSON.parse(t)
        },
        _encode: function(t) {
            return JSON.stringify(t)
        },
        _isSupported: function() {
            if ("object" != typeof localStorage) return !1;
            try {
                localStorage.setItem("localStorage", 1), localStorage.removeItem("localStorage")
            } catch (t) {
                return !1
            }
            return !0
        }
    }), game.addAttributes("Storage", {
        id: ""
    })
});