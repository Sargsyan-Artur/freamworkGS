import { Selector } from "webdriverio";

export enum TIMEOUTS {
    DEFAULT_WAIT_TIMEOUT = 120000,
}

export const ERROR_MESSAGES = {
    ELEMENT_IS_NOT_VISIBLE: (selector: Selector) => `Element is not visible: ${selector}`,
    ELEMENT_IS_VISIBLE: (selector: Selector) => `Element is visible: ${selector}`,
    ELEMENT_IS_PRESENT: (selector: Selector) => `Element is present: ${selector}`,
    ELEMENT_IS_NOT_PRESENT: (selector: Selector) => `Element is not present: ${selector}`,
    ELEMENT_IS_DISABLED: (selector: Selector) => `Element is disabled: ${selector}`,
    ELEMENT_IS_ENABLED: (selector: Selector) => `Element is enabled: ${selector}`,
    ELEMENT_IS_NOT_CLICKABLE: (selector: Selector) => `Element is not clickable: ${selector}`
};

export enum ATTRIBUTE {
    CLASS = "class",
}

export enum ENCODING {
    BASE64 = "base64",
}

export enum ELEMENT_NAME {
    HOW_THE_PROGRAM_WORKS = "How The Program Works",
    BENEFITS = "Benefits",
    OUR_PRODUCTS = "Our Products",
    MOBILE_APP_ADVANTAGE = "Mobile App Advantage",
    FIRST_NAME = "First Name",
    LAST_NAME = "Last Name",
    COMPANY = "Company",
    PHONE_NUMBER = "Phone Number",
    EMAIL = "Email",
    LOGO = "Logo",
    GET_STARED = "Get Started",
    REQUIRED_MESSAGE_FIRST_NAME = "Required Message First Name",
    REQUIRED_MESSAGE_LAST_NAME = "Required Message Last Name",
    REQUIRED_MESSAGE_COMPANY = "Required Message Company",
}

export enum ELEMENT_TYPE {
    BUTTON = "button",
    DROPDOWN = "dropDown",
    LABEL = "label",
    CHECKBOX = "checkbox",
    LINK = "link",
    INPUT = "input",
    FIELD_ERROR = "fieldError",
    RADIO_BUTTON = "radioButton",
}
