<template lang="pug">
#play_list_container(v-show="isShowList")
    .bg_mask(@click="close")
    .list
        .head_title {{`播放列表（${songList.length}）`}}
        ul
            li(v-for="(item, index) of songList", :key="index", @click="play(index)")
                .content
                    span.title {{item.name}}
                    span.artist -{{item.singer}}
        .title {{example}}
</template>
<script>
export default {
    computed: {
        songList () {
            return this.$store.state.songList
        },
        isShowList () {
            return this.$store.state.showList
        }
    },
    props: ['example'],
    methods: {
        play (index) {
            console.log(index)
            this.$store.commit('setCurrentIndex', index + 1)
            this.$store.dispatch('play')
        },
        close () {
            this.$store.commit('hideList')
        }
    },
    created () {
    }
}
</script>
<style lang="sass">
#play_list_container
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 1000
    .bg_mask
        position: absolute
        top: 0
        left: 0
        right: 0
        bottom: 0
        background-color: rgba(0, 0, 0, 0.4)
    .list
        position: absolute
        bottom: 0
        left: 0
        width: 100%
        max-height: 300px
        min-height: 200px
        overflow-y: auto
        font-size: 14px
        color: #333
        background-color: #fff
        ul
            padding: 0 10px
            border-top: 1px solid #e4e4e4
        li
            line-height: 47px
            border-bottom: 1px solid #e4e4e4
        .content
            color: #ce3d3e
        .artist
            font-size: 12px
    .head_title
        font-size: 16px
        text-align: center
        line-height: 47px
</style>
