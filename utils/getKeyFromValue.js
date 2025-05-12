module.exports = (obj, thekey) => {
    let i = -1
     for (let x in obj) {
        i++
        if (obj[x] == thekey) return Object.keys(obj)[i]
     }
     return null
} 