import React, { Component } from "react";
import "./style.css";
import axios from "axios";

class Home extends Component {
  state = {
    task: "",
    list: []
  };

  handleInputChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  handleUpdate = i => {
    /* event.preventDefault(); */
    /* const { target, value } = event; */
    const { _id, clicked } = this.state.list[i];
    axios
      .post("http://localhost:3000/update", { _id, clicked: !clicked })
      .then(response => {
        console.log("tache modifiée");
        /* console.log("response.data ", response.data); */
        const list = [...this.state.list];
        list[i].clicked = response.data.clicked;
        this.setState({ list });
        /* if (response.status === 200) {
            this.getAllTasks();
        } */
      });
  };

  handleDelete = i => {
    const { _id, deleted } = this.state.list[i];
    console.log("this.state.list[i]_id :", _id);
    axios.post("http://localhost:3000/delete", _id).then(response => {
      if (response.data === "OK") {
        const list = [...this.state.list];
        list.splice(i, 1);
        this.setState({ list });
      }
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    axios
      .post("http://localhost:3000/create", { title: this.state.task })
      .then(response => {
        if (response.status === 200) {
          const list = [...this.state.list];
          list.push(response.data);
          this.setState({ list });
        }
      });
  };

  render() {
    const toDoList = this.state.list.map((task, i) => {
      return (
        <li key={i}>
          <div className="cross-and-task">
            <div className="cross" onClick={() => this.handleDelete(i)}>
              <i className="fas fa-times" />
            </div>
            <div
              className={task.clicked ? "task-name clicked" : "task-name"}
              onClick={() => this.handleUpdate(i)}
            >
              {task.title}
            </div>
          </div>
        </li>
      );
    });

    return (
      <div>
        <ul>{toDoList}</ul>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="task"
            value={this.state.task}
            onChange={this.handleInputChange}
            placeholder={"Titre"}
          />
          <button type="submit">Ajouter une tache</button>
        </form>
      </div>
    );
  }

  getAllTasks = () => {
    axios.get("http://localhost:3000/").then(response => {
      this.setState({ list: response.data });
    });
  };

  componentDidMount() {
    this.getAllTasks();
  }
}

export default Home;
