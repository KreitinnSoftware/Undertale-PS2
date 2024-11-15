import { EN_US, PT_BR } from "modules/global_constants.js"

class SaveManager
{
	floweyMeetTimes = 0
	floweyFirstDialogue = 0
	language = PT_BR
	debugInfo = true

	saveVars = {
		"language": this.language,
		"floweyMeetTimes": this.floweyMeetTimes,
		"floweyFirstDialogue": this.floweyFirstDialogue
	}

	setVar(variableName, value)
	{
		this[variableName] = value
	}

	createDirectory()
	{
		os.mkdir("mc0:/UNDERTALE", 777)

		System.copyFile("saveSys/icon.icn", "mc0:/UNDERTALE/icon.icn")
		System.copyFile("saveSys/icon.sys", "mc0:/UNDERTALE/icon.sys")
	}

	saveFile()
	{
		if (this.testMemoryCard() == 0) {
			if (!System.doesFileExist("mc0:/UNDERTALE")) {
				this.createDirectory()
			}

			let file = std.open("mc0:/UNDERTALE/savegame.txt", "w")

			for (let key in this.saveVars) {
				file.printf("%s %i\n", key, this[key])
			}

			file.flush()
			file.close()
		}
	}

	loadFile()
	{
		if (this.testMemoryCard() == 0) {
			if (!System.doesFileExist("mc0:/UNDERTALE/savegame.txt")) {
				this.saveFile()
			}

			let file = std.open("mc0:/UNDERTALE/savegame.txt", "r")
			let lines = file.readAsString().split("\n")

			for (let i = 0; i < lines.length - 1; i++) {
				let tmp = lines[i].split(" ")

				this.setVar(tmp[0], Number(tmp[1]))
			}

			file.close()
		}
	}

	testMemoryCard()
	{
		let memoryCard = std.open("mc0:/", "r")

		if (memoryCard == null) {
			console.log("Memory Card is not recognized or not formated.")
			return null
		}

		memoryCard.close()

		return 0
	}
}

export const globalVariables = new SaveManager