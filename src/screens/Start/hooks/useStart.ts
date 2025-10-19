import { useNavigate } from "react-router-dom";
import { EventNameEnum } from "../../../utils/constants";
import { SCREENS } from "../../../utils/screens";
import { useRef } from "react";
  
const useStart = () => {
  const navigate = useNavigate();
  const id = useRef<HTMLInputElement>(null);

  const handleStartClick = () => {
    if (!id.current?.value) {
      alert('Por favor, preencha sua matrícula para iniciar a atividade.');
      return;
    }
    localStorage.setItem('student', id.current?.value);
    window.dispatchEvent(new CustomEvent(EventNameEnum.START));
    navigate(SCREENS.CATALOG);
  };

  return {
    handleStartClick,
    id,
  };
};

export default useStart;
