export default {
    reportPortalClientConfig: {
        token: process.env.RP_TOKEN,
        endpoint: process.env.RP_ENDPOINT,
        launch: `[${process.env.LIFECYCLE || "dev1"}] Corp Web Sponsor Pages UI. [${process.env.BROWSER || "chrome"}] [${
            process.env.WINDOW_SIZE || "1920x1080"
        }]`,
        project: process.env.RP_PROJECT,
        mode: "DEFAULT",
        debug: false,
        description: "Launch description text",
        attributes: [{ key: "tag", value: "foo" }],
    },
    reportSeleniumCommands: false,
    seleniumCommandsLogLevel: "debug",
    autoAttachScreenshots: true,
    screenshotsLogLevel: "info",
    parseTagsFromTestTitle: false,
    cucumberNestedSteps: true,
    autoAttachCucumberFeatureToScenario: true,
};
