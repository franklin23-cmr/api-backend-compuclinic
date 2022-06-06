import { CREATE_USER } from './actionTypes';

export const createUser = (user) => ({
  type: CREATE_USER,
  data: {
    authentifie: user.authentifie,
    roles: user.roles,
    id: user.id,
    nom: user.nom,
    prenom: user.prenom,
    email: user.email,
    username: user.username,
    matricule: user.matricule,
    telephone: user.telephone,
    should_update_password: user.should_update_password,
    type_personnel: user.type_personnel,
    image: user.image,
    userId: user.userId,
    nextAuthDate: user.nextAuthDate,
  },
});
