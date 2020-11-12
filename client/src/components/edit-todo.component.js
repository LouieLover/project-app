import React, { Component } from "react";
import axios from "axios";
import Map from "../components/Map/";

export default class EditTodo extends Component {
  constructor(props) {
    super(props);

    this.onChangeTodoTeam = this.onChangeTodoTeam.bind(this);
    this.onChangeTodoLocation = this.onChangeTodoLocation.bind(this);
    this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
    this.onChangeTodoCompleted = this.onChangeTodoCompleted.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSubmitDelete = this.onSubmitDelete.bind(this);

    this.state = {
      todo_Team: "",
      todo_Location: "",
      todo_Description: "",
      todo_completed: false,
    };
  }

  componentDidMount() {
    axios
      .get("/todos/" + this.props.match.params.id)
      .then((response) => {
        this.setState({
          todo_Team: response.data.todo_Team,
          todo_Location: response.data.todo_Location,
          todo_Description: response.data.todo_Description,
          todo_completed: response.data.todo_completed,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
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

  onChangeTodoCompleted(e) {
    this.setState({
      todo_completed: !this.state.todo_completed,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const obj = {
      todo_Team: this.state.todo_Team,
      todo_Location: this.state.todo_Location,
      todo_Description: this.state.todo_Description,
      todo_completed: this.state.todo_completed,
    };
    console.log(obj);
    axios
      .put("/todos/" + this.props.match.params.id, obj)
      .then((res) => console.log(res.data));
    this.props.history.push("/todos/");
  }

  onSubmitDelete(e) {
    e.preventDefault();

    axios.delete("/todos/" + this.props.match.params.id).then((res) => {
      console.log(res.data);
      this.props.history.push("/todos/");
    });

    this.props.history.push("/todos/");
  }
  render() {
    return (
      <div>
        <h3 align="center">Update</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Team: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.todo_Team}
              onChange={this.onChangeTodoTeam}
            />
          </div>
          <div className="form-group">
            <label>Location: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.todo_Location}
              onChange={this.onChangeTodoLocation}
            />
          </div>
          <div className="form-group">
            <label>Description: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.todo_Description}
              onChange={this.onChangeTodoDescription}
            />
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              id="completedCheckbox"
              type="checkbox"
              name="completedCheckbox"
              onChange={this.onChangeTodoCompleted}
              checked={this.state.todo_completed}
              value={this.state.todo_completed}
            />
            <label className="form-check-label" htmlFor="completedCheckbox">
              Completed
            </label>
          </div>

          <br />

          <div className="form-group">
            <input type="submit" value="Update" className="btn btn-primary" />
          </div>
          <div className="form-group">
            <input
              onClick={this.onSubmitDelete}
              type="submit"
              value="Delete"
              className="btn btn-primary"
            />
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
