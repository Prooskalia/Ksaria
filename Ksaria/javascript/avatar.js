(function (container) {
    "use strict";

    var constructor = function () { };

    // ReSharper disable once InconsistentNaming
    container.prototype.CreateAvatar = function () { return new constructor(); };

    var prototype = constructor.prototype;
    
    prototype.update = function (application) {
        var camera = application.camera;
        var keyboard = application.keyboard;
        var settings = application.settings.avatar;

        if (keyboard.isKeyDown(65)) {
            camera.rotation.y += settings.rotationStepSize;
        }

        if (keyboard.isKeyDown(68)) {
            camera.rotation.y -= settings.rotationStepSize;
        }

        if (keyboard.isKeyDown(87)) {
            camera.position.add(camera.getWorldDirection().multiplyScalar(settings.motionStepSize));
        }

        if (keyboard.isKeyDown(83)) {
            camera.position.add(camera.getWorldDirection().multiplyScalar(-settings.motionStepSize));
        }
    };
})(window.Container);
