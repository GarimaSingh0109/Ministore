export default function imageValidations(e) {
    let { files } = e.target
    for (let i = 0; i < files.length; i++) {
        if (files[i].size > 2097152)
            return "Pic Size Must Be Less then 2 MB"
        else if (files[i].type === "image/jpeg" || files[i].type === "image/jpg" || files[i].type === "image/png")
            return ""
        else
            return "Invalid File"
    }
}