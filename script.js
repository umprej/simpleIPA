function transcribe(input, dict) {
    let word = input.toLowerCase();
    let result = "";
    if (word in dict) {
        result = dict[word]
    }
    return result;
}

async function getJSON(path) {
    const response = await fetch(path);
    const exam = await response.json();
    return exam;
}

async function main() {
    const dictUK = await getJSON("./data/en_UK.json");
    const dictUS = await getJSON("./data/en_US.json");

    const wordInput = document.querySelector("#word-input");
    const searchBtn = document.querySelector("#search");
    const resultDiv = document.querySelector(".results");
    
    resultDiv.textContent = "";

    searchBtn.addEventListener('click', (event) => {
        resultDiv.innerHTML += "<br>" + wordInput.value.toLowerCase();

    });

    wordInput.addEventListener("keyup", (event) => {
        console.log(event.keyCode);
        let resultIPA = transcribe(wordInput.value, dictUK);
        resultDiv.innerHTML = "<strong>" + resultIPA + "</strong>";

        //if ENTER key is pressed
        if (event.keyCode === 13) {
            searchBtn.click();
        }
      });

}

main();