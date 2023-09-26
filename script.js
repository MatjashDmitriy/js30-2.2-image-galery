const input = document.getElementById('input');
const grid = document.getElementsByClassName('grid')[0];
const header = document.getElementById('header');
const clearInput = document.getElementById('clear-input');

console.log('Требования\n\n1.Вёрстка +10\n2.При загрузке приложения на странице отображаются полученные от API изображения +10\n3.Если в поле поиска ввести слово и отправить поисковый запрос, на странице отобразятся изображения соответствующей тематики, если такие данные предоставляет API +10\n4.Поиск +30\n5.Качество оформления приложения предполагает собственное оригинальное оформление равное или отличающееся в лучшую сторону по сравнению с демо +10\n\nОбщий бал 70/60')


// LOAD RANDOM IMG
function loadRandomImages() {
    removeImages();

    const randomPage = Math.floor(Math.random() * 10) + 1; 

    const url = `https://api.unsplash.com/photos/?page=${randomPage}&per_page=9&client_id=F7siWtiFq4YZXSrdJ7nuaBic8xnwh_qgcXbVUMBPTVw`;

    fetch(url)
        .then(response => {
            if (response.ok)
                return response.json();
            else {
                console.log(response.status);
            }
        })
        .then(data => {
            const imageNodes = [];
            for (let i = 0; i < data.length; i++) {
                imageNodes[i] = document.createElement('div');
                imageNodes[i].className = 'img';
                imageNodes[i].style.backgroundImage = 'url(' + data[i].urls.raw + ')';
                imageNodes[i].addEventListener('dblclick', function () {
                    window.open(data[i].links.download, '_blank')
                });
                grid.appendChild(imageNodes[i]);
            }
        });

        input.focus();
}

loadRandomImages();

// SEARCH IF ENTER IS PRESSED
input.addEventListener('keydown', function(event) {
    if(event.key === 'Enter'){
        loadImg();
    }
});

// LOAD FROM API
function loadImg() {
    removeImages();

    const url = 'https://api.unsplash.com/search/photos/?query='+input.value+'&per_page=9&client_id=F7siWtiFq4YZXSrdJ7nuaBic8xnwh_qgcXbVUMBPTVw';

    fetch(url)

    .then(response =>{
        if(response.ok)
            return response.json();
         else {
            console.log(response.status)
        }
    })
    
    .then(data => {
        const imageNodes = [];
        for (let i = 0; i < data.results.length; i++){
            imageNodes[i] = document.createElement('div');
            imageNodes[i].className = 'img';
            imageNodes[i].style.backgroundImage = 'url('+data.results[i].urls.raw+')';
            imageNodes[i].addEventListener('dblclick', function(){
                window.open(data.results[i].links.download, '_blank')
            });
            grid.appendChild(imageNodes[i]);
        }
    })
}

// REMOVE IMG
function removeImages() {
    grid.innerHTML = '';
}

// DISPLAY OR HIDE THE CROSS IN THE INPUT
input.addEventListener('input', () => {
    clearInput.style.display = input.value.length > 0 ? 'block' : 'none';
});

// CLEAR INPUT
clearInput.addEventListener('click', () => {
    input.value = '';
    clearInput.style.display = 'none';
    input.focus(); 
});