module.exports = {
  name: 'data-user',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/data/user',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
