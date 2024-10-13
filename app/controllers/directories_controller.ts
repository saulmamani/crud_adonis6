import type { HttpContext } from '@adonisjs/core/http'
import Directory from '#models/directory'
import { createDirectoryValidator, updateDirectoryValidator } from '#validators/directory'

export default class DirectoriesController {
  async index({ request, response }: HttpContext) {
    let txtBuscar = request.input('txtBuscar')
    if (!txtBuscar) txtBuscar = '%'

    const directories = await Directory.query()
      .whereILike('full_name', `%${txtBuscar}%`)
      .preload('user')

    return response.json(directories)
  }

  async show({ params }: HttpContext) {
    return await Directory.findOrFail(params.id)
  }

  async store({ request, response }: HttpContext) {
    const input = request.all()
    await createDirectoryValidator.validate(input)
    //TODO reemplazar por el usuario autenticado
    input.user_id = 1

    await Directory.create(input)
    return response.status(201).json({ success: true, message: 'Registro insertado correctamente' })
  }

  async update({ params, request, response }: HttpContext) {
    const directory = await Directory.findOrFail(params.id)
    const input = request.all()

    await updateDirectoryValidator.validate(input)

    directory.merge(input)
    await directory.save()

    return response
      .status(201)
      .json({ success: true, message: 'Registro modificado correctamente' })
  }

  async destroy({ params, response }: HttpContext) {
    const directory = await Directory.findOrFail(params.id)
    await directory.delete()

    return response.status(201).json({ success: true, message: 'Registro eliminado correctamente' })
  }
}
