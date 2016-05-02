"use strict";

function loadJSON(path, success, error) {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (xhr.readyState !== 4) {
			return;
		}
		console.log(xhr);
		if (xhr.status === 200) {
			if (!success) {
				console.log("API request okay");
				return;
			}
			success(JSON.parse(xhr.responseText));
		} else {
			if (!error) {
				console.log("API request failed");
				return;
			}
			error(xhr);
		}
	};
	xhr.open("GET", path, true);
	xhr.send();

	return;
}

var CamperRow = React.createClass({
	displayName: "CamperRow",

	render: function render() {
		return React.createElement(
			"tr",
			{ className: this.props.position % 2 === 1 ? 'odd-row' : 'even-row' },
			React.createElement(
				"td",
				{ className: "cell-position" },
				this.props.position
			),
			React.createElement(
				"td",
				{ className: "cell-avatar" },
				React.createElement("img", { src: this.props.user.img })
			),
			React.createElement(
				"td",
				{ className: "cell-username" },
				React.createElement(
					"a",
					{ href: 'https://www.freecodecamp.com/' + this.props.user.username },
					this.props.user.username
				)
			),
			React.createElement(
				"td",
				{ className: "cell-data" },
				this.props.user.recent
			),
			React.createElement(
				"td",
				{ className: "cell-data" },
				this.props.user.alltime
			)
		);
	}
});

var CamperData = React.createClass({
	displayName: "CamperData",

	getInitialState: function getInitialState() {
		return { setToDisplay: 'topRecent' };
	},
	sortByRecent: function sortByRecent() {
		console.log("clicked recent");
		console.log(this.state);
		this.setState({ setToDisplay: 'topRecent' });
	},
	sortByAllTime: function sortByAllTime() {
		console.log("clicked recent");
		this.setState({ setToDisplay: 'topAllTime' });
	},
	render: function render() {
		//bottom facing arrow used to clarify which data is sorted
		var arrowDown = " ▼";
		var rowData = '';
		console.log("annaaan", this.props);
		rowData = this.props.displayData[this.state.setToDisplay].map(function (user, index) {
			return React.createElement(CamperRow, { user: user, position: index + 1 });
		});
		return React.createElement(
			"table",
			null,
			React.createElement(
				"tr",
				null,
				React.createElement(
					"th",
					null,
					"Pos."
				),
				React.createElement("th", null),
				React.createElement(
					"th",
					null,
					"Username"
				),
				React.createElement(
					"th",
					{ className: "sort-button cell-data", onClick: this.sortByRecent },
					"30-days" + (this.state.setToDisplay === 'topRecent' ? arrowDown : '')
				),
				React.createElement(
					"th",
					{ className: "sort-button cell-data", onClick: this.sortByAllTime },
					"All-time" + (this.state.setToDisplay === 'topAllTime' ? arrowDown : '')
				)
			),
			rowData
		);
	}
});

var LeaderBoardTable = React.createClass({
	displayName: "LeaderBoardTable",

	getInitialState: function getInitialState() {
		return {
			topRecent: [],
			topAllTime: []
		};
	},
	loadUserDataFromApi: function loadUserDataFromApi() {
		var topRecentURL = 'https://fcctop100.herokuapp.com/api/fccusers/top/recent';
		var topAllTimeURL = 'https://fcctop100.herokuapp.com/api/fccusers/top/alltime';
		loadJSON(topRecentURL, function (response) {
			this.setState({ topRecent: response });
			console.log("response was", response);
			console.log("state", this.state);
		}.bind(this));
		loadJSON(topAllTimeURL, function (response) {
			this.setState({ topAllTime: response });
			console.log("state", this.state);
		}.bind(this));
	},
	componentDidMount: function componentDidMount() {
		console.log(this.state);
		this.loadUserDataFromApi();
	},
	render: function render() {
		console.log("woot", this);
		return React.createElement(
			"div",
			null,
			React.createElement(
				"h1",
				null,
				"Free Code Camp Leaderboard"
			),
			React.createElement(CamperData, { displayData: { topRecent: this.state.topRecent, topAllTime: this.state.topAllTime } })
		);
	}

});

ReactDOM.render(React.createElement(LeaderBoardTable, null), document.getElementById('main'));