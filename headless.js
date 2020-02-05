// Licensed to the Software Freedom Conservancy (SFC) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The SFC licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.

/**
 * @fileoverview An example of running Chrome or Firefox in headless mode.
 *
 * To run with Chrome, ensure you have Chrome 59+ installed and that
 * chromedriver 2.30+ is present on your system PATH:
 * <https://sites.google.com/a/chromium.org/chromedriver/downloads>
 *
 *     SELENIUM_BROWSER=chrome node selenium-webdriver/example/headless.js
 *
 * To run with Firefox, ensure you have Firefox 57+ installed and that
 * geckodriver 0.19.0+ is present on your system PATH:
 * <https://github.com/mozilla/geckodriver/releases>
 *
 *     SELENIUM_BROWSER=firefox node selenium-webdriver/example/headless.js
 */

const chrome = require('selenium-webdriver/chrome');
const firefox = require('selenium-webdriver/firefox');
const {Builder, By, Key, until} = require('selenium-webdriver');

const width = 640;
const height = 480;

let driverPromise = new Builder()
    .forBrowser('chrome')
    .setChromeOptions(
        new chrome.Options().windowSize({width, height}))
    .setFirefoxOptions(
        new firefox.Options().headless().windowSize({width, height}))
    .build();

driverPromise.then( driver => driver.get('http://newjetnet.aa.com'))
    .then(() => driver.wait(until.titleIs('American Airlines - Login'), 10000))
    .then(() => driver.findElement(By.name("userID")).sendKeys("226267", Key.TAB, "Ctylnrch2018", Key.RETURN))
    .then(() => driver.wait(until.titleIs('Welcome | Jetnet'), 10000))
    .then(() => driver.get("https://travelplanner.apps.aa.com/#/"))
    .then(_ => driver.wait(until.elementLocated(By.linkText("YYZ - DFW  08/08/2019"))))
    // .then(_ => driver.get("https://travelplanner.apps.aa.com/#/"))
    .then(
        _ => driver.quit(),
        e => driver.quit().then(() => { throw e; }));
