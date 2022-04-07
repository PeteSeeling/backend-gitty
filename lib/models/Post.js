const pool = require('../utils/pool');

module.exports = class Post{
  id;
  title;
  username;
  description;


  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.username = row.username;
    this.description = row.description; 
  }

  static async insert({ title, description }){
    const { rows } = await pool.query(
      `
            INSERT INTO 
            posts(title, description)
            VALUES
            ($1, $2)
            RETURNING
            *`,
      [title, description]
    );
    return new Post(rows[0]);
  }
};
