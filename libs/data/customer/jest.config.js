module.exports = {
  name: 'data-customer',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/data/customer',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
