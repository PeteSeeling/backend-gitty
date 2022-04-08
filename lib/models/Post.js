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

  static async insert({ title, description }, username){
    const { rows } = await pool.query(
      `
            INSERT INTO 
            posts(title, description, username)
            VALUES
            ($1, $2, $3)
            RETURNING
            *`,
      [title, description, username]
    );
    
    return new Post(rows[0]);
  }

  static async getAllPosts(){
    const { rows } = await pool.query(
      `
          SELECT
          *
          FROM
          posts
          `,
    );
    return rows.map((row) => new Post(row));
  }
};
