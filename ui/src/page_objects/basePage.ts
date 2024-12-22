import {
    waitForElement,
    waitForElementAndClick,
    waitForElementAndGetText,
    waitForElementAndGetValue,
    waitForElementAndSendKeys,
} from "@helpers/element/wait";
import { ChainablePromiseElement } from "webdriverio";
import {
    checkButtonIsEnabled,
    checkElementIsPresent,
    checkElementIsSelected,
    checkElementIsVisible,
    checkTextsEquality,
    checkTextVisibilityOnPage, checkUrlEquality,
} from "@helpers/element/check";
import { unfocusInput } from "@helpers/element/actions";
import { ELEMENT_TYPE } from "@constants/constants";

export abstract class BasePage {
    protected inputs: { [key: string]: ChainablePromiseElement<WebdriverIO.Element> };
    protected buttons: { [key: string]: ChainablePromiseElement<WebdriverIO.Element> };
    protected dropDown: { [key: string]: ChainablePromiseElement<WebdriverIO.Element> };
    protected labels: { [key: string]: ChainablePromiseElement<WebdriverIO.Element> };
    protected links: { [key: string]: ChainablePromiseElement<WebdriverIO.Element> };
    protected checkboxes: { [key: string]: ChainablePromiseElement<WebdriverIO.Element> };
    protected fieldErrors: { [key: string]: ChainablePromiseElement<WebdriverIO.Element> };
    protected radioButtons: { [key: string]: ChainablePromiseElement<WebdriverIO.Element> };
    public abstract rootElement: ChainablePromiseElement<WebdriverIO.Element>;
    private _title: ChainablePromiseElement<WebdriverIO.Element>;
    protected abstract url: string;

    protected getElementProvider = (elementType) => {
        let elementsProvider;
        switch (elementType) {
            case ELEMENT_TYPE.LINK:
                elementsProvider = this.links;
                break;
            case ELEMENT_TYPE.DROPDOWN:
                elementsProvider = this.dropDown;
                break;
            case ELEMENT_TYPE.FIELD_ERROR:
                elementsProvider = this.fieldErrors;
                break;
            case ELEMENT_TYPE.BUTTON:
                elementsProvider = this.buttons;
                break;
            case ELEMENT_TYPE.LABEL:
                elementsProvider = this.labels;
                break;
            case ELEMENT_TYPE.CHECKBOX:
                elementsProvider = this.checkboxes;
                break;
            case ELEMENT_TYPE.INPUT:
                elementsProvider = this.inputs;
                break;
            case ELEMENT_TYPE.RADIO_BUTTON:
                elementsProvider = this.radioButtons;
                break;
            default:
        }
        return elementsProvider;
    };

    async getElement(elemName: string, elemType: ELEMENT_TYPE) {
        const elementType = this.getElementProvider(elemType);
        if (elemName in elementType) {
            return elementType[elemName];
        } else {
            throw new Error(`No such ${elemType} with name ${elemName}. Class - ${this.constructor.name}.`);
        }
    }

    protected get title(): ChainablePromiseElement<WebdriverIO.Element> {
        return this._title;
    }

    async checkPageOpened(state: boolean) {
        await waitForElement(this.rootElement, state);
        await checkElementIsVisible(this.rootElement, state);
    }

    async insertValueInInput(inputName: string, value: string | number) {
        const elem = await this.getElement(inputName, ELEMENT_TYPE.INPUT);
        await waitForElementAndSendKeys(elem, value);
    }

    async getValueFromInput(inputName: string) {
        const elem = await this.getElement(inputName, ELEMENT_TYPE.INPUT);
        return waitForElementAndGetValue(elem);
    }

    async clickOnElement(type: ELEMENT_TYPE.BUTTON | ELEMENT_TYPE.LABEL | ELEMENT_TYPE.CHECKBOX | ELEMENT_TYPE.LINK | ELEMENT_TYPE.DROPDOWN, elementName: string) {
        const elem = await this.getElement(elementName, type);
        await waitForElementAndClick(elem);
    }

    async getLabelText(labelName: string) {
        const elem = await this.getElement(labelName, ELEMENT_TYPE.LABEL);
        return waitForElementAndGetText(elem);
    }

    async getErrorMessageText(fieldName: string) {
        const elem = await this.getElement(fieldName, ELEMENT_TYPE.FIELD_ERROR);
        return waitForElementAndGetText(elem);
    }

    async checkFieldErrorMessageVisibility(fieldName: string, isPresent: boolean) {
        const elem = await this.getElement(fieldName, ELEMENT_TYPE.FIELD_ERROR);
        await checkElementIsPresent(elem, isPresent);
    }

    async unfocusInputElement(inputName: string) {
        const elem = await this.getElement(inputName, ELEMENT_TYPE.INPUT);
        await unfocusInput(elem.selector);
    }

    async checkTextVisibility(text: string, isVisible: boolean) {
        await checkTextVisibilityOnPage(this.rootElement, text.trim(), isVisible);
    }

    async checkTitleText(text: string) {
        const titleText = await waitForElementAndGetText(this.title);
        await checkTextsEquality(titleText, text, `${titleText} is not equal to ${text}`);
    }

    async checkButtonEnabled(buttonName: string, state: boolean) {
        const button = await this.getElement(buttonName, ELEMENT_TYPE.BUTTON);
        await checkButtonIsEnabled(button, state);
    }

    async checkElementSelected(elemName: string, elemType: ELEMENT_TYPE.CHECKBOX | ELEMENT_TYPE.INPUT | ELEMENT_TYPE.RADIO_BUTTON, state: boolean) {
        const elem = await this.getElement(elemName, elemType);
        await checkElementIsSelected(elem, state);
    }

    async checkElementVisible(elemName: string, elemType: ELEMENT_TYPE, state: boolean) {
        const elem = await this.getElement(elemName, elemType);
        await checkElementIsVisible(elem, state);
    }

    async checkUrl(elemName: string, elemType: ELEMENT_TYPE.LINK) {
        const url = await this.getElement(elemName, elemType);
        await checkUrlEquality(url)
    }
}
