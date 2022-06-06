import { useState } from 'react';

const LogicModal = () => {
  const [revele, SetchangeRevele] = useState(false);

  function toogle() {
    SetchangeRevele(!revele);
  }

  return {
    revele,
    toogle,
  };
};
export default LogicModal;
