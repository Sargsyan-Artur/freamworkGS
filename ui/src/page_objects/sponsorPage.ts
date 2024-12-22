import { BasePage } from "@page_objects/basePage";
import { ELEMENT_NAME } from "@constants/constants";

export class SponsorPage extends BasePage {
    static PAGE_NAME = "Sponsor";

    buttons = {
        [ELEMENT_NAME.LOGO]: this.logo,
        [ELEMENT_NAME.BENEFITS]: this.benefits,
        [ELEMENT_NAME.HOW_THE_PROGRAM_WORKS]: this.howTheProgramWorks,
        [ELEMENT_NAME.OUR_PRODUCTS]: this.ourProducts,
        [ELEMENT_NAME.MOBILE_APP_ADVANTAGE]: this.mobileAppAdvantage,
        [ELEMENT_NAME.GET_STARED]: this.getStarted,
    };

    inputs = {
        [ELEMENT_NAME.FIRST_NAME]: this.firstName,
        [ELEMENT_NAME.LAST_NAME]: this.lastName,
        [ELEMENT_NAME.COMPANY]: this.company,
        [ELEMENT_NAME.PHONE_NUMBER]: this.phoneNumber,
        [ELEMENT_NAME.EMAIL]: this.email,
    };

    fieldErrors = {
        [ELEMENT_NAME.REQUIRED_MESSAGE_FIRST_NAME]: this.firstNameErrorMessage,
        [ELEMENT_NAME.REQUIRED_MESSAGE_LAST_NAME]: this.lastNameErrorMessage,
        [ELEMENT_NAME.REQUIRED_MESSAGE_COMPANY]: this.companyErrorMessage,
    };

    get url() {
        return "sponsor/strongspas";
    }

    get rootElement() {
        return $("body");
    }

    get logo() {
        return $(".sponsorLogo");
    }

    get benefits() {
        return $("ul.sponsor-nav li:nth-of-type(1) a");
    }

    get howTheProgramWorks() {
        return $("ul.sponsor-nav li:nth-of-type(3) a");
    }

    get ourProducts() {
        return $("ul.sponsor-nav li:nth-of-type(4) a");
    }

    get mobileAppAdvantage() {
        return $("ul.sponsor-nav li:nth-of-type(5) a");
    }

    get firstName() {
        return $("#FirstName");
    }

    get lastName() {
        return $("#LastName");
    }

    get company() {
        return $("#Company");
    }

    get phoneNumber() {
        return $("#Phone");
    }

    get email() {
        return $("#Email");
    }

    get getStarted() {
        return $("button.mktoButton");
    }

    get firstNameErrorMessage() {
        return $("#ValidMsgFirstName");
    }

    get lastNameErrorMessage() {
        return $("#ValidMsgLastName");
    }

    get companyErrorMessage() {
        return $("#ValidMsgCompany");
    }
}

export const sponsorPage = new SponsorPage();
