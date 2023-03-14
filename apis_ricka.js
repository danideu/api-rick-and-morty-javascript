
//Esperamos que esté cargado todo el DOM
document.addEventListener("DOMContentLoaded", () => {
    fetchData()
})

const fetchData = async () => {
    try{
        loadingData(true)

        const res = await fetch("https://rickandmortyapi.com/api/character")
        const data = await res.json()
        // console.log(data)
        pintarCards(data)
    } catch (error){
        console.log(error)
    } finally {
        loadingData(false)
    }
}

const pintarCards = (data) => {
    const cards = document.querySelector("#card-dinamica")
    const templateCard = document.querySelector("#template-card").content
    const fragment = document.createDocumentFragment()

    // console.log(data)
    data.results.forEach(item => {
        // console.log(item.name)
        const clone = templateCard.cloneNode(true)
        clone.querySelector("h5").textContent = item.name
        clone.querySelector("p").textContent = item.species
        clone.querySelector(".card-img-top").setAttribute("src", item.image)
        // console.log(item.image)

        //Guardamos en el fragment para evitar el reflow
        fragment.appendChild(clone)
    });

    cards.appendChild(fragment)
}

//Pintar el loading
const loadingData = (estado) => {
    const loading = document.querySelector("#loading")
    if ( estado ){
        loading.classList.remove("d-none")
    }else{
        loading.classList.add("d-none")
    }
}

