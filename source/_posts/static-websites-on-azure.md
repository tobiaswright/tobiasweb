---
title: Continous deployment of static websites on Azure
date: 9-27-18 00:01:24
tags: Azure DevOps, Azure Pipelines, CI/CD, static website, Azure
description: Finally! Static websites on Azure
---

Azure finally has the ability to host static websites straight from storage! This is great news since I do a lot of client-side development that have minimal back-ends

It’s not as quick and easy as some of the services that specialize in hosting static sites, especially if you like to use the CLI, but if you’ve invested in the Azure ecosystem and you like static sites it’s definitely worth looking into.

The feature is in preview and may break at some point before general release. Consider yourself warned. I myself will be using this in my most crucial production sites, because I’m about that life.
Here’s how you do it

1.	Set up a general purpose storage in the portal. In the left hand panel, you’ll see the option to create a static site. You’ll want to enable static sites, designate your index file and optionally give a link to a 404 page
2.	This will create a container a container in blob storage, called $web. It also gives you the endpoint for your site
![screeshot](/images/st2.jpg)

3.	With that done, you are done. You can upload your static files from the portal, storage explorer or the CLI, however if you are interested in continuous integration, read on
![screeshot](/images/st4.jpg)

4.	Crack open Azure DevOps, and create a new project.
5.	Go to Azure pipeline and click on Pipelines>Releases>New Pipeline. Start with an Empty Job.
![screeshot](/images/st5.jpg)

6.	Skip adding a task to Stage 1 first, and add an artifact. I have a really simple web page so I don’t need to build anything before release, so I connect my github as a service to this project and  release straight from commits to get the artifacts
7.	Click on the thunderbolt and enable continuous deployment trigger
![screeshot](/images/st6.jpg)

8.	Now click on Task>Stage 1, add a new task and search for Azure File Copy
![screeshot](/images/st7.jpg)

7. Be sure to change the version to 2.*. Once you authorize your subscription, it’ll auto-fill in almost all of the fields, but you will need to type in $web for the container
![screeshot](/images/st8.jpg)

9.	Click save. Boom, all done

So now you have CI/CD with static website on Azure – go ahead, make a commit

## Gotchas
* Remember to set you trigger for continuous integration
* Be sure to toggle to version 2 in AZ copy