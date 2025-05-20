module.exports = database => {

    // create a todos database
    database.prepare(
        `
        CREATE TABLE IF NOT EXISTS todos (
        user_id TEXT NOT NULL,
        todo_id TEXT NOT NULL,
        content TEXT NOT NULL,
        PRIMARY KEY (user_id, todo_id)
        )
        `
    ).run()
    
}