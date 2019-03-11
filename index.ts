#!/usr/bin/env node

import program from 'commander'

import { downloadSongs, getSessionFromFile, getUserHighscores } from './osu'

const matchId = (input: string) => {
  const match = input.match(/(\d+)/)
  if (!match) {
    return null
  }
  return Number(match[0])
}

program
  .option('-s, --no-video', 'download noVideo version of beatmaps')
  .option('-n, --num-songs [limit]', 'how many songs to download from highscores', /(\d+)/, '5')

program
  .command('song <id_or_url>')
  .action(async (input: string) => {
    const id = matchId(input)
    if (!id) {
      throw new Error('no beatmap id found in given parameter')
    }
    const session = await getSessionFromFile()
    await downloadSongs([id], program.video, session)
  })

program
  .command('highscores <id_or_url>')
  .alias('hs')
  .action(async (input: string) => {
    const id = matchId(input)
    if (!id) {
      throw new Error('no user id found in given parameter')
    }
    const session = await getSessionFromFile()
    const limit = Number(program.numSongs)
    const songs = await getUserHighscores(id, 0, limit, session)
    await downloadSongs(songs, program.video, session)
  })

program
  .version('1.0.0')
  .parse(process.argv)
