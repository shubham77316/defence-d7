const mongoose = require('mongoose');

async function updateAerialRecon() {
  await mongoose.connect('mongodb://127.0.0.1:27017/skywardens_cms');
  const db = mongoose.connection.db;

  const result = await db.collection('products').updateOne(
    { slug: 'aerial-recon-node' },
    {
      $set: {
        specs: [
          { label: 'Drone type', value: 'Aerial Recon Node - Quadcopter' },
          { label: 'Body type', value: 'Carbon Fiber / Aluminum / Plastic' },
          { label: 'Mode of operation', value: 'Manual, autonomous and Self-flying' },
          { label: 'Max RANGE', value: '3 to 4 Kms' },
          { label: 'Max Payload', value: 'Up-to 600 gms' },
          { label: 'Max flight time', value: 'Up-to 35 mins' },
          { label: 'AMSL / AGL', value: '3700 m / 500 m' },
          { label: 'Man portable', value: '1 Man Operation' },
          { label: 'All Up Weight', value: '2.6 Kgs' }
        ],
        featureSections: [
          {
            title: 'OTHER FEATURES',
            items: [
              'Battery: Li-ion 9500 mAh',
              'Camera: Day & Thermal Integrated',
              'Transmitter: 16 ch with telemetry',
              'Flying Speed: Up to 12 m/s'
            ]
          },
          {
            title: 'DELIVERY TIME',
            items: [
              'Up to 5 units - 15 days Delivery time',
              'Up to 25 units - 30 days Delivery time',
              'Up to 75 units - 60 days Delivery time',
              'Up to 150 units - 90 days Delivery time'
            ]
          }
        ],
        updatedAt: new Date()
      }
    }
  );

  console.log('Update result:', result);
  const updated = await db.collection('products').findOne({ slug: 'aerial-recon-node' });
  console.log('Updated document:', JSON.stringify(updated, null, 2));
  process.exit(0);
}

updateAerialRecon().catch(err => {
  console.error(err);
  process.exit(1);
});
