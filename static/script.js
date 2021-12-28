loadData();

function loadData(){	
	// Requ�te AJAX get Persons
	httpRequest = new XMLHttpRequest();	
	httpRequest.open('GET', '/api/data');
	httpRequest.onreadystatechange = function () {
		if (httpRequest.readyState === 4 && httpRequest.status === 200) {
			jsonData1 = JSON.parse(httpRequest.response);
			update_Bars(jsonData1);
		    //update_BigNumbers(jsonData1);			
		}
	};
	httpRequest.send();
	
	httpRequest2 = new XMLHttpRequest();	
	httpRequest2.open('GET', '/api/data2');
	httpRequest2.onreadystatechange = function () {
		if (httpRequest2.readyState === 4 && httpRequest2.status === 200) {
			jsonData2 = JSON.parse(httpRequest2.response);
			update_Lines(jsonData2);
		}
	};
	httpRequest2.send();
	
	httpRequest3 = new XMLHttpRequest();	
	httpRequest3.open('GET', '/api/data3');
	httpRequest3.onreadystatechange = function () {
		if (httpRequest3.readyState === 4 && httpRequest3.status === 200) {
			jsonData1 = JSON.parse(httpRequest3.response);
			update_Doughnut(jsonData1);
		}
	};
	httpRequest3.send();

	httpRequest4 = new XMLHttpRequest();	
	httpRequest4.open('GET', '/api/data4');
	httpRequest4.onreadystatechange = function () {
		if (httpRequest4.readyState === 4 && httpRequest4.status === 200) {
			jsonData1 = JSON.parse(httpRequest4.response);
		  update_BigNumbers(jsonData1);			
		}
	};
	httpRequest4.send();
}


function update_Bars(jsonData){	

	var labels = jsonData.map(function(e) {
	   return e.annee;
	});
	
	var data = jsonData.map(function(e) {
	   return e.NbEtudiant;
	});
	
	
	new Chart(document.getElementById("bar-chart"), {
		type: 'bar',
		data: {
		  //labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
		  labels: labels,
		  datasets: [
			{
			  label: "Nombre d'étudiants",
			  backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f"],
			  //data: [2478,5267,734,784,433]
			  data: data
			}
		  ]
		},
		options: {
		  responsive: false,
		  maintainAspectRatio: true,	
		  legend: { display: false },
		  title: {
			display: false,
			text: 'Nombre etudiants par annee'
		  },
			scales: {
				yAxes: [{
						ticks: {
								fontColor: "white"
						}
				}],
				xAxes: [{
						ticks: {
								fontColor: "white"
						}
				}]
		}
		}
	});

}

function update_Lines(jsonData){
	var labels = jsonData.years;
	
	for(d of jsonData.datasets){
		d.fill = false;				  
		d.borderColor = '#'+Math.floor(Math.random()*16777215).toString(16);
		d.borderWidth=2;
		d.radius=1;			
	}			
	
	var data = jsonData.datasets;

	new Chart(document.getElementById("line-chart"), {
		type: 'line',
		data: {
			labels: labels,
			datasets: data,
			fontColor:"#FFFFFF"
		},
		options: {						
			responsive: false,
			scaleFontColor: "#FFFFFF",
			maintainAspectRatio: true,
			title: {
				display: false,
				text: 'Nombre d\'etudiant dans une spécialité par année'
			},
			legend:{
				position:'top',
				labels: {
					fontColor: "white"
		  	}
			},
			scales: {
				yAxes: [{
						ticks: {
								fontColor: "white"
						}
				}],
				xAxes: [{
						ticks: {
								fontColor: "white"
						}
				}]
		}
		}
	});
}

function update_Doughnut(jsonData){
	var labels = jsonData.map(function(e) {
	   return e.annee;
	});
	
	var data = jsonData.map(function(e) {
	   return e.moyenneEtd;
	});
	
	new Chart(document.getElementById("Doughnut-chart"), {
		type: 'doughnut',
		data: {
		  labels: labels,
		  datasets: [{
			label: "Moyenne",
			backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#d3b37e","#c45850","#04293A","#30475E"],
			
			data: data
		  }]
		},
		options: {
		  responsive: false,
		  maintainAspectRatio: true,
		  title: {
			display: false,
			text: 'Moyenne des étudiants Par anneé'
		  },
		  legend:{
			position:'right'
		  },
			scales: {
				yAxes: [{
						ticks: {
								fontColor: "white"
						}
				}],
				xAxes: [{
						ticks: {
								fontColor: "white"
						}
				}]
		}
		}
	});	
}


function update_BigNumbers(jsonData){	
	var i=1;
	for(d of jsonData){		
		region = document.getElementById("specialite"+i);	
		
		
		label = region.getElementsByClassName("specialiteLabel")[0];
		pop = region.getElementsByClassName("specialitePop")[0];
		
		label.innerText = d["specialite"];
		pop.innerText = d["NbEtudiant"];
		
		//pop.setAttribute("data-target", d["population"]);
		
		i++;
	}
	
	// Speed
	/*const counters = document.querySelectorAll('.bigNumber .regionPop');
	const speed = 100; // The lower the slower
	
	
	counters.forEach(counter => {
		const updateCount = () => {
			const target = +counter.getAttribute('data-target');
			const count = +counter.innerText;

			// Lower inc to slow and higher to slow
			const inc = target / speed;

			 //console.log("--------");
			 //console.log(inc);
			 //console.log(count);
			 //console.log("--------");

			// Check if target is reached
			if (count < target) {
				// Add inc to count and output in counter
				counter.innerText = Math.round(count + inc, 2);
				// Call function every ms
				setTimeout(updateCount, 1);
			} else {
				counter.innerText = target;
			}
		};

		updateCount();
	});*/
	
}





