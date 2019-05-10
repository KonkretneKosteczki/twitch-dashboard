const puppeteerResolver = require("puppeteer-chromium-resolver");
const accountsCookie = {
    "name": "auth-token",
    "value": "",
    "domain": ".twitch.tv",
    "path": "/",
    "httpOnly": false,
    "secure": true
};


(async () => {
    const revisionInfo = await puppeteerResolver({
        revision: "",
        detectionPath: "",
        folderName: '.chromium-browser-snapshots',
        hosts: ["https://storage.googleapis.com", "https://npm.taobao.org/mirrors"],
        retry: 3
    });

    const titleSelector = '#root > div > div.tw-flex.tw-flex-column.tw-flex-nowrap.tw-full-height > div.tw-flex.tw-flex-nowrap.tw-full-height.tw-overflow-hidden.tw-relative > div > div > div.drag-and-drop-layout-container__with-navs.scrollable-area > div.simplebar-scroll-content > div > div > div > div > div > div > div > div > div > div > div > div > div > textarea';
    const updatebtn = '#root > div > div.tw-flex.tw-flex-column.tw-flex-nowrap.tw-full-height > div.tw-flex.tw-flex-nowrap.tw-full-height.tw-overflow-hidden.tw-relative > div > div > div.drag-and-drop-layout-container__with-navs.scrollable-area > div.simplebar-scroll-content > div > div > div > div > div > div > div.drag-and-drop-card-container.tw-border-b.tw-border-l.tw-border-r.tw-border-t.tw-c-background-base.tw-elevation-1.tw-flex.tw-flex-column.tw-lg-mg-b-2.tw-mg-b-1 > div.drag-and-drop-card-content.tw-relative > div > div > div.tw-align-items-start.tw-flex.tw-flex-row.tw-full-width.tw-justify-content-start > button';

    const browser = await revisionInfo.puppeteer.launch({
        args: ['--no-sandbox'],
        executablePath: revisionInfo.executablePath
    });

    const page = await browser.newPage();
    await page.setCookie(accountsCookie);
    await page.goto('https://www.twitch.tv/**NOPE**/dashboard/live', {waitUntil: "networkidle0"});
    await page.type(titleSelector, "YOUR TITLE GOES HERE");
    await page.waitFor(2000);
    await page.evaluate(btn => {
        const updateButton = document.querySelector(btn);
        updateButton.scrollIntoView();
        updateButton.click();
    }, updatebtn);
    await page.waitFor(1000);
    await browser.close();
})();
