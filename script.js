const word_el = document.getElementById('word');
const popup = document.getElementById('popup-container');
const message_el = document.getElementById('success-message');
const wrongLetters_el = document.getElementById('wrong-letters');
const items = document.querySelectorAll('.item');
const message = document.getElementById('message');
const PlayAgainBtn = document.getElementById('play-again');
const correctLetters = [];
const wrongLetters = [];
let selectedWord = getRandomWord();

//? 1. adım words kelime listesinden rastgele kelime seçen function oluşturduk
function getRandomWord() {
    const words = ["javascript","java","python","css","html"];
    return words[Math.floor(Math.random() * words.length)];
}
console.log(getRandomWord())
//?-----------------------------------------------
//? 2. adım bilgisayarın seçtiği kelimeyi selected word olarak tanımlayıp rasgele kelime seçen fonksiyona eşitledik. kullanıcı harf girdiğinde bu harfa selected wordün içinde ise bunları yan yana yazdırmak için replace methodu kullandık. Containere display flex özelliği vererek her bir dizi yan yana aldık array  şeklindeki harfleri join ile string yapıp doğru oldukça yerlerine yazdırdık
function displayWord() { 
    let selectedWord = getRandomWord()   
    word_el.innerHTML = `
        ${selectedWord.split('').map(letter => `
            <div class="letter">
                ${correctLetters.includes(letter) ? letter: ''}
            </div>
        `).join('')}    
    `;
      const w = word_el.innerText.replace(/\n/g,'');
    if (w === selectedWord) {
        popup.style.display = 'flex';
        message_el.innerText = 'Tebrikler kazandınız.';
    }
}

//?------------------------------------------------------
function updateWrongLetters() {
    wrongLetters_el.innerHTML = `
        ${wrongLetters.length>0?'<h3>Hatalı harfler</h3>':''}
        ${wrongLetters.map(letter=> `<span>${letter}<span>`)}
    `;
     items.forEach((item,index) => {
        const errorCount = wrongLetters.length;
        if (index<errorCount) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    })

    if(wrongLetters.length === items.length) {
        popup.style.display = 'flex';
        message_el.innerText = 'Maalesef Kaybettiniz.';
    }
}

function displayMessage() {    
    message.classList.add('show');

    setTimeout(function() {
        message.classList.remove('show');
    }, 2000);
}

PlayAgainBtn.addEventListener('click', function() {
    correctLetters.splice(0);
    wrongLetters.splice(0);
    
    selectedWord = getRandomWord();
    displayWord();
    updateWrongLetters();

    popup.style.display = 'none';
});

window.addEventListener('keydown', function(e) {
    if (e.keyCode >= 65 && e.keyCode <= 90) {        
        const letter = e.key;

        if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter);
                displayWord();
            } else {
                displayMessage();
            }
        } else {
            if(!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);
                updateWrongLetters();
            }
            else {
                displayMessage();
            }
        }
    }
});

displayWord()