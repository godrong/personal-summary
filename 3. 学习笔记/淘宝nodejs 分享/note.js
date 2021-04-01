new HtmlWebpackPlugin({
    template: './src/template/new-expired.html',
    filename: path.resolve(__dirname, 'build/new-expired.html'),
    inject: false
})
// 关键代码
inquirer.prompt([
    {
        type: 'input',
        name: 'pageName',
        message: '新建页面英文名称：',
        validate(value) {
            const pass = value && value.length <= 20;
            if (pass) {
                return true;
            }
            return '不能为空，且不能超过20个字符';
        },
    }
])
.then(function (answers) {
    createDir(answers);
});
function createHtml(value) {
    const htmlCode = templateHtml.replace(/\{template\}/g, value.pageName).replace(/{title}/g, value.pageTitle);
    const createHtml = path.resolve(__dirname, `../createTemplate/${value.pageName}.html`);
    fs.writeFileSync(createHtml, htmlCode);
 }
function createHtml () {
    
}



