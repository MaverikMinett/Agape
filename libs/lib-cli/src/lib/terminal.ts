export function getTerminalSize() {
    return {
        rows: process.stdout.rows,
        columns: process.stdout.columns
    }
}