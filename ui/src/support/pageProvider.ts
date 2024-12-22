import { BasePage } from "@page_objects/basePage";
import { SponsorPage, sponsorPage } from "@page_objects/sponsorPage";

const pages = new Map<string, BasePage>([
    [SponsorPage.PAGE_NAME, sponsorPage]
]);

export const getPage = (pageName: string) => {
    if (pages.has(pageName)) {
        return pages.get(pageName);
    } else {
        throw new Error(`No such page with name ${pageName} in list of pages`);
    }
};
