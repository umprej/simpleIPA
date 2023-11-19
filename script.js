function transcribe(input, dict) {
    let result = "";
    console.log(input);
    for (let i in input) {
        let word = input[i].toLowerCase();
        console.log(word);
        if (word in dict) {
            result += dict[word];
        }
        else {
            result += "/___/";
        }
    }

    console.log(result);
    result = result.replace(/\/\//g, " ")   //replace double slash with space, used when multi-word input
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
    let currStr = "";

    searchBtn.addEventListener('click', (event) => {
        resultDiv.innerHTML += wordInput.value.toLowerCase();
        wordInput.value = "";
    });

    wordInput.addEventListener("keyup", (event) => {
        let currDict = (currLang == "UK") ? dictUK : dictUS;
        currStr = wordInput.value.match(/\b(\w+)\b/g); //split string into words, remove ws
        let resultIPA = transcribe(currStr, currDict);
        resultDiv.innerHTML = "<strong>" + resultIPA + "</strong><br>";

        //if ENTER key is pressed
        if (event.keyCode === 13) {
            searchBtn.click();
        }
    });

    speakBtn.addEventListener('click', (event) => {
        let utterance = new SpeechSynthesisUtterance(currStr);
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