const genButton = document.getElementById('submit')
const fileButton = document.getElementById('fileInput')
const txtElement = document.getElementById('fileContents')
genButton.addEventListener('click', generateRandomText)
fileButton.addEventListener('change', handleFileSelect)

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
                const currentWord = words[i].toLowerCase()
                if (!markovModel[currentWord]) {
                    markovModel[currentWord] = []
                }
                if (i < words.length - 1) {
                    const nextWord = words[i + 1].toLowerCase()
                    markovModel[currentWord].push(nextWord)
                }
            }
            genButton.disabled = false
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
    let result = '<span class="first">' + currentWord + '</span>'
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

function generateRandomParagraph() {
    let result = '<p>'
    const numSentences = 3 + Math.floor(Math.random()*8)
    for (let j = 0 ; j < numSentences ; j++) {
        const numWords = 5 + Math.floor(Math.random()*16)
        result = result + generateText(numWords) + '. '
    }
    result = result + '</p>'
    return result
}

function generateRandomText() {
    const numParas = document.getElementById('paras')
    const numParasInt = parseInt(numParas.value, 10)
    let result = ''
    for (let i = 0 ; i < numParasInt ; i++) {
        result = result + generateRandomParagraph()
    }

    txtElement.innerHTML = result
}