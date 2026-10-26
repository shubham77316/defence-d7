const mongoose = require('mongoose');

async function updateDoomSparrow() {
  await mongoose.connect('mongodb://127.0.0.1:27017/skywardens_cms');
  const db = mongoose.connection.db;

  const result = await db.collection('products').updateOne(
    { slug: 'doom-sparrow' },
    {
      $set: {
        specs: [
          { label: 'Drone type', value: 'Doom Sparrow - HYBRID VTOL FIXED WING DRONE' },
          { label: 'Body type', value: 'EPP' },
          { label: 'Mode of operation', value: 'Manual, autonomous and self-flying' },
          { label: 'Max RANGE', value: '5 km line of sight (due to limitation of telemetry)' },
          { label: 'Max Payload', value: 'Option 1: 500 gm, Option 2: 1 KG' },
          { label: 'Max flight time', value: '30 mins' },
          { label: 'AMSL / AGL', value: '8000 ft or 2400 meters / 120 Mtrs' },
          { label: 'Man portable', value: 'Two-man operations' },
          { label: 'All Up Weight', value: '3 KG / 4 KG' }
        ],
        featuresTitle: 'SPECIAL FEATURES',
        featuresPosition: 'bottom',
        features: [
          'UP to 500 gm payload',
          'UP to 1 kg payload'
        ],
        updatedAt: new Date()
      }
    }
  );

  console.log('Update result:', result);
  const updated = await db.collection('products').findOne({ slug: 'doom-sparrow' });
  console.log('Updated document:', JSON.stringify(updated, null, 2));
  process.exit(0);
}

updateDoomSparrow().catch(err => {
  console.error(err);
  process.exit(1);
});
