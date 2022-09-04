
import { domElements } from "./domElements";
import "./styles.css";

const {searchForm, searchedText, textToScanContainer, ignoreCaseFlag} = domElements;

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    searchForPhrase();
})

function searchForPhrase() {

    resetHighlights();

    let searchFlags: string = "g";

    if (ignoreCaseFlag.checked) searchFlags += "i";

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
    let text = textToScanContainer.innerHTML;
    let highlightTag = new RegExp(`<mark class="highlighted-text">`,"g");
    let scannedText = text.replace(highlightTag, "");
    textToScanContainer.innerHTML = scannedText;
    
}