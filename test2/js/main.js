/**
 * NodeList.prototype.forEach() polyfill https://vanillajstoolkit.com/
 * https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach#Polyfill
 */
if (window.NodeList && !NodeList.prototype.forEach) {
	NodeList.prototype.forEach = function (callback, thisArg) {
		thisArg = thisArg || window;
		for (var i = 0; i < this.length; i++) {
			callback.call(thisArg, this[i], i, this);
		}
	};
}

/*
*Тут мы вставили полифил, чтобы js код правильно работал в IE11+
* Этот браузер не поддерживает метод forEach, поэтому обходим это таким образом
* не переписывая весь код
* Но у меня не заработал полифил, хотя копировал код, а не писал от себя
*/
// Фильтр на мобильных устройствах 

const sidebarToggleBtn = document.querySelector('.menu-icon-wrapper');
const menuIcon = document.querySelector('.menu-icon');
const sidebar = document.querySelector('.sidebar');

// Клик по кнопке для скрытия / показа фильтра и изменения исконки
sidebarToggleBtn.onclick = function () {
    menuIcon.classList.toggle('menu-icon-active');
    sidebar.classList.toggle('sidebar--mobile-active');
};

/*
* Cначала в переменные записали нужные теги (по форме js), далее, написали,
* что при нажатии на элемент с нужным тегом, будут срабатывать два других тега
* и их стили (иконка сайдбара поменяется и выйдет сайдбар сбоку)
*/

// Показать ещё три карточки

const btnShowMoreCards = document.querySelector('.btn-more');
const hiddenCards = document.querySelectorAll('.card-link--hidden');

// Клик по кнопке и показ трех скрытых карточек
btnShowMoreCards.addEventListener('click', function() {
    hiddenCards.forEach(function (card) {
        card.classList.remove('card-link--hidden');
    })
})

// Показать и скрыть контент внутри виджетов

const widgets = document.querySelectorAll('.widget');

// Находим все виджеты на странице
widgets.forEach(function (widget) {
    
    // Слушаем клик внутри виджета
    widget.addEventListener('click', function(e) {
        // Если клик по заголовку - тогда скрываем/показываем тело виджета и добавляем класс
        if (e.target.classList.contains('widget__title')) {
            e.target.classList.toggle('widget__title--active');
            e.target.nextElementSibling.classList.toggle('widget__body--hidden');
        }
    });
});

// Location - кнопка "Любая"

const checkBoxAny = document.querySelector('#location-05');
const topLocationCheckboxes = document.querySelectorAll('[data-location-param]');

// Выбор кнопки Любая и отключение других чекбоксов
checkBoxAny.addEventListener('change', function () {
    if (checkBoxAny.checked) {
        topLocationCheckboxes.forEach(function (item) {
			item.checked = false;
		});
    }
})

// Отключаем кнопку "Любая", при выборе других параметров, Клик по другим кнопкам в Location, кроме кнопки Любая (немного не понял эту часть кода)
topLocationCheckboxes.forEach(function (item) {
    item.addEventListener('change', function () {
        if (checkBoxAny.checked) {
            checkBoxAny.checked = false;
        }
    })
})

// Показать ещё 3 доп опции с чекбоксами в фильтре первый вариант кода у меня не получился, проверил по видео и код был верен, но работал иначе, в итоге, скопировал этот участок кода из готового файла

const showMoreOptions = document.querySelector('.widget__btn-show-hidden');
const hiddenCheckBoxes = document.querySelectorAll('.checkbox--hidden');

showMoreOptions.onclick = function (e) {
    e.preventDefault(); // отменили стандартное поведение, чтобы кнопка вела себя правильно

    // Если блоки были скрыты - значит показываем
    if (showMoreOptions.dataset.options == 'hidden') {
        hiddenCheckBoxes.forEach(function (item) {
            item.style.display = 'block';
        });
        showMoreOptions.innerText = 'Скрыть дополнительные опции';
        showMoreOptions.dataset.options = 'visible';
    } 
    // Если блоки были видны - значит скрываем
    else if (showMoreOptions.dataset.options == 'visible') {
        hiddenCheckBoxes.forEach(function (item) {
            item.style.display = 'none';
        });
        showMoreOptions.innerText = 'Показать ещё';
        showMoreOptions.dataset.options = 'hidden';
    }
}

/* hiddenCheckBoxes.forEach(function (item) {
 *   // item.classList.remove('checkbox--hidden');
 *   // т.к. уже обращаемся к классу, точку не ставим в начале, но это только покажет чекбоксы и уберёт кнопку "показать ещё"
 *   item.style.display = 'block';
*})
* showMoreOptions.remove(); */