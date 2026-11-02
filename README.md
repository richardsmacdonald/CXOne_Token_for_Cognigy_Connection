# NICE CXOne Token Extension for Cognigy.AI

Adds one Extension Node that requests an OAuth access token from NICE CXOne.

## What the node sends

- Method: POST
- URL: the `tokenUrl` field of the node
- Header `Content-Type: application/x-www-form-urlencoded` (fixed in the code)
- Header `Authorization`: the `authorization` field of the connection
- Body, x-www-form-urlencoded: `grant_type`, `username`, `password` — all from the connection

## Connection "NICE CXOne Token"

| Field           | Description                                                      |
| --------------- | ---------------------------------------------------------------- |
| `authorization` | The complete Authorization header value (scheme prefix included)  |
| `grant_type`    | OAuth grant type, typically `password`                           |
| `username`      | The CXOne user name                                              |
| `password`      | The password of that user                                        |

## Node "NICE CXOne: Request Access Token"

| Field                | Default            | Description                                        |
| -------------------- | ------------------ | -------------------------------------------------- |
| `connection`         | –                  | The connection to use                              |
| `tokenUrl`           | –                  | The full token endpoint URL of your CXOne tenant    |
| `responseContextKey` | `cxoneAuth`        | Context key holding `{ success, status, data }`    |
| `tokenContextKey`    | `cxoneAccessToken` | Context key holding the `access_token` string      |

A successful run stores:

    context.cxoneAuth = { success: true, status: 200, data: { access_token: "...", ... } }
    context.cxoneAccessToken = "..."

A failed run never throws; it stores the reason:

    context.cxoneAuth = { success: false, status: 401, data: { ... } }
    context.cxoneAuth = { success: false, error: "Request timed out after 15000 ms" }

## Build

    npm install
    npm run build

Then pack the compiled package as a gzipped tarball named `cxone-token-extension.tar.gz`, with these items at the root of the archive:

    build/
    package.json
    package-lock.json
    README.md
    icon.png        (optional, 64x64 pixels)

Pack only the ones that exist — this skips any missing file instead of failing:

    tar -czf cxone-token-extension.tar.gz $(ls -d build package.json package-lock.json README.md icon.png 2>/dev/null)

Upload the `.tar.gz` to Cognigy.AI as it is — Cognigy unpacks it itself.

## Notes

- Extension Nodes time out after 20 seconds; the HTTP request aborts after 15 seconds.
- The node makes one external call, well inside the 10-call limit per execution.
- Credentials live only in the connection; the token endpoint lives on the node.
