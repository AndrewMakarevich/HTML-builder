const fs = require('fs');
const path = require('path');

fs.readdir(path.resolve(__dirname, '.', 'secret-folder'), (err, files) => {
    if (err) throw err;
    files.forEach(file => {
        fs.stat(path.resolve(__dirname, '.', 'secret-folder', file), (error, info) => {
            if (error) throw error;
            const fileName = path.basename(file).slice(0, -path.extname(file).length);
            const fileExt = path.extname(file).split('.')[1];
            info.isFile() ? console.log(`${fileName} - ${fileExt} - ${+info.size / 1000} KB`) : null;
        });
    }, { withFileTypes: true });
});