module.exports = (difficulty) => {
    const operations = ['+', '-', '*', '/'];
    const operands = Array.from({ length: difficulty + 1 }, () => Math.floor(Math.random() * Math.pow(10, difficulty)));
    const equation = operands.map((num, i) => (i ? operations[Math.floor(Math.random() * operations.length)] + num : num)).join(' ');
    return equation;
};
