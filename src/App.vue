<template lang="pug">
#app
    transition(name="_root", mode="out-in")
        keep-alive
            router-view
    play-bar
    play_list(:example="example")
    loading(v-show="loading")
</template>
<script>
import playBar from '@/components/playBar.vue'
import play_list from '@/components/play_list.vue'
import loading from '@/components/loading.vue'
export default {
    data () {
        return {
            example: 'Hello',
        }
    },
    components: {
        playBar,
        play_list,
        loading
    },
    computed: {
        loading () {
            return this.$store.state.loading
        }
    },
    watcher: {

    }
}
</script>
<style lang="sass">
@import 'config/config'
@import 'base/base'
._root-enter-active,
._root-leave-active
    transform opacity 0.5s
._root-enter,
._root-leave-active
    opacity: 0
</style>
