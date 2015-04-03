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
