document.getElementById('fileInput').addEventListener('change', handleFileSelect);
const genButton = document.getElementById('submit')
const preElement = document.getElementById('fileContents')
genButton.onclick = generateRandomText

let markovModel = {}

function handleFileSelect(event) {
    const fileInput = event.target;
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            const fileContents = e.target.result;
            const words = fileContents.split(/\s+/)
            for (let i = 0 ; i < words.length ; i++) {
                const currentWord = words[i]
                const nextWord = words[i + 1]
                if (!markovModel[currentWord]) {
                    markovModel[currentWord] = []
                }
                markovModel[currentWord].push(nextWord)
            }
            genButton.disabled = false
            //generateText(10)
        };

        // Read the file as text
        reader.readAsText(file);
    } else {
        alert('No file selected.');
    }
}

function generateText(numWords) {
    const keysArray = Object.keys(markovModel)
    const initialWordIndex = Math.floor(Math.random()*keysArray.length)
    const initialWord = keysArray[initialWordIndex]
    let currentWord = initialWord
    let result = currentWord
    for (let i = 0 ; i < numWords - 1 ; i++) {
        const potentialNextWords = markovModel[currentWord]
        if (!potentialNextWords || potentialNextWords.length === 0) {
            break
        }
        const nextWordIndex = Math.floor(Math.random()*potentialNextWords.length)
        const nextWord = potentialNextWords[nextWordIndex]
        result = result + ' ' + nextWord
        currentWord = nextWord
    } 
    return result
}

function generateRandomText() {
    const numParas = document.getElementById('paras')
    const numParasInt = parseInt(numParas.value, 10)
    let result = ''
    for (let i = 0 ; i < numParasInt ; i++) {
        result = result + '<p>'
        const numSentences = 3 + Math.floor(Math.random()*8)
        for (let j = 0 ; j < numSentences ; j++) {
            const numWords = 5 + Math.floor(Math.random()*16)
            result = result + generateText(numWords) + '. '
        }
        result = result + '</p>'
    }

    preElement.innerHTML = result
}