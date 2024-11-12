import { UP, DOWN, LEFT, RIGHT, UP_RIGHT, UP_LEFT, DOWN_RIGHT, DOWN_LEFT, ROOM_ENTRANCE, ROOM_EXIT } from "modules/global_constants.js"

export const collisions = [[ // 0
	{x: 0, y: 133, w: 40, h: 185},
	{x: 160, y: 432, w: 280, h: 40},
	{x: 120, y: 53, w: 360, h: 40},
	{x: 40, y: 92, w: 40, h: 40},
	{x: 520, y: 92, w: 40, h: 40},
	{x: 560, y: 132, w: 40, h: 150},
	{x: 600, y: 242, w: 595, h: 40},
	{x: 520, y: 357, w: 800, h: 40},
	{x: 1320, y: 282, w: 40, h: 75},
	{x: 1275, y: 242, w: 45, h: 40}
	],[ // 1
	{x: 0, y: 267, w: 40, h: 440},
	{x: 0, y: 227, w: 130, h: 40},
	{x: 0, y: 187, w: 280, h: 40},
	{x: 40, y: 567, w: 80, h: 40},
	{x: 40, y: 527, w: 40, h: 40},
	{x: 40, y: 637, w: 200, h: 70},
	{x: 40, y: 607, w: 160, h: 30},
	{x: 600, y: 267, w: 40, h: 440},
	{x: 520, y: 227, w: 130, h: 40},
	{x: 360, y: 187, w: 280, h: 40},
	{x: 520, y: 567, w: 80, h: 40},
	{x: 560, y: 527, w: 40, h: 40},
	{x: 440, y: 607, w: 160, h: 30},
	{x: 400, y: 637, w: 200, h: 70}
	],[ // 2
	{x: 160, y: 253, w: 315, h: 40},
	{x: 240, y: 333, w: 155, h: 40},
	{x: 80, y: 173, w: 200, h: 40},
	{x: 360, y: 173, w: 200, h: 40},
	{x: 80, y: 370, w: 40, h: 425},
	{x: 80, y: 795, w: 160, h: 40},
	{x: 240, y: 835, w: 40, h: 80},
	{x: 520, y: 370, w: 40, h: 425},
	{x: 400, y: 795, w: 160, h: 40},
	{x: 360, y: 835, w: 40, h: 80},
	{x: 120, y: 408, w: 40, h: 40},
	{x: 480, y: 408, w: 40, h: 40},
	{x: 40, y: 213, w: 40, h: 160},
	{x: 560, y: 213, w: 40, h: 160},
	],[ // 3
	{x: 60, y: 140, w: 40, h: 44},
	{x: 100, y: 105, w: 134, h: 44},
	{x: 40, y: 180, w: 20, h: 158},
	{x: 100, y: 372, w: 44, h: 40},
	{x: 190, y: 410, w: 86, h: 40},
	{x: 320, y: 105, w: 180, h: 44},
	{x: 500, y: 140, w: 40, h: 44},
	{x: 540, y: 180, w: 40, h: 44},
	{x: 580, y: 220, w: 20, h: 120},
	{x: 360, y: 410, w: 135, h: 40},
	],[ // 4
	{x: 60, y: 130, w: 20, h: 298},
	{x: 80, y: 130, w: 1320, h: 18},
	{x: 80, y: 410, w: 160, h: 18},
	{x: 320, y: 410, w: 1100, h: 18},
	{x: 478, y: 338, w: 80, h: 72},
	{x: 478, y: 148, w: 80, h: 115},
	{x: 958, y: 338, w: 80, h: 72},
	{x: 958, y: 148, w: 80, h: 115},
	{x: 1400, y: 148, w: 20, h: 115},
	{x: 1400, y: 338, w: 20, h: 72},
	],[ // 5
	{x: 70, y: 220, w: 40, h: 40},
	{x: 110, y: 184, w: 40, h: 40},
	{x: 150, y: 148, w: 40, h: 40},
	{x: 190, y: 110, w: 120, h: 40},
	{x: 70, y: 336, w: 80, h: 38},
	{x: 150, y: 373, w: 40, h: 38},
	{x: 190, y: 411, w: 324, h: 38},
	{x: 514, y: 373, w: 40, h: 38},
	{x: 554, y: 338, w: 40, h: 38},
	{x: 594, y: 222, w: 40, h: 112},
	{x: 554, y: 184, w: 40, h: 40},
	{x: 514, y: 148, w: 40, h: 40},
	{x: 394, y: 110, w: 120, h: 40},
	],[ // 6
	{x: 60, y: 130, w: 20, h: 258},
	{x: 80, y: 130, w: 720, h: 20},
	{x: 80, y: 370, w: 200, h: 18},
	{x: 360, y: 370, w: 438, h: 18},
	{x: 798, y: 298, w: 160, h: 90},
	{x: 958, y: 370, w: 442, h: 18},
	{x: 1400, y: 334, w: 800, h: 54},
	{x: 798, y: 130, w: 240, h: 90},
	{x: 1038, y: 200, w: 280, h: 95},
	{x: 1318, y: 180, w: 400, h: 80},
	{x: 1800, y: 259, w: 40, h: 76},
	{x: 1920, y: 180, w: 120, h: 80},
	{x: 2120, y: 259, w: 220, h: 76},
	{x: 1720, y: 105, w: 640, h: 80},
	],[ // 7
	{x: 78, y: 130, w: 2584, h: 18},
	{x: 38, y: 148, w: 42, h: 36},
	{x: 78, y: 334, w: 2584, h: 18},
	{x: 38, y: 260, w: 42, h: 75},
	{x: 2345, y: 148, w: 72, h: 38},
	{x: 2662, y: 148, w: 40, h: 38},
	{x: 2662, y: 260, w: 40, h: 75},
	],[ // 8
	{x: 20, y: 150, w: 98, h: 40},
	{x: 20, y: 268, w: 98, h: 552},
	{x: 118, y: 112, w: 156, h: 40},
	{x: 360, y: 112, w: 156, h: 40},
	{x: 518, y: 152, w: 98, h: 496},
	{x: 518, y: 726, w: 98, h: 94},
	{x: 118, y: 800, w: 400, h: 20},
	],[ // 9
	{x: 142, y: 372, w: 138, h: 68},
	{x: 142, y: 70, w: 356, h: 68},
	{x: 360, y: 372, w: 138, h: 68},
	{x: 142, y: 138, w: 98, h: 234},
	{x: 401, y: 138, w: 98, h: 234},
	],[ // 10
	{x: 30, y: 264, w: 42, h: 54},
	{x: 552, y: 264, w: 42, h: 54},
	{x: 72, y: 302, w: 480, h: 16},
	{x: 30, y: 175, w: 564, h: 14},
	]
]

