(function (container, graphics) {
    "use strict";

    container.prototype.graphics = {
        AmbientLight: graphics.AmbientLight,
        BoxGeometry: graphics.BoxGeometry,
        Mesh: graphics.Mesh,
        MeshBasicMaterial: graphics.MeshBasicMaterial,
        MeshLambertMaterial: graphics.MeshLambertMaterial,
        MeshPhongMaterial: graphics.MeshPhongMaterial,
        PlaneGeometry: graphics.PlaneGeometry,
        PointLight: graphics.PointLight,
        Raycaster: graphics.Raycaster,
        Vector3: graphics.Vector3
    };

    container.prototype.CreateCamera = function (settings) {
        return new graphics.PerspectiveCamera(
            settings.camera.fieldOfViewDegrees,
            1, // Will be reset by resize call before run.
            settings.camera.zNear,
            settings.camera.zFar);
    };
    container.prototype.CreateRenderer = function() { return new graphics.WebGLRenderer(); };
    container.prototype.CreateScene = function () { return new graphics.Scene(); };

    // ReSharper restore InconsistentNaming
})(window.Container, window.THREE);