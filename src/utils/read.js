module.exports = (filepath) => {
    try {
        return JSON.parse(require("fs").readFileSync(filepath, 'utf-8'));
    } catch (err) {
        console.error("Error reading data:", err);
    }
}