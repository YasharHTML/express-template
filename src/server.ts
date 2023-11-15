import cluster from "node:cluster";
import os from "node:os";

const cpus = os.cpus().length;
const PORT = +(process.env.PORT ?? 3000);

if (cluster.isPrimary) {
  cluster.schedulingPolicy = cluster.SCHED_RR;
  for (let i = 0; i < cpus; i++) {
    cluster.fork();
  }
} else {
  import("./app").then(({ app }) => {
    app.listen({ port: PORT }, (err, address) => {
      if (err) {
        console.error(err);
        process.exitCode = 1;
      }
      console.log(`Worker #${process.pid} at ${address}`);
    });
  });
}
