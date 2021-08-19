export default {
  type: 'Program',
  body: [
    {
      type: 'ImportStatement',
      names: [
        {
          type: 'Identifier',
          name: 'logging',
          loc: {
            start: {
              line: 1,
              column: 7
            },
            end: {
              line: 1,
              column: 14
            }
          }
        }
      ],
      module: null,
      loc: {
        start: {
          line: 1,
          column: 7
        },
        end: {
          line: 1,
          column: 14
        }
      }
    },
    {
      type: 'ImportStatement',
      names: [
        {
          type: 'Identifier',
          name: 'multiprocessing',
          loc: {
            start: {
              line: 2,
              column: 7
            },
            end: {
              line: 2,
              column: 22
            }
          }
        }
      ],
      module: null,
      loc: {
        start: {
          line: 2,
          column: 7
        },
        end: {
          line: 2,
          column: 22
        }
      }
    },
    {
      type: 'ImportStatement',
      names: [
        {
          type: 'Identifier',
          name: 'socket',
          loc: {
            start: {
              line: 3,
              column: 7
            },
            end: {
              line: 3,
              column: 13
            }
          }
        }
      ],
      module: null,
      loc: {
        start: {
          line: 3,
          column: 7
        },
        end: {
          line: 3,
          column: 13
        }
      }
    },
    {
      type: 'ImportStatement',
      names: [
        {
          type: 'Identifier',
          name: 'sys',
          loc: {
            start: {
              line: 4,
              column: 7
            },
            end: {
              line: 4,
              column: 10
            }
          }
        }
      ],
      module: null,
      loc: {
        start: {
          line: 4,
          column: 7
        },
        end: {
          line: 4,
          column: 10
        }
      }
    },
    {
      type: 'ImportStatement',
      names: [
        {
          type: 'Identifier',
          name: 'env_util',
          loc: {
            start: {
              line: 5,
              column: 24
            },
            end: {
              line: 5,
              column: 32
            }
          }
        }
      ],
      module: {
        type: 'MemberExpression',
        object: {
          type: 'Identifier',
          name: 'common',
          loc: {
            start: {
              line: 5,
              column: 5
            },
            end: {
              line: 5,
              column: 11
            }
          }
        },
        property: {
          type: 'Identifier',
          name: 'util',
          loc: {
            start: {
              line: 5,
              column: 12
            },
            end: {
              line: 5,
              column: 16
            }
          }
        },
        loc: {
          start: {
            line: 5,
            column: 5
          },
          end: {
            line: 5,
            column: 16
          }
        }
      },
      loc: {
        start: {
          line: 5,
          column: 5
        },
        end: {
          line: 5,
          column: 32
        }
      }
    },
    {
      type: 'ImportStatement',
      names: [
        {
          type: 'Identifier',
          name: 'log',
          loc: {
            start: {
              line: 6,
              column: 33
            },
            end: {
              line: 6,
              column: 36
            }
          }
        }
      ],
      module: {
        type: 'MemberExpression',
        object: {
          type: 'MemberExpression',
          object: {
            type: 'Identifier',
            name: 'common',
            loc: {
              start: {
                line: 6,
                column: 5
              },
              end: {
                line: 6,
                column: 11
              }
            }
          },
          property: {
            type: 'Identifier',
            name: 'util',
            loc: {
              start: {
                line: 6,
                column: 12
              },
              end: {
                line: 6,
                column: 16
              }
            }
          },
          loc: {
            start: {
              line: 6,
              column: 5
            },
            end: {
              line: 6,
              column: 16
            }
          }
        },
        property: {
          type: 'Identifier',
          name: 'log_util',
          loc: {
            start: {
              line: 6,
              column: 17
            },
            end: {
              line: 6,
              column: 25
            }
          }
        },
        loc: {
          start: {
            line: 6,
            column: 5
          },
          end: {
            line: 6,
            column: 25
          }
        }
      },
      loc: {
        start: {
          line: 6,
          column: 5
        },
        end: {
          line: 6,
          column: 36
        }
      }
    },
    {
      type: 'ImportStatement',
      names: [
        {
          type: 'Identifier',
          name: 'VERSION',
          loc: {
            start: {
              line: 7,
              column: 20
            },
            end: {
              line: 7,
              column: 27
            }
          }
        }
      ],
      module: {
        type: 'Identifier',
        name: 'version',
        loc: {
          start: {
            line: 7,
            column: 5
          },
          end: {
            line: 7,
            column: 12
          }
        }
      },
      loc: {
        start: {
          line: 7,
          column: 5
        },
        end: {
          line: 7,
          column: 27
        }
      }
    },
    {
      type: 'ImportStatement',
      names: [
        {
          type: 'Identifier',
          name: 'subprocess',
          loc: {
            start: {
              line: 8,
              column: 7
            },
            end: {
              line: 8,
              column: 17
            }
          }
        }
      ],
      module: null,
      loc: {
        start: {
          line: 8,
          column: 7
        },
        end: {
          line: 8,
          column: 17
        }
      }
    },
    {
      type: 'ImportStatement',
      names: [
        {
          type: 'Identifier',
          name: 'ctypes',
          loc: {
            start: {
              line: 9,
              column: 7
            },
            end: {
              line: 9,
              column: 13
            }
          }
        }
      ],
      module: null,
      loc: {
        start: {
          line: 9,
          column: 7
        },
        end: {
          line: 9,
          column: 13
        }
      }
    },
    {
      type: 'ImportStatement',
      names: [
        {
          type: 'Identifier',
          name: 'importlib',
          loc: {
            start: {
              line: 10,
              column: 7
            },
            end: {
              line: 10,
              column: 16
            }
          }
        }
      ],
      module: null,
      loc: {
        start: {
          line: 10,
          column: 7
        },
        end: {
          line: 10,
          column: 16
        }
      }
    },
    {
      type: 'ImportStatement',
      names: [
        {
          type: 'Identifier',
          name: 'getopt',
          loc: {
            start: {
              line: 11,
              column: 7
            },
            end: {
              line: 11,
              column: 13
            }
          }
        }
      ],
      module: null,
      loc: {
        start: {
          line: 11,
          column: 7
        },
        end: {
          line: 11,
          column: 13
        }
      }
    },
    {
      type: 'ImportStatement',
      names: [
        {
          type: 'Identifier',
          name: 'ws_server',
          loc: {
            start: {
              line: 12,
              column: 20
            },
            end: {
              line: 12,
              column: 29
            }
          }
        }
      ],
      module: {
        type: 'MemberExpression',
        object: {
          type: 'Identifier',
          name: 'core',
          loc: {
            start: {
              line: 12,
              column: 5
            },
            end: {
              line: 12,
              column: 9
            }
          }
        },
        property: {
          type: 'Identifier',
          name: 'ws',
          loc: {
            start: {
              line: 12,
              column: 10
            },
            end: {
              line: 12,
              column: 12
            }
          }
        },
        loc: {
          start: {
            line: 12,
            column: 5
          },
          end: {
            line: 12,
            column: 12
          }
        }
      },
      loc: {
        start: {
          line: 12,
          column: 5
        },
        end: {
          line: 12,
          column: 29
        }
      }
    },
    {
      type: 'ImportStatement',
      names: [
        {
          type: 'Identifier',
          name: 'os',
          loc: {
            start: {
              line: 13,
              column: 7
            },
            end: {
              line: 13,
              column: 9
            }
          }
        }
      ],
      module: null,
      loc: {
        start: {
          line: 13,
          column: 7
        },
        end: {
          line: 13,
          column: 9
        }
      }
    },
    {
      type: 'ImportStatement',
      names: [
        {
          type: 'Identifier',
          name: 'toolsInit',
          loc: {
            start: {
              line: 14,
              column: 31
            },
            end: {
              line: 14,
              column: 40
            }
          }
        }
      ],
      module: {
        type: 'MemberExpression',
        object: {
          type: 'Identifier',
          name: 'core',
          loc: {
            start: {
              line: 14,
              column: 5
            },
            end: {
              line: 14,
              column: 9
            }
          }
        },
        property: {
          type: 'Identifier',
          name: 'processGlobal',
          loc: {
            start: {
              line: 14,
              column: 10
            },
            end: {
              line: 14,
              column: 23
            }
          }
        },
        loc: {
          start: {
            line: 14,
            column: 5
          },
          end: {
            line: 14,
            column: 23
          }
        }
      },
      loc: {
        start: {
          line: 14,
          column: 5
        },
        end: {
          line: 14,
          column: 40
        }
      }
    },
    {
      type: 'ImportStatement',
      names: [
        {
          type: 'Identifier',
          name: 'warnings',
          loc: {
            start: {
              line: 16,
              column: 7
            },
            end: {
              line: 16,
              column: 15
            }
          }
        }
      ],
      module: null,
      loc: {
        start: {
          line: 16,
          column: 7
        },
        end: {
          line: 16,
          column: 15
        }
      }
    },
    {
      type: 'CallExpression',
      callee: {
        type: 'MemberExpression',
        object: {
          type: 'Identifier',
          name: 'warnings',
          loc: {
            start: {
              line: 17,
              column: 0
            },
            end: {
              line: 17,
              column: 8
            }
          }
        },
        property: {
          type: 'Identifier',
          name: 'filterwarnings',
          loc: {
            start: {
              line: 17,
              column: 9
            },
            end: {
              line: 17,
              column: 23
            }
          }
        },
        loc: {
          start: {
            line: 17,
            column: 0
          },
          end: {
            line: 17,
            column: 23
          }
        }
      },
      params: [
        {
          type: 'StringLiteral',
          value: 'ignore',
          raw: '"ignore"',
          loc: {
            start: {
              line: 17,
              column: 24
            },
            end: {
              line: 17,
              column: 32
            }
          }
        },
        {
          type: 'StringLiteral',
          value: '(?s).*MATPLOTLIBDATA.*',
          raw: '"(?s).*MATPLOTLIBDATA.*"',
          loc: {
            start: {
              line: 17,
              column: 34
            },
            end: {
              line: 17,
              column: 58
            }
          }
        }
      ],
      keywords: [
        {
          type: 'AssignmentParam',
          name: {
            type: 'Identifier',
            name: 'category',
            loc: {
              start: {
                line: 17,
                column: 60
              },
              end: {
                line: 17,
                column: 68
              }
            }
          },
          value: {
            type: 'Identifier',
            name: 'UserWarning',
            loc: {
              start: {
                line: 17,
                column: 69
              },
              end: {
                line: 17,
                column: 80
              }
            }
          },
          loc: {
            start: {
              line: 17,
              column: 60
            },
            end: {
              line: 17,
              column: 80
            }
          }
        }
      ],
      loc: {
        start: {
          line: 17,
          column: 0
        },
        end: {
          line: 17,
          column: 81
        }
      }
    },
    {
      type: 'ImportStatement',
      names: [
        {
          type: 'Identifier',
          name: 'pyautogui',
          loc: {
            start: {
              line: 20,
              column: 7
            },
            end: {
              line: 20,
              column: 16
            }
          }
        }
      ],
      module: null,
      loc: {
        start: {
          line: 20,
          column: 7
        },
        end: {
          line: 20,
          column: 16
        }
      }
    },
    {
      type: 'AssignmentExpression',
      targets: [
        {
          type: 'MemberExpression',
          object: {
            type: 'Identifier',
            name: 'pyautogui',
            loc: {
              start: {
                line: 21,
                column: 0
              },
              end: {
                line: 21,
                column: 9
              }
            }
          },
          property: {
            type: 'Identifier',
            name: 'FAILSAFE',
            loc: {
              start: {
                line: 21,
                column: 10
              },
              end: {
                line: 21,
                column: 18
              }
            }
          },
          loc: {
            start: {
              line: 21,
              column: 0
            },
            end: {
              line: 21,
              column: 18
            }
          }
        }
      ],
      operator: '=',
      value: {
        type: 'BooleanLiteral',
        value: false,
        loc: {
          start: {
            line: 21,
            column: 21
          },
          end: {
            line: 21,
            column: 26
          }
        }
      },
      loc: {
        start: {
          line: 21,
          column: 0
        },
        end: {
          line: 21,
          column: 26
        }
      }
    },
    {
      type: 'CallExpression',
      callee: {
        type: 'MemberExpression',
        object: {
          type: 'MemberExpression',
          object: {
            type: 'Identifier',
            name: 'sys',
            loc: {
              start: {
                line: 23,
                column: 0
              },
              end: {
                line: 23,
                column: 3
              }
            }
          },
          property: {
            type: 'Identifier',
            name: 'path',
            loc: {
              start: {
                line: 23,
                column: 4
              },
              end: {
                line: 23,
                column: 8
              }
            }
          },
          loc: {
            start: {
              line: 23,
              column: 0
            },
            end: {
              line: 23,
              column: 8
            }
          }
        },
        property: {
          type: 'Identifier',
          name: 'insert',
          loc: {
            start: {
              line: 23,
              column: 9
            },
            end: {
              line: 23,
              column: 15
            }
          }
        },
        loc: {
          start: {
            line: 23,
            column: 0
          },
          end: {
            line: 23,
            column: 15
          }
        }
      },
      params: [
        {
          type: 'UnaryExpression',
          oprator: '-',
          argument: {
            type: 'NumberLiteral',
            value: 1,
            raw: '1',
            loc: {
              start: {
                line: 23,
                column: 17
              },
              end: {
                line: 23,
                column: 18
              }
            }
          },
          loc: {
            start: {
              line: 23,
              column: 16
            },
            end: {
              line: 23,
              column: 18
            }
          }
        },
        {
          type: 'CallExpression',
          callee: {
            type: 'MemberExpression',
            object: {
              type: 'Identifier',
              name: 'env_util',
              loc: {
                start: {
                  line: 23,
                  column: 20
                },
                end: {
                  line: 23,
                  column: 28
                }
              }
            },
            property: {
              type: 'Identifier',
              name: 'root',
              loc: {
                start: {
                  line: 23,
                  column: 29
                },
                end: {
                  line: 23,
                  column: 33
                }
              }
            },
            loc: {
              start: {
                line: 23,
                column: 20
              },
              end: {
                line: 23,
                column: 33
              }
            }
          },
          params: [
            {
              type: 'StringLiteral',
              value: 'resource/extend/python',
              raw: '"resource/extend/python"',
              loc: {
                start: {
                  line: 23,
                  column: 34
                },
                end: {
                  line: 23,
                  column: 58
                }
              }
            }
          ],
          keywords: [],
          loc: {
            start: {
              line: 23,
              column: 20
            },
            end: {
              line: 23,
              column: 59
            }
          }
        }
      ],
      keywords: [],
      loc: {
        start: {
          line: 23,
          column: 0
        },
        end: {
          line: 23,
          column: 60
        }
      }
    },
    {
      type: 'CallExpression',
      callee: {
        type: 'MemberExpression',
        object: {
          type: 'MemberExpression',
          object: {
            type: 'Identifier',
            name: 'sys',
            loc: {
              start: {
                line: 25,
                column: 0
              },
              end: {
                line: 25,
                column: 3
              }
            }
          },
          property: {
            type: 'Identifier',
            name: 'path',
            loc: {
              start: {
                line: 25,
                column: 4
              },
              end: {
                line: 25,
                column: 8
              }
            }
          },
          loc: {
            start: {
              line: 25,
              column: 0
            },
            end: {
              line: 25,
              column: 8
            }
          }
        },
        property: {
          type: 'Identifier',
          name: 'insert',
          loc: {
            start: {
              line: 25,
              column: 9
            },
            end: {
              line: 25,
              column: 15
            }
          }
        },
        loc: {
          start: {
            line: 25,
            column: 0
          },
          end: {
            line: 25,
            column: 15
          }
        }
      },
      params: [
        {
          type: 'NumberLiteral',
          value: 0,
          raw: '0',
          loc: {
            start: {
              line: 25,
              column: 16
            },
            end: {
              line: 25,
              column: 17
            }
          }
        },
        {
          type: 'CallExpression',
          callee: {
            type: 'MemberExpression',
            object: {
              type: 'Identifier',
              name: 'env_util',
              loc: {
                start: {
                  line: 25,
                  column: 19
                },
                end: {
                  line: 25,
                  column: 27
                }
              }
            },
            property: {
              type: 'Identifier',
              name: 'root',
              loc: {
                start: {
                  line: 25,
                  column: 28
                },
                end: {
                  line: 25,
                  column: 32
                }
              }
            },
            loc: {
              start: {
                line: 25,
                column: 19
              },
              end: {
                line: 25,
                column: 32
              }
            }
          },
          params: [
            {
              type: 'StringLiteral',
              value: 'plugins',
              raw: '"plugins"',
              loc: {
                start: {
                  line: 25,
                  column: 33
                },
                end: {
                  line: 25,
                  column: 42
                }
              }
            }
          ],
          keywords: [],
          loc: {
            start: {
              line: 25,
              column: 19
            },
            end: {
              line: 25,
              column: 43
            }
          }
        }
      ],
      keywords: [],
      loc: {
        start: {
          line: 25,
          column: 0
        },
        end: {
          line: 25,
          column: 44
        }
      }
    },
    {
      type: 'CallExpression',
      callee: {
        type: 'MemberExpression',
        object: {
          type: 'MemberExpression',
          object: {
            type: 'Identifier',
            name: 'sys',
            loc: {
              start: {
                line: 27,
                column: 0
              },
              end: {
                line: 27,
                column: 3
              }
            }
          },
          property: {
            type: 'Identifier',
            name: 'path',
            loc: {
              start: {
                line: 27,
                column: 4
              },
              end: {
                line: 27,
                column: 8
              }
            }
          },
          loc: {
            start: {
              line: 27,
              column: 0
            },
            end: {
              line: 27,
              column: 8
            }
          }
        },
        property: {
          type: 'Identifier',
          name: 'insert',
          loc: {
            start: {
              line: 27,
              column: 9
            },
            end: {
              line: 27,
              column: 15
            }
          }
        },
        loc: {
          start: {
            line: 27,
            column: 0
          },
          end: {
            line: 27,
            column: 15
          }
        }
      },
      params: [
        {
          type: 'NumberLiteral',
          value: 1,
          raw: '1',
          loc: {
            start: {
              line: 27,
              column: 16
            },
            end: {
              line: 27,
              column: 17
            }
          }
        },
        {
          type: 'CallExpression',
          callee: {
            type: 'MemberExpression',
            object: {
              type: 'Identifier',
              name: 'env_util',
              loc: {
                start: {
                  line: 27,
                  column: 19
                },
                end: {
                  line: 27,
                  column: 27
                }
              }
            },
            property: {
              type: 'Identifier',
              name: 'GetAppDataPath',
              loc: {
                start: {
                  line: 27,
                  column: 28
                },
                end: {
                  line: 27,
                  column: 42
                }
              }
            },
            loc: {
              start: {
                line: 27,
                column: 19
              },
              end: {
                line: 27,
                column: 42
              }
            }
          },
          params: [
            {
              type: 'StringLiteral',
              value: '',
              raw: '""',
              loc: {
                start: {
                  line: 27,
                  column: 43
                },
                end: {
                  line: 27,
                  column: 45
                }
              }
            }
          ],
          keywords: [],
          loc: {
            start: {
              line: 27,
              column: 19
            },
            end: {
              line: 27,
              column: 46
            }
          }
        }
      ],
      keywords: [],
      loc: {
        start: {
          line: 27,
          column: 0
        },
        end: {
          line: 27,
          column: 47
        }
      }
    },
    {
      type: 'CallExpression',
      callee: {
        type: 'MemberExpression',
        object: {
          type: 'Identifier',
          name: 'env_util',
          loc: {
            start: {
              line: 29,
              column: 0
            },
            end: {
              line: 29,
              column: 8
            }
          }
        },
        property: {
          type: 'Identifier',
          name: 'setMode',
          loc: {
            start: {
              line: 29,
              column: 9
            },
            end: {
              line: 29,
              column: 16
            }
          }
        },
        loc: {
          start: {
            line: 29,
            column: 0
          },
          end: {
            line: 29,
            column: 16
          }
        }
      },
      params: [
        {
          type: 'MemberExpression',
          object: {
            type: 'Identifier',
            name: 'env_util',
            loc: {
              start: {
                line: 29,
                column: 17
              },
              end: {
                line: 29,
                column: 25
              }
            }
          },
          property: {
            type: 'Identifier',
            name: 'MODE_SERVER',
            loc: {
              start: {
                line: 29,
                column: 26
              },
              end: {
                line: 29,
                column: 37
              }
            }
          },
          loc: {
            start: {
              line: 29,
              column: 17
            },
            end: {
              line: 29,
              column: 37
            }
          }
        }
      ],
      keywords: [],
      loc: {
        start: {
          line: 29,
          column: 0
        },
        end: {
          line: 29,
          column: 38
        }
      }
    },
    {
      type: 'FunctionDeclaration',
      id: {
        type: 'Identifier',
        name: 'is_admin',
        loc: {
          start: {
            line: 32,
            column: 4
          },
          end: {
            line: 32,
            column: 12
          }
        }
      },
      params: [],
      defaults: [],
      body: {
        type: 'BlockStatement',
        body: [
          {
            type: 'TryStatement',
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'keyword',
                  value: 'return',
                  loc: {
                    start: {
                      line: 34,
                      column: 8
                    },
                    end: {
                      line: 34,
                      column: 14
                    }
                  }
                },
                {
                  type: 'CallExpression',
                  callee: {
                    type: 'MemberExpression',
                    object: {
                      type: 'MemberExpression',
                      object: {
                        type: 'MemberExpression',
                        object: {
                          type: 'Identifier',
                          name: 'ctypes',
                          loc: {
                            start: {
                              line: 34,
                              column: 15
                            },
                            end: {
                              line: 34,
                              column: 21
                            }
                          }
                        },
                        property: {
                          type: 'Identifier',
                          name: 'windll',
                          loc: {
                            start: {
                              line: 34,
                              column: 22
                            },
                            end: {
                              line: 34,
                              column: 28
                            }
                          }
                        },
                        loc: {
                          start: {
                            line: 34,
                            column: 15
                          },
                          end: {
                            line: 34,
                            column: 28
                          }
                        }
                      },
                      property: {
                        type: 'Identifier',
                        name: 'shell32',
                        loc: {
                          start: {
                            line: 34,
                            column: 29
                          },
                          end: {
                            line: 34,
                            column: 36
                          }
                        }
                      },
                      loc: {
                        start: {
                          line: 34,
                          column: 15
                        },
                        end: {
                          line: 34,
                          column: 36
                        }
                      }
                    },
                    property: {
                      type: 'Identifier',
                      name: 'IsUserAnAdmin',
                      loc: {
                        start: {
                          line: 34,
                          column: 37
                        },
                        end: {
                          line: 34,
                          column: 50
                        }
                      }
                    },
                    loc: {
                      start: {
                        line: 34,
                        column: 15
                      },
                      end: {
                        line: 34,
                        column: 50
                      }
                    }
                  },
                  params: [],
                  keywords: [],
                  loc: {
                    start: {
                      line: 34,
                      column: 15
                    },
                    end: {
                      line: 34,
                      column: 52
                    }
                  }
                }
              ],
              loc: {
                start: {
                  line: 33,
                  column: 7
                },
                end: {
                  line: 34,
                  column: 52
                }
              }
            },
            handlers: [
              {
                type: 'ExceptHandler',
                body: {
                  type: 'BlockStatement',
                  body: [
                    {
                      type: 'keyword',
                      value: 'return',
                      loc: {
                        start: {
                          line: 36,
                          column: 8
                        },
                        end: {
                          line: 36,
                          column: 14
                        }
                      }
                    },
                    {
                      type: 'BooleanLiteral',
                      value: false,
                      loc: {
                        start: {
                          line: 36,
                          column: 15
                        },
                        end: {
                          line: 36,
                          column: 20
                        }
                      }
                    }
                  ],
                  loc: {
                    start: {
                      line: 35,
                      column: 10
                    },
                    end: {
                      line: 36,
                      column: 20
                    }
                  }
                },
                errName: undefined,
                name: undefined,
                loc: {
                  start: {
                    line: 35,
                    column: 4
                  },
                  end: {
                    line: 36,
                    column: 20
                  }
                }
              }
            ],
            finalBody: null,
            loc: {
              start: {
                line: 33,
                column: 7
              },
              end: {
                line: 36,
                column: 20
              }
            }
          }
        ],
        loc: {
          start: {
            line: 32,
            column: 14
          },
          end: {
            line: 36,
            column: 20
          }
        }
      },
      loc: {
        start: {
          line: 32,
          column: 0
        },
        end: {
          line: 36,
          column: 20
        }
      }
    },
    {
      type: 'FunctionDeclaration',
      id: {
        type: 'Identifier',
        name: 'directRun',
        loc: {
          start: {
            line: 38,
            column: 4
          },
          end: {
            line: 38,
            column: 13
          }
        }
      },
      params: [
        {
          type: 'Identifier',
          name: 'runDir',
          loc: {
            start: {
              line: 38,
              column: 14
            },
            end: {
              line: 38,
              column: 20
            }
          }
        },
        {
          type: 'Identifier',
          name: 'path',
          loc: {
            start: {
              line: 38,
              column: 21
            },
            end: {
              line: 38,
              column: 25
            }
          }
        }
      ],
      defaults: [],
      body: {
        type: 'BlockStatement',
        body: [
          {
            type: 'IfStatement',
            test: {
              type: 'Identifier',
              name: 'path',
              loc: {
                start: {
                  line: 40,
                  column: 7
                },
                end: {
                  line: 40,
                  column: 11
                }
              }
            },
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'CallExpression',
                  callee: {
                    type: 'MemberExpression',
                    object: {
                      type: 'MemberExpression',
                      object: {
                        type: 'Identifier',
                        name: 'sys',
                        loc: {
                          start: {
                            line: 41,
                            column: 8
                          },
                          end: {
                            line: 41,
                            column: 11
                          }
                        }
                      },
                      property: {
                        type: 'Identifier',
                        name: 'path',
                        loc: {
                          start: {
                            line: 41,
                            column: 12
                          },
                          end: {
                            line: 41,
                            column: 16
                          }
                        }
                      },
                      loc: {
                        start: {
                          line: 41,
                          column: 8
                        },
                        end: {
                          line: 41,
                          column: 16
                        }
                      }
                    },
                    property: {
                      type: 'Identifier',
                      name: 'insert',
                      loc: {
                        start: {
                          line: 41,
                          column: 17
                        },
                        end: {
                          line: 41,
                          column: 23
                        }
                      }
                    },
                    loc: {
                      start: {
                        line: 41,
                        column: 8
                      },
                      end: {
                        line: 41,
                        column: 23
                      }
                    }
                  },
                  params: [
                    {
                      type: 'NumberLiteral',
                      value: 0,
                      raw: '0',
                      loc: {
                        start: {
                          line: 41,
                          column: 24
                        },
                        end: {
                          line: 41,
                          column: 25
                        }
                      }
                    },
                    {
                      type: 'MemberExpression',
                      object: {
                        type: 'Identifier',
                        name: 'path',
                        loc: {
                          start: {
                            line: 41,
                            column: 27
                          },
                          end: {
                            line: 41,
                            column: 31
                          }
                        }
                      },
                      property: {
                        type: 'SliceExpression',
                        lower: {
                          type: 'NumberLiteral',
                          value: 0,
                          raw: '0',
                          loc: {
                            start: {
                              line: 41,
                              column: 32
                            },
                            end: {
                              line: 41,
                              column: 33
                            }
                          }
                        },
                        upper: undefined,
                        step: undefined,
                        loc: {
                          start: {
                            line: 41,
                            column: 32
                          },
                          end: {
                            line: 41,
                            column: 33
                          }
                        }
                      },
                      loc: {
                        start: {
                          line: 41,
                          column: 27
                        },
                        end: {
                          line: 41,
                          column: 33
                        }
                      }
                    }
                  ],
                  keywords: [],
                  loc: {
                    start: {
                      line: 41,
                      column: 8
                    },
                    end: {
                      line: 41,
                      column: 35
                    }
                  }
                },
                {
                  type: 'CallExpression',
                  callee: {
                    type: 'Identifier',
                    name: 'toolsInit',
                    loc: {
                      start: {
                        line: 42,
                        column: 8
                      },
                      end: {
                        line: 42,
                        column: 17
                      }
                    }
                  },
                  params: [],
                  keywords: [
                    {
                      type: 'AssignmentParam',
                      name: {
                        type: 'Identifier',
                        name: 'path',
                        loc: {
                          start: {
                            line: 42,
                            column: 18
                          },
                          end: {
                            line: 42,
                            column: 22
                          }
                        }
                      },
                      value: {
                        type: 'MemberExpression',
                        object: {
                          type: 'Identifier',
                          name: 'path',
                          loc: {
                            start: {
                              line: 42,
                              column: 23
                            },
                            end: {
                              line: 42,
                              column: 27
                            }
                          }
                        },
                        property: {
                          type: 'SliceExpression',
                          lower: {
                            type: 'NumberLiteral',
                            value: 0,
                            raw: '0',
                            loc: {
                              start: {
                                line: 42,
                                column: 28
                              },
                              end: {
                                line: 42,
                                column: 29
                              }
                            }
                          },
                          upper: undefined,
                          step: undefined,
                          loc: {
                            start: {
                              line: 42,
                              column: 28
                            },
                            end: {
                              line: 42,
                              column: 29
                            }
                          }
                        },
                        loc: {
                          start: {
                            line: 42,
                            column: 23
                          },
                          end: {
                            line: 42,
                            column: 29
                          }
                        }
                      },
                      loc: {
                        start: {
                          line: 42,
                          column: 18
                        },
                        end: {
                          line: 42,
                          column: 29
                        }
                      }
                    }
                  ],
                  loc: {
                    start: {
                      line: 42,
                      column: 8
                    },
                    end: {
                      line: 42,
                      column: 31
                    }
                  }
                }
              ],
              loc: {
                start: {
                  line: 40,
                  column: 11
                },
                end: {
                  line: 42,
                  column: 31
                }
              }
            },
            alternate: null,
            loc: {
              start: {
                line: 40,
                column: 4
              },
              end: {
                line: 42,
                column: 31
              }
            }
          },
          {
            type: 'AssignmentExpression',
            targets: [
              {
                type: 'Identifier',
                name: 'module',
                loc: {
                  start: {
                    line: 45,
                    column: 4
                  },
                  end: {
                    line: 45,
                    column: 10
                  }
                }
              }
            ],
            operator: '=',
            value: {
              type: 'CallExpression',
              callee: {
                type: 'MemberExpression',
                object: {
                  type: 'Identifier',
                  name: 'importlib',
                  loc: {
                    start: {
                      line: 45,
                      column: 13
                    },
                    end: {
                      line: 45,
                      column: 22
                    }
                  }
                },
                property: {
                  type: 'Identifier',
                  name: 'import_module',
                  loc: {
                    start: {
                      line: 45,
                      column: 23
                    },
                    end: {
                      line: 45,
                      column: 36
                    }
                  }
                },
                loc: {
                  start: {
                    line: 45,
                    column: 13
                  },
                  end: {
                    line: 45,
                    column: 36
                  }
                }
              },
              params: [
                {
                  type: 'BinaryExpression',
                  operator: '+',
                  left: {
                    type: 'BinaryExpression',
                    operator: '+',
                    left: {
                      type: 'StringLiteral',
                      value: 'sandbox.',
                      raw: '"sandbox."',
                      loc: {
                        start: {
                          line: 45,
                          column: 37
                        },
                        end: {
                          line: 45,
                          column: 47
                        }
                      }
                    },
                    right: {
                      type: 'Identifier',
                      name: 'runDir',
                      loc: {
                        start: {
                          line: 45,
                          column: 48
                        },
                        end: {
                          line: 45,
                          column: 54
                        }
                      }
                    },
                    loc: {
                      start: {
                        line: 45,
                        column: 37
                      },
                      end: {
                        line: 45,
                        column: 54
                      }
                    }
                  },
                  right: {
                    type: 'StringLiteral',
                    value: '.main',
                    raw: '".main"',
                    loc: {
                      start: {
                        line: 45,
                        column: 55
                      },
                      end: {
                        line: 45,
                        column: 62
                      }
                    }
                  },
                  loc: {
                    start: {
                      line: 45,
                      column: 37
                    },
                    end: {
                      line: 45,
                      column: 62
                    }
                  }
                }
              ],
              keywords: [],
              loc: {
                start: {
                  line: 45,
                  column: 13
                },
                end: {
                  line: 45,
                  column: 63
                }
              }
            },
            loc: {
              start: {
                line: 45,
                column: 4
              },
              end: {
                line: 45,
                column: 63
              }
            }
          },
          {
            type: 'AssignmentExpression',
            targets: [
              {
                type: 'Identifier',
                name: 'rpa',
                loc: {
                  start: {
                    line: 46,
                    column: 4
                  },
                  end: {
                    line: 46,
                    column: 7
                  }
                }
              }
            ],
            operator: '=',
            value: {
              type: 'CallExpression',
              callee: {
                type: 'MemberExpression',
                object: {
                  type: 'Identifier',
                  name: 'module',
                  loc: {
                    start: {
                      line: 46,
                      column: 10
                    },
                    end: {
                      line: 46,
                      column: 16
                    }
                  }
                },
                property: {
                  type: 'Identifier',
                  name: 'RPAProject',
                  loc: {
                    start: {
                      line: 46,
                      column: 17
                    },
                    end: {
                      line: 46,
                      column: 27
                    }
                  }
                },
                loc: {
                  start: {
                    line: 46,
                    column: 10
                  },
                  end: {
                    line: 46,
                    column: 27
                  }
                }
              },
              params: [],
              keywords: [],
              loc: {
                start: {
                  line: 46,
                  column: 10
                },
                end: {
                  line: 46,
                  column: 29
                }
              }
            },
            loc: {
              start: {
                line: 46,
                column: 4
              },
              end: {
                line: 46,
                column: 29
              }
            }
          },
          {
            type: 'AssignmentExpression',
            targets: [
              {
                type: 'MemberExpression',
                object: {
                  type: 'Identifier',
                  name: 'rpa',
                  loc: {
                    start: {
                      line: 47,
                      column: 4
                    },
                    end: {
                      line: 47,
                      column: 7
                    }
                  }
                },
                property: {
                  type: 'Identifier',
                  name: 'sandbox',
                  loc: {
                    start: {
                      line: 47,
                      column: 8
                    },
                    end: {
                      line: 47,
                      column: 15
                    }
                  }
                },
                loc: {
                  start: {
                    line: 47,
                    column: 4
                  },
                  end: {
                    line: 47,
                    column: 15
                  }
                }
              }
            ],
            operator: '=',
            value: {
              type: 'DictionaryExpression',
              properties: [
                {
                  type: 'DictionaryProperty',
                  key: {
                    type: 'StringLiteral',
                    value: 'name',
                    raw: '"name"',
                    loc: {
                      start: {
                        line: 47,
                        column: 19
                      },
                      end: {
                        line: 47,
                        column: 25
                      }
                    }
                  },
                  value: {
                    type: 'StringLiteral',
                    value: 'debug',
                    raw: '"debug"',
                    loc: {
                      start: {
                        line: 47,
                        column: 27
                      },
                      end: {
                        line: 47,
                        column: 34
                      }
                    }
                  },
                  loc: {
                    start: {
                      line: 47,
                      column: 19
                    },
                    end: {
                      line: 47,
                      column: 34
                    }
                  }
                },
                {
                  type: 'DictionaryProperty',
                  key: {
                    type: 'StringLiteral',
                    value: 'path',
                    raw: '"path"',
                    loc: {
                      start: {
                        line: 47,
                        column: 36
                      },
                      end: {
                        line: 47,
                        column: 42
                      }
                    }
                  },
                  value: {
                    type: 'StringLiteral',
                    value: 'debug',
                    raw: '"debug"',
                    loc: {
                      start: {
                        line: 47,
                        column: 44
                      },
                      end: {
                        line: 47,
                        column: 51
                      }
                    }
                  },
                  loc: {
                    start: {
                      line: 47,
                      column: 36
                    },
                    end: {
                      line: 47,
                      column: 51
                    }
                  }
                }
              ],
              loc: {
                start: {
                  line: 47,
                  column: 18
                },
                end: {
                  line: 47,
                  column: 52
                }
              }
            },
            loc: {
              start: {
                line: 47,
                column: 4
              },
              end: {
                line: 47,
                column: 52
              }
            }
          },
          {
            type: 'CallExpression',
            callee: {
              type: 'MemberExpression',
              object: {
                type: 'Identifier',
                name: 'log',
                loc: {
                  start: {
                    line: 49,
                    column: 4
                  },
                  end: {
                    line: 49,
                    column: 7
                  }
                }
              },
              property: {
                type: 'Identifier',
                name: 'info',
                loc: {
                  start: {
                    line: 49,
                    column: 8
                  },
                  end: {
                    line: 49,
                    column: 12
                  }
                }
              },
              loc: {
                start: {
                  line: 49,
                  column: 4
                },
                end: {
                  line: 49,
                  column: 12
                }
              }
            },
            params: [
              {
                type: 'StringLiteral',
                value: '------------ rpa.main() start -----------',
                raw: '"------------ rpa.main() start -----------"',
                loc: {
                  start: {
                    line: 49,
                    column: 13
                  },
                  end: {
                    line: 49,
                    column: 56
                  }
                }
              }
            ],
            keywords: [],
            loc: {
              start: {
                line: 49,
                column: 4
              },
              end: {
                line: 49,
                column: 57
              }
            }
          },
          {
            type: 'TryStatement',
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'CallExpression',
                  callee: {
                    type: 'MemberExpression',
                    object: {
                      type: 'Identifier',
                      name: 'rpa',
                      loc: {
                        start: {
                          line: 51,
                          column: 8
                        },
                        end: {
                          line: 51,
                          column: 11
                        }
                      }
                    },
                    property: {
                      type: 'Identifier',
                      name: 'main',
                      loc: {
                        start: {
                          line: 51,
                          column: 12
                        },
                        end: {
                          line: 51,
                          column: 16
                        }
                      }
                    },
                    loc: {
                      start: {
                        line: 51,
                        column: 8
                      },
                      end: {
                        line: 51,
                        column: 16
                      }
                    }
                  },
                  params: [],
                  keywords: [],
                  loc: {
                    start: {
                      line: 51,
                      column: 8
                    },
                    end: {
                      line: 51,
                      column: 18
                    }
                  }
                }
              ],
              loc: {
                start: {
                  line: 50,
                  column: 7
                },
                end: {
                  line: 51,
                  column: 18
                }
              }
            },
            handlers: [
              {
                type: 'ExceptHandler',
                body: {
                  type: 'BlockStatement',
                  body: [
                    {
                      type: 'EmptyStatement',
                      loc: {
                        start: {
                          line: 53,
                          column: 8
                        },
                        end: {
                          line: 53,
                          column: 12
                        }
                      }
                    }
                  ],
                  loc: {
                    start: {
                      line: 52,
                      column: 10
                    },
                    end: {
                      line: 53,
                      column: 12
                    }
                  }
                },
                errName: undefined,
                name: undefined,
                loc: {
                  start: {
                    line: 52,
                    column: 4
                  },
                  end: {
                    line: 53,
                    column: 12
                  }
                }
              }
            ],
            finalBody: null,
            loc: {
              start: {
                line: 50,
                column: 7
              },
              end: {
                line: 53,
                column: 12
              }
            }
          },
          {
            type: 'CallExpression',
            callee: {
              type: 'MemberExpression',
              object: {
                type: 'Identifier',
                name: 'log',
                loc: {
                  start: {
                    line: 54,
                    column: 4
                  },
                  end: {
                    line: 54,
                    column: 7
                  }
                }
              },
              property: {
                type: 'Identifier',
                name: 'info',
                loc: {
                  start: {
                    line: 54,
                    column: 8
                  },
                  end: {
                    line: 54,
                    column: 12
                  }
                }
              },
              loc: {
                start: {
                  line: 54,
                  column: 4
                },
                end: {
                  line: 54,
                  column: 12
                }
              }
            },
            params: [
              {
                type: 'StringLiteral',
                value: '------------ rpa.main() end -----------',
                raw: '"------------ rpa.main() end -----------"',
                loc: {
                  start: {
                    line: 54,
                    column: 13
                  },
                  end: {
                    line: 54,
                    column: 54
                  }
                }
              }
            ],
            keywords: [],
            loc: {
              start: {
                line: 54,
                column: 4
              },
              end: {
                line: 54,
                column: 55
              }
            }
          }
        ],
        loc: {
          start: {
            line: 38,
            column: 26
          },
          end: {
            line: 54,
            column: 55
          }
        }
      },
      loc: {
        start: {
          line: 38,
          column: 0
        },
        end: {
          line: 54,
          column: 55
        }
      }
    },
    {
      type: 'FunctionDeclaration',
      id: {
        type: 'Identifier',
        name: 'get_port_status',
        loc: {
          start: {
            line: 58,
            column: 4
          },
          end: {
            line: 58,
            column: 19
          }
        }
      },
      params: [
        {
          type: 'Identifier',
          name: 'port',
          loc: {
            start: {
              line: 58,
              column: 20
            },
            end: {
              line: 58,
              column: 24
            }
          }
        }
      ],
      defaults: [],
      body: {
        type: 'BlockStatement',
        body: [
          {
            type: 'AssignmentExpression',
            targets: [
              {
                type: 'Identifier',
                name: 'ip',
                loc: {
                  start: {
                    line: 59,
                    column: 4
                  },
                  end: {
                    line: 59,
                    column: 6
                  }
                }
              }
            ],
            operator: '=',
            value: {
              type: 'StringLiteral',
              value: '127.0.0.1',
              raw: '"127.0.0.1"',
              loc: {
                start: {
                  line: 59,
                  column: 9
                },
                end: {
                  line: 59,
                  column: 20
                }
              }
            },
            loc: {
              start: {
                line: 59,
                column: 4
              },
              end: {
                line: 59,
                column: 20
              }
            }
          },
          {
            type: 'AssignmentExpression',
            targets: [
              {
                type: 'Identifier',
                name: 'server',
                loc: {
                  start: {
                    line: 60,
                    column: 4
                  },
                  end: {
                    line: 60,
                    column: 10
                  }
                }
              }
            ],
            operator: '=',
            value: {
              type: 'CallExpression',
              callee: {
                type: 'MemberExpression',
                object: {
                  type: 'Identifier',
                  name: 'socket',
                  loc: {
                    start: {
                      line: 60,
                      column: 13
                    },
                    end: {
                      line: 60,
                      column: 19
                    }
                  }
                },
                property: {
                  type: 'Identifier',
                  name: 'socket',
                  loc: {
                    start: {
                      line: 60,
                      column: 20
                    },
                    end: {
                      line: 60,
                      column: 26
                    }
                  }
                },
                loc: {
                  start: {
                    line: 60,
                    column: 13
                  },
                  end: {
                    line: 60,
                    column: 26
                  }
                }
              },
              params: [
                {
                  type: 'MemberExpression',
                  object: {
                    type: 'Identifier',
                    name: 'socket',
                    loc: {
                      start: {
                        line: 60,
                        column: 27
                      },
                      end: {
                        line: 60,
                        column: 33
                      }
                    }
                  },
                  property: {
                    type: 'Identifier',
                    name: 'AF_INET',
                    loc: {
                      start: {
                        line: 60,
                        column: 34
                      },
                      end: {
                        line: 60,
                        column: 41
                      }
                    }
                  },
                  loc: {
                    start: {
                      line: 60,
                      column: 27
                    },
                    end: {
                      line: 60,
                      column: 41
                    }
                  }
                },
                {
                  type: 'MemberExpression',
                  object: {
                    type: 'Identifier',
                    name: 'socket',
                    loc: {
                      start: {
                        line: 60,
                        column: 43
                      },
                      end: {
                        line: 60,
                        column: 49
                      }
                    }
                  },
                  property: {
                    type: 'Identifier',
                    name: 'SOCK_STREAM',
                    loc: {
                      start: {
                        line: 60,
                        column: 50
                      },
                      end: {
                        line: 60,
                        column: 61
                      }
                    }
                  },
                  loc: {
                    start: {
                      line: 60,
                      column: 43
                    },
                    end: {
                      line: 60,
                      column: 61
                    }
                  }
                }
              ],
              keywords: [],
              loc: {
                start: {
                  line: 60,
                  column: 13
                },
                end: {
                  line: 60,
                  column: 62
                }
              }
            },
            loc: {
              start: {
                line: 60,
                column: 4
              },
              end: {
                line: 60,
                column: 62
              }
            }
          },
          {
            type: 'TryStatement',
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'CallExpression',
                  callee: {
                    type: 'MemberExpression',
                    object: {
                      type: 'Identifier',
                      name: 'server',
                      loc: {
                        start: {
                          line: 62,
                          column: 8
                        },
                        end: {
                          line: 62,
                          column: 14
                        }
                      }
                    },
                    property: {
                      type: 'Identifier',
                      name: 'connect',
                      loc: {
                        start: {
                          line: 62,
                          column: 15
                        },
                        end: {
                          line: 62,
                          column: 22
                        }
                      }
                    },
                    loc: {
                      start: {
                        line: 62,
                        column: 8
                      },
                      end: {
                        line: 62,
                        column: 22
                      }
                    }
                  },
                  params: [
                    {
                      type: 'TupleExpression',
                      elements: [
                        {
                          type: 'Identifier',
                          name: 'ip',
                          loc: {
                            start: {
                              line: 62,
                              column: 24
                            },
                            end: {
                              line: 62,
                              column: 26
                            }
                          }
                        },
                        {
                          type: 'Identifier',
                          name: 'port',
                          loc: {
                            start: {
                              line: 62,
                              column: 28
                            },
                            end: {
                              line: 62,
                              column: 32
                            }
                          }
                        }
                      ],
                      loc: {
                        start: {
                          line: 62,
                          column: 24
                        },
                        end: {
                          line: 62,
                          column: 32
                        }
                      },
                      extra: {
                        parenthesized: true,
                        parentStart: {
                          line: 62,
                          column: 23
                        }
                      }
                    }
                  ],
                  keywords: [],
                  loc: {
                    start: {
                      line: 62,
                      column: 8
                    },
                    end: {
                      line: 62,
                      column: 34
                    }
                  }
                },
                {
                  type: 'CallExpression',
                  callee: {
                    type: 'MemberExpression',
                    object: {
                      type: 'Identifier',
                      name: 'log',
                      loc: {
                        start: {
                          line: 63,
                          column: 8
                        },
                        end: {
                          line: 63,
                          column: 11
                        }
                      }
                    },
                    property: {
                      type: 'Identifier',
                      name: 'info',
                      loc: {
                        start: {
                          line: 63,
                          column: 12
                        },
                        end: {
                          line: 63,
                          column: 16
                        }
                      }
                    },
                    loc: {
                      start: {
                        line: 63,
                        column: 8
                      },
                      end: {
                        line: 63,
                        column: 16
                      }
                    }
                  },
                  params: [
                    {
                      type: 'CallExpression',
                      callee: {
                        type: 'MemberExpression',
                        object: {
                          type: 'StringLiteral',
                          value: '端口 port {1} 被占用',
                          raw: '"端口 port {1} 被占用"',
                          loc: {
                            start: {
                              line: 63,
                              column: 17
                            },
                            end: {
                              line: 63,
                              column: 34
                            }
                          }
                        },
                        property: {
                          type: 'Identifier',
                          name: 'format',
                          loc: {
                            start: {
                              line: 63,
                              column: 35
                            },
                            end: {
                              line: 63,
                              column: 41
                            }
                          }
                        },
                        loc: {
                          start: {
                            line: 63,
                            column: 17
                          },
                          end: {
                            line: 63,
                            column: 41
                          }
                        }
                      },
                      params: [
                        {
                          type: 'Identifier',
                          name: 'ip',
                          loc: {
                            start: {
                              line: 63,
                              column: 42
                            },
                            end: {
                              line: 63,
                              column: 44
                            }
                          }
                        },
                        {
                          type: 'Identifier',
                          name: 'port',
                          loc: {
                            start: {
                              line: 63,
                              column: 46
                            },
                            end: {
                              line: 63,
                              column: 50
                            }
                          }
                        }
                      ],
                      keywords: [],
                      loc: {
                        start: {
                          line: 63,
                          column: 17
                        },
                        end: {
                          line: 63,
                          column: 51
                        }
                      }
                    }
                  ],
                  keywords: [],
                  loc: {
                    start: {
                      line: 63,
                      column: 8
                    },
                    end: {
                      line: 63,
                      column: 52
                    }
                  }
                },
                {
                  type: 'keyword',
                  value: 'return',
                  loc: {
                    start: {
                      line: 64,
                      column: 8
                    },
                    end: {
                      line: 64,
                      column: 14
                    }
                  }
                },
                {
                  type: 'BooleanLiteral',
                  value: true,
                  loc: {
                    start: {
                      line: 64,
                      column: 15
                    },
                    end: {
                      line: 64,
                      column: 19
                    }
                  }
                }
              ],
              loc: {
                start: {
                  line: 61,
                  column: 7
                },
                end: {
                  line: 64,
                  column: 19
                }
              }
            },
            handlers: [
              {
                type: 'ExceptHandler',
                body: {
                  type: 'BlockStatement',
                  body: [
                    {
                      type: 'CallExpression',
                      callee: {
                        type: 'MemberExpression',
                        object: {
                          type: 'Identifier',
                          name: 'log',
                          loc: {
                            start: {
                              line: 66,
                              column: 8
                            },
                            end: {
                              line: 66,
                              column: 11
                            }
                          }
                        },
                        property: {
                          type: 'Identifier',
                          name: 'info',
                          loc: {
                            start: {
                              line: 66,
                              column: 12
                            },
                            end: {
                              line: 66,
                              column: 16
                            }
                          }
                        },
                        loc: {
                          start: {
                            line: 66,
                            column: 8
                          },
                          end: {
                            line: 66,
                            column: 16
                          }
                        }
                      },
                      params: [
                        {
                          type: 'CallExpression',
                          callee: {
                            type: 'MemberExpression',
                            object: {
                              type: 'StringLiteral',
                              value: '{0} port {1} is not open',
                              raw: '"{0} port {1} is not open"',
                              loc: {
                                start: {
                                  line: 66,
                                  column: 17
                                },
                                end: {
                                  line: 66,
                                  column: 43
                                }
                              }
                            },
                            property: {
                              type: 'Identifier',
                              name: 'format',
                              loc: {
                                start: {
                                  line: 66,
                                  column: 44
                                },
                                end: {
                                  line: 66,
                                  column: 50
                                }
                              }
                            },
                            loc: {
                              start: {
                                line: 66,
                                column: 17
                              },
                              end: {
                                line: 66,
                                column: 50
                              }
                            }
                          },
                          params: [
                            {
                              type: 'Identifier',
                              name: 'ip',
                              loc: {
                                start: {
                                  line: 66,
                                  column: 51
                                },
                                end: {
                                  line: 66,
                                  column: 53
                                }
                              }
                            },
                            {
                              type: 'Identifier',
                              name: 'port',
                              loc: {
                                start: {
                                  line: 66,
                                  column: 55
                                },
                                end: {
                                  line: 66,
                                  column: 59
                                }
                              }
                            }
                          ],
                          keywords: [],
                          loc: {
                            start: {
                              line: 66,
                              column: 17
                            },
                            end: {
                              line: 66,
                              column: 60
                            }
                          }
                        }
                      ],
                      keywords: [],
                      loc: {
                        start: {
                          line: 66,
                          column: 8
                        },
                        end: {
                          line: 66,
                          column: 61
                        }
                      }
                    },
                    {
                      type: 'keyword',
                      value: 'return',
                      loc: {
                        start: {
                          line: 67,
                          column: 8
                        },
                        end: {
                          line: 67,
                          column: 14
                        }
                      }
                    },
                    {
                      type: 'BooleanLiteral',
                      value: false,
                      loc: {
                        start: {
                          line: 67,
                          column: 15
                        },
                        end: {
                          line: 67,
                          column: 20
                        }
                      }
                    }
                  ],
                  loc: {
                    start: {
                      line: 65,
                      column: 27
                    },
                    end: {
                      line: 67,
                      column: 20
                    }
                  }
                },
                errName: {
                  type: 'Identifier',
                  name: 'Exception',
                  loc: {
                    start: {
                      line: 65,
                      column: 11
                    },
                    end: {
                      line: 65,
                      column: 20
                    }
                  }
                },
                name: {
                  type: 'Identifier',
                  name: 'err',
                  loc: {
                    start: {
                      line: 65,
                      column: 24
                    },
                    end: {
                      line: 65,
                      column: 27
                    }
                  }
                },
                loc: {
                  start: {
                    line: 65,
                    column: 4
                  },
                  end: {
                    line: 67,
                    column: 20
                  }
                }
              }
            ],
            finalBody: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'CallExpression',
                  callee: {
                    type: 'MemberExpression',
                    object: {
                      type: 'Identifier',
                      name: 'server',
                      loc: {
                        start: {
                          line: 69,
                          column: 8
                        },
                        end: {
                          line: 69,
                          column: 14
                        }
                      }
                    },
                    property: {
                      type: 'Identifier',
                      name: 'close',
                      loc: {
                        start: {
                          line: 69,
                          column: 15
                        },
                        end: {
                          line: 69,
                          column: 20
                        }
                      }
                    },
                    loc: {
                      start: {
                        line: 69,
                        column: 8
                      },
                      end: {
                        line: 69,
                        column: 20
                      }
                    }
                  },
                  params: [],
                  keywords: [],
                  loc: {
                    start: {
                      line: 69,
                      column: 8
                    },
                    end: {
                      line: 69,
                      column: 22
                    }
                  }
                }
              ],
              loc: {
                start: {
                  line: 68,
                  column: 11
                },
                end: {
                  line: 69,
                  column: 22
                }
              }
            },
            loc: {
              start: {
                line: 61,
                column: 7
              },
              end: {
                line: 69,
                column: 22
              }
            }
          }
        ],
        loc: {
          start: {
            line: 58,
            column: 25
          },
          end: {
            line: 69,
            column: 22
          }
        }
      },
      loc: {
        start: {
          line: 58,
          column: 0
        },
        end: {
          line: 69,
          column: 22
        }
      }
    },
    {
      type: 'IfStatement',
      test: {
        type: 'BinaryExpression',
        operator: '==',
        left: {
          type: 'Identifier',
          name: '__name__',
          loc: {
            start: {
              line: 72,
              column: 3
            },
            end: {
              line: 72,
              column: 11
            }
          }
        },
        right: {
          type: 'StringLiteral',
          value: '__main__',
          raw: '"__main__"',
          loc: {
            start: {
              line: 72,
              column: 15
            },
            end: {
              line: 72,
              column: 25
            }
          }
        },
        loc: {
          start: {
            line: 72,
            column: 3
          },
          end: {
            line: 72,
            column: 25
          }
        }
      },
      body: {
        type: 'BlockStatement',
        body: [
          {
            type: 'CallExpression',
            callee: {
              type: 'MemberExpression',
              object: {
                type: 'Identifier',
                name: 'multiprocessing',
                loc: {
                  start: {
                    line: 73,
                    column: 4
                  },
                  end: {
                    line: 73,
                    column: 19
                  }
                }
              },
              property: {
                type: 'Identifier',
                name: 'freeze_support',
                loc: {
                  start: {
                    line: 73,
                    column: 20
                  },
                  end: {
                    line: 73,
                    column: 34
                  }
                }
              },
              loc: {
                start: {
                  line: 73,
                  column: 4
                },
                end: {
                  line: 73,
                  column: 34
                }
              }
            },
            params: [],
            keywords: [],
            loc: {
              start: {
                line: 73,
                column: 4
              },
              end: {
                line: 73,
                column: 36
              }
            }
          },
          {
            type: 'CallExpression',
            callee: {
              type: 'MemberExpression',
              object: {
                type: 'Identifier',
                name: 'logging',
                loc: {
                  start: {
                    line: 75,
                    column: 4
                  },
                  end: {
                    line: 75,
                    column: 11
                  }
                }
              },
              property: {
                type: 'Identifier',
                name: 'info',
                loc: {
                  start: {
                    line: 75,
                    column: 12
                  },
                  end: {
                    line: 75,
                    column: 16
                  }
                }
              },
              loc: {
                start: {
                  line: 75,
                  column: 4
                },
                end: {
                  line: 75,
                  column: 16
                }
              }
            },
            params: [
              {
                type: 'StringLiteral',
                value: ' =============================================== ',
                raw: '" =============================================== "',
                loc: {
                  start: {
                    line: 75,
                    column: 17
                  },
                  end: {
                    line: 75,
                    column: 68
                  }
                }
              }
            ],
            keywords: [],
            loc: {
              start: {
                line: 75,
                column: 4
              },
              end: {
                line: 75,
                column: 69
              }
            }
          },
          {
            type: 'CallExpression',
            callee: {
              type: 'MemberExpression',
              object: {
                type: 'Identifier',
                name: 'log',
                loc: {
                  start: {
                    line: 76,
                    column: 4
                  },
                  end: {
                    line: 76,
                    column: 7
                  }
                }
              },
              property: {
                type: 'Identifier',
                name: 'info',
                loc: {
                  start: {
                    line: 76,
                    column: 8
                  },
                  end: {
                    line: 76,
                    column: 12
                  }
                }
              },
              loc: {
                start: {
                  line: 76,
                  column: 4
                },
                end: {
                  line: 76,
                  column: 12
                }
              }
            },
            params: [
              {
                type: 'StringLiteral',
                value: '|   _____ ______           _____  _____        ',
                raw: '"|   _____ ______           _____  _____        "',
                loc: {
                  start: {
                    line: 76,
                    column: 13
                  },
                  end: {
                    line: 76,
                    column: 62
                  }
                }
              }
            ],
            keywords: [],
            loc: {
              start: {
                line: 76,
                column: 4
              },
              end: {
                line: 76,
                column: 63
              }
            }
          },
          {
            type: 'CallExpression',
            callee: {
              type: 'MemberExpression',
              object: {
                type: 'Identifier',
                name: 'log',
                loc: {
                  start: {
                    line: 77,
                    column: 4
                  },
                  end: {
                    line: 77,
                    column: 7
                  }
                }
              },
              property: {
                type: 'Identifier',
                name: 'info',
                loc: {
                  start: {
                    line: 77,
                    column: 8
                  },
                  end: {
                    line: 77,
                    column: 12
                  }
                }
              },
              loc: {
                start: {
                  line: 77,
                  column: 4
                },
                end: {
                  line: 77,
                  column: 12
                }
              }
            },
            params: [
              {
                type: 'StringLiteral',
                value: '|  / ____|___  /          |  __ \\|  __ \\ /\\    ',
                raw: '"|  / ____|___  /          |  __ \\\\|  __ \\\\ /\\\\    "',
                loc: {
                  start: {
                    line: 77,
                    column: 13
                  },
                  end: {
                    line: 77,
                    column: 62
                  }
                }
              }
            ],
            keywords: [],
            loc: {
              start: {
                line: 77,
                column: 4
              },
              end: {
                line: 77,
                column: 63
              }
            }
          },
          {
            type: 'CallExpression',
            callee: {
              type: 'MemberExpression',
              object: {
                type: 'Identifier',
                name: 'log',
                loc: {
                  start: {
                    line: 78,
                    column: 4
                  },
                  end: {
                    line: 78,
                    column: 7
                  }
                }
              },
              property: {
                type: 'Identifier',
                name: 'info',
                loc: {
                  start: {
                    line: 78,
                    column: 8
                  },
                  end: {
                    line: 78,
                    column: 12
                  }
                }
              },
              loc: {
                start: {
                  line: 78,
                  column: 4
                },
                end: {
                  line: 78,
                  column: 12
                }
              }
            },
            params: [
              {
                type: 'StringLiteral',
                value: '| | (___    / /   ______  | |__) | |__) /  \\   ',
                raw: '"| | (___    / /   ______  | |__) | |__) /  \\\\   "',
                loc: {
                  start: {
                    line: 78,
                    column: 13
                  },
                  end: {
                    line: 78,
                    column: 62
                  }
                }
              }
            ],
            keywords: [],
            loc: {
              start: {
                line: 78,
                column: 4
              },
              end: {
                line: 78,
                column: 63
              }
            }
          },
          {
            type: 'CallExpression',
            callee: {
              type: 'MemberExpression',
              object: {
                type: 'Identifier',
                name: 'log',
                loc: {
                  start: {
                    line: 79,
                    column: 4
                  },
                  end: {
                    line: 79,
                    column: 7
                  }
                }
              },
              property: {
                type: 'Identifier',
                name: 'info',
                loc: {
                  start: {
                    line: 79,
                    column: 8
                  },
                  end: {
                    line: 79,
                    column: 12
                  }
                }
              },
              loc: {
                start: {
                  line: 79,
                  column: 4
                },
                end: {
                  line: 79,
                  column: 12
                }
              }
            },
            params: [
              {
                type: 'StringLiteral',
                value: '|  \\___ \\  / /   |______| |  _  /|  ___/ /\\ \\  ',
                raw: '"|  \\\\___ \\\\  / /   |______| |  _  /|  ___/ /\\\\ \\\\  "',
                loc: {
                  start: {
                    line: 79,
                    column: 13
                  },
                  end: {
                    line: 79,
                    column: 62
                  }
                }
              }
            ],
            keywords: [],
            loc: {
              start: {
                line: 79,
                column: 4
              },
              end: {
                line: 79,
                column: 63
              }
            }
          },
          {
            type: 'CallExpression',
            callee: {
              type: 'MemberExpression',
              object: {
                type: 'Identifier',
                name: 'log',
                loc: {
                  start: {
                    line: 80,
                    column: 4
                  },
                  end: {
                    line: 80,
                    column: 7
                  }
                }
              },
              property: {
                type: 'Identifier',
                name: 'info',
                loc: {
                  start: {
                    line: 80,
                    column: 8
                  },
                  end: {
                    line: 80,
                    column: 12
                  }
                }
              },
              loc: {
                start: {
                  line: 80,
                  column: 4
                },
                end: {
                  line: 80,
                  column: 12
                }
              }
            },
            params: [
              {
                type: 'StringLiteral',
                value: '|  ____) |/ /__           | | \\ \\| |  / ____ \\ ',
                raw: '"|  ____) |/ /__           | | \\\\ \\\\| |  / ____ \\\\ "',
                loc: {
                  start: {
                    line: 80,
                    column: 13
                  },
                  end: {
                    line: 80,
                    column: 62
                  }
                }
              }
            ],
            keywords: [],
            loc: {
              start: {
                line: 80,
                column: 4
              },
              end: {
                line: 80,
                column: 63
              }
            }
          },
          {
            type: 'CallExpression',
            callee: {
              type: 'MemberExpression',
              object: {
                type: 'Identifier',
                name: 'log',
                loc: {
                  start: {
                    line: 81,
                    column: 4
                  },
                  end: {
                    line: 81,
                    column: 7
                  }
                }
              },
              property: {
                type: 'Identifier',
                name: 'info',
                loc: {
                  start: {
                    line: 81,
                    column: 8
                  },
                  end: {
                    line: 81,
                    column: 12
                  }
                }
              },
              loc: {
                start: {
                  line: 81,
                  column: 4
                },
                end: {
                  line: 81,
                  column: 12
                }
              }
            },
            params: [
              {
                type: 'StringLiteral',
                value: '| |_____//_____|          |_|  \\_\\_| /_/    \\_',
                raw: '"| |_____//_____|          |_|  \\\\_\\\\_| /_/    \\\\_"',
                loc: {
                  start: {
                    line: 81,
                    column: 13
                  },
                  end: {
                    line: 81,
                    column: 61
                  }
                }
              }
            ],
            keywords: [],
            loc: {
              start: {
                line: 81,
                column: 4
              },
              end: {
                line: 81,
                column: 62
              }
            }
          },
          {
            type: 'CallExpression',
            callee: {
              type: 'MemberExpression',
              object: {
                type: 'Identifier',
                name: 'log',
                loc: {
                  start: {
                    line: 82,
                    column: 4
                  },
                  end: {
                    line: 82,
                    column: 7
                  }
                }
              },
              property: {
                type: 'Identifier',
                name: 'info',
                loc: {
                  start: {
                    line: 82,
                    column: 8
                  },
                  end: {
                    line: 82,
                    column: 12
                  }
                }
              },
              loc: {
                start: {
                  line: 82,
                  column: 4
                },
                end: {
                  line: 82,
                  column: 12
                }
              }
            },
            params: [
              {
                type: 'StringLiteral',
                value: '|',
                raw: '"|"',
                loc: {
                  start: {
                    line: 82,
                    column: 13
                  },
                  end: {
                    line: 82,
                    column: 16
                  }
                }
              }
            ],
            keywords: [],
            loc: {
              start: {
                line: 82,
                column: 4
              },
              end: {
                line: 82,
                column: 17
              }
            }
          },
          {
            type: 'CallExpression',
            callee: {
              type: 'MemberExpression',
              object: {
                type: 'Identifier',
                name: 'log',
                loc: {
                  start: {
                    line: 83,
                    column: 4
                  },
                  end: {
                    line: 83,
                    column: 7
                  }
                }
              },
              property: {
                type: 'Identifier',
                name: 'info',
                loc: {
                  start: {
                    line: 83,
                    column: 8
                  },
                  end: {
                    line: 83,
                    column: 12
                  }
                }
              },
              loc: {
                start: {
                  line: 83,
                  column: 4
                },
                end: {
                  line: 83,
                  column: 12
                }
              }
            },
            params: [
              {
                type: 'StringLiteral',
                value: '|                      Core.Version : v%s ',
                raw: '"|                      Core.Version : v%s "',
                loc: {
                  start: {
                    line: 83,
                    column: 13
                  },
                  end: {
                    line: 83,
                    column: 57
                  }
                }
              },
              {
                type: 'Identifier',
                name: 'VERSION',
                loc: {
                  start: {
                    line: 83,
                    column: 59
                  },
                  end: {
                    line: 83,
                    column: 66
                  }
                }
              }
            ],
            keywords: [],
            loc: {
              start: {
                line: 83,
                column: 4
              },
              end: {
                line: 83,
                column: 67
              }
            }
          },
          {
            type: 'CallExpression',
            callee: {
              type: 'MemberExpression',
              object: {
                type: 'Identifier',
                name: 'log',
                loc: {
                  start: {
                    line: 84,
                    column: 4
                  },
                  end: {
                    line: 84,
                    column: 7
                  }
                }
              },
              property: {
                type: 'Identifier',
                name: 'info',
                loc: {
                  start: {
                    line: 84,
                    column: 8
                  },
                  end: {
                    line: 84,
                    column: 12
                  }
                }
              },
              loc: {
                start: {
                  line: 84,
                  column: 4
                },
                end: {
                  line: 84,
                  column: 12
                }
              }
            },
            params: [
              {
                type: 'BinaryExpression',
                operator: '%',
                left: {
                  type: 'StringLiteral',
                  value: '|                Bootstrap as Admin : %s ',
                  raw: '"|                Bootstrap as Admin : %s "',
                  loc: {
                    start: {
                      line: 84,
                      column: 13
                    },
                    end: {
                      line: 84,
                      column: 56
                    }
                  }
                },
                right: {
                  type: 'CallExpression',
                  callee: {
                    type: 'Identifier',
                    name: 'is_admin',
                    loc: {
                      start: {
                        line: 84,
                        column: 60
                      },
                      end: {
                        line: 84,
                        column: 68
                      }
                    }
                  },
                  params: [],
                  keywords: [],
                  loc: {
                    start: {
                      line: 84,
                      column: 60
                    },
                    end: {
                      line: 84,
                      column: 70
                    }
                  },
                  extra: {
                    parenthesized: true,
                    parentStart: {
                      line: 84,
                      column: 59
                    }
                  }
                },
                loc: {
                  start: {
                    line: 84,
                    column: 13
                  },
                  end: {
                    line: 84,
                    column: 70
                  }
                }
              }
            ],
            keywords: [],
            loc: {
              start: {
                line: 84,
                column: 4
              },
              end: {
                line: 84,
                column: 72
              }
            }
          },
          {
            type: 'CallExpression',
            callee: {
              type: 'MemberExpression',
              object: {
                type: 'Identifier',
                name: 'log',
                loc: {
                  start: {
                    line: 85,
                    column: 4
                  },
                  end: {
                    line: 85,
                    column: 7
                  }
                }
              },
              property: {
                type: 'Identifier',
                name: 'info',
                loc: {
                  start: {
                    line: 85,
                    column: 8
                  },
                  end: {
                    line: 85,
                    column: 12
                  }
                }
              },
              loc: {
                start: {
                  line: 85,
                  column: 4
                },
                end: {
                  line: 85,
                  column: 12
                }
              }
            },
            params: [
              {
                type: 'StringLiteral',
                value: ' =============================================== ',
                raw: '" =============================================== "',
                loc: {
                  start: {
                    line: 85,
                    column: 13
                  },
                  end: {
                    line: 85,
                    column: 64
                  }
                }
              }
            ],
            keywords: [],
            loc: {
              start: {
                line: 85,
                column: 4
              },
              end: {
                line: 85,
                column: 65
              }
            }
          },
          {
            type: 'CallExpression',
            callee: {
              type: 'MemberExpression',
              object: {
                type: 'Identifier',
                name: 'log',
                loc: {
                  start: {
                    line: 86,
                    column: 4
                  },
                  end: {
                    line: 86,
                    column: 7
                  }
                }
              },
              property: {
                type: 'Identifier',
                name: 'info',
                loc: {
                  start: {
                    line: 86,
                    column: 8
                  },
                  end: {
                    line: 86,
                    column: 12
                  }
                }
              },
              loc: {
                start: {
                  line: 86,
                  column: 4
                },
                end: {
                  line: 86,
                  column: 12
                }
              }
            },
            params: [
              {
                type: 'MemberExpression',
                object: {
                  type: 'Identifier',
                  name: 'sys',
                  loc: {
                    start: {
                      line: 86,
                      column: 13
                    },
                    end: {
                      line: 86,
                      column: 16
                    }
                  }
                },
                property: {
                  type: 'Identifier',
                  name: 'argv',
                  loc: {
                    start: {
                      line: 86,
                      column: 17
                    },
                    end: {
                      line: 86,
                      column: 21
                    }
                  }
                },
                loc: {
                  start: {
                    line: 86,
                    column: 13
                  },
                  end: {
                    line: 86,
                    column: 21
                  }
                }
              }
            ],
            keywords: [],
            loc: {
              start: {
                line: 86,
                column: 4
              },
              end: {
                line: 86,
                column: 22
              }
            }
          },
          {
            type: 'AssignmentExpression',
            targets: [
              {
                type: 'Identifier',
                name: 'port',
                loc: {
                  start: {
                    line: 88,
                    column: 4
                  },
                  end: {
                    line: 88,
                    column: 8
                  }
                }
              }
            ],
            operator: '=',
            value: {
              type: 'NumberLiteral',
              value: 6444,
              raw: '6444',
              loc: {
                start: {
                  line: 88,
                  column: 11
                },
                end: {
                  line: 88,
                  column: 15
                }
              }
            },
            loc: {
              start: {
                line: 88,
                column: 4
              },
              end: {
                line: 88,
                column: 15
              }
            }
          },
          {
            type: 'AssignmentExpression',
            targets: [
              {
                type: 'Identifier',
                name: 'factory_name',
                loc: {
                  start: {
                    line: 89,
                    column: 4
                  },
                  end: {
                    line: 89,
                    column: 16
                  }
                }
              }
            ],
            operator: '=',
            value: {
              type: 'NoneLiteral',
              loc: {
                start: {
                  line: 89,
                  column: 19
                },
                end: {
                  line: 89,
                  column: 23
                }
              }
            },
            loc: {
              start: {
                line: 89,
                column: 4
              },
              end: {
                line: 89,
                column: 23
              }
            }
          },
          {
            type: 'TryStatement',
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'IfStatement',
                  test: {
                    type: 'BinaryExpression',
                    operator: '>',
                    left: {
                      type: 'CallExpression',
                      callee: {
                        type: 'Identifier',
                        name: 'len',
                        loc: {
                          start: {
                            line: 92,
                            column: 11
                          },
                          end: {
                            line: 92,
                            column: 14
                          }
                        }
                      },
                      params: [
                        {
                          type: 'MemberExpression',
                          object: {
                            type: 'Identifier',
                            name: 'sys',
                            loc: {
                              start: {
                                line: 92,
                                column: 15
                              },
                              end: {
                                line: 92,
                                column: 18
                              }
                            }
                          },
                          property: {
                            type: 'Identifier',
                            name: 'argv',
                            loc: {
                              start: {
                                line: 92,
                                column: 19
                              },
                              end: {
                                line: 92,
                                column: 23
                              }
                            }
                          },
                          loc: {
                            start: {
                              line: 92,
                              column: 15
                            },
                            end: {
                              line: 92,
                              column: 23
                            }
                          }
                        }
                      ],
                      keywords: [],
                      loc: {
                        start: {
                          line: 92,
                          column: 11
                        },
                        end: {
                          line: 92,
                          column: 24
                        }
                      }
                    },
                    right: {
                      type: 'NumberLiteral',
                      value: 1,
                      raw: '1',
                      loc: {
                        start: {
                          line: 92,
                          column: 27
                        },
                        end: {
                          line: 92,
                          column: 28
                        }
                      }
                    },
                    loc: {
                      start: {
                        line: 92,
                        column: 11
                      },
                      end: {
                        line: 92,
                        column: 28
                      }
                    }
                  },
                  body: {
                    type: 'BlockStatement',
                    body: [
                      {
                        type: 'IfStatement',
                        test: {
                          type: 'BinaryExpression',
                          operator: '==',
                          left: {
                            type: 'MemberExpression',
                            object: {
                              type: 'MemberExpression',
                              object: {
                                type: 'Identifier',
                                name: 'sys',
                                loc: {
                                  start: {
                                    line: 93,
                                    column: 15
                                  },
                                  end: {
                                    line: 93,
                                    column: 18
                                  }
                                }
                              },
                              property: {
                                type: 'Identifier',
                                name: 'argv',
                                loc: {
                                  start: {
                                    line: 93,
                                    column: 19
                                  },
                                  end: {
                                    line: 93,
                                    column: 23
                                  }
                                }
                              },
                              loc: {
                                start: {
                                  line: 93,
                                  column: 15
                                },
                                end: {
                                  line: 93,
                                  column: 23
                                }
                              }
                            },
                            property: {
                              type: 'SliceExpression',
                              lower: {
                                type: 'NumberLiteral',
                                value: 1,
                                raw: '1',
                                loc: {
                                  start: {
                                    line: 93,
                                    column: 24
                                  },
                                  end: {
                                    line: 93,
                                    column: 25
                                  }
                                }
                              },
                              upper: undefined,
                              step: undefined,
                              loc: {
                                start: {
                                  line: 93,
                                  column: 24
                                },
                                end: {
                                  line: 93,
                                  column: 25
                                }
                              }
                            },
                            loc: {
                              start: {
                                line: 93,
                                column: 15
                              },
                              end: {
                                line: 93,
                                column: 25
                              }
                            }
                          },
                          right: {
                            type: 'StringLiteral',
                            value: '-p',
                            raw: '"-p"',
                            loc: {
                              start: {
                                line: 93,
                                column: 30
                              },
                              end: {
                                line: 93,
                                column: 34
                              }
                            }
                          },
                          loc: {
                            start: {
                              line: 93,
                              column: 15
                            },
                            end: {
                              line: 93,
                              column: 34
                            }
                          }
                        },
                        body: {
                          type: 'BlockStatement',
                          body: [
                            {
                              type: 'CallExpression',
                              callee: {
                                type: 'MemberExpression',
                                object: {
                                  type: 'Identifier',
                                  name: 'subprocess',
                                  loc: {
                                    start: {
                                      line: 95,
                                      column: 16
                                    },
                                    end: {
                                      line: 95,
                                      column: 26
                                    }
                                  }
                                },
                                property: {
                                  type: 'Identifier',
                                  name: 'Popen',
                                  loc: {
                                    start: {
                                      line: 95,
                                      column: 27
                                    },
                                    end: {
                                      line: 95,
                                      column: 32
                                    }
                                  }
                                },
                                loc: {
                                  start: {
                                    line: 95,
                                    column: 16
                                  },
                                  end: {
                                    line: 95,
                                    column: 32
                                  }
                                }
                              },
                              params: [
                                {
                                  type: 'StringLiteral',
                                  value: 'dll\\ElementSDKV1\\II.RPA.JavaHost\\II.RPA.JavaBridgeHost.exe',
                                  raw: '"dll\\\\ElementSDKV1\\\\II.RPA.JavaHost\\\\II.RPA.JavaBridgeHost.exe"',
                                  loc: {
                                    start: {
                                      line: 95,
                                      column: 33
                                    },
                                    end: {
                                      line: 95,
                                      column: 93
                                    }
                                  }
                                }
                              ],
                              keywords: [],
                              loc: {
                                start: {
                                  line: 95,
                                  column: 16
                                },
                                end: {
                                  line: 95,
                                  column: 94
                                }
                              }
                            },
                            {
                              type: 'CallExpression',
                              callee: {
                                type: 'MemberExpression',
                                object: {
                                  type: 'Identifier',
                                  name: 'subprocess',
                                  loc: {
                                    start: {
                                      line: 97,
                                      column: 16
                                    },
                                    end: {
                                      line: 97,
                                      column: 26
                                    }
                                  }
                                },
                                property: {
                                  type: 'Identifier',
                                  name: 'Popen',
                                  loc: {
                                    start: {
                                      line: 97,
                                      column: 27
                                    },
                                    end: {
                                      line: 97,
                                      column: 32
                                    }
                                  }
                                },
                                loc: {
                                  start: {
                                    line: 97,
                                    column: 16
                                  },
                                  end: {
                                    line: 97,
                                    column: 32
                                  }
                                }
                              },
                              params: [
                                {
                                  type: 'StringLiteral',
                                  value: 'dll\\II.RPA.EventMonitor\\II.RPA.EventMonitor.exe',
                                  raw: '"dll\\\\II.RPA.EventMonitor\\\\II.RPA.EventMonitor.exe"',
                                  loc: {
                                    start: {
                                      line: 97,
                                      column: 33
                                    },
                                    end: {
                                      line: 97,
                                      column: 82
                                    }
                                  }
                                }
                              ],
                              keywords: [],
                              loc: {
                                start: {
                                  line: 97,
                                  column: 16
                                },
                                end: {
                                  line: 97,
                                  column: 83
                                }
                              }
                            },
                            {
                              type: 'CallExpression',
                              callee: {
                                type: 'MemberExpression',
                                object: {
                                  type: 'Identifier',
                                  name: 'log',
                                  loc: {
                                    start: {
                                      line: 99,
                                      column: 16
                                    },
                                    end: {
                                      line: 99,
                                      column: 19
                                    }
                                  }
                                },
                                property: {
                                  type: 'Identifier',
                                  name: 'info',
                                  loc: {
                                    start: {
                                      line: 99,
                                      column: 20
                                    },
                                    end: {
                                      line: 99,
                                      column: 24
                                    }
                                  }
                                },
                                loc: {
                                  start: {
                                    line: 99,
                                    column: 16
                                  },
                                  end: {
                                    line: 99,
                                    column: 24
                                  }
                                }
                              },
                              params: [
                                {
                                  type: 'CallExpression',
                                  callee: {
                                    type: 'MemberExpression',
                                    object: {
                                      type: 'StringLiteral',
                                      value: 'engine启动端口为{0}',
                                      raw: '"engine启动端口为{0}"',
                                      loc: {
                                        start: {
                                          line: 99,
                                          column: 25
                                        },
                                        end: {
                                          line: 99,
                                          column: 41
                                        }
                                      }
                                    },
                                    property: {
                                      type: 'Identifier',
                                      name: 'format',
                                      loc: {
                                        start: {
                                          line: 99,
                                          column: 42
                                        },
                                        end: {
                                          line: 99,
                                          column: 48
                                        }
                                      }
                                    },
                                    loc: {
                                      start: {
                                        line: 99,
                                        column: 25
                                      },
                                      end: {
                                        line: 99,
                                        column: 48
                                      }
                                    }
                                  },
                                  params: [
                                    {
                                      type: 'MemberExpression',
                                      object: {
                                        type: 'MemberExpression',
                                        object: {
                                          type: 'Identifier',
                                          name: 'sys',
                                          loc: {
                                            start: {
                                              line: 99,
                                              column: 49
                                            },
                                            end: {
                                              line: 99,
                                              column: 52
                                            }
                                          }
                                        },
                                        property: {
                                          type: 'Identifier',
                                          name: 'argv',
                                          loc: {
                                            start: {
                                              line: 99,
                                              column: 53
                                            },
                                            end: {
                                              line: 99,
                                              column: 57
                                            }
                                          }
                                        },
                                        loc: {
                                          start: {
                                            line: 99,
                                            column: 49
                                          },
                                          end: {
                                            line: 99,
                                            column: 57
                                          }
                                        }
                                      },
                                      property: {
                                        type: 'SliceExpression',
                                        lower: {
                                          type: 'NumberLiteral',
                                          value: 2,
                                          raw: '2',
                                          loc: {
                                            start: {
                                              line: 99,
                                              column: 58
                                            },
                                            end: {
                                              line: 99,
                                              column: 59
                                            }
                                          }
                                        },
                                        upper: undefined,
                                        step: undefined,
                                        loc: {
                                          start: {
                                            line: 99,
                                            column: 58
                                          },
                                          end: {
                                            line: 99,
                                            column: 59
                                          }
                                        }
                                      },
                                      loc: {
                                        start: {
                                          line: 99,
                                          column: 49
                                        },
                                        end: {
                                          line: 99,
                                          column: 59
                                        }
                                      }
                                    }
                                  ],
                                  keywords: [],
                                  loc: {
                                    start: {
                                      line: 99,
                                      column: 25
                                    },
                                    end: {
                                      line: 99,
                                      column: 61
                                    }
                                  }
                                }
                              ],
                              keywords: [],
                              loc: {
                                start: {
                                  line: 99,
                                  column: 16
                                },
                                end: {
                                  line: 99,
                                  column: 62
                                }
                              }
                            },
                            {
                              type: 'AssignmentExpression',
                              targets: [
                                {
                                  type: 'Identifier',
                                  name: 'port',
                                  loc: {
                                    start: {
                                      line: 100,
                                      column: 16
                                    },
                                    end: {
                                      line: 100,
                                      column: 20
                                    }
                                  }
                                }
                              ],
                              operator: '=',
                              value: {
                                type: 'MemberExpression',
                                object: {
                                  type: 'MemberExpression',
                                  object: {
                                    type: 'Identifier',
                                    name: 'sys',
                                    loc: {
                                      start: {
                                        line: 100,
                                        column: 23
                                      },
                                      end: {
                                        line: 100,
                                        column: 26
                                      }
                                    }
                                  },
                                  property: {
                                    type: 'Identifier',
                                    name: 'argv',
                                    loc: {
                                      start: {
                                        line: 100,
                                        column: 27
                                      },
                                      end: {
                                        line: 100,
                                        column: 31
                                      }
                                    }
                                  },
                                  loc: {
                                    start: {
                                      line: 100,
                                      column: 23
                                    },
                                    end: {
                                      line: 100,
                                      column: 31
                                    }
                                  }
                                },
                                property: {
                                  type: 'SliceExpression',
                                  lower: {
                                    type: 'NumberLiteral',
                                    value: 2,
                                    raw: '2',
                                    loc: {
                                      start: {
                                        line: 100,
                                        column: 32
                                      },
                                      end: {
                                        line: 100,
                                        column: 33
                                      }
                                    }
                                  },
                                  upper: undefined,
                                  step: undefined,
                                  loc: {
                                    start: {
                                      line: 100,
                                      column: 32
                                    },
                                    end: {
                                      line: 100,
                                      column: 33
                                    }
                                  }
                                },
                                loc: {
                                  start: {
                                    line: 100,
                                    column: 23
                                  },
                                  end: {
                                    line: 100,
                                    column: 33
                                  }
                                }
                              },
                              loc: {
                                start: {
                                  line: 100,
                                  column: 16
                                },
                                end: {
                                  line: 100,
                                  column: 33
                                }
                              }
                            },
                            {
                              type: 'AssignmentExpression',
                              targets: [
                                {
                                  type: 'Identifier',
                                  name: 'factory_name',
                                  loc: {
                                    start: {
                                      line: 101,
                                      column: 16
                                    },
                                    end: {
                                      line: 101,
                                      column: 28
                                    }
                                  }
                                }
                              ],
                              operator: '=',
                              value: {
                                type: 'IfExpression',
                                test: {
                                  type: 'BinaryExpression',
                                  operator: '==',
                                  left: {
                                    type: 'Identifier',
                                    name: 'port',
                                    loc: {
                                      start: {
                                        line: 101,
                                        column: 50
                                      },
                                      end: {
                                        line: 101,
                                        column: 54
                                      }
                                    }
                                  },
                                  right: {
                                    type: 'StringLiteral',
                                    value: '6444',
                                    raw: '"6444"',
                                    loc: {
                                      start: {
                                        line: 101,
                                        column: 58
                                      },
                                      end: {
                                        line: 101,
                                        column: 64
                                      }
                                    }
                                  },
                                  loc: {
                                    start: {
                                      line: 101,
                                      column: 50
                                    },
                                    end: {
                                      line: 101,
                                      column: 64
                                    }
                                  }
                                },
                                body: {
                                  type: 'StringLiteral',
                                  value: 'Z-Factory.exe',
                                  raw: '"Z-Factory.exe"',
                                  loc: {
                                    start: {
                                      line: 101,
                                      column: 31
                                    },
                                    end: {
                                      line: 101,
                                      column: 46
                                    }
                                  }
                                },
                                alternate: {
                                  type: 'StringLiteral',
                                  value: 'Z-Bot.exe',
                                  raw: '"Z-Bot.exe"',
                                  loc: {
                                    start: {
                                      line: 101,
                                      column: 70
                                    },
                                    end: {
                                      line: 101,
                                      column: 81
                                    }
                                  }
                                },
                                loc: {
                                  start: {
                                    line: 101,
                                    column: 31
                                  },
                                  end: {
                                    line: 101,
                                    column: 81
                                  }
                                }
                              },
                              loc: {
                                start: {
                                  line: 101,
                                  column: 16
                                },
                                end: {
                                  line: 101,
                                  column: 81
                                }
                              }
                            },
                            {
                              type: 'CallExpression',
                              callee: {
                                type: 'MemberExpression',
                                object: {
                                  type: 'Identifier',
                                  name: 'ws_server',
                                  loc: {
                                    start: {
                                      line: 102,
                                      column: 16
                                    },
                                    end: {
                                      line: 102,
                                      column: 25
                                    }
                                  }
                                },
                                property: {
                                  type: 'Identifier',
                                  name: 'run',
                                  loc: {
                                    start: {
                                      line: 102,
                                      column: 26
                                    },
                                    end: {
                                      line: 102,
                                      column: 29
                                    }
                                  }
                                },
                                loc: {
                                  start: {
                                    line: 102,
                                    column: 16
                                  },
                                  end: {
                                    line: 102,
                                    column: 29
                                  }
                                }
                              },
                              params: [
                                {
                                  type: 'Identifier',
                                  name: 'port',
                                  loc: {
                                    start: {
                                      line: 102,
                                      column: 30
                                    },
                                    end: {
                                      line: 102,
                                      column: 34
                                    }
                                  }
                                },
                                {
                                  type: 'Identifier',
                                  name: 'factory_name',
                                  loc: {
                                    start: {
                                      line: 102,
                                      column: 36
                                    },
                                    end: {
                                      line: 102,
                                      column: 48
                                    }
                                  }
                                }
                              ],
                              keywords: [],
                              loc: {
                                start: {
                                  line: 102,
                                  column: 16
                                },
                                end: {
                                  line: 102,
                                  column: 49
                                }
                              }
                            }
                          ],
                          loc: {
                            start: {
                              line: 93,
                              column: 34
                            },
                            end: {
                              line: 102,
                              column: 49
                            }
                          }
                        },
                        alternate: {
                          type: 'IfStatement',
                          test: {
                            type: 'BinaryExpression',
                            operator: '==',
                            left: {
                              type: 'MemberExpression',
                              object: {
                                type: 'MemberExpression',
                                object: {
                                  type: 'Identifier',
                                  name: 'sys',
                                  loc: {
                                    start: {
                                      line: 103,
                                      column: 17
                                    },
                                    end: {
                                      line: 103,
                                      column: 20
                                    }
                                  }
                                },
                                property: {
                                  type: 'Identifier',
                                  name: 'argv',
                                  loc: {
                                    start: {
                                      line: 103,
                                      column: 21
                                    },
                                    end: {
                                      line: 103,
                                      column: 25
                                    }
                                  }
                                },
                                loc: {
                                  start: {
                                    line: 103,
                                    column: 17
                                  },
                                  end: {
                                    line: 103,
                                    column: 25
                                  }
                                }
                              },
                              property: {
                                type: 'SliceExpression',
                                lower: {
                                  type: 'NumberLiteral',
                                  value: 1,
                                  raw: '1',
                                  loc: {
                                    start: {
                                      line: 103,
                                      column: 26
                                    },
                                    end: {
                                      line: 103,
                                      column: 27
                                    }
                                  }
                                },
                                upper: undefined,
                                step: undefined,
                                loc: {
                                  start: {
                                    line: 103,
                                    column: 26
                                  },
                                  end: {
                                    line: 103,
                                    column: 27
                                  }
                                }
                              },
                              loc: {
                                start: {
                                  line: 103,
                                  column: 17
                                },
                                end: {
                                  line: 103,
                                  column: 27
                                }
                              }
                            },
                            right: {
                              type: 'StringLiteral',
                              value: '-t',
                              raw: '"-t"',
                              loc: {
                                start: {
                                  line: 103,
                                  column: 32
                                },
                                end: {
                                  line: 103,
                                  column: 36
                                }
                              }
                            },
                            loc: {
                              start: {
                                line: 103,
                                column: 17
                              },
                              end: {
                                line: 103,
                                column: 36
                              }
                            }
                          },
                          body: {
                            type: 'BlockStatement',
                            body: [
                              {
                                type: 'CallExpression',
                                callee: {
                                  type: 'MemberExpression',
                                  object: {
                                    type: 'Identifier',
                                    name: 'log',
                                    loc: {
                                      start: {
                                        line: 104,
                                        column: 16
                                      },
                                      end: {
                                        line: 104,
                                        column: 19
                                      }
                                    }
                                  },
                                  property: {
                                    type: 'Identifier',
                                    name: 'info',
                                    loc: {
                                      start: {
                                        line: 104,
                                        column: 20
                                      },
                                      end: {
                                        line: 104,
                                        column: 24
                                      }
                                    }
                                  },
                                  loc: {
                                    start: {
                                      line: 104,
                                      column: 16
                                    },
                                    end: {
                                      line: 104,
                                      column: 24
                                    }
                                  }
                                },
                                params: [
                                  {
                                    type: 'CallExpression',
                                    callee: {
                                      type: 'MemberExpression',
                                      object: {
                                        type: 'StringLiteral',
                                        value: 'engine启动端口为{0}',
                                        raw: '"engine启动端口为{0}"',
                                        loc: {
                                          start: {
                                            line: 104,
                                            column: 25
                                          },
                                          end: {
                                            line: 104,
                                            column: 41
                                          }
                                        }
                                      },
                                      property: {
                                        type: 'Identifier',
                                        name: 'format',
                                        loc: {
                                          start: {
                                            line: 104,
                                            column: 42
                                          },
                                          end: {
                                            line: 104,
                                            column: 48
                                          }
                                        }
                                      },
                                      loc: {
                                        start: {
                                          line: 104,
                                          column: 25
                                        },
                                        end: {
                                          line: 104,
                                          column: 48
                                        }
                                      }
                                    },
                                    params: [
                                      {
                                        type: 'MemberExpression',
                                        object: {
                                          type: 'MemberExpression',
                                          object: {
                                            type: 'Identifier',
                                            name: 'sys',
                                            loc: {
                                              start: {
                                                line: 104,
                                                column: 49
                                              },
                                              end: {
                                                line: 104,
                                                column: 52
                                              }
                                            }
                                          },
                                          property: {
                                            type: 'Identifier',
                                            name: 'argv',
                                            loc: {
                                              start: {
                                                line: 104,
                                                column: 53
                                              },
                                              end: {
                                                line: 104,
                                                column: 57
                                              }
                                            }
                                          },
                                          loc: {
                                            start: {
                                              line: 104,
                                              column: 49
                                            },
                                            end: {
                                              line: 104,
                                              column: 57
                                            }
                                          }
                                        },
                                        property: {
                                          type: 'SliceExpression',
                                          lower: {
                                            type: 'NumberLiteral',
                                            value: 2,
                                            raw: '2',
                                            loc: {
                                              start: {
                                                line: 104,
                                                column: 58
                                              },
                                              end: {
                                                line: 104,
                                                column: 59
                                              }
                                            }
                                          },
                                          upper: undefined,
                                          step: undefined,
                                          loc: {
                                            start: {
                                              line: 104,
                                              column: 58
                                            },
                                            end: {
                                              line: 104,
                                              column: 59
                                            }
                                          }
                                        },
                                        loc: {
                                          start: {
                                            line: 104,
                                            column: 49
                                          },
                                          end: {
                                            line: 104,
                                            column: 59
                                          }
                                        }
                                      }
                                    ],
                                    keywords: [],
                                    loc: {
                                      start: {
                                        line: 104,
                                        column: 25
                                      },
                                      end: {
                                        line: 104,
                                        column: 61
                                      }
                                    }
                                  }
                                ],
                                keywords: [],
                                loc: {
                                  start: {
                                    line: 104,
                                    column: 16
                                  },
                                  end: {
                                    line: 104,
                                    column: 62
                                  }
                                }
                              },
                              {
                                type: 'AssignmentExpression',
                                targets: [
                                  {
                                    type: 'Identifier',
                                    name: 'port',
                                    loc: {
                                      start: {
                                        line: 105,
                                        column: 16
                                      },
                                      end: {
                                        line: 105,
                                        column: 20
                                      }
                                    }
                                  }
                                ],
                                operator: '=',
                                value: {
                                  type: 'MemberExpression',
                                  object: {
                                    type: 'MemberExpression',
                                    object: {
                                      type: 'Identifier',
                                      name: 'sys',
                                      loc: {
                                        start: {
                                          line: 105,
                                          column: 23
                                        },
                                        end: {
                                          line: 105,
                                          column: 26
                                        }
                                      }
                                    },
                                    property: {
                                      type: 'Identifier',
                                      name: 'argv',
                                      loc: {
                                        start: {
                                          line: 105,
                                          column: 27
                                        },
                                        end: {
                                          line: 105,
                                          column: 31
                                        }
                                      }
                                    },
                                    loc: {
                                      start: {
                                        line: 105,
                                        column: 23
                                      },
                                      end: {
                                        line: 105,
                                        column: 31
                                      }
                                    }
                                  },
                                  property: {
                                    type: 'SliceExpression',
                                    lower: {
                                      type: 'NumberLiteral',
                                      value: 2,
                                      raw: '2',
                                      loc: {
                                        start: {
                                          line: 105,
                                          column: 32
                                        },
                                        end: {
                                          line: 105,
                                          column: 33
                                        }
                                      }
                                    },
                                    upper: undefined,
                                    step: undefined,
                                    loc: {
                                      start: {
                                        line: 105,
                                        column: 32
                                      },
                                      end: {
                                        line: 105,
                                        column: 33
                                      }
                                    }
                                  },
                                  loc: {
                                    start: {
                                      line: 105,
                                      column: 23
                                    },
                                    end: {
                                      line: 105,
                                      column: 33
                                    }
                                  }
                                },
                                loc: {
                                  start: {
                                    line: 105,
                                    column: 16
                                  },
                                  end: {
                                    line: 105,
                                    column: 33
                                  }
                                }
                              },
                              {
                                type: 'AssignmentExpression',
                                targets: [
                                  {
                                    type: 'Identifier',
                                    name: 'factory_name',
                                    loc: {
                                      start: {
                                        line: 106,
                                        column: 16
                                      },
                                      end: {
                                        line: 106,
                                        column: 28
                                      }
                                    }
                                  }
                                ],
                                operator: '=',
                                value: {
                                  type: 'IfExpression',
                                  test: {
                                    type: 'BinaryExpression',
                                    operator: '==',
                                    left: {
                                      type: 'Identifier',
                                      name: 'port',
                                      loc: {
                                        start: {
                                          line: 106,
                                          column: 52
                                        },
                                        end: {
                                          line: 106,
                                          column: 56
                                        }
                                      }
                                    },
                                    right: {
                                      type: 'StringLiteral',
                                      value: '6444',
                                      raw: '"6444"',
                                      loc: {
                                        start: {
                                          line: 106,
                                          column: 60
                                        },
                                        end: {
                                          line: 106,
                                          column: 66
                                        }
                                      }
                                    },
                                    loc: {
                                      start: {
                                        line: 106,
                                        column: 52
                                      },
                                      end: {
                                        line: 106,
                                        column: 66
                                      }
                                    }
                                  },
                                  body: {
                                    type: 'StringLiteral',
                                    value: 'Z-Factory_trace',
                                    raw: '"Z-Factory_trace"',
                                    loc: {
                                      start: {
                                        line: 106,
                                        column: 31
                                      },
                                      end: {
                                        line: 106,
                                        column: 48
                                      }
                                    }
                                  },
                                  alternate: {
                                    type: 'StringLiteral',
                                    value: 'Z-Bot_trace',
                                    raw: '"Z-Bot_trace"',
                                    loc: {
                                      start: {
                                        line: 106,
                                        column: 72
                                      },
                                      end: {
                                        line: 106,
                                        column: 85
                                      }
                                    }
                                  },
                                  loc: {
                                    start: {
                                      line: 106,
                                      column: 31
                                    },
                                    end: {
                                      line: 106,
                                      column: 85
                                    }
                                  }
                                },
                                loc: {
                                  start: {
                                    line: 106,
                                    column: 16
                                  },
                                  end: {
                                    line: 106,
                                    column: 85
                                  }
                                }
                              },
                              {
                                type: 'CallExpression',
                                callee: {
                                  type: 'MemberExpression',
                                  object: {
                                    type: 'Identifier',
                                    name: 'ws_server',
                                    loc: {
                                      start: {
                                        line: 107,
                                        column: 16
                                      },
                                      end: {
                                        line: 107,
                                        column: 25
                                      }
                                    }
                                  },
                                  property: {
                                    type: 'Identifier',
                                    name: 'run',
                                    loc: {
                                      start: {
                                        line: 107,
                                        column: 26
                                      },
                                      end: {
                                        line: 107,
                                        column: 29
                                      }
                                    }
                                  },
                                  loc: {
                                    start: {
                                      line: 107,
                                      column: 16
                                    },
                                    end: {
                                      line: 107,
                                      column: 29
                                    }
                                  }
                                },
                                params: [
                                  {
                                    type: 'Identifier',
                                    name: 'port',
                                    loc: {
                                      start: {
                                        line: 107,
                                        column: 30
                                      },
                                      end: {
                                        line: 107,
                                        column: 34
                                      }
                                    }
                                  },
                                  {
                                    type: 'Identifier',
                                    name: 'factory_name',
                                    loc: {
                                      start: {
                                        line: 107,
                                        column: 35
                                      },
                                      end: {
                                        line: 107,
                                        column: 47
                                      }
                                    }
                                  }
                                ],
                                keywords: [],
                                loc: {
                                  start: {
                                    line: 107,
                                    column: 16
                                  },
                                  end: {
                                    line: 107,
                                    column: 48
                                  }
                                }
                              }
                            ],
                            loc: {
                              start: {
                                line: 103,
                                column: 36
                              },
                              end: {
                                line: 107,
                                column: 48
                              }
                            }
                          },
                          alternate: {
                            type: 'BlockStatement',
                            body: [
                              {
                                type: 'TryStatement',
                                body: {
                                  type: 'BlockStatement',
                                  body: [
                                    {
                                      type: 'AssignmentExpression',
                                      targets: [
                                        {
                                          type: 'TupleExpression',
                                          elements: [
                                            {
                                              type: 'Identifier',
                                              name: 'opts',
                                              loc: {
                                                start: {
                                                  line: 110,
                                                  column: 20
                                                },
                                                end: {
                                                  line: 110,
                                                  column: 24
                                                }
                                              }
                                            },
                                            {
                                              type: 'Identifier',
                                              name: 'args',
                                              loc: {
                                                start: {
                                                  line: 110,
                                                  column: 26
                                                },
                                                end: {
                                                  line: 110,
                                                  column: 30
                                                }
                                              }
                                            }
                                          ],
                                          loc: {
                                            start: {
                                              line: 110,
                                              column: 20
                                            },
                                            end: {
                                              line: 110,
                                              column: 30
                                            }
                                          }
                                        }
                                      ],
                                      operator: '=',
                                      value: {
                                        type: 'CallExpression',
                                        callee: {
                                          type: 'MemberExpression',
                                          object: {
                                            type: 'Identifier',
                                            name: 'getopt',
                                            loc: {
                                              start: {
                                                line: 110,
                                                column: 33
                                              },
                                              end: {
                                                line: 110,
                                                column: 39
                                              }
                                            }
                                          },
                                          property: {
                                            type: 'Identifier',
                                            name: 'getopt',
                                            loc: {
                                              start: {
                                                line: 110,
                                                column: 40
                                              },
                                              end: {
                                                line: 110,
                                                column: 46
                                              }
                                            }
                                          },
                                          loc: {
                                            start: {
                                              line: 110,
                                              column: 33
                                            },
                                            end: {
                                              line: 110,
                                              column: 46
                                            }
                                          }
                                        },
                                        params: [
                                          {
                                            type: 'MemberExpression',
                                            object: {
                                              type: 'MemberExpression',
                                              object: {
                                                type: 'Identifier',
                                                name: 'sys',
                                                loc: {
                                                  start: {
                                                    line: 110,
                                                    column: 47
                                                  },
                                                  end: {
                                                    line: 110,
                                                    column: 50
                                                  }
                                                }
                                              },
                                              property: {
                                                type: 'Identifier',
                                                name: 'argv',
                                                loc: {
                                                  start: {
                                                    line: 110,
                                                    column: 51
                                                  },
                                                  end: {
                                                    line: 110,
                                                    column: 55
                                                  }
                                                }
                                              },
                                              loc: {
                                                start: {
                                                  line: 110,
                                                  column: 47
                                                },
                                                end: {
                                                  line: 110,
                                                  column: 55
                                                }
                                              }
                                            },
                                            property: {
                                              type: 'SliceExpression',
                                              lower: {
                                                type: 'NumberLiteral',
                                                value: 1,
                                                raw: '1',
                                                loc: {
                                                  start: {
                                                    line: 110,
                                                    column: 56
                                                  },
                                                  end: {
                                                    line: 110,
                                                    column: 57
                                                  }
                                                }
                                              },
                                              upper: undefined,
                                              step: undefined,
                                              loc: {
                                                start: {
                                                  line: 110,
                                                  column: 56
                                                },
                                                end: {
                                                  line: 110,
                                                  column: 58
                                                }
                                              }
                                            },
                                            loc: {
                                              start: {
                                                line: 110,
                                                column: 47
                                              },
                                              end: {
                                                line: 110,
                                                column: 58
                                              }
                                            }
                                          },
                                          {
                                            type: 'StringLiteral',
                                            value: 'hpzd:',
                                            raw: '"hpzd:"',
                                            loc: {
                                              start: {
                                                line: 110,
                                                column: 61
                                              },
                                              end: {
                                                line: 110,
                                                column: 68
                                              }
                                            }
                                          },
                                          {
                                            type: 'ArrayExpression',
                                            elements: [
                                              {
                                                type: 'StringLiteral',
                                                value: 'processFile=',
                                                raw: '"processFile="',
                                                loc: {
                                                  start: {
                                                    line: 110,
                                                    column: 71
                                                  },
                                                  end: {
                                                    line: 110,
                                                    column: 85
                                                  }
                                                }
                                              },
                                              {
                                                type: 'StringLiteral',
                                                value: 'zparam=',
                                                raw: '"zparam="',
                                                loc: {
                                                  start: {
                                                    line: 110,
                                                    column: 87
                                                  },
                                                  end: {
                                                    line: 110,
                                                    column: 96
                                                  }
                                                }
                                              },
                                              {
                                                type: 'StringLiteral',
                                                value: 'directRun=',
                                                raw: '"directRun="',
                                                loc: {
                                                  start: {
                                                    line: 110,
                                                    column: 98
                                                  },
                                                  end: {
                                                    line: 110,
                                                    column: 110
                                                  }
                                                }
                                              }
                                            ],
                                            loc: {
                                              start: {
                                                line: 110,
                                                column: 70
                                              },
                                              end: {
                                                line: 110,
                                                column: 111
                                              }
                                            }
                                          }
                                        ],
                                        keywords: [],
                                        loc: {
                                          start: {
                                            line: 110,
                                            column: 33
                                          },
                                          end: {
                                            line: 110,
                                            column: 112
                                          }
                                        }
                                      },
                                      loc: {
                                        start: {
                                          line: 110,
                                          column: 20
                                        },
                                        end: {
                                          line: 110,
                                          column: 112
                                        }
                                      }
                                    }
                                  ],
                                  loc: {
                                    start: {
                                      line: 109,
                                      column: 19
                                    },
                                    end: {
                                      line: 110,
                                      column: 112
                                    }
                                  }
                                },
                                handlers: [
                                  {
                                    type: 'ExceptHandler',
                                    body: {
                                      type: 'BlockStatement',
                                      body: [
                                        {
                                          type: 'CallExpression',
                                          callee: {
                                            type: 'MemberExpression',
                                            object: {
                                              type: 'Identifier',
                                              name: 'log',
                                              loc: {
                                                start: {
                                                  line: 112,
                                                  column: 20
                                                },
                                                end: {
                                                  line: 112,
                                                  column: 23
                                                }
                                              }
                                            },
                                            property: {
                                              type: 'Identifier',
                                              name: 'error',
                                              loc: {
                                                start: {
                                                  line: 112,
                                                  column: 24
                                                },
                                                end: {
                                                  line: 112,
                                                  column: 29
                                                }
                                              }
                                            },
                                            loc: {
                                              start: {
                                                line: 112,
                                                column: 20
                                              },
                                              end: {
                                                line: 112,
                                                column: 29
                                              }
                                            }
                                          },
                                          params: [
                                            {
                                              type: 'StringLiteral',
                                              value: 'bootstrap.py --processFile=<processFile>',
                                              raw: '"bootstrap.py --processFile=<processFile>"',
                                              loc: {
                                                start: {
                                                  line: 112,
                                                  column: 30
                                                },
                                                end: {
                                                  line: 112,
                                                  column: 72
                                                }
                                              }
                                            }
                                          ],
                                          keywords: [],
                                          loc: {
                                            start: {
                                              line: 112,
                                              column: 20
                                            },
                                            end: {
                                              line: 112,
                                              column: 73
                                            }
                                          }
                                        },
                                        {
                                          type: 'CallExpression',
                                          callee: {
                                            type: 'MemberExpression',
                                            object: {
                                              type: 'Identifier',
                                              name: 'sys',
                                              loc: {
                                                start: {
                                                  line: 113,
                                                  column: 20
                                                },
                                                end: {
                                                  line: 113,
                                                  column: 23
                                                }
                                              }
                                            },
                                            property: {
                                              type: 'Identifier',
                                              name: 'exit',
                                              loc: {
                                                start: {
                                                  line: 113,
                                                  column: 24
                                                },
                                                end: {
                                                  line: 113,
                                                  column: 28
                                                }
                                              }
                                            },
                                            loc: {
                                              start: {
                                                line: 113,
                                                column: 20
                                              },
                                              end: {
                                                line: 113,
                                                column: 28
                                              }
                                            }
                                          },
                                          params: [
                                            {
                                              type: 'NumberLiteral',
                                              value: 2,
                                              raw: '2',
                                              loc: {
                                                start: {
                                                  line: 113,
                                                  column: 29
                                                },
                                                end: {
                                                  line: 113,
                                                  column: 30
                                                }
                                              }
                                            }
                                          ],
                                          keywords: [],
                                          loc: {
                                            start: {
                                              line: 113,
                                              column: 20
                                            },
                                            end: {
                                              line: 113,
                                              column: 31
                                            }
                                          }
                                        }
                                      ],
                                      loc: {
                                        start: {
                                          line: 111,
                                          column: 47
                                        },
                                        end: {
                                          line: 113,
                                          column: 31
                                        }
                                      }
                                    },
                                    errName: {
                                      type: 'MemberExpression',
                                      object: {
                                        type: 'Identifier',
                                        name: 'getopt',
                                        loc: {
                                          start: {
                                            line: 111,
                                            column: 23
                                          },
                                          end: {
                                            line: 111,
                                            column: 29
                                          }
                                        }
                                      },
                                      property: {
                                        type: 'Identifier',
                                        name: 'GetoptError',
                                        loc: {
                                          start: {
                                            line: 111,
                                            column: 30
                                          },
                                          end: {
                                            line: 111,
                                            column: 41
                                          }
                                        }
                                      },
                                      loc: {
                                        start: {
                                          line: 111,
                                          column: 23
                                        },
                                        end: {
                                          line: 111,
                                          column: 41
                                        }
                                      }
                                    },
                                    name: {
                                      type: 'Identifier',
                                      name: 'ex',
                                      loc: {
                                        start: {
                                          line: 111,
                                          column: 45
                                        },
                                        end: {
                                          line: 111,
                                          column: 47
                                        }
                                      }
                                    },
                                    loc: {
                                      start: {
                                        line: 111,
                                        column: 16
                                      },
                                      end: {
                                        line: 113,
                                        column: 31
                                      }
                                    }
                                  }
                                ],
                                finalBody: null,
                                loc: {
                                  start: {
                                    line: 109,
                                    column: 19
                                  },
                                  end: {
                                    line: 113,
                                    column: 31
                                  }
                                }
                              },
                              {
                                type: 'ForStatement',
                                left: {
                                  type: 'TupleExpression',
                                  elements: [
                                    {
                                      type: 'Identifier',
                                      name: 'opt',
                                      loc: {
                                        start: {
                                          line: 114,
                                          column: 20
                                        },
                                        end: {
                                          line: 114,
                                          column: 23
                                        }
                                      }
                                    },
                                    {
                                      type: 'Identifier',
                                      name: 'arg',
                                      loc: {
                                        start: {
                                          line: 114,
                                          column: 25
                                        },
                                        end: {
                                          line: 114,
                                          column: 28
                                        }
                                      }
                                    }
                                  ],
                                  loc: {
                                    start: {
                                      line: 114,
                                      column: 20
                                    },
                                    end: {
                                      line: 114,
                                      column: 28
                                    }
                                  }
                                },
                                right: {
                                  type: 'Identifier',
                                  name: 'opts',
                                  loc: {
                                    start: {
                                      line: 114,
                                      column: 32
                                    },
                                    end: {
                                      line: 114,
                                      column: 36
                                    }
                                  }
                                },
                                body: {
                                  type: 'BlockStatement',
                                  body: [
                                    {
                                      type: 'CallExpression',
                                      callee: {
                                        type: 'MemberExpression',
                                        object: {
                                          type: 'Identifier',
                                          name: 'log',
                                          loc: {
                                            start: {
                                              line: 115,
                                              column: 20
                                            },
                                            end: {
                                              line: 115,
                                              column: 23
                                            }
                                          }
                                        },
                                        property: {
                                          type: 'Identifier',
                                          name: 'info',
                                          loc: {
                                            start: {
                                              line: 115,
                                              column: 24
                                            },
                                            end: {
                                              line: 115,
                                              column: 28
                                            }
                                          }
                                        },
                                        loc: {
                                          start: {
                                            line: 115,
                                            column: 20
                                          },
                                          end: {
                                            line: 115,
                                            column: 28
                                          }
                                        }
                                      },
                                      params: [
                                        {
                                          type: 'BinaryExpression',
                                          operator: '+',
                                          left: {
                                            type: 'BinaryExpression',
                                            operator: '+',
                                            left: {
                                              type: 'Identifier',
                                              name: 'opt',
                                              loc: {
                                                start: {
                                                  line: 115,
                                                  column: 29
                                                },
                                                end: {
                                                  line: 115,
                                                  column: 32
                                                }
                                              }
                                            },
                                            right: {
                                              type: 'StringLiteral',
                                              value: ' ',
                                              raw: '" "',
                                              loc: {
                                                start: {
                                                  line: 115,
                                                  column: 35
                                                },
                                                end: {
                                                  line: 115,
                                                  column: 38
                                                }
                                              }
                                            },
                                            loc: {
                                              start: {
                                                line: 115,
                                                column: 29
                                              },
                                              end: {
                                                line: 115,
                                                column: 38
                                              }
                                            }
                                          },
                                          right: {
                                            type: 'Identifier',
                                            name: 'arg',
                                            loc: {
                                              start: {
                                                line: 115,
                                                column: 41
                                              },
                                              end: {
                                                line: 115,
                                                column: 44
                                              }
                                            }
                                          },
                                          loc: {
                                            start: {
                                              line: 115,
                                              column: 29
                                            },
                                            end: {
                                              line: 115,
                                              column: 44
                                            }
                                          }
                                        }
                                      ],
                                      keywords: [],
                                      loc: {
                                        start: {
                                          line: 115,
                                          column: 20
                                        },
                                        end: {
                                          line: 115,
                                          column: 45
                                        }
                                      }
                                    },
                                    {
                                      type: 'IfStatement',
                                      test: {
                                        type: 'BinaryExpression',
                                        operator: '==',
                                        left: {
                                          type: 'Identifier',
                                          name: 'opt',
                                          loc: {
                                            start: {
                                              line: 116,
                                              column: 23
                                            },
                                            end: {
                                              line: 116,
                                              column: 26
                                            }
                                          }
                                        },
                                        right: {
                                          type: 'StringLiteral',
                                          value: '-h',
                                          raw: '"-h"',
                                          loc: {
                                            start: {
                                              line: 116,
                                              column: 30
                                            },
                                            end: {
                                              line: 116,
                                              column: 34
                                            }
                                          }
                                        },
                                        loc: {
                                          start: {
                                            line: 116,
                                            column: 23
                                          },
                                          end: {
                                            line: 116,
                                            column: 34
                                          }
                                        }
                                      },
                                      body: {
                                        type: 'BlockStatement',
                                        body: [
                                          {
                                            type: 'CallExpression',
                                            callee: {
                                              type: 'MemberExpression',
                                              object: {
                                                type: 'Identifier',
                                                name: 'log',
                                                loc: {
                                                  start: {
                                                    line: 117,
                                                    column: 24
                                                  },
                                                  end: {
                                                    line: 117,
                                                    column: 27
                                                  }
                                                }
                                              },
                                              property: {
                                                type: 'Identifier',
                                                name: 'info',
                                                loc: {
                                                  start: {
                                                    line: 117,
                                                    column: 28
                                                  },
                                                  end: {
                                                    line: 117,
                                                    column: 32
                                                  }
                                                }
                                              },
                                              loc: {
                                                start: {
                                                  line: 117,
                                                  column: 24
                                                },
                                                end: {
                                                  line: 117,
                                                  column: 32
                                                }
                                              }
                                            },
                                            params: [
                                              {
                                                type: 'StringLiteral',
                                                value: 'y.py -i <inputfile> -o <outputfile>',
                                                raw: '"y.py -i <inputfile> -o <outputfile>"',
                                                loc: {
                                                  start: {
                                                    line: 118,
                                                    column: 28
                                                  },
                                                  end: {
                                                    line: 118,
                                                    column: 65
                                                  }
                                                }
                                              }
                                            ],
                                            keywords: [],
                                            loc: {
                                              start: {
                                                line: 117,
                                                column: 24
                                              },
                                              end: {
                                                line: 119,
                                                column: 25
                                              }
                                            }
                                          },
                                          {
                                            type: 'CallExpression',
                                            callee: {
                                              type: 'MemberExpression',
                                              object: {
                                                type: 'Identifier',
                                                name: 'sys',
                                                loc: {
                                                  start: {
                                                    line: 120,
                                                    column: 24
                                                  },
                                                  end: {
                                                    line: 120,
                                                    column: 27
                                                  }
                                                }
                                              },
                                              property: {
                                                type: 'Identifier',
                                                name: 'exit',
                                                loc: {
                                                  start: {
                                                    line: 120,
                                                    column: 28
                                                  },
                                                  end: {
                                                    line: 120,
                                                    column: 32
                                                  }
                                                }
                                              },
                                              loc: {
                                                start: {
                                                  line: 120,
                                                  column: 24
                                                },
                                                end: {
                                                  line: 120,
                                                  column: 32
                                                }
                                              }
                                            },
                                            params: [],
                                            keywords: [],
                                            loc: {
                                              start: {
                                                line: 120,
                                                column: 24
                                              },
                                              end: {
                                                line: 120,
                                                column: 34
                                              }
                                            }
                                          }
                                        ],
                                        loc: {
                                          start: {
                                            line: 116,
                                            column: 34
                                          },
                                          end: {
                                            line: 120,
                                            column: 34
                                          }
                                        }
                                      },
                                      alternate: {
                                        type: 'IfStatement',
                                        test: {
                                          type: 'CompareExpression',
                                          left: {
                                            type: 'Identifier',
                                            name: 'opt',
                                            loc: {
                                              start: {
                                                line: 121,
                                                column: 25
                                              },
                                              end: {
                                                line: 121,
                                                column: 28
                                              }
                                            }
                                          },
                                          operators: ['in'],
                                          comparators: [
                                            {
                                              type: 'TupleExpression',
                                              elements: [
                                                {
                                                  type: 'StringLiteral',
                                                  value: '-p',
                                                  raw: '"-p"',
                                                  loc: {
                                                    start: {
                                                      line: 121,
                                                      column: 33
                                                    },
                                                    end: {
                                                      line: 121,
                                                      column: 37
                                                    }
                                                  }
                                                },
                                                {
                                                  type: 'StringLiteral',
                                                  value: '--processFile',
                                                  raw: '"--processFile"',
                                                  loc: {
                                                    start: {
                                                      line: 121,
                                                      column: 39
                                                    },
                                                    end: {
                                                      line: 121,
                                                      column: 54
                                                    }
                                                  }
                                                }
                                              ],
                                              loc: {
                                                start: {
                                                  line: 121,
                                                  column: 33
                                                },
                                                end: {
                                                  line: 121,
                                                  column: 54
                                                }
                                              },
                                              extra: {
                                                parenthesized: true,
                                                parentStart: {
                                                  line: 121,
                                                  column: 32
                                                }
                                              }
                                            }
                                          ],
                                          loc: {
                                            start: {
                                              line: 121,
                                              column: 25
                                            },
                                            end: {
                                              line: 121,
                                              column: 54
                                            }
                                          }
                                        },
                                        body: {
                                          type: 'BlockStatement',
                                          body: [
                                            {
                                              type: 'AssignmentExpression',
                                              targets: [
                                                {
                                                  type: 'Identifier',
                                                  name: 'processFile',
                                                  loc: {
                                                    start: {
                                                      line: 122,
                                                      column: 24
                                                    },
                                                    end: {
                                                      line: 122,
                                                      column: 35
                                                    }
                                                  }
                                                }
                                              ],
                                              operator: '=',
                                              value: {
                                                type: 'Identifier',
                                                name: 'arg',
                                                loc: {
                                                  start: {
                                                    line: 122,
                                                    column: 38
                                                  },
                                                  end: {
                                                    line: 122,
                                                    column: 41
                                                  }
                                                }
                                              },
                                              loc: {
                                                start: {
                                                  line: 122,
                                                  column: 24
                                                },
                                                end: {
                                                  line: 122,
                                                  column: 41
                                                }
                                              }
                                            },
                                            {
                                              type: 'CallExpression',
                                              callee: {
                                                type: 'MemberExpression',
                                                object: {
                                                  type: 'Identifier',
                                                  name: 'log',
                                                  loc: {
                                                    start: {
                                                      line: 123,
                                                      column: 24
                                                    },
                                                    end: {
                                                      line: 123,
                                                      column: 27
                                                    }
                                                  }
                                                },
                                                property: {
                                                  type: 'Identifier',
                                                  name: 'info',
                                                  loc: {
                                                    start: {
                                                      line: 123,
                                                      column: 28
                                                    },
                                                    end: {
                                                      line: 123,
                                                      column: 32
                                                    }
                                                  }
                                                },
                                                loc: {
                                                  start: {
                                                    line: 123,
                                                    column: 24
                                                  },
                                                  end: {
                                                    line: 123,
                                                    column: 32
                                                  }
                                                }
                                              },
                                              params: [
                                                {
                                                  type: 'BinaryExpression',
                                                  operator: '+',
                                                  left: {
                                                    type: 'StringLiteral',
                                                    value: '输入的文件路徑为：',
                                                    raw: '"输入的文件路徑为："',
                                                    loc: {
                                                      start: {
                                                        line: 123,
                                                        column: 33
                                                      },
                                                      end: {
                                                        line: 123,
                                                        column: 44
                                                      }
                                                    }
                                                  },
                                                  right: {
                                                    type: 'Identifier',
                                                    name: 'processFile',
                                                    loc: {
                                                      start: {
                                                        line: 123,
                                                        column: 47
                                                      },
                                                      end: {
                                                        line: 123,
                                                        column: 58
                                                      }
                                                    }
                                                  },
                                                  loc: {
                                                    start: {
                                                      line: 123,
                                                      column: 33
                                                    },
                                                    end: {
                                                      line: 123,
                                                      column: 58
                                                    }
                                                  }
                                                }
                                              ],
                                              keywords: [],
                                              loc: {
                                                start: {
                                                  line: 123,
                                                  column: 24
                                                },
                                                end: {
                                                  line: 123,
                                                  column: 59
                                                }
                                              }
                                            }
                                          ],
                                          loc: {
                                            start: {
                                              line: 121,
                                              column: 55
                                            },
                                            end: {
                                              line: 123,
                                              column: 59
                                            }
                                          }
                                        },
                                        alternate: {
                                          type: 'IfStatement',
                                          test: {
                                            type: 'CompareExpression',
                                            left: {
                                              type: 'Identifier',
                                              name: 'opt',
                                              loc: {
                                                start: {
                                                  line: 124,
                                                  column: 25
                                                },
                                                end: {
                                                  line: 124,
                                                  column: 28
                                                }
                                              }
                                            },
                                            operators: ['in'],
                                            comparators: [
                                              {
                                                type: 'TupleExpression',
                                                elements: [
                                                  {
                                                    type: 'StringLiteral',
                                                    value: '-d',
                                                    raw: '"-d"',
                                                    loc: {
                                                      start: {
                                                        line: 124,
                                                        column: 33
                                                      },
                                                      end: {
                                                        line: 124,
                                                        column: 37
                                                      }
                                                    }
                                                  },
                                                  {
                                                    type: 'StringLiteral',
                                                    value: '--directRun',
                                                    raw: '"--directRun"',
                                                    loc: {
                                                      start: {
                                                        line: 124,
                                                        column: 39
                                                      },
                                                      end: {
                                                        line: 124,
                                                        column: 52
                                                      }
                                                    }
                                                  }
                                                ],
                                                loc: {
                                                  start: {
                                                    line: 124,
                                                    column: 33
                                                  },
                                                  end: {
                                                    line: 124,
                                                    column: 52
                                                  }
                                                },
                                                extra: {
                                                  parenthesized: true,
                                                  parentStart: {
                                                    line: 124,
                                                    column: 32
                                                  }
                                                }
                                              }
                                            ],
                                            loc: {
                                              start: {
                                                line: 124,
                                                column: 25
                                              },
                                              end: {
                                                line: 124,
                                                column: 52
                                              }
                                            }
                                          },
                                          body: {
                                            type: 'BlockStatement',
                                            body: [
                                              {
                                                type: 'AssignmentExpression',
                                                targets: [
                                                  {
                                                    type: 'Identifier',
                                                    name: 'directRunDir',
                                                    loc: {
                                                      start: {
                                                        line: 125,
                                                        column: 24
                                                      },
                                                      end: {
                                                        line: 125,
                                                        column: 36
                                                      }
                                                    }
                                                  }
                                                ],
                                                operator: '=',
                                                value: {
                                                  type: 'Identifier',
                                                  name: 'arg',
                                                  loc: {
                                                    start: {
                                                      line: 125,
                                                      column: 39
                                                    },
                                                    end: {
                                                      line: 125,
                                                      column: 42
                                                    }
                                                  }
                                                },
                                                loc: {
                                                  start: {
                                                    line: 125,
                                                    column: 24
                                                  },
                                                  end: {
                                                    line: 125,
                                                    column: 42
                                                  }
                                                }
                                              },
                                              {
                                                type: 'CallExpression',
                                                callee: {
                                                  type: 'MemberExpression',
                                                  object: {
                                                    type: 'Identifier',
                                                    name: 'log',
                                                    loc: {
                                                      start: {
                                                        line: 126,
                                                        column: 24
                                                      },
                                                      end: {
                                                        line: 126,
                                                        column: 27
                                                      }
                                                    }
                                                  },
                                                  property: {
                                                    type: 'Identifier',
                                                    name: 'info',
                                                    loc: {
                                                      start: {
                                                        line: 126,
                                                        column: 28
                                                      },
                                                      end: {
                                                        line: 126,
                                                        column: 32
                                                      }
                                                    }
                                                  },
                                                  loc: {
                                                    start: {
                                                      line: 126,
                                                      column: 24
                                                    },
                                                    end: {
                                                      line: 126,
                                                      column: 32
                                                    }
                                                  }
                                                },
                                                params: [
                                                  {
                                                    type: 'BinaryExpression',
                                                    operator: '+',
                                                    left: {
                                                      type: 'StringLiteral',
                                                      value: 'directRun的文件路徑为：',
                                                      raw: '"directRun的文件路徑为："',
                                                      loc: {
                                                        start: {
                                                          line: 126,
                                                          column: 33
                                                        },
                                                        end: {
                                                          line: 126,
                                                          column: 51
                                                        }
                                                      }
                                                    },
                                                    right: {
                                                      type: 'Identifier',
                                                      name: 'directRunDir',
                                                      loc: {
                                                        start: {
                                                          line: 126,
                                                          column: 54
                                                        },
                                                        end: {
                                                          line: 126,
                                                          column: 66
                                                        }
                                                      }
                                                    },
                                                    loc: {
                                                      start: {
                                                        line: 126,
                                                        column: 33
                                                      },
                                                      end: {
                                                        line: 126,
                                                        column: 66
                                                      }
                                                    }
                                                  }
                                                ],
                                                keywords: [],
                                                loc: {
                                                  start: {
                                                    line: 126,
                                                    column: 24
                                                  },
                                                  end: {
                                                    line: 126,
                                                    column: 67
                                                  }
                                                }
                                              }
                                            ],
                                            loc: {
                                              start: {
                                                line: 124,
                                                column: 53
                                              },
                                              end: {
                                                line: 126,
                                                column: 67
                                              }
                                            }
                                          },
                                          alternate: null,
                                          loc: {
                                            start: {
                                              line: 124,
                                              column: 20
                                            },
                                            end: {
                                              line: 126,
                                              column: 67
                                            }
                                          }
                                        },
                                        loc: {
                                          start: {
                                            line: 121,
                                            column: 20
                                          },
                                          end: {
                                            line: 126,
                                            column: 67
                                          }
                                        }
                                      },
                                      loc: {
                                        start: {
                                          line: 116,
                                          column: 20
                                        },
                                        end: {
                                          line: 126,
                                          column: 67
                                        }
                                      }
                                    }
                                  ],
                                  loc: {
                                    start: {
                                      line: 114,
                                      column: 36
                                    },
                                    end: {
                                      line: 126,
                                      column: 67
                                    }
                                  }
                                },
                                loc: {
                                  start: {
                                    line: 114,
                                    column: 16
                                  },
                                  end: {
                                    line: 126,
                                    column: 67
                                  }
                                }
                              },
                              {
                                type: 'IfStatement',
                                test: {
                                  type: 'UnaryExpression',
                                  oprator: 'not',
                                  argument: {
                                    type: 'Identifier',
                                    name: 'directRunDir',
                                    loc: {
                                      start: {
                                        line: 128,
                                        column: 23
                                      },
                                      end: {
                                        line: 128,
                                        column: 35
                                      }
                                    }
                                  },
                                  loc: {
                                    start: {
                                      line: 128,
                                      column: 19
                                    },
                                    end: {
                                      line: 128,
                                      column: 35
                                    }
                                  }
                                },
                                body: {
                                  type: 'BlockStatement',
                                  body: [
                                    {
                                      type: 'EmptyStatement',
                                      loc: {
                                        start: {
                                          line: 129,
                                          column: 20
                                        },
                                        end: {
                                          line: 129,
                                          column: 24
                                        }
                                      }
                                    }
                                  ],
                                  loc: {
                                    start: {
                                      line: 128,
                                      column: 35
                                    },
                                    end: {
                                      line: 129,
                                      column: 24
                                    }
                                  }
                                },
                                alternate: {
                                  type: 'BlockStatement',
                                  body: [
                                    {
                                      type: 'CallExpression',
                                      callee: {
                                        type: 'Identifier',
                                        name: 'directRun',
                                        loc: {
                                          start: {
                                            line: 131,
                                            column: 20
                                          },
                                          end: {
                                            line: 131,
                                            column: 29
                                          }
                                        }
                                      },
                                      params: [
                                        {
                                          type: 'Identifier',
                                          name: 'directRunDir',
                                          loc: {
                                            start: {
                                              line: 131,
                                              column: 30
                                            },
                                            end: {
                                              line: 131,
                                              column: 42
                                            }
                                          }
                                        },
                                        {
                                          type: 'Identifier',
                                          name: 'args',
                                          loc: {
                                            start: {
                                              line: 131,
                                              column: 43
                                            },
                                            end: {
                                              line: 131,
                                              column: 47
                                            }
                                          }
                                        }
                                      ],
                                      keywords: [],
                                      loc: {
                                        start: {
                                          line: 131,
                                          column: 20
                                        },
                                        end: {
                                          line: 131,
                                          column: 48
                                        }
                                      }
                                    },
                                    {
                                      type: 'CallExpression',
                                      callee: {
                                        type: 'MemberExpression',
                                        object: {
                                          type: 'Identifier',
                                          name: 'sys',
                                          loc: {
                                            start: {
                                              line: 132,
                                              column: 20
                                            },
                                            end: {
                                              line: 132,
                                              column: 23
                                            }
                                          }
                                        },
                                        property: {
                                          type: 'Identifier',
                                          name: 'exit',
                                          loc: {
                                            start: {
                                              line: 132,
                                              column: 24
                                            },
                                            end: {
                                              line: 132,
                                              column: 28
                                            }
                                          }
                                        },
                                        loc: {
                                          start: {
                                            line: 132,
                                            column: 20
                                          },
                                          end: {
                                            line: 132,
                                            column: 28
                                          }
                                        }
                                      },
                                      params: [],
                                      keywords: [],
                                      loc: {
                                        start: {
                                          line: 132,
                                          column: 20
                                        },
                                        end: {
                                          line: 132,
                                          column: 30
                                        }
                                      }
                                    }
                                  ],
                                  loc: {
                                    start: {
                                      line: 130,
                                      column: 20
                                    },
                                    end: {
                                      line: 132,
                                      column: 30
                                    }
                                  }
                                },
                                loc: {
                                  start: {
                                    line: 128,
                                    column: 16
                                  },
                                  end: {
                                    line: 132,
                                    column: 30
                                  }
                                }
                              }
                            ],
                            loc: {
                              start: {
                                line: 108,
                                column: 16
                              },
                              end: {
                                line: 132,
                                column: 30
                              }
                            }
                          },
                          loc: {
                            start: {
                              line: 103,
                              column: 12
                            },
                            end: {
                              line: 132,
                              column: 30
                            }
                          }
                        },
                        loc: {
                          start: {
                            line: 93,
                            column: 12
                          },
                          end: {
                            line: 132,
                            column: 30
                          }
                        }
                      }
                    ],
                    loc: {
                      start: {
                        line: 92,
                        column: 28
                      },
                      end: {
                        line: 132,
                        column: 30
                      }
                    }
                  },
                  alternate: {
                    type: 'BlockStatement',
                    body: [
                      {
                        type: 'AssignmentExpression',
                        targets: [
                          {
                            type: 'Identifier',
                            name: 'status',
                            loc: {
                              start: {
                                line: 134,
                                column: 12
                              },
                              end: {
                                line: 134,
                                column: 18
                              }
                            }
                          }
                        ],
                        operator: '=',
                        value: {
                          type: 'CallExpression',
                          callee: {
                            type: 'Identifier',
                            name: 'get_port_status',
                            loc: {
                              start: {
                                line: 134,
                                column: 21
                              },
                              end: {
                                line: 134,
                                column: 36
                              }
                            }
                          },
                          params: [
                            {
                              type: 'Identifier',
                              name: 'port',
                              loc: {
                                start: {
                                  line: 134,
                                  column: 37
                                },
                                end: {
                                  line: 134,
                                  column: 41
                                }
                              }
                            }
                          ],
                          keywords: [],
                          loc: {
                            start: {
                              line: 134,
                              column: 21
                            },
                            end: {
                              line: 134,
                              column: 42
                            }
                          }
                        },
                        loc: {
                          start: {
                            line: 134,
                            column: 12
                          },
                          end: {
                            line: 134,
                            column: 42
                          }
                        }
                      },
                      {
                        type: 'IfStatement',
                        test: {
                          type: 'Identifier',
                          name: 'status',
                          loc: {
                            start: {
                              line: 135,
                              column: 15
                            },
                            end: {
                              line: 135,
                              column: 21
                            }
                          }
                        },
                        body: {
                          type: 'BlockStatement',
                          body: [
                            {
                              type: 'CallExpression',
                              callee: {
                                type: 'MemberExpression',
                                object: {
                                  type: 'Identifier',
                                  name: 'os',
                                  loc: {
                                    start: {
                                      line: 136,
                                      column: 16
                                    },
                                    end: {
                                      line: 136,
                                      column: 18
                                    }
                                  }
                                },
                                property: {
                                  type: 'Identifier',
                                  name: '_exit',
                                  loc: {
                                    start: {
                                      line: 136,
                                      column: 19
                                    },
                                    end: {
                                      line: 136,
                                      column: 24
                                    }
                                  }
                                },
                                loc: {
                                  start: {
                                    line: 136,
                                    column: 16
                                  },
                                  end: {
                                    line: 136,
                                    column: 24
                                  }
                                }
                              },
                              params: [
                                {
                                  type: 'NumberLiteral',
                                  value: 1,
                                  raw: '1',
                                  loc: {
                                    start: {
                                      line: 136,
                                      column: 25
                                    },
                                    end: {
                                      line: 136,
                                      column: 26
                                    }
                                  }
                                }
                              ],
                              keywords: [],
                              loc: {
                                start: {
                                  line: 136,
                                  column: 16
                                },
                                end: {
                                  line: 136,
                                  column: 27
                                }
                              }
                            }
                          ],
                          loc: {
                            start: {
                              line: 135,
                              column: 21
                            },
                            end: {
                              line: 136,
                              column: 27
                            }
                          }
                        },
                        alternate: null,
                        loc: {
                          start: {
                            line: 135,
                            column: 12
                          },
                          end: {
                            line: 136,
                            column: 27
                          }
                        }
                      },
                      {
                        type: 'CallExpression',
                        callee: {
                          type: 'MemberExpression',
                          object: {
                            type: 'Identifier',
                            name: 'ws_server',
                            loc: {
                              start: {
                                line: 137,
                                column: 12
                              },
                              end: {
                                line: 137,
                                column: 21
                              }
                            }
                          },
                          property: {
                            type: 'Identifier',
                            name: 'run',
                            loc: {
                              start: {
                                line: 137,
                                column: 22
                              },
                              end: {
                                line: 137,
                                column: 25
                              }
                            }
                          },
                          loc: {
                            start: {
                              line: 137,
                              column: 12
                            },
                            end: {
                              line: 137,
                              column: 25
                            }
                          }
                        },
                        params: [
                          {
                            type: 'Identifier',
                            name: 'port',
                            loc: {
                              start: {
                                line: 137,
                                column: 26
                              },
                              end: {
                                line: 137,
                                column: 30
                              }
                            }
                          },
                          {
                            type: 'Identifier',
                            name: 'factory_name',
                            loc: {
                              start: {
                                line: 137,
                                column: 32
                              },
                              end: {
                                line: 137,
                                column: 44
                              }
                            }
                          }
                        ],
                        keywords: [],
                        loc: {
                          start: {
                            line: 137,
                            column: 12
                          },
                          end: {
                            line: 137,
                            column: 45
                          }
                        }
                      }
                    ],
                    loc: {
                      start: {
                        line: 133,
                        column: 12
                      },
                      end: {
                        line: 137,
                        column: 45
                      }
                    }
                  },
                  loc: {
                    start: {
                      line: 92,
                      column: 8
                    },
                    end: {
                      line: 137,
                      column: 45
                    }
                  }
                }
              ],
              loc: {
                start: {
                  line: 91,
                  column: 7
                },
                end: {
                  line: 137,
                  column: 45
                }
              }
            },
            handlers: [
              {
                type: 'ExceptHandler',
                body: {
                  type: 'BlockStatement',
                  body: [
                    {
                      type: 'CallExpression',
                      callee: {
                        type: 'MemberExpression',
                        object: {
                          type: 'Identifier',
                          name: 'log',
                          loc: {
                            start: {
                              line: 139,
                              column: 8
                            },
                            end: {
                              line: 139,
                              column: 11
                            }
                          }
                        },
                        property: {
                          type: 'Identifier',
                          name: 'exception',
                          loc: {
                            start: {
                              line: 139,
                              column: 12
                            },
                            end: {
                              line: 139,
                              column: 21
                            }
                          }
                        },
                        loc: {
                          start: {
                            line: 139,
                            column: 8
                          },
                          end: {
                            line: 139,
                            column: 21
                          }
                        }
                      },
                      params: [
                        {
                          type: 'CallExpression',
                          callee: {
                            type: 'Identifier',
                            name: 'str',
                            loc: {
                              start: {
                                line: 139,
                                column: 22
                              },
                              end: {
                                line: 139,
                                column: 25
                              }
                            }
                          },
                          params: [
                            {
                              type: 'Identifier',
                              name: 'e',
                              loc: {
                                start: {
                                  line: 139,
                                  column: 26
                                },
                                end: {
                                  line: 139,
                                  column: 27
                                }
                              }
                            }
                          ],
                          keywords: [],
                          loc: {
                            start: {
                              line: 139,
                              column: 22
                            },
                            end: {
                              line: 139,
                              column: 28
                            }
                          }
                        }
                      ],
                      keywords: [],
                      loc: {
                        start: {
                          line: 139,
                          column: 8
                        },
                        end: {
                          line: 139,
                          column: 29
                        }
                      }
                    }
                  ],
                  loc: {
                    start: {
                      line: 138,
                      column: 25
                    },
                    end: {
                      line: 139,
                      column: 29
                    }
                  }
                },
                errName: {
                  type: 'Identifier',
                  name: 'Exception',
                  loc: {
                    start: {
                      line: 138,
                      column: 11
                    },
                    end: {
                      line: 138,
                      column: 20
                    }
                  }
                },
                name: {
                  type: 'Identifier',
                  name: 'e',
                  loc: {
                    start: {
                      line: 138,
                      column: 24
                    },
                    end: {
                      line: 138,
                      column: 25
                    }
                  }
                },
                loc: {
                  start: {
                    line: 138,
                    column: 4
                  },
                  end: {
                    line: 139,
                    column: 29
                  }
                }
              }
            ],
            finalBody: null,
            loc: {
              start: {
                line: 91,
                column: 7
              },
              end: {
                line: 139,
                column: 29
              }
            }
          }
        ],
        loc: {
          start: {
            line: 72,
            column: 25
          },
          end: {
            line: 139,
            column: 29
          }
        }
      },
      alternate: null,
      loc: {
        start: {
          line: 72,
          column: 0
        },
        end: {
          line: 139,
          column: 29
        }
      }
    }
  ]
}
