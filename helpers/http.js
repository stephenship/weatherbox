const response = (success, response) => {
  // assumes payload is JSON, success is BOOLEAN
  if (success) {
    return {
      status: true,
      result: response,
      error: null
    }
  } else {
    return {
      status: false,
      result: null,
      error: response
    }
  }
};

module.exports = {
  response
};