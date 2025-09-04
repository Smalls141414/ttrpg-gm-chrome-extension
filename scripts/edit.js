/**
TODO:
- Check Duplicate Names when storing rewards & names
**/

const sf = document.getElementById("sourceForm").addEventListener('submit', changeSource);
const ra = document.getElementById("rewardAdd").addEventListener('submit', addReward);
const na = document.getElementById("nameAdd").addEventListener('submit', addName);
document.getElementById("back").addEventListener("click", loadStartPage);

async function changeSource(event)
{
	event.preventDefault();
	let source = document.getElementById("source").value;
	
	// Sets spellSource variable in order to change spell source
	await chrome.storage.local.set({ spellSource : source }).then(() => {
		console.log("Source changed to " + source);
	});
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
	let species = document.getElementById("species").value;
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


function loadStartPage(event)
{
	window.location="popup.html";
}

// Inspect Popup
// chrome.storage.local.getKeys();
// chrome.storage.local.get("keyName");