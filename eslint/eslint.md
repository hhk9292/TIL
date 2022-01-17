# ESLint, Prettier

## ESLint

> 코드의 문법을 검사하는 린팅기능과 스타일을 잡아주는 포맷팅 기능
>
> 문법 에러 표시

## Prettier

> 코드의 스타일을 잡아주는 포맷팅

크게 두 가지 기능으로 나눌 수 있다.

- Formatting Rules
  - max-len, no-mixed-spaces-and-tabs, comma-style 등 코드의 포맷에 관한 규칙
  - prettier 사용
- Code-quality Rules
  - no-unused-vars, no-implicit-golobals 등 코드 품질에 관한 규칙
  - eslint 사용 (prettier는 이 기능이 없다)

### ESLint + Prettier 설정

#### 설치

```shell
npm i -D eslint prettier # eslint, prettier 설치
npm i -D eslint-config-prettier eslint-plugin-prettier # prettier와 충돌을 일으키는 eslint 규칙을 비활성화 하는 config, prettier 에서 인식하는 포맷상 오류를 ESLint 오류로 출력
npm i -D @typescript-eslint/eslint-plugin # typescript 관련 규칙을 설정
npm i -D @typescript-eslint/parser # typescript 파싱
```

#### ESLint 설정

```json
// .eslintrc
{
  "env": {
    // 사전에 정의된 글로벌 변수 사용
    "browser": true,
    "node": true,
    "es6": true // parseOptions의 ecmaVersion이 6으로 자동 설정
  },

  "globals": {
    // 그 외 전역변수 사용
  },

  // 구문 분석을 위한 파서 설정 Espree가 기본값
  "parser": "@typescript-eslint/parser", // 타입스크립트

  "plugins": [
    // 플러그인 이름의 'eslint-plugin' 생략 가능
    "prettier" // eslint-plugin-prettier
  ],

  "extends": [
    // 'eslint-config' 생략 가능
    "prettier" // eslint-config-prettier
  ],

  "rules": {
    // prettier와 용도를 분리하기 위해 코드 품질 관련된 룰만 설정
    // extends에서 불러온 설정을 덮어 쓸 수 있다.

    "no-unused-vars": "off", // "error", 2: ESLint 에러 발생, "warn", 1: 경고, "off", 0: 무시

    "semi": "error" // 이런 코드 포맷팅 설정은 prettier에서
  }
}
```

#### Prettier 설정

```json
{
  "printWidth": 80, // 에디터에서 한 줄에 표현하는 글자수
  "tabWidth": 2, // indent의 공백 숫자
  "useTabs": false, // space대신 tab 사용
  "semi": true, // 문장 마지막에 세미콜론 사용
  "singleQuote": true, // 작은따옴표(') 사용
  "trailingComma": "all", // 배열이나, 오브젝트 마지막 원소 뒤에 콤마
  "bracketSpacing": true, // 오브젝트 리터럴에서 괄호에 공백 추가 {foo: bar} => { foo: bar }
  "arrowParens": "always" // 화살표 함수에서 파라미터에 괄호 추가 "always": (x) => x, "avoid": x => x
}
```

### Cusotm Rules

#### AST

> Abstract Syntax Tree

```javascript
const a = 'test';
```

<details>
<summary>
AST 보기
</summary>

