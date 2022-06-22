const list = document.querySelector(".hero-section__list")
const template = document.querySelector(".template").content



fetch("https://restcountries.com/v3.1/all")
.then(response => response.json())
.then(data => {
    renderCountries(data)
    // console.log(data);
})

function renderCountries (CountriesArr){
    list.innerHTML = null
    
    CountriesArr.forEach(Countrie => {
        const newTemp = template.cloneNode(true)
        newTemp.querySelector(".hero-section__item-img").src = Countrie.flags.svg
        newTemp.querySelector(".hero-section__item-title").textContent = Countrie.altSpellings[1];
        newTemp.querySelector("#population").textContent = 'Population: '+ Countrie.population
        newTemp.querySelector("#region").textContent = 'Region: ' + Countrie.region
        newTemp.querySelector("#capital").textContent = 'capital: ' + Countrie.capital
        list.append(newTemp)
    });

}
