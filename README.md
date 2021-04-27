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
