import LNB from "./components/leftNavigationBar";
import "./styles.css";

const DESCRIPTIONS = (
  <div>
    <h1>두 번째 사전과제입니다</h1>
    <h2>좌측에 있는 LNB 항목을 즐겨찾기 할 수 있도록 구현해주세요.</h2>
  </div>
);

export default function App() {
  return (
    <div className="App">
      <LNB />
      <div className="content">{DESCRIPTIONS}</div>
    </div>
  );
}
