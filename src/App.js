import "./App.css";
import Wrapper from "./components/wrapper/Wrapper";
import Screen from "./components/screen/Screen";
import ButtonWrapper from "./components/buttonWrapper/ButtonWrapper";
import Button from "./components/button/Button";

const buttonKeys = [
	["C", "+-", "%", "/"],
	[7, 8, 9, "X"],
	[4, 5, 6, "-"],
	[1, 2, 3, "+"],
	[0, ".", "="],
];


function App() {
	return (
		<section className="center-container">
			<Wrapper>
				<Screen></Screen>
				<ButtonWrapper>
					{
					buttonKeys.flat().map((btn, i) => {
						return (
							<>
							<Button
							key={i}
							value={btn}
							onClick={() => {
								console.log(btn, "botones")
							}}
							/>
							</>
						)
					})
					}
				</ButtonWrapper>
			</Wrapper>
		</section>
	);
}

export default App;
