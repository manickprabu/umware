// Todo: Safely remove. Should be moved to conceptCommon.
angular.module('conceptProposal').factory('conceptProposalFactoryFieldKeyMapper',
function conceptProposalFactoryFieldKeyMapper() {
    function mapper(obj, reference, value) {
        // This takes and object and a reference in the form of 'a.b.c' and returns
        // or sets the object leaf node according to the reference.
        // Example: if object is a:{b:{c:1}}, arguments (a, 'a.b.c') return 1.
        // Including a value argument sets that value.
        // If property objects don't exist, they are created with empty objects.
        var chunks;
        var prop;
        if (reference === undefined) {
            throw new Error([
                'conceptProposalFactoryFieldKeyMapper(object, reference, value):',
                'undefined reference.',
                'Expecting field name string.'
            ].join(' '));
        }
        if (obj === undefined) {
            throw new Error([
                'conceptProposalFactoryFieldKeyMapper(object, reference, value):',
                'undefined object.',
                'Expecting object as first argument.',
                'reference:',
                reference
            ].join(' '));
        }
        chunks = reference.split('.');
        prop = chunks.shift();
        if (chunks.length === 0) {
            // This is the leaf property to be returned.
            if (value !== undefined) {
                // Set the property at obj[prop].
                obj[prop] = value;
            }
            // Return this object property.
            value = obj[prop];
        } else {
            // This is not a leaf property.
            if (obj[prop] === undefined) {
                // Property doesn't exist for object by reference.
                if (value !== undefined) {
                    // A value will be set, so keep recursing through the object to set it.
                    // Otherwise leave the value to return undefined.
                    obj[prop] = {};
                    value = mapper(obj[prop], chunks.join('.'), value);
                }
            } else {
                // Set the return against the value object.
                value = mapper(obj[prop], chunks.join('.'), value);
            }
        }
        return value;
    }

    return mapper;
});
