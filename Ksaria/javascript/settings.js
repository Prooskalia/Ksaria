(function (container) {
    "use strict";

    var constructor = function () {
        this.avatar = {
            motionStepSize: 0.1,
            rotationStepSize: Math.PI / 180
        };

        this.camera = {
            fieldOfViewDegrees: 45,
            zFar: 1000,
            zNear: 0.1
        };
    };

    // ReSharper disable once InconsistentNaming
    container.prototype.CreateSettings = function () { return new constructor(); };
})(window.Container);