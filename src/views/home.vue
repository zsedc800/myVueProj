<template lang="pug">
.cp-home
    .header
    mt-navbar(v-model="selected")
        mt-tab-item(id="/recommand")
            | 推荐
        mt-tab-item(id="/album")
            | 歌单
        mt-tab-item(id="/top")
            | 排行
        mt-tab-item(id="/hotSinger")
            | 热门歌手
    router-view
</template>
<script>
let kky = 1
export default {
    data () {
        return {
            selected: '/recommand'
        }
    },
    watch: {
        selected (newVal, oldVal) {
            if (newVal === oldVal) {
                return
            }
            this.$router.push(newVal)
        }
    },
    mounted () {
    }
}
</script>
<style lang="sass" scoped>
@import 'config/config'
.header
    height: 47px
    background-color: $primaryColor
.mint-navbar
    .mint-tab-item
        &.is-selected
            color: $primaryColor
            border-bottom: 3px solid $primaryColor
            margin-bottom: 0
</style>
