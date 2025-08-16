export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'id',
      title: 'Product ID',
      type: 'number',
      validation: (Rule: any) => Rule.required().positive().integer(),
    },
    {
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'desc',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'price',
      title: 'Price ($)',
      type: 'number',
      validation: (Rule: any) => Rule.required().min(1),
    },
    {
      name: 'quantity',
      title: 'Default Quantity',
      type: 'number',
      initialValue: 1,
      validation: (Rule: any) => Rule.required().min(1),
    },
    {
      name: 'img',
      title: 'Product Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'specs',
      title: 'Specifications',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    },
    {
      name: 'isBestSeller',
      title: 'Best Seller?',
      type: 'boolean',
      initialValue: false,
    },
  ],
}
