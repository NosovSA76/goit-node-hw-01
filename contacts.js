import fs from 'fs/promises'
import path from 'path'
import { nanoid } from 'nanoid';


const contactsPath = path.resolve('db', 'contacts.json');

export async function listContacts() {
    const allContacts = await fs.readFile(contactsPath);
    return JSON.parse(allContacts);;
}

export async function getContactById(contactId) {
    const contacts = await listContacts();
    const contact = contacts.find(item => item.id === contactId);
    if (!contact) {
        return null;
    }
    return contact;
}

export async function removeContact(contactId) {
    const contacts = await listContacts();
    const contactDeleteIndex = contacts.findIndex(item => item.id === contactId);
    if (contactDeleteIndex === -1) {
        return null;
    }

    const [deletedContact] = contacts.splice(contactDeleteIndex, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return deletedContact;
}

export async function addContact(name, email, phone) {
    const contacts = await listContacts();
    const newContact = { id: nanoid(), name, email, phone }
    contacts.push(newContact)
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    return newContact;
}