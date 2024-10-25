// Scroll to the adopt section when the button is clicked
document.getElementById('viewMoreBtn').addEventListener('click', function() {
    document.getElementById('adoptSection').scrollIntoView({ behavior: 'smooth' });
});

// Function to load pet categories from the API
const loadCategory = () => {
    fetch("https://openapi.programming-hero.com/api/peddy/categories")
        .then(res => res.json())
        .then(data => displayCategory(data.categories))
        .catch(error => console.log(error));
};

// Function to load categorized pets by clicking the button
const loadCategoryPets = (category) => {
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
        .then(res => res.json())
        .then(pet => displayPets(pet.data)) 
        .catch(error => console.log(error));
};


// Function to display categories as buttons
const displayCategory = (categories) => {
    const categoryContainer = document.getElementById("categories");
    categoryContainer.innerHTML = ""; // Clear previous categories
    categories.forEach(item => {
        const buttonContainer = document.createElement("div");
        buttonContainer.innerHTML = `
            <button onclick="loadCategoryPets('${item.category}')" class="btn px-8 rounded-xl">
                ${item.category}
            </button>
        `;
        categoryContainer.append(buttonContainer);
    });
};

// Fetch all the pets from the API
const loadPets = () => {
    fetch('https://openapi.programming-hero.com/api/peddy/pets')
        .then(res => res.json())
        .then(data => displayPets(data.pets))
        .catch(error => console.log(error));
};

// Function to display pets in the grid
const displayPets = (pets) => {
    const petGrid = document.getElementById('petGrid');
    petGrid.innerHTML = ""; // Clear previous pets
    if(pets.length==0){
        petGrid.classList.remove("grid");
        petGrid.innerHTML=`
        <div class="min-h-[600px] flex flex-col justify-center items-center bg-gray-300 rounded-lg shadow-md ">
        <img src="images/error.webp" alt="">
        <h2 class="text-center text-xl font-bold">No Information Available
        </h2>
        <p class="text-center">Currently, there is no information available for this category. Further details may be provided as soon as they become accessible.
        </p>
        </div>
        `;
        return;
    }
    else{
        petGrid.classList.add("grid");
    }

    pets.forEach(pet => {
        const petCard = `
            <div class="border rounded-lg p-4 shadow-md">
                <img src="${pet.image}" alt="${pet.pet_name}" class="w-full h-40 object-cover rounded-md">
                <h4 class="text-lg font-bold">${pet.pet_name}</h4>
                <p>Breed: ${pet.breed}</p>
                <p>Birth: ${pet.date_of_birth}</p>
                <p>Gender: ${pet.gender}</p>
                <p>Price: $${pet.price}</p>
                <div class="mt-4 flex justify-between">
                    <button class="text-teal-600 bg-white py-1 px-4 rounded border shadow-md">
                        <img src="https://img.icons8.com/?size=64&id=66627&format=png" alt="Like" class="w-5 h-5">
                    </button>
                    <button class="text-teal-600 bg-white py-1 px-4 rounded border shadow-md">Adopt</button>
                    <button class="text-teal-600 bg-white py-1 px-4 rounded border shadow-md">Details</button>
                </div>
            </div>
        `;
        petGrid.insertAdjacentHTML('beforeend', petCard);
    });
};

// Load categories and all pets initially
loadCategory();
loadPets(); 