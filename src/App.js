import "./App.css";
import { useState } from "react";
import Wrapper from "./components/wrapper/Wrapper";
import Screen from "./components/screen/Screen";
import ButtonWrapper from "./components/buttonWrapper/ButtonWrapper";
import Button from "./components/button/Button";
import { v4 } from "uuid";
import { type } from "@testing-library/user-event/dist/type";

const calcAsciiValues = [
	12, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102,
	103, 104, 105, 106, 107, 109, 111, 187,
];
const buttonKeys = [
	["C", "+-", "%", "/"],
	[7, 8, 9, "X"],
	[4, 5, 6, "-"],
	[1, 2, 3, "+"],
	[0, ".", "="],
];

function App() {
	let [calc, setCalc] = useState({
		bucket: 0,
		sign: "",
		num: 0,
	});

	let operators = {
		"/": (a, b) => Number(a) / Number(b),
		"X": (a, b) => Number(a) * Number(b),
		"-": (a, b) => Number(a) - Number(b),
		"+": (a, b) => Number(a) + Number(b),
		"%": (a, b) => Number(a) + Number(b),
	};

	function handleKeyDown(event) {
		let charCode = event.which;
		console.log(charCode)
		if (calcAsciiValues.indexOf(charCode) === -1) return;
		getKeyFunc(event);
	}

	function getKeyFunc(currentKey) {
		let char;
		if (currentKey._reactName === "onClick") {
			char = currentKey.target.innerHTML;
		} else {
			char = currentKey.key;
		}

		switch (char) {
			case "C":
				clearCalcMemory();
				break;
			case "+-":
				toggleRange();
				break;
			case "%":
				setCalc({
					...calc,
					num: calc.num / 100,
					sign: char,
				});
				break;
			case "/":
			case "X":
			case "-":
			case "+":
				setCalc({
					...calc,
					bucket: calc.num,
					num: 0,
					sign: char,
				});
				break;
			case "=":
				printResult();
				break;
			default:
				printNumbers(char);
				break;
		}
	}

	function clearCalcMemory() {
		setCalc({
			bucket: 0,
			sign: "",
			num: 0,
		});
	}

	function toggleRange() {
		if (calc.num === "0") return;
		setCalc({
			...calc,
			num: calc.num * -1,
		});
	}

	function printResult() {
		switch (calc.sign) {
			case "+":
			case "X":
			case "%":
			case "/":
			case "-":
				setCalc({
					...calc,
					num: calculate(calc.bucket, calc.num, calc.sign),
				});
				break;
			default:
				break;
		}
	}

	function calculate(bucket, screenNumber, operator) {
		return operators[operator](bucket, screenNumber);
	}

	function printNumbers(currentNumerical) {
		if (calc.num + currentNumerical === "00") return;
		let temporalBuket =
			calc.num === 0 ? currentNumerical : calc.num + currentNumerical;
		setCalc({
			...calc,
			num: temporalBuket,
		});
	}

	return (
		<section
			className='center-container'
			onKeyDown={(event) => handleKeyDown(event)}
			tabIndex={0}
		>
			<Wrapper>
				<Screen value={calc.num}></Screen>
				<ButtonWrapper>
					{buttonKeys.flat().map((btn, i) => {
						return (
							<Button
								key={v4()}
								value={btn}
								className={btn === "=" ? "equals" : ""}
								onClick={getKeyFunc}
							/>
						);
					})}
				</ButtonWrapper>
			</Wrapper>
		</section>
	);
}

export default App;
