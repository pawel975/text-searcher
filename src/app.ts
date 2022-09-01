import domElements from "./domElements";
import "./styles.css";

const {searchForm, searchFormText} = domElements;

searchForm.addEventListener("submit", (e: any) => {
    e.preventDefault();
})