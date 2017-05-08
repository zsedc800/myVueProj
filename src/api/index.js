import Axios from './resource'
const getRecomListUrl = `http://musicapi.duapp.com/api.php?type=topPlayList&offset=0&limit=6`
export default {
    getRecomList: () => Axios.get(getRecomListUrl).then(res => res.data),
    getSong_list: id => Axios.get(`https://api.imjad.cn/cloudmusic/?type=playlist&id=${id}`).then(res => res.data),
    getSong: id => Axios.get(`http://musicapi.duapp.com/api.php?type=url&id=${id}`),
    getAlbumList: offset => Axios.get(`http://musicapi.duapp.com/api.php?type=topPlayList&cat=全部&offset=${offset}&limit=6`)
}
