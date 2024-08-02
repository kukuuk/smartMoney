const transferDepositBtn = document.querySelector('.transfer-btn')
const transfersDepositPage = document.querySelector('.transfers-page')

const main = document.querySelector('.deposit-page')

const addDepositBtn = document.querySelector('.add-deposit-btn')
const addDepositPage = document.querySelector('.add-deposit')


transferDepositBtn.addEventListener('click', () => {
    transfersDepositPage.style.display = 'block'
})

addDepositBtn.addEventListener('click', () => {
    addDepositPage.style.display = 'block'
})



main.addEventListener('click', function(e) {
    if (e.target !== transferDepositBtn) {
        transfersDepositPage.style.display = 'none'
    }
    if (e.target !== addDepositBtn) {
        addDepositPage.style.display = 'none'
    }
})

document.addEventListener('keydown', function (e) {
    if (e.key === 'Tab' || e.key === 'Escape') {
        addDepositPage.style.display = 'none'
        transfersDepositPage.style.display = 'none'
    }
});



const transfersBtn = document.querySelector('.transfers-page__dropdown--btn')
const transferList = document.querySelector('.transfers-page__dropdown--list')
const transferListItems = document.querySelectorAll('.transfers-page__dropdown--list-item')


transfersBtn.addEventListener('click', () => {
    transferList.classList.toggle('dropdown-hidden')
    transfersBtn.classList.toggle('transfers-page__dropdown--btn--active')
})

transferListItems.forEach((item) => {
    item.addEventListener('click', () => {
        transfersBtn.innerHTML = item.innerHTML + `
        <img 
            src="assets/blackArrowDown.svg" 
            alt="arrow" 
            class="transfers-page__dropdown--btn--arrow"
        >
        `;
        transferList.classList.add('dropdown-hidden')
        transfersBtn.classList.remove('transfers-page__dropdown--btn--active')
    })
})

const transfersBtnSecond = document.querySelector('.transfers-page__dropdown--btn-second')
const transferListSecond = document.querySelector('.transfers-page__dropdown--list-second')
const transferListItemsSecond = document.querySelectorAll('.transfers-page__dropdown--list-item-second')


transfersBtnSecond.addEventListener('click', () => {
    transferListSecond.classList.toggle('dropdown-hidden-second')
    transfersBtnSecond.classList.toggle('transfers-page__dropdown--btn-second--active')
})

transferListItemsSecond.forEach((item) => {
    item.addEventListener('click', () => {
        transfersBtnSecond.innerHTML = item.innerHTML + `
        <img 
            src="assets/blackArrowDown.svg" 
            alt="arrow" 
            class="transfers-page__dropdown--btn--arrow"
        >
        `;
        transferListSecond.classList.add('dropdown-hidden-second')
        transfersBtnSecond.classList.remove('transfers-page__dropdown--btn-second--active')
    })
})

const deleteDepositBtns = document.querySelectorAll('.deposit-page__deposit--delete')
deleteDepositBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        btn.parentNode.outerHTML = ''
    })
})

document.addEventListener('DOMContentLoaded', () => {
    const editIcons = document.querySelectorAll('.deposit-page__deposit--edit');
    const modal = document.querySelector('.edit-deposit');
    const editButton = document.querySelector('.edit-deposit-btn');
    let currentDeposit = null;

    const colors = document.querySelectorAll('.edit-colors__color')
    const selectedColor = document.querySelector('.edit-deposit__options--span')
    const selectedColorPlus = document.querySelector('.edit-deposit__options--plus')

    colors.forEach((color) => {
        color.addEventListener('click', () => {
            selectedColor.classList = color.classList
            selectedColorPlus.style.display = 'none'
        })
    })

    editIcons.forEach((icon) => {
        icon.addEventListener('click', (e) => {
            currentDeposit = e.target.closest('.deposit-page__deposit');
            const color = currentDeposit.querySelector('.add-colors__color').classList[2];
            const name = currentDeposit.querySelector('.deposit-page__deposit--card').innerText;
            const sum = currentDeposit.querySelector('.deposit-page__deposit--summ').innerText.replace(/[^\d,]/g, '').replace(',', '.');

            document.getElementById('edit-deposit-name').value = name;
            document.getElementById('edit-deposit-sum').value = sum;

            modal.querySelectorAll('.edit-colors__color').forEach((colorSpan) => {
                colorSpan.classList.remove('selected');
                if (colorSpan.classList.contains(color)) {
                    colorSpan.classList.add('selected');
                }
            });

            modal.classList.add('active');
        });
    });

    editButton.addEventListener('click', () => {
        const newName = document.getElementById('edit-deposit-name').value;
        const newSum = document.getElementById('edit-deposit-sum').value.replace('.', ',') + ' ₽';
        const newColor = modal.querySelector('.edit-colors__color.selected').classList[1];

        currentDeposit.querySelector('.deposit-page__deposit--card').innerText = newName;
        currentDeposit.querySelector('.deposit-page__deposit--summ').innerText = newSum;
        currentDeposit.querySelector('.add-colors__color').className = `add-colors__color colors-color ${newColor}`;

        modal.classList.remove('active');
        modalOverlay.classList.remove('active');
    });

    modal.querySelectorAll('.edit-colors__color').forEach((colorSpan) => {
        colorSpan.addEventListener('click', () => {
            modal.querySelectorAll('.edit-colors__color').forEach(span => span.classList.remove('selected'));
            colorSpan.classList.add('selected');
        });
    });


});

