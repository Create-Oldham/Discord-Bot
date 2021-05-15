module.exports = {
    help: (message) => {

        out = "Commands that can be used"
        out += "In the following format - Command  - Purpose  - Available to  -  Example usage - Responds Inline/DM"
        out += "\n!add - Add a user to the piece of equipment - Inductors on that piece of equipment - add @user2 laser cutter - Inline"
        out += "\n!admin - Set a user as an inductor (or admin on that piece of equipment) - Inductors already - !admin @user2 laser cutter - Inline"
        out += "\n!equipment - List all equipment available to get a code for - All users - !equipment - Inline "
        out += "\n!code - Get the code for a piece of equipment - All users (Only responds for users with access to the code) - !code laser cutter - DM"
        out += "\n!clear - Set the score for a user to 0 - Users whith the role defined in pointsClearRoles config setting - !clear @keiranwdigital - Inline"
        out += "\n!score - Get the score - All users - !score @keiranwdigital - Inline"
        out += "\n@user ++ - Give the user a point - All users - @keiranwdigital ++ - Inline"
        out += "\n!points - Get the score - All users  - !points @keiranwdigital - Inline"
        out += "\n!leaderboard - Get the leaderboard - All users - !leaderboard - Inline"

        message.channel.send(out, { split: true });

    }
}