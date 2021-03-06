export const RECEIVE_VIDEOS = "RECEIVE_VIDEOS";
export const RECEIVE_VIDEO = "RECEIVE_VIDEO";
import * as VideoAPIUtil from "../util/video_util";
import { receiveVideoError } from "./modal_actions";
import { getUser } from "./users_actions";


export const receiveVideos = videos =>{
    return{
        type: RECEIVE_VIDEOS,
        videos
    }
}

export const receiveVideo = video =>{
    return{
        type: RECEIVE_VIDEO,
        video
    }
}

export const getVideos = () => dispatch =>{
    return VideoAPIUtil.getVideos().then(payload => dispatch(receiveVideos(payload)),
        error =>  dispatch(receiveVideoError(error.responseJSON)))
}

export const getVideo = videoId => dispatch =>{
    return VideoAPIUtil.getVideo(videoId).then(payload=>{
            dispatch(receiveVideo(payload));
            dispatch(getUser(payload.creator_id));
        },() => dispatch(receiveVideoError(["Video Not Found"])))
}

export const createVideo = video => dispatch =>{
    return VideoAPIUtil.uploadVideo(video).then(payload=> dispatch(receiveVideo(payload)),
        () => dispatch(receiveVideoError(["Error occured when creating Video"])));
};

export const updateVideo = video => dispatch =>{
    return VideoAPIUtil.updateVideo(video).then(payload => dispatch(receiveVideo(payload)),
        () => dispatch(receiveVideoError(["Error occured when attempting to save"])));
}

export const searchVideos = search => dispatch =>{
    return VideoAPIUtil.searchVideos(search).then(payload => dispatch(receiveVideos(payload)),
        () => dispatch(receiveVideoError(["Error occured during search"])))
}

export const addViewCount = videoId => dispatch => {
    return VideoAPIUtil.incrementView(videoId).then(payload => dispatch(receiveVideo(payload)));
}