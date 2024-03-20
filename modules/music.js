let music_path = [
			"music/mus_story.wav",
			"music/mus_menu0.wav",
			"music/mus_ruins.wav"
			]

export const mus_story = 0
export const mus_menu0 = 1
export const mus_ruins = 2

let music_list = []

export let playing = false;
export let paused = false;

export function load(id)
{
	console.log("Music: Load Track: " + music_path[id])
	music_list[id] = Sound.load(music_path[id])
}

export function play(id, loop)
{
	if (playing)
	{
		pause(id)
	}

	if (! music_list[id])
	{
		load(id)
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

	Sound.play(music_list[playing])
}

export function pause(id)
{
	if (playing == id)
	{
		Sound.pause(music_list[playing])
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
		Sound.pause(music_list[playing])
		Sound.free(music_list[playing])

		console.log("Music: Free Track: " + id)

		playing = false
		paused = false
	} else if (paused == id) {
		Sound.free(music_list[paused])

		console.log("Music: Free Track: " + id)

		paused = false
	}
}
