import {request} from "./request";

export function getHomeData() {
    return request({
        // url: '/searchArticle/es'
        url: '/queryById',
        method: 'post'
    })
}

export function getCommentsData() {
    return request({
        // url: '/searchArticle/es'
        url: '/comments'
    })
}

export function articleDelete() {
    return request({
        // url: '/searchArticle/es'
        url: '/articles'
    })
}

