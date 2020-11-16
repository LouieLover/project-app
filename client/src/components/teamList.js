import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Map from "./Map";

const Team = (props) => (
  <tr>
    <td>{props.team.user}</td>
    <td>{props.team.team}</td>
    <td>{props.team.location}</td>
    <td>
      <Link to={"/edit/" + props.team._id}>Edit</Link>
    </td>
  </tr>
);

export default class TeamList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      team: "",
      location: "",
      completed: false,
      teams: [],
    };
  }

  componentDidMount() {
    axios
      .get("/teams/")
      .then((response) => {
        this.setState({ team: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  teamList() {
    return this.state.teams.map(function (currentTeam, i) {
      return <Team team={currentTeam} key={i} />;
    });
  }

  render() {
    return (
      <div>
        <table
          className="table table-striped "
          // style={{ marginTop: 20 }}
        >
          <thead>
            <tr>
              <th>Team</th>
              <th>Location</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{this.teamList()}</tbody>
        </table>
        <Map
          locations={this.state.teams.map((team) => {
            return team.coords;
          })}
        />
      </div>
    );
  }
}
