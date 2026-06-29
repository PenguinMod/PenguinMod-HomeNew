import { PUBLIC_API_URL } from "$env/static/public";

import { PenguinModAPI } from "penguinmod";

const apiUrl = new URL(PUBLIC_API_URL);
apiUrl.pathname = "/api";
const PenguinModClient = new PenguinModAPI({
    apiUrl: apiUrl,
});

export default PenguinModClient;
