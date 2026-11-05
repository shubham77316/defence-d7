const mongoose = require('mongoose');

async function updateAgriHawk() {
  await mongoose.connect('mongodb://127.0.0.1:27017/skywardens_cms');
  const db = mongoose.connection.db;

  const result = await db.collection('products').updateOne(
    { slug: 'agri-hawk' },
    {
      $set: {
        overview: "Agri Hawk is a 10-litre agriculture spraying hexacopter designed for autonomous or manual operation. Smart terrain and obstacle-avoidance sensors, integrated live video, and automated failsafes support safer, more efficient field coverage while reducing farmers' direct contact with chemicals.",
        specs: [
          { label: 'Configuration', value: 'Hexacopter' },
          { label: 'Spray capacity', value: '10 litres' },
          { label: 'Endurance', value: '>20 minutes' },
          { label: 'Live transmission', value: '500 m LOS' },
          { label: 'Operational speed', value: '5 m/s' },
          { label: 'Maximum speed', value: '15 m/s' },
          { label: 'Operating altitude', value: '30 m AGL' },
          { label: 'Wind resistance', value: 'Up to 5 m/s' },
          { label: 'Operation modes', value: 'Manual and autonomous' }
        ],
        featureSections: [
          {
            title: 'TECHNICAL SPECIFICATIONS',
            items: [
              'UAV weight with battery and maximum payload: <29 kg',
              'UAV size with propellers: 2 x 1.8 x 0.5 m (L x B x H)',
              'Functional temperature range: -10°C to +55°C (NABL certified)',
              'Propulsion: Battery-powered electric propulsion',
              'Dust and drizzle resistance: IP53 (NABL certified)',
              'Technical life: Minimum 500 landings (self-certified)',
              'Field clearance required: 5 x 5 m flat land area',
              'Launch and operation: Vertical take-off and landing (VTOL)',
              'Deployment time: <10 minutes from assembly to take-off'
            ]
          },
          {
            title: 'SPRAYING OPERATIONS',
            items: [
              'Area coverage: 1 acre per 10-litre flight, with 2 flights per fully charged battery set',
              'Spray swath: 2-5 m',
              'Supported nozzles: flat jet and centrifugal',
              'Supported payloads: liquid pesticides, water, fertilizers, nutrients, and other agrochemicals',
              'Maximum operating crew: 2'
            ]
          },
          {
            title: 'SAFETY AND CONTROL',
            items: [
              'Terrain and obstacle detection and avoidance',
              'Automatic return-to-home and landing after communication loss, low battery, health-parameter exceedance, or geofence breach',
              'On-board GPS with triple redundancy and an emergency kill switch',
              'Ground-control app with live location, flight telemetry, spray-rate adjustment, field reports, and live video'
            ]
          }
        ],
        updatedAt: new Date()
      }
    }
  );

  console.log('Update result:', result);
  const updated = await db.collection('products').findOne({ slug: 'agri-hawk' });
  console.log('Updated document:', JSON.stringify(updated, null, 2));
  process.exit(0);
}

updateAgriHawk().catch(err => {
  console.error(err);
  process.exit(1);
});
