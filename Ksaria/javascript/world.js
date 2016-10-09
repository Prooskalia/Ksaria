(function (container, graphics) {
    "use strict";

    var constructor = function (application) {
        this.entities = [];
    };

    // ReSharper disable once InconsistentNaming
    container.prototype.CreateWorld = function () { return new constructor(); };

    var prototype = constructor.prototype;


    prototype.load = function (application) {
        var factory = application.graphics;
        var scene = application.scene;

        scene.add(new factory.AmbientLight(0x808080));

        var pointLight = new factory.PointLight(0xFFFFFF, 1, 0, -3);

        pointLight.position.set(2, 0, 2);
        scene.add(pointLight);

        var cubeGeometry = new factory.BoxGeometry(1, 1, 1);
        //var cubeMaterial = new factory.MeshLambertMaterial({ color: 0x904000 });
        //var cubeMaterial = new factory.MeshPhongMaterial({ ambient: 0x050505, color: 0x0033ff, specular: 0x555555, shininess: 30 });
        var cubeMaterial = new factory.MeshPhongMaterial({ map: THREE.ImageUtils.loadTexture('images/crate.jpg') });
        var cube = new factory.Mesh(cubeGeometry, cubeMaterial);

        cube.position.set(0, 0, -5);
        cube.name = 'Cube';
        this.cube = cube;
        this.entities.push(cube);
        scene.add(cube);

        var spriteGeometry = new factory.PlaneGeometry(3, 2);
        var spriteMaterial = new factory.MeshBasicMaterial({ color: 0x4000C0, side: graphics.FrontSide });
        var sprite = new factory.Mesh(spriteGeometry, spriteMaterial);

        sprite.position.set(-1.5, 0, -5);
        sprite.name = 'Sprite';
        this.entities.push(sprite);
        scene.add(sprite);
    };


    prototype.update = function () {
        this.cube.rotation.x += 0.01;
        this.cube.rotation.y += 0.01;
    };
})(window.Container, window.THREE);
