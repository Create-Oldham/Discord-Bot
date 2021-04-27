DiscordBot

# Setup Instructions 


## Prerequisites
Node.js LTS from https://nodejs.org/en/

Node package manager

SQL Server 2019

A discord API key

Do not share your API key with anyone, if someone gets access to it they can use it as if they are logged into your account.

## Setting up
Node layer
Clone the source code from BitBucket

Open the node folder in a command line of your choice

Run {{npm install}} to install all of the required packages

copy config.json.client and remove the .client extension

For information about the specifics in the config read the Config page

## Database
If you have SQL Compare, this project has a SQL compare formatted database schema folder

If you don’t create a database and run each of the scripts to create the relevant objects

To use the codes functionality you will need to insert into the UserEquipmentLink table a link between a user and equipment

## Running as a service - Mainly production

We use https://www.npmjs.com/package/qckwinsvc in production to create the service, it's quick, easy and probably obsolete one day. But we'll deal with that when it happens

## Commands
| Command  | Purpose  | Available to  |  Example usage | Responds Inline/DM |
|---|---|---|---|---|
|!add| Add a user to the piece of equipment  |  Inductors on that piece of equipment | Inline  | Inline|
|!admin| Set a user as an inductor (or admin on that piece of equipment) | Inductors already |   |   |
|!equipment|List all equipment available to get a code for   | All users  |  !equipment | Inline |
|!code|  Get the code for a piece of equipment|  All users (Only responds for users with access to the code) |  !code laser cutter | DM |
|!clear| Set the score for a user to 0 | Admins  |!clear @keiranwdigital| Inline |
|!score| Get the score  | All users  | !score @keiranwdigital | Inline|
|@user ++| Give the user a point | All users  |@keiranwdigital ++ | Inline|
|!points| Get the score  | All users  | !points @keiranwdigital | Inline|
|!leaderboard| Get the leaderboard  |  All users | !leaderboard | Inline |