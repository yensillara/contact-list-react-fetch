//aquí en Flux definimos los endpoints, store y accion de éstos

const BASE_URL = "http://localhost:3000";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			contacts: [], //contacts es una lista
			singleContact: {} //contact es un objeto
		},
		actions: {
			fetchContacts: async (id = null) => {
				let url = BASE_URL + "/contacts"; //endpoint contact
				if (id != null) {
					//si el id es diferebte de nulo
					url += "/" + id; //entonces agregamos el número del id al endpoint
				}
				let response = await fetch(url);
				if (response.ok) {
					let body = await response.json();
					if (id == null) {
						setStore({
							contacts: body
						});
					} else {
						setStore({ singleContact: body });
					}
					return true;
				} else {
					console.log(response.status);
					return false;
				}
			},
			deleteContact: async id => {
				//aquí estamos borrando al usuario
				let actions = getActions();
				let url = BASE_URL + "/contacts/" + id;
				let response = await fetch(url, {
					method: "DELETE"
				});
				if (response.ok) {
					await actions.fetchContacts();
					return true;
				} else {
					console.log(response.status);
					return false;
				}
			}
		}
	};
};

export default getState;
