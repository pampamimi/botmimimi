module.exports = (filepath, data) => {
    try {
        require("fs").writeFileSync(filepath, JSON.stringify(data, null, 2), 'utf-8');
    } catch (err) {
        console.error("Error writing data:", err);
    }
}