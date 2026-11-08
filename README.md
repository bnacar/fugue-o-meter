# Fugue-O-Meter

For visualizing contrapuntal activity while listening to fugues.
Voices are listed in a scoreboard-like table and may be highlighted or
swapped via manual input (computer keystrokes).

Note: I have only tested this on Linux with Firefox.

## Setting Up

Install Node.js if you don't have it already.

Clone this repo and install dependencies.

Run `npm run dev`.

Navigate to `http://localhost:5173`.

## Basic Usage

By default this provides a display for six voices, as in the Six Part
Ricercar from J. S. Bach's Musical Offering. The keybindings are as
follows:

- `ASDFGH`: Toggle whether a voice is highlighted as "active".
- `QWERTY`: Toggle whether a voice has the theme, and increment the theme tally accordingly.
- `1-5`: Swap adjacent voices.
- `Esc`: Reset the display.

The keybindings may be changed, along with the number and names of
voices, by editing `src/Table.jsx` accordingly.

## Future Work

Ideally all configuration (number of voices, names of voices,
keybindings etc.) should be abstracted out to a `.ini` file.

Eventually it would be nice to hook this up to a MIDI playback engine so
that you could feed in a MIDI file of a fugue and it would
highlight/swap around the voices as it plays back. This would probably
require including some custom MIDI events in the input file to designate
theme entrances.

