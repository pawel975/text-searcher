
import { domElements } from "./domElements";
import "./styles.css";

const {searchForm, searchedText, textToScanContainer} = domElements;

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    search();
})

// console.log(searchForm)

function search() {
    let searched = searchedText.value.trim();
    console.log(searched);
    if (searched !== "") {
        let text = textToScanContainer.innerHTML;
        let re = new RegExp(searched,"g"); // search for all instances
        let newText = text.replace(re, `<mark class="highlighted-text">${searched}</mark>`);
        textToScanContainer.innerHTML = newText;
    }
}