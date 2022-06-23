const list = document.querySelector(".hero-section__list")
const template = document.querySelector(".template").content
const frgament = document.createDocumentFragment()
const elSearch = document.querySelector(".hero-section__filter-input")
const btn = document.querySelector(".header-section__btn")
const body = document.querySelector(".body")
const btnText = document.querySelector(".header-section__text")

let dataCountry = []

fetch('https://restcountries.com/v3.1/all')
.then(res => {res.json()
    .then(data => {
        dataCountry = data;
        renderCountries(dataCountry)
    })
});
function renderCountries (CountriesArr){
    list.innerHTML = null
    
    CountriesArr.forEach(Countrie => {
        const newTemp = template.cloneNode(true)
        newTemp.querySelector(".hero-section__item-img").src = Countrie.flags.svg
        newTemp.querySelector(".hero-section__item-title").textContent = Countrie.name.common + ' ' + Countrie.fifa
        newTemp.querySelector("#population").textContent = 'Population: '+ Countrie.population
        newTemp.querySelector("#region").textContent = 'Region: ' + Countrie.region
        newTemp.querySelector("#capital").textContent = 'capital: ' + Countrie.capital
        newTemp.querySelector("#borders").textContent = Countrie.borders
        frgament.append(newTemp)
    });
    list.append(frgament)
}

elSearch.addEventListener('input', (e)  => {
    const elSearchValue = new RegExp(e.target.value, "gi")

    const filterCountries = dataCountry.filter((country) => country.name.common.match(elSearchValue))
    renderCountries(filterCountries)
})

btn.addEventListener('click', () => {
    body.classList.toggle('white-mode')
    btnText.textContent = 'Dark mode'
})