class RoomCollisor
{
	constructor(x, y, w, h, destRoom, destPlace, exitSide, exitObjId)
	{
		this.x = x
		this.y = y
		this.w = w
		this.h = h
		this.destRoom = destRoom
		this.destPlace = destPlace
		this.exitSide = exitSide
		this.exitObjId = (exitObjId ?? 0)
	}
}

export const changeRoomCollisors = [[ // 0
	new RoomCollisor(1195, 242, 80, 40, 1, ROOM_ENTRANCE, UP),
	],[ // 1
	new RoomCollisor(280, 187, 80, 20, 2, ROOM_ENTRANCE, UP),
	new RoomCollisor(240, 697, 160, 10, 0, ROOM_EXIT),
	],[ // 2
	new RoomCollisor(280, 173, 80, 40, 3, ROOM_ENTRANCE, UP),
	new RoomCollisor(280, 890, 80, 40, 1, ROOM_EXIT),
	],[ // 3
	new RoomCollisor(235, 128, 80, 20, 4, ROOM_ENTRANCE, UP),
	new RoomCollisor(280, 410, 80, 20, 2, ROOM_EXIT),
	],[ // 4
	new RoomCollisor(1420, 256, 40, 80, 5, ROOM_ENTRANCE, RIGHT),
	new RoomCollisor(240, 430, 80, 20, 3, ROOM_EXIT),
	],[ // 5
	new RoomCollisor(310, 110, 84, 40, 6, ROOM_ENTRANCE, UP),
	new RoomCollisor(40, 260, 28, 75, 4, ROOM_EXIT),
	],[ // 6
	new RoomCollisor(2300, 182, 40, 78, 7, ROOM_ENTRANCE, RIGHT),
	new RoomCollisor(276, 400, 82, 80, 5, ROOM_EXIT),
	],[ // 7
	new RoomCollisor(2680, 185, 20, 78, 8, ROOM_ENTRANCE, RIGHT),
	new RoomCollisor(20, 185, 40, 75, 6, ROOM_EXIT),
	],[ // 8
	new RoomCollisor(600, 648, 16, 78, 10, ROOM_ENTRANCE, RIGHT),
	new RoomCollisor(274, 112, 84, 40, 9, ROOM_ENTRANCE, UP),
	new RoomCollisor(20, 190, 16, 78, 7, ROOM_EXIT),
	],[ // 9
	new RoomCollisor(280, 420, 80, 20, 8, ROOM_EXIT, undefined, 1),
	],[ // 10
	new RoomCollisor(594, 189, 20, 75, 11, ROOM_ENTRANCE),
	new RoomCollisor(10, 189, 20, 75, 8, ROOM_EXIT),
	]
]

