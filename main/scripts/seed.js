const database = require('../database')

async function main () {
  await database.schema
  .createTable('todos', function(table) {
    table.increments('id');
    table.string('description');
  })
  console.log("created table...")
}

main()