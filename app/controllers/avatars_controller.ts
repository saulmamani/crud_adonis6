// import type { HttpContext } from '@adonisjs/core/http'

import { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import Directory from '#models/directory'

export default class AvatarsController {
  async upload({ request, response }: HttpContext) {
    const avatar = request.file('avatar', {
      size: '1mb',
      extnames: ['jpg', 'png', 'jpeg'],
    })
    const id = request.input('id')
    const directory = await Directory.findOrFail(id)

    if (avatar && avatar.isValid) {
      const fileName = `${id}.${avatar.extname}`
      await avatar.move(app.makePath('storage/upload'), {
        name: fileName,
      })

      directory.photo = fileName
      await directory.save()

      return response.json({ success: true, message: 'Avatar cargado correctamente' })
    } else return response.json({ success: false, message: avatar?.errors })
  }

  async getAvatar({ params, response }: HttpContext) {
    const directory = await Directory.findOrFail(params.id)

    if (directory.photo) {
      return response.attachment(
        app.makePath('storage/upload') + `/${directory.photo}`,
        directory.photo,
        'inline'
      )
    } else return response.json({ success: false, message: 'No tiene foto' })
  }
}
