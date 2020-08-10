const Joi = require("joi");
const { http } = require("../helpers");

var city = async (req, res, next) => {
  const scheme = Joi
  .object({
    city: Joi
      .string()
      .alphanum()
      .min(1)
      .max(255)
      .required()
      .error(new Error("Cities are letters and numbers with max 255 characters.")),
  }); 
  
  const result = scheme.validate(req.params);

  if (result.error) { // OK
    return res.status(200).send(http.response(false, result.error.message));
  }
  return next();
};

var weather = async (req, res, next) => {
  const scheme = Joi
  .object({
    temperature: Joi
      .number()
      .min(-70.0)
      .max(60.0)
      .required()
      .error(new Error(`Temperatures must be between -70.0 and 60.0.`)),
    city: Joi
      .string()
      .regex(/^[. a-zA-Z0-9]+$/)
      .min(1)
      .max(255)
      .required()
      .error(new Error("Cities are letters and numbers with max 255 characters (eg. St. Louis).")),
    time: Joi
      .date()
      .required()
      .error(new Error("Please use a proper time 24h format (eg. 15:30)."))
  }); 
  
  const result = scheme.validate(req.body);

  if (result.error) { // OK
    return res.status(200).send(http.response(false, result.error.message));
  }
  return next();
};


module.exports = {
  city,
  weather,
};
 