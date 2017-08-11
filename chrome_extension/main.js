chrome.runtime.onMessage.addListener(function(request, sender) {
	var message = document.querySelector('#message');
	var loading = document.querySelector('#loading');
	var success = document.querySelector('#success');
	var error   = document.querySelector('#error');

	if (request.action == "getSource") {
		if (request.source) {
			
			// hide the loading image
			loading.style.display = 'none';

			// show success image
			success.style.display = 'block';
			success.style.margin = '0 0 10px';

			// render the success message
			message.innerText = "\nDO IT!";

			// copy the Slack message to the clipboard
			var aux = document.createElement("input");
			aux.setAttribute("value", request.source);
			document.body.appendChild(aux);
			aux.select();
			document.execCommand("copy");
			document.body.removeChild(aux);
		} else {

			// hide the loading image
			loading.style.display = 'none';

			// show success image
			error.style.display = 'block'
			
			message.innerText = "You obviously have no idea what you're doing. \nGo back to school.";
		}
	}
});

function onWindowLoad() {
	chrome.tabs.executeScript(null, {
		file: "extractData.js"
	}, function() {
		var message = document.querySelector('#message');

		// If you try and inject into an extensions page or the webstore/NTP you'll get an error
		if (chrome.runtime.lastError) {
			message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
		}
	});
}

window.onload = onWindowLoad;
