module.exports = function(api) {
  api.cache(true);
  return {
    presets: [
      'babel-preset-expo',
      ['@babel/preset-env', {
        loose: true, // Updated to match the loose option for class properties, private methods and private property in object
      }],
      ['@babel/preset-react', {
        runtime: 'automatic'
      }], 
     
    ],
    plugins: [
      ['@babel/plugin-transform-private-methods', { loose: true }], // Added as suggested by the warning
      ['@babel/plugin-transform-private-property-in-object', { loose: true }], // Added as suggested by the warning
    ]
  };
};
