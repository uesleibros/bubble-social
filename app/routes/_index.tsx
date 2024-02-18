import type { MetaFunction } from "@remix-run/node";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import SignUpModal from "~/components/SignUpModal.tsx";

export const meta: MetaFunction = () => {
  return [
    { title: "Bubble" },
    { name: "description", content: "Welcome to Remix!" },
    { name: "theme-color", content: "#000000" },
    { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" }
  ];
};

export default function Index() {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [confettiActivated, setConfettiActivated] = useState<boolean>(false);
  const [isSignUpModalVisible, setIsSignUpModalVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  function toggleSignUpModal(isVisible) {
    setIsSignUpModalVisible(isVisible);
  };

  function handleConfetti() {
    setConfettiActivated(true);
  };

  function drawBubbleShape(ctx) {
    ctx.beginPath();
    ctx.arc(0, 0, 10, 0, Math.PI * 2);
    ctx.stroke();
    ctx.closePath();
  }

  return (
    <div>
      { confettiActivated && 
        <Confetti 
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={80}
          colors={["#c5d9e3", "#eae0c8"]}
          drawShape={drawBubbleShape}
          recycle={false}
          onConfettiComplete={confetti => {
            setConfettiActivated(false);
            confetti.reset();
          }}
        /> 
      }
      <div className={`transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex items-center h-screen w-full">
          <div className="text-center mx-auto max-w-xs sm:max-w-xs">
            <h1 className="font-bold text-gray-900 text-7xl font-[Poppins] select-none">
              <span className={`transition-all ${confettiActivated ? 'text-9xl text-blue-600' : 'hover:text-gray-600 cursor-pointer'}`} onClick={handleConfetti}>B</span>
              ubble
            </h1>
            <hr className="my-1" />
            <div className="mt-3 flex flex-col gap-2">
              <button type="button" className="bg-gray-900 text-white font-[Poppins] rounded-sm p-2 w-full transition-colors hover:bg-gray-600" onClick={() => toggleSignUpModal(true)}>Criar uma conta</button>
              <button type="button" className="bg-gray-100 border border-gray-400 text-black font-[Poppins] rounded-sm p-2 w-full transition-colors hover:bg-white">Conectar-se</button>
            </div>
            <p className="mt-5 text-gray-600 font-[Poppins] text-xs">
              Ao prosseguir você concorda com os <strong>Termos de Serviço</strong> e <strong>Política de Privacidade</strong>.
            </p>
          </div>
        </div>
      </div>
      <SignUpModal visible={isSignUpModalVisible} toggleModal={toggleSignUpModal} />
    </div>
  );
}
