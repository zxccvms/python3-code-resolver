export default {
  rootDir: '..',
  modulePaths: ['<rootDir>/'],
  transform: { '\\.jsx?$': 'babel-jest', '\\.tsx?$': 'ts-jest' }
  // globals: {
  //   // ENodeType: ENodeType
  //   // 'ts-jest': {
  //   //   tsConfig: {
  //   //     target: 'ES2020'
  //   //   }
  //   // }
  // }
}
