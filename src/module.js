import { createExtension } from "@cognigy/extension-tools";
import { cxoneConnection } from "./connections/cxoneConnection";
import { requestAccessToken } from "./nodes/requestAccessToken";

export default createExtension({
	nodes: [requestAccessToken],
	connections: [cxoneConnection]
});
