// let tv = new Swiper(.trend__tv-slider, {
//     slidesPerView: 1,
//     spaceBetween: 27,
//     // slidesPerGroup: 3,
//     loop: true,
//     // loopFillGroupWithBlank: true,
//     navigation: {
//         nextEl: .trend__tv-slider .swiper-button-next,
//         prevEl: .trend__tv-slider .swiper-button-prev,
//     },
//     breakpoints: {
//         1440: {
//             slidesPerView: 6,
//         },
//         1200: {
//             slidesPerView: 5,
//         },
//         960: {
//             slidesPerView: 4,
//         },
//         720: {
//             slidesPerView: 3,
//         },
//         500: {
//             slidesPerView: 2,
//         },
//     }
// });

// let awaited = new Swiper(.popular__actors-slider, {
//     slidesPerView: 1,
//     spaceBetween: 27,
//     // slidesPerGroup: 3,
//     loop: true,
//     // loopFillGroupWithBlank: true,
//     navigation: {
//         nextEl: .popular__actors-slider .swiper-button-next,
//         prevEl: .popular__actors-slider .swiper-button-prev,
//     },
//     breakpoints: {
//         1440: {
//             slidesPerView: 6,
//         },
//         1200: {
//             slidesPerView: 5,
//         },
//         960: {
//             slidesPerView: 4,
//         },
//         720: {
//             slidesPerView: 3,
//         },
//         500: {
//             slidesPerView: 2,
//         },
//     }
// });



// API

const searchLink = document.querySelector('.search__link .icon-reg'),
    mainContent = document.querySelector('.main__content'),
    mainClose = document.querySelector('.main__close'),
    mainBlock = document.querySelector('.main__block'),
    pagination = document.querySelector('.pagination'),
    mainSolo = document.querySelector('.main__solo'),
    moviesLink = document.querySelector('.movies__link'),
    formMain = document.querySelector('.form__main'),
    headerInput = document.querySelector('.header__input'),
    anime = document.querySelector('.anime'),
    headerItems = document.querySelector('.header__items'),
    headerBtn = document.querySelector('.header__btn'),
    headerAbs = document.querySelector('.header__abs');



// menu bar

headerBtn.addEventListener('click', () => {
    headerItems.classList.toggle('active')
    headerAbs.classList.toggle('active')
})


headerAbs.addEventListener('click', (e) => {
    // console.log(e.target)
    // console.log(e.currentTarget)

    if (e.target == e.currentTarget) {
        headerItems.classList.remove('active')
        headerAbs.classList.remove('active')
    }
})


// HOST

const host = "https://kinopoiskapiunofficial.tech";
const hostName = "X-API-KEY";
const hostValue = "9885231f-c445-4e7d-b428-819fc57e5851";

class Kino {
    constructor() {
        this.date = new Date().getMonth();
        this.curYear = new Date().getFullYear();
        this.months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
        this.curMonth = this.months[this.date];
    }

    fOpen = async (url) => {
        let response = await fetch(url, {
            headers: {
                [hostName]: hostValue
            }
        });

        if (response.ok) return response.json()
        else throw new Error(`Bu manzildagi ma'lumotga ulana olmadik ${url}`)
    }

    getTopMovies = (page = 1) => this.fOpen(`${host}/api/v2.2/films/collections?type=TOP_250_MOVIES&page=${page}`);

    getSoloFilms = (id) => this.fOpen(`${host}/api/v2.2/films/${id}`)

    getMoviesAwaited = (page = 1, year = this.curYear, month = this.curMonth) => this.fOpen(`${host}/api/v2.1/films/releases?year=${year}&month=${month}&page=${page}`);

    getReviews = (id) => this.fOpen(`${host}/api/v2.2/films/${id}/reviews?page=1&order=DATE_DESC`)

    getSearch = (page = 1, keyword) => this.fOpen(`${host}/api/v2.1/films/search-by-keyword?keyword=${keyword}&page=${page}`)

    getFrames = (id) => this.fOpen(`${host}/api/v2.2/films/${id}/images?type=STILL&page=1`);

}

const dbKino = new Kino();

// dbKino.getTopMovies().then (res => {
//     console.log(res.items)
// })
// dbKino.getSoloFilms(32898).then (res => {
//     console.log(res)
// })

// dbKino.getMoviesAwaited().then(res => {
//     console.log(res.releases)
// })

// dbKino.getReviews(435).then(res => {
//     console.log(res)
// })


// dbKino.getSearch(1,'Зеленая').then(res => {
//     console.log(res)
// })

// dbKino.getFrames(435).then(res => {
//     console.log(res)
// })


function renderTrendMovies(elem = [], fn = [], films = [], pages = []) {

    anime.classList.add('active')
    elem.forEach((item, i) => {
        // console.log(item)
        let parent = document.querySelector(`${item} .swiper-wrapper`)
        dbKino[fn[i]](pages[i]).then(data => {
            // console.log(data[films[i]])

            data[films[i]].forEach(el => {
                // console.log(el)

                let slide = document.createElement('div')
                slide.classList.add('swiper-slide')

                slide.innerHTML = `
                <div class="movie__item">
                    <img src="${el.posterUrlPreview}" alt="" loading="lazy">
                </div>
                `
                parent.append(slide)
            });
            anime.classList.remove('active')
        })

            .then(() => {
                elem.forEach(item => {
                    new Swiper(`${item}`, {
                        slidesPerView: 1,
                        spaceBetween: 27,
                        // slidesPerGroup: 3,
                        loop: true,
                        // loopFillGroupWithBlank: true,
                        navigation: {
                            nextEl: `${item} .swiper-button-next`,
                            prevEl: `${item} .swiper-button-prev`,
                        },
                        breakpoints: {
                            1440: {
                                slidesPerView: 6,
                            },
                            1200: {
                                slidesPerView: 5,
                            },
                            960: {
                                slidesPerView: 4,
                            },
                            720: {
                                slidesPerView: 3,
                            },
                            500: {
                                slidesPerView: 2,
                            },
                        }
                    });

                });
            })
    });
}

