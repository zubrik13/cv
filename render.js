const fs = require('fs')
const jsyaml = require('js-yaml')
const Handlebars = require('handlebars')

const templateFilename = './src/template.hbs'
const dataFilename = './src/data.yaml'
const cssPath = './css'
const outputDirectory = './dist'
const outputFilename = `${outputDirectory}/index.html`
const outputPdfFileName = `${outputDirectory}/resume.pdf`

const contains = (list, element) => list.filter(x => x === element).length > 0

const prepearingBuildDirectory = (outputDirectory) => {
    const isDirExist = fs.existsSync(outputDirectory)
    if (isDirExist) {
        console.log('Removed previos build repository')
        fs.rmSync(outputDirectory, {recursive: true, force: true})
    }

    console.log('Created repository for new build')
    fs.mkdirSync(outputDirectory)
}

const render = (templateFilename, dataFilename, outputFilename, outputDirectory) => {
    prepearingBuildDirectory(outputDirectory)
    const template = Handlebars.compile(fs.readFileSync(templateFilename, 'utf8'))
    const data = jsyaml.load(fs.readFileSync(dataFilename, 'utf8'))
        
    console.log('Rendering template')
    const html = template(data) 
    console.log(html)
    fs.appendFileSync(outputFilename, html)
    console.log(`${html.length} bytes written`)    
    fs.cpSync(cssPath, `${outputDirectory}/css`, {recursive: true})
}

render(templateFilename, dataFilename, outputFilename, outputDirectory)

if (contains(process.argv, '--pdf')) {
    const pdf = require('html-pdf')
    const options = {}
    const html = fs.readFileSync(outputFilename, 'utf8')
    pdf.create(html, options).toFile(outputPdfFileName, function (err, res) {
        if (err) {
            console.log(err)
        }
        console.log(res)
    })
}

if (contains(process.argv, '--watch')) {
    console.log("Watching... Press Ctrl+C to quit.")
    fs.watch('./src', (event, filename) => {
        console.log(`${event}: ${filename}`)
        try {
            render(templateFilename, dataFilename, outputFilename, outputDirectory)    
        } catch (error) {
            console.log(`Rendering failed: ${error}`)
        }        
    })
}
