const sp = document.getElementById("spellForm").addEventListener('submit', findSpell);
const na = document.getElementById("nameForm").addEventListener('submit', namesGet);

/*
	TODO: Add url verification before sending
*/
function findSpell(event)
{
	// Prevent standard form events and get spelltext
	event.preventDefault();
	let spellText = document.getElementById("spellText").value;
	
	// Update text for url use: all lowercase, dashes in place of spaces, remove nonletters
	spellText = spellText.toLowerCase();
	spellText = spellText.replace(/[^a-z\s]/g, "");
	spellText = spellText.replace(" ", "-");
	
	// Send and focus url
	let url = "http://dnd5e.wikidot.com/spell:" + spellText;
	
	console.log(spellText);
	window.open(url, '_blank').focus();
}

/**
	TODO: Add custom species, add edit page, add get/set
**/
function namesGet(event)
{
	event.preventDefault();
	let species = document.getElementById("species").value;
	console.log(species);
	
	
	/**
	Chrome storage get/set functions
	
	chrome.storage.local.set({ key: value }).then(() => {
		console.log("Value is set");
	});

	chrome.storage.local.get(["key"]).then((result) => {
		console.log("Value is " + result.key);
	});
	
	**/
	
}