import { Given, Then, When } from "@wdio/cucumber-framework";
import { config } from "@config/wdio.local.config";
import { getPage } from "@support/pageProvider";
import { ELEMENT_TYPE } from "@constants/constants";
import { expect } from "chai";

Given(/^the User opens greensky page/, async () => {
    await browser.url(config.baseUrl);
});

When(/^the User enters "([^"]*)" value in "([^"]*)" input on "([^"]*)" page$/, async (value: string, inputName: string, pageName: string) => {
    const page = getPage(pageName);
    await page.insertValueInInput(inputName, value);
    await page.unfocusInputElement(inputName);
});

When(
    /^the User clicks "([^"]*)" (button|label|link|dropDown) on "([^"]*)" page$/,
    async (elementName: string, elementType: ELEMENT_TYPE.BUTTON | ELEMENT_TYPE.LABEL | ELEMENT_TYPE.LINK | ELEMENT_TYPE.DROPDOWN, pageName: string) => {
        const page = getPage(pageName);
        await page.clickOnElement(elementType, elementName);
    },
);

Then(/^the User (sees|doesn't see) "([^"]*)" page$/, async (pageVisibility: "sees" | "doesn't see", pageName: string) => {
    const page = getPage(pageName);
    await page.checkPageOpened(pageVisibility === "sees");
});

Then(/^the User sees "([^"]*)" error message for "([^"]*)" field on "([^"]*)" page/, async (message: string, fieldName: string, pageName: string) => {
    const page = getPage(pageName);
    const expectedErrorMessage = message.trim();
    const errorMessage = await page.getErrorMessageText(fieldName);
    expect(errorMessage.trim()).to.be.equal(expectedErrorMessage);
});

Then(
    /^the User sees "([^"]*)" (button|label|link|input) is (visible|not visible) on "([^"]*)" page$/,
    async (
        elementName: string,
        elementType: ELEMENT_TYPE.BUTTON | ELEMENT_TYPE.LABEL | ELEMENT_TYPE.LINK | ELEMENT_TYPE.INPUT,
        state: "visible" | "not visible",
        pageName: string,
    ) => {
        const page = getPage(pageName);
        await page.checkElementVisible(elementName, elementType, state === "visible");
    },
);

Then(/^the user is redirected to "([^"]*)" page with "([^"]*)" url$/, async (pageName: string, elementName: string) => {
    const page = getPage(pageName);
    await page.checkUrl(elementName, ELEMENT_TYPE.LINK);
});
