import { createClient } from "redis";

const redisClient = createClient({
  url: "redis://localhost:6379", // Update with your Redis config
});

redisClient.on("error", (err) => {
  console.error("Redis Error:", err);
});

(async () => {
  await redisClient.connect();
})();

export default redisClient;
