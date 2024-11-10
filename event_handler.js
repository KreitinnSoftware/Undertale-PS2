import { player } from "player.js"
import { eventCollisions } from "collision_masks.js"
import { room } from "room.js"
import { GAME_EVENT_FLOWEY_FIRST_DIALOGUE, GAME_EVENT_TYPE_TALK } from "modules/global_constants.js"

export let event = 0
export let event_type = 0

export function checkEventCollisions()
{
	if (player.testCollision(eventCollisions.GAME_EVENT_FLOWEY_FIRST_DIALOGUE) && eventCollisions.GAME_EVENT_FLOWEY_FIRST_DIALOGUE.room == room) {
		event = GAME_EVENT_FLOWEY_FIRST_DIALOGUE
		event_type = GAME_EVENT_TYPE_TALK
	}
}