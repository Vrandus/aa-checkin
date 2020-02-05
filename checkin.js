const Discord = require('discord.js');
const chrome = require('selenium-webdriver/chrome');
const firefox = require('selenium-webdriver/firefox');
const {Builder, By, Key, until} = require('selenium-webdriver');
const auth = require('./auth.json');
const width = 640;
const height = 480;

module.exports = {



 checkin: async function (){
    const embedded = new Discord.RichEmbed()
        .setAuthor('AA Bot')
        .setColor(0xE06666)
        .setTimestamp()
        .setThumbnail('./logo.png')
        .setTitle('Flight Check in')
        .setURL('http://newjetnet.aa.com')
    let driver = new Builder().forBrowser('chrome')
        .setChromeOptions(new chrome.Options().windowSize({width, height})).build();

    await driver.get('http://newjetnet.aa.com');
    
    await driver.wait(until.titleIs('American Airlines - Login'), 10000);
    const userID = await driver.findElement(By.name("userID"));
    await userID.sendKeys(auth.user, Key.TAB, auth.pw, Key.RETURN);
    await driver.wait(until.titleContains('Welcome'), 10000);
    const travelTab = await driver.findElement(By.className("fif_icon tp"));
    await travelTab.click(travelTab);
 
    await driver.sleep(10000);
    console.log(await driver.getCurrentUrl());
    const tabs = await driver.getAllWindowHandles();
    await driver.switchTo().window(tabs[1]);
    console.log(await driver.getCurrentUrl());
    // let isLoading = true;
    // while(isLoading == true){
    //     const load = await driver.findElements(By.className("loading col-xs-12"));
    //     if(load.getText() == "Loading... "){
    //         isLoading = false;
    //     }
    // }
    const flight = await driver.findElements(By.className("card row")).catch((err) => {
        console.log("can't find card row");
    });
    await driver.sleep(5000);
    return await flight[0].findElement(By.css("a")).getText().catch((err) => {
        return "current flight not found";
    }); 
}
};
function printArray(arr){
    for(i = 0; arr.length; i++){
        console.log(arr[i].getText);
    }
}
// checkin()