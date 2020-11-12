import React, { Component } from "react";
import axios from "axios";
import Map from "../components/Map/index";

export default class CreateTodo extends Component {
  constructor(props) {
    super(props);

    this.onChangeTodoTeam = this.onChangeTodoTeam.bind(this);
    this.onChangeTodoLocation = this.onChangeTodoLocation.bind(this);
    this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      todo_Team: "",
      todo_Location: "",
      todo_Description: "",
      todo_completed: false,
    };
  }

  onChangeTodoTeam(e) {
    this.setState({
      todo_Team: e.target.value,
    });
  }

  onChangeTodoLocation(e) {
    this.setState({
      todo_Location: e.target.value,
    });
  }

  onChangeTodoDescription(e) {
    this.setState({
      todo_Description: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    console.log(`Form submitted:`);
    console.log(`Todo Team: ${this.state.todo_Team}`);
    console.log(`Todo Location: ${this.state.todo_Location}`);
    console.log(`Todo Description: ${this.state.todo_Description}`);

    const newTodo = {
      todo_Team: this.state.todo_Team,
      todo_Location: this.state.todo_Location,
      todo_Description: this.state.todo_Description,
      todo_completed: this.state.todo_completed,
    };

    axios.post("/todos/add", newTodo).then((res) => console.log(res.data));

    this.setState({
      todo_Team: "",
      todo_Location: "",
      todo_Description: "",
      todo_completed: false,
    });
  }

  render() {
    return (
      <div style={{ marginTop: 10 }}>
        <h3>Enter Info</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Team: </label>
            <input
              type="text"
              className="form-control"
              name="teamName"
              value={this.state.todo_Team}
              onChange={this.onChangeTodoTeam}
            />
          </div>
          <div className="form-group">
            <label>Location: </label>
            <input
              type="text"
              className="form-control"
              name="location"
              value={this.state.todo_Location}
              onChange={this.onChangeTodoLocation}
            />
          </div>
          <div className="form-group">
            <label>Description: </label>
            <input
              type="text"
              className="form-control"
              name="description"
              value={this.state.todo_Description}
              onChange={this.onChangeTodoDescription}
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
