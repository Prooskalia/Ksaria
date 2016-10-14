(function (container) {
    "use strict";

    var constructor = function (factory) {
        this.isRunning = false;

        this.assert = function (condition, message) { if (!condition) { throw message; } };
        this.console = document.getElementById('console');
        
        this.assert(!factory.application, "factory: redefinition of application");
        this.assert(factory.graphics, "graphics: not defined");
        
        factory.application = this;
        this.graphics = factory.graphics;
        this.display = function (message) { this.console.innerText = message; };
        this.log = function (message) { console.log(message); };
       
        this.settings = new factory.CreateSettings();
        this.avatar = new factory.CreateAvatar();
        this.camera = factory.CreateCamera(this.settings);
        this.keyboard = new factory.CreateKeyboard();
        this.mouse = new factory.CreateMouse(this);
        this.renderer = new factory.CreateRenderer();
        this.scene = new factory.CreateScene();
        this.world = new factory.CreateWorld(this);

        this.canvas = this.renderer.domElement;
        this.hitTest = new factory.CreateHitTest(this);
    };

    // ReSharper disable once InconsistentNaming
    container.prototype.CreateApplication = function () { return new constructor(this); };

    var prototype = constructor.prototype;

    prototype.run = function () {
        if (this.isRunning) {
            this._log('Application is already running.');
        } else {
            this.isRunning = true;
            document.body.appendChild(this.canvas);

            var application = this;

            var resize = function () {
                var height = window.innerHeight;
                var width = window.innerWidth;

                application.renderer.setSize(width, height);
                application.camera.aspect = width / height;
                application.camera.updateProjectionMatrix();
            };

            var render = function () {
                if (application.isRunning) {
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
            render();
        }
    };
})(window.Container);