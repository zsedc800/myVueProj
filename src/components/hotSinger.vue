<template lang="pug">
h3 hotSinger
    my-example(@close="show = false", v-show="show")
</template>
<script>
export default {
    data () {
        return {
            show: true
        }
    },
    components: {
        'my-example': {
            template: `<p>hello world <button @click="$emit('close')">&times;</button></p>`,
        }
    },
    methods: {
        close () {
            this.show = false
        }
    }
}
</script>
