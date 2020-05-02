module.exports = {
  name: 'data-booking',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/data/booking',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
