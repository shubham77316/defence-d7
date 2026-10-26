const mongoose = require('mongoose');

async function updateGrenadeDroppingAgri() {
  await mongoose.connect('mongodb://127.0.0.1:27017/skywardens_cms');
  const db = mongoose.connection.db;

  const result = await db.collection('products').updateOne(
    { slug: 'grenade-dropping-agri' },
    {
      $set: {
        specs: [
          { label: 'Drone type', value: 'Agri Drone Stack - Hexacopter' },
          { label: 'Body type', value: 'Carbon Fiber / Aluminum / Plastic' },
          { label: 'Mode of operation', value: 'Manual, autonomous and Self-flying' },
          { label: 'Max RANGE', value: '3 to 5 Kms' },
          { label: 'Max Payload', value: 'Up-to 6 Kgs (6 Grenade Dropping)' },
          { label: 'Max flight time', value: 'Up-to 30 mins' },
          { label: 'AMSL / AGL', value: '2000 m / 120 m' },
          { label: 'Man portable', value: '1 Man Operation' },
          { label: 'All Up Weight', value: '22.5 Kgs' }
        ],
        featureSections: [
          {
            title: 'OTHER FEATURES',
            items: [
              'Battery: Li-ion 30000 mAh',
              'Camera: Day & Thermal Integrated',
              'Transmitter: 16 ch with telemetry',
              'Flying Speed: Up to 12 m/s'
            ]
          },
          {
            title: 'DELIVERY TIME',
            items: [
              'Up to 10 units - 10 days Delivery time',
              'Up to 100 units - 30 days Delivery time',
              'Up to 200 units - 45 days Delivery time',
              'Up to 500 units - 90 days Delivery time'
            ]
          }
        ],
        updatedAt: new Date()
      }
    }
  );

  console.log('Update result:', result);
  const updated = await db.collection('products').findOne({ slug: 'grenade-dropping-agri' });
  console.log('Updated document:', JSON.stringify(updated, null, 2));
  process.exit(0);
}

updateGrenadeDroppingAgri().catch(err => {
  console.error(err);
  process.exit(1);
});
