var aa = require('./checkin')
var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
// Configure logger settings
async function main(){
    logger.remove(logger.transports.Console);
    logger.add(new logger.transports.Console, {
        colorize: true
    });
    logger.level = 'debug';
    // Initialize Discord Bot
    var bot = new Discord.Client({
    token: auth.token,
    autorun: true
    });
    bot.on('ready', function (evt) {
        logger.info('Connected');
        logger.info('Logged in as: ');
        logger.info(bot.username + ' - (' + bot.id + ')');
    });
    bot.on('message', async function (user, userID, channelID, message, evt) {
        // Our bot needs to know if it will execute a command
        // It will listen for messages that will start with `!`
        if (message.substring(0, 1) == '!') {
            var args = message.substring(1).split(' ');
            var cmd = args[0];
        
            args = args.splice(1);
            switch(cmd) {
                // !ping
                case 'ping':
                    bot.sendMessage({
                        to: channelID,
                        message: 'Pong!'
                    });
                break;
                // Just add any case commands if you want to..
                case 'checkin':
                    let flight = await aa.checkin();
                    console.log(args[0]);
                    bot.sendMessage({
                        to: channelID,
                        message:"waiting for flight"
                    });
                    await bot.sendMessage({
                        to: channelID,
                        message:flight
                    });
                break;
            }
        }
    });
}
main()
