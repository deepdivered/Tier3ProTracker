# Tier3ProTracker

### Tracker Installation Note
The tracker is enclosed within an `Immediately Invoked Function Expression` or `IIFE`

The Confluence document for the tracker has data separated into sections in order to allow proper integration within the page.

The `index.html` file has two comments with delineate the separation from the standalone tracker and the confluence tracker.

The `index.js` file is by default lacking two private API URLs. The `feedbackApiUrl` and the `slackApiUrl` are intentionally kept off of Git. Please ensure that you replace the API variables when posting on confluence and conversely remove the variables when pushing to git.

### Usage instructions
1. Enter Customer Number And The Caller Name
2. Explain The Situation And Check Related Topics
3. Specify Resolution Information
4. Click Parse To Generate Notes And Submit To Slack.
5. Submit Pro Feedback If Applicable.
6. All Done!

## Version 1.0 Features Vs Planned Features
 [X] Parse provided call data for notes template generation.
 
 [X] Submit to tracker Slack channel.
 
 [X] Submits feedback to Database through feedback API.
 
 [ ] Live parsing of agent data. (remove parse button)
 
 [ ] Convert from Webhook to Slackbot. (refactor into node)

