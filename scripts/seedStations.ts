import fs from 'node:fs'
import path from 'node:path'
import dotenv from 'dotenv'
import admin from 'firebase-admin'

dotenv.config({ path: '.env.local' })

const APP_ID = process.env.APP_ID || 'thai-fuelfind-dev'
const args = process.argv.slice(2)
const dryRun = args.includes('--dry-run')

const servicePath =
  process.env.GOOGLE_APPLICATION_CREDENTIALS || './serviceAccountKey.json'

admin.initializeApp({
  credential: admin.credential.cert(
    JSON.parse(fs.readFileSync(servicePath, 'utf8'))
  )
})

const db = admin.firestore()
const seedPath = path.join('src', 'data', 'seedStations.json')

async function main() {
  const raw = fs.readFileSync(seedPath, 'utf8')
  const stations = JSON.parse(raw)

  console.log(`📦 Seeding ${stations.length} stations for appId="${APP_ID}"`)

  if (dryRun) {
    stations.forEach((station: any) => {
      console.log(`- ${station.id}: ${station.name} (${station.province}/${station.district})`)
    })
    console.log('Done (dry run).')
    return
  }

  const batch = db.batch()

  for (const station of stations) {
    const ref = db
      .collection('artifacts')
      .doc(APP_ID)
      .collection('public')
      .doc('data')
      .collection('stations')
      .doc(station.id)

    batch.set(ref, station, { merge: true })
  }

  await batch.commit()
  console.log('✅ Seeding complete.')
}

main().catch((err) => {
  console.error('❌ Error seeding stations:', err)
  process.exit(1)
})
