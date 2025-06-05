window.HTMLElement.prototype.scrollIntoView = function() {};

const { addEventListeners, displayPuppyDetails } = require("./utils");

describe('displayPuppyDetails', () => {
  beforeEach(() => {
    document.body.innerHTML = `<div id="puppy-details"></div>`;
    global.state = {
      puppies: [
        { id: 1, name: "Fido", breed: "Lab", imageUrl: "img.jpg", status: "bench", teamId: 2 }
      ]
    };
  });

  it('renders puppy details in the DOM', () => {
    displayPuppyDetails(1);
    const detailsDiv = document.getElementById('puppy-details');
    expect(detailsDiv.innerHTML).toContain("Fido");
    expect(detailsDiv.innerHTML).toContain("Lab");
    expect(detailsDiv.innerHTML).toContain("img.jpg");
  });
});

describe('addEventListeners', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <button class="view-details" data-id="1"></button>
      <div id="puppy-details"></div>
    `;
    global.state = {
      puppies: [
        { id: 1, name: "Fido", breed: "Lab", imageUrl: "img.jpg", status: "bench", teamId: 2 }
      ]
    };
  });

  it('adds click event to view-details button', () => {
    addEventListeners();
    const button = document.querySelector('.view-details');
    button.click();
    const detailsDiv = document.getElementById('puppy-details');
    expect(detailsDiv.innerHTML).toContain("Fido");
  });
});