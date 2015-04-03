(function () {
    'use strict';

    var tl = new TimelineLite({ autoRemoveChildren: true });
    var DELAY_INCREMENT = 0.09;
    var SUB_COLORS = [
        '#e87933',
        '#f6ce14',
        '#6bba82'
    ];
    var TIP_COLORS = [
        '#6bba82',
        '#e87933',
        '#f6ce14'
    ];
    var FIRST_MSG_FONT = '800 65px proxima-nova';
    var SECOND_MSG_FONT = '800 65px proxima-nova';

    nodecg.listenFor('subscription', 'lfg-sublistener', function(data) {
        if (data.resub) {
            notify('RESUB ×' + data.months, data.name, SUB_COLORS);
        } else {
            notify('NEW SUBSCRIBER', data.name, SUB_COLORS);
        }
    });

    nodecg.listenFor('newdonations', 'lfg-doncorleone', function(data) {
        // Got a tip from Barry's Donation Tracker
        data.Completed.forEach(function(donation) {
            var amount = parseFloat(donation.amount.toFixed(2)).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
            notify(amount + ' TIP', truncateTo25(donation.twitch_username), TIP_COLORS);
        });
    });

    nodecg.listenFor('tip', function(tip) {
        // Got a tip from StreamTip
        var amount = parseFloat(tip.amount.toFixed(2)).toLocaleString('en-US');
        notify(tip.currencySymbol + amount + ' TIP', truncateTo25(tip.username), TIP_COLORS);
    });

    function notify(firstMsg, secondMsg, colors) {
        firstMsg = firstMsg.toUpperCase();
        secondMsg = secondMsg.toUpperCase();
        colors = colors || SUB_COLORS;

        // Animate in
        var reverseBgs = bgs.slice(0).reverse();
        var foremostBg = bgs[0];
        var delay = 0;

        tl.add('npIn');

        tl.call(function() {
            var len = bgs.length;
            for (var i = 0; i < len; i++) {
                bgs[i].color = colors[i];
            }
        }, null, null, 'npIn');

        reverseBgs.forEach(function (bg) {
            tl.to(bg, 0.75, {
                width: bg.maxWidth,
                ease: Elastic.easeOut.config(0.3, 0.4)
            }, 'npIn+=' + delay);
            delay += DELAY_INCREMENT;
        });

        tl.to(label, 0.6, {
            onStart: function () {
                label.font = FIRST_MSG_FONT;
                label.text = firstMsg;
            },
            y: label.showY,
            ease: Back.easeOut.config(4)
        }, 'npIn+=' + (delay - DELAY_INCREMENT));

        tl.to(foremostBg, 0.6, {
            width: 0,
            ease: Elastic.easeIn.config(0.3, 0.4),
            onComplete: function () {
                label.font = SECOND_MSG_FONT;
                label.text = secondMsg;
            }
        }, '+=1.5');

        tl.to(foremostBg, 0.5, {
            width: foremostBg.maxWidth,
            ease: Elastic.easeOut.config(0.3, 0.4)
        });

        // Animate out
        delay = 0;

        tl.add('npOut', '+=4');
        bgs.forEach(function (bg) {
            tl.to(bg, 0.7, {
                width: 0,
                ease: Elastic.easeIn.config(0.3, 0.4)
            }, 'npOut+=' + delay);
            delay += DELAY_INCREMENT;
        });

        tl.to(label, 0.467, {
            y: label.hideY,
            ease: Power2.easeIn
        }, 'npOut+=' + delay);

        // Kill time between successive notifications
        tl.to({}, 1, {});
    }

    function truncateTo25(text) {
        var len = text.length;
        if (len > 25) {
            var truncated = text.substring(0, 23);
            truncated += '…';
            return truncated;
        } else {
            return text;
        }
    }
})();
