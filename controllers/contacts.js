const { HttpCode } = require('../helpers/constants');
const { ContactsService } = require('../services');

const contactsService = new ContactsService();

const listContacts = async (req, res, next) => {
  const { _id: userId } = req.user;
  console.log('userId: ', userId);

  try {
    const contacts = await contactsService.listContacts(userId, req.query);
    res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: { ...contacts },
    });
  } catch (e) {
    next(e);
  }
};

const getContactById = async (req, res, next) => {
  const { _id: userId } = req.user;
  // const userId = req.user.userId;
  try {
    const contact = await contactsService.getContactById(userId, req.params);
    if (contact) {
      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: { contact },
      });
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        massage: 'Not found contact',
        data: 'not found',
      });
    }
  } catch (e) {
    next(e);
  }
};

const removeContact = async (req, res, next) => {
  const { _id: userId } = req.user;
  // const userId = req.user.userId;
  try {
    const contact = await contactsService.removeContact(userId, req.params);
    if (contact) {
      return res.status(HttpCode.NOT_FOUND).json({
        status: 'success',
        code: HttpCode.NOT_FOUND,
      });
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        massage: 'Not found contact',
        data: 'not found',
      });
    }
  } catch (e) {
    next(e);
  }
};

const addContact = async (req, res, next) => {
  const { _id: userId } = req.user;
  // const userId = req.user.userId;
  try {
    const contacts = await contactsService.addContact(userId, req.body);
    res.status(HttpCode.CREATED).json({
      status: 'success',
      code: HttpCode.CREATED,
      data: { contacts },
    });
  } catch (e) {
    next(e);
  }
};

const updateContact = async (req, res, next) => {
  const { _id: userId } = req.user;
  // const userId = req.user.userId;

  try {
    const contact = await contactsService.updateContact(
      userId,
      req.params,
      req.body
    );
    if (contact) {
      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: { contact },
      });
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        massage: 'Not found contact',
        data: 'not found',
      });
    }
  } catch (e) {
    next(e);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
