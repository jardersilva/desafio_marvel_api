export type Comics = {
  id: number,
  title: string,
  tagline: string,
  date: string,
  img: File,
  urls: urls[],
  thumbnail: thumbnail
};

type urls = {
  type: string,
  url: string
}

type thumbnail = {
  path: string,
  extension: string
}