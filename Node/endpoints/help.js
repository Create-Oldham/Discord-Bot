module.exports = {
    help: (message) => {

        var AsciiTable = require('ascii-table')
        var table = new AsciiTable('Discord Bot Commands')

        table
        .setHeading("Command","Purpose","Available to","Example usage","Responds Inline/DM")
        .addRow("!add","Add a user to the piece of equipment","Inductors on that piece of equipment","Inline ","Inline")
        .addRow("!admin","Set a user as an inductor (or admin on that piece of equipment)","Inductors already","!admin @user2 laser cutter","Inline  ")
        .addRow("!equipment","List all equipment available to get a code for  ","All users","!equipment","Inline ")
        .addRow("!code","Get the code for a piece of equipment","All users (Only responds for users with access to the code)","!code laser cutter","DM ")
        .addRow("!clear","Set the score for a user to 0","Users whith the role defined in pointsClearRoles config setting  ","!clear @keiranwdigital","Inline ")
        .addRow("!score","Get the score ","All users ","!score @keiranwdigital","Inline")
        .addRow("@user ++","Give the user a point","All users  ","@keiranwdigital ++","Inline")
        .addRow("!points","Get the score ","All users ","!points @keiranwdigital","Inline")
        .addRow("!leaderboard","Get the leaderboard","All users","!leaderboard","Inline ")


message.channel.send(table.toString(), { split: true });

    }
}