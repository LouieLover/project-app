import React, { Component } from "react";

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

    this.setState({
      todo_Team: "",
      todo_Location: "",
      todo_Description: "",
      todo_completed: false,
    });
    // post("http://localhost:4000/todos/")
    //   .then((response) => {
    //     this.setState({ todos: response.data });
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
    // Post("src/components/todos-list.component.js");
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
      </div>
    );
  }
}
