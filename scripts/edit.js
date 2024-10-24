/**
TODO:
- Check Duplicates when storing reward
- Reward rarity
**/

const sf = document.getElementById("sourceForm").addEventListener('submit', changeSource);
const ra = document.getElementById("rewardAdd").addEventListener('submit', addReward);
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
	
	//Set rewardNum if rewardNum does not exist
	await chrome.storage.local.get(["rewardNum"]).then((num) => {
		
		// Records what number reward is being added
		var rewardID;
		
		if(typeof num.rewardNum === 'undefined')
		{
			chrome.storage.local.set({ rewardNum : "0" }).then(() => {
				console.log("rewardNum set to 0");
			});
			
			rewardID = "reward0"; 
			
		} else
		{
			// This line parses the line as an integer and increasing it for the rewardNum
			rewardID = parseInt(num.rewardNum) + 1;
			
			chrome.storage.local.set({ rewardNum : rewardID }).then(() => {
				console.log("rewardNum increased");
			});
			
			// This line adds the term "reward" to the start so that it may be queried with other rewards in storage
			rewardID = "reward" + rewardID;
		}
		
		// Adds reward with reward number as ID - this allows for easy randomization later
		chrome.storage.local.set({ [rewardID] : [rewardName, rewardDesc] });
		
	});
	
}

function loadStartPage(event)
{
	window.location="popup.html";
}