import axios from 'axios'
import { ensureDir, readFile, writeFile } from 'fs-extra'

const urls = {
  beatmapsetDownload: (id: number, video: boolean = true) =>
    `https://osu.ppy.sh/beatmapsets/${id}/download?noVideo=${!video ? '1' : '0'}`,
  highscores: (id: number, offset: number, limit: number) =>
    `https://osu.ppy.sh/users/${id}/scores/best?mode=osu&offset=${offset}&limit=${limit}`,
}

export const getSessionFromFile = async (path: string = 'session') => {
  const session = await readFile(path)
  if (!session) {
    throw new Error(`no session file found at ${path}`)
  }
  return session.toString()
}

export const downloadSongs = async (songs: number[], video: boolean, session: string) => {
  const tasks = Promise.all(songs.map(async (id: number) => {
    const url = urls.beatmapsetDownload(id, video)
    console.log(`Downloading ${url} ...`)
    const response = await axios.get(url, {
      headers: {
        cookie: `osu_session=${session};`,
      },
      responseType: 'arraybuffer',
    })
    const info = response.headers['content-disposition']
    const [, filename] = info.match(/filename\="([^"]*)"/)
    console.log(`Finished downloading ${filename}`)
    await ensureDir('songs')
    return writeFile(`songs/${filename}`, response.data)
  })).then(() => {
    console.log(`[probably] downloaded ${songs.length} songs.`)
  })
  return tasks
}

export const getUserHighscores = async (id: number, offset: number, limit: number, session: string) => {
  const url = urls.highscores(id, offset, limit)
  const response = await axios.get(url, {
    headers: {
      cookie: `${session}`,
    },
  })

  return response.data.map((best: any) => best.beatmap.beatmapset_id)
}
