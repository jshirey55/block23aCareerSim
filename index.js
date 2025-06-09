const COHORT = "2503-FTB-ET-WEB-AM"

const API_URL = `https://fsa-puppy-bowl.herokuapp.com/api/${COHORT}/players`

const state = {
    pets: []
}

const fetchAllPets = async () => {
    try {
        const response = await fetch(API_URL)
        const data = await response.json()
        const { players } = data.data

        state.pets = players
        renderAllPets()
    } catch (error) {
        console.log(error)
    }
}

const createNewPet = async (name, breed, status, imageUrl, teamId) => {
    
    try {
        await fetch(API_URL, {
            method: "POST",
            body: JSON.stringify({
                name,
                breed,
                status,
                imageUrl,
                teamId: null
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })

        fetchAllPets()
    } catch (error) {
        console.log(error)
    }
}

const removePet = async (id) => {
    try {
        await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        })

fetchAllPets()

    } catch (error) {
        console.log(error)
    }
}

const renderAllPets = () => {
    const petsContainer = document.getElementById("list-of-pets-container")
    const petList = state.pets

    if (!petList || petList.length === 0) {
        petsContainer.innerHTML = "<h3>No pets found</h3>"
        return
    }

    petsContainer.innerHTML = ""

    petList.forEach((pet) => {
        const petElement = document.createElement("div")
        petElement.classList.add("pet-card")
        petElement.innerHTML = `
            <div class = renderSide>
            <img class = "renderedImg" src = "${pet.imageUrl}" alt="${pet.name}">
                <p class = "renderP">
                    Name: ${pet.name}<br>
                    Breed: ${pet.breed}<br>
                    Status:  ${pet.status}<br>
                    Team ID: ${pet.teamId}<br>
                    <button class = "delete-button" data-id="${pet.id}">Remove</button><br>
                    <button class = "details-button">Details</button>
                </p>
            </div>
        `

        const detailsButton = petElement.querySelector(".details-button")
    detailsButton.addEventListener("click", () => {
        const detailsDiv = document.getElementById("pet-details-container")
    
        detailsDiv.innerHTML = `
         <div class = detailsDiv>
        <h3 id=h3det>Pet Details</h3>
            <img class = "renderedImgDetails" src = "${pet.imageUrl}" alt="${pet.name}">
                <p class = "renderPDetails">
                    Name: ${pet.name}<br>
                    Breed: ${pet.breed}<br>
                    Status:  ${pet.status}<br>
                    Team ID: ${pet.teamId}<br>
                </p>
            </div>
        `
        detailsDiv.style.display = "inline-block"
})
    petsContainer.appendChild(petElement)

    const deleteButton = petElement.querySelector(".delete-button")
    deleteButton.addEventListener("click", (e) => {
            try {
                e.preventDefault()
                removePet(pet.id)
            } catch (error) {
                console.log(error)
            }
        })
    })
}

const addListenerToForm = () => {
    const form = document.querySelector("#new-pet-form")

    form.addEventListener("submit", async (e) => {
        e.preventDefault()

        await createNewPet(
            form.name.value,
            form.breed.value,
            form.status.value,
            form.imageUrl.value,
            form.teamId.value
        )

        form.name.value = ""
        form.breed.value = ""
        form.status.value = ""
        form.imageUrl.value = ""
        form.teamId.value = ""
    })
}

const init = async () => {
    await fetchAllPets()
    addListenerToForm()
}

init()