// DOWN_LEFT == \ <
// UP_RIGHT == > \
// UP_LEFT == / <
// DOWN_RIGHT == > /

export const diagonalCollision = [[ // 0
	{x: 40, y: 319, w: 40, h: 38, type: DOWN_LEFT},
	{x: 80, y: 357, w: 40, h: 38, type: DOWN_LEFT},
	{x: 120, y: 395, w: 40, h: 37, type: DOWN_LEFT},
	{x: 440, y: 395, w: 40, h: 40, type: DOWN_RIGHT},
	{x: 480, y: 357, w: 40, h: 40, type: DOWN_RIGHT},
	{x: 480, y: 92, w: 40, h: 40, type: UP_RIGHT},
	{x: 80, y: 92, w: 40, h: 40, type: UP_LEFT}
	],[
	],[ // 2
	{x: 120, y: 755, w: 40, h: 40, type: DOWN_LEFT},
	{x: 240, y: 795, w: 40, h: 40, type: DOWN_LEFT},
	{x: 480, y: 755, w: 40, h: 40, type: DOWN_RIGHT},
	{x: 360, y: 795, w: 40, h: 40, type: DOWN_RIGHT},
	{x: 80, y: 330, w: 40, h: 40, type: DOWN_LEFT},
	{x: 120, y: 368, w: 40, h: 40, type: DOWN_LEFT},
	{x: 520, y: 330, w: 40, h: 40, type: DOWN_RIGHT},
	{x: 480, y: 368, w: 40, h: 40, type: DOWN_RIGHT},
	{x: 440, y: 293, w: 40, h: 40, type: UP_LEFT},
	{x: 400, y: 333, w: 40, h: 40, type: UP_LEFT},
	{x: 160, y: 293, w: 40, h: 40, type: UP_RIGHT},
	{x: 200, y: 333, w: 40, h: 40, type: UP_RIGHT},
	{x: 80, y: 213, w: 40, h: 40, type: UP_LEFT},
	{x: 520, y: 213, w: 40, h: 40, type: UP_RIGHT},
	],[ // 3
	{x: 60, y: 337, w: 40, h: 36, type: DOWN_LEFT},
	{x: 144, y: 372, w: 42, h: 40, type: DOWN_LEFT},
	{x: 495, y: 370, w: 40, h: 40, type: DOWN_RIGHT},
	{x: 535, y: 340, w: 40, h: 30, type: DOWN_RIGHT},
	],[
	],[
	],[
	],[
	]
]

export const eventCollisions =
{
	GAME_EVENT_FLOWEY_FIRST_DIALOGUE: {x: 200, y: 675-108, w: 240, h: 20, room: 1}
}
