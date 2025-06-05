//Build a minigame that lets you view a roster of puppies rendered from the API, click on individual puppies to display their details, and add/delete puppies to and from the roster via a form.

/* Steps:
1. Set up a basic HTML structure with a container for the puppy roster and a form for adding new puppies.
2. Use JavaScript to fetch the puppy data from the API and render it in the roster.
3. Implement click events on each puppy to display their details in the div puppy-details.
4. Create a form that allows users to add new puppies to the roster.
5. Implement functionality to delete puppies from the roster.
6. Style the page with CSS for better presentation.
7. Use the DOM to generate and manipulate HTML and styles according to the requirements
8. Use Jest to test functions.

*/

const COHORT_ID = "2503-ftb-et-web-am";

const API_URL = `https://fsa-puppy-bowl.herokuapp.com/api/${COHORT_ID}/players`;

const state = {
  puppies: [],
  selectedPuppy: null,
};

const fetchAllPuppies = async () => {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();

    console.log(data);

    const { players } = data.data;
    state.puppies = players;
    renderPuppyRoster();

  } catch (error) {
    console.error("Error fetching puppies:", error);
  }
}

const renderPuppyRoster = () => {
    const rosterContainer = document.getElementById("roster-list");
    rosterContainer.innerHTML = "";
    
    state.puppies.forEach((puppy) => {
        const puppyCard = document.createElement("li");
        puppyCard.className = "puppy-card";
        puppyCard.innerHTML = `
        <h3>${puppy.name}</h3>
        <img src="${puppy.imageUrl}" alt="${puppy.name}">
        <button class="view-details" data-id="${puppy.id}">View Details</button>
        <button class="delete-puppy" data-id="${puppy.id}">Delete</button>
        `;
        rosterContainer.appendChild(puppyCard);
    });
    
    addEventListeners();
}

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

const addPuppy = async (event) => {
    event.preventDefault();

    const form = event.target;
    const name = form["puppy-name"].value.trim();
    const breed = form["puppy-breed"].value.trim();
    const status = form["puppy-status"].value || "bench";
    const imageUrl = form["puppy-image"].value.trim();
    const teamId = form["team-id"].value

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, breed, imageUrl, status, teamId}),
        });

        if (!response.ok) {
            throw new Error("Failed to add puppy");
        }

        const newPuppy = await response.json();
        await fetchAllPuppies();
        form.reset();

    } catch (error) {
        console.error("Error adding puppy:", error);
    }
}

const deletePuppy = async (puppyId) => {
    try {
        const response = await fetch(`${API_URL}/${puppyId}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error("Failed to delete puppy");
        }

        state.puppies = state.puppies.filter(p => p.id !== Number (puppyId));
        renderPuppyRoster();

    } catch (error) {
        console.error("Error deleting puppy:", error);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    fetchAllPuppies();

    const addPuppyForm = document.getElementById("roster-form");
    addPuppyForm.addEventListener("submit", addPuppy);
});



