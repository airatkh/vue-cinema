<template>
    <div id="movie-filter">
        <h2>Filters Results</h2>
        <div class="filter-group">
            <h3>By Time od day</h3>
            <check-filter
                    v-for="time in times"
                    category="time"
                    v-bind:title="time"
                    v-on:check-filter="checkFilter"
            ></check-filter>
            <h3>By genre</h3>
            <check-filter
                    v-for="genre in genres"
                    category="genre"
                    v-bind:title="genre"
                    v-on:check-filter="checkFilter"
            ></check-filter>
        </div>
    </div>

</template>

<script>
    import genres from '../util/genres';
    import times from '../util/times';
    import CheckFilter from './CheckFilter.vue';
    export default{
        data(){
            return {
                genres,
                times
            }
        },
        methods: {
            checkFilter(category, title, checked){
                this.$emit('check-filter', category, title, checked);
            }
        },
        components:{
            CheckFilter
        }

    }
</script>