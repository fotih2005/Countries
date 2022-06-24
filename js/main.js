const CONFIG = 'https://restcountries.com/v3.1/'
const elList = document.querySelector(".hero-section__list")
const template = document.querySelector(".template").content
const elSearch = document.querySelector(".hero-section__filter-input")
const elFormBtn = document.querySelector(".hero-section__btn")
const filterRegion = document.querySelector(".hero-section__select")
const btn = document.querySelector(".header-section__btn")


function mekeRequest(url, successFn, erorFn){
    elList.innerHTML = "<div class=\"loading-container\"><div class=\"loading\"></div><div id=\"loading-text\">loading</div></div>"
    fetch(url)
    .then(res => res.json())
    .then(data => {
        if(data.length > 0) successFn(data)
        else erorFn()
    })
}


function renderCountries (countries){
    elList.innerHTML = ''
    
    const frgament = document.createDocumentFragment()
    for (const country of countries) {
        const newTemp = template.cloneNode(true)
        newTemp.querySelector(".hero-section__item-img").src = country.flags.svg
        newTemp.querySelector(".hero-section__item-title").textContent = country.name.common + ' ' + country.fifa
        newTemp.querySelector("#population").textContent = 'Population: '+ country.population
        newTemp.querySelector("#region").textContent = 'Region: ' + country.region
        newTemp.querySelector("#capital").textContent = 'capital: ' + country.capital
        newTemp.querySelector("#borders").textContent = country.borders
        frgament.append(newTemp)
    }
    elList.append(frgament)
}

function empty (){
    elList.innerHTML = "<p>COUNTRY NOT FOUND :(</p>"
}

function getAllCountries(){
    mekeRequest(CONFIG + '/all',renderCountries, empty)
}
getAllCountries()

if(elSearch){
    elSearch.addEventListener('input', () =>{
        if(elSearch.value.trim()){
            mekeRequest(CONFIG + '/name/' + elSearch.value, renderCountries, empty)
        } else{
            mekeRequest(CONFIG + '/all/', renderCountries, empty)
        }
    })
}


elFormBtn.addEventListener("click", (e) => {
    e.preventDefault()
    mekeRequest(CONFIG + '/region/' + filterRegion.value, renderCountries, empty)
    if(filterRegion.value === 'All'){
        getAllCountries()
    }
})

btn.addEventListener('click', () => {
    document.querySelector('.body').classList.toggle("white-mode")
    if(btn.textContent ==='Dark mode'){
        btn.textContent = 'Light Mode'
    } else{
        btn.textContent = 'Dark mode'
    }
})



