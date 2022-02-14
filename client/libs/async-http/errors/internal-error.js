class InternalError extends Error {
    constructor() {
        super('Internal error');
    }
}

module.exports = InternalError;
