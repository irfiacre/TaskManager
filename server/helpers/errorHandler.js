const errorHandle = (res, error) => {
  if (Object.keys(error).length === 0) {
    res.status(404).json({
      status: res.statusCode,
      error: 'Not Found!'
    });
  } else if (error.routine === '_bt_check_unique') {
    res.status(409).json({
      status: res.statusCode,
      error: 'Already exists!'
    });
  } else {
    res.status(500).json({
      status: res.statusCode,
      error: error.message
    });
  }
};

export default errorHandle;
