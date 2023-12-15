const {i18n} = require("./next-i18next.config");


module.exports = {
  i18n,
  env: {
    AUTH0_NAMESPACE: process.env.AUTH0_NAMESPACE,
    BASE_URL: process.env.BASE_URL
  }
}