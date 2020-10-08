module.exports = {
    apps : [
        {
          name: "myapp",
          script: "./app/server.js",
          watch: true,
          env: {
            "ENVIRONMENT":"development",
            "NODE_ENV":"development",
            "PORT":3000,
            "SECRET_KEY":"YOUR_SECRET_KEY",
            "DEV_POSTGRES_URI":"postgresql://username:password@host:port/YOUR_DB_NAME",
            "TEST_POSTGRES_URI":"postgresql://username:password@host:port/YOUR_DB_NAME"
          }
          // node_args: "-r dotenv/config", *Use env file instead of hardcoding env variables*
        }
    ]
  }