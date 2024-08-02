const deleteCardBtns = document.querySelectorAll('.delete-card')

deleteCardBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        btn.parentNode.parentNode.outerHTML = ''
    })
})

const categoriesPage = document.querySelector('.categories-page')
const body = document.getElementById('categoriespage__body')

const addCategoryPageCosts = document.querySelector('.add-category__costs')
const addCategoryPageIncomes = document.querySelector('.add-category__incomes')

const addCategoryCostsBtn = document.querySelector('.add-category-btn--costs')
const addCategoryIncomesBtn = document.querySelector('.add-category-btn--incomes')

addCategoryCostsBtn.addEventListener('click', () => {
    addCategoryPageCosts.classList.add('add-category__costs--active')
})

addCategoryIncomesBtn.addEventListener('click', () => {
    addCategoryPageIncomes.classList.add('add-category__costs--active')
})

document.addEventListener('keydown', function (e) {
    if (e.key === 'Tab' || e.key === 'Escape') {
        addCategoryPageCosts.classList.remove('add-category__costs--active')
        addCategoryPageIncomes.classList.remove('add-category__costs--active')
    }
});

categoriesPage.addEventListener('click', function(e) {
    if (e.target !== addCategoryCostsBtn) {
        addCategoryPageCosts.classList.remove('add-category__costs--active')
    } 
    if (e.target !== addCategoryIncomesBtn) {
        addCategoryPageIncomes.classList.remove('add-category__costs--active')
    }  
})


const incomesColors = document.querySelectorAll('.incomes-category__color')
const selectedColorIncomes = document.querySelector('.incomes-category__edit-color')
const imgPlusIncomes = document.querySelector('.incomes__plus')


for (let color of incomesColors) {
    color.addEventListener('click', function() {
        selectedColorIncomes.classList = color.classList;
        imgPlusIncomes.classList.add('hidden')
    })
}

const costsColors = document.querySelectorAll('.costs-category__color')
const selectedColorCosts = document.querySelector('.costs-category__edit-color')
const imgPlusCosts = document.querySelector('.costs__plus')

for (let color of costsColors) {
    color.addEventListener('click', () => {
        selectedColorCosts.classList = color.classList;
        imgPlusCosts.classList.add('hidden')
    })
}


