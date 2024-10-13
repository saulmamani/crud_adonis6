/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const AvatarsController = () => import('#controllers/avatars_controller')
const DirectoriesController = () => import('#controllers/directories_controller')

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.resource('directories', DirectoriesController).apiOnly()
router.post('avatarUpload', [AvatarsController, 'upload'])
router.get('getAvatar/:id', [AvatarsController, 'getAvatar'])
