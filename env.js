module.exports = {
  sessionSecret: "TLDR-HISTORY",
  twitter: {
    consumerKey: process.env.consumerKey,
    consumerSecret: process.env.consumerSecret,
    callbackURL: "http://127.0.0.1:3000/auth/twitter/callback"
  }
}
