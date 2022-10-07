export const generatePath = (value) => {
    if (!value) return
    return value
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .split(" ")
        .join("-")
        .replace('đ', 'd')
}