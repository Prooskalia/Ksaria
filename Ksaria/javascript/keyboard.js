(function (container) {
    "use strict";

    var constructor = function () {
        this._keyStates = {};
    };

    // ReSharper disable once InconsistentNaming
    container.prototype.CreateKeyboard = function () { return new constructor(); };

    var prototype = constructor.prototype;

    prototype.getKeysDown = function () {
        var keyCodes = [];

        for (var keyCode in this._keyStates) {
            keyCodes.push(parseInt(keyCode));
        }
        return keyCodes;
    };

    prototype.isKeyDown = function (keyCode) {
        return this._keyStates[keyCode] === true;
    };

    prototype.onKeyDown = function (e) {
        this._keyStates[e.keyCode] = true;
    };

    prototype.onKeyUp = function (e) {
        delete this._keyStates[e.keyCode];
    };

    prototype.reset = function () {
        this._keyStates = {};
    };
})(window.Container);
