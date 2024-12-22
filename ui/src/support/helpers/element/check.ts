import { expect } from "chai";
import { ATTRIBUTE, ERROR_MESSAGES } from "@constants/constants";
import { ChainablePromiseElement } from "webdriverio";
import { DEFAULT_TIMEOUT } from "@wdio/cucumber-framework/build/constants";
import { waitForElement } from "@helpers/element/wait";

export const checkElementIsVisible = async (elem: ChainablePromiseElement<WebdriverIO.Element>, isVisible = true, timeout = DEFAULT_TIMEOUT) => {
    await elem.waitForExist({
        timeout: timeout,
        reverse: !isVisible,
        timeoutMsg: isVisible ? ERROR_MESSAGES.ELEMENT_IS_NOT_PRESENT(await elem.selector) : ERROR_MESSAGES.ELEMENT_IS_PRESENT(await elem.selector),
    });
    expect(await elem.isDisplayed()).equal(isVisible);
};

export const checkButtonIsEnabled = async (button: ChainablePromiseElement<Promise<WebdriverIO.Element>>, isEnabled = true, timeout = DEFAULT_TIMEOUT) => {
    await button.waitForDisplayed({
        timeoutMsg: ERROR_MESSAGES.ELEMENT_IS_NOT_VISIBLE(await button.selector),
        timeout: timeout,
    });
    const errorMessage = isEnabled ? ERROR_MESSAGES.ELEMENT_IS_DISABLED(await button.selector) : ERROR_MESSAGES.ELEMENT_IS_ENABLED(await button.selector);
    const buttonEnabled = !(await button.getAttribute(ATTRIBUTE.CLASS)).includes("disabled");
    expect(buttonEnabled).to.equal(isEnabled, errorMessage);
};

export const checkElementIsPresent = async (elem: ChainablePromiseElement<WebdriverIO.Element>, isPresent = true) => {
    const errorMessage = isPresent ? ERROR_MESSAGES.ELEMENT_IS_NOT_PRESENT(await elem.selector) : ERROR_MESSAGES.ELEMENT_IS_PRESENT(await elem.selector);
    expect(await elem.isExisting()).to.equal(isPresent, errorMessage);
};

export const checkTextsEquality = async (text1: string, text2: string, message: string) => expect(text1.trim()).equal(text2.trim(), message);

export const checkElementIsSelected = async (
    elem: ChainablePromiseElement<Promise<WebdriverIO.Element>>,
    isSelected = true,
    timeout = DEFAULT_TIMEOUT,
) => {
    await elem.waitForDisplayed({
        timeout: timeout,
        timeoutMsg: ERROR_MESSAGES.ELEMENT_IS_NOT_VISIBLE(await elem.selector),
    });
    expect(await elem.isSelected()).to.equal(isSelected);
};

export const checkTextVisibilityOnPage = async (rootElement: ChainablePromiseElement<WebdriverIO.Element>, text: string, isVisible = true) => {
    const elem = rootElement.$(`//*[normalize-space(text()) = "${text}"]`);
    await waitForElement(elem);
    if (isVisible) await checkElementIsVisible(elem);
    else await checkElementIsPresent(elem, false);
};

export const checkUrlEquality = async (url: string) => {
    expect(await browser.getUrl()).to.equal(url);
};
