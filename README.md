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
Clone the source code from Github

Open the node folder in a command line of your choice

Run *npm install* to install all of the required packages

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
|!admin| Set a user as an inductor (or admin on that piece of equipment) | Inductors already |  !admin @user2 laser cutter | Inline  |
|!equipment|List all equipment available to get a code for   | All users  |  !equipment | Inline |
|!code|  Get the code for a piece of equipment|  All users (Only responds for users with access to the code) |  !code laser cutter | DM |
|!clear| Set the score for a user to 0 | Users whith the role defined in pointsClearRoles config setting  |!clear @keiranwdigital| Inline |
|!score| Get the score  | All users  | !score @keiranwdigital | Inline|
|@user ++| Give the user a point | All users  |@keiranwdigital ++ | Inline|
|!points| Get the score  | All users  | !points @keiranwdigital | Inline|
|!leaderboard| Get the leaderboard  |  All users | !leaderboard | Inline |

Note, the below commands are customisable by the configuration file

| Command  | Setting name  | Description  |  
|---|---|---|
|@User ++| plusplusText | The suffix to replace ++ | 
|!clear|pointsClearRoles| The role that a user must have to clear points |
|!add | inductorRole | The role that must be held before adding to an induction |

## Creating equipment records
At the current time there is no interface to add equipment or edit the details. It's also impossible to add inductors and users without an inital inductor being added first. This

The good news is that there is a SQL script in the scripts folder to create a record for a piece of equipment and assign an initial inductor.

*Create new equipment.sql* takes the below parameters:

**@DiscordID** - The DiscordID of the inital inductor, you can find this by right clicking on a user and clicking *Copy ID*

**@equipmentName** - The name of the equipment that is being added

**@equipmentInstructions** - The Instructions for using the equipment

Once the script has been run it will output the equipment that has been added, along with the permissions. 