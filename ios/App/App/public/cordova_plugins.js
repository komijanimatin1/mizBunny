
  cordova.define('cordova/plugin_list', function(require, exports, module) {
    module.exports = [
      {
          "id": "cordova-plugin-clear-data.ClearData",
          "file": "plugins/cordova-plugin-clear-data/www/ClearData.js",
          "pluginId": "cordova-plugin-clear-data",
        "clobbers": [
          "ClearData"
        ]
        },
      {
          "id": "cordova-plugin-inappbrowser.inappbrowser",
          "file": "plugins/cordova-plugin-inappbrowser/www/inappbrowser.js",
          "pluginId": "cordova-plugin-inappbrowser",
        "clobbers": [
          "cordova.InAppBrowser.open"
        ]
        }
    ];
    module.exports.metadata =
    // TOP OF METADATA
    {
      "cordova-plugin-clear-data": "1.0.0",
      "cordova-plugin-inappbrowser": "6.0.1-dev"
    };
    // BOTTOM OF METADATA
    });
    