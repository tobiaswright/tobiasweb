---
title: Getting Locally run Azure Functions going with Azure CosmosDB Emulator
date: 2017-10-19 16:17:36
tags: Azure, Azure Functions, ComosDB, Emulator
---

If you are anything like me, I just really love getting things running locally. Not only that, I like to get things running locally, then getting it up to server almost as easily.

__Problem:__ I want to connect Locally run Azure Function to the [Azure CosmosDB Emulator](https://docs.microsoft.com/en-us/azure/cosmos-db/local-emulator) so I can do all my developing on my ‘puter

__Tools:__ Azure Function CLI, Azure CosmoDB emulator

__Requirements__
* Azure Function running locally – This is pretty well covered in the [documentation](https://docs.microsoft.com/en-us/azure/azure-functions/functions-run-local) and out of scope for this post
* [Download Azure Cosmos DB Emulator](https://docs.microsoft.com/en-us/azure/cosmos-db/local-emulator) and install – Again very well covered in the documentation

### Step 1: Create your function.
My function is straight forward. I’m using a httptrigger function, and have data coming in from a form. Then saving that to CosmosDB. The important part here is the property outputDocument – which we define in functions.json.

<script src="https://gist.github.com/tobiaswright/26c247c84a483c8fd66e16bfbf7d6c87.js?file=azureFunction"></script>


### Step 2: Add the settings to the function.json
Below are the settings you want to add to the functions.json

<script src="https://gist.github.com/tobiaswright/26c247c84a483c8fd66e16bfbf7d6c87.js?file=functionJsonSnippet"></script>

Let’s go line by line:

| Key  | Value |
| ------------- | ------------- |
| __type:__  | This is what you are saving to. documentDB, this is what cosmosDB use to be called |
| __name:__  | This where we define the variable that we can use in the function |
| __databaseName, collectionName:__ | This the schema of the CosmosDB, which is a NoSQL database. [A more indepth  explanation can be found here](https://docs.microsoft.com/en-us/azure/cosmos-db/introduction). |
| __createIfNotExists:__ | I like to set this as true, it saves a little bit of time and manually effort once you get this up to the cloud. If set to true, it’ll check  see if the db and collection  exist, The default is false. I’’m not sure why, it’s just a small piece of defensive coding in my opinon and should always be set to true |
| __connection__ | This is important. This is the variable we’ll assign the connection string. This is thing that makes it super easy to get this up to the cloud. We’ll look where to define this in the next step. |
| __direction__ | basically means which direction this add-in is going, in or out the function |

Here’s my whole functions.json for context:

<script src="https://gist.github.com/tobiaswright/26c247c84a483c8fd66e16bfbf7d6c87.js?file=functionJson"></script>


### Step 3: Setup connection string variable
This is where we set up the connection to the emulator. This is where the magic happens.

In your local.settings.json add this line to the Values object:

<script src="https://gist.github.com/tobiaswright/26c247c84a483c8fd66e16bfbf7d6c87.js?file=localSettingsSnippit"></script>

To connect things in Azure you need the endpoing and the account key. In this instance we know that the emulator, according to the documention, once running is always this

<script src="https://gist.github.com/tobiaswright/26c247c84a483c8fd66e16bfbf7d6c87.js?file=emulationKey"></script>

You’ll also notice that the key is crmdb, the same as in the function.json

Here’s my whole local.settings file for context.

<script src="https://gist.github.com/tobiaswright/26c247c84a483c8fd66e16bfbf7d6c87.js?file=localSettings"></script>

And that’s basically it. Once this piece is in, then you should be good to go.

__Learnings__
* Make sure you emulator is running, You should be able to see it at https://localhost:8081/
* This will not create the DB in Azure for you, so make sure to set that up. You will not have to connect your azure function to the DB, it’ll do that once you get your Azure function in Azure and all its component
* Make sure you have the same variable name you have created to indicate the DB locally created in Azure too, you have to do it manually
* Make sure when you do create that database on Azure, it’s the settings you have set up in the emulator – the Mongo API, for example, expects a certain scheme when saving
* All and all, this is pretty straight forward and saves me a ton of development time.