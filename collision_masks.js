import { UP, DOWN, LEFT, RIGHT, UP_RIGHT, UP_LEFT, DOWN_RIGHT, DOWN_LEFT } from "modules/global_constants.js"

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
	{x: 0, y: 0, w: 40, h: 440},
	{x: 0, y: -40, w: 130, h: 40},
	{x: 0, y: -80, w: 280, h: 40},
	{x: 40, y: 300, w: 80, h: 40},
	{x: 40, y: 260, w: 40, h: 40},
	{x: 40, y: 370, w: 200, h: 70},
	{x: 40, y: 340, w: 160, h: 30},
	{x: 600, y: 0, w: 40, h: 440},
	{x: 520, y: -40, w: 130, h: 40},
	{x: 360, y: -80, w: 280, h: 40},
	{x: 520, y: 300, w: 80, h: 40},
	{x: 560, y: 260, w: 40, h: 40},
	{x: 440, y: 340, w: 160, h: 30},
	{x: 400, y: 370, w: 200, h: 70},
	],[ // 2
	{x: 160, y: -207, w: 315, h: 40},
	{x: 240, y: -127, w: 155, h: 40},
	{x: 80, y: -287, w: 200, h: 40},
	{x: 360, y: -287, w: 200, h: 40},
	{x: 80, y: -90, w: 40, h: 425},
	{x: 80, y: 335, w: 160, h: 40},
	{x: 240, y: 375, w: 40, h: 80},
	{x: 520, y: -90, w: 40, h: 425},
	{x: 400, y: 335, w: 160, h: 40},
	{x: 360, y: 375, w: 40, h: 80},
	{x: 120, y: -52, w: 40, h: 40},
	{x: 480, y: -52, w: 40, h: 40},
	{x: 40, y: -247, w: 40, h: 160},
	{x: 560, y: -247, w: 40, h: 160},
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
	{x: 60, y: 20, w: 20, h: 408},
	{x: 80, y: 128, w: 1320, h: 20},
	{x: 80, y: 410, w: 160, h: 20},
	{x: 320, y: 410, w: 1100, h: 20},
	{x: 480, y: 340, w: 70, h: 70},
	{x: 480, y: 148, w: 70, h: 115},
	{x: 960, y: 340, w: 70, h: 70},
	{x: 960, y: 148, w: 70, h: 115},
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
]]

export const nextRoomCollisor = [
	{x: 1195, y: 242, w: 80, h: 40, exit_side: UP},
	{x: 280, y: -100, w: 80, h: 40, exit_side: UP},
	{x: 280, y: -287, w: 80, h: 40, exit_side: UP},
	{x: 235, y: 128, w: 80, h: 20, exit_side: UP},
	{x: 1420, y: 256, w: 40, h: 80, exit_side: RIGHT},
	{x: 310, y: 110, w: 84, h: 40, exit_side: UP},
	{x: 2300, y: 182, w: 40, h: 78, exit_side: RIGHT},
	{x: 2680, y: 185, w: 20, h: 78, exit_side: RIGHT},
	{x: 600, y: 648, w: 16, h: 78, exit_side: RIGHT}
]

export const prevRoomCollisor = [
	{x: 0, y: 0, w: 0, h: 0},
	{x: 240, y: 430, w: 150, h: 15},
	{x: 280, y: 430, w: 80, h: 40},
	{x: 280, y: 410, w: 80, h: 20},
	{x: 240, y: 430, w: 80, h: 20},
	{x: 40, y: 260, w: 28, h: 75},
	{x: 276, y: 400, w: 82, h: 80},
	{x: 20, y: 185, w: 40, h: 75},
	{x: 20, y: 190, w: 16, h: 78},
]

// DOWN_LEFT == \ <
// UP_RIGHT == > \
// UP_LEFT == / <
// DOWN_RIGHT == > /

export const diagonalCollision = [[
	{x: 40, y: 319, w: 40, h: 38, type: DOWN_LEFT},
	{x: 80, y: 357, w: 40, h: 38, type: DOWN_LEFT},
	{x: 120, y: 395, w: 40, h: 37, type: DOWN_LEFT},
	{x: 440, y: 395, w: 40, h: 40, type: DOWN_RIGHT},
	{x: 480, y: 357, w: 40, h: 40, type: DOWN_RIGHT},
	{x: 480, y: 92, w: 40, h: 40, type: UP_RIGHT},
	{x: 80, y: 92, w: 40, h: 40, type: UP_LEFT}
	],[
	// Sala 1
	],[
	// Sala 2 // Inicio das Ruinas
	// Perto do Pilar 1
	{x: 120, y: 295, w: 40, h: 40, type: DOWN_LEFT},
	{x: 240, y: 335, w: 40, h: 40, type: DOWN_LEFT},
	// Perto do Pilar 2
	{x: 480, y: 295, w: 40, h: 40, type: DOWN_RIGHT},
	{x: 360, y: 335, w: 40, h: 40, type: DOWN_RIGHT},
	// Escada 1 Baixo
	{x: 80, y: -130, w: 40, h: 40, type: DOWN_LEFT},
	{x: 120, y: -92, w: 40, h: 40, type: DOWN_LEFT},
	// Escada 2 Baixo
	{x: 520, y: -130, w: 40, h: 40, type: DOWN_RIGHT},
	{x: 480, y: -92, w: 40, h: 40, type: DOWN_RIGHT},
	// Escada 2 Cima
	{x: 440, y: -167, w: 40, h: 40, type: UP_LEFT},
	{x: 400, y: -127, w: 40, h: 40, type: UP_LEFT},
	// Escada 1 Cima
	{x: 160, y: -167, w: 40, h: 40, type: UP_RIGHT},
	{x: 200, y: -127, w: 40, h: 40, type: UP_RIGHT},
	// Cima Extrema Esquerda
	{x: 80, y: -247, w: 40, h: 40, type: UP_LEFT},
	// Cima Extrema Direita
	{x: 520, y: -247, w: 40, h: 40, type: UP_RIGHT},
	],[
	{x: 60, y: 337, w: 40, h: 36, type: DOWN_LEFT},
	{x: 144, y: 372, w: 42, h: 40, type: DOWN_LEFT},
	{x: 495, y: 370, w: 40, h: 40, type: DOWN_RIGHT},
	{x: 535, y: 340, w: 40, h: 30, type: DOWN_RIGHT},
	],[
	],[
	],[
	],[
]]

export const eventCollisions =
{
	GAME_EVENT_FLOWEY_FIRST_DIALOGUE: {x: 200, y: 300, w: 240, h: 20, room: 1}
}
