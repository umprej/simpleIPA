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
    const speakBtn = document.querySelector("#speak");
    const radioBtns = document.querySelectorAll("input[name='dict-lang']");

    resultDiv.textContent = "";
    let currLang = "UK";

    searchBtn.addEventListener('click', (event) => {
        resultDiv.innerHTML += "<br>" + wordInput.value.toLowerCase();
        wordInput.value = "";
    });

    wordInput.addEventListener("keyup", (event) => {
        let currDict = (currLang == "UK") ? dictUK : dictUS;
        let resultIPA = transcribe(wordInput.value, currDict);
        resultDiv.innerHTML = "<strong>" + resultIPA + "</strong>";

        //if ENTER key is pressed
        if (event.keyCode === 13) {
            searchBtn.click();
        }
      });

    searchBtn.addEventListener('click', (event) => {
        resultDiv.innerHTML += "<br>" + wordInput.value.toLowerCase();
    });

    speakBtn.addEventListener('click', (event) => {
        let utterance = new SpeechSynthesisUtterance(wordInput.value.toLowerCase());
        utterance.lang = (currLang == "UK") ? "en-GB" : "en-US";
        speechSynthesis.speak(utterance);
    })

    radioBtns.forEach((button) => {
        button.addEventListener('change', (event) => {
            currLang = button.value;
        });
    });


}

main();