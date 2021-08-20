export default {
  type: 'Program',
  body: [
    {
      type: 'ImportStatement',
      names: [
        {
          type: 'AliasExpression',
          name: 'absolute_import',
          asname: undefined,
          loc: {
            start: {
              line: 2,
              column: 23
            },
            end: {
              line: 2,
              column: 38
            }
          }
        },
        {
          type: 'AliasExpression',
          name: 'unicode_literals',
          asname: undefined,
          loc: {
            start: {
              line: 2,
              column: 40
            },
            end: {
              line: 2,
              column: 56
            }
          }
        }
      ],
      module: {
        type: 'Identifier',
        name: '__future__',
        loc: {
          start: {
            line: 2,
            column: 5
          },
          end: {
            line: 2,
            column: 15
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
          column: 56
        }
      }
    },
    {
      type: 'ImportStatement',
      names: [
        {
          type: 'AliasExpression',
          name: 'Holiday',
          asname: undefined,
          loc: {
            start: {
              line: 4,
              column: 23
            },
            end: {
              line: 4,
              column: 30
            }
          }
        },
        {
          type: 'AliasExpression',
          name: 'holidays',
          asname: undefined,
          loc: {
            start: {
              line: 4,
              column: 32
            },
            end: {
              line: 4,
              column: 40
            }
          }
        },
        {
          type: 'AliasExpression',
          name: 'in_lieu_days',
          asname: undefined,
          loc: {
            start: {
              line: 4,
              column: 42
            },
            end: {
              line: 4,
              column: 54
            }
          }
        },
        {
          type: 'AliasExpression',
          name: 'workdays',
          asname: undefined,
          loc: {
            start: {
              line: 4,
              column: 56
            },
            end: {
              line: 4,
              column: 64
            }
          }
        }
      ],
      module: {
        type: 'Identifier',
        name: 'constants',
        loc: {
          start: {
            line: 4,
            column: 6
          },
          end: {
            line: 4,
            column: 15
          }
        }
      },
      level: 1,
      loc: {
        start: {
          line: 4,
          column: 6
        },
        end: {
          line: 4,
          column: 64
        }
      }
    },
    {
      type: 'ImportStatement',
      names: [
        {
          type: 'AliasExpression',
          name: 'find_workday',
          asname: undefined,
          loc: {
            start: {
              line: 6,
              column: 4
            },
            end: {
              line: 6,
              column: 16
            }
          }
        },
        {
          type: 'AliasExpression',
          name: 'get_dates',
          asname: undefined,
          loc: {
            start: {
              line: 6,
              column: 18
            },
            end: {
              line: 6,
              column: 27
            }
          }
        },
        {
          type: 'AliasExpression',
          name: 'get_holiday_detail',
          asname: undefined,
          loc: {
            start: {
              line: 6,
              column: 29
            },
            end: {
              line: 6,
              column: 47
            }
          }
        },
        {
          type: 'AliasExpression',
          name: 'get_holidays',
          asname: undefined,
          loc: {
            start: {
              line: 6,
              column: 49
            },
            end: {
              line: 6,
              column: 61
            }
          }
        },
        {
          type: 'AliasExpression',
          name: 'get_workdays',
          asname: undefined,
          loc: {
            start: {
              line: 6,
              column: 63
            },
            end: {
              line: 6,
              column: 75
            }
          }
        },
        {
          type: 'AliasExpression',
          name: 'is_holiday',
          asname: undefined,
          loc: {
            start: {
              line: 6,
              column: 77
            },
            end: {
              line: 6,
              column: 87
            }
          }
        },
        {
          type: 'AliasExpression',
          name: 'is_in_lieu',
          asname: undefined,
          loc: {
            start: {
              line: 6,
              column: 89
            },
            end: {
              line: 6,
              column: 99
            }
          }
        },
        {
          type: 'AliasExpression',
          name: 'is_workday',
          asname: undefined,
          loc: {
            start: {
              line: 6,
              column: 101
            },
            end: {
              line: 6,
              column: 111
            }
          }
        }
      ],
      module: {
        type: 'Identifier',
        name: 'utils',
        loc: {
          start: {
            line: 5,
            column: 6
          },
          end: {
            line: 5,
            column: 11
          }
        }
      },
      level: 1,
      loc: {
        start: {
          line: 5,
          column: 6
        },
        end: {
          line: 6,
          column: 111
        }
      }
    },
    {
      type: 'bracket',
      value: ')',
      loc: {
        start: {
          line: 7,
          column: 0
        },
        end: {
          line: 7,
          column: 1
        }
      },
      extra: undefined
    },
    {
      type: 'AssignmentExpression',
      targets: [
        {
          type: 'Identifier',
          name: '__all__',
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
        type: 'ArrayExpression',
        elements: [
          {
            type: 'StringLiteral',
            value: 'Holiday',
            raw: '"Holiday"',
            loc: {
              start: {
                line: 10,
                column: 4
              },
              end: {
                line: 10,
                column: 13
              }
            },
            prefix: undefined
          },
          {
            type: 'StringLiteral',
            value: 'holidays',
            raw: '"holidays"',
            loc: {
              start: {
                line: 11,
                column: 4
              },
              end: {
                line: 11,
                column: 14
              }
            },
            prefix: undefined
          },
          {
            type: 'StringLiteral',
            value: 'in_lieu_days',
            raw: '"in_lieu_days"',
            loc: {
              start: {
                line: 12,
                column: 4
              },
              end: {
                line: 12,
                column: 18
              }
            },
            prefix: undefined
          },
          {
            type: 'StringLiteral',
            value: 'workdays',
            raw: '"workdays"',
            loc: {
              start: {
                line: 13,
                column: 4
              },
              end: {
                line: 13,
                column: 14
              }
            },
            prefix: undefined
          },
          {
            type: 'StringLiteral',
            value: 'is_holiday',
            raw: '"is_holiday"',
            loc: {
              start: {
                line: 14,
                column: 4
              },
              end: {
                line: 14,
                column: 16
              }
            },
            prefix: undefined
          },
          {
            type: 'StringLiteral',
            value: 'is_in_lieu',
            raw: '"is_in_lieu"',
            loc: {
              start: {
                line: 15,
                column: 4
              },
              end: {
                line: 15,
                column: 16
              }
            },
            prefix: undefined
          },
          {
            type: 'StringLiteral',
            value: 'is_workday',
            raw: '"is_workday"',
            loc: {
              start: {
                line: 16,
                column: 4
              },
              end: {
                line: 16,
                column: 16
              }
            },
            prefix: undefined
          },
          {
            type: 'StringLiteral',
            value: 'get_holiday_detail',
            raw: '"get_holiday_detail"',
            loc: {
              start: {
                line: 17,
                column: 4
              },
              end: {
                line: 17,
                column: 24
              }
            },
            prefix: undefined
          },
          {
            type: 'StringLiteral',
            value: 'get_dates',
            raw: '"get_dates"',
            loc: {
              start: {
                line: 18,
                column: 4
              },
              end: {
                line: 18,
                column: 15
              }
            },
            prefix: undefined
          },
          {
            type: 'StringLiteral',
            value: 'get_holidays',
            raw: '"get_holidays"',
            loc: {
              start: {
                line: 19,
                column: 4
              },
              end: {
                line: 19,
                column: 18
              }
            },
            prefix: undefined
          },
          {
            type: 'StringLiteral',
            value: 'get_workdays',
            raw: '"get_workdays"',
            loc: {
              start: {
                line: 20,
                column: 4
              },
              end: {
                line: 20,
                column: 18
              }
            },
            prefix: undefined
          },
          {
            type: 'StringLiteral',
            value: 'find_workday',
            raw: '"find_workday"',
            loc: {
              start: {
                line: 21,
                column: 4
              },
              end: {
                line: 21,
                column: 18
              }
            },
            prefix: undefined
          }
        ],
        loc: {
          start: {
            line: 9,
            column: 10
          },
          end: {
            line: 22,
            column: 1
          }
        }
      },
      loc: {
        start: {
          line: 9,
          column: 0
        },
        end: {
          line: 22,
          column: 1
        }
      }
    }
  ]
}
