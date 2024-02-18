import { FaXmark, FaUser } from "react-icons/fa6";
import { MdAlternateEmail, MdOutlinePassword  } from "react-icons/md";
import { IoIosEye, IoMdEyeOff  } from "react-icons/io";
import React, { useState, ReactNode } from "react";

export default function SignUpModal({ visible, toggleModal }) {
	const eyeVisible: ReactNode[] = [<IoIosEye />, <IoMdEyeOff />];
	const [isPasswordVisible, setIsPasswordVisible] = useState<number>(0);
	const [username, setUsername] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [isUsernameInvalid, setIsUsernameInvalid] = useState<boolean>(false);
	const [isEmailInvalid, setIsEmailInvalid] = useState<boolean>(false);
	const [isPasswordInvalid, setIsPasswordInvalid] = useState<boolean>(false);
	const [formIsOk, setFormIsOk] = useState<boolean>(true);

	function closeModal() {
		toggleModal(false);
	}

	function handleSignUp() {
		if (username.length === 0 && email.length === 0 && password.length === 0) {
			setFormIsOk(false);
			setIsUsernameInvalid(true);
			setIsEmailInvalid(true);
			setIsPasswordInvalid(true);
			return;
		}
		setFormIsOk(!isUsernameInvalid && !isEmailInvalid && !isPasswordInvalid);
	}

	function handleChangeUsername(event) {
		const textLength: number = event.target.value.length;
		if (textLength > 50) return;

		if (textLength < 8)
			setIsUsernameInvalid(true);
		else
			setIsUsernameInvalid(false);
		setUsername(event.target.value);
	}

	function handleChangeEmail(event) {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		if (!emailRegex.test(event.target.value))
			setIsEmailInvalid(true);
		else
			setIsEmailInvalid(false);
		setEmail(event.target.value);
	}

	function handleChangePassword(event) {
		const textLength: number = event.target.value.length;
		const passwordRegex = /^(?=.*[A-Z])(?=.*\d).+$/;

		if (!passwordRegex.test(event.target.value) || textLength < 5)
			setIsPasswordInvalid(true);
		else
			setIsPasswordInvalid(false);
		setPassword(event.target.value);
	}

	if (!visible) {
		return null;
	}

	return (
		<div className="fixed top-0 flex items-center justify-center bg-black bg-opacity-50 w-full h-screen sm:h-full z-1">
			<div className="bg-white md:shadow-sm md:rounded-lg flex flex-col justify-between w-[35%] h-[80vh] sm:w-full sm:h-full">
				<div className="flex items-center justify-center px-3 py-2 shrink-0 mb-5 border-b">
					<div className="text-gray-800 font-bold select-none cursor-pointer text-2xl bg-gray-400 bg-opacity-0 transition-colors hover:bg-opacity-30 rounded-full p-1" onClick={closeModal}>
						<FaXmark />
					</div>
					<h2 className="mx-auto font-bold text-gray-900 text-3xl font-[Poppins] select-none pr-4">Bubble</h2>
				</div>
				<div className="w-full px-[50px] sm:px-[30px] h-full overflow-y-auto">
					<h1 className="text-3xl font-[DM Sans] font-bold">Criar a sua conta</h1>
					<div className="mt-5 flex flex-col gap-6 pb-3">
						{/* Username Section */}
						<div>
							<div className={`flex flex-col gap-2 w-full py-3 px-2 border rounded-md ${isUsernameInvalid && "border-red-500 text-red-500"}`}>
								<div className="flex justify-between items-center text-xs select-none">
									<label htmlFor="username" className="flex items-center gap-1"><FaUser /> Nome</label>
									<span className="text-gray-500">{username.length}/50</span>
								</div>
								<input type="text" name="username" maxLength={50} autoCapitalize="sentences" spellCheck={true} className="font-[DM Sans] outline-none w-full" onChange={handleChangeUsername} value={username} required />
							</div>
							{ isUsernameInvalid && 
								<p className="text-red-500 text-xs select-none mt-1">Seu nome precisa ter no mínimo 8 caracteres.</p>
							}
							<p className="text-gray-500 text-xs select-none mt-1">Isso será exibido publicamente.</p>
						</div>
						{/* E-Mail Section */}
						<div>
							<div className={`flex flex-col gap-2 w-full py-3 px-2 border rounded-md ${isEmailInvalid && "border-red-500 text-red-500"}`}>
								<div className="flex justify-between items-center text-xs select-none">
									<label htmlFor="email" className="flex items-center gap-1"><MdAlternateEmail /> E-Mail</label>
								</div>
								<input type="email" name="email" autoCapitalize="sentences" spellCheck={true} className="font-[DM Sans] outline-none w-full" onChange={handleChangeEmail} value={email} required />
							</div>
							{ isEmailInvalid && 
								<p className="text-red-500 text-xs select-none mt-1">Tente providenciar um e-mail nesse formato: nome@host.com</p>
							}
							<p className="text-gray-500 text-xs select-none mt-1">Isso não será exibido publicamente. Você deve habilitar nas opções.</p>
						</div>
						{/* Password Section */}
						<div>
							<div className={`flex flex-col gap-2 w-full py-3 px-2 border rounded-md ${isPasswordInvalid && "border-red-500 text-red-500"}`}>
								<div className="flex justify-between items-center text-xs select-none">
									<label htmlFor="password" className="flex items-center gap-1"><MdOutlinePassword /> Senha</label>
									<span className="text-gray-500">{password.length < 5 && 5 - password.length}</span>
								</div>
								<div className="flex items-center gap-2">
									<input type={`${isPasswordVisible == 0 ? "password" : "text"}`} name="password" minLength={5} autoComplete="current-password"className="font-[DM Sans] outline-none w-full" onChange={handleChangePassword} value={password} required />
									<span
										onMouseDown={(e) => { 
											e.preventDefault(); 
											setIsPasswordVisible(isPasswordVisible === 0 ? 1 : 0); 
										}} 
									   onClick={(e) => e.preventDefault()}
									   className="sm:text-2xl cursor-pointer">
									   { eyeVisible[isPasswordVisible] }
									</span>
								</div>
							</div>
							{ isPasswordInvalid && 
								<p className="text-red-500 text-xs select-none mt-1">Sua senha deve conter caracteres maiúsculos e números.</p>
							}
						</div>
					</div>
				</div>
				<div className="w-full flex flex-col items-center justify-center px-7 py-4 border-t">
					<button type="button" onClick={handleSignUp} className="bg-gray-800 text-white font-[Poppins] rounded-full p-2 w-[60vh] transition-colors hover:bg-gray-600">Prosseguir</button>
					{ !formIsOk && 
						<p className="text-red-500 text-xs select-none mt-1">Você não completou o formulário corretamente.</p>
					}
				</div>
			</div>
		</div>
	);
}