document.addEventListener('DOMContentLoaded', function() {
    // Находим кнопки и модальное окно
    const addDepositBtn = document.querySelector('.add-deposit-btn');
    const modalAddDepositBtn = document.querySelector('.modal-add-deposit-btn');
    const addDepositModal = document.querySelector('.add-deposit');

    // Находим контейнер для существующих счетов
    const depositsContainer = document.querySelector('.deposit-page__deposits');

    // Находим элементы для выбора цвета
    const colors = document.querySelectorAll('.add-colors__color');

    // Обработчик клика по кнопке "Добавить счет"
    addDepositBtn.addEventListener('click', function() {
        addDepositModal.style.display = 'block'; // Показываем модальное окно
    });

    // Обработчик клика по цветам для выбора цвета
    let selectedColor = document.querySelector('.add-deposit__options--span')
    const selectedColorPlus = document.querySelector('.add-deposit__options--plus')

    colors.forEach((color) => {
        color.addEventListener('click', () => {
            selectedColor.classList = color.classList
            selectedColorPlus.classList.add('hidden')
        })
    })

    // Обработчик клика по кнопке "Добавить счет" в модальном окне
    modalAddDepositBtn.addEventListener('click', function() {
        // Находим значения из полей ввода
        const depositName = document.getElementById('deposit-name').value;
        const depositSum = document.getElementById('deposit-sum').value;

        // Создаем новый элемент карточки счета
        const newDeposit = document.createElement('div');
        newDeposit.classList.add('deposit-page__deposit');

        // Добавляем выбранный класс цвета категории
        const categorySpan = document.createElement('span');
        categorySpan.classList = selectedColor.classList
        newDeposit.appendChild(categorySpan);

        // Название счета
        const depositNameP = document.createElement('p');
        depositNameP.classList.add('deposit-page__deposit--card');
        depositNameP.textContent = depositName;
        newDeposit.appendChild(depositNameP);

        // Сумма на счету
        const depositSumSpan = document.createElement('span');
        depositSumSpan.classList.add('deposit-page__deposit--summ');
        depositSumSpan.textContent = depositSum + ' ₽';
        newDeposit.appendChild(depositSumSpan);

        // Иконки редактирования и удаления
        const editIcon = document.createElement('img');
        editIcon.src = 'assets/editIcon.svg';
        editIcon.alt = 'edit';
        editIcon.classList.add('deposit-page__deposit--edit');
        newDeposit.appendChild(editIcon);

        const deleteIcon = document.createElement('img');
        deleteIcon.src = 'assets/deleteIcon.svg';
        deleteIcon.alt = 'delete';
        deleteIcon.classList.add('deposit-page__deposit--delete');
        newDeposit.appendChild(deleteIcon);

        deleteIcon.addEventListener('click', () => {
            deleteIcon.parentNode.outerHTML = ''
        })

        // Добавляем новую карточку в контейнер счетов
        depositsContainer.appendChild(newDeposit);

        // Скрываем модальное окно
        addDepositModal.style.display = 'none';

        // Очищаем поля ввода
        document.getElementById('deposit-name').value = '';
        document.getElementById('deposit-sum').value = '';
    });
    
});
