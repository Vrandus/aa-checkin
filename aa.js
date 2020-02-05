const chrome = require('selenium-webdriver/chrome');
const firefox = require('selenium-webdriver/firefox');
const {Builder, By, Key, until} = require('selenium-webdriver');

const width = 640;
const height = 480;

async function main(){
    let driver = new Builder().forBrowser('chrome')
        .setChromeOptions(new chrome.Options().windowSize({width, height})).build();

    await driver.get("http://facebook.com");
    const descArray = await driver.findElements(By.className("_6a _6b product_desc"));

    // const found = await  
    console.log(await descArray[0].getText()); 


}

main();