document.addEventListener('DOMContentLoaded', () => {
    const editButtons = document.querySelectorAll('.icon-edit');
    const editForm = document.querySelector('.add-category__edit');
    let activeCard = null;

    const editColors = document.querySelectorAll('.edit-category__color')
    const selectedEditColor = document.querySelector('.edit-category__edit-color')
    const selectedEditColorPlus = document.querySelector('.edit-category--plus')

    for (let color of editColors) {
        color.addEventListener('click', function() {
            selectedEditColor.classList = color.classList
            selectedEditColorPlus.classList.add('hidden')
        })
    }

    // Добавление обработчиков событий на кнопки редактирования
    editButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            activeCard = e.target.closest('.categories-page__costs--flex--once');
            editForm.classList.add('add-category__edit--active'); // Показ формы редактирования
        });
    });

    // Обработчик для кнопки "Изменить счет"
    document.querySelector('.edit-category__btn').addEventListener('click', () => {
        if (activeCard) {
            const newCategoryName = document.getElementById('edit-category__category-input').value;
            const selectedColor = document.querySelector('.add-category__color.selected');

            // Изменение текста и цвета активной карточки
            if (newCategoryName) {
                activeCard.querySelector('.add-colors__text').innerText = newCategoryName;
            }
            if (selectedColor) {
                activeCard.querySelector('.add-colors__color').className = `add-colors__color ${selectedColor.classList[2]}`;
            }
            editForm.classList.remove('add-category__edit--active'); // Скрыть форму редактирования
            document.getElementById('edit-category__category-input').value = '';
        }
    });

    // Выбор цвета
    const colorOptions = document.querySelectorAll('.add-category__color');
    colorOptions.forEach(color => {
        color.addEventListener('click', () => {
            colorOptions.forEach(c => c.classList.remove('selected'));
            color.classList.add('selected');
        });
    });

    document.addEventListener('click', (event) => {
        if (!editForm.contains(event.target) && !event.target.classList.contains('icon-edit')) {
            editForm.classList.remove('add-category__edit--active');
        }
    });
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Tab' || e.key === 'Escape') {
            editForm.classList.remove('add-category__edit--active')
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const addCostsBtn = document.getElementById('add-costs-btn');
    const addIncomesBtn = document.getElementById('add-incomes-btn');

    const costsContainer = document.getElementById('costs-container');
    const incomesContainer = document.getElementById('incomes-container');

    const addCostsSubmitBtn = document.querySelector('.add-category__btn--costs'); 
    const addIncomesSubmitBtn = document.querySelector('.add-category__btn--incomes');

    const addCategoryPageCosts = document.querySelector('.add-category__costs')
    const addCategoryPageIncomes = document.querySelector('.add-category__incomes')

    const editCategoryModal = document.querySelector('.add-category__edit')
    const editCategoryInput = document.getElementById('edit-category__category-input');
    const editCategorySubmitBtn = document.querySelector('.edit-category__btn');

    let currentEditCard = null;

    function addCardEventListeners(card) {
        const editIcons = card.querySelectorAll('.icon-edit');
        const deleteIcons = card.querySelectorAll('.delete-card');

        editIcons.forEach((editIcon) => {
            editIcon.addEventListener('click', function() {
                currentEditCard = card;
                const categoryText = card.querySelector('.add-colors__text').textContent;
                editCategoryInput.value = categoryText;
                editCategoryModal.classList.add('add-category__edit--active');
            });
        })
        
        deleteIcons.forEach((deleteIcon) => {
            deleteIcon.addEventListener('click', function() {
                card.outerHTML = '';
            });
        })
        
    }

    function createCard(text, colorClass) {
        const card = document.createElement('div');
        card.classList.add('categories-page__costs--flex--once');

        card.innerHTML = `
            <div class="categories-page__costs--flex--once-icons">
                <img src="assets/editIcon.svg" alt="edit" class="icon icon-edit">
                <img src="assets/deleteIcon.svg" alt="delete" class="icon delete-card">
            </div>
            <div class="categories-page__costs--flex--once--category">
                <span class="add-colors__color ${colorClass}"></span>
                <p class="add-colors__text">${text}</p>
            </div>
        `;

        addCardEventListeners(card);

        return card;
    }

    addCostsSubmitBtn.addEventListener('click', function() {
        const input = document.getElementById('add-category__category-input--costs').value;
        const selectedColorElement = document.querySelector('.add-category__color.add-category__active');
        
        if (input && selectedColorElement) {
            const selectedColor = selectedColorElement.classList[2]; // Предполагаем, что цвет - это третий класс
            const newCard = createCard(input, selectedColor);
            costsContainer.insertBefore(newCard, addCostsBtn);
        }

        addCategoryPageCosts.classList.remove('add-category__costs--active');

    });

    addIncomesSubmitBtn.addEventListener('click', function() {
        const input = document.getElementById('add-category__category-input--incomes').value;
        const selectedColorElement = document.querySelector('.add-category__color.add-category__active');
        
        if (input && selectedColorElement) {
            const selectedColor = selectedColorElement.classList[2]; // Предполагаем, что цвет - это третий класс
            const newCard = createCard(input, selectedColor);
            incomesContainer.insertBefore(newCard, addIncomesBtn);
        }

        addCategoryPageIncomes.classList.remove('add-category__costs--active');
    });

    editCategorySubmitBtn.addEventListener('click', function() {
        if (currentEditCard) {
            const newText = editCategoryInput.value;
            const selectedColorElement = document.querySelector('.edit-category__color.add-category__active');

            if (newText) {
                currentEditCard.querySelector('.add-colors__text').textContent = newText;
            }

            if (selectedColorElement) {
                const newColorClass = selectedColorElement.classList[2];
                currentEditCard.querySelector('.add-colors__color').className = `add-colors__color ${newColorClass}`;
            }

            editCategoryModal.classList.remove('add-category__edit--active');
        }
    });

    document.querySelectorAll('.add-category__color').forEach(colorElement => {
        colorElement.addEventListener('click', function() {
            document.querySelectorAll('.add-category__color').forEach(el => el.classList.remove('add-category__active'));
            this.classList.add('add-category__active');
        });
    });

    document.querySelectorAll('.edit-category__color').forEach(colorElement => {
        colorElement.addEventListener('click', function() {
            document.querySelectorAll('.edit-category__color').forEach(el => el.classList.remove('add-category__active'));
            this.classList.add('add-category__active');
        });
    });

    document.querySelectorAll('.categories-page__costs--flex--once').forEach(addCardEventListeners);
});

