const petCards = document.querySelectorAll('.our-friends__card')
const petList = document.querySelector('.our-friends__list')
const navItems = document.querySelectorAll('.nav-list__item')
const header = document.querySelector('.header')
const sticky =  header.offsetTop;
const navBurger = document.querySelector('.nav-burger')
const navigation = document.querySelector('.nav')
const logo = document.querySelector('.logo-wrapper')
const overlay = document.querySelector('.overlay')

const requestURL = '../pets/pets.json'

// pagination

const newURL = '../pets/pets-40.json'
const paginationItems = document.querySelectorAll('.our-friends__pagination-item')
const paginationLinks = document.querySelectorAll('.our-friends__pagination-link')
const prevTwo = document.querySelector('.pagination-prev-2')
const prevOne = document.querySelector('.pagination-prev-1')
const nextOne = document.querySelector('.pagination-next-1')
const nextTwo = document.querySelector('.pagination-next-2')
const thisPage = document.querySelector('.pagination-now')

let eightPets = []
let sixPets = []
let threePets = []

eightPets.length = 8;
sixPets.length = 6;
threePets.length = 3;


sendRequest('GET', requestURL)
    .then((data) => {


// наполнить каждый массив переменной, затем while array.includes(k) - randomise, мб сделать зависимость от количества активных карточек

        // NUMBERS
        let petLength = 0;
        petCards.forEach((element) => {
            if (getComputedStyle(element).getPropertyValue('display') !== 'none') {
                petLength++;
            }
        })
        let all = 48 / petLength
        let current = 1;

        // basic rules
        if (current === 1) {
            prevOne.classList.add('disabled')
            prevTwo.classList.add('disabled')
        }

        // next One
        nextOne.addEventListener('click', (e) => {
            prevOne.classList.remove('disabled')
            prevTwo.classList.remove('disabled')
            if (current !== all) {
                current++;
                thisPage.textContent = `${current}`;
            }
            if (current === all) {
                nextOne.classList.add('disabled')
                nextTwo.classList.add('disabled')
                e.preventDefault()
            }
        })
        // next Two
        nextTwo.addEventListener('click', (e) => {
            nextTwo.classList.add('disabled')
            nextOne.classList.add('disabled')
            prevTwo.classList.remove('disabled')
            prevOne.classList.remove('disabled')
            e.preventDefault()
            current = all;
            thisPage.textContent = `${current}`;
        })
        // prev One
        prevOne.addEventListener('click', (e) => {
            nextOne.classList.remove('disabled')
            nextTwo.classList.remove('disabled')
            if (current !== 1) {
                current--;
                thisPage.textContent = `${current}`;
                prevOne.classList.remove('disabled')
            }
            if (current === 1) {
                prevOne.classList.add('disabled')
                prevTwo.classList.add('disabled')
                e.preventDefault()
            }
        })
        // prev Two
        prevTwo.addEventListener('click', (e) => {
            prevTwo.classList.add('disabled')
            prevOne.classList.add('disabled')
            nextTwo.classList.remove('disabled')
            nextOne.classList.remove('disabled')
            e.preventDefault()
            current = 1;
            thisPage.textContent = `${current}`;
        })

        //1001

        let arrPets = [
            ['Katrine' ],
            ['Jennifer'],
            ['Woody'],
            ['Sophia'],
            ['Timmy'],
            ['Charly'],
            ['Scarlett'],
            ['Freddie'],
        ]
        let arrPets1 = [
            ['Katrine' ],
            ['Jennifer'],
            ['Woody'],
            ['Sophia'],
            ['Timmy'],
            ['Charly'],
            ['Scarlett'],
            ['Freddie'],
        ]
        let arrPets2 = [
            ['Katrine' ],
            ['Jennifer'],
            ['Woody'],
            ['Sophia'],
            ['Timmy'],
            ['Charly'],
            ['Scarlett'],
            ['Freddie'],
        ]
        let arrPets3 = [
            ['Katrine' ],
            ['Jennifer'],
            ['Woody'],
            ['Sophia'],
            ['Timmy'],
            ['Charly'],
            ['Scarlett'],
            ['Freddie'],
        ]
        let arrPets4 = [
            ['Katrine' ],
            ['Jennifer'],
            ['Woody'],
            ['Sophia'],
            ['Timmy'],
            ['Charly'],
            ['Scarlett'],
            ['Freddie'],
        ]
        let arrPets5 = [
            ['Katrine' ],
            ['Jennifer'],
            ['Woody'],
            ['Sophia'],
            ['Timmy'],
            ['Charly'],
            ['Scarlett'],
            ['Freddie'],
        ]

        function shuffle(arr) {
            arr.sort(() => Math.random() - 0.5);
            return arr;
        }

        let a = shuffle(arrPets);
        let b = shuffle(arrPets1);
        let c = shuffle(arrPets2);
        let d = shuffle(arrPets3);
        let e = shuffle(arrPets4);
        let f = shuffle(arrPets5);
        let x = [];
        let arrNew = x.concat(a, b, c, d, e, f);


        let n;

        const screenWidth = window.screen.width;
        if (screenWidth >= 1280) { n = 8; }
        else if (screenWidth >= 768) { n = 6; }
        else if (screenWidth < 768) { n = 3; }

        let currentPage = 1;
        let start = (currentPage - 1)*n;
        let end = currentPage*n;

        function createCard() {
            let arr = arrNew.slice(start, end);
            for (let i = 0; i < n; i++) {

                petCards[i].querySelector('.our-friends__card-title').innerHTML = arr[i][0]
                let title = petCards[i].querySelector('.our-friends__card-title').textContent
                data.forEach((item) => {
                    if (item.name === arr[i][0]) {
                        petCards[i].querySelector('.our-friends__card-img').src = item.img
                    }
                })


        }




    }
        nextOne.addEventListener('click', () => {
            currentPage += 1;
            start = (currentPage - 1)*n;
            end = currentPage*n;
            createCard()
        })
        prevOne.addEventListener('click', () => {
            currentPage -= 1;
            start = (currentPage - 1)*n;
            end = currentPage*n;
            createCard();
        })
        prevTwo.addEventListener('click', () => {
            currentPage = 1;
            start = (currentPage - 1)*n;
            end = currentPage*n;
            createCard();
        })
        nextTwo.addEventListener('click', () => {
            currentPage = all;
            start = (currentPage - 1)*n;
            end = currentPage*n;
            createCard();
        })
    })

