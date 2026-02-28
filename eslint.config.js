import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";
import prettier from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import unusedImports from "eslint-plugin-unused-imports";
import boundaries from "eslint-plugin-boundaries";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      prettier,
    ],
    plugins: {
      import: importPlugin,
      "simple-import-sort": simpleImportSort,
      "unused-imports": unusedImports,
      boundaries,
    },
    settings: {
      // "@/*" 경로 인식
      "import/resolver": {
        typescript: {
          project: "./tsconfig.json",
        },
      },

      // FSD 구조 선언
      "boundaries/elements": [
        { type: "shared", pattern: "src/shared/**" },
        { type: "entities", pattern: "src/entities/**" },
        { type: "features", pattern: "src/features/**" },
        { type: "widgets", pattern: "src/widgets/**" },
        { type: "pages", pattern: "src/pages/**" },
        { type: "app", pattern: "src/app/**" },
      ],
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        naver: "readonly",
      },
    },
    rules: {
      // 코드 품질 관련
      "no-empty": "error", // 빈 블록 금지
      "no-extra-semi": "error", // 불필요한 세미콜론 금지
      "no-func-assign": "error", // 함수 재할당 금지
      "no-unreachable": "error", // 도달 불가 코드 금지
      "no-unused-vars": "off", // 미사용 변수 금지(off 설정 후 @typescript-eslint/no-unused-vars에서 설정)
      "no-undef": "warn", // 선언되지 않은 식별자 금지
      "no-cond-assign": "error", // 조건식에서 할당 금지
      "no-constant-condition": "error", // 항상 true/false 조건식 금지
      "no-self-compare": "error", // 자기 자신 비교 금지
      "no-use-before-define": "off", // 선언 전 사용 금지(off 설정 후 "@typescript-eslint/no-use-before-define에서 설정)
      "no-var": "error", // var 사용 금지
      "no-duplicate-imports": "error", // 중복 import 금지
      "prefer-const": "error", // 재할당이 없는 경우 const 사용
      "prefer-template": "error", // 문자열 결합 → 템플릿 리터럴 사용
      "prefer-destructuring": ["error", { array: false, object: true }], // 구조분해할당 권장
      "prefer-spread": "error", // apply 대신 스프레드
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ], // 미사용 변수 금지
      "@typescript-eslint/no-use-before-define": "error", // 선언 전 사용 금지
      "@typescript-eslint/no-empty-interface": "error", // 빈 인터페이스 금지
      "@typescript-eslint/no-explicit-any": "warn", // any 타입 사용시 경고
      "import/no-self-import": "error", // 자기 자신 import 금지
      "import/no-cycle": "error", // 순환 참조 금지
      "import/no-unused-modules": "error", // 미사용 모듈 검사
      "import/first": "error", // import는 파일 상단
      eqeqeq: ["error", "always"], // == 사용 금지
      "react-hooks/set-state-in-effect": "off",

      // 코드 컨벤션 관련
      "no-trailing-spaces": "error", // 행 끝 공백 금지
      "no-multiple-empty-lines": ["error", { max: 1 }], // 연속 빈 줄 제한
      "no-lonely-if": "error", // 불필요한 단독 if 금지
      "eol-last": ["error", "always"], // 파일 끝 개행 보장
      "array-bracket-spacing": ["error", "never"], // 배열 대괄호 공백
      quotes: ["error", "double"], // 따옴표 스타일
      curly: "error", // 중괄호 생략 금지
      yoda: "error", // 요다 조건 금지(if (42 === x))
      camelcase: ["error", { properties: "never", ignoreImports: true }], // 카멜케이스 강제(프로퍼티명 제외)

      // 임포트 정렬/그룹
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            // 1) 사이드 이펙트 임포트 (e.g. "import './globals.css'")
            ["^\\u0000"],

            // 2) Node 빌트인
            ["^node:"],

            // 3) 외부 패키지 (react/next 포함)
            ["^react$", "^next(/.*)?$", "^@?\\w"],

            // 4) 앱 내부 절대 경로 (@/)
            ["^@/"],

            // 5) 상대 경로 (상위 → 동일 디렉토리)
            [
              "^\\.\\.(?!/?$)",
              "^\\.\\.(?=/).*",
              "^\\./(?=.*/)",
              "^\\.(?!/?$)",
              "^\\./?$",
            ],

            // 6) 스타일/에셋
            ["^.+\\.s?css$"],
          ],
        },
      ],
      "simple-import-sort/exports": "error",

      // 중복 임포트/빈 줄 처리
      "import/no-duplicates": "error",
      "import/newline-after-import": ["error", { count: 1 }],

      // 미사용 임포트/변수 정리
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "error",
        {
          vars: "all",
          args: "after-used",
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],

      // FSD 관련(상위 레이어 import 방지)
      "boundaries/no-unknown": "error",
      "boundaries/element-types": [
        "error",
        {
          default: "disallow",
          rules: [
            {
              from: "shared",
              allow: ["shared"],
            },
            {
              from: "entities",
              allow: ["shared", "entities"],
            },
            {
              from: "features",
              allow: ["shared", "entities", "features"],
            },
            {
              from: "widgets",
              allow: ["shared", "entities", "features", "widgets"],
            },
            {
              from: "pages",
              allow: ["shared", "entities", "features", "widgets", "pages"],
            },
            {
              from: "app",
              allow: [
                "shared",
                "entities",
                "features",
                "widgets",
                "pages",
                "app",
              ],
            },
          ],
        },
      ],

      // Fast Refresh 관련
      "react-refresh/only-export-components": "off", // 하나의 파일은 하나의 컴포넌트만 export 해야한다.
    },
  },
]);
