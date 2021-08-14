function title(document, pageTitle) {
    const mainTitle = 'U'
    document.title = `${ mainTitle } | ${ pageTitle }`
}

function formatDate(date) {
    const dateArray = date.split('-').map(d => d.trim())
    return `${ dateArray[2] }/${ dateArray[1] }/${ dateArray[0] }`
}

export { title, formatDate }