(function (container) {
    "use strict";

    var constructor = function (application) {
        this.application = application;
        this.raycaster = new application.graphics.Raycaster();
    };

    // ReSharper disable once InconsistentNaming
    container.prototype.CreateHitTest = function (application) { return new constructor(application); };

    var prototype = constructor.prototype;

    prototype.hit = function (from, to, entities) {
        var raycaster = this.raycaster;

        raycaster.setFromCamera(from, to || this.application.camera);

        var intersects = raycaster.intersectObjects(entities || this.application.world.entities);
        var hit = intersects.length > 0 ? intersects[0] : null;

        return hit? hit.object: null;
    };
})(window.Container);
