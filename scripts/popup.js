const sp = document.getElementById("spellForm").addEventListener('submit', findSpell);
const na = document.getElementById("nameForm").addEventListener('submit', namesGet);
const ra = document.getElementById("rewardForm").addEventListener('submit', rewardsGet);
const rs = document.getElementById("response");
const rsT = document.getElementById("responseTitle");
const rsD = document.getElementById("responseDescription");


document.getElementById("settings").addEventListener("click", loadEditPage);

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
	let species = document.getElementById("species").value;
	console.log(species);
	
	// Gets array of rewards and returns a random one from the list
	await chrome.storage.local.get({ [species] : [] }, function (result) {
		let names = result[species];
		let randomIndex = Math.floor(Math.random() * names.length);

		// Reward is then displayed in a previously hidden HTML block
		console.log(names[randomIndex]);
		rsT.innerHTML = names[randomIndex][0];
		rsD.innerHTML = names[randomIndex][1];
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