```json
{
  "type": "File",
  "start": 0,
  "end": 17,
  "loc": {
    "start": {
      "line": 1,
      "column": 0
    },
    "end": {
      "line": 1,
      "column": 17
    }
  },
  "range": [0, 17],
  "errors": [],
  "program": {
    "type": "Program",
    "start": 0,
    "end": 17,
    "loc": {
      "start": {
        "line": 1,
        "column": 0
      },
      "end": {
        "line": 1,
        "column": 17
      }
    },
    "range": [0, 17],
    "sourceType": "module",
    "interpreter": null,
    "body": [
      {
        "type": "VariableDeclaration",
        "start": 0,
        "end": 17,
        "loc": {
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 17
          }
        },
        "range": [0, 17],
        "declarations": [
          {
            "type": "VariableDeclarator",
            "start": 6,
            "end": 16,
            "loc": {
              "start": {
                "line": 1,
                "column": 6
              },
              "end": {
                "line": 1,
                "column": 16
              }
            },
            "range": [6, 16],
            "id": {
              "type": "Identifier",
              "start": 6,
              "end": 7,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 6
                },
                "end": {
                  "line": 1,
                  "column": 7
                },
                "identifierName": "a"
              },
              "range": [6, 7],
              "name": "a"
            },
            "init": {
              "type": "StringLiteral",
              "start": 10,
              "end": 16,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 10
                },
                "end": {
                  "line": 1,
                  "column": 16
                }
              },
              "range": [10, 16],
              "extra": {
                "rawValue": "test",
                "raw": "'test'"
              },
              "value": "test"
            }
          }
        ],
        "kind": "const"
      }
    ],
    "directives": []
  },
  "comments": [],
  "tokens": [
    {
      "type": {
        "label": "const",
        "keyword": "const",
        "beforeExpr": false,
        "startsExpr": false,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": false,
        "postfix": false,
        "binop": null,
        "updateContext": null
      },
      "value": "const",
      "start": 0,
      "end": 5,
      "loc": {
        "start": {
          "line": 1,
          "column": 0
        },
        "end": {
          "line": 1,
          "column": 5
        }
      }
    },
    {
      "type": {
        "label": "name",
        "beforeExpr": false,
        "startsExpr": true,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": false,
        "postfix": false,
        "binop": null,
        "updateContext": null
      },
      "value": "a",
      "start": 6,
      "end": 7,
      "loc": {
        "start": {
          "line": 1,
          "column": 6
        },
        "end": {
          "line": 1,
          "column": 7
        }
      }
    },
    {
      "type": {
        "label": "=",
        "beforeExpr": true,
        "startsExpr": false,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": true,
        "prefix": false,
        "postfix": false,
        "binop": null,
        "updateContext": null
      },
      "value": "=",
      "start": 8,
      "end": 9,
      "loc": {
        "start": {
          "line": 1,
          "column": 8
        },
        "end": {
          "line": 1,
          "column": 9
        }
      }
    },
    {
      "type": {
        "label": "string",
        "beforeExpr": false,
        "startsExpr": true,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": false,
        "postfix": false,
        "binop": null,
        "updateContext": null
      },
      "value": "test",
      "start": 10,
      "end": 16,
      "loc": {
        "start": {
          "line": 1,
          "column": 10
        },
        "end": {
          "line": 1,
          "column": 16
        }
      }
    },
    {
      "type": {
        "label": ";",
        "beforeExpr": true,
        "startsExpr": false,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": false,
        "postfix": false,
        "binop": null,
        "updateContext": null
      },
      "start": 16,
      "end": 17,
      "loc": {
        "start": {
          "line": 1,
          "column": 16
        },
        "end": {
          "line": 1,
          "column": 17
        }
      }
    },
    {
      "type": {
        "label": "eof",
        "beforeExpr": false,
        "startsExpr": false,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": false,
        "postfix": false,
        "binop": null,
        "updateContext": null
      },
      "start": 17,
      "end": 17,
      "loc": {
        "start": {
          "line": 1,
          "column": 17
        },
        "end": {
          "line": 1,
          "column": 17
        }
      }
    }
  ]
}
```

</details>

#### Custom Rule

```javascript
module.exports = {
  meta: {
    fixable: 'code',
  },

  create: (context) => {
    return {
      VariableDeclarator: (node) => {
        const { id, init, parent } = node;
        const { name } = id;
        const { value } = init;
        const { kind } = parent;

        const LOWER = /[a-z]/;

        if (kind === 'const' && LOWER.test(name) && typeof value === 'string') {
          context.report({
            node,
            data: { lowerCase: name },
            message: `{{lowerCase}} 대문자로`,
            fix: (fixer) => fixer.replaceText(id, name.toUpperCase()),
          });
        }
      },
    };
  },
};
```

#### eslintrc

```json
{
  "plugins": ["my-eslint-plugin"],
  "rules": {
    "my-eslint-plugin/const-upper-literal": "error"
  }
}
```

`$ npx eslint . --fix`

```javascript
const A = 'test';
```
