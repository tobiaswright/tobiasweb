---
title: Syndicating Medium post with Azure Logic Apps
date: 2017-08-17 12:57:34
tags: Azure, Logic Apps, RSS, Azure Functions
description: Can't we just make RSS easy?
---

In full transparency, I want more out of [Logic Apps](https://azure.microsoft.com/en-us/services/logic-apps/) (which is the same as [Microsoft Flow](https://us.flow.microsoft.com/en-us/), but Flow is more UI friendly - also at first blush it seems to be an [IFTTT](https://ifttt.com/discover ) clone, but I'm not so convinced now), it was always hard for me to find a good use for them. That is until I found there's no easy way to display my Medium post on my website. There are ways I could have brought the posts in, most likey using just Functions, but I didn't want to do it the same way again, so why not try something new. Enter Logic Apps.

__Problem:__ Bring in the RSS feed from Medium and sydicate it to my site

__Tools:__ Azure Logic Apps, Azure Functions, Azure Blob Storage, Javascript

__Requirement:__ I don't want to have to think about this again. Ever.

Here's a quick wireframe of the first version.

<img src="/images/logicappwire1.PNG" alt="Logic Apps Wireframe">

There were a couple of problems with this. First. It only checked the RSS feed when something was added. So what if I wanted to delete a post or update a post? I'd have no other way to update the feed.

Also, my final step was an Azure Function, which really makes no sense since Functions are essentially a passthru, and I can always save straight to CosmosDB as apart of Logic Apps, especially since after collecting the RSS feed it ransforms it to JSON.

Here's what I came up with next:

<img src="/images/logicappwire2.PNG" alt="Logic Apps Wireframe">

So a few changes here. I decided that I'd still kick off the Logic App on update, but I'd grab the whole feed as the next step. Now any updates would be included when adding to the feed. Still need to add an item to kick that off though. I'll fix that in the next version.

I also end the Logic App with saving to CosmoDB and updating a record with the feed download. I'd figure I create an Azure Function to pull the feed in my site with javascript.

Almost there I think...

<img src="/images/logicappwire3.PNG" alt="Logic Apps Wireframe">

I decided to switch out the kick off on new add and just check the feed once a day. cool. Also, I switched out CosmoDB to Azure Blob. Blobs are cheaper, and I don't really need the overhead of a NoSQL database. A data dump is fine.

<img src="/images/logicapps1.png" alt="Logic Apps Screenshot" style="width:300px;display:table;margin-right: auto;margin-left: auto;">

You'll notice a couple of changes. One, I found that I couldn't jump right blob storage for some reason, it wanted to evalute every item in a for-each loop. I found the easiest way is just to use a compose connector and capture the body data - aka the feed.

Also, I wanted to do some defensive coding by making a fallback if the blob does not exsist, but it does assume you have a container called medium. I don't see a way to create a blob container. Remember when I said I want Logic Apps to do more?

Okay, so here's the Logic App Code.

<script src="https://gist.github.com/tobiaswright/f02cfbe181e8505f4295acabed8c3525.js"></script>

Here's the Azure Function I used to grab the contents when I make the ajax call from the site.

<script src="https://gist.github.com/tobiaswright/a8ba4cc0621c51c5fb3c7131c6495cb1.js"></script>

Here's the javascript I'm using to make the call.

<script src="https://gist.github.com/tobiaswright/1be0723582413b5b42cbbe989c6df772.js"></script>

__Learnings__
- I messed around with conditionals quite a bit while doing this, while none of it ended up in my solution, there is no built in boolean, [you can workaround it](https://stackoverflow.com/questions/42652095/boolean-not-working-in-logic-app-condition).
- Make sure the Logic App and the Function are connected to same storage resource. It makes life easier.
- I still want Logic Apps to do more...

Enjoy!