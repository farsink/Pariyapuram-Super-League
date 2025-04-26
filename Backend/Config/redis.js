const redis = require('redis')
const dotenv = require('dotenv')
dotenv.config()


const client = redis.createClient({ url: `redis://default:${process.env.REDIS_PASS}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}` })
client.on("connect", () => console.log("Redis client connected to Redis..."));
client.on("error", (err) => console.log("Redis Client Error", err));

(async () => {
    await client.connect()
}
)()
    .catch((err) => {
        console.log('Redis client connection error', err)
        process.exit(1) // Exit process with failure
    })

module.exports = client