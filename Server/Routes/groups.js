const { Router } = require('express')
const GroupsController = require("../Controller/GroupsController")
const routes = Router()
const auth = require("../middleware/auth");



routes.get('/', auth, GroupsController.getListOfGroups)
routes.patch('/', auth, GroupsController.sendInvitationOfGroup)
routes.delete('/:userId', auth, GroupsController.deleteUserOfGroup)


module.exports = routes




