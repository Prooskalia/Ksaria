(function() {
    "use strict";

    if (typeof (window.Container) === 'undefined') {
        window.Container = function() { };
    }


    window.Container.runApplication = function () {
        var application = (new window.Container()).CreateApplication();
        
        application.run();
    };
})();