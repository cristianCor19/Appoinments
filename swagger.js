import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

// Metada info about oui api
const options = {
    
    definition: {
        // openapi: '3.0.0',
        info: {
            title: 'Appointment System API',
            version: '1.0.0'
        },
        basePaht: '/'
    },
    apis: [
        './routes/*.js'
    ],
};

// Docs en JSON format 

const swaggerSpec = swaggerJSDoc(options)

// Function to setup our docs
const swaggerDocs = (app, port) =>{
    app.use('/api-docs',  swaggerUi.serve, swaggerUi.setup(swaggerSpec))
    

    // console.log(`version 1 docs are available at http://localhost:${port}/api-docs`);

}


// module.exports = {swaggerDocs}

export default swaggerDocs

