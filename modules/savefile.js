let file;

let tmp;

let lines;

class saveManager
{
	floweyMeetTimes = 0
	floweyFirstDialogue = 0

	saveVars = {
		"floweyMeetTimes": this.floweyMeetTimes,
		"floweyFirstDialogue": this.floweyFirstDialogue
	}

	setVar(variableName, value)
	{
		this[variableName] = value;
	}

	createDirectory()
	{
		os.mkdir("mc0:/UNDERTALE", 777)

		System.copyFile("saveSys/icon.icn", "mc0:/UNDERTALE/icon.icn");
		System.copyFile("saveSys/icon.sys", "mc0:/UNDERTALE/icon.sys");
	}

	saveFile()
	{
		if (!System.doesFileExist("mc0:/UNDERTALE"))
		{
			this.createDirectory();
		}

		file = std.open("mc0:/UNDERTALE/savegame.txt", "w");

		for (let key in this.saveVars)
		{
			file.printf("%s %i\n", key, this[key]);
		}

		file.flush();

		file.close();
	}

	loadFile()
	{
		if (!System.doesFileExist("mc0:/UNDERTALE/savegame.txt"))
		{
			this.saveFile();
		}

		file = std.open("mc0:/UNDERTALE/savegame.txt", "r");

		lines = file.readAsString().split("\n");

		for (let i = 0; i < lines.length - 1; i++)
		{
			tmp = lines[i].split(" ");

			this.setVar(tmp[0], Number(tmp[1]))
		}

		file.close();
	}
}

export let saveMan = new saveManager;