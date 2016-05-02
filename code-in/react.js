
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



var CamperRow = React.createClass({
	render: function() {
		return (
			<tr>
				<td>
				{this.props.position}
				</td>
				<td>
					<img src={this.props.user.img} />
				</td>
				<td>
					{this.props.user.username}
				</td>
				<td>
					{this.props.user.recent}
				</td>
				<td>
					{this.props.user.alltime}
				</td>
			</tr>
		);
	}
});


var CamperData = React.createClass({
	getInitialState: function() {
		return (
			{setToDisplay: 'topRecent'}
		);
	},
	sortByRecent: function() {
		console.log("clicked recent");
		console.log(this.state);
		this.setState({setToDisplay: 'topRecent'});
	},
	sortByAllTime: function() {
		console.log("clicked recent");
		this.setState({setToDisplay: 'topAllTime'});
	},
	render: function() {
		var rowData = '';
		console.log("annaaan", this.props);
		rowData = this.props.displayData[this.state.setToDisplay].map(function(user, index) {
			return (
				<CamperRow user={user} position={index + 1} />
			);
		});
		return (
			<table>
				<tr>
					<th>Position</th>
					<th></th>
					<th>Username</th>
					<th onClick={this.sortByRecent}>30-day point</th>
					<th onClick={this.sortByAllTime}>All time points</th>
				</tr>
				{rowData}
			</table>
		);
	}
});


var LeaderBoardTable = React.createClass({
	getInitialState: function() {
		return {
		topRecent: [],
		topAllTime:	[]
		};
	},
	loadUserDataFromApi: function() {
		var topRecentURL = 'https://fcctop100.herokuapp.com/api/fccusers/top/recent';
		var topAllTimeURL = 'https://fcctop100.herokuapp.com/api/fccusers/top/alltime';
		loadJSON(
			topRecentURL,
			function(response) {
				this.setState({topRecent: response});
				console.log("response was", response);
				console.log("state", this.state);
			}.bind(this)
		);
		loadJSON(
			topAllTimeURL,
			function(response) {
				this.setState({topAllTime: response});
				console.log("state", this.state);
			}.bind(this)
		);
	},
	componentDidMount: function() {
		console.log(this.state);
		this.loadUserDataFromApi();
	},
	render: function() {
		console.log("woot", this);
		return (
			<CamperData displayData={{topRecent: this.state.topRecent, topAllTime: this.state.topAllTime}} />
		);
	}
	
});

ReactDOM.render(
	<LeaderBoardTable />,
	document.getElementById('main')
);



