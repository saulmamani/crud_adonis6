import vine from '@vinejs/vine'

export const createDirectoryValidator = vine.compile(
  vine.object({
    fullName: vine.string().trim().minLength(3).maxLength(20),
    phone: vine.number().unique(async (db, value) => {
      const directory = await db
        .from('directories')
        .where('phone', value)
        .first()
      return !directory
    })
  })
)

export const updateDirectoryValidator = vine.compile(
  vine.object({
    fullName: vine.string().trim().minLength(3).maxLength(20),
    phone: vine.number().unique(async (db, value, field) => {
      const directory = await db
        .from('directories')
        .whereNot('id', field.data.id)
        .where('phone', value)
        .first()
      return !directory
    })
  })
)

