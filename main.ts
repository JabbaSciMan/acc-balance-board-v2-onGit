let strip = neopixel.create(DigitalPin.P0, 60, NeoPixelMode.RGB)
strip.showRainbow(1, 360)
let AvgAcc = 0
let countAccValues = 0
let timer = 0
let goal_tilt_x = 0
let range = 50
let light_modulo_x = 50
let correct_tilt_time = 3
let End_of_Game = false
/**
 * and one more else if and say if game is false and tilt goes out of bounds, then set rainbow.      This will make it so the lights turn off after the game ends and won't start the game again until tilted out of bounds (to try the tilt game again.)
 */
/**
 * If a is clicked, only x axis game.  If B is clicked, then x & y game.  If A&B is clicked then a random tilt is chosen!!!!:)
 */
basic.forever(function () {
    countAccValues += 1
    AvgAcc = (AvgAcc * (countAccValues - 1) + input.acceleration(Dimension.X)) / countAccValues
    if (timer >= correct_tilt_time && Math.abs(AvgAcc - goal_tilt_x) < range && !(End_of_Game)) {
        music.startMelody(music.builtInMelody(Melodies.Entertainer), MelodyOptions.Once)
        for (let index = 0; index < 8; index++) {
            strip.showColor(neopixel.colors(NeoPixelColors.Green))
            basic.pause(200)
            strip.clear()
            strip.show()
            basic.pause(200)
        }
        End_of_Game = true
        strip.showRainbow(1, 360)
    } else if (Math.abs(input.acceleration(Dimension.X)) > range) {
        timer = 0
        End_of_Game = false
    }
})
basic.forever(function () {
    basic.pause(1000)
    timer += 1
})
basic.forever(function () {
    strip.rotate(input.acceleration(Dimension.X) / light_modulo_x)
    strip.show()
})
