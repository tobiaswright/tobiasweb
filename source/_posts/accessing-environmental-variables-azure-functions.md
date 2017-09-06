---
title: Accessing process.env variables in Azure Functions
date: 2017-05-16 00:01:24
tags: Functions, Azure
description: Because it took me so long to figure this out
---

Just thought I'd document this real quick, since it's not super clear in the documentation, at least for developing Azure Function locally. On the server it's clearer, but I'll cover that too. It took me a couple of days to find the answer - and in all truth, I kind of stumbled on to the solution.

[In this article](https://docs.microsoft.com/en-us/azure/azure-functions/functions-reference-node) they tell you you can access variables at runtime, and my assumption was I could add the value pair to local.settings.json (It use to be called appsettings.json). I do just that and...nothing - variable does not exist.

local.settings.json:
```
{
  "IsEncrypted": false,
  "Values": {
    "secretKey": "mycoolsecretkey",
  }
}
```

index.js
```
context.log(process.env["secretKey"])
//returns undefined
```


What you have to do is add this object to the configuration array in luanch.json
```
{
    "type": "node",
    "request": "attach",
    "name": "Attach to Process",
    "processId": "${command:PickProcess}",
    "port": 5858
}
```
And viola it works. Locally, in Visual Studio Code, when you open up luanch.json if gives you a bunch of other basic config options to create at runtime, so if a thing is not working and you think is should be try checking that out. I kind of stumbled on this file while trying to debug this issue.

In the portal add the variables to Platform features > Applications settings
	
![screeshot](/images/appsettings.PNG)