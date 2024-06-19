export const getIconClassFromAssetFilename = (path: string) => {
    const matchResult = path.match(/[-_\w]+[.][\w]+$/i)
    if (matchResult && matchResult.length > 0) {
        const fileName = matchResult[0]
        const fileNameWithoutExtension = fileName.replace(/\.[^/.]+$/, "")
        return 'zxicon-' + fileNameWithoutExtension
    } else {
        throw new Error("Keine Übereinstimmung im Dateinamen gefunden.")
    }
}
export const getFileExtension = (fileName: string) => {
    let fileExtension
    fileExtension = fileName.replace(/^.*\./, '')
    return fileExtension
}
export const isImage = (fileName: string) => {
    const fileExt = getFileExtension(fileName)
    const imageExtensions = ['gif', 'jpg', 'jpeg', 'png']

    if (imageExtensions.indexOf(fileExt) !== -1) {
        return true
    }
    return false
}
export const isVideo = (fileName: string) => {
    const fileExt = getFileExtension(fileName)
    const videoExtensions = ['mpg', 'mp2', 'mpeg', 'mpe', 'mpv', 'mp4']

    if (videoExtensions.indexOf(fileExt) !== -1) {
        return true
    }
    return false
}
export const getDomainFromURL = (url: string) => {
    const domain = (new URL(url)).hostname.replace('www.','')
    return domain
}