import fastify from "fastify";

const PORT = +(process.env.PORT ?? 3000);

const app = fastify();

app.get("/ping", (req, reply) => {
  reply.send({
    message: "pong",
    pid: process.pid,
  });
});

if (require.main === module) {
  app.listen({ port: PORT, }, (err, address) => {
    if (err) {
      console.error(err);
      process.exitCode = 1;
    }
    console.log(`Primary #${9616} at ${address}`)
  });
}

export { app };
