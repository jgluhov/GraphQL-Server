export interface IVideo {
  id: string;
  title: string;
  duration: number;
  watched: boolean;
}

const randomID = () => Math.random().toString(36).substring(2)

const videoA = {
  id: randomID(),
  title: 'GraphQL Server',
  duration: 120,
  watched: false
}

const videoB = {
  id: randomID(),
  title: 'GraphQL Client',
  duration: 80,
  watched: true
}

const videos = [videoA, videoB]

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
