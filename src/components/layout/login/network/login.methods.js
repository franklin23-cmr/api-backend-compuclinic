export const redirection = (type) => {
  if (type === 'Medecin') {
    return '/medecin';
  } else if (type === 'Direction') {
    return '/direction';
  } else if (type === 'Caissier') {
    return '/caissier';
  } else if (type === 'Secretaire') {
    return '/secretaire';
  } else if (type === 'Infirmier') {
    return '/infirmiere';
  } else if (type === 'Stagiare') {
    return '/infirmiere';
  } else if (type === 'Infirmier') {
    return '/infirmiere';
  } else if (type === 'Laborantin') {
    return '/laborantin';
  }
  return '/';
};
