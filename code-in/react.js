
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
			<tr className={(this.props.position%2===1)?'odd-row':'even-row'}>
				<td className='cell-position'>
				{this.props.position}
				</td>
				<td className='cell-avatar'>
					<img src={this.props.user.img} />
				</td>
				<td className='cell-username'>
					<a href={'https://www.freecodecamp.com/' + this.props.user.username}>
						{this.props.user.username}
					</a>
				</td>
				<td className='cell-data'>
					{this.props.user.recent}
				</td>
				<td className='cell-data'>
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
		//bottom facing arrow used to clarify which data is sorted
		var arrowDown = " ▼"
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
					<th>Pos.</th>
					<th></th>
					<th>Username</th>
					<th className='sort-button cell-data' onClick={this.sortByRecent}>
						{"30-days"+(this.state.setToDisplay==='topRecent'?arrowDown:'')}
					</th>
					<th className='sort-button cell-data' onClick={this.sortByAllTime}>
						{"All-time"+(this.state.setToDisplay==='topAllTime'?arrowDown:'')}
					</th>
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
			<div>
				<h1>Free Code Camp Leaderboard</h1>
				<CamperData displayData={{topRecent: this.state.topRecent, topAllTime: this.state.topAllTime}} />
			</div>
		);
	}
	
});

ReactDOM.render(
	<LeaderBoardTable />,
	document.getElementById('main')
);



