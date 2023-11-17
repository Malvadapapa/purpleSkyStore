const fetchProducts = async () => {
    const url = '../productos.json'
    try {
        let req = await fetch(url)
        let resp = await req.json()

        return resp

    } 
    catch (error) {
        console.error(error)
    }
}

export {fetchProducts}