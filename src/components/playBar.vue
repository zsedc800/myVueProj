<template lang="pug">
.footer(v-show="songList.length > 0 && !isShowList && !isShowDetail")
    .player-mini
        audio(
            :src="audio.location",
            @timeupdate="updateTime",
            @canplay="canplaySong",
            @error="loadError",
            @ended="playOver",
            id="audioPlay"
        )
        .cover(@click="toShowDetail")
            img(:src="audio.albumPic + '?param=100y100'", :alt="audio.name")
        .info
            .name.ellipsis {{audio.name}}
            .artist.ellipsis {{audio.singer}}
        .control
            i.fa.fa-list(@click="showList")
            i.fa(:class="playing ? 'fa-play' : 'fa-pause'", @click="toggleStatus")
            i.fa.fa-step-forward(@click="next")
        .progress
            .pro-loaded(:style="{ 'transform': 'translateX(' + prBufferedTime + '%)'}")
            .pro-played(:style="{ 'transform': 'translateX(' + prCurrentTime + '%)'}")
</template>
<script>
import { mapMutations, mapStates } from 'vuex'
export default {
    data () {
        return {

        }
    },
    computed: {
        playing () {
            return this.$store.state.playing
        },
        audio () {
            return this.$store.state.audio
        },
        prCurrentTime () {
            return this.$store.state.currentTime / this.$store.state.durationTime * 100
        },
        prBufferedTime () {
            return this.$store.state.bufferedTime / this.$store.state.durationTime * 100
        },
        isShowDetail () {
            return this.$store.state.showDetail
        },
        songList () {
            return this.$store.state.songList
        },
        isShowList () {
            return this.$store.state.showList
        }
    },
    methods: {
        toggleStatus () {
            const player = document.getElementById('audioPlay')
            if (this.playing) {
                this.$store.commit('pause')
                player.pause()
            } else {
                this.$store.commit('play')
                player.play()
            }
        },
        updateTime() {
            const vm = this
            const player = document.getElementById('audioPlay')
            var time = parseInt(player.currentTime)

            player.onsuspend = function () {
                var timeRage = player.buffered
                if (timeRage.length > 0 && player.duration > 0) {
                    vm.$store.commit('updateBufferedTime', parseInt(player.buffered.end(0)))
                }
            }

            vm.$store.commit('updateDuration', parseInt(player.duration))

            vm.$store.commit('updateCurrentTime', time)
        },
        canplaySong() {
            this.$store.commit('closeLoading')
            this.$store.commit('play')
            document.getElementById('audioPlay').play()
        },
        loadError () {
            if (document.getElementById('audioPlay').currentSrc) {

            } else {
                console.log('程序第一次加载')
            }
        },
        toShowDetail () {
            this.$store.commit('showDetail', true)
            this.$router.push('/playerDetail')
        },
        next () {
            console.log('next')
            this.$store.dispatch('playNext')
        },
        playOver () {
            console.log('over')
            // this.$store.commit('end')
            this.next()
        },
        showList() {
            this.$store.commit('showList')
        }
    }
}
</script>
<style lang="sass">
.footer
    position: fixed
    bottom: 0
    left: 0
    width: 100%
    height: 52px
    font-size: 12px
    background-color: rgba(255, 255, 255, 0.9)
    color: #333
    border: 1px solid #ededed
    z-index: 100
    .cover
        float: left
        padding: 4px 0 0 4px
        width: 50px
        height: 100%
        img
            display: block
            width: 48px
            height: 48px

    .info
        float: left
        height: 100%
        padding-top: 4px
        padding-left: 10px
        max-width: 157px
        .name
            line-height: 20px
            font-size: 16px
        .artist
            line-height: 20px
            font-size: 14px
            color: #999

    .control
        float: right
        height: 100%
        i
            display: inline-block
            width: 47px
            line-height: 52px
            text-align: center
            font-size: 20px
            font-style: normal
            color: rgb(218, 111, 108)
    .progress
        position: absolute
        width: 100%
        height: .1rem
        left: 0
        bottom: 0
        background-color: rgba(255, 255, 255, 0.5)
    .pro-played,
    .pro-loaded
        position: absolute
        left: -100%
        height: .1rem
        width: 100%
    .pro-played
        background-color: #ce3d3e
    .pro-loaded
        background-color: rgba(220, 217, 217, 0.6)
</style>