renderTrendMovies([".trend__tv-slider", ".popular__actors-slider"], ["getTopMovies", "getMoviesAwaited"], ["items", "releases"], [1, 1]);




// render header

function randMovies(num) {
    return Math.trunc(Math.random() * num + 1); // 0 - 250
}


function renderHeader(page) {
    dbKino.getTopMovies(page).then(data => {
        // console.log(data.items)
        // anime.classList.add('active')

        let max = randMovies(data.items.length)
        // console.log(data.items[max])

        let filmId = data.items[max].kinopoiskId
        // console.log(filmId)
        let filmRating = data.items[max].ratingKinopoisk
        // console.log(filmRating)
        dbKino.getSoloFilms(filmId).then(response => {
            console.log(response)

            let url = response.webUrl
            // console.log(url)

            let headerText = document.querySelector('.header__text')
            headerText.innerHTML = `
            
                <h1 class="header__title">${response.nameRu || response.nameEn}</h1>
                <div class="header__balls">
                    <span class="header__year">${response.year}</span>
                    <span class="logo__span header__rating  header__year ">${response.ratingAgeLimits}+</span>
                    <div class="header__seasons header__year">${response.filmLength}+</div>
                    <div class="header__stars header__year"><span class="icon-solid"></span><strong>${filmRating}</strong></div>
                </div>
                <p class="header__descr">
                    ${response.description}
                </p>
                <div class="header__buttons">
                    <a href="${url}" class="header__watch"><span class="icon-solid"></span>watch</a>
                    <a href="#" class="header__more header__watch movie__item" data-id="${filmId}">More information</a>
                </div>
            
            `
        })

            .then(() => {
                let headerMore = document.querySelector('.header__more')

                headerMore.addEventListener('click', function (e) {
                    e.preventDefault()

                    let attr = this.getAttribute('data-id')
                    renderSolo(attr)
                    openSoloFilms(e)

                })
            })

    })
}

let page = 13;

let rand = randMovies(page)

renderHeader(rand)

// console.log(rand)



// open solo film


function openSoloFilms(e) {
    e.preventDefault()
    mainContent.classList.add('active')
}

mainClose.addEventListener('click', function () {
    mainContent.classList.remove('active')
})




// curdate primeria

let popularActorsTitle = document.querySelector('.popular__actors-title strong')
popularActorsTitle.innerHTML = `${dbKino.curMonth}  ${dbKino.curYear}`


const comingSoonBlock = document.querySelector('.coming__soon-block img')
const year = document.querySelector('.year')

year.innerHTML = `${dbKino.curYear}`

dbKino.getPrimiers().then(res => {
    console.log(res)

    let rand = randMovies(res.total)
    comingSoonBlock.src = res.item[rand].posterUrlPreview
})


async function renderSolo(id) {
    ;
    (async function () {
        const [reviews, frames, solo] = await Promise.all([
            dbKino.getReviews(id),
            dbKino.getFrames(id),
            dbKino.getSoloFilms(id)
        ]);

        return {
            reviews,
            frames,
            solo
        }
    })()

        .then(res => {
            let solo = res.solo

            let genres = solo.genres.reduce((acc, item) => acc + `${item.genre}`, '');
            let countries = solo.countries.reduce((acc, item) => acc + `${item.country}`, '')
            let reviews = res.reviews.items.slice(0, 10)

            reviews.forEach(item => {
                reviews += `
            <div class="review__item">
              <span>${item.author}</span>
              <p class="review__descr">${item.description}</p>
            </div>
            `
            });

            let frame = res.frames.items.slice(0, 15)
            console.log(frame);

            frame.forEach(item => {
                frames += `
            <img src=""${item.previewUrl} alt="">
            `
            });

            let div = `
                <div class="solo__img">
                    <img src="${solo.posterUrlPreview}" alt="">
                    <a href="#" class="solo__link header__watch">Watch</a>
                </div>


                <div class="main__content">
                    <h3 class="solo__title trend__tv-title">${solo.nameEn || solo.nameRu}</h3>
                    </div>
                    <ul>
                        <li class="solo__countries">Davlati:${countries}</li>
                        <li class="solo__genres">Janrlari:${genres}</li>
                        <li class="solo__year">Yili:${solo.year}</li>
                        <li class="solo__premier">Premyerasi:${solo.year}</li>
                        <li class="solo__rating">Reytingi:${solo.ratingKinopoisk}</li>
                        <li class="solo__slogan">Shiori:${solo.slogan}</li>
                        <li class="solo__length">Vaqti:${solo.filmLength}</li>
                          
                    </ul>
                
                <li class="solo__descr">Izoh; ${solo.description}</li>

                <div class="solo__facts">
                    <h2 class="trend__tv-title">Qiziqarli Faktlar:</h2>
                </div>

                <div class="solo__images">
                    ${frames}
                </div>
        `

        mainSolo.innerHTML = div
        })
}