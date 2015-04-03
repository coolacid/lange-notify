#lange-notify
This is a [NodeCG](http://github.com/nodecg/nodecg) bundle.

This is the notification graphic that I use on [my stream](http://twitch.tv/langeh).
I have open-sourced it so that other developers may learn from it, but I kindly request that it not be used verbatim
on other streams. I worked hard to make something unique that fit well with the rest of my design, and seeing it used
exactly as-is on other streams would be frustrating.

## Demo
<img src="sample.gif?raw=true"/>
(Trimmed and rendered at 25fps to keep GIF size down, actual notification lasts longer and is 60fps)

## Installation
- Install to `nodecg/bundles/lange-notify`
- To listen for subscriptions and resubs, install and configure [lfg-sublistener](https://github.com/SupportClass/lfg-sublistener).
Lange-notify will automatically listen for subscription events from lfg-sublistener.
- To listen to [StreamTip](https://streamtip.com), create `nodecg/cfg/lange-notify.json` with the `clientId` and `accessToken` of the 
StreamTip account that you wish to listen to:
```json
{
    "streamTip": {
        "clientId": "myClientId",
        "accessToken": "myAccessToken"
    }
}
```
- To listen to [Barry's Donation Tracker](http://don.barrycarlyon.co.uk/), install and configure [lfg-doncorleone](https://github.com/SupportClass/lfg-doncorleone).
Lange-notify will automatically listen for donation events from lfg-doncorleone.

### License
lange-notify is provided under the MIT license, which is available to read in the [LICENSE][] file.
[license]: LICENSE
