const sp = document.getElementById("spellForm").addEventListener('submit', findSpell);
const na = document.getElementById("nameForm").addEventListener('submit', namesGet);
const ra = document.getElementById("rewardForm").addEventListener('submit', rewardsGet);
const rs = document.getElementById("response");
const rsT = document.getElementById("responseTitle");
const rsD = document.getElementById("responseDescription");


document.getElementById("settings").addEventListener("click", loadEditPage);



/*
	TODO: Add url verification before sending
*/
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
		if(result.spellSource == "wikidot")
		{
			url = "http://dnd5e.wikidot.com/spell:" + spellText;
		} else
		{
			url = "http://www.dndbeyond.com/spells/" + spellText;
		}
	});
	
	// Send and focus url
	window.open(url, '_blank').focus();
}

/**
	Names Function - Unfinished
**/
function namesGet(event)
{
	event.preventDefault();
	let species = document.getElementById("species").value;
	console.log(species);
	
}

/**
	Rewards Function - Unfinished and Uncommented
**/
async function rewardsGet(event)
{
	event.preventDefault();
	let rarity = document.getElementById("rarity").value;
	console.log(rarity);
	
	// RARITY IS TEMPORARILY IGNORED

	await chrome.storage.local.get(["rewardNum"]).then((num) => {
		let randReward = "reward" + (Math.floor(Math.random() * (num.rewardNum + 1)));
		console.log(randReward);
		chrome.storage.local.get([randReward]).then((rew) => {
			console.log(rew[randReward]);
			rsT.innerHTML = rew[randReward][0];
			rsD.innerHTML = rew[randReward][1];
			rs.style.display = 'block';
		});
	});
}

function loadEditPage(event)
{
	window.location="edit.html";
}