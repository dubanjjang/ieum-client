const prettierConfig = {
  plugins: ["prettier-plugin-tailwindcss"],
  useTabs: false, // 탭 대신 스페이스 사용
  tabWidth: 2, // 들여쓰기 너비 2칸
  printWidth: 80, // 한 줄 최대 길이 80자
  semi: true, // 세미콜론 사용
  singleQuote: false, // 문자열에 큰따옴표 사용
  bracketSameLine: false, // 마지막 `>` 를 다음 줄로 내리기
  bracketSpacing: true, // 객체 리터럴의 중괄호 앞뒤에 공백 추가
  jsxSingleQuote: false, // JSX 내부 큰따옴표 사용
  quoteProps: "as-needed", // 객체 속성에 따옴표 필요할 때만 사용
  trailingComma: "all", // 객체, 배열 등의 마지막 항목에 쉼표 추가
  arrowParens: "always", // 화살표 함수 매개변수 항상 괄호 사용
};

export default prettierConfig;
