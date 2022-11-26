const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.resolve(__dirname, "./db/contacts.json");

const data = async () => {
  const res = await fs.readFile(contactsPath);
  return JSON.parse(res) ?? null;
};

const writeData = async (res) => {
  await fs.writeFile(contactsPath, JSON.stringify(res));
};

const listContacts = async () => {
  console.table(await data());
};

const getContactById = async (contactId) => {
  const res = (await data())?.find(({ id }) => id === contactId.toString());
  console.table(res);
};

const removeContact = async (contactId) => {
  const res = (await data())?.filter(({ id }) => id !== contactId.toString());
  await writeData(res);
  console.table(await data());
};

const addContact = async (name, email, phone) => {
  const newContact = {
    name,
    email,
    phone,
    id: ((await data())?.length + 1).toString(),
  };
  await writeData([...(await data()), newContact]);
  console.table(await data());
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
