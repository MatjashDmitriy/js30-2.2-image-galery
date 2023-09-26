const input = document.getElementById('input');
const grid = document.getElementsByClassName('grid')[0];
const header = document.getElementById('header');


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