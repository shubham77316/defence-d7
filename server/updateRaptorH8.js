const mongoose = require('mongoose');

async function updateRaptorH8() {
  await mongoose.connect('mongodb://127.0.0.1:27017/skywardens_cms');
  const db = mongoose.connection.db;

  const result = await db.collection('products').updateOne(
    { slug: 'raptor-h8-bazz-h8' },
    {
      $set: {
        specs: [
          { label: 'Drone type', value: 'CO-AXIAL QUADCOPTER DRONE - ATTACK DRONE tested with CARL GUSTAV ROCKET LAUNCHER' },
          { label: 'Body type', value: 'Carbon Fibre / Aluminum' },
          { label: 'Mode of operation', value: 'Manual, autonomous and Self-flying' },
          { label: 'Max RANGE', value: '10 km line of sight (due to limitation of telemetry)' },
          { label: 'Max Payload', value: 'UP to 45 kg' },
          { label: 'Max flight time', value: '60 min with 5 kg payload / 45 min with 25 kg' },
          { label: 'AMSL / AGL', value: '12000 ft or 3600 meters / 200 Mtrs' },
          { label: 'Man portable', value: '4-man operation' },
          { label: 'All Up Weight', value: '140 kg maximum take-off weight' }
        ],
        featureSections: [
          {
            title: 'SPECIAL FEATURES',
            items: [
              'RL System / Anti-Tank - Carl Gustav',
              'High stability vehicle, accuracy 2 Ft, 250 Mtrs',
              'AI Tgt Locking, X-Y Axis Servo Capable',
              'Heavy Lift Logistic Drone (45 KG)',
              'Day & Thermal Camera'
            ]
          },
          {
            title: 'DELIVERY TIME',
            items: [
              'UP to 7 units - 45 days Delivery time',
              'UP to 15 units - 60 days Delivery time',
              'UP to 30 units - 90 days Delivery time',
              'UP to 60 units - 180 days Delivery time'
            ]
          }
        ],
        updatedAt: new Date()
      }
    }
  );

  console.log('Update result:', result);
  const updated = await db.collection('products').findOne({ slug: 'raptor-h8-bazz-h8' });
  console.log('Updated document:', JSON.stringify(updated, null, 2));
  process.exit(0);
}

updateRaptorH8().catch(err => {
  console.error(err);
  process.exit(1);
});
