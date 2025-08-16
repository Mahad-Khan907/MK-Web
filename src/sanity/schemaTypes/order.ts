export default {
  name: 'order',
  title: 'Orders',
  type: 'document',
  fields: [
    { name: 'name', title: 'Customer Name', type: 'string' },
    { name: 'email', title: 'Email', type: 'string' },
    { name: 'phone', title: 'Phone', type: 'string' },
    { name: 'address', title: 'Address', type: 'string' },
    { name: 'city', title: 'City', type: 'string' },
    { name: 'zipCode', title: 'Zip Code', type: 'string' },
    {
      name: 'cartItems',
      title: 'Cart Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Product Name', type: 'string' },
            { name: 'price', title: 'Price', type: 'number' },
            { name: 'quantity', title: 'Quantity', type: 'number' },
            { name: 'img_url', title: 'Product Image', type: 'string' },
          ],
        },
      ],
    },
    { name: 'total', title: 'Total Price', type: 'number' },
    {
      name: 'status',
      title: 'Order Status',
      type: 'string',
      options: {
        list: [
          { title: 'Pending', value: 'pending' },
          { title: 'Success', value: 'success' },
          { title: 'Dispatch', value: 'dispatch' },
        ],
        layout: 'radio',
      },
      initialValue: 'pending',
    },
    { name: 'orderDate', title: 'Order Date', type: 'datetime' },
  ],
};
