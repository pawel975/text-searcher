
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
    if (globalSearchFlag.checked) searchFlags += "g";

    let searched: string = searchedText.value.trim();
    if (searched !== "") {

        let text: string = textToScanContainer.innerHTML;
        let re = new RegExp(searched, searchFlags);
        let newText: string = text.replace
        (re, (match) => (`<mark class="highlighted-text">${match}</mark>`));
        textToScanContainer.innerHTML = newText;
    }
}

// Cleans up all highlights from text
function resetHighlights() {
    let text: string = textToScanContainer.innerHTML;
    let highlightTag = new RegExp(`<mark class="highlighted-text">`,"g");
    let scannedText: string = text.replace(highlightTag, "");
    textToScanContainer.innerHTML = scannedText;
    
}