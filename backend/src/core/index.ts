import { IFactoryCore } from "src/interfaces/core.interface";
import { createWebserver } from "./services/webserver";
import { createDatabaseConnection } from "./services/database";

function createApplication(
    webserver: IFactoryCore = createWebserver(),
    databaseConnection: IFactoryCore = createDatabaseConnection()
) {
    async function start() {
        await databaseConnection.start();
        webserver.start();
    }

    function stop() {
        webserver.stop();
        databaseConnection.stop();
    }

    return { start, stop };
}

export default createApplication;
