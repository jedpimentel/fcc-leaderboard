
function loadJSON(path, success, error) {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState !== 4) { return; }
		console.log(xhr);
		if (xhr.status === 200) {
			if (!success) {
				console.log("API request okay");
				return;
			}
			success(JSON.parse(xhr.responseText));
		}
		else {
			if (!error) {
				console.log("API request failed");
				return;
			}
			error(xhr);
		}
	}
	xhr.open("GET", path, true);
	xhr.send();
	
	return;
}



 


function woot() {
	console.log("test"); 
	return;
}




var camperCell = React.createClass({
	
	render: function() {
		return (
			<div>
				<a href='#'>
					<img src='#' />
					<div>NAME HERE</div>
				</a>
			</div>
		);
	}
	
});

var CamperRow = React.createClass({
	getInitialState: function() {
		return {
			position: '',
			avatar: '',
			username: '',
			pointsIn30Days: '',
			pointsAllTime: '',
		};
	},
	render: function() {
		return (
			<tr>
				<td>
					numer
				</td>
				<td>
					<img src='#' />
					USERNAME
				</td>
				<td>
					points a
				</td>
				<td>
					points b
				</td>
			</tr>
		);
	}
	
});


var LeaderBoardTable = React.createClass({
	getInitialState: function() {
		return {
			displayData: [],
			dataFrom30Days: [],
			dataFromAllTime: [],
		};
	},
	componentDidMount: function() {
		var topRecent = 'https://fcctop100.herokuapp.com/api/fccusers/top/recent';
		var topAllTime = 'https://fcctop100.herokuapp.com/api/fccusers/top/alltime';
		loadJSON(
			topRecent,
			function(response) {
				this.setState({displayData: response});
				console.log(this);
			}.bind(this)
		);
		loadJSON(
			topAllTime,
			function(response) {
				
			}
		);
	},
	render: function() {
		
		var rowData = this.props.displayData.map(function(user, index) {
			return (
				<CamperRow user={user} position={index + 1} />
			)
		});
		return (
			<table>
				<tr>
					<th>Position</th>
					<th>Username</th>
					<th>30-day point</th>
					<th>All time points</th>
				</tr>
				{rowData}
			</table>
		);
	}
	
});

ReactDOM.render(
	<LeaderBoardTable displayData={[1, 2]} />,
	document.getElementById('main')
);



