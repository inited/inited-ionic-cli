## Inited CLI for Cordova and Ionic projects

### Installation:

```
npm install -g ssh://git@ini.inited.cz/inited-ionic-cli.git
```

### Use:

#### initialize
Initializes project - creates build, dist, prepare, pub scripts

Mainly creates scripts for android and ios, you can specify platforms in parameters

Optional parameters
* one word parameter will always be used as platform eg.
  * android - creates a* scripts form android
  * ios - creates i* scripts for ios
  * windows - creates w* scripts for windows
  * browser - creates b* scripts for browser
  * mac - creates m* scripts for mac


* version - sets app version - for more info see "set" function in the bottom
* appName - sets application name in config.xml
* projectName - sets project name in package.json, if config name is same as package.json name, sets this name also in config.xml
* id - sets application id in config.xml

###### usage
```
inited initialize android windows version=1.0.0 appName=testApp
```

#### build
Builds project - provides ionic and cordova build and then compiles app and renames by project name, version and build number

Parameters
* platform to build

###### usage
```
inited build android
```

#### dist
Builds project as release and signs it

Parameters
* platform to build

###### usage
```
inited dist android
```

#### prepare
Prepares project - deletes platform and plugins folders and package-lock.json file, then runs npm install and npm prune and then adds platform given in parameter

Parameters
* platform to prepare

###### usage
```
inited prepare android
```

#### pub
Publishes built application to the web for developers

Parameters
* platform to publish

###### usage
```
inited pub android
```

#### release
Releases built to the web as release for clients

Parameters
* platform to publish

###### usage
```
inited release android
```

#### set
Sets informations about project to package.json, config.xml and to app

Parameters
* key to set
* value of key

Available keys
* version - sets projects version in package.json, config.xml and html tag with id="app-version", id="app-version" has to be last attribute in tag followed right by closing html tag (id="app-version">)
* appName - sets application name to the config.xml - this name is shown in phone
* projectName - sets project name to the package.json and to the config.xml if config.xml name equals package.json name - this name is used in app build and release
* id - sets project id in the config.xml