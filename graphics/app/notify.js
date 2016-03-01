/* global TimelineLite, Elastic, Back, Power2, label, bgs, lfgSound */
(function () {
	'use strict';

	// Permanent GSAP timeline
	var tl = new TimelineLite({autoRemoveChildren: true});

	// Dope constants.
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

	nodecg.listenFor('subscription', 'lfg-nucleus', function (data) {
		var firstMsg = 'NEW SUBSCRIBER';
		if (data.resub) {
			firstMsg = 'RESUB ×' + data.months;
		}

		notify(firstMsg, data.name, {
			colors: SUB_COLORS,
			inSound: 'lange-notify-subscription'
		});
	});

	nodecg.listenFor('tip', 'lfg-nucleus', function (tip) {
		// Got a tip from StreamTip
		notify(tip.formattedAmount + ' TIP', truncateTo25(tip.name), {
			colors: TIP_COLORS,
			inSound: 'lange-notify-tip'
		});
	});

	function notify(firstMsg, secondMsg, opts) {
		firstMsg = firstMsg.toUpperCase();
		secondMsg = secondMsg.toUpperCase();
		opts = opts || {};
		opts.colors = opts.colors || SUB_COLORS;

		var reverseBgs = window.bgs.slice(0).reverse();
		var foremostBg = window.bgs[0];
		var delay = 0;

		// Animate in
		tl.add('npIn');

		tl.call(function () {
			var len = bgs.length;
			for (var i = 0; i < len; i++) {
				bgs[i].color = opts.colors[i];
			}
			lfgSound.play(opts.inSound);
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
			ease: Back.easeOut.config(4),
			autoRound: false
		}, 'npIn+=' + (delay - DELAY_INCREMENT));

		// Show second message
		tl.to(foremostBg, 0.6, {
			onStart: function () {
				lfgSound.play('lange-notify-cut');
			},
			width: 0,
			ease: Elastic.easeIn.config(0.3, 0.4),
			onComplete: function () {
				label.font = SECOND_MSG_FONT;
				label.text = secondMsg;
			}
		}, '+=1.5');

		tl.to(foremostBg, 0.6, {
			width: foremostBg.maxWidth,
			ease: Elastic.easeOut.config(0.3, 0.4)
		}, '+=0.01');

		// Animate out
		delay = 0;

		tl.add('npOut', '+=4');
		tl.call(function () {
			lfgSound.play('lange-notify-out');
		}, null, null, 'npOut');
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
		}

		return text;
	}
})();
