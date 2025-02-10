// import { createClient } from "redis";
import NodeCache from "node-cache";

export const cache = new NodeCache({ stdTTL: 600 }); // Cache expires in 10 minutes

// const redisClient = createClient({
//   url: "redis://localhost:6379", // Update with your Redis config
// });

// redisClient.on("error", (err) => {
//   console.error("Redis Error:", err);
// });

// (async () => {
//   await redisClient.connect();
// })();

// export default redisClient;
