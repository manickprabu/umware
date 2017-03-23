'use strict';

// Service for concept proposal
angular.module('conceptProposal').service('releaseDate', function releaseDate() {

    // turns a release date string into a release date json object
    // releaseDate: {
    //     quarterTime: {
    //         year: 2016,
    //         quarter: Q1
    //     },
    //     date: "2016-04-23T18:25:43Z",
    // }
    this.getReleaseDate = function(releaseDateStr) {

        if (releaseDateStr && releaseDateStr !== '') {

            var tokens = releaseDateStr.split('-');

            if (tokens.length === 2) {

                // we have a quarter QX-YYYY
                return {
                    quarterTime: {
                        year: parseInt(tokens[1]),
                        quarter: tokens[0]
                    }
                };
            } else if (tokens.length === 3) {

                // we have a date YYYY-MM-DD
                return {
                    date: tokens[0] + '-' + tokens[1] + '-' + tokens[2]
                };
            }
        }
        // could not parse
        return null;
    }
});
