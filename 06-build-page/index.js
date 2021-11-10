const fs = require('fs');
const path = require('path');
const rimraf = require("rimraf");

const TEMPLATE_PATH = path.resolve(__dirname, 'template.html');
const COMPONENTS_PATH = path.resolve(__dirname, 'components');
const STYLES_PATH = path.resolve(__dirname, 'styles');
const ASSETS_PATH = path.resolve(__dirname, 'assets');


const DIST_PATH = path.resolve(__dirname, 'project-dist');
const DIST_ASSETS_PATH = path.resolve(__dirname, 'project-dist', 'assets');


function copyFile(source, target) {
    fs.readFile(source, (error, info) => {
        if (error) throw error;
        fs.writeFile(target, info, (error) => {
            if (error) throw error;
        });
    });
}
function copyFoldier(source, target) {
    fs.mkdir(target, error => {
        if (error) throw error;
        checkFoldier(source, target);
    });
}
function checkFoldier(source, target) {
    fs.readdir(source, (error, dirItem) => {
        if (error) throw error;
        dirItem.forEach(item => {
            fs.stat(`${source}/${item}`, (error, info) => {
                if (error) throw error;
                if (info.isDirectory()) {
                    copyFoldier(`${source}/${item}`, `${target}/${item}`);
                } else if (info.isFile()) {
                    copyFile(`${source}/${item}`, `${target}/${item}`);
                }
            });
        });

    });
}
function createMainFolder() {
    fs.access(path.resolve(__dirname, 'project-dist'), (error) => {
        if (error) {
            fs.mkdir(path.resolve(__dirname, 'project-dist'), (error) => {
                if (error) throw error;
                fs.mkdir(path.resolve(__dirname, 'project-dist', 'assets'), (error) => {
                    if (error) throw error;
                    checkFoldier(ASSETS_PATH, DIST_ASSETS_PATH);
                });

            });
            createUniteHtmlCssFile();
        } else {
            rimraf(path.resolve(__dirname, 'project-dist'), error => {
                if (error) throw error;
                createMainFolder();
            });
        }
    });
}
createMainFolder();

function createUniteHtmlCssFile() {
    fs.readFile(TEMPLATE_PATH, 'utf8', (error, html) => {
        if (error) throw error;
        const regEx = /\{{2}[a-z]+\}{2}/g;
        const tagArray = html.match(regEx);
        const tagNameArray = tagArray.map(tag => tag.replace(/\{/g, '').replace(/\}/g, ''));

        tagNameArray.forEach((name, i) => {
            console.log(name);
            fs.readFile(`${COMPONENTS_PATH}/${name}.html`, 'utf8', (error, layout) => {
                if (error) throw error;
                html = html.replace(tagArray[i], layout);
                if (i === tagNameArray.length - 1) {
                    fs.writeFile(`${DIST_PATH}/index.html`, html, error => {
                        if (error) throw error;
                    });
                };
            });
            fs.readFile(`${STYLES_PATH}/${name}.css`, 'utf8', (error, layout) => {
                if (error) next;
                fs.appendFile(`${DIST_PATH}/style.css`, `${layout}\n`, error => {
                    if (error) throw error;
                });
            });
        });
        return;
    });


}


