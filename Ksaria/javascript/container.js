(function() {
    "use strict";

    if (typeof (window.Container) === 'undefined') {
        window.Container = function() { };
    }


    window.Container.runApplication = function () {
        (new window.Container()).CreateApplication().run();
    };
})();