const flattenObject = (obj) => {
    const result = {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key) && obj[key].length > 0) {
            result[key] = obj[key][0];
        }
    }
    return result;
};

const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

module.exports = { flattenObject, getRandomInt };