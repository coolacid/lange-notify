'use strict';

var $panel = $bundle.filter('.notify');
var $show = $panel.find('.js-show');
var $type = $panel.find('input:radio[name="manualType"]');
var $name = $panel.find('.ctrl-name');
var $months = $panel.find('.ctrl-months');
var $amount = $panel.find('.ctrl-amount');
var $send = $panel.find('.ctrl-send');

var VOLUMES = [
    'inVolume',
    'cutVolume',
    'outVolume'
];

$show.click(function() { nodecg.sendMessage('pulse'); });

$type.change(function() {
    var val = $type.filter(':checked').val();

    if (val === 'subscription') {
        $months.removeClass('hidden');
        $amount.addClass('hidden');
    } else {
        $months.addClass('hidden');
        $amount.removeClass('hidden');
    }
});

$send.click(function () {
    var name = $name.find('input').val();
    var type = $type.filter(':checked').val();
    var months = $months.find('input').val();
    var amount = $amount.find('input').val();

    if (type === 'subscription') {
        nodecg.sendMessageToBundle('subscription', 'lfg-sublistener', {
            name: name,
            resub: months > 0,
            months: months
        });
    } else if (type === 'tip') {
        nodecg.sendMessage('tip', {
            username: name,
            amount: parseFloat(amount),
            currencySymbol: '$'
        });
    }
});

VOLUMES.forEach(function(volume) {
    var $slider = $panel.find('input[name="'+volume+'"]');

    nodecg.declareSyncedVar({
        name: volume,
        setter: function(newVal) {
            $slider.slider('setValue', newVal);
        }
    });

    $slider.slider({
        value: 0.3,
        step: 0.01,
        min: 0,
        max: 1
    }).on('slideStop', function(slideEvt) {
        nodecg.variables[volume] = slideEvt.value;
    });
});
