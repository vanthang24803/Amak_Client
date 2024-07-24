const textValidation = /^[A-Z][a-zA-Z]*$/;

const capitalizeValidation =
  /^[\p{Lu}\p{Ll}\p{Lt}\p{Lm}\p{Lo}][\p{L}\p{Mn}\p{Mc}\p{Nd}\p{Nl}\p{Pc}\p{Cf}\p{Zl}\p{Zp}\p{Ps}\p{Pe}\p{Pi}\p{Pf}\p{Sm}\p{Sc}\p{Sk}\p{So}\p{Pd}\p{Po}\p{C}]*$/u;

const specialCharValidation = /[\p{S}\p{P}]/u;
const uppercaseCharValidation = /[A-Z]/;

export {
  textValidation,
  capitalizeValidation,
  specialCharValidation,
  uppercaseCharValidation,
};
