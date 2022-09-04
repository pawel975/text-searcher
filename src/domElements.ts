
export const domElements = {
    searchForm: <HTMLFormElement> document.querySelector(".search-form"),
    searchedText: <HTMLInputElement> document.querySelector(".search-form__text"),
    textToScanContainer: <HTMLTextAreaElement> document.querySelector(".text-to-scan"),
    ignoreCaseFlag: <HTMLInputElement> document.getElementById("ignore-case"),
    globalSearchFlag: <HTMLInputElement> document.getElementById("global-search"),
}