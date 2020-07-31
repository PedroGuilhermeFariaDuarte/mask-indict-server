# mask-indict-api

Welcome the Mask Indict API

Here, you will find all the information needed to download and run the Mask Indict API

**What is Mask Indict API**

The Maks Indict API is a API for a [application](https://github.com/deboralbarros/mask-indict) low-cost, plug-and-play, for searching for people without pets, can be used in different environments just by the user having a smartphone and a Wi-Fi connection.

the api can be run in any basic environment, as it is a Node.JS application, the device capable of running a current operating system already enough, thus being a perfect target for small businesses or companies that do not think about investing a very high value.

# All technologies

1ª [Node.JS](https://nodejs.org/en/)

2ª [Yarn](https://yarnpkg.com/)

3ª [MongoDB](https://www.mongodb.com/)

You can install all of them completely manually, just click on the list items, you will be redirected to the technology website. :)

**Did you like that? let's install :)**

First, Will install some dependencies for help us during others installation packages :P

1ª **Chocolatey**

  This software allows you to install Node.JS and Yarn in an extremely simple and hassle-free way.
  
  **Access the website [Chocolatey](https://chocolatey.org/) e follow all steps for installing.**
  
  Made Chocolatey installation, in your cmd/powersheel open how Administrator, execute the  run the followings commands:
  
  ```bash
    #First#
    choco --v
    #your response well be like with: Chocolatey v0.10.15#
  ```
  now
  
  ```bash
  choco install nodejs-lts
  #wait for the installation of the dependencies, chocolatey may ask some questions, I recommend that you answer positively in all questions#
  ```
  
  with end node.js intallation, now
  
  ```bash
  choco install yarn
  #wait for the installation of the dependencies, chocolatey may ask some questions, I recommend that you answer positively in all questions#
  ```
  
  with end Yarn intallation, last install with choco,now
  
  ```bash
  choco install adb
  #wait for the installation of the dependencies, chocolatey may ask some questions, I recommend that you answer positively in all questions#
  ```
  
 Now, on the same terminal or in a new case prefer, selected a directory and run the following command
 
 ```bash
 git clone https://github.com/deboralbarros/mask-indict-server.git
 #git is not part of api dependencies because you might want to use it to download a repository or something like that, so make sure GIT is installed in tour machine#
 ```
 
 **Ready!**
 
**Something very important**

Make sure NodeJS is configured in your environment, See [How to set up environment variables on Windows](http://www.dowdandassociates.com/blog/content/howto-set-an-environment-variable-in-windows-command-line-and-registry/#:~:text=%20HowTo%3A%20Set%20an%20Environment%20Variable%20in%20Windows,Registry.%20WarningThis%20method%20is%20recommended%20for...%20More%20)

 
 **How to use it ?, is very simples! \o\ \o/ /o/**
 
 In the directory you downloaded the clone or past of mask indict, run the following command
 
 ```bash
 yarn install
 ```
 
 done this, open the Mask Indict directory (no problem if you opened it before installing the packages), you should
 
 you will view a series of files, and the file we need is called **.env.exemple**, open it
 
 **Why do we need him? It will be through this file that Mask Indict will know where to look for the answers to the requests received**
 
 now, copy all content and create a new file, called *.env* at the root of the folder e paste content. you're going to be something like that:
 
 ```env
 # API
API_PORT = YOUR_VALUE

# DATABASE
DB_NAME = YOUR_VALUE
DB_USERNAME = YOUR_VALUE
DB_PASSWORD = YOUR_VALUE
DB_HOSTNAME = YOUR_VALUE

# WATSON
WATSON_API_KEY = YOUR_VALUE
WATSON_ENDPOINT = YOUR_VALUE
WATSON_COLLECTIONID = YOUR VALUE

# JEST
DATABASE_FIND_ID_USER = YOUR_VALUE
DATABASE_DELETE_ID_USER = YOUR_VALUE
DATABASE_UPDATE_ID_USER = YOUR_VALUE

# JWT
JWT_secret = YOUR_VALUE
JWT_expiresIn = YOUR_VALUE

 ```
 
 **Add your values according to the auto descriptive name of the environment variables that are within the open file, .env**
 
 For exemple, **WATSON_API_KEY** is a Key, Watson is an access key to IBM's Artificial Intelligence Services, Watson
 
** Attention!**
In pars DB_SOMETHING, this values are for connections to the MongoDB server

Was in doubt ?, no problems :), see below:

 ```env
 # API
API_PORT = 3333 -> FREE PORT IN YOUR MACHINE

# DATABASE
DB_NAME = my database name (MongoDB)
DB_USERNAME = my username (MongoDB)
DB_PASSWORD = my password (MongoDB)
DB_HOSTNAME = YOUR_VALUE/IGNORE THIS

# WATSON
WATSON_API_KEY = GET YOUR API KEY IN CLOUD IBM
WATSON_ENDPOINT = GET YOUR URL IN CLOUD IBM
WATSON_COLLECTIONID = GET YOUR COLLECTION IN CLOUD IBM

# JEST
DATABASE_FIND_ID_USER = A ID FOR TEST
DATABASE_DELETE_ID_USER = A ID FOR TEST
DATABASE_UPDATE_ID_USER = A ID FOR TEST

# JWT
JWT_secret = YOUR SECRET, FOR CORRECT AUTHENTICATION
JWT_expiresIn = YOUR TIME -> 7d(Seven days) -> 2(Two days)

 ```
 
 **Request and Response**
 
See abelow all endpoints available

Method **GET**

  1ª */signin/account/:username/:password* 
  
  response
  ```json
  {
    "code": "200(HTTP Status Code)", "message": "Your was authenticate with success", "authorization": "A token JSON WEB TOKEN",
    "personal": "A object with all user data"
  }
  ```
  
  2ª */signout/account/:idUser*
  
  response
  ```json
  {
    "code": "200(HTTP Status Code)"
  }
  ```
  
  3ª */show/user/:idUser*
  
  response
  ```json
  {
    "code": "200(HTTP Status Code)",
    "data": "A object with all user data"
  }
  ```
  
  4ª */all/user/*
  
  response
  ```json
  {
    "code": "200(HTTP Status Code)",
    "data": "A object with all user data"
  }
  ```
  
Method **POST**

  1ª */create/account*

Method **PUT**
  
  1ª */update/account/:idUser*
  
    response
  ```json
  {
    "code": "200(HTTP Status Code)",
    "data": "A object with all user data"
  }
  ```

Method **DELETE**
 
 1ª */delete/account/:idUser*
 
   response
  ```json
  {
    "code": "200(HTTP Status Code)",
    "message": ""    
  }
  ```
 
 
 Open directory Database, and 
 
 ```js
 // replace
 const response = mongoose.connect(`mongodb+srv://${this.username}:${this.password}@YOUR_CLUSTER/${this.databasename}?retryWrites=true&w=majority`, {
 // to
 const response = mongoose.connect(`mongodb+srv://${this.username}:${this.password}@YOUR_CLUSTER_HOST_GET_IN_MongoDBAtlas/${this.databasename}?retryWrites=true&w=majority`, {
 ```
 
 **Available commands**
 
 1ª To Build *mask@build*
 
 2ª To start Mask Indict in production **mask@prod:server**
 
 3ª To start Mask Indict in development **mask@dev:server**
 
 3ª To start Test United of Integration **yarn test**
 
 start the Mask Indict :)!
 
 ```baseh
 yarn mask@dev:server
 ```
 
 **And, ready!**
 
 
