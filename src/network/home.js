import {request} from "./request";

export function getHomeData() {
    return request({
        // url: '/searchArticle/es'
        url: '/queryById/1'
    })
}

export function getCommentsData() {
    return request({
        // url: '/searchArticle/es'
        url: '/comments'
    })
}

