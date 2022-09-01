
import { domElements } from "./domElements";
import "./styles.css";

const {searchForm, searchFormText} = domElements;

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(searchFormText.value);
})

console.log(searchForm)