import reportPortal from "wdio-reportportal-reporter";
import { LEVEL } from "wdio-reportportal-reporter/build/constants";
import { ENCODING } from "../constants/constants";

const closeAllTabs = async () => {
    const windows = await browser.getWindowHandles();
    if (windows.length > 1) {
        for (const window of windows.splice(1, windows.length)) {
            await browser.switchToWindow(window);
            await browser.closeWindow();
        }
    }
};

export const hooks: WebdriverIO.HookFunctionExtension = {
    beforeScenario: async function () {
        if (process.env.WINDOW_SIZE) {
            const paramsArray = process.env.WINDOW_SIZE.split("x");
            await browser.setWindowSize(...(paramsArray.map((elem) => Number(elem)) as [number, number]));
        }
    },
    afterStep: async function (step, scenario, result) {
        if (!result.passed) {
            const failureObject = { type: "afterStep", error: result.error, title: `${step.id}${step.text}` };
            const pic = browser.takeScreenshot();
            const attachment = Buffer.from(await pic, ENCODING.BASE64);
            reportPortal.sendFileToTest(failureObject, LEVEL.ERROR, "screenshot.png", attachment);
        }
    },
    afterScenario: async function () {
        await browser.deleteAllCookies();
        await closeAllTabs();
        await browser.refresh();
    },
};
