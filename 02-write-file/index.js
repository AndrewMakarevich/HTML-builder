const fs = require('fs');
const path = require('path');
const readline = require('readline');


process.on('exit', () => {
    console.log('Good bye!');
});
function editFile() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.question('Введите текст для записи в файл\n', (answer) => {
        if (answer === 'exit') {
            return rl.close();
        } else {
            fs.appendFile(path.resolve(__dirname, '.', 'text.txt'), answer, (error) => {
                if (error) throw error;
                return 'Запись звершена успешно';
            });
            rl.close();
            return editFile();
        }
    });
}
editFile();





