module.exports = class CustomClient extends require("discord.js").Client {
  /**
   * @type {import("better-sqlite3").Database}
   */
  database
}