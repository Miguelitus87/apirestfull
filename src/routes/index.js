const {Router} = require('express')
const fs= require('fs')
const { stringify } = require('querystring')
const dataValidation = require('../middlewares/index.js')
const router = Router()

const productsArray = []
//funciona para leer el archivo
let readProductsFile = async() => {
    try{
        const productsFile = await fs.promises.readFile('products.txt','utf-8')
        productsArray = JSON.parse(productsFile)
    } catch (error) {
        console.log(error)
    }
}

const getAll = (req,res) => {    
    res.send(products)

}

const findProduct = (req,res) => {
    const { id } = req.params
    console.log(products)
    
    const findProduct = products.find(num => {
        return num.id = id
    })
    console.log(findProduct)
    res.send(findProduct)
}

const deleteById = (req,res) => {
    const {id} = req.params;
    

    const filterArray = products.filter(num => {
        return num.id = id
    })
    console.log(filterArray)
    res.send(filterArray)

}

const addProduct = (req,res) => {  
    const { body } = req
    try {
        await readProductsFile()    
        let id = 
            productsArray.length !== 0 
                ? productsArray[productsArray.length - 1].id + 1
                : 1
        productsArray.push({ ...body, id})
        await fs.promises.writeFile('products.txt',JSON.stringify(productsArray))
        res.status(200).json({mensaje:'Producto agregado con exito',productos:productsArray})
    } catch (error) {
        res.status(400).json(error)
    }
}

router.get('/',(req,res)=>{
    res.sendFile(process.cwd()+'/src/files/index.html')
})

router.get('/api/productos', getAll)

router.get('/api/productos/:id', findProduct)

router.post('/api/productos', dataValidation, addProduct )

router.delete('/api/productos/:id', deleteById)


module.exports = router