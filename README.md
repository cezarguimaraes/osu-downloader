# osu-downloader

This program allows you to download a osu beatmap set, example:

```
# Download a beatmap set
osu-downloader song https://osu.ppy.sh/beatmapsets/787134
# You can pass the id directly as well
osu-downloader song 78713
# Use -s (for small) or --no-video to download videoless version of beatmaps
osu-downloader -s song 787134
```

You can also download the first `n` songs of a user's highscore page:
```
# First 5 (default n) beatmaps from user url
osu-downloader highscores https://osu.ppy.sh/users/124493
# Just like the song command, you can simply pass the id and use -s flag
osu-downloader -s highscores 124493
# To change the number of songs downloaded (try not to piss peppy off, this program was made for educational purposes)
osu-downloader -n 10 hs 124493
```

All songs downloaded go to `./songs` directory from wherever you ran the program.

Since osu downloads are protected by authentication, you need to create a `session` file in the working directory with your session cookie.
To get this cookie, install this [extension](https://chrome.google.com/webstore/detail/editthiscookie/fngmhnnpilhplaeedifhccceomclgfbg) (or any equivalent one), log in to osu's website, then copy the `value` of this cookie to your `session` file.

## Installing node
```
sudo apt install curl
curl -sL https://deb.nodesource.com/setup_10.x | sudo bash -
sudo apt install nodejs
```

## Development
To install the necessary dependencies, run `npm install`

To build after changes, run `npm run build`

Now you can call the program with `node .`

## Linking
```
npm link
```

Now you can run `osu-downloader` as if it was installed.

To unlink - you guessed it: `npm unlink`
