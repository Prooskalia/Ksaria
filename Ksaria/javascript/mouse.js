(function (container) {
    "use strict";

    var constructor = function (application) {
        this.application = application;
        this.position = new application.graphics.Vector3();
        this.raycaster = new application.graphics.Raycaster();
    };

    // ReSharper disable once InconsistentNaming
    container.prototype.CreateMouse = function (application) { return new constructor(application); };

    var prototype = constructor.prototype;

    prototype.onMouseDown = function (e) {
        e.preventDefault();

        this.application.log('DEBUG: Click #' + e.button + ' (' + e.clientX + ' ' + e.clientY + ') [' + this.application.canvas.clientWidth + ':' + this.application.canvas.clientHeight + ')'); // TODO: remove

        if (e.button === 0) {
            var canvas = this.application.canvas;
        
            if (canvas.clientWidth && canvas.clientHeight) {
                var mouse = this.position;

                mouse.x = (e.clientX / canvas.clientWidth) * 2 - 1;
                mouse.y = -(e.clientY / canvas.clientHeight) * 2 + 1;

                var target = this.application.hitTest.hit(mouse);

                this.application.world.hit(target);
            }
        }
    };


    prototype.onMouseMove = function (e) {
        // TODO
    };
})(window.Container);