import cluster from "node:cluster";
import os from "node:os";

const cpus = os.cpus().length;
const PORT = process.env.PORT ?? 3000;

if (cluster.isPrimary) {
  cluster.schedulingPolicy = cluster.SCHED_NONE;
  for (let i = 0; i < cpus; i++) {
    cluster.fork();
  }
} else {
  import("./app").then(({ app }) => {
    app.listen(PORT, () => {
      console.log(`Worker #${process.pid} on PORT:${PORT}`);
    });
  });
}
