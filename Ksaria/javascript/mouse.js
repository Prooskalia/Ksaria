(function (container) {
    "use strict";

    var constructor = function (application) {
        this.application = application;
    };

    // ReSharper disable once InconsistentNaming
    container.prototype.CreateMouse = function (application) { return new constructor(application); };

    var prototype = constructor.prototype;


    prototype.onMouseDown = function (e) {
        var button = e.button;

        this.application.logger.log('Click' + button);

        //var position = this._position;

        //position.x = (e.clientX / this._domElement.clientWidth) * 2 - 1;
        //position.y = -(e.clientY / this._domElement.clientHeight) * 2 + 1;

        //this._raycaster.setFromCamera(position, camera);

        //var intersects = this._raycaster.intersectObjects(objects);
    };


    prototype.onMouseMove = function (e) {
        this.application.logger.log('Move: ' + e.clientX + ', ' + e.clientY);
    };
})(window.Container);