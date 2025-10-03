# Graduation Assessment: Web App

## Overview

This assessment will require you build a full stack web application: a message board where users can post and view messages. Users of your application will be able to:

- view all posted messages from the database
- post a new message to the database
- delete messages in the database if authenticated

Follow the directions in this README for detailed instructions, then make a PR from your fork into the upstream in order to submit the assessment.

## Tips

While developing your application, use an API client ([Postman](https://www.getpostman.com/), [Yaak](https://yaak.app/), [Bruno](https://www.usebruno.com/), etc.) to test your server logic.

<!--## Important Notes for Us to Test Your Application

You are not given any code to test your application, but we will run tests on your Pull Request. In order for these tests to run properly, please adhere to the following:

- While you are free to add any additional files you want, **do not edit the file structure or delete existing files**
- Likewise you can add additional HTML elements, IDs, and classes, but **do not remove existing hardcoded HTML elements/attributes**
- If you are told to send or display a certain string or to name a file or function a certain name, copy-paste the string **exactly** as it is shown. Alternate text or differing capitalization will fail the tests.
- Run your server and test out your application before submitting! Even if things are not working 100% correctly, you should be able to catch and remove any syntax or reference errors just by running your application
- You are free to edit the stylesheet as you please!-->

## Getting Started

- [ ] Fork and clone this repository. If you need a refresher, just follow the instructions found [here](https://github.com/CodesmithLLC/dev-environment-setup/blob/main/fork-clone.md)!

- [ ] Run `npm install` to install any dependencies

## PART 1: Server

First, write the logic for a RESTful web API server in the `server/` directory.

- [ ] In `server/server.ts`, create an HTTP server that listens on port **3434**. (We recommend Express, although you may use the built-in Node.js http module without a framework if you'd prefer.)

- [ ] In `server/models/MessageModel.ts`, implement a database using either PostgreSQL or MongoDB. This is where you'll store messages posted by your users.
  - [ ] Create a collection/table called "Message".
  - [ ] All items in the database **must** have a property `message` which is a string
  - [ ] All items **must** also have a property `password` which is a string
  - [ ] Additionally, all items should be stored with the datetime they were `created_at`. This should default to the current datetime.
- [ ] In `server/controllers/messageController.ts`, add the following functionality as a middleware controller. (Since these functions will act as middleware, they should take the appropriate arguments and perform the necessary callback operation(s).)
  - [ ] `messageController.postMessage` should create a new item in the database
  - [ ] `messageController.getMessages` should retrieve all items from the database and send it back to the client as JSON
  - [ ] `messageController.deleteMessage` should find items in the database based on an `id` and delete the `message` if it exists. (Later, you will be asked to authenticate before deleting the message.)
- [ ] Finally, return to `server/server.ts` to create appropriate route handlers for each operation your server will support (getting messages, posting a new message & deleting an existing message) on the `/api/messages` endpoint.

## PART 2: Client

A Vite dev server has already been configured to run via the command `npm run dev`. Use this dev server to your advantage in order to write and test the frontend logic for your application. Currently, there's only a single `main.tsx` housing the React logic. You can create new component files as you wish or keep all logic in a single file if you prefer.

- [ ] In `client/main.tsx`, use React hooks to query your server for all messages in the database and render them as list items in the `#message-list` element.

- [ ] Each list item should display the message text followed by a `button` (inside the list item) that displays the word "Delete".

- [ ] Clicking on the button to add a message should take the text from the text area and the password input field and post a new message to the database. (If either field is empty, the message should not be sent to the server.)

- [ ] Clicking on any list item's "Delete" button should remove the item from the database. (Later, you will authenticate before deleting.)

- [ ] The application should poll for new messages and refresh the display whenever the "Refresh" button is clicked, whenever a new message is posted, or whenever a message is deleted.

## PART 3: Auth

Modify your codebase to enforce the following authentication measures. (Use the `server/controllers/authController.ts` file to add any necessary middleware functions.)

- [ ] Upon successful posting of a new message with a password, the server should set a cookie on the client with a key of `pass` and a value of the provided password in plaintext. (Obviously, this should never be done in real applications.) Additional posts with different passwords will overwrite the value of the cookie on the client.

- [ ] Whenever a user tries to delete a message, the server should check if the cookie contains a `pass` that matches the password stored with the given message before allowing the message to be deleted. If the password does not match or is not provided in the cookie, nothing should happen.
