<template lang="pug">
.cp-album
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
    button.loadMore(@click="loadMore")
        | {{noMore ? '已全部加载完成' : '点击加载更多'}}
</template>
<script>
export default {
    data () {
        return {
            recommandList: [],
            loading: false,
            offset: 0,
            noMore: false
        }
    },
    methods: {
        get () {
            this.loading = true
            this.$http.getAlbumList(this.offset).then(res => {
                var total = res.data.total
                var list = res.data.playlists
                for(let i = 0; i < list.length; i++) {
                    this.recommandList.push(list[i])
                }
                this.offset += 6
                if (this.offset > total ) {
                    this.noMore = true
                }
                this.loading = false
            })
        },
        loadMore () {
            this.get()
        }
    },
    created () {
        this.get()
    }
}
</script>
<style lang="sass">
.cp-album
    position: absolute
    top: 96px
    left: 0
    bottom: 0
    overflow-y: auto
    .list-item
        width: 48%
    figure
        img
            width: 100%
            height: auto
    .loadMore
        display: block
        width: 99%
        margin: 0 auto 56px
        line-height: 36px
        font-size: 16px
        border: 1px solid #e4e4e4
        border-radius: 5px
        background-color: #eee
</style>
