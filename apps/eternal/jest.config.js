module.exports = {
  name: 'eternal',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/eternal',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
