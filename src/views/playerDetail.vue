<template lang="pug">
#player_detail
    .bg-mask(:style="{'background-image' : 'url(' + audio.albumPic + ')'}")
    .wrapper
        .header
            .back.iblock(@click="back")
                i.fa.fa-angle-left
            .title.iblock.ellipsis
                p.name {{audio.name}}
                p.singer {{audio.singer}}
            .share
                i.fa.fa-share
        .cd-holder
            .stick(:class="playing ? 'play' : ''")
            .cd-wrapper(:class="playing ? 'rotate' : ''")
                .cd-mask
                img(:src="audio.albumPic")
        .flex_container
            .lyric-holder
            .pro-wrapper
                time {{currentTime |time}}
                .pro
                    .track
                    .slide
                time {{durationTime | time}}
            .control_bar
                button.btn.d-mode
                button.btn.d-prev(@click="playPrev")
                button.btn(@click="toggleStatus", :class="playing ? 'd-play' : 'd-pause'")
                button.btn.d-next(@click="playNext")
                button.btn.d-list(@click="showList")
</template>
<script>
export default {
    beforeRouteEnter (to, from, next) {
        next(vm => {

        })
    },
    beforeRouteLeave (to, from, next) {
        next(vm => {
            vm.$store.commit('showDetail', false)
        })
    },
    computed: {
        audio () {
            return this.$store.state.audio
        },
        playing () {
            return this.$store.state.playing
        },
        currentTime () {
            return this.$store.state.currentTime
        },
        durationTime () {
            return this.$store.state.durationTime
        }
    },
    filters: {
        time (value) {
            var length = parseInt(value)
            var minute = Math.floor(value / 60)
            if (minute < 10) {
                minute = `0${minute}`
            }
            var second = length % 60
            if (second < 10) {
                second = `0${second}`
            }
            return `${minute} : ${second}`
        }
    },
    methods: {
        back() {
            this.$router.back()
            this.$store.commit('showDetail', false)
        },
        playPrev () {
            this.$store.dispatch('playPrev')
        },
        toggleStatus () {
            const player = document.getElementById('audioPlay')
            if (this.playing) {
                player.pause()
                this.$store.commit('pause')
            } else {
                player.play()
                this.$store.commit('play')
            }
        },
        playNext () {
            this.$store.dispatch('playNext')
        },
        showList () {
            this.$store.commit('showList', true)
        }
    },
    created () {
        this.$store.commit('showDetail', true)
    }
}
</script>
<style lang="sass">
@import 'base/base'
#player_detail
    @include posCover
    font-size: 14px
    .bg-mask
        @include posCover
        filter: blur(50px)
        -webkit-filter: blur(50px)
        background:
            size: cover
            position: top left
            repeat: no-repeat
    .wrapper
        @include posCover
    .header
        height: 56px
        border-bottom: 1px solid #ccc
    .back
        width: 48px
        height: 48px
        padding-top: 8px
        text-align: center
        line-height: 48px
        font-size: 32px
        font-weight: bolder
        .fa
            color: #fff
    .title
        padding: 5px 0 0 5px
        max-width: 247px
        .name
            font-size: 16px
            color: #fff
            line-height: 1.8
        .singer
            font-size: 12px
            color: #a8a7a7
    .share
        float: right
        width: 48px
        height: 48px
        text-align: center
        line-height: 48px
        margin-top: 8px
        margin-right: 10px
        .fa
            color: #fff
            font-size: 24px
    .cd-holder
        position: relative
        overflow: hidden
    .cd-wrapper
        position: relative
        width: 245px
        height: 245px
        min-height: 80px
        border-radius: 50%
        padding: 5px
        margin: 3rem auto 0
        .cd-mask
            @include posCover
            background:
                image: url('~assets/cd_wrapper.png')
                repeat: no-repeat
                size: 100%
            z-index: 7
        img
            width: 100%
            height: 100%
            border-radius: 50%
            z-index: 1
    .stick
        position: absolute
        width: 4rem
        height: 6rem
        right: 30%
        background:
            image: url('~assets/stick_bg.png')
            repeat: no-repeat
            size: cover
            position: left -0.4rem
        z-index: 10
        transition: all 300ms ease-in
        transform-origin: left top
        transform: rotateZ(-20deg)
        &.play
            transform: none
    .flex_container
        display: flex
        flex-wrap: wrap
        padding: 0 20px
    .lyric-holder
        position: relative
        width: 100%
        margin-top: .6rem
        height: 3rem
        overflow: hidden
    .pro-wrapper
        width: 100%
        display: flex
        justify-content: space-between
        color: #fff
        .pro
            position: relative
            width: 234px
            height: 24px

            .track
                position: absolute
                top: 50%
                width: 100%
                height: 2px
                margin-top: -1px
                background-color: #bdbdbd
    .control_bar
        width: 100%
        display: flex
        padding-right: 10px
        justify-content: space-between
        .btn
            width: 2.6rem
            height: 2.6rem
            background:
                repeat: no-repeat
                size: cover
                color: rgba(0, 0, 0, 0)
            &.d-mode
                background-image: url('~assets/seq.png')
                &:hover
                    background-image: url('~assets/seq_hover.png')
            &.d-prev
                background-image: url('~assets/prev.png')
                &:hover
                    background-image: url('~assets/prev_hover.png')
            &.d-play
                background-image: url('~assets/play.png')
                &:hover
                    background-image: url('~assets/play_hover.png')
            &.d-pause
                background-image: url('~assets/pause.png')
                &:hover
                    background-image: url('~assets/pause_hover.png')
            &.d-next
                background-image: url('~assets/next.png')
                &:hover
                    background-image: url('~assets/next_hover.png')
            &.d-list
                background-image: url('~assets/list.png')
                &:hover
                    background-image: url('~assets/list_hover.png')
</style>
