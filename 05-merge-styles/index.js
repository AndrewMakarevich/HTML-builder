const fs = require('fs');
const path = require('path');

const pathToStyles = path.resolve(__dirname, 'styles');
const distPath = path.resolve(__dirname, 'project-dist');

function uniteStyles(path, styles) {
    fs.access(path, (error) => {
        if (error) {
            fs.appendFile(path, `${styles}\n`, (error) => {
                if (error) throw error;
                console.log('file bundle.css updated succesfully');
            });
        } else {
            fs.writeFile(path, '', (error) => {
                if (error) throw error;
                fs.appendFile(path, `${styles}\n`, (error) => {
                    if (error) throw error;
                    console.log('file bundle.css updated succesfully');
                });
            });
        }
    });
}

fs.readdir(pathToStyles, (error, files) => {
    if (error) throw error;
    files.forEach(file => {
        path.extname(file) === '.css' ?
            fs.readFile(`${pathToStyles}/${file}`, (error, info) => {
                if (error) throw error;
                uniteStyles(`${distPath}/bundle.css`, info);
            })
            :
            null;
    });
});