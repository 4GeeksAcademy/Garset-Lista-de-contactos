export const initialStore = () => {
  return {
    message: null,
    todos: [
      {
        id: 1,
        title: "Make the bed",
        background: null,
      },
      {
        id: 2,
        title: "Do my homework",
        background: null,
      }
    ],
    saludo: "hola desde el store!",
    contactos: [] //se guardan todos los contactos
  }
}

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case 'add_task':

      const { id, color } = action.payload

      return {
        ...store,
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
      };
    case 'modify_saludo':
      console.log(action.payload);

      return {
        ...store,
        saludo: "modificado en una accion",
      };

    // Nuevo case para guardar los contactos
    case "set_contacts":
      return {
        ...store,
        contactos: action.payload,
      };

    default:
      throw Error('Unknown action.');
  }
}
//modify saludo es el nombre de lo q modificare... debo cambiarlo a lo q realmente deseo con su respectivo nombre esto es un ejemplo se puede coger toda la info del todosmapeo
//este ejemplo es el simple de saludo