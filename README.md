#lange-notify [![Build Status](https://travis-ci.org/Lange/lange-notify.svg?branch=master)](https://travis-ci.org/Lange/lange-notify)
This is a [NodeCG](http://github.com/nodecg/nodecg) bundle.

This is the notification graphic that I use on [my stream](http://twitch.tv/langeh).
I have open-sourced it so that other developers may learn from it, but I kindly request that it not be used verbatim
on other streams. I worked hard to make something unique that fit well with the rest of my design, and seeing it used
exactly as-is on other streams would be frustrating.

## Demo
<img src="sample.gif?raw=true"/>
(Trimmed and rendered at 30fps to keep GIF size down, actual notification lasts longer and is 60fps)

[60fps YouTube demo w/ sound](https://www.youtube.com/watch?v=yMC4vuoset8)

## Code Walkthrough (v0.0.1, Oct. 6, 2015)
This video goes through every line of code in the first version of bundle. 
It no longer reflects the current state of this bundle, but some may still find it educational. https://www.youtube.com/watch?v=ev0EG4L_Q8s

## Installation
_If you already have NodeCG installed, skip to step #3._

1. Install [Node.js & npm](https://nodejs.org/en/).

2. Open a command prompt and run the following commands to install NodeCG.
Keep this command prompt open after NodeCG has been installed.
	```sh
	npm install -g nodecg-cli
	mkdir nodecg
	cd nodecg
	nodecg setup
	```

3. Install lange-notify and two of the bundles that it depends on.
	```sh
	nodecg install lange/lange-notify
	nodecg install supportclass/lfg-nucleus@^1.1.0
	nodecg install supportclass/lfg-sounds@~0.1.1
	```

4. To listen for subscriptions and resubs, install and configure one of the following:
	- [lfg-sublistener](https://github.com/SupportClass/lfg-sublistener) - **Recommended** Listens directly to Twitch chat.  
		`nodecg install supportclass/lfg-sublistener`
	- [lfg-siphon](https://github.com/SupportClass/lfg-siphon) - Listens to Twitch chat via [Streen](https://github.com/SupportClass/streen).  
		`nodecg install supportclass/lfg-siphon`
  
5. To listen to [StreamTip](https://streamtip.com), install and configure [lfg-streamtip](https://github.com/SupportClass/lfg-streamtip).
	```sh
	nodecg install supportclass/lfg-streamtip
	```

6. Create `nodecg/cfg/lfg-sounds.json` with the following content:
	```json
	{
	  "soundNames": [
		"lange-notify-subscription",
		"lange-notify-tip",
		"lange-notify-cut",
		"lange-notify-out"
	  ]
	}
	```

7. Start NodeCG.
	```sh
	nodecg start
	```

8. Open the dashboard ([`http://localhost:9090/dashboard`](http://localhost:9090/dashboard)) and navigate to the "Uploads" page (top left menu button).
9. Download [these sound files](https://github.com/Lange/lange-notify/tree/master/sounds) and upload them to lfg-sounds.
10. Go back to the main dashboard panels and click "EDIT SOUND ASSIGNMENTS" on the "Sounds" panel.
11. Assign the matching sound file to each of the four sound events.

### Usage
- Add [`http://localhost:9090/graphics/lange-notify`](http://localhost:9090/graphics/lange-notify) 
(or whatever your NodeCG hostname and port are) as a Browser Source in OBS, with dimensions of 992x100
- Use lfg-nucleus' "Notifications" panel on the dashboard to send test subs, resubs, and tips.

### Additional Credits
- Sound design by [Anthony "Airon" Oetzmann](http://aironaudio.weebly.com/) 

### License
lange-notify is provided under the MIT license, which is available to read in the [LICENSE][] file.
[license]: LICENSE
