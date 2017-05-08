import vuex from 'vuex'
import Vue from 'vue'
import api from '@/api'
import audio from './audio'

const state = {
    lyric: '',
    currentIndex: 0,
    playing: false,
    loading: true,
    showDetail: false,
    showList: false,
    ended: false,
    songList: [],
    currentTime: 0,
    durationTime: 0,
    bufferedTime: 0,
    change: false
}


const mutations = {
    play (state) {
        state.playing = true
        state.ended = false
    },
    end (state) {
        state.ended = true
        state.playing = false
    },
    pause (state) {
        state.playing = false
    },
    toggleDetail (state) {
        state.showDetail = !state.showDetail
    },
    toggleStatus (state) {
        state.playing = !state.playing
    },
    setAudio (state) {
        state.audio = state.songList[state.currentIndex - 1]
        console.log(state.audio)
    },
    setLocation (state, location) {
        state.audio.location = location
    },
    addToList (state, audio) {
        state.currentIndex++
        state.songList.push(audio)
    },
    setCurrentIndex (state, index) {
        state.currentIndex = index
    },
    updateDuration (state, dur) {
        state.durationTime = dur
    },
    updateCurrentTime (state, cur) {
        state.currentTime = cur
    },
    updateBufferedTime (state, buff) {
        state.bufferedTime = buff
    },
    showDetail (state, val) {
        state.showDetail = val
    },
    showList (state) {
        state.showList = true
    },
    hideList (state) {
        state.showList = false
    },
    openLoading (state) {
        state.loading = true
    },
    closeLoading (state) {
        state.loading = false
    },
    resetAudio (state) {
        state.currentTime = 0
    }
}

const actions = {
    getSong ({ commit, state }, id) {
        commit('openLoading')
        api.getSong(id).then(res => {
            let url = res.data.data[0].url
            commit('setAudio')
            commit('setLocation', url)
        })
    },
    playNext ({ dispatch, commit, state }) {
        state.currentIndex++
        if (state.currentIndex > state.songList.length) {
            state.currentIndex = 1
        }
        dispatch('play')
    },
    playPrev ({dispatch, commit, state }) {
        state.currentIndex--
        if (state.currentIndex < 0) {
            state.currentIndex = 1
        }
        dispatch('play')
    },
    play ({ commit }) {
        commit('openLoading')
        api.getSong(state.audio.id).then(res => {
            commit('setAudio')
            let url = res.data.data[0].url
            commit('setLocation', url)
            commit('closeLoading')
            commit('play')
        })
    }
}


Vue.use(vuex)

export default new vuex.Store({
    state,
    mutations,
    actions,
    modules: {
        audio
    }
})
