
import { domElements } from "./domElements";
import "./styles.css";

const {searchForm, searchedText, textToScanContainer} = domElements;

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    search();
})

function search() {
    cleanUpScanField();
    let searched = searchedText.value.trim();
    if (searched !== "") {
        let text = textToScanContainer.innerHTML;
        let re = new RegExp(searched,"g");
        let newText = text.replace(re, `<mark class="highlighted-text">${searched}</mark>`);
        textToScanContainer.innerHTML = newText;
    }
}

// Cleans up all previous text modifications
function cleanUpScanField() {
    let text = textToScanContainer.innerHTML;
    let startTag = new RegExp(`<mark class="highlighted-text">`,"g");
    let newText = text.replace(startTag, "");
    textToScanContainer.innerHTML = newText;
    
}