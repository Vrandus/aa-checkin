"use strict";
import { Airliner } from './airliner';
import * as Discord from 'discord.js';
import * as logger from 'winston';
import * as auth from './auth.json';
import {Builder, By, Key, until} from 'selenium-webdriver';


logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console);
// logger.level = 'debug';

const client = new Discord.Client();

client.on('ready', () =>{
    logger.info("client readied");

});

client.on('message', async function (message) {
    if (message.content.substring(0, 1) == '!') {
        let args: string[] = message.content.substring(1).split(' ');
        let cmd: string = args[0];
        args = args.splice(1);
        const embed = new Discord.RichEmbed()
        .setAuthor('AA Bot')
        .setColor(0xE06666)
        .setTimestamp()
        .setThumbnail('https://i.imgur.com/uMYYXW0.png')
        .setTitle('Flight Check in')
        .setURL('http://newjetnet.aa.com')
        if(cmd === 'checkin'){
            await message.react("👍");
            embed.setDescription("select the flight corresponding to the reactions: ");
            let prog = await message.channel.send(":airplane: getting flight information :airplane:");
            console.log(await prog.toString());
            console.log('AIRLINER CLASS: ', Airliner);
            let aaClient = new Airliner();
            let flights = await aaClient.planner();
            embed.addField(":one: : " + await flights[0].findElement(By.css("a")).getText(), true);
            let output = await message.channel.send({embed})

            client.on('message', async function(message) {
                if(message.author.toString() == "aa-check"){
                    message.react("1️⃣");
                }
            });
            // let reaction = await output[0].react("1️⃣");
            
        }

    }
});

client.login(auth.token);