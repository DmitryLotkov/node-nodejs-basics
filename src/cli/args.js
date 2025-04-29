const parseArgs = () => {
    const result = [];
    const onlyArgsAndValues = process.argv.slice(2);

    for (let i = 0; i < onlyArgsAndValues.length; i += 2) {
        const key = onlyArgsAndValues[i].replace(/^--/, '');
        const value = onlyArgsAndValues[i + 1];
        result.push(`${key} is ${value}`);
    }

    console.log(result.join(', '));
}
parseArgs();