
import { domElements } from "./domElements";
import "./styles.css";

const {searchForm, searchedText, textToScanContainer} = domElements;

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // create rules modification TODO
    searchForPhrase(["caseSensitive"]);
})

function searchForPhrase(rules: string[]) {
    resetHighlights();
    let searched = searchedText.value.trim();
    if (searched !== "") {
        let text = textToScanContainer.innerHTML;
        let re = new RegExp(searched,"g");
        let newText = text.replace(re, `<mark class="highlighted-text">${searched}</mark>`);
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