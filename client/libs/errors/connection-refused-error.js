class ConnectionRefusedError extends Error {
  constructor() {
    super("Connection refused");
  }
}

module.exports = ConnectionRefusedError;
