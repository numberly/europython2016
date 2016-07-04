(function(global) {
    var map = {
        "app":                        "app",
        "@angular":                   "node_modules/@angular",
        "angular2-in-memory-web-api": "node_modules/angular2-in-memory-web-api",
        "rxjs":                       "node_modules/rxjs"
    };
    var packages = {
        "app":                        {main: "main.js", defaultExtension: "js"},
        "rxjs":                       {defaultExtension: "js" },
        "angular2-in-memory-web-api": {main: "index.js", defaultExtension: "js"},
        "@angular/router":            {main: "index.js", defaultExtension: "js"},
        "@angular/forms":             {main: "index.js", defaultExtension: "js"}
    };
    var ngPackageNames = [
        "common",
        "compiler",
        "core",
        "http",
        "platform-browser",
        "platform-browser-dynamic",
        "upgrade",
    ];
    function packIndex(pkgName) {
        packages["@angular/" + pkgName] = {main: "index.js",
                                           defaultExtension: "js"};
    }
    function packUmd(pkgName) {
        packages["@angular/" + pkgName] = {main: "/bundles/" + pkgName + ".umd.js",
                                           defaultExtension: "js"};
    }
    var setPackageConfig = System.packageWithIndex ? packIndex : packUmd;
    ngPackageNames.forEach(setPackageConfig);
    System.config({map: map, packages: packages});
})(this);
