"use strict";
const Discord = require('discord.js');
const chrome = require('selenium-webdriver/chrome');
// const firefox = require('selenium-webdriver/firefox');
const {Builder, By, Key, until} = require('selenium-webdriver');
const auth = require('./auth.json');
const width = 640;
const height = 480;


module.exports = class Airliner{
    
    constructor(){
        this.driver;
    }           //im not sure why this isnt working
                //aren't i importing and exporting it correctly? 
                // 
  
    
    async initDriver(){
        
        // SO, you're not referencing `this`
        // this.driver 
        // What you're doing here is declaring a global variable (global variables are declared when there is no `var`, `let`, or `const` before it)
        //does that mean i gotta add `this` to every instance of me making it 
        // Yes. This isn't like Java if that's how it works in Java
        // alright, normally in java you don't need to specify unless its required
        this.driver = new Builder().forBrowser('chrome') // Why is it initialized here, and not in the constructor? 
        .setChromeOptions(new chrome.Options().windowSize({width, height})).build(); // because this runs an instance of chrome and i 
                                                                                        // want to have easier access to closing it when it isnt working 
                                                                                        // run it in terminal for now? 
                                                                                        //going to get an error, stdin is on my discord server ill add you to
                                                                                        // check discord now and use !checkin

    }

    async login(){
        await this.driver.get('http://newjetnet.aa.com');
        
        await this.driver.wait(until.titleIs('American Airlines - Login'), 10000);
        const userID = await this.driver.findElement(By.name("userID"));
        await userID.sendKeys(auth.user, Key.TAB, auth.pw, Key.RETURN);
        await this.driver.wait(until.titleContains('Welcome'), 10000);
        const travelTab = await this.driver.findElement(By.className("fif_icon tp"));
        await travelTab.click(travelTab);
    
        await this.driver.sleep(10000);
        console.log(await this.driver.getCurrentUrl());
        const tabs = await this.driver.getAllWindowHandles();
        await this.driver.switchTo().window(tabs[1]);
        console.log(await this.driver.getCurrentUrl());
    }

    getEmbed(){
        const embedded = new Discord.RichEmbed()
        .setAuthor('AA Bot')
        .setColor(0xE06666)
        .setTimestamp()
        .setThumbnail('./logo.png')
        .setTitle('Flight Check in')
        .setURL('http://newjetnet.aa.com');
        return embedded;
    }

    async checkin(){
        const embedded = this.getEmbed();
        await this.initDriver();
        await this.login();
        // let isLoading = true;
        // while(isLoading == true){
        //     const load = await driver.findElements(By.className("loading col-xs-12"));
        //     if(load.getText() == "Loading... "){
        //         isLoading = false;
        //     }
        // }
        const flight = await this.driver.findElements(By.className("card row")).catch((err) => {
            console.log("can't find card row");
        });
        await this.driver.sleep(5000);
        return await flight[0].findElement(By.css("a")).getText().catch((err) => {
            return "current flight not found";
        }); 
    }
}
// function printArray(arr){
//     for(i = 0; arr.length; i++){
//         console.log(arr[i].getText);
//     }
// }
// checkin()