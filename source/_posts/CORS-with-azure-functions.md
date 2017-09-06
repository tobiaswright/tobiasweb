---
title: Getting around CORS with Azure Functions
date: 2017-05-25 11:30:10
tags: Azure Functions, CORS, How-to
description: Cross domain scripting!
---

[Cross Origin Resource (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS) sharing is a security issue on most browsers that prevent making client side request via http from two different domain. Great for security, sucks for making ajax request.

Luckily there are a few ways around it, the way I use to do it is when I first started was use to use a php proxy and upload it to heroku and hit the endpoint using JSONP. I used that for a long time, until nodeJS came along and I switched from php to node.

These days I use nodeJS and [Azure Functions](https://docs.microsoft.com/en-us/azure/azure-functions/functions-overview).

First let me say, I can't stress how much easier developments is if you are not [developing functions locally](https://docs.microsoft.com/en-us/azure/azure-functions/functions-run-local), it takes a few moments, but well worth the time to get it up and running.

To get started create a new Azure Function in the portal - if you don't have an Azure account you can [try Functions for free](https://docs.microsoft.com/en-us/azure/azure-functions/functions-run-local).

Using the [Marvel API](https://developer.marvel.com/), I simply want to bring up a list of events the [Hulk](https://marvel.com/characters/25/hulk) has been involved in.

Here's the NodeJS code I'll be using:

{% gist ac517a951cef07ba20ad24d83083a67d %}

To get it in a Azure Function, we need to fill out a few details:

<img src="/images/createFunc.png" alt="Creating a Function" style="width: 200px;"/>


Run npm install to deploy the packages in your package.json (I'm using request) in the command line that Azure gives use under Platform features > console

Now, take care of the CORS issue under Platform features > CORS, you can use a wildcard so that any request will be honored, but in the real world you'll want to make sure to fill in the information with the exact domain that will be hitting this endpoint.

Grab you endpont, and you are all set. Here's a postman screen grab

![Postman!](/images/postman.png)