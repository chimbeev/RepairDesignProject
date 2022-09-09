let images = [{ //Создаем массив с картинками
    url: "/image/Slider-pic1.png",
    title: "ROSTOV-ON-DON, ADMIRAL"
}, {
    url: "/image/Slider-pic2.png",
    title: "SOCHI THIEVES"
}, {
    url: "/image/Slider-pic3.png",
    title: "ROSTOV-ON-DON PATRIOTIC"
}];



function initSlider(options) { //Функция для инициализации слайдера, передаем опции запуска (заголовки, точки, автопросмотр)
    if (!images || !images.length) return; //Если массив пустой или длина массива равна нулю то не запускаем

    options = options || { //Настройки по умолчанию если не указаны опции при запуске
        titles: true,
        dots: true,
        autoplay: false
    };

    let sliderImages = document.querySelector(".slider__images"); //Обращение к DOM элементу через queryselector 
    let sliderArrows = document.querySelector(".slider__arrows");//Обьект содержит стрелки
    let sliderDots = document.querySelector(".slider__dots");//Обьект содержит точки
    let sliderTitles = document.querySelectorAll(".Projects__header__navigation__item"); //Обьект содержит названия картинок (меню над картинками)
    let sliderInfo = document.querySelectorAll(".Projects__text__small"); //Обьект содержит данные по обьекту

    initImages(); //Показать картинки
    initArrows();//Показать стрелки


    if (options.dots) {
        initDots();
    }

    if (options.titles) {
        initTitles();
    }

    if (options.autoplay) {
        initAutoplay();
    }

    function initImages() { //Инициируем показ картинок
        images.forEach((image, index) => { //перебираем все картинки из массива и создаем для каждой картинки divы c классами: (image n[index] [index])
            let imageDiv = `<div class="image n${index} ${index === 0? "active" : ""}" style="background-image:url(${images[index].url}); background-size: cover;" data-index="${index}"></div>`;
            //Если картинка с индексом 0 , то ставим ей класс active, если нет то пусто. Указываем путь до картинки. И заводим дополнительное св-во data-index
            sliderImages.innerHTML += imageDiv; //выводим картинку на экран
        });
    }

    function initArrows() { // Инициируем показ стрелок
        sliderArrows.querySelectorAll(".slider__arrow").forEach(arrow => { //Для каждой стрелки добавляем событие
            arrow.addEventListener("click", function() { //При нажатии стрелки
                let curNumber = +sliderImages.querySelector(".active").dataset.index;//выясняем номер текущей картинки через св-во index
                //Которую завели через команду data-index="${index}". В этой команде data- откидывается и получаем index=${index}
                let nextNumber;
                if (arrow.classList.contains("left")) { //Если у текущей стрелки есть в списке класс left
                    nextNumber = curNumber === 0? images.length - 1 : curNumber - 1; //то если текущий номер картинки
                    // равен 0, то номер следующей картинки будет кол-во картинок минус один(Так как после нулевой картинки
                    //надо показать последнюю). Иначе номер следующей картинки будет номер тек картинки минус 1
                } else { //Если нету класса left значит стрелка вправо
                    nextNumber = curNumber === images.length - 1? 0 : curNumber + 1; //Если номер текущей картинки
                    // равен кол-ву картинок минус один , то присвоим номеру картинки ноль (надо после последней
                    // картинки показать нулевую), иначе к текущему номеру картинки прибавляем единицу
                }
                moveSlider(nextNumber); //меняем картинку
            });
        });
    }

    function initDots() { //Инициируем показ точек
        images.forEach((image, index) => { //Создаем divы c классами slider__dots-item n${index} active если это нулевая картинка
            let dot = `<div class="slider__dots-item n${index} ${index === 0? "active" : ""}" data-index="${index}"></div>`;
            sliderDots.innerHTML += dot; //рисуем через DOM обьект точки
        });
        sliderDots.querySelectorAll(".slider__dots-item").forEach(dot => { //на все обьекты точки
            //вешаем события клик мышки
            dot.addEventListener("click", function() { 
                moveSlider(this.dataset.index); //по клику мышки вызываем покажи картинку с текущим индексом как у точки
            })
        })
    }

    function initTitles() { //подсвечиваем подпись к картинке 0 и выводим данные по обьекту
        sliderTitles[0].querySelector(".Projects__menu__item").classList.add("active");
        sliderInfo[0].innerHTML="Rostov-on-Don Admiral";
        sliderInfo[1].innerHTML="81 m2";
        sliderInfo[2].innerHTML="3.5 months";
        sliderInfo[3].innerHTML="Upon request";
    }

    function moveSlider(num) { //показывает картинку
        sliderImages.querySelector(".active").classList.remove("active");//у активной картинки убирает
        //метку что она активна
        sliderImages.querySelector(".n" + num).classList.add("active");
        if (options.dots) {
            sliderDots.querySelector(".active").classList.remove("active");
            sliderDots.querySelector(".n" + num).classList.add("active");
        } //подсвечиваем пункт меню на картинкой при смене картинки
        sliderTitles[0].querySelector(".Projects__menu__item").classList.remove("active");
        sliderTitles[1].querySelector(".Projects__menu__item").classList.remove("active");
        sliderTitles[2].querySelector(".Projects__menu__item").classList.remove("active");
        sliderTitles[num].querySelector(".Projects__menu__item").classList.add("active");
        //Здесь меняем отображаемые данные по обьекту (полащать, расположение, срок ремонта)
        if (num == 0) 
            {
                sliderInfo[0].innerText="Rostov-on-Don Admiral";
                sliderInfo[1].innerText="81 m2";
                sliderInfo[2].innerText="3.5 months";
                sliderInfo[3].innerText="Upon request";
            }    
            else if (num == 1)
            { 
                sliderInfo[0].innerText="Sochi Thieves";
                sliderInfo[1].innerText="105 m2";
                sliderInfo[2].innerText="4 months";
                sliderInfo[3].innerText="Upon request";
            }    
            else if (num == 2)
            { 
                sliderInfo[0].innerText="Rostov-on-Don Patriotic";
                sliderInfo[1].innerText="93 m2";
                sliderInfo[2].innerText="3 months";
                sliderInfo[3].innerText="Upon request";
            }    
    }
    //Здесь назачаем события на верхнее меню над картинками, чтобы переключались картинки 
    sliderTitles[0].querySelector(".Projects__menu__item").addEventListener('click', function(e) {
        e.preventDefault();
        moveSlider(0);
    });

    sliderTitles[1].querySelector(".Projects__menu__item").addEventListener('click', function(e) {
        e.preventDefault();
        moveSlider(1);
    });

    sliderTitles[2].querySelector(".Projects__menu__item").addEventListener('click', function(e) {
        e.preventDefault();
        moveSlider(2);
    });


    function initAutoplay() { //автопоказ картинок
        setInterval(() => {
            let curNumber = +sliderImages.querySelector(".active").dataset.index;//узнать номер активной картинки
            let nextNumber = curNumber === images.length - 1? 0 : curNumber + 1; //если тек номер картинки равен последней
            // то номер след картинки 0. Иначе след картинка
            moveSlider(nextNumber);//показать картику
        }, options.autoplayInterval);
    }
}

let sliderOptions = {
    dots: true,
    titles: true,
    autoplay: false,
    autoplayInterval: 5000
};

document.addEventListener("DOMContentLoaded", function() {
    initSlider(sliderOptions);
});