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

function woot() {
	console.log("test");
	return;
}

var camperCell = React.createClass({
	displayName: "camperCell",


	render: function render() {
		return React.createElement(
			"div",
			null,
			React.createElement(
				"a",
				{ href: "#" },
				React.createElement("img", { src: "#" }),
				React.createElement(
					"div",
					null,
					"NAME HERE"
				)
			)
		);
	}

});

var CamperRow = React.createClass({
	displayName: "CamperRow",

	getInitialState: function getInitialState() {
		return {
			position: '',
			avatar: '',
			username: '',
			pointsIn30Days: '',
			pointsAllTime: ''
		};
	},
	render: function render() {
		return React.createElement(
			"tr",
			null,
			React.createElement(
				"td",
				null,
				"numer"
			),
			React.createElement(
				"td",
				null,
				React.createElement("img", { src: "#" }),
				"USERNAME"
			),
			React.createElement(
				"td",
				null,
				"points a"
			),
			React.createElement(
				"td",
				null,
				"points b"
			)
		);
	}

});

var LeaderBoardTable = React.createClass({
	displayName: "LeaderBoardTable",

	getInitialState: function getInitialState() {
		return {
			displayData: [],
			dataFrom30Days: [],
			dataFromAllTime: []
		};
	},
	componentDidMount: function componentDidMount() {
		var topRecent = 'https://fcctop100.herokuapp.com/api/fccusers/top/recent';
		var topAllTime = 'https://fcctop100.herokuapp.com/api/fccusers/top/alltime';
		loadJSON(topRecent, function (response) {
			this.setState({ displayData: response });
			console.log(this);
		}.bind(this));
		loadJSON(topAllTime, function (response) {});
	},
	render: function render() {

		var rowData = this.props.displayData.map(function (user, index) {
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
				React.createElement(
					"th",
					null,
					"Username"
				),
				React.createElement(
					"th",
					null,
					"30-day point"
				),
				React.createElement(
					"th",
					null,
					"All time points"
				)
			),
			rowData
		);
	}

});

ReactDOM.render(React.createElement(LeaderBoardTable, { displayData: [1, 2] }), document.getElementById('main'));