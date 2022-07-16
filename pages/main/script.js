const petCards = document.querySelectorAll('.our-friends__card')
const petList = document.querySelector('.our-friends__list')
const navItems = document.querySelectorAll('.nav-list__item')
const navBurger = document.querySelector('.nav-burger')
const navigation = document.querySelector('.nav')
const logo = document.querySelector('.logo-wrapper')
const overlay = document.querySelector('.overlay')
const sliderRightArrow = document.querySelector('.our-friends__navigation-right')
const sliderLeftArrow = document.querySelector('.our-friends__navigation-left')
const container = document.querySelector('.container')


// popup

const requestURL = '../pets/pets.json'

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
        container.classList.remove('disable-popup-scroll')
        html.classList.remove('disable-popup-scroll')
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


// slider

sliderRightArrow.addEventListener('click', () => {
    changeSlides('right')
})
sliderLeftArrow.addEventListener('click', () => {
    changeSlides('left')
})


function changeSlides (direction) {

    // available indexes

    let availableIndexes = []
    sendRequest('GET', requestURL).then ((data) => {
        for (let s = 0; s < data.length; s++) {
            availableIndexes.push(s)
        }
        petCards.forEach((item) => {
            for (let t = 0; t < data.length; t++) {
                let title = item.querySelector('.our-friends__card-title').textContent
                if (data[t].name === title) {
                    availableIndexes.splice(t, 1, '')
                }
            }
        })
        for (let p = 0; p < availableIndexes.length; p++) {
            if (availableIndexes[p] === '') {
                availableIndexes.splice(p, 1)
                p -= 1;
            }
        }

        // random number

        petCards.forEach((item) => {
            let randomNumber = Math.floor(Math.random()*availableIndexes.length)

            // change slides

            item.querySelector('.our-friends__card-title').innerHTML = data[(availableIndexes[randomNumber])].name
            item.querySelector('.our-friends__card-img').src = data[(availableIndexes[randomNumber])].img

            if (direction === 'right') {
                const animationSlides = item.animate([
                    {transform: 'translate(50px)'},
                    {transform: 'translate(0)'}
                ], 500);
            }

            if (direction === 'left') {
                const animationSlides = item.animate([
                    {transform: 'translate(-50px)'},
                    {transform: 'translate(0)'}
                ], 500);
            }
            availableIndexes.splice(randomNumber, 1)
        })
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
    container.classList.toggle('disable-scroll')
    html.classList.toggle('disable-scroll')
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

// pets cards interaction

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
