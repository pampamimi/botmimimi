module.exports = (cmdargument) => {
    let retval = new Array()
    cmdargument.forEach((args) => retval.push(`\`<${args.label}>\``))
    return retval.join(" ")
}