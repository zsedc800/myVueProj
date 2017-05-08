<template lang="pug">
.sub-recommand
    .banner.swiper-container
        .swiper-wrapper
            .swiper-slide
                img.img-responsive(src="~assets/banner1.jpg")
            .swiper-slide
                img.img-responsive(src="~assets/banner2.jpg")
            .swiper-slide
                img.img-responsive(src="~assets/banner3.jpg")
            .swiper-slide
                img.img-responsive(src="~assets/banner4.jpg")
        .swiper-pagination
    .flex-list
        h3
            span.head-title 推荐列表
            i.fa.fa-angle-right
        ul.flex-container
            router-link.list-item(
                tag="li",
                v-for="(item, index) in recommandList",
                :to="{ name: `song_list`, params: { id: item.id, coverImgUrl: item.coverImgUrl, name: item.name, author: item.creator, count: item.playCount, desc: item.description } }",
                :key="index"
            )
                figure
                    img(:src="item.coverImgUrl + '?param=230y230'")
                    figcaption {{item.name}}

</template>
<script>
import 'swiper/dist/js/swiper.min.js'
import 'swiper/dist/css/swiper.min.css'
export default {
    data () {
        return {
            recommandList: ''
        }
    },
    async beforeMount() {
        let data = await this.$http.getRecomList()
        this.recommandList = data.playlists
    },
    mounted () {
        new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            loop: true,
            autoplay: 5000
        })
    }
}
</script>
<style lang="sass">
@import 'config/config'
.img-responsive
    max-width: 100%
    height: auto
.flex-list
    h3
        padding: 5px 0
        font-size: 14px
        .head-title
            padding-left: 10px
            border-left: 3px solid $primaryColor
        .fa
            padding: 0 5px
            font-size: 18px
            font-weight: bold
.flex-container
    display: flex
    flex-wrap: wrap
    justify-content: space-between
    padding: 5px
    .list-item
        width: 32%
        margin-bottom: 10px
    figure
        img
            width: 5rem
            height: 5rem
        figcaption
            font-size: 12px

</style>
