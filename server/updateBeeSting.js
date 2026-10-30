const mongoose = require('mongoose');

async function updateBeeSting() {
  await mongoose.connect('mongodb://127.0.0.1:27017/skywardens_cms');
  const db = mongoose.connection.db;

  const result = await db.collection('products').updateOne(
    { slug: 'bee-sting-kamikaze' },
    {
      $set: {
        overview: 'Advanced loitering munition platform engineered for precision strike missions, real-time reconnaissance, and rapid target interception.',
        specs: [
          { label: 'Weight (MTOW)', value: '1.4 kg (highly dependent on battery)' },
          { label: 'Flight time', value: '4-5 mins / 10 mins empty' },
          { label: 'Payload', value: '1 kg warhead' },
          { label: 'Top speed', value: '250+ mph (400 km/h)' }
        ],
        updatedAt: new Date()
      }
    }
  );

  console.log('Update result:', result);
  const updated = await db.collection('products').findOne({ slug: 'bee-sting-kamikaze' });
  console.log('Updated document:', JSON.stringify(updated, null, 2));
  process.exit(0);
}

updateBeeSting().catch(err => {
  console.error(err);
  process.exit(1);
});
