let partMovies = movies.slice(0, 50);
let elMovList = document.querySelector(".movies__list");
let elModalDialog = document.querySelector('.modal__dialog')
fnRender(partMovies)
function fnRender(data) {
  let arrLocDataHeart = JSON.parse(window.localStorage.getItem('locdata'))
  elMovList.innerHTML = ''
  data.map((item, index) => {
    let newLi = document.createElement("li")
    newLi.classList = 'movies__item'
    newLi.innerHTML = `
    <div class="movies__card">
    <a href="https://www.youtube.com/watch?v=${item.ytid}" target="_blank" class=""><img src="https://i.ytimg.com/vi/${item.ytid}/hq720.jpg?" alt="" /></a>
    <div class="card__info">
      <h4>${item.Title.toString().split("").slice(0,15).join("")}</h4>
      <div class="card__inner fs-4">
      <p class="text-secondary">${item.movie_year}</p>
      <p class="text-warning fw-bold opacity-75">${item.imdb_rating}</p>
      </div>
      <p class="fs-5">${item.Categories.toString().split("").slice(0,20).join("")}</p>
      <div class="flex">
      
      <button onclick="fnMore('${item.ytid}')" type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
        more
      </button><i onclick="fnData('${item.ytid}')" class="${arrLocDataHeart.find((i)=>i.ytid == item.ytid) ? "bi bi-heart-fill": "bi bi-heart"}"></i>
      </div>

    `
    elMovList.appendChild(newLi);
  });
}
function fnYear(value) {
  if(value =='old'){
    fnRender(partMovies.sort((a,b)=> a.movie_year - b.movie_year));
  }else{
    fnRender(partMovies.sort((a,b)=> b.movie_year - a.movie_year));
  }
}
function fnRaiting(value) {
  if(value =='min'){
    fnRender(partMovies.sort((a,b)=> a.imdb_rating - b.imdb_rating));
  }else{
    fnRender(partMovies.sort((a,b)=> b.imdb_rating - a.imdb_rating));
  }
}
function fnSearch(event) {
  event.preventDefault()
  let val = event.target.movieTitle.value
  fnRender(partMovies.filter((item)=> item.Title.toString().toLowerCase().includes(val.toLowerCase())))
}
function fnMore(id){
  let item = partMovies.find(i=> i.ytid == id)
  elModalDialog.innerHTML =
  `
  <div class="modal-content border border-1 border-warning">
  <div class="modal-header border-0">
    
    <button onclick="pauseVideo()" type="button" class="btn-close bg-light" data-bs-dismiss="modal" aria-label="Close"></button>
  </div>
  <div class="modal-body" id="youtubePlayer">

   <iframe  data-fullscreen-container="true" controlslist="nodownload" class="iframe" height="100" src="https://www.youtube.com/embed/${item.ytid.toString().split("").slice(0,20).join("")}" allow='autoplay' allowfullscreen ></iframe>
   <h1 class="modal-title mt-3 fs-5" id="staticBackdropLabel">${item.fulltitle}</h1>
   <p class="mt-3">${'Categories: ' + item.Categories}</p>
   <p>${'Language: ' + item.language}</p>
   <p>${item.summary}</p>
  </div>
  <div class="df modal-footer border-0">
  <div class="df fs-4"> 
  <p class="text-secondary">${item.movie_year}</p>
  <p class="text-warning ms-3 fw-bold opacity-75">${item.imdb_rating}</p>
  </div>
    <button onclick="pauseVideo()"  type="button" class="btn btn-warning" data-bs-dismiss="modal">OK</button>
  </div>
  </div>
  `
}
function pauseVideo(){
  var youtubePlayer = document.getElementById('youtubePlayer')
  setTimeout(()=>{
    youtubePlayer.innerHTML = ''
  },500)
}

let elFavMov = document.querySelector('.favourite__movie')
let locData = []
  
function fnData(id){
  let item = partMovies.find(i=> i.ytid == id)
  if(window.localStorage.getItem('locdata')){
    locData = JSON.parse(window.localStorage.getItem('locdata'))
  }
  if(locData.find((i)=> i.ytid == item.ytid)){
    window.localStorage.setItem('locdata', JSON.stringify(locData.filter((k)=> k.ytid != id)))
  }else{
    locData.push(item)
    window.localStorage.setItem('locdata', JSON.stringify(locData))
  }
  fnRender(partMovies)
}
function fnRenLocData(){
  elFavMov.innerHTML = ''
  let favouriteMovie = JSON.parse(window.localStorage.getItem('locdata'))
  favouriteMovie.forEach((item)=> {
    let newLi = document.createElement('li')
    newLi.innerHTML = 
    `
    <div class="offcanvas__item mt-3">
      <img onclick="fnMore('${item.ytid}')" data-bs-toggle="modal" data-bs-target="#staticBackdrop" class="ofcan__img" src="https://i.ytimg.com/vi/${item.ytid}/hq720.jpg?" alt="">
      <h5 class="ms-3">${item.Title.toString()}</h5>
    </div>
    `
    elFavMov.append(newLi)
    return True
  })
}

//let count = 0
//function partPagination(part){
//  count = part
//  fnRender(partMovies.slice((part - 1) * 10, part * 10))
//}
//function fnPagination(val){
//  if(val == 'prev' && count >= 2){
//    fnRender(partMovies.slice((count - 2) * 10, (count - 1) * 10))
//    count = count - 1
//  }else if(val == "next"){
//    fnRender(partMovies.slice(count * 10, (count + 1) * 10))
//    count = count + 1
//  }
//}
//for(let i = 1; i<= partMovies.length / 10; i++){
//  document.querySelector('.pagination__inner').innerHTML += `
//    <li class="page-item text-dark"><button onclick="partPagination(${i})" class="page-link" href="#">${i}</button></li>
//  `
//}
//fnRenLocData()

let elHeader = document.querySelector('.header')
let elToTop = document.querySelector('.to__top')

window.addEventListener('scroll', (e)=>{
  if(scrollY >=0 && scrollY <=40){
    elHeader.classList.remove('bg')
  }else{
    elHeader.classList.add('bg')
  }
})
window.addEventListener('scroll', (e)=>{

  if(scrollY >=0 && scrollY <=3000){
    elToTop.style.display = 'none'
  }else{
    elToTop.style.display = 'flex'
  }
})  
