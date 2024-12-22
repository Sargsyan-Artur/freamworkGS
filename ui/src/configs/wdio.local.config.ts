/* eslint-disable */
import "dotenv/config";
import reportportal from "wdio-reportportal-reporter";
import RpService from "wdio-reportportal-service";
import rpConfig from "../utils/services/reportPortalService";
import { browserCapabilities } from "./browserCapabilities";
import { hooks } from "../support/helpers/hooks";

const reporters: any[] = ["spec"];
if (process.env.RP_ENABLED === "true") {
    reporters.push([reportportal, rpConfig]);
}

export const config: WebdriverIO.Config = {

    specs: ["./tests/features/**/*.feature"],

    runner: "local",

    baseUrl: "https://www.greensky.com/sponsor/strongspas",

    maxInstances: parseInt(process.env.INSTANCES) || 1,

    capabilities: [browserCapabilities.local.chrome],

    logLevel: "error",

    framework: "cucumber",

    waitforTimeout: 60000,

    reporters: [...reporters],

    services: ["chromedriver", [RpService, {}]],

    cucumberOpts: {
        require: ["./src/steps/**/*.ts"],
        format: ["pretty"],
        strict: true,
        timeout: 240000,
        tagExpression: process.env.TAGS || "@all",
        retry: 0,
    },

    autoCompileOpts: {
        autoCompile: true,
        tsNodeOpts: {
            transpileOnly: true,
            project: "./tsconfig.json",
        },
        tsConfigPathsOpts: {
            baseUrl: "./src",
            paths: {
                "@config/*": ["./configs/*"],
                "@constants/*": ["./support/constants/*"],
                "@db/*": ["./support/db/*"],
                "@helpers/*": ["./support/helpers/*"],
                "@http/*": ["./support/http/*"],
                "@services/*": ["./utils/services/*"],
                "@logger/*": ["./utils/logger/*"],
                "@page_objects/*": ["./page_objects/*"],
                "@support/*": ["./support/*"],
            },
        },
    },
    ...hooks
};
