const sp = document.getElementById("spellForm").addEventListener('submit', findSpell);

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