const fs = require('fs');
const path = require('path');


function copyFoldier(source, target) {
    fs.mkdir(target, (error) => {
        if (error) throw error;
        fs.readdir(source, (error, files) => {
            if (error) throw error;
            files.forEach(file => {
                fs.stat(`${source}/${file}`, (err, info) => {
                    if (err) throw err;
                    if (info.isDirectory()) {
                        copyFoldier(`${source}/${file}`, `${target}/${file}`);
                    } else {
                        copyFile(`${source}/${file}`, `${target}/${file}`);
                    }
                });
            });
        });
    });
}
function copyFile(source, target) {
    fs.readFile(source, (error, data) => {
        if (error) throw error;
        fs.writeFile(target, data, error => {
            if (error) throw error;
            return console.log('file copied succesfully');
        });
    });
}

async function copy(filename) {
    fs.access(path.resolve(__dirname, '.', `${filename}-copy`), err => {  // Проверка на сущестование папки
        if (err) {
            fs.mkdir(path.resolve(__dirname, '.', `${filename}-copy`), err => { //При ее отсутствии, создание
                if (err) throw err;
                return console.log(`foldier ${filename}-copy created succesfully`);
            });
            return fs.readdir(path.resolve(__dirname, '.', filename), (error, files) => { //Перебор значений
                if (error) throw error;
                files.forEach(file => {
                    fs.stat(path.resolve(__dirname, '.', filename, file), (err, info) => {
                        if (err) throw err;
                        if (info.isDirectory()) {
                            copyFoldier(path.resolve(__dirname, '.', filename, file), path.resolve(__dirname, '.', `${filename}-copy`, file));
                        } else {
                            copyFile(path.resolve(__dirname, '.', filename, file), path.resolve(__dirname, '.', `${filename}-copy`, file));
                        }
                    });

                });
            });
        };
        return fs.rmdir(path.resolve(__dirname, '.', `${filename}-copy`), { recursive: true }, err => { //При существовании папки, ее удаление и запуск функции заново, не оптимизированноЮ согласен
            if (err) throw err;
            copy(filename);
        });
    }
    );
}
copy('files');

