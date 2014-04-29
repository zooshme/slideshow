/** @jsx React.DOM */

var Slide = React.createClass({
	render: function() { 
		var status = this.props.index == this.props.count ? 'active' : 'inactive'
		
		return (
			<div className={status + " slide"}>
				<img className="poster" src={"./images/" + this.props.data.poster} />
				<h3 className="caption">{this.props.data.caption}</h3>
				<div className="description">{this.props.data.description}</div>
			</div>
		)
	}
});

var PageItem = React.createClass({
	render: function() {
		var status = this.props.index == this.props.count ? 'active' : 'inactive'

		return (
			<li className={status + " pagination-item"} onClick={this.props.onClick}>{this.props.index}</li>
		)
	}
});

var PlayButton = React.createClass({
	render: function() {

	}
});

var Slideshow = React.createClass({
	getInitialState: function() {
		return {
			data: [],
			count: 0,
			playing: true
		}
	},
	handleClick: function(index) {
		this.setState({count: index});
		this.pauseRotation();
	},
	getData: function() {
		var that = this;
		var request = $.getJSON('./data.json');
		request.then(function(data) {
			that.setState({data: data});
		});
	},
	componentDidMount: function() {
		this.getData();
		this.interval = setInterval(this.rotate, 3000);
	},
	componentWillUnmount: function() {
		clearInterval(this.interval);
	},
	setCount: function(count) {
		this.setState({count: count});
	},
	startRotation: function() {

	},
	pauseRotation: function() {
		clearInterval(this.interval)
	},
	rotate: function() {
		var max = this.state.data.length;
		var count = this.state.count + 1;

		count < max ? this.setState({count: count}) : this.setState({count: 0});
	},
	render: function() {
		that = this;
		slides = that.state.data.map(function(slide, i) {
			return (<Slide key={slide.id} data={slide} index={i} count={that.state.count} />)
		});
		pageItems = that.state.data.map(function(slide, i) {
			var boundClick = that.handleClick.bind(that, i)
			return (<PageItem key={slide.id} index={i} count={that.state.count} ref="slideshow" onClick={boundClick} />)
		})
		return (
			<div className="slideshow">
				<div className="slides">
					{slides}
				</div>
				<ol className="pagination">
					{pageItems}
				</ol>
			</div>
		)
	}
});

React.renderComponent(
	<Slideshow />,
	document.getElementById('slideshow')
);