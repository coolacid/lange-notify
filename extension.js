'use strict';

if (typeof localStorage === 'undefined' || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    var localStorage = new LocalStorage('./db/lange-notify');
}

var DEFAULT_VOLUMES = [
    0.5,
    0.25,
    0.25
];
var SOUND_VOLUME_NAMES = [
    'inVolume',
    'cutVolume',
    'outVolume'
];

module.exports = function(nodecg) {
    // Load and persist volume settings
    SOUND_VOLUME_NAMES.forEach(function(name, index) {
        var initial = localStorage.getItem(name);
        if (initial === null) initial = DEFAULT_VOLUMES[index];
        nodecg.declareSyncedVar({
            name: name,
            initialVal: initial,
            setter: function(newVal) {
                localStorage.setItem(name, newVal);
            }
        });
    });

    // Set up StreamTip
    if (nodecg.bundleConfig.streamTip &&
        nodecg.bundleConfig.streamTip.clientId &&
        nodecg.bundleConfig.streamTip.accessToken) {

        var Streamtip = require('streamtip-listener');
        var listener = new Streamtip({
            clientId: nodecg.bundleConfig.streamTip.clientId,
            accessToken: nodecg.bundleConfig.streamTip.accessToken
        });

        listener.on('connected', function() {
            nodecg.log.info('Connected to StreamTip');
        });

        listener.on('authenticated', function() {
            // Now authenticated, we can expect tip alerts to come through
            nodecg.log.info('Authenticated with StreamTip');
        });

        listener.on('authenticationFailed', function() {
            // ClientID or Access Token was rejected
            nodecg.log.error('StreamTip authentication failed!');
        });

        listener.on('newTip', function(tip) {
            // We got a new tip.
            // 'tip' is an object which matches the description given on the Streamtip API page
            nodecg.sendMessage('tip', tip);
        });

        listener.on('error', function(err) {
            // An unexpected error occurred
            nodecg.log.error('StreamTip error! %s', err.message);
        });
    } else {
        nodecg.log.info('StreamTip configuration missing or incomplete, will not attempt to connect to StreamTip');
    }
};
