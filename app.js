import data from "./data.js"
const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)



const app = {
    movies: data,
    currentIndex: 0,

    defineProperty: function() {
        Object.defineProperty(this, 'currentMovie', {
            get: function() {
                return this.movies[this.currentIndex]
            }
        })
    },

    loadMovie: function() {
        const movieName = $('.main_movie-name')
        const movieEpisode = $('.main_movie-episode')
        const mainMovieBackground = $('.main_movie_background')
        const htmlVideo = `
            <video width="1012" height="570" controls>
            <source src="${this.currentMovie.url}" type="video/mp4">
            </video>
        `
        movieName.textContent = this.currentMovie.name
        movieEpisode.textContent = this.currentMovie.episode
        mainMovieBackground.innerHTML = htmlVideo
    },

    rederMovie: function() {
        const episode = $('.main-episode_wrap')
        const htmls = this.movies.map((movie, index) => {
            return `
                <button class="main-episode_wrap-btn ${index === this.currentIndex ? 'active' : ''}" data-index="${index}">${movie.episode}</button>
            `
        })
        episode.innerHTML = htmls.join('')
    },

    handleEvent: function() {
        const _this = this
        const episodeBtn = $('.main-episode_wrap')
        

        episodeBtn.onclick = function(e) {
            console.log(e.target)
            console.log(e.target.classList.value.includes('active'))
            if(!e.target.classList.value.includes('active')) {
                console.log(e.target)
                _this.currentIndex = Number(e.target.dataset.index)
                console.log(_this.currentIndex)
                _this.loadMovie()
                _this.rederMovie()
            }
        }
        
    },

    start: function() {
        // render episode ra UI
        this.rederMovie()
        // định nghĩa current movie
        this.defineProperty()
        //load movie
        this.loadMovie()
        //xử lí sự kiện
        this.handleEvent()
    }
}
app.start()