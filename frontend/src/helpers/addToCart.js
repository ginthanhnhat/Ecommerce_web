const addToCart = (e, id) => {
    e?.stopPropagation()
    e?.preventDefault()
    console.log("id", id)
}

export default addToCart