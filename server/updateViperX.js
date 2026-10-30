const mongoose = require('mongoose');

async function updateViperX() {
  await mongoose.connect('mongodb://127.0.0.1:27017/skywardens_cms');
  const db = mongoose.connection.db;

  const result = await db.collection('products').updateOne(
    { slug: 'viper-x' },
    {
      $set: {
        featuresTitle: 'CAPABILITIES',
        featuresPosition: 'top',
        features: [
          'Suicide Payload Option: Lightweight, cost-effective high speed FPV drone designed for high precision.',
          'Pilot-Assisted Targeting: Uses vision sensor target identification and decision-making during final approach.',
          'Rapid Deployment: Capable of being launched from a variety of platforms, including fixed and mobile bases.',
          'Low Cost: Designed for low-cost tactical use, suitable for missions requiring expendable force projection.'
        ],
        specs: [
          { label: 'Prop size', value: '7 inch' },
          { label: 'Weight', value: '1 kg (without payload)' },
          { label: 'Endurance', value: '20 min (without payload)' },
          { label: 'Range', value: '4-5 km' },
          { label: 'Payload', value: 'up to 1 kg' },
          { label: 'Guidance System', value: 'GPS and inertial navigation system for autonomous flight and targeting' }
        ],
        updatedAt: new Date()
      }
    }
  );

  console.log('Update result:', result);
  const updated = await db.collection('products').findOne({ slug: 'viper-x' });
  console.log('Updated document:', JSON.stringify(updated, null, 2));
  process.exit(0);
}

updateViperX().catch(err => {
  console.error(err);
  process.exit(1);
});
