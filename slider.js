function Sli(sldrId) {
	let id = document.getElementById(sldrId);
	if(id) {
		this.sldrRoot = id
	}
	else {
		this.sldrRoot = document.querySelector('.slider-two')
	};
	this.sldrList = this.sldrRoot.querySelector('.slider-two-list');
	this.sldrElements = this.sldrList.querySelectorAll('.slider-element');
	this.sldrElemFirst = this.sldrList.querySelector('.slider-element');
	this.leftArrow = this.sldrRoot.querySelector('.slider-arrow-left');
	this.rightArrow = this.sldrRoot.querySelector('.slider-arrow-right');
	this.options = Sli.defaults;
	Sli.initialize(this)
};
Sli.defaults = {
	loop: true,     // Бесконечное зацикливание слайдера
	auto: true,    // Автоматическое пролистывание
	interval: 4000, // Интервал между пролистыванием элементов (мс)
	arrows: true,   // Пролистывание стрелками
};
Sli.prototype.elemPrev = function(num) {
	num = num || 1;
	let prevElement = this.currentElement;
	this.currentElement -= num;
	if(this.currentElement < 0) this.currentElement = this.elemCount-1;
	if(!this.options.loop) {
		if(this.currentElement == 0) {
			this.leftArrow.style.display = 'none'
		};
		this.rightArrow.style.display = 'block'
	};
	this.sldrElements[this.currentElement].style.opacity = '1'; // Пролистывание видимого элемента
	this.sldrElements[prevElement].style.opacity = '0';
};
Sli.prototype.elemNext = function(num) {
	num = num || 1;
	let prevElement = this.currentElement;
	this.currentElement += num;
	if(this.currentElement >= this.elemCount) this.currentElement = 0;
	if(!this.options.loop) {
		if(this.currentElement == this.elemCount-1) {
			this.rightArrow.style.display = 'none'
		};
		this.leftArrow.style.display = 'block'
	};
	this.sldrElements[this.currentElement].style.opacity = '1';
	this.sldrElements[prevElement].style.opacity = '0';
};
Sli.initialize = function(that) {
	that.elemCount = that.sldrElements.length; // Количество элементов
	that.currentElement = 0;
	let bgTime = getTime();
	function getTime() {
		return new Date().getTime();
	};
	function setAutoScroll() {
		that.autoScroll = setInterval(function() {
			let fnTime = getTime();
			if(fnTime - bgTime + 10 > that.options.interval) {
				bgTime = fnTime; that.elemNext()
			}
		}, that.options.interval)
	};
	if(that.elemCount <= 1) {   // Отключение навигации
		that.options.auto = false;
                that.options.arrows = false;
		that.leftArrow.style.display = 'none';
                that.rightArrow.style.display = 'none'
	};
	if(that.elemCount >= 1) {   // показ первого элемента
		that.sldrElemFirst.style.opacity = '1';
	};
	if(!that.options.loop) {
		that.leftArrow.style.display = 'none';  // отключение левой стрелки
		that.options.auto = false; // отключение автопрокрутки
	}
	else if(that.options.auto) {   // инициализация автопрокруки
		setAutoScroll();
		that.sldrList.addEventListener('mouseenter', function() { // Остановка прокрутки при наведении мыши на элемент
                      clearInterval(that.autoScroll)
                }, false);
		that.sldrList.addEventListener('mouseleave', setAutoScroll, false)
	};
	if(that.options.arrows) {  // инициализация стрелок
		that.leftArrow.addEventListener('click', function() {
			let fnTime = getTime();
			if(fnTime - bgTime > 1000) {
				bgTime = fnTime; that.elemPrev()
			}
		}, false);
		that.rightArrow.addEventListener('click', function() {
			let fnTime = getTime();
			if(fnTime - bgTime > 1000) {
				bgTime = fnTime; that.elemNext()
			}
		}, false)
	}
	else {
		that.leftArrow.style.display = 'none';
                that.rightArrow.style.display = 'none'
	};
};
/* Слайдер 1 */
let slideIndexOne = 1;
let autoplayOne = 4000;
function showSlidesOne(n) {
	this.sldrRoot = document.querySelector('.slider-one')
	this.sldrWrap = this.sldrRoot.querySelector('.slider-one-wraper');
	this.sldrElements = this.sldrWrap.querySelectorAll('.slide');
	this.sldrElemFirst = this.sldrWrap.querySelector('.slide');
	this.leftArrow = this.sldrRoot.querySelector('.slider-one-arrow-left');
	this.rightArrow = this.sldrRoot.querySelector('.slider-one-arrow-right');
	this.rightArrow.onclick = function nextSlide() { //Функия, повышающая счетчит индекса на 1; перезапускает автоскролл слайдов
		showSlidesOne(slideIndexOne += 1);
		stopSliderOne();
		timerIdOne = setTimerOne();
	}
	this.leftArrow.onclick = function previousSlide() {
		showSlidesOne(slideIndexOne -= 1);
		stopSliderOne();
		timerIdOne = setTimerOne();
	}
    if (n > sldrElements.length) { //Условие для зацикления слайдера
		  slideIndexOne = 1;
    }
    if (n < 1) {
        slideIndexOne = sldrElements.length
	}
    for (let slide of sldrElements) { //Текущий слайд не видимый
        slide.classList.remove("active");
	}
	sldrElements[slideIndexOne - 1].classList.add("active"); //Предыдущий слайд видимый
}
function startSliderOne (n) { //Функция автосмены слайдов
	slideIndexOne++;
	n = slideIndexOne;
	for (let slide of sldrElements) {
		slide.classList.remove("active");
	}
	if (n > sldrElements.length) {
		slideIndexOne = 1;
    }
    if (n < 1) {
	  slideIndexOne = sldrElements.length
    } 
	sldrElements[slideIndexOne - 1].classList.add("active");
}
function stopSliderOne () { //Функция остановки автозапуска слайдера
	clearInterval(timerIdOne);
}
let timerIdOne = setTimerOne(); //Запуск автосмены слайдов по таймеру
function setTimerOne() {
	i = setInterval(startSliderOne, autoplayOne);
	return i;
}
showSlidesOne(slideIndexOne); //Вызов функции
/* Слайдер 3 */
let slideIndexThree = 1;
let autoplayThree = 4000;
function showSlidesThree(g) {
	this.sldrRoot = document.querySelector('.slider-three')
	this.sldrWrap = this.sldrRoot.querySelector('.slider-three-wraper');
	this.menuButton = this.sldrRoot.querySelector('.menu');
	this.arrowBox = this.menuButton.querySelector('.arrow-box');
	this.radioButtonBox = this.menuButton.querySelector('.radio-button-box');
	this.radioButton = this.radioButtonBox.querySelectorAll('.radio-button');
	this.radioButtonOne = this.radioButtonBox.querySelector('.one');
	this.radioButtonTwo = this.radioButtonBox.querySelector('.two');
	this.radioButtonThree = this.radioButtonBox.querySelector('.three');
	this.sldrElementsThree = this.sldrWrap.querySelectorAll('.slide-three');
	this.leftArrow = this.arrowBox.querySelector('.arrow-left');
	this.rightArrow = this.arrowBox.querySelector('.arrow-right');
	//Нашли все элементы и привязали их к переменным(через контекст this)
	this.rightArrow.onclick = function nextSlide() {//Функия, повышающая счетчит индекса на 1; перезапускает автоскролл слайдов
		showSlidesThree(slideIndexThree += 1);
		stopSliderThree();
		timerIdThree = setTimerThree();
	}
	this.leftArrow.onclick = function previousSlide() {//Функция, понижающая счетчик индекса на 1; перезапускает автоскролл слайдов
		showSlidesThree(slideIndexThree -= 1);
		stopSliderThree();
		timerIdThree = setTimerThree();
	}
	this.radioButtonOne.onclick = function firstSlide() {	//Функция, показывающая первый слайд; перезапускает автоскролл слайдов
		showSlidesThree(slideIndexThree = 1);
		stopSliderThree();
		timerIdThree = setTimerThree();
	}
	this.radioButtonTwo.onclick = function secondSlide() {	//Функция, показывающая второй слайд; перезапускает автоскролл слайдов
		showSlidesThree(slideIndexThree = 2);
		stopSliderThree();
		timerIdThree = setTimerThree();
	}
	this.radioButtonThree.onclick = function thirdSlide() {	//Функция, показывающая третий слайд; перезапускает автоскролл слайдов
		showSlidesThree(slideIndexThree = 3);
		stopSliderThree();
		timerIdThree = setTimerThree();
	}
    if (g > sldrElementsThree.length) {	//Условие для зацикления слайдера по через стрелки
		  slideIndexThree = 1;
    }
    if (g < 1) {
        slideIndexThree = sldrElementsThree.length
	}
    for (let slide of sldrElementsThree) {//Делаем текущий слайд видимым
        slide.classList.remove("active");
	}
	sldrElementsThree[slideIndexThree - 1].classList.add("active");//Прячем предыдущий слайд 
	for (let radio of radioButton) {//Условие для зацикления слайдера по через радиобаттоны
		radio.classList.remove("active");
	}
	if (g > radioButton.length) {
		slideIndexThree = 1;
    }
    if (g < 1) {
	  slideIndexThree = radioButton.length
    } 
	radioButton[slideIndexThree - 1].classList.add("active");//Прячем предыдущий слайд 
}
function startSliderThree (g) {//функция автосмены слайдов
	slideIndexThree++;
	g = slideIndexThree;
	for (let slides of sldrElementsThree) {
		slides.classList.remove("active");
	}
	if (g > sldrElementsThree.length) {
		slideIndexThree = 1;
    }
    if (g < 1) {
	  slideIndexThree = sldrElementsThree.length
    } 
	sldrElementsThree[slideIndexThree - 1].classList.add("active");
	for (let radio of radioButton) {
		radio.classList.remove("active");
	}
	if (g > radioButton.length) {
		slideIndexThree = 1;
    }
    if (g < 1) {
	  slideIndexThree = radioButton.length
    } 
	radioButton[slideIndexThree - 1].classList.add("active");
}
function stopSliderThree () {//функция остановки автозапуска слайдера
	clearInterval(timerIdThree);
}
function setTimerThree() {// Запуск автосмены слайдов по таймеру
	i = setInterval(startSliderThree, autoplayThree);
	return i;
}
let timerIdThree = setTimerThree();
showSlidesThree(slideIndexThree);//вызов функции