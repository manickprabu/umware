module.exports = function sass() {
    return {
        options: {
            sourceMap: true
        },
        dist: {
            files: {
                'client/dist/css/sass.css': 'client/dist/css/concat.scss'
            }
        }
    };
};
