(function (container) {
    "use strict";

    var constructor = function (application) {
        this.application = application;
        this.hitTest = new application.graphics.Vector3();
        this.raycaster = new application.graphics.Raycaster();
    };

    // ReSharper disable once InconsistentNaming
    container.prototype.CreateMouse = function (application) { return new constructor(application); };

    var prototype = constructor.prototype;


    prototype.onMouseDown = function (e) {
        this.application.logger.log('Click' + e.button);
        e.preventDefault();

        if (e.button == 0) {
            var target = this.application.target;
        
            if (target.clientWidth && target.clientHeight) {
                var camera = this.application.camera;
                var mouse = this.hitTest;
                var raycaster = this.raycaster;
                var world = this.application.world;

                mouse.x = (e.clientX / target.clientWidth) * 2 - 1;
                mouse.y = -(e.clientY / target.clientHeight) * 2 + 1;

                raycaster.setFromCamera(mouse, camera);

                var intersects = raycaster.intersectObjects(world.entities);

                if (intersects.length > 0) {
                    var hit = intersects[0];

                    if (hit && hit.object)
                    {
                        this.application.logger.log('Hit ' + (hit.object.name || 'Unknown'));
                    }
                }
            }
        }
    };


    prototype.onMouseMove = function () {
        // TODO - remove: this.application.logger.log('Move: ' + e.clientX + ', ' + e.clientY);
    };
})(window.Container);