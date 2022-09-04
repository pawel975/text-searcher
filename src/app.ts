
import { domElements } from "./domElements";
import "./styles.css";

const {searchForm, searchedText, textToScanContainer, ignoreCaseFlag, globalSearchFlag} = domElements;

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    searchForPhrase();
})

function searchForPhrase() {

    resetHighlights();

    // Include regex flags
    let searchFlags: string = "";
    if (ignoreCaseFlag.checked) searchFlags += "i";
    if (!globalSearchFlag.checked) searchFlags += "g";

    let searched: string = searchedText.value.trim();
    if (searched !== "") {

        let text: string = textToScanContainer.innerHTML;
        let re = new RegExp(searched, searchFlags);

        let matchIndex = 0;

        let newText: string = text.replace
        (re, (match) => {
            const highlightedText = `<mark id="${matchIndex}" class="highlighted-text">${match}</mark>`
            matchIndex++
            return highlightedText;
        });
        textToScanContainer.innerHTML = newText;
    }
}

// Cleans up all highlights from text
function resetHighlights() {
    let text: string = textToScanContainer.innerHTML;
    let highlightTag = new RegExp(`\<(.*?)\>`,"g");
    let scannedText: string = text.replace(highlightTag, "");
    textToScanContainer.innerHTML = scannedText;
    
}