function randomise(min, max) {
    let result = Math.floor(Math.random() * (max - min) + min)
    return result
}

paginationItems.forEach((item) => {
    if (item.classList.contains('disabled')) {
        item.classList.add('disabled')
    }
})




// popup

const popup = document.querySelector('.popup')
const name = popup.querySelector('.popup-title')
const breed = popup.querySelector('.popup-breed')
const desc = popup.querySelector('.popup-desc')
const age = popup.querySelector('.age')
const inoculations = popup.querySelector('.inoculations')
const diseases = popup.querySelector('.diseases')
const parasites = popup.querySelector('.parasites')
const popupImg = popup.querySelector('.popup-img')
const popupBtn = document.querySelector('.popup-button')
const body = document.querySelector('body');
const html = document.querySelector('html');
const overlayPopup = document.querySelector('.overlay')
const container = document.querySelector('.container')


sendRequest('GET', requestURL)
    .then ((data) => {
        petCards.forEach((item) => {
            item.addEventListener('click', () => {
                for (let d = 0; d < data.length; d++) {
                    let title = item.querySelector('.our-friends__card-title').textContent
                    if (data[d].name === title) {
                        name.innerHTML = data[d].name
                        breed.innerHTML = `${data[d].type}: ${data[d].breed}`
                        desc.innerHTML = data[d].description
                        age.innerHTML = `<span style="font-weight: 700">Age:</span> ${data[d].age}`
                        inoculations.innerHTML = `<span style="font-weight: 700">Inoculations:</span> ${data[d].inoculations}`
                        diseases.innerHTML = `<span style="font-weight: 700">Diseases:</span> ${data[d].diseases}`
                        parasites.innerHTML = `<span style="font-weight: 700">Parasites:</span> ${data[d].parasites}`
                        popupImg.src= data[d].img
                    }
                }
                popup.classList.add('active')
                body.classList.add('disable-popup-scroll')
                html.classList.add('disable-popup-scroll')
                container.classList.add('disable-popup-scroll')
                overlayPopup.classList.add('active-popup')
            })
        })

    })



