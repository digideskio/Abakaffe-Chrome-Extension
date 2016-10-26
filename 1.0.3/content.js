$(function() {

	var status;
	var hours;
	var minutes;
	
	function createNotification(){
		
		chrome.runtime.sendMessage({event: "createNotification"}, function(response) {
   			console.log("Response: ", response);
		});
		
	}
	
	function fetchStatus(){
		 $.getJSON("https://kaffe.abakus.no/api/status", function (data) {
			 	status = data["coffee"]["status"];
				hours = data["coffee"]["time_since"]["hours"];
				minutes = data["coffee"]["time_since"]["minutes"];
				chrome.storage.sync.get("request", function (response) {
					if(response.request == true){ 
						if(hours == 0 && minutes >= 4  && minutes <= 10){
							createNotification();
							chrome.storage.sync.set({"request": false});
						}
					}
				});

		  });
	} 
	
	setInterval(fetchStatus, 3000);
	fetchStatus();
	  
});

