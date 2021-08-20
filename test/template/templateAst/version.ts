export default {
  type: 'Program',
  body: [
    {
      type: 'ImportStatement',
      names: [
        {
          type: 'AliasExpression',
          name: 'reduce',
          asname: undefined,
          loc: {
            start: {
              line: 2,
              column: 22
            },
            end: {
              line: 2,
              column: 28
            }
          }
        }
      ],
      module: {
        type: 'Identifier',
        name: 'functools',
        loc: {
          start: {
            line: 2,
            column: 5
          },
          end: {
            line: 2,
            column: 14
          }
        }
      },
      level: 0,
      loc: {
        start: {
          line: 2,
          column: 5
        },
        end: {
          line: 2,
          column: 28
        }
      }
    },
    {
      type: 'ImportStatement',
      names: [
        {
          type: 'AliasExpression',
          name: 'time',
          asname: undefined,
          loc: {
            start: {
              line: 3,
              column: 7
            },
            end: {
              line: 3,
              column: 11
            }
          }
        }
      ],
      module: null,
      level: null,
      loc: {
        start: {
          line: 3,
          column: 7
        },
        end: {
          line: 3,
          column: 11
        }
      }
    },
    {
      type: 'ImportStatement',
      names: [
        {
          type: 'AliasExpression',
          name: 'os',
          asname: undefined,
          loc: {
            start: {
              line: 4,
              column: 7
            },
            end: {
              line: 4,
              column: 9
            }
          }
        }
      ],
      module: null,
      level: null,
      loc: {
        start: {
          line: 4,
          column: 7
        },
        end: {
          line: 4,
          column: 9
        }
      }
    },
    {
      type: 'AssignmentExpression',
      targets: [
        {
          type: 'Identifier',
          name: 'version',
          loc: {
            start: {
              line: 5,
              column: 0
            },
            end: {
              line: 5,
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
            type: 'MemberExpression',
            object: {
              type: 'Identifier',
              name: 'os',
              loc: {
                start: {
                  line: 5,
                  column: 10
                },
                end: {
                  line: 5,
                  column: 12
                }
              }
            },
            property: {
              type: 'Identifier',
              name: 'environ',
              loc: {
                start: {
                  line: 5,
                  column: 13
                },
                end: {
                  line: 5,
                  column: 20
                }
              }
            },
            loc: {
              start: {
                line: 5,
                column: 10
              },
              end: {
                line: 5,
                column: 20
              }
            }
          },
          property: {
            type: 'Identifier',
            name: 'get',
            loc: {
              start: {
                line: 5,
                column: 21
              },
              end: {
                line: 5,
                column: 24
              }
            }
          },
          loc: {
            start: {
              line: 5,
              column: 10
            },
            end: {
              line: 5,
              column: 24
            }
          }
        },
        params: [
          {
            type: 'StringLiteral',
            value: 'RPA_VERSION',
            raw: '"RPA_VERSION"',
            loc: {
              start: {
                line: 5,
                column: 25
              },
              end: {
                line: 5,
                column: 38
              }
            },
            prefix: undefined
          },
          {
            type: 'NoneLiteral',
            loc: {
              start: {
                line: 5,
                column: 40
              },
              end: {
                line: 5,
                column: 44
              }
            }
          }
        ],
        keywords: [],
        loc: {
          start: {
            line: 5,
            column: 10
          },
          end: {
            line: 5,
            column: 45
          }
        }
      },
      loc: {
        start: {
          line: 5,
          column: 0
        },
        end: {
          line: 5,
          column: 45
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
          name: 'version',
          loc: {
            start: {
              line: 6,
              column: 7
            },
            end: {
              line: 6,
              column: 14
            }
          }
        },
        loc: {
          start: {
            line: 6,
            column: 3
          },
          end: {
            line: 6,
            column: 14
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
                name: 'version',
                loc: {
                  start: {
                    line: 7,
                    column: 4
                  },
                  end: {
                    line: 7,
                    column: 11
                  }
                }
              }
            ],
            operator: '=',
            value: {
              type: 'StringLiteral',
              value: '5.8.4',
              raw: '"5.8.4"',
              loc: {
                start: {
                  line: 7,
                  column: 14
                },
                end: {
                  line: 7,
                  column: 21
                }
              },
              prefix: undefined
            },
            loc: {
              start: {
                line: 7,
                column: 4
              },
              end: {
                line: 7,
                column: 21
              }
            }
          }
        ],
        loc: {
          start: {
            line: 6,
            column: 14
          },
          end: {
            line: 7,
            column: 21
          }
        }
      },
      alternate: null,
      loc: {
        start: {
          line: 6,
          column: 0
        },
        end: {
          line: 7,
          column: 21
        }
      }
    },
    {
      type: 'AssignmentExpression',
      targets: [
        {
          type: 'Identifier',
          name: 'date',
          loc: {
            start: {
              line: 8,
              column: 0
            },
            end: {
              line: 8,
              column: 4
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
            name: 'time',
            loc: {
              start: {
                line: 8,
                column: 7
              },
              end: {
                line: 8,
                column: 11
              }
            }
          },
          property: {
            type: 'Identifier',
            name: 'strftime',
            loc: {
              start: {
                line: 8,
                column: 12
              },
              end: {
                line: 8,
                column: 20
              }
            }
          },
          loc: {
            start: {
              line: 8,
              column: 7
            },
            end: {
              line: 8,
              column: 20
            }
          }
        },
        params: [
          {
            type: 'StringLiteral',
            value: '%m%d',
            raw: '"%m%d"',
            loc: {
              start: {
                line: 8,
                column: 21
              },
              end: {
                line: 8,
                column: 27
              }
            },
            prefix: undefined
          },
          {
            type: 'CallExpression',
            callee: {
              type: 'MemberExpression',
              object: {
                type: 'Identifier',
                name: 'time',
                loc: {
                  start: {
                    line: 8,
                    column: 29
                  },
                  end: {
                    line: 8,
                    column: 33
                  }
                }
              },
              property: {
                type: 'Identifier',
                name: 'localtime',
                loc: {
                  start: {
                    line: 8,
                    column: 34
                  },
                  end: {
                    line: 8,
                    column: 43
                  }
                }
              },
              loc: {
                start: {
                  line: 8,
                  column: 29
                },
                end: {
                  line: 8,
                  column: 43
                }
              }
            },
            params: [
              {
                type: 'CallExpression',
                callee: {
                  type: 'MemberExpression',
                  object: {
                    type: 'Identifier',
                    name: 'time',
                    loc: {
                      start: {
                        line: 8,
                        column: 44
                      },
                      end: {
                        line: 8,
                        column: 48
                      }
                    }
                  },
                  property: {
                    type: 'Identifier',
                    name: 'time',
                    loc: {
                      start: {
                        line: 8,
                        column: 49
                      },
                      end: {
                        line: 8,
                        column: 53
                      }
                    }
                  },
                  loc: {
                    start: {
                      line: 8,
                      column: 44
                    },
                    end: {
                      line: 8,
                      column: 53
                    }
                  }
                },
                params: [],
                keywords: [],
                loc: {
                  start: {
                    line: 8,
                    column: 44
                  },
                  end: {
                    line: 8,
                    column: 55
                  }
                }
              }
            ],
            keywords: [],
            loc: {
              start: {
                line: 8,
                column: 29
              },
              end: {
                line: 8,
                column: 56
              }
            }
          }
        ],
        keywords: [],
        loc: {
          start: {
            line: 8,
            column: 7
          },
          end: {
            line: 8,
            column: 57
          }
        }
      },
      loc: {
        start: {
          line: 8,
          column: 0
        },
        end: {
          line: 8,
          column: 57
        }
      }
    },
    {
      type: 'AssignmentExpression',
      targets: [
        {
          type: 'Identifier',
          name: 'VERSION',
          loc: {
            start: {
              line: 9,
              column: 0
            },
            end: {
              line: 9,
              column: 7
            }
          }
        }
      ],
      operator: '=',
      value: {
        type: 'TemplateLiteral',
        expressions: [
          {
            type: 'Identifier',
            name: 'version',
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 6
              }
            }
          },
          {
            type: 'StringLiteral',
            value: '.snapshot',
            raw: '".snapshot"',
            loc: {
              start: {
                line: 0,
                column: 0
              },
              end: {
                line: 0,
                column: 0
              }
            },
            prefix: undefined
          },
          {
            type: 'Identifier',
            name: 'date',
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 3
              }
            }
          }
        ],
        loc: {
          start: {
            line: 9,
            column: 10
          },
          end: {
            line: 9,
            column: 36
          }
        }
      },
      loc: {
        start: {
          line: 9,
          column: 0
        },
        end: {
          line: 9,
          column: 36
        }
      }
    },
    {
      type: 'AssignmentExpression',
      targets: [
        {
          type: 'Identifier',
          name: 'msg',
          loc: {
            start: {
              line: 11,
              column: 0
            },
            end: {
              line: 11,
              column: 3
            }
          }
        }
      ],
      operator: '=',
      value: {
        type: 'StringLiteral',
        value: '\n重写键盘按键组件\n',
        raw: '"\\n重写键盘按键组件\\n"',
        loc: {
          start: {
            line: 11,
            column: 6
          },
          end: {
            line: 13,
            column: 3
          }
        },
        prefix: undefined
      },
      loc: {
        start: {
          line: 11,
          column: 0
        },
        end: {
          line: 13,
          column: 3
        }
      }
    }
  ]
}
