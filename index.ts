import { httpServer } from "./src/http_server/index";
import { wss } from "./src/ws_server/wss";

const HTTP_PORT = 8181;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

console.log(`Start web socket server on the ${wss.options.port} port!`);
