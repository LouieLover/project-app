import React, { Component, useContext } from "react";
import axios from "axios";
import Map from "../components/Map/index";

export default class CreateTodo extends Component {
  constructor(props) {
    super(props);

    this.user = this.user.bind(this);
    this.team = this.team.bind(this);
    this.location = this.location.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      user: "",
      team: "",
      location: "",
      complete: false,
    };
  }

  user(e) {
    this.setState({
      user: e.target.value,
    });
  }

  team(e) {
    this.setState({
      team: e.target.value,
    });
  }

  location(e) {
    this.setState({
      location: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    console.log(`Form submitted:`);
    console.log(`user: ${this.state.user}`);
    console.log(`team: ${this.state.team}`);
    console.log(`location: ${this.state.location}`);

    const newTodo = {
      user: this.state.user,
      team: this.state.team,
      location: this.state.location,
      complete: this.state.complete,
    };

    axios.post("/teams/add", newTodo).then((res) => console.log(res.data));

    this.setState({
      user: "",
      team: "",
      location: "",
      complete: false,
    });
  }

  render() {
    return (
      <div style={{ marginTop: 10 }}>
        <h3>Enter Info</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>user: </label>
            <input
              type="text"
              className="form-control"
              name="teamName"
              value={this.state.user}
              onChange={this.user}
            />
          </div>
          <div className="form-group">
            <label>team: </label>
            <input
              type="text"
              className="form-control"
              name="location"
              value={this.state.team}
              onChange={this.team}
            />
          </div>
          <div className="form-group">
            <label>location: </label>
            <input
              type="text"
              className="form-control"
              name="description"
              value={this.state.location}
              onChange={this.location}
            />
          </div>

          <div className="form-group">
            <input type="submit" value="Submit" className="btn btn-primary" />
          </div>
        </form>
        <Map
          onLoad={(map) => {
            const bounds = new window.google.maps.LatLngBounds();
            map.fitBounds(bounds);
          }}
        ></Map>
      </div>
    );
  }
}
