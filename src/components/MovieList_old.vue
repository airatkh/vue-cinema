<template>
    <div id="movie-list">
        <div v-if="filteredMovie.length">
            <movie-item v-for="movie in filteredMovie" class="movie" :movie="movie.movie">
                <div class="movie-sessions">
                    <div v-for="session in filteredSessions(movie.sessions)" class="session-time-wrapper">
                        <div class="session-time">{{formatSessionTime(session.time)}}</div>
                    </div>
                </div>
            </movie-item>
        </div>
        <div class="no-results" v-else="movies.length">
            {{noResultsMsg}}
        </div>
        <div class="no-results" v-else>
            Loading...
        </div>
    </div>
</template>

<script>
    import genres from '../util/genres';
    import times from '../util/times';
    import MovieItem from './MovieItem.vue';
    export default {
        props: ['genre','time', 'movies', 'day'],
        methods: {
            moviePassesGenreFilter(movie){
                if (!this.genre.length) {
                    return true;
                } else {
                    let movieGenres = movie.movie.Genre.split(", ");
                    let matched = true;
                    this.genre.forEach(genre => {
                        if(movieGenres.indexOf(genre) === -1) {
                            matched = false;
                        }
                    });
                    return matched;
                }
            },
            sessionPassesTimeFilter(session){
                if(!this.day.isSame(this.$moment(session.time), 'day')) {
                    return false;
                }

                if(this.time.length === 0 || this.time.length === 2){
                    return true;
                }else if(this.time[0] === times.AFTER_6PM) {
                    return this.$moment(session.time).hour() >= 18;
                } else {
                    return this.$moment(session.time).hour() <= 18;
                }
            },
            formatSessionTime(raw){
                return this.$moment(raw).format('h:mm A');
            },
            filteredSessions(sessions){
                //this.$moment(session.time).isSame(this.day, 'day')
                return sessions.filter(session =>(this.sessionPassesTimeFilter));
            }
        },
        computed: {
            filteredMovie(){
                return this.movies
                    .filter(this.moviePassesGenreFilter)
                    .filter(movie => movie.sessions.find(this.sessionPassesTimeFilter));
            },
            noResultsMsg(){
                let times = this.time.join(', ');
                let genres = this.genre.join(', ');
                return `no results for ${times}${times.length && genres.length ? ', ': ''}${genres}.`;

            }
        },
        components:{
            MovieItem
        },
    }
</script>