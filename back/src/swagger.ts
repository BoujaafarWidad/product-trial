import swaggerJsdoc from 'swagger-jsdoc';

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Product Trial API',
      version: '1.0.0',
      description: 'API documentation for the product trial backend',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        Product: {
          type: 'object',
          required: [
            'code',
            'name',
            'description',
            'image',
            'category',
            'price',
            'quantity',
            'internalReference',
            'shellId',
            'inventoryStatus',
            'rating',
          ],
          properties: {
            id: { type: 'number' },
            code: { type: 'string' },
            name: { type: 'string' },
            description: { type: 'string' },
            image: { type: 'string' },
            category: { type: 'string' },
            price: { type: 'number' },
            quantity: { type: 'number' },
            internalReference: { type: 'string' },
            shellId: { type: 'number' },
            inventoryStatus: {
              type: 'string',
              enum: ['INSTOCK', 'LOWSTOCK', 'OUTOFSTOCK'],
            },
            rating: { type: 'number' },
            createdAt: { type: 'number' },
            updatedAt: { type: 'number' },
          },
        },
        // You can add more schemas like User, Token, Cart, etc. here.
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./src/routes/*.ts'],
});
