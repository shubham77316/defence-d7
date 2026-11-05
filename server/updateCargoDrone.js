const mongoose = require('mongoose');

async function updateCargoDrone() {
  await mongoose.connect('mongodb://127.0.0.1:27017/skywardens_cms');
  const db = mongoose.connection.db;

  const result = await db.collection('products').updateOne(
    { slug: 'cargo-drone-stack' },
    {
      $set: {
        specs: [
          { label: 'Drone type', value: 'Cargo Drone Stack - Quadcopter' },
          { label: 'Body type', value: 'Carbon Fiber / Aluminum / Plastic' },
          { label: 'Mode of operation', value: 'Manual, autonomous and Self-flying' },
          { label: 'Max RANGE', value: '5 to 6 Kms' },
          { label: 'Max Payload', value: 'Up-to 10 Kgs (6 Grenade Dropping)' },
          { label: 'Max flight time', value: 'Up-to 45 mins' },
          { label: 'AMSL / AGL', value: '2000 m / 500 m' },
          { label: 'Man portable', value: '2 Man Operation' },
          { label: 'All Up Weight', value: '43 Kgs' }
        ],
        featureSections: [
          {
            title: 'OTHER FEATURES',
            items: [
              'Battery: Li-ion 108000 mAh',
              'Camera: Day & Thermal Integrated',
              'Transmitter: 16 ch with telemetry',
              'Flying Speed: Up to 12 m/s'
            ]
          },
          {
            title: 'DELIVERY TIME',
            items: [
              'Up to 2 units - 15 days Delivery time',
              'Up to 10 units - 30 days Delivery time',
              'Up to 25 units - 60 days Delivery time',
              'Up to 60 units - 90 days Delivery time'
            ]
          }
        ],
        updatedAt: new Date()
      }
    }
  );

  console.log('Update result:', result);
  const updated = await db.collection('products').findOne({ slug: 'cargo-drone-stack' });
  console.log('Updated document:', JSON.stringify(updated, null, 2));
  process.exit(0);
}

updateCargoDrone().catch(err => {
  console.error(err);
  process.exit(1);
});
