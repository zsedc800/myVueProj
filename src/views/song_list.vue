<template lang="pug">
.cp-song_list
    .fixed-title(:style="{'background': 'rgba(206, 61, 62,' + opacity + ')'}", style="transition: opacity .1s")
        span.icon(@click="back")
            i.fa.fa-angle-left
        .title.ellipsis {{fname}}
    .header
        .header-content
            .cover
                img(:src="coverImgUrl + '?param=300y300'")
            .info-wrapper
                p.title {{name}}
                img(:src="author.avatarUrl")
                span {{author.nickname}}
        .bg-mask
        .bg-player(:style="{ 'background-image': 'url(' + coverImgUrl + ')'}")
    .play-list
        .play-all
            .play-all-wrapper(@click="playAll")
                i.fa.fa-play-circle
                span 播放全部
        ul.song-list
            li.song-list-item(v-for="(item, index) of list", :key="index", @click="playAudio(item)")
                span.indicator {{index + 1}}
                .content
                    p.title.ellipsis {{item.name}}
                    p.desc.ellipsis {{item.ar[0].name}}
</template>
<script>
export default {
    data () {
        return {
            coverImgUrl: 'http://zsedc800.tk/uploads/avatar-b0c56454ccaa292315d97afb44c4760c.png',
            name: '歌单标题',
            id: 0,
            playCount: 0,
            description: '歌单描述',
            author: {
                'nickname': '昵称',
                'avatarUrl': 'http://zsedc800.tk/uploads/avatar-13e4927f4320187de4d3a39119e9427d.png'
            },
            list: [],
            fname: '歌单',
            opacity: 0
        }
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            if (parseInt(to.params.id) !== parseInt(vm.id)){
                vm.getData()
            }
            if (to.params.coverImgUrl) {
                vm.coverImgUrl = to.params.coverImgUrl
                vm.name = to.params.name
                vm.author = to.params.author
            }
            const scrollHandle = () => {
                let opa = window.pageYOffset / 150
                if (opa > 0.5) {
                    vm.fname = vm.name
                } else {
                    vm.fname = '歌单'
                }
                vm.opacity = opa
            }
            scrollHandle()
            window.onscroll = scrollHandle
        })
    },
    beforeRouteLeave (to, from, next) {
        window.onscroll = null
        next()
    },
    methods: {
        back() {
            this.$router.back()
        },
        async getData () {
            this.id = this.$route.params.id
            let data = await this.$http.getSong_list(this.id)
            this.list = data.playlist.tracks
        },
        playAudio(song) {
            document.getElementById('audioPlay').pause()
            this.$store.commit('pause')

            var audio = {}
            audio.id = song.id
            audio.singer = song.ar[0].name
            audio.albumPic = song.al.picUrl
            audio.name = song.name

            this.$store.commit('addToList', audio)
            this.$store.commit('setCurrentIndex', this.$store.state.songList.length)
            this.$store.dispatch('getSong', audio.id)
        },
        async playAll() {
            document.getElementById('audioPlay').pause()
            this.$store.commit('pause')
            let curIndex = this.$store.state.currentIndex
            await this.list.forEach(song => {
                let audio = {}
                audio.id = song.id
                audio.singer = song.ar[0].name
                audio.albumPic = song.al.picUrl
                audio.name = song.name

                this.$store.commit('addToList', audio)
            })

            this.$store.commit('setCurrentIndex', curIndex + 1)
            this.$store.dispatch('getSong', this.list[0].id)

        }
    },
    mounted () {
        this.getData()
    }

}
</script>
<style lang="sass">
@import 'config/config'
.cp-song_list
    .fixed-title
        position: fixed
        top: 0
        width: 100%
        height: 56px
        left: 0
        line-height: 56px
        z-index: 10
        .icon
            float: left
            height: 100%
            width: 48px
            text-align: center
            line-height: 56px
            .fa
                font-style: nowrap
                font-size: 28px
                color: #fff
        .title
            float: left
            line-height: 56px
            font-size: 18px
            max-width: 80%
            color: #fff
    .header
        position: relative
        width: 100%
        height: 10rem
        color: #fff
    .header-content
        position: absolute
        padding: 60px 0 0 10px
        left: 0
        top: 0
        bottom: 0
        right: 0
        z-index: 4
        .cover
            display: inline-block
            vertical-align: top
            width: 6rem
            color: #fff
        img
            max-width: 100%
            height: auto
    .info-wrapper
        display: inline-block
        margin-left: 1rem
        width: 7.5rem
        font-size: 16px
        vertical-align: top
        color: #fff
        .title
            padding: 20px 0
            color: #fff
        img
            width: 30px
            height: 30px
            vertical-align: middle
            border-radius: 50%
        span
            vertical-align: middle
            padding-left: 2px
            color: #fff
    .bg-mask
        position: absolute
        top: 0
        left: 0
        right: 0
        bottom: 0
        background-color: rgba(0, 0, 0, .25)
        z-index: 4
    .bg-player
        position: absolute
        top: 0
        left: 0
        right: 0
        bottom: 0
        background:
            size: cover
            repeat: no-repeat
            position: bottom right
        z-index: 1
        filter: blur(40px)
        -webkit-filter: blur(40px)

    .play-list
        font-size: 14px
    .play-all
        padding-left: 10px
        line-height: 36px
        .fa
            font-size: 22px
            vertical-align: middle
            color: #000
        .play-all-wrapper
            border-bottom: 1px solid #e4e4e4
        span
            vertical-align: middle
            padding-left: 5px
    .song-list
        padding: 0 16px 16px 72px
        position: relative
        .song-list-item
            height: 70px
            border-bottom: 1px solid #e4e4e4
        .indicator
            position: absolute
            left: 16px
            padding-left: 10px
            line-height: 70px
            font-size: 18px
            font-weight: bolder
            color: #757575
        .content
            height: 100%
            display: flex
            flex-wrap: wrap
            align-items: center
            align-content: center
        .title
            width: 100%
            font-weight: bold
        .desc
            width: 100%
            color: #ccc
</style>
