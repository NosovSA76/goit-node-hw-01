import * as contactService from "./contacts.js"

import { Command } from 'commander';
const program = new Command();
program
    .option('-a, --action <type>', 'choose action')
    .option('-i, --id <type>', 'user id')
    .option('-n, --name <type>', 'user name')
    .option('-e, --email <type>', 'user email')
    .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);
const argv = program.opts();


async function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case 'list':
            const list = await contactService.listContacts()
            console.table(list);
            break;

        case 'get':
            const singleContact = await contactService.getContactById(id);
            console.table(singleContact);
            break;

        case 'add':
            const newContact = await contactService.addContact(name, email, phone)
            console.table(newContact);
            break;

        case 'remove':
            const deletedContact = await contactService.removeContact(id)
            console.table(deletedContact);
            break;

        default:
            console.warn('\x1B[31m Unknown action type!');
    }
}

invokeAction(argv);