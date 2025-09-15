const sp = document.getElementById("spellForm").addEventListener('submit', findSpell);
const na = document.getElementById("nameForm").addEventListener('submit', namesGet);
const ra = document.getElementById("rewardForm").addEventListener('submit', rewardsGet);
const sd = document.getElementById("speciesDropdown");
const rs = document.getElementById("response");
const rsT = document.getElementById("responseTitle");
const rsD = document.getElementById("responseDescription");

document.getElementById("settings").addEventListener("click", loadEditPage);

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

	const common = [["Potion of Healing", "You regain hit points when you drink this potion. The number of hit points is equal to 2d4 + 2. The potion’s red liquid glimmers when agitated."]];
	const uncommon = [["Immovable Rod", "This flat iron rod has a button on one end. You can use an action to press the button, which causes the rod to become magically fixed in place. Until you or another creature uses an action to push the button again, the rod doesn’t move, even if it is defying gravity. The rod can hold up to 8,000 pounds of weight. More weight causes the rod to deactivate and fall. A creature can use an action to make a DC 30 Strength check, moving the fixed rod up to 10 feet on a success."]];
	const rare = [["Ring of Feather Falling", "When you fall while wearing this ring, you descend 60 feet per round and take no damage from falling."]];
	const veryrare = [["Bag of Devouring","This bag superficially resembles a bag of holding but is a feeding orifice for a gigantic extradimensional creature. Turning the bag inside out closes the orifice. The extradimensional creature attached to the bag can sense whatever is placed inside the bag. Animal or vegetable matter placed wholly in the bag is devoured and lost forever. When part of a living creature is placed in the bag, as happens when someone reaches inside it, there is a 50 percent chance that the creature is pulled inside the bag. A creature inside the bag can use its action to try to escape with a successful DC 15 Strength check. Another creature can use its action to reach into the bag to pull a creature out, doing so with a successful DC 20 Strength check (provided it isn’t pulled inside the bag first). Any creature that starts its turn inside the bag is devoured, its body destroyed. Inanimate objects can be stored in the bag, which can hold a cubic foot of such material. However, once each day, the bag swallows any objects inside it and spits them out into another plane of existence. The GM determines the time and plane. If the bag is pierced or torn, it is destroyed, and anything contained within it is transported to a random location on the Astral Plane."]];
	const legendary = [["Belt of Cloud Giant Strength","While wearing this belt, your Strength score changes to a score granted by the belt. If your Strength is already equal to or greater than the belt’s score, the item has no effect on you. The Cloud Giant's Belt sets your strength score to 27."]];

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
	// Get species list and add each species as an element of the dropdown
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
	Names Get Function
**/
async function namesGet(event)
{
	event.preventDefault();
	let species = document.getElementById("speciesDropdown").value;
	console.log(species);
	
	// Gets array of names and returns a random one from the list
	await chrome.storage.local.get({ [species] : [] }, function (result) {
		let names = result[species];
		let randomIndex = Math.floor(Math.random() * names.length);

		// Name is then displayed in a previously hidden HTML block
		console.log(names[randomIndex]);
		rsT.innerHTML = names[randomIndex];
		rsD.innerHTML = "";
		rs.style.display = 'block';

	});
}

/**
	Rewards Get Function
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