import * as player from "player.js";

import { event_collisions } from "collision_masks.js"

import { room } from "room.js"

export let event = 0;

export let event_type = 0;

export function checkEventCollisions()
{
	if (player.test_collision(event_collisions.GAME_EVENT_FLOWEY_FIRST_DIALOGUE) && event_collisions.room == room)
	{
		event = GAME_EVENT_FLOWEY_FIRST_DIALOGUE;
		event_type = GAME_EVENT_TYPE_TALK;
	}
}