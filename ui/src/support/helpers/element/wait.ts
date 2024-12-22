import { ERROR_MESSAGES, TIMEOUTS } from "@constants/constants";
import { ChainablePromiseElement } from "webdriverio";

export const waitForElement = async (
    element: ChainablePromiseElement<WebdriverIO.Element>,
    isDisplayed = true,
    timeout = TIMEOUTS.DEFAULT_WAIT_TIMEOUT,
) => {
    await element.waitForDisplayed({
        timeout,
        reverse: !isDisplayed,
        timeoutMsg: isDisplayed
            ? ERROR_MESSAGES.ELEMENT_IS_NOT_VISIBLE(await element.selector)
            : ERROR_MESSAGES.ELEMENT_IS_VISIBLE(await element.selector),
    });
};

export const waitForElementToBeClickable = async (
    element: ChainablePromiseElement<WebdriverIO.Element>,
    timeout = TIMEOUTS.DEFAULT_WAIT_TIMEOUT,
) => {
    await element.waitForClickable({
        timeout,
        timeoutMsg: ERROR_MESSAGES.ELEMENT_IS_NOT_CLICKABLE(await element.selector),
    });
};

export const waitForElementAndClick = async (element: ChainablePromiseElement<WebdriverIO.Element>, timeout = TIMEOUTS.DEFAULT_WAIT_TIMEOUT) => {
    await waitForElement(element, true, timeout);
    await waitForElementToBeClickable(element, timeout);
    await browser.executeScript("arguments[0].click()", [element]);
};

export const waitForElementAndSendKeys = async (
    element: ChainablePromiseElement<WebdriverIO.Element>,
    text: string | number,
    timeout = TIMEOUTS.DEFAULT_WAIT_TIMEOUT,
) => {
    await waitForElement(element, true, timeout);
    await waitForElementToBeClickable(element, timeout);
    await element.clearValue();
    await element.setValue(text);
};

export const waitForElementExist = async (
    element: ChainablePromiseElement<Promise<WebdriverIO.Element>>,
    isExist = true,
    timeout = TIMEOUTS.DEFAULT_WAIT_TIMEOUT,
) => {
    await element.waitForExist({
        timeout,
        reverse: !isExist,
        timeoutMsg: isExist ? ERROR_MESSAGES.ELEMENT_IS_NOT_PRESENT(await element.selector) : ERROR_MESSAGES.ELEMENT_IS_PRESENT(await element.selector),
    });
};

export const waitForElementAndGetText = async (
    element: ChainablePromiseElement<WebdriverIO.Element>,
    timeout = TIMEOUTS.DEFAULT_WAIT_TIMEOUT,
) => {
    await waitForElement(element, true, timeout);
    return element.getText();
};

export const waitForElementAndGetValue = async (
    element: ChainablePromiseElement<WebdriverIO.Element>,
    timeout = TIMEOUTS.DEFAULT_WAIT_TIMEOUT,
) => {
    await waitForElement(element, true, timeout);
    return element.getValue();
};

export const waitMilliseconds = async (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const waitForElementAndClickByScript = async (
    element: ChainablePromiseElement<Promise<WebdriverIO.Element>>,
    timeout = TIMEOUTS.DEFAULT_WAIT_TIMEOUT,
) => {
    await waitMilliseconds(300); // we need this pause to make sure the links on all pages are clicked
    await waitForElementExist(element, true, timeout);
    await browser.executeScript(`document.querySelector(arguments[0]).click()`, [element.selector]);
};
