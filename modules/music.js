const music = [
					Sound.load("music/mus_story.wav"),
					Sound.load("music/mus_menu0.wav"),
					Sound.load("music/mus_ruins.wav")
					]

export const mus_story = 0
export const mus_menu0 = 1
export const mus_ruins = 2

export let playing = false;
export let paused = false;

export function play(id, loop)
{
	if (playing)
	{
		pause(id)
	}
	if (loop)
	{
		Sound.repeat(true)
		console.log("Music: Repeat Track")
	} else {
		Sound.repeat(false)
		console.log("Music: Don't Repeat Track")
	}

	playing = id;

	console.log("Music: Start Playing: " + playing)
	Sound.play(music[playing])
}

export function pause(id)
{
	if (playing == id)
	{
		Sound.pause(music[playing])
		paused = id
		playing = false
		console.log("Music: Pause Track: " + playing)
	}
	if (paused == id)
	{
		playing = false
	}
}

export function free(id)
{
	if (playing == id)
	{
		Sound.pause(music[playing])
		Sound.free(music[playing])

		console.log("Music: Free Track: " + id)

		playing = false
		paused = false
	} else if (paused == id) {
		Sound.free(music[paused])

		console.log("Music: Free Track: " + id)

		paused = false
	}
}