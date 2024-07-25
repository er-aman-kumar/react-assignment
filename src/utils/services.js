

export const GetPhotosAsync = async (page, pageSize) => {
    return await fetch(`https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=${pageSize}`)
}


