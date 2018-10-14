export interface IVideo {
  id: string;
  title: string;
  duration: number;
  watched: boolean;
}

export interface ITypes {
  [ index: string ]: Function
}

const randomID = () => Math.random().toString(36).substring(2)

const videos: IVideo[] = []

export const getVideoById = (id: string) => Promise.resolve(videos.find((video: IVideo) => video.id === id))
export const getVideos = () => Promise.resolve(videos)
export const createVideoEntry = ({ title, duration, watched }: IVideo) => ({
  id: randomID(),
  title,
  duration,
  watched
})

export const createVideo = (videoParams: IVideo) => {
  const video = createVideoEntry(videoParams)
  videos.push(video)

  return video
}


export const getObjectById = (type: string, id: string) => {
  const types: ITypes = {
    video: getVideoById
  };

  return types[type.toLowerCase()](id)
}