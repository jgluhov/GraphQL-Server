export interface IVideo {
  id: string,
  title: string,
  duration: number,
  watched: boolean
}

const videoA = {
  id: 'a',
  title: 'GraphQL Server',
  duration: 120,
  watched: false
}

const videoB = {
  id: 'b',
  title: 'GraphQL Client',
  duration: 80,
  watched: true
}

const videos = [videoA, videoB]

export const getVideoById = (id: string) =>
  Promise.resolve(videos.find((video: IVideo) => video.id === id))
export const getVideos = () => Promise.resolve(videos);