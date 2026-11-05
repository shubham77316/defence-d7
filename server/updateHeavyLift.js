const mongoose = require('mongoose');

async function updateHeavyLift() {
  await mongoose.connect('mongodb://127.0.0.1:27017/skywardens_cms');
  const db = mongoose.connection.db;

  const result = await db.collection('products').updateOne(
    { slug: 'heavy-lift-50kg' },
    {
      $set: {
        overview: 'Designed for tactical resupply, equipment transport, and operational support with exceptional payload-carrying capability.',
        specs: [
          { label: 'Weight (MTOW)', value: '65 kg' },
          { label: 'Flight time', value: '15-25 mins loaded / 40+ mins empty' },
          { label: 'Payload', value: '50 kg' },
          { label: 'Top speed', value: '35-45 mph' }
        ],
        updatedAt: new Date()
      }
    }
  );

  console.log('Update result:', result);
  const updated = await db.collection('products').findOne({ slug: 'heavy-lift-50kg' });
  console.log('Updated document:', JSON.stringify(updated, null, 2));
  process.exit(0);
}

updateHeavyLift().catch(err => {
  console.error(err);
  process.exit(1);
});
