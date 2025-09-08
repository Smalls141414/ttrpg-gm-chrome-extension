const sp = document.getElementById("spellForm").addEventListener('submit', findSpell);
const na = document.getElementById("nameForm").addEventListener('submit', namesGet);
const ra = document.getElementById("rewardForm").addEventListener('submit', rewardsGet);
const sd = document.getElementById("speciesDropdown");
const rs = document.getElementById("response");
const rsT = document.getElementById("responseTitle");
const rsD = document.getElementById("responseDescription");

document.getElementById("settings").addEventListener("click", loadEditPage);

/**
TODO:
- Fill Initial Data
- Check Duplicate Names when storing rewards & names
- Add Name & Reward Delete
- Add Clear all Names & Clear all rewards
- Catch undefined names
- Add more clear user feedback
- Add more detailed comments
**/

async function onLoad()
{
	// Add initial data if it is not already added
	chrome.storage.local.get("initialData", function (result) {
		let initialData = result.initialData;

		if(typeof initialData === 'undefined')
		{
			addSampleData();
			chrome.storage.local.set({ initialData : true }, function(){
				console.log("Data Initialized - Enjoy!");
			});
			
			// Once data is filled, add species to option dropdown
			addSpecies();
		} else
		{
			console.log("Data Already Initialized!");

			addSpecies();
		}
	});
}

async function addSampleData()
{
	const species = ["Human", "Dwarf", "Elf", "Halfling", "Dragonborn", "Gnome", "Half-Elf", "Half-Orc", "Tiefling"];
	const Human = ["Aragorn"];
	const Dwarf = ["Gimli"];
	const Elf = ["Legolas"];
	const Halfling = ["Frodo Baggins"];
	const Dragonborn = ["Smaug"];
	const Gnome = ["Barcus Wroot"];
	const Half_Elf = ["Elrond"];
	const Half_Orc = ["Garona Halforcen"];
	const Tiefling = ["Karlach"];

	const common = [];
	const uncommon = [];
	const rare = [];
	const veryrare = [];
	const legendary = [];

	console.log("Adding Initial Data...");
	chrome.storage.local.set({ "species" : species }, function(){
		console.log("Initial Species Added");
	});
	chrome.storage.local.set({ "Human" : Human }, function(){
		console.log("Human Names Added");
	});
	chrome.storage.local.set({ "Dwarf" : Dwarf }, function(){
		console.log("Dwarf Names Added");
	});
	chrome.storage.local.set({ "Elf" : Elf }, function(){
		console.log("Elf Names Added");
	});
	chrome.storage.local.set({ "Halfling" : Halfling }, function(){
		console.log("Halfling Names Added");
	});
	chrome.storage.local.set({ "Dragonborn" : Dragonborn }, function(){
		console.log("Dragonborn Names Added");
	});
	chrome.storage.local.set({ "Gnome" : Gnome }, function(){
		console.log("Gnome Names Added");
	});
	chrome.storage.local.set({ "Half-Elf" : Half_Elf }, function(){
		console.log("Half-Elf Names Added");
	});
	chrome.storage.local.set({ "Half-Orc" : Half_Orc }, function(){
		console.log("Half-Orc Names Added");
	});
	chrome.storage.local.set({ "Tiefling" : Tiefling }, function(){
		console.log("Tiefling Names Added");
	});

	chrome.storage.local.set({ "common" : common }, function(){
		console.log("Common Rewards Added");
	});
	chrome.storage.local.set({ "uncommon" : uncommon }, function(){
		console.log("Uncommon Rewards Added");
	});
	chrome.storage.local.set({ "rare" : rare }, function(){
		console.log("Rare Rewards Added");
	});
	chrome.storage.local.set({ "veryrare" : veryrare }, function(){
		console.log("Very Rare Rewards Added");
	});
	chrome.storage.local.set({ "legendary" : legendary }, function(){
		console.log("Legendary Rewards Added");
	});
}

async function addSpecies()
{
	chrome.storage.local.get({species : []}, function (result) {
		let species = result.species;
		for (let i = 0; i < species.length; i++)
		{
			var option = document.createElement("option");
			option.value = species[i];
			option.text = species[i];
			sd.appendChild(option);
		}
	});
}

async function findSpell(event)
{
	// Prevent standard form events and get spelltext
	event.preventDefault();
	let spellText = document.getElementById("spellText").value;
	let url;
	
	// Update text for url use: all lowercase, dashes in place of spaces, remove nonletters
	spellText = spellText.toLowerCase();
	spellText = spellText.replace(/[^a-z\s]/g, "");
	spellText = spellText.replace(" ", "-");
	
	// Check chosen spell source
	await chrome.storage.local.get(["spellSource"]).then((result) => {
		console.log("Value is " + result.spellSource);
		if(result.spellSource == "beyond")
		{
			url = "http://www.dndbeyond.com/spells/" + spellText;
		} else if(result.spellSource == "wikidot2024")
		{
			url = "http://dnd2024.wikidot.com/spell:" + spellText;
		} else
		{
			url = "http://dnd5e.wikidot.com/spell:" + spellText;
		}
	});
	
	// Send and focus url
	window.open(url, '_blank').focus();
}

/**
	Names Function - Unfinished
**/
async function namesGet(event)
{
	event.preventDefault();
	let species = document.getElementById("speciesDropdown").value;
	console.log(species);
	
	// Gets array of rewards and returns a random one from the list
	await chrome.storage.local.get({ [species] : [] }, function (result) {
		let names = result[species];
		let randomIndex = Math.floor(Math.random() * names.length);

		// Reward is then displayed in a previously hidden HTML block
		console.log(names[randomIndex]);
		rsT.innerHTML = names[randomIndex];
		rsD.innerHTML = "";
		rs.style.display = 'block';

	});
}

/**
	Rewards Function
**/
async function rewardsGet(event)
{
	event.preventDefault();
	let rarity = document.getElementById("rarity").value;
	console.log(rarity);
	
	// Gets array of rewards and returns a random one from the list
	await chrome.storage.local.get({ [rarity] : [] }, function (result) {
		let rewards = result[rarity];
		let randomIndex = Math.floor(Math.random() * rewards.length);
		console.log(rewards.length);

		// Reward is then displayed in a previously hidden HTML block
		console.log(rewards[randomIndex]);
		rsT.innerHTML = rewards[randomIndex][0];
		rsD.innerHTML = rewards[randomIndex][1];
		rs.style.display = 'block';

	});
}

function loadEditPage(event)
{
	window.location="edit.html";
}

onLoad();