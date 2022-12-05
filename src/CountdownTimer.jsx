import React, { createContext, useContext, useEffect, useState } from "react";
import "./myEstilo.css";
// import { CountContext } from "./Context";

const TimeContext = createContext(null);
const formatMe = (value) => value.toString().padStart(2, "0");
// *   With props 
// export const CountdownTimer = ({ hours, minutes, seconds }) => {
export const CountdownTimer = () => {
	let hours, minutes, seconds;
	hours = 1;
	minutes = 45;
	seconds = 0;
	const [[h, m, s], setTime] = useState([hours, minutes, seconds]);
	const [finish, setFinish] = useState(false);
	const [pause, setPause] = useState(true);
	// const {horas, minutos, segundos} = time;

	const tick = () => {
		if (finish || pause) return;

		// * Si hay segundos disponibles - Resta segundo por segundo
		if (h >= 0 && m >= 0 && s >= 1) {
			setTime([h, m, s - 1]);
		} else if (h >= 0 && m >= 1 && s >= 0) {
			setTime([h, m - 1, 59]);
		} else if (h >= 1 && m >= 0 && s >= 0) {
			setTime([h - 1, 59, 59]);
		} else {
			setFinish(true);
		}
		console.log(s);
		// * Si hay minutos disponibles - resta un minuto
		// * Si hay horas dispibles - Resta un hora

		console.log("ticks");
	};

	const resetTimer = () => {
		setTime([hours, minutes, seconds]);
		setFinish(false);
		setPause(true);
	};
	const detemrineState = () => setPause(!pause);
	

	useEffect(() => {
		let ticker = setInterval(() => tick(), 1000);
		return () => {
			clearInterval(ticker);
		};
	});

	return (
		<>
			<h3>{`${formatMe(h)}:${formatMe(m)}:${formatMe(s)}`}</h3>
			<button onClick={detemrineState}>{pause ? "Start" : "Stop"}</button>
			<button onClick={resetTimer}>Reset</button>

			<TimeContext.Provider value={[h, m, s]}>
				<Child></Child>
			</TimeContext.Provider>
		</>
	);
};

export const Child = () => {
	return (
		<>
			<h1>CHILD - no context or prop</h1>
			<GrandChild />
		</>
	);
};

export const GrandChild = () => {
	const time = useContext(TimeContext);
	const [h, m, s] = time;

	return (
		<>
		<hr/>
			<h1>
				From GrandChild ➡️ Using Context provider ➡️ {h}:{m}:{formatMe(s)}
			</h1>
			<GreatGrandChild />
		</>
	);
};

export const GreatGrandChild = () => {
	const time = useContext(TimeContext);
	const [h, m, s] = time;

	return (
		<>
		<hr/>
			<h1>
				{" "}
				From GreatGrandChild ➡️ Using Context provider ➡️ {h}:{m}:{s}{" "}
			</h1>
		</>
	);
};
