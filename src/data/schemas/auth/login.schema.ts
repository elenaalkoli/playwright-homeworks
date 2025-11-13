import { obligatoryFieldsSchema, obligatoryRequredFields } from '../core.schema';

export const loginSchema = {
  type: 'object',
  properties: {
    ...obligatoryFieldsSchema,
    User: {
      type: 'object',
      properties: {
        _id: { type: 'string' },
        username: { type: 'string' },
        firstName: { type: 'string' },
        lastName: { type: 'string' },
        roles: {
          type: 'array',
          items: {
            type: 'string',
            enum: ['ADMIN'],
          },
        },
        createdOn: { type: 'string' },
      },
      required: ['_id', 'username', 'firstName', 'lastName', 'roles', 'createdOn'],
    },
  },
  required: [...obligatoryRequredFields, 'User'],
};
