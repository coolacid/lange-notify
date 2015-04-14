'use strict';

var $panel = $bundle.filter('.notify');
var $show = $panel.find('.js-show');
var $type = $panel.find('input:radio[name="manualType"]');
var $name = $panel.find('.ctrl-name');
var $months = $panel.find('.ctrl-months');
var $amount = $panel.find('.ctrl-amount');
var $send = $panel.find('.ctrl-send');

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

// Create bootstrap sliders
$panel.find('input[ctrltype="slider"]').each(function(i, el) {
    var $el = $(el);
    var name = $el.attr('name');
    $el.slider({
        value: 0.3,
        step: 0.01,
        min: 0,
        max: 1
    }).on('slideStop', function(slideEvt) {
        soundVolumes.value[name] = slideEvt.value;
    });
});

var soundVolumes = nodecg.Replicant('soundVolumes');
soundVolumes.on('change', function(sounds) {
    for (var sound in sounds) {
        if (!sounds.hasOwnProperty(sound)) continue;
        var $slider = $panel.find('input[name="'+sound+'"]');
        $slider.slider('setValue', sounds[sound]);
    }
});
