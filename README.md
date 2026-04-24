# errory

Send formatted exception emails for Node.js applications.

`errory` helps you report runtime errors by email with clean, readable HTML templates including:

- Environment
- Date
- Error message
- Stacktrace
- Custom contextual data

Perfect for APIs, scripts, cron jobs, admin panels, and internal systems.

---

## Installation

```bash
npm install errory meily
```

## Quick start

```js
import { emailException } from "errory";

try {
    throw new Error("Database connection failed");
} catch (error) {
    emailException(error, {
        route: "/users",
        method: "GET",
        ip: "127.0.0.1"
    });
}
```

## Environment variables

```bash
MAIL_HOST=
MAIL_PORT=
MAIL_PASSWORD=
MAIL_SECURE=
MAIL_EXCEPTION_TO=
MAIL_EXCEPTION_FROM=
MAIL_EXCEPTION_TO=
```