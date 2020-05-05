class CError extends Error {
  constructor(err, status) {
    super(err);

    this.status = status;
  }
}

module.exports = CError;
