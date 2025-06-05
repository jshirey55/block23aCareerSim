const addEventListeners = () => {
    const viewButtons = document.querySelectorAll(".view-details");
    viewButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            const puppyId = event.target.getAttribute("data-id");
            displayPuppyDetails(puppyId);
        });
    });

    const deleteButtons = document.querySelectorAll(".delete-puppy");
    deleteButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            const puppyId = event.target.getAttribute("data-id");
            deletePuppy(puppyId);
        });
    });
}

const displayPuppyDetails = (puppyId) => {
    const puppy = state.puppies.find(p => p.id === Number (puppyId));
    if (puppy) {
        const detailsDiv = document.getElementById("puppy-details");
        detailsDiv.className = "puppy-details";
        detailsDiv.innerHTML = `
        <h2>${puppy.name}</h2>
         <p>Breed: ${puppy.breed}</p>
         <p>ID: ${puppy.id}</p>
        <img src="${puppy.imageUrl}" alt="${puppy.name}">
        <p>Status: ${puppy.status}</p>
        <p>Team ID: ${puppy.teamId}</p>
        `;
        detailsDiv.scrollIntoView({ behavior: "smooth" });
    }
}

module.exports = { addEventListeners, displayPuppyDetails };