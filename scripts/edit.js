const sf = document.getElementById("sourceForm").addEventListener('submit', changeSource);
const ra = document.getElementById("rewardAdd").addEventListener('submit', addReward);
const na = document.getElementById("nameAdd").addEventListener('submit', addName);
const nr = document.getElementById("nameRemove").addEventListener('submit', removeName);
const rr = document.getElementById("rewardRemove").addEventListener('submit', removeReward);
const sdr = document.getElementById("speciesDropdownRemove");
const rdr = document.getElementById("rarityDropdownRemove");
const sd = document.getElementById("speciesDropdown");
const nd = document.getElementById("nameDropdown");
const rd = document.getElementById("rewardDropdown");
document.getElementById("back").addEventListener("click", loadStartPage);
sdr.addEventListener('selectionchange', loadNames);
//const rdr = document.getElementById("rarityDropdownRemove").addEventListener('selectionchange', loadRewards);

function onLoad()
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
		for (let i = 0; i < species.length; i++)
		{
			var option = document.createElement("option");
			option.value = species[i];
			option.text = species[i];
			sdr.appendChild(option);
		}
	});

	loadNames();
}

async function changeSource(event)
{
	event.preventDefault();
	let source = document.getElementById("source").value;
	
	// Sets spellSource variable in order to change spell source
	await chrome.storage.local.set({ spellSource : source }).then(() => {
		console.log("Source changed to " + source);
	});

	onLoad();
}

async function addReward(event)
{
	event.preventDefault();
	let rewardName = document.getElementById("rewardName").value;
	let rewardDesc = document.getElementById("rewardDesc").value;
	let rarity = document.getElementById("rewardRarity").value;

	// Get array based on reward rarity - set to empty array if does not exist
	chrome.storage.local.get({ [rarity] : [] }, function (result) {
		// Add new reward object with name and description to array	
    	let rewards = result[rarity];
		let newReward = [rewardName, rewardDesc];

    	rewards.push(newReward);
		console.log(rewards);

		chrome.storage.local.set({ [rarity] : rewards }, function(){
			console.log(rewardName + " successfully added to " + rarity);
		});
	});
}

async function addName(event)
{
	event.preventDefault();
	let species = document.getElementById("speciesDropdown").value;
	let name = document.getElementById("name").value;

	// Get array based on reward rarity - set to empty array if does not exist
	chrome.storage.local.get({ [species] : [] }, function (result) {
		// Add new reward object with name and description to array	
    	let names = result[species];

    	names.push(name);
		console.log(names);

		chrome.storage.local.set({ [species] : names }, function(){
			console.log(name + " successfully added to " + species);
		});
	});
}

async function removeReward(event)
{

}

async function removeName(event)
{

}

async function loadNames(event)
{
	nr.options.length = 0;

	let species = document.getElementById("speciesDropdown").value;
	await chrome.storage.local.get({ [species] : [] }, function (result) {
		let names = result[species];
		
		for (let i = 0; i < names.length; i++)
		{
			var option = document.createElement("option");
			option.value = names[i];
			option.text = names[i];
			nr.appendChild(option);
		}
	});
}

async function loadRewards(event)
{

}


function loadStartPage(event)
{
	window.location="popup.html";
}

onLoad();