popupBtn.addEventListener('click', () => {
    popup.classList.remove('active')
    body.classList.remove('disable-popup-scroll')
    html.classList.remove('disable-popup-scroll')
    container.classList.remove('disable-popup-scroll')
    overlayPopup.classList.remove('active-popup')
})

document.addEventListener('click', (event) => {
    const target = event.target;
    if (target.classList.contains('overlay')) {
        popup.classList.remove('active')
        overlayPopup.classList.remove('active-popup')
        body.classList.remove('disable-popup-scroll')
        html.classList.remove('disable-popup-scroll')
        container.classList.remove('disable-popup-scroll')
    }
})

document.addEventListener('mouseover', (event) => {
    const target = event.target;
    if (target.classList.contains('overlay')) {
        popupBtn.classList.add('active')
    }
})
document.addEventListener('mouseout', (event) => {
    const target = event.target;
    if (target.classList.contains('overlay')) {
        popupBtn.classList.remove('active')
    }
})

// json pets

sendRequest('GET', requestURL)
    .then ((data) => {
        for (let i = 0; i < petCards.length; i++) {
            petCards[i].querySelector('.our-friends__card-title').innerHTML = data[i].name
            petCards[i].querySelector('.our-friends__card-img').src = data[i].img

        }
    })
    .catch(err => console.log(err))



function sendRequest(method, url) {
    return new Promise ((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open(method, url)
        xhr.responseType = 'json'

        xhr.onload = () => {
            if (xhr.status >= 400) {
                reject(xhr.response)
            } else {
                resolve(xhr.response)
            }
        }
        xhr.onerror = () => {
            reject(xhr.response)
        }
        xhr.send()
    })

}

// menu
const navList = document.querySelector('.nav-list')

navBurger.addEventListener('click', () => {
    navBurger.classList.toggle('active')
    navigation.classList.toggle('active')
    logo.classList.toggle('active')
    overlay.classList.toggle('active')
    body.classList.toggle('disable-scroll')
    html.classList.toggle('disable-scroll')
    container.classList.toggle'disable-scroll')
    navList.classList.toggle('active')
})

navItems.forEach((element) => {
    element.addEventListener('click', () => {
        navBurger.classList.remove('active')
        navigation.classList.remove('active')
        logo.classList.remove('active')
        overlay.classList.remove('active')
        body.classList.remove('disable-scroll')
        html.classList.remove('disable-scroll')
        container.classList.remove('disable-scroll')
        navList.classList.remove('active')
    })
})

window.addEventListener('click', (event) => {
    const target = event.target;
    if (!target.closest('.menu')) {
        navigation.classList.remove('active')
        logo.classList.remove('active')
        navBurger.classList.remove('active')
        overlay.classList.remove('active')
        body.classList.remove('disable-scroll')
        html.classList.remove('disable-scroll')
        container.classList.remove('disable-scroll')
        navList.classList.remove('active')
    }
})

// sticky header

window.onscroll = function() {stickyHeader()};

function stickyHeader() {
    if (window.pageYOffset >= sticky) {
        header.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
    }
}


// pet cards interaction

petCards.forEach((item) => {
    item.onmouseover = () => {
        petCards.forEach((element) => {
            if (element.classList.contains('active')) {
                element.classList.remove('active')
            }
        })
        item.classList.add('active')
        item.querySelector('.our-friends__card-button').classList.add('active')

    }
    item.onmouseout = () => {
        item.classList.remove('active')
        item.querySelector('.our-friends__card-button').classList.remove('active')
    }
})

// nav items interaction

navItems.forEach((item) => {
    item.addEventListener('click', () => {
        navItems.forEach((element) => {
            if (element.classList.contains('active')) {
                element.classList.remove('active')
            }
        })
        item.classList.add('active')
    })
})
