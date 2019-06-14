const database = require("../database");

const todoAction = async (event, args) => {
  console.log("todoAction =", args);

  let resp = null;
  switch (args.type) {
    default:
      resp = null;
      break;
    case "INSERT":
      const { description } = args.payload;
      resp = await database("todos").insert({ description });
      break;
    case "LIST":
      resp = await database.select().table("todos");
      break;
    case "REMOVE": {
      console.log("Argggg", args)
      const { id} = args.payload
      resp = await database("todos").where("id", id).del()
      break;
    }
  }
  const response = {
    type: args.type,
    payload: args.payload,
    data: resp
  }
  return await event.reply("todo-response", response);
};

module.exports = todoAction;
