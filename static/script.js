loadData();

function loadData(){	
	httpRequest = new XMLHttpRequest();	
	httpRequest.open('GET', '/api/data');
	httpRequest.onreadystatechange = function () {
		if (httpRequest.readyState === 4 && httpRequest.status === 200) {
			jsonData1 = JSON.parse(httpRequest.response);
			update_Bars(jsonData1);	
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

	httpRequest5 = new XMLHttpRequest();	
	httpRequest5.open('GET', '/api/data5');
	httpRequest5.onreadystatechange = function () {
		if (httpRequest5.readyState === 4 && httpRequest5.status === 200) {
			jsonData1 = JSON.parse(httpRequest5.response);
		  update_Gbar(jsonData1);			
		}
	};
	httpRequest5.send();
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
		  labels: labels,
		  datasets: [
			{
			  label: "Nombre d'étudiants",
			  backgroundColor: ["#35589A", "#3FA796","#FFBD35"],
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
			backgroundColor: ["#35589A", "#3FA796","#FFBD35"],
			
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
			position:'right',
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


function update_BigNumbers(jsonData){	
	var i=1;
	for(d of jsonData){		
		region = document.getElementById("specialite"+i);	
		
		
		label = region.getElementsByClassName("specialiteLabel")[0];
		pop = region.getElementsByClassName("specialitePop")[0];
		
		label.innerText = d["specialite"];
		pop.innerText = d["NbEtudiant"];
		
		
		i++;
	}
	
	
}

function update_Gbar(jsonData){
	var labels = jsonData.years;
	var dataF = jsonData.dataF;
	var dataH = jsonData.dataH;
	new Chart(document.getElementById("Gbar-chart"), {
		type: 'bar',
		data: {
			labels: labels,
			datasets: [
				{
					label: 'F',
					data: dataF,
					backgroundColor: "#EC255A",
					stack: 'Stack 0',
				},
				{
					label: 'H',
					data: dataH,
					backgroundColor: "#1C6DD0",
					stack: 'Stack 1',
				}]
		},
		options: {						
			tooltips: {
				displayColors: true,
				callbacks:{
					mode: 'x',
				},
			},
			scales: {
				xAxes: [{
					stacked: true,
					gridLines: {
						display: false,
					},
					ticks: {
						fontColor: "white"
			  	}
				}],
				yAxes: [{
					stacked: true,
					ticks: {
						beginAtZero: true,
						fontColor: "white"
					},
					type: 'linear',
				}]
			},
			responsive: true,
			maintainAspectRatio: false,
			legend:{
				labels: {
					fontColor: "white"
				}
				}
		}
	});
}





