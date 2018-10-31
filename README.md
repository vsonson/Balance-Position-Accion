Set Up Your System

The NativeScript CLI is built on Node.js, and as such you need to have Node.js installed to use NativeScript.
To check whether you have Node.js installed, open a terminal or command prompt and execute node --version. If there is an error, head to  https://nodejs.org/ and download and install the latest “LTS” (long-term support) distribution and restart your terminal or command prompt.


Open your terminal or command prompt and execute the following command to install the NativeScript CLI from npm, which is the Node.js package manager:

npm install -g nativescript

After the installation the system setup should have:
The latest stable official release of Node.js (LTS) 8.x
Google Chrome 
JDK 8
Android SDK
Android Support Repository
Google Repository
Android SDK Build-tools 28.0.3 or a later stable official release
Android Studio
Set up Android virtual devices to expand your testing options
For MAC system, Latest XCODE.



Basics of the NativeScript Command-Line Interface
use the cd command (change directory) to navigate into your new app’s folder.

cd balance-position

Now that you have an app scaffolded on your local computer and you have cd‘ed to the root of the app, you are ready to run your application on an emulator.
Exercise: Use the tns run command
In NativeScript you use the CLI’s tns run command to run your apps on iOS or Android. Let’s start with Android.
Execute the following command in your terminal to run your app on an Android emulator.

tns run android
If you’re on macOS and would prefer to develop for iOS first, and then execute the following command .
tns run ios
