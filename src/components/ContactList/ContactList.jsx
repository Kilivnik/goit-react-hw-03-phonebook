import ContactListItem from '../ContactListItem/ContactListItem';
import s from './ContactList.module.css';

export default function ContactList({ contacts, filter, deleteContact }) {
  return (
    <ul className={s.contactList}>
      {filter
        ? contacts
            .filter(({ name }) =>
              name.toLowerCase().includes(filter.toLowerCase())
            )
            .map(({ name, number, id }) => (
              <ContactListItem
                name={name}
                number={number}
                key={id}
                handleClick={() => deleteContact(id)}
              />
            ))
        : contacts.map(({ name, number, id }) => (
            <ContactListItem
              name={name}
              number={number}
              key={id}
              handleClick={() => deleteContact(id)}
            />
          ))}
    </ul>
  );
}
