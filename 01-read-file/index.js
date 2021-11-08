const fs = require('fs');
const path = require('path');
const stream = new fs.ReadStream(path.resolve(__dirname, '.', 'text.txt'), { encoding: 'utf8' });
stream.on('readable', () => {
    const data = stream.read();
    if (data !== null) return console.log(data);
    return;
});
stream.on('end', () => {
    console.log('THE END');
});
// Другой способ
// fs.readFile(path.resolve(__dirname, '.', 'text.txt'), 'utf8', (error, data) => error ? console.log(error) : console.log(data));