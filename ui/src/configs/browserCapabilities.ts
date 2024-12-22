const sauceOptions = {
    parentTunnel: "svcOSTAutomation1",
    maxDuration: 10800,
    screenResolution: "1920x1080",
};

const commonOptions = {
    maxInstances: 5,
    browserVersion: "latest",
    "sauce:options": { ...sauceOptions },
};

export const browserCapabilities = {
    local: {
        chrome: {
            browserName: "chrome",
            acceptInsecureCerts: true,
            "goog:chromeOptions": {
                args: [
                    "--incognito",
                    "--no-sandbox",
                    "--disable-web-security",
                    "--allow-running-insecure-content",
                    "--disable-gpu",
                    "--start-maximized",
                    "disable-extensions",
                    "--disable-infobars",
                ],
            },
        },
    },

    sauce: {
        chrome: {
            browserName: "chrome",
            browserVersion: "latest",
            platformName: "Windows 10",
            ...commonOptions,
        },
        firefox: {
            browserName: "firefox",
            browserVersion: "latest",
            platformName: "Windows 10",
            ...commonOptions,
        },
        edge: {
            browserName: "MicrosoftEdge",
            browserVersion: "latest",
            platformName: "Windows 10",
            ...commonOptions,
        },
        ie: {
            browserName: "internet explorer",
            browserVersion: "11",
            platformName: "Windows 10",
            ...commonOptions,
        },
        safari: {
            browserName: "safari",
            browserVersion: "14.1",
            ...commonOptions,
            "sauce:options": { ...sauceOptions, screenResolution: "1920x1440" },
        },
    },
};
