import React from "react";

const TodoRow = ({ data, clickRemove }) => {
  return (
    <tr>
      <td>{data.id}</td>
      <td>{data.description}</td>
      <td><button onClick={() => clickRemove(data.id)}>Remove</button></td>
    </tr>
  );
};
class Todos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      todos: []
    };
  }
  componentDidMount() {
    const action = {
      type: "LIST"
    };
    window.ipcRenderer.send("todo-action", action);
    window.ipcRenderer.on("todo-response", this.handleResponse);
  }
  handleResponse = (event, args) => {
    console.log("args =", args);
    let newState = null;
    const { todos } = this.state;
    switch (args.type) {
      default:
        return;
      case "INSERT": {
        const [id] = args.data
        const newTodo = {
          id, description: args.payload.description
        }
        newState = {
          ...this.state,
          todos: [...todos, newTodo]
        };
        break;
      }
      case "LIST":
        newState = {
          ...this.state,
          todos: args.data
        };
        break;
      case "REMOVE": {
        newState ={
          ...this.state,
          todos: todos.filter(todo => todo.id !== args.payload.id)
        }
        break
      }
    }
    console.log("newState =", newState)
    this.setState({ ...newState });
  };
  onChangeDesc = e => {
    this.setState({
      text: e.target.value
    });
  };
  addTodo = () => {
    window.ipcRenderer.send("todo-action", {
      type: "INSERT",
      payload: {
        description: this.state.text
      }
    });
  };
  clickRemove = (id) => {
    window.ipcRenderer.send("todo-action", {
      type: "REMOVE",
      payload: {
        id
      }
    });
  }
  render() {
    const { text, todos } = this.state;
    console.log("todis=", todos)
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Description</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {todos.map(todo => (
              <TodoRow data={todo} key={todo.id} clickRemove={this.clickRemove}/>
            ))}
          </tbody>
        </table>
        <hr />
        <div>
          <p>Add Todo</p>
          <input type="text" onChange={this.onChangeDesc} value={text} />
          <button onClick={() => this.addTodo()}>Add</button>
        </div>
        <hr />
      </div>
    );
  }
}

export default Todos;
