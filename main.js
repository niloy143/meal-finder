const contentArea = document.getElementById('content-area');
const showingResultFor = document.getElementById('showing-result-for');

const loadMeal = (x = '') => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${x}`)
        .then(res => res.json())
        .then(data => displayMeal(data.meals, x))
        .catch(() => {
            contentArea.innerHTML = '';
            showingResultFor.innerText = `Oops! There is no food named '${x}'!`;
        })
}

const displayMeal = (mealData, foundItems) => {
    mealData.forEach(meal => {
        const createdDiv = document.createElement('div');
        createdDiv.classList.add('border-1', 'rounded-lg', 'overflow-hidden');
        createdDiv.innerHTML = `
        <div class="border-2 rounded-lg overflow-hidden pb-5">
            <img class="w-full" src="${meal.strMealThumb}" alt="">
            <div class="py-3 px-5">
                <h3 class="text-center text-2xl sm:text-3xl font-mono font-semibold my-3">${meal.strMeal}</h3>
                <p class="text-justify text-sm sm:text-base mb-3" title="${meal.strInstructions}">${meal.strInstructions.slice(0, 200)}</p>
                <button class="bg-sky-400 active:bg-sky-700 text-white text-sm sm:text-base font-semibold px-5 py-2 rounded read-more-button" onclick="readMore(this)" id="read-more"> Read More </button>
            </div>
        </div>`
        contentArea.appendChild(createdDiv);
    })
    showingResultFor.innerText = `Showing Result For '${foundItems}'
        (${contentArea.children.length > 1 ? contentArea.children.length + ' meals' : contentArea.children.length + ' meal'} found)
    `;
}

loadMeal();

// ========================================================================

document.getElementById('search-button').addEventListener('click', function () {
    const searchInput = document.getElementById('search-input');
    const searchText = searchInput.value;
    showingResultFor.classList.remove('hidden');
    contentArea.innerHTML = '';
    loadMeal(searchText);
    searchInput.value = '';
})

// ========================================================================

function readMore(element) {
    const pElement = element.parentNode.children[1];
    const fullDetails = pElement.getAttribute('title');
    
    if (element.innerText === 'Read More') {
        pElement.innerText = fullDetails;
        element.innerText = 'Read Less';
    }
    else if (element.innerText === 'Read Less') {
        pElement.innerText = fullDetails.slice(0, 200);
        element.innerText = 'Read More';
    }
}