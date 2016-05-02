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
			null,
			React.createElement(
				"td",
				null,
				this.props.position
			),
			React.createElement(
				"td",
				null,
				React.createElement("img", { src: this.props.user.img })
			),
			React.createElement(
				"td",
				null,
				this.props.user.username
			),
			React.createElement(
				"td",
				null,
				this.props.user.recent
			),
			React.createElement(
				"td",
				null,
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
					"Position"
				),
				React.createElement("th", null),
				React.createElement(
					"th",
					null,
					"Username"
				),
				React.createElement(
					"th",
					{ onClick: this.sortByRecent },
					"30-day point"
				),
				React.createElement(
					"th",
					{ onClick: this.sortByAllTime },
					"All time points"
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
		return React.createElement(CamperData, { displayData: { topRecent: this.state.topRecent, topAllTime: this.state.topAllTime } });
	}

});

ReactDOM.render(React.createElement(LeaderBoardTable, null), document.getElementById('main'));