var ghpages = require('gh-pages');


/**
 * This task pushes to the `master` branch of the configured `repo`.
 */
var options = {
    branch: 'master'
};


ghpages.publish('dist', options, function (err) {
    console.log(err);
});