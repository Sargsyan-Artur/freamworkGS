import { Chance } from "chance";
import randomstring from "randomstring";
import shortUuid from "short-uuid";

const chance = new Chance();

export function generateAlphanumericString(length: number): string {
    return randomstring.generate({ length, charset: "alphanumeric" });
}

export function generateNumericString(length: number): string {
    return randomstring.generate({ length, charset: "numeric" });
}

export function generateAlphabeticString(length: number): string {
    return randomstring.generate({ length, charset: "alphabetic" });
}

export function generateRandomEmail(length?: number): string {
    const emailValue = length ? chance.email({ length: length, domain: "e.xm" }).slice(-length) : chance.email();
    if (/\S@/.test(emailValue)) {
        return emailValue;
    } else throw new Error(`String length provided is too small for email generation`);
}

export const generateUniqueEmail = (merchantId?: string, emailPreferences?) => {
    return `${(emailPreferences && emailPreferences.emailPrefix) || "AT"}_${shortUuid().new()}_${merchantId || ""}@mgail.com`.toLowerCase();
};

export function generateSpecialSymbols(length = 20) {
    return randomstring.generate({ length, charset: "!@#$%^*()_+-/*<>~.,|\\" });
}

export function generateStringWithSequence(length = 20, sequence: string) {
    return randomstring.generate({ length, charset: sequence });
}

export function generateFirstName() {
    return chance.first({ nationality: "en" });
}

export function generateLastName() {
    return chance.last({ nationality: "en" });
}

export function generateCompanyName() {
    return chance.company();
}

export function generatePhoneNumberWithNonDigitalSymbols() {
    return chance.phone({ country: "us" });
}

export function parseStringToNumber(string: string) {
    const result = parseInt(string);
    if (isNaN(result)) {
        throw new Error(`"${string}" can not be parsed to number.`);
    }
    return result;
}

export function generateIpAddress() {
    return chance.ip();
}

export function generateIpV6Address() {
    return chance.ipv6();
}
