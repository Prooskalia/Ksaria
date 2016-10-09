(function (container) {
    "use strict";

    var constructor = function (factory) {
        this._isRunning = false;

        this.graphics = factory.graphics;
        this.logger = console;
        this.settings = new factory.CreateSettings();

        this.avatar = new factory.CreateAvatar();
        this.camera = factory.CreateCamera(this.settings);
        this.keyboard = new factory.CreateKeyboard();
        this.mouse = new factory.CreateMouse(this);
        this.renderer = new factory.CreateRenderer();
        this.scene = new factory.CreateScene();
        this.world = new factory.CreateWorld();
    };

    // ReSharper disable once InconsistentNaming
    container.prototype.CreateApplication = function () { return new constructor(this); };

    var prototype = constructor.prototype;

    prototype.run = function () {
        if (this._isRunning) {
            this._log('Application is already running.');
        } else {
            this._isRunning = true;
            document.body.appendChild(this.renderer.domElement);

            var application = this;

            var resize = function () {
                var height = window.innerHeight;
                var width = window.innerWidth;

                application.renderer.setSize(width, height);
                application.camera.aspect = width / height;
                application.camera.updateProjectionMatrix();
            };

            var render = function () {
                if (application._isRunning) {
                    requestAnimationFrame(render);
                    application.world.update(application);
                    application.avatar.update(application);
                    application.renderer.render(application.scene, application.camera);
                }
            };
           
            window.addEventListener('contextmenu', function (e) { e.preventDefault(); }, false);
            window.addEventListener('focus', function () { application.keyboard.reset(); }, false);
            window.addEventListener('keydown', function (e) { application.keyboard.onKeyDown(e); }, false);
            window.addEventListener('keyup', function (e) { application.keyboard.onKeyUp(e); }, false);
            window.addEventListener('mousedown', function (e) { application.mouse.onMouseDown(e); }, false);
            window.addEventListener('mousemove', function (e) { application.mouse.onMouseMove(e); }, false);
            window.addEventListener('resize', resize, false);

            resize();
            application.world.load(this);
            render(this);
        }
    };
})(window.Container);