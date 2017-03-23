// A service to handle any special mapping cases which occur.
/*
    eslint
    no-param-reassign: 0
*/

angular.module('conceptCommon').service('conceptCommonServiceMapperSpecial',
function conceptCommonServiceMapperSpecial() {
    // Extracts ids from square-bracketed properties.
    function arrayElementId(prop) {
        return prop.substring(prop.lastIndexOf('[') + 1, prop.lastIndexOf(']'));
    }

    return {
        // Property contains an array of all elements from both english and japanese documents.
        // There may be multiple english or japanese documents in this array.
        'proposal.gameDesignDocuments': function pGDD(obj, prop, value) {
            // Extract the isocode from the property name.
            var isocode = arrayElementId(prop);

            // Handle setter scenario, by setting the documents array to the value.
            if (value !== undefined) {
                // Delete everything for this isocode
                obj.proposal.gameDesignDocuments = (obj.proposal.gameDesignDocuments || [])
                .filter(function findNot(doc) {
                    return doc.language.isocode !== isocode.toLowerCase();
                });

                // Concatenate in everything given in value
                obj.proposal.gameDesignDocuments = obj.proposal.gameDesignDocuments.concat(value);
            }

            // Return with an array based on documents property.
            return (obj.proposal.gameDesignDocuments || []).filter(function find(doc) {
                return doc.language.isocode === isocode.toLowerCase();
            });
        }
    };
});
