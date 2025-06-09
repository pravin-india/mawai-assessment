const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Booking System API',
      version: '1.0.0',
      description: 'API for multi-provider appointment booking system',
    },
    servers: [
      { url: 'http://localhost:5000', description: 'Development server' },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            email: { type: 'string' },
            role: { type: 'string', enum: ['client', 'provider', 'admin'] },
          },
        },
        Slot: {
          type: 'object',
          properties: {
            start: { type: 'string', format: 'date-time' },
            end: { type: 'string', format: 'date-time' },
            isBooked: { type: 'boolean' },
          },
        },
        Booking: {
          type: 'object',
          properties: {
            clientId: { type: 'string' },
            providerId: { type: 'string' },
            slot: { $ref: '#/components/schemas/Slot' },
            status: { type: 'string', enum: ['confirmed', 'cancelled'] },
          },
        },
      },
    },
  },
  apis: ['./routes/*.js', './controllers/*.js'], // files containing annotations
};

const specs = swaggerJsdoc(options);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  console.log(`Swagger UI available at http://localhost:${process.env.PORT || 5000}/api-docs`);
};