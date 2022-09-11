
import { domElements } from "./domElements";
import "./styles.css";

const {searchForm, searchedText, textToScanContainer, ignoreCaseFlag, globalSearchFlag, resultChooserMatchesCount, resultChooserNextMatchBtn, resultChooserPrevMatchBtn, resultChooser} = domElements;

let matchIndex: number = 0;
let choosedMatchIndex: number = 0;

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    searchForPhrase();
})

resultChooserPrevMatchBtn.addEventListener("click", () => {
    if (choosedMatchIndex > 0) choosedMatchIndex--;
    resultChooserMatchesCount.textContent = `${choosedMatchIndex+1}/${matchIndex}`;
    chooseHighlight();
})

resultChooserNextMatchBtn.addEventListener("click", () => {
    if (choosedMatchIndex < matchIndex - 1) choosedMatchIndex++;
    resultChooserMatchesCount.textContent = `${choosedMatchIndex+1}/${matchIndex}`;
    chooseHighlight();
})

function searchForPhrase() {

    // Reseting settings
    resetHighlights();
    matchIndex = 0;
    resultChooser.classList.remove("visible");

    // Include regex flags
    let searchFlags: string = "";
    if (ignoreCaseFlag.checked) searchFlags += "i";
    if (!globalSearchFlag.checked) searchFlags += "g";

    let searched: string = searchedText.value.trim();
    if (searched !== "") {

        let text: string = textToScanContainer.innerHTML;
        let re = new RegExp(searched, searchFlags);


        let newText: string = 
        text.replace(re, (match): string => {
            const highlightedText = `<mark id="${matchIndex}" class="highlighted-text">${match}</mark>`
            matchIndex++
            return highlightedText;
        });

        textToScanContainer.innerHTML = newText;
        resultChooserMatchesCount.textContent = `${choosedMatchIndex+1}/${matchIndex}`;

    }

    // Showing results switch
    resultChooser.classList.add("visible");

    chooseHighlight();

    // Sending to server
    fetch("http://127.0.0.1:8888/todos", {
        method: "POST",
        body: JSON.stringify({name:"aa"}),
        headers: {
            "Content-type": "application/json",
        }
    })
}

// Cleans up all highlights from text
function resetHighlights() {
    let text: string = textToScanContainer.innerHTML;
    // Search for tags and erase them
    let highlightTag = new RegExp(`\<(.*?)\>`,"g");
    let scannedText: string = text.replace(highlightTag, "");
    textToScanContainer.innerHTML = scannedText;
}

function chooseHighlight() {
    const allHighlights = document.getElementsByTagName("mark");
    Array.from(allHighlights).forEach(highlight => {
        highlight.classList.remove("choosed-highlighted-text");
    })

    const choosedHighlight = document.getElementById(String(choosedMatchIndex));
    console.log(choosedHighlight)
    choosedHighlight.classList.add("choosed-highlighted-text");
}