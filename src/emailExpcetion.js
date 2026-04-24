import { Mail } from "meily";

export const emailException = (error, data) => {

    const date = new Date().toLocaleString('en-CA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    }).replace(',', '')

    let content = ''

    if (process.env.APP_ENVIRONMENT) {
        content += `
            <div style="margin-bottom: 20px">
                <b>ENVIRONMENT:</b><br>
                <div style="background: #f6f6f6; padding: 10px; border: 1px solid #ccc; font-family: monospace">
                    ${process.env.APP_ENVIRONMENT}
                </div>
            </div>
        `
    }

    if (process.env.ENVIRONMENT) {
        content += `
            <div style="margin-bottom: 20px">
                <b>ENVIRONMENT:</b><br>
                <div style="background: #f6f6f6; padding: 10px; border: 1px solid #ccc; font-family: monospace">
                    ${process.env.ENVIRONMENT}
                </div>
            </div>
        `
    }

    content += `
        <div style="margin-bottom: 20px">
            <b>DATE:</b><br>
            <div style="background: #f6f6f6; padding: 10px; border: 1px solid #ccc; font-family: monospace">
                ${date}
            </div>
        </div>
        <div style="margin-bottom: 20px">
            <b>ERROR:</b><br>
            <div style="background: #f6f6f6; padding: 10px; border: 1px solid #ccc; font-family: monospace">
                ${error.message}
            </div>
        </div>
        <div style="margin-bottom: 20px">
            <b>STACKTRACE:</b><br>
            <div style="background: #f6f6f6; padding: 10px; border: 1px solid #ccc; font-family: monospace">
                ${error.stack}
            </div>
        </div>
    `

    for (let [key, value] of Object.entries(data)) {
        key = key.toUpperCase();

        value = typeof value === "string"
            ? value
            : JSON.stringify(value, null, 2);

        value = String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

        content += `
            <div style="margin-bottom: 20px">
                <b>${key}:</b><br>
                <pre style="background: #f6f6f6; padding: 10px; border: 1px solid #ccc; font-family: monospace">${value}</pre>
            </div>
        `
    }

    Mail.from(process.env.MAIL_EXCEPTION_FROM || process.env.MAIL_FROM)
        .to(process.env.MAIL_EXCEPTION_TO || process.env.MAIL_TO)
        .content(content)
        .subject('Error en la plataforma')
        .send()
}
