import { TRegion, regions, TLifeCycle } from "@gs-automation/core-lib/core/config/basePath";

import _ from "lodash";

const ENVIRONMENTS = {
    dev1: {
        baseUrl: ""
    },

    qa1: {
        baseUrl: ""
    },

    qa3: {
        baseUrl: ""
    },

    uat: {
        baseUrl: ""
    },

    prod: {
        baseUrl: ""
    }
};

const REGION: TRegion = process.env.REGION && _.has(regions, process.env.REGION) ? (process.env.REGION as TRegion) : "global";
const LIFECYCLE: TLifeCycle =
    (process.env.LIFECYCLE as TLifeCycle) && _.has(ENVIRONMENTS, process.env.LIFECYCLE) ? (process.env.LIFECYCLE as TLifeCycle) : "dev1";
const config = {
    lifeCycle: LIFECYCLE,
    region: REGION,
    ...ENVIRONMENTS[LIFECYCLE],
};

export { config };
