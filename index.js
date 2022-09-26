const contactsAction = require('./contacts.js');
const { Command } = require("commander");
const program = new Command();

program
  .option('-a, --action <type>')
  .option('-i, --id <type>')
  .option('-n, --name <type>')
  .option('-e, --email <type>')
  .option('-p, --phone <type>');

program.parse();

const argv = program.opts();


const invokeAction = async({ action, id, name, email, phone }) =>{
  switch (action) {
    case "list":
      const contacts = await contactsAction.listContacts();
      console.table(contacts);
      break;

    case "get":
      const contact = await contactsAction.getContactById(id);
      console.log(contact);
      break;

    case "add":
      const newContact = await contactsAction.addContact(name, email, phone);
      console.log(newContact);
      break;

    case "remove":
      const removedContact = await contactsAction.removeContact(id);
      console.log(removedContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);