import Axios from 'axios'
import store from '@/vuex'
Axios.interceptors.request.use(request => {
    store.commit('openLoading')
    return request
})

Axios.interceptors.response.use(response => {
    store.commit('closeLoading')
    return response
})

export default Axios
