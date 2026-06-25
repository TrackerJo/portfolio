import { tutorialPages } from "./constants";

export function getTutorialNextPage(): string | undefined {
    const viewedPages = JSON.parse(localStorage.getItem("viewedPages") || "[]");
    const unviewedPages = tutorialPages.filter((page) => !viewedPages.includes(page));
    return unviewedPages.length > 0 ? unviewedPages[0] : undefined;
}

export function markPageAsViewed(page: string): void {
    const viewedPages = JSON.parse(localStorage.getItem("viewedPages") || "[]");
    if (!viewedPages.includes(page)) {
        viewedPages.push(page);
        localStorage.setItem("viewedPages", JSON.stringify(viewedPages));
    }
}