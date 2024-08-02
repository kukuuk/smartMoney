document.getElementById('start').valueAsDate = new Date();
document.getElementById('end').valueAsDate = new Date();

document.querySelectorAll('.dropdown').forEach(function (dropDownWrapper) {
	const dropDownBtn = dropDownWrapper.querySelector('.dropdown__button');
	const dropDownList = dropDownWrapper.querySelector('.dropdown__list');
	const dropDownListItems = dropDownList.querySelectorAll('.dropdown__list-item');


	dropDownBtn.addEventListener('click', function () {
		dropDownList.classList.toggle('dropdown__list--visible');
        this.classList.toggle('dropdown__button--active');   
	});

	dropDownListItems.forEach(function (listItem) {
		listItem.addEventListener('click', function (e) {
			e.stopPropagation();
			dropDownBtn.innerHTML = this.innerHTML;
			dropDownBtn.value = this.dataset.value;
			dropDownList.classList.remove('dropdown__list--visible');
            dropDownBtn.classList.remove('dropdown__button--active');
		});
	});

	document.addEventListener('click', function (e) {
		if (e.target !== dropDownBtn) {
			dropDownBtn.classList.remove('dropdown__button--active');
			dropDownList.classList.remove('dropdown__list--visible');
		}
	});

	document.addEventListener('keydown', function (e) {
		if (e.key === 'Tab' || e.key === 'Escape') {
			dropDownBtn.classList.remove('dropdown__button--active');
			dropDownList.classList.remove('dropdown__list--visible');
		}
	});
});

const periodBtn = document.querySelector('.period__button')
const periodList = document.querySelector('.period__list')
const periodListItems = document.querySelectorAll('.period__list--item')
const periodBtnArrowDown = document.querySelector('.period__button--span')
const periodBtnArrowUp = document.querySelector('.period__button--span-second')

periodBtn.addEventListener('click', function() {
    periodList.classList.toggle('period__list--active')
    this.classList.toggle('period__button--active')
    periodBtnArrowDown.classList.toggle('hidden')
    periodBtnArrowUp.classList.toggle('hidden')
})

periodListItems.forEach((item) => {
    item.addEventListener('click', function(e) {
        e.stopPropagation();
        periodBtn.innerHTML = this.innerHTML
        periodBtn.value = item.value
        periodList.classList.remove('period__list--active')
        periodBtn.classList.remove('period__button--active')
        if(periodList.className === 'period__list--active') {
            periodBtn.innerHTML = this.innerHTML + `
            <span class="period__button--span-second">
                <img src="assets/whiteArrowDown.svg" alt="arrow">
            </span>`
        } else {
            periodBtn.innerHTML = this.innerHTML + `
            <span class="period__button--span">
                <img src="assets/whiteArrowDown.svg" alt="arrow">
            </span>`
        }
    })
})

document.addEventListener('click', function (e) {
    if (e.target !== periodBtn) {
        periodBtn.classList.remove('period__button--active');
        periodList.classList.remove('period__list--active');
        periodBtnArrowDown.classList.remove('hidden')
        periodBtnArrowUp.classList.add('hidden')
    }
});

document.addEventListener('keydown', function (e) {
    if (e.key === 'Tab' || e.key === 'Escape') {
        periodBtn.classList.remove('period__button--active');
        periodList.classList.remove('period__list--active');
        periodBtnArrowDown.classList.remove('hidden')
        periodBtnArrowUp.classList.add('hidden')
    }
});

const dropDownDateBtn = document.querySelector('.dropdown__date--btn')
const dropDownDateList = document.querySelector('.dropdown__date--list')
const dropDownDateListItems = document.querySelectorAll('.dropdown__date--list-item')

dropDownDateBtn.addEventListener('click', () => {
    dropDownDateList.classList.toggle('dropdown__date--list-active')
    dropDownDateBtn.classList.toggle('dropdown__date--btn-active')
})

dropDownDateListItems.forEach((item) => {
    item.addEventListener('click', () => {
        dropDownDateBtn.innerHTML = item.innerHTML + `
        <span>
            <img src="assets/down.svg" alt="arrow">
        </span>
        `;
        dropDownDateBtn.value = item.value;
        dropDownDateList.classList.remove('dropdown__date--list-active')
        dropDownDateBtn.classList.remove('dropdown__date--btn-active')
    })
})

const addOperationBtn = document.querySelector('.dropdown__button--add')
const operationOncePage = document.querySelector('.add-operation-once')
const operationRegularPage = document.querySelector('.add-operation-regular')
const operationOnceBtns = document.querySelectorAll('.add-operation__btn-once')
const operationRegularBtns = document.querySelectorAll('.add-operation__btn-regular')
const addOperationPages = document.querySelector('.add-operations')

const body = document.getElementById('homepage-body')

addOperationBtn.addEventListener('click', () => {
    operationOncePage.style.display = 'block';
    body.classList.add('dark')
})

operationOnceBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        operationOncePage.style.display = 'block'
        operationRegularPage.style.display = 'none'
    })
})

operationRegularBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        operationOncePage.style.display = 'none'
        operationRegularPage.style.display = 'block'
    })
})

document.addEventListener('keydown', function (e) {
    if (e.key === 'Tab' || e.key === 'Escape') {
        operationOncePage.style.display = 'none'
        operationRegularPage.style.display = 'none'
        body.classList.remove('dark')
    }
});

const homePage = document.querySelector('.home-page')

homePage.addEventListener('click', function(e) {
    if (e.target !== addOperationBtn) {
        operationOncePage.style.display = 'none'
        operationRegularPage.style.display = 'none'
        body.classList.remove('dark')
    }  
})