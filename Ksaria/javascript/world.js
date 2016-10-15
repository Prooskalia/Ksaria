(function (container) {
    "use strict";

    var constructor = function (application) {
        this.application = application;
        this.entities = [];
    };

    // ReSharper disable once InconsistentNaming
    container.prototype.CreateWorld = function (application) { return new constructor(application); };

    var prototype = constructor.prototype;

    prototype.load = function () {
        var graphics = this.application.graphics;
        var scene = this.application.scene;

        scene.add(new graphics.AmbientLight(0x808080));

        var pointLight = new graphics.PointLight(0xFFFFFF, 1, 0, -3);

        pointLight.position.set(2, 0, 2);
        scene.add(pointLight);

        var cubeGeometry = new graphics.BoxGeometry(1, 1, 1);
        //var cubeMaterial = new graphics.MeshLambertMaterial({ color: 0x904000 });
        //var cubeMaterial = new graphics.MeshPhongMaterial({ ambient: 0x050505, color: 0x0033ff, specular: 0x555555, shininess: 30 });
        var cubeMaterial = new graphics.MeshPhongMaterial({ map: graphics.ImageUtils.loadTexture('images/crate.jpg') });
        var cube = new graphics.Mesh(cubeGeometry, cubeMaterial);

        cube.position.set(0, 0, -5);
        cube.name = 'Crate';
        this.cube = cube;
        this.entities.push(cube);
        scene.add(cube);

        var spriteGeometry = new graphics.PlaneGeometry(3, 2);
        //var spriteMaterial = new graphics.MeshBasicMaterial({ color: 0x4000C0, side: graphics.FrontSide });
        var spriteMaterial = new graphics.MeshPhongMaterial({ map: graphics.ImageUtils.loadTexture('images/wall_diffuse_1.jpg') });
        var sprite = new graphics.Mesh(spriteGeometry, spriteMaterial);

        sprite.position.set(-1.5, 0, -5);
        sprite.name = 'Wall';
        this.entities.push(sprite);
        scene.add(sprite);
    };


    prototype.hit = function (target) {
        if (target) {
            this.application.display('Hit: ' + (target.name || 'Unknown'));
        } else {
            this.application.display('');
        }
    };


    prototype.update = function () {
        this.cube.rotation.x += 0.01;
        this.cube.rotation.y += 0.01;
    };
})(window.Container);
