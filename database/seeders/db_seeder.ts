import { BaseSeeder } from '@adonisjs/lucid/seeders'
import hash from '@adonisjs/core/services/hash'
import db from '@adonisjs/lucid/services/db'

export default class extends BaseSeeder {
  async run() {
    await db.table('users').insert({
      full_name: 'Saul Mamani',
      email: 'saul@irpiri.com',
      password: await hash.make('123456'),
      created_at: new Date(),
    })

    await db.table('directories').multiInsert([
      {
        phone: 76137269,
        full_name: 'Lidia Marce T.',
        user_id: 1,
        created_at: new Date(),
      },
      {
        phone: 98765432,
        full_name: 'Soyla Del Rincon',
        user_id: 1,
        created_at: new Date(),
      },
    ])
  }
}
