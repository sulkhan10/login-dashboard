module.exports = (error, req, res, next) => {
    let status = 500;
    let message = "Internal Server Error";
  
    switch (error.name) {
      case "SequelizeValidationError":
        status = 400;
        message = error.errors[0].message;
        break;
      case "EmailOrPasswordRequired":
        status = 400;
        message = "Email and password are required";
        break;
      case "InvalidCredentials":
        status = 401;
        message = "Error Invalid Email or Password";
        break;
      case "NotFound":
        status = 404;
        message = "Error Data is Not Found";
        break;
      case "Forbidden":
        status = 403;
        message = "Forbidden Access";
        break;
      case "Unauthenticated":
      case "JsonWebTokenError":
        status = 401;
        message = "Invalid Token";
        break;

      case "CustomerEmailNotRegistered":
        status = 401;
        message = "Email is Not Registered";
        break;
      case "CustomerPasswordInvalid":
        status = 401;
        message = "Password is Invalid";
        break;
  
      default:
        break;
    }
  console.log(error);
    res.status(status).json({ message });
  }