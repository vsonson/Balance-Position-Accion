**Edit a file, create a new file, and clone from Bitbucket in under 2 minutes**

When you're done, you can delete the content in this README and update the file with details for others getting started with your repository.

*We recommend that you open this README in another tab as you perform the tasks below. You can [watch our video](https://youtu.be/0ocf7u76WSo) for a full demo of all the steps in this tutorial. Open the video in a new tab to avoid leaving Bitbucket.*

---

## Edit a file

You’ll start by editing this README file to learn how to edit a file in Bitbucket.

1. Click **Source** on the left side.
2. Click the README.md link from the list of files.
3. Click the **Edit** button.
4. Delete the following text: *Delete this line to make a change to the README from Bitbucket.*
5. After making your change, click **Commit** and then **Commit** again in the dialog. The commit page will open and you’ll see the change you just made.
6. Go back to the **Source** page.

---

## Create a file

Next, you’ll add a new file to this repository.

1. Click the **New file** button at the top of the **Source** page.
2. Give the file a filename of **contributors.txt**.
3. Enter your name in the empty file space.
4. Click **Commit** and then **Commit** again in the dialog.
5. Go back to the **Source** page.

Before you move on, go ahead and explore the repository. You've already seen the **Source** page, but check out the **Commits**, **Branches**, and **Settings** pages.

---

## Clone a repository

Use these steps to clone from SourceTree, our client for using the repository command-line free. Cloning allows you to work on your files locally. If you don't yet have SourceTree, [download and install first](https://www.sourcetreeapp.com/). If you prefer to clone from the command line, see [Clone a repository](https://confluence.atlassian.com/x/4whODQ).

1. You’ll see the clone button under the **Source** heading. Click that button.
2. Now click **Check out in SourceTree**. You may need to create a SourceTree account or log in.
3. When you see the **Clone New** dialog in SourceTree, update the destination path and name if you’d like to and then click **Clone**.
4. Open the directory you just created to see your repository’s files.

Now that you're more familiar with your Bitbucket repository, go ahead and add a new file locally. You can [push your change back to Bitbucket with SourceTree](https://confluence.atlassian.com/x/iqyBMg), or you can [add, commit,](https://confluence.atlassian.com/x/8QhODQ) and [push from the command line](https://confluence.atlassian.com/x/NQ0zDQ).






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
