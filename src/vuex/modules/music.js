import api from '../../api'
import * as types from '../types'

const state = {
    musicLists: [],
    audio: {
		"name": "成都",
		"id": 436514312,
		"sname": "赵雷",
		"imgUrl": "http://p4.music.126.net/34YW1QtKxJ_3YnX9ZzKhzw==/2946691234868155.jpg",
        "mp3Url": "http://m2.music.126.net/7o5D4dA6271VktgawcbZFA==/18665309393829604.mp3"
    },
    lyric: '',
    size: '200.045714',
    currentIndex: 0, // 当前播放的歌曲位置
    playing: false, // 是否正在播放
}

const actions = {
    /**
     * 获取音乐列表
     */
    getMusicLists({ commit }) {
        if (localStorage.musics !== '[]' && localStorage.musics) {
            // state.musicData = JSON.parse(localStorage.musics);
            commit(types.GET_MUSIC_LISTS, JSON.parse(localStorage.musics))
            return;
        }
        api.MusicList()
            .then(res => {
                commit(types.GET_MUSIC_LISTS, res.musicData)
                localStorage.musics = JSON.stringify(res.musicData)
            })
            .catch(res => {
                commit(types.GET_MUSIC_LISTS, res.musicData)
                localStorage.musics = JSON.stringify(res.musicData)
            })
    },
    setAudio({ commit }, music) {
        commit(types.SET_AUDIO, music)
    },
    setNextAudio({ commit }, index) {
        commit(types.SET_NEXT_AUDIO, index)
    },
    setPreAudio({ commit }, index) {
        commit(types.SET_PRE_AUDIO, index)
    },
    setPlaying({ commit }, status) {
        commit(types.SET_PLAYING, status)
    },
    deleteMusic({ commit }, index) {
        commit(types.DELETE_MUSIC, index)
    },
    getMusicInfo({ commit }, id) {
        api.MusicLyric({id})
            .then((res) => {
                res.lrc ? commit(types.GET_MUSIC_LYRIC, res.lrc.lyric) : commit(types.GET_MUSIC_LYRIC, '')
            })
            .catch((res) => {
                res.lrc ? commit(types.GET_MUSIC_LYRIC, res.lrc.lyric) : commit(types.GET_MUSIC_LYRIC, '')
            })  
    },
    getMusicTime({ commit }, size) {
        commit(types.GET_MUSIC_TIME, size)
    }
}

const getters = {
    musicLists: state => state.musicLists,
    audio: state => state.audio,
    playing: state => state.playing,
    lyric: state => state.lyric,
    size: state => state.size
}

const mutations = {
    [types.GET_MUSIC_LISTS](state, res) {
        state.musicLists = res
    },
    [types.SET_AUDIO](state, music) {
        state.audio = music
    },
    [types.SET_NEXT_AUDIO](state, index) {
        let i = index === state.musicLists.length - 1 ? 0 : (++index)
        state.audio = state.musicLists[i]
    },
    [types.SET_PRE_AUDIO](state, index) {
        let i = index === 0 ? state.musicLists.length - 1 : (--index)
        state.audio = state.musicLists[i]
    },
    [types.SET_PLAYING](state, status) {
        state.playing = status
    },
    [types.DELETE_MUSIC](state, index) {
        state.musicLists.splice(index, 1)
    },
    [types.GET_MUSIC_LYRIC](state, playload) {
        state.lyric = playload
    },
    [types.GET_MUSIC_TIME](state, playload) {
        state.size = playload
    }
    // [types.GET_TRAVELS_SEARCH_KEY](state, params) {
    //     state.searchKey = params
    // },
    // [types.GET_TRAVELS_PAGE_NUM](state) {
    //     state.searchKey['page'] += 1
    // },
    // [types.GET_TRAVELS_SCORLL_STATUS](state, status) {
    //     state.scroll = status
    // }
}

export default {
    state,
    actions,
    getters,
    mutations
}