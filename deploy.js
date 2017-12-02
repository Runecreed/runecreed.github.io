// var ghpages = require('gh-pages');
//
//
// /**
//  * This task pushes to the `master` branch of the configured `repo`.
//  */
// var options = {
//     branch: 'master'
// };
//
//
// ghpages.publish('dist', options, function (err) {
//     console.log(err);
// });

const { exec } = require('child_process');
exec("deploy.bat", (err, stdout, stderr) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(stdout);
});