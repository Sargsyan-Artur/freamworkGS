import { ChainablePromiseElement, Selector } from "webdriverio";
import { ERROR_MESSAGES } from "@constants/constants";
import { DEFAULT_TIMEOUT } from "@wdio/cucumber-framework/build/constants";
import { waitForElement } from "@helpers/element/wait";

export const switchToFrame = async (frameSelector: string) => {
    const frame = $(frameSelector);
    await waitForElement(frame);
    const iframe = await browser.findElement("css selector", frameSelector);
    await browser.switchToFrame(iframe);
};

export const getElementText = async (elem: ChainablePromiseElement<Promise<WebdriverIO.Element>>, timeout = DEFAULT_TIMEOUT) => {
    await elem.waitForDisplayed({
        timeoutMsg: ERROR_MESSAGES.ELEMENT_IS_NOT_VISIBLE(await elem.selector),
        timeout: timeout,
    });
    return await elem.getText();
};

export const unfocusInput = async (selector: Selector) =>
    await browser.execute((selector: string) => (document.querySelector(selector) as HTMLInputElement).blur(), selector);
