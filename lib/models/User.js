const pool = require('../utils/pool');

module.exports = class GithubUser {
  username;
  avatar;

  constructor(row) {
    this.username = row.github_username;
    this.avatar = row.github_avatar;
  }

  static async insert({ github_username, github_avatar }) {
    const { rows } = await pool.query(
      `
          INSERT INTO 
          github_users(github_username, github_avatar)
          VALUES ($1, $2)
          RETURNING 
          *
          `,
      [github_username, github_avatar]
    );
    return new GithubUser(rows[0]);
  }

  static async findByUsername(username) {
    const { rows } = await pool.query(
      `
          SELECT
          * 
          FROM 
          github_users
          WHERE
          github_username=$1
          `,
      [username]
    );
    
    if (!rows[0]) return null;
    return new GithubUser(rows[0]);
  }
};
