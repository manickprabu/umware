// A function for getting/setting an object property based on a complicated key.
// Example: 'x.y[z].w' in {x: {y: [{ id: z, w: 2}] } } would return 2.
// Defining the 'value' argument would make it possible to set the value to something else.
/*
    eslint
    no-param-reassign: 0
    no-use-before-define: 0
*/

angular.module('conceptCommon').factory('conceptCommonFactoryMapper',
function conceptProposalFactoryFieldKeyMapper(conceptCommonServiceMapperSpecial) {
    // Some fields have different names between different API endpoints.
    // Sometimes.
    var fieldMaps = {
        // 'proposal.plannedPlatforms': 'proposal.platforms'
    };

    function findSpecialCase(prop) {
        return conceptCommonServiceMapperSpecial[
            Object.keys(conceptCommonServiceMapperSpecial).filter(function filter(specialCase) {
                return prop.lastIndexOf(specialCase) > -1;
            })[0]
        ];
    }

    // Todo: Work out whether we still need this.
    // fieldMaps is empty, so one can assume not.
    function dtoProperty(fieldCode) {
        return fieldMaps[fieldCode] || fieldCode;
    }


    // This function seems common.
    function lastIndexOfBracket(prop) {
        return prop.lastIndexOf('[');
    }

    // Check if reference property string is for an array element.
    function isArrayReference(prop) {
        return lastIndexOfBracket(prop) > -1;
    }

    // Extract name and id elements from array property reference.
    function arrayProp(prop) {
        // Keep one variable rather than running the function twice.
        var lstIDX = lastIndexOfBracket(prop);

        // Returns a name/id pair.
        return {
            // Name is the part before the opening bracket.
            name: prop.substring(lstIDX, 0),

            // Id is the part between brackets.
            id: prop.substring(lstIDX + 1, prop.lastIndexOf(']'))
        };
    }

    // Run filter on array using given id
    function handleArrayElement(obj, reference, chunks, value, cb) {
        // It should be noted that this will only return the first element in an array.
        var element; // This will ultimately be returned.
        var prop = arrayProp(reference);

        function filter(item) {
            // Filter will use id to pick out specific element(s?) of interest.
            return cb(prop.name, prop.id, item);
        }

        // Check if the property exists for the reference.
        if (obj[prop.name] === undefined) {
            // If the value is not defined, we know that the property should be an array.
            obj[prop.name] = [];
        }

        // Throws an exception if the object property is not an array.
        if (obj[prop.name].constructor !== [].constructor) {
            throw new Error([
                'conceptCommonFactoryMapper(handleArrayElement):',
                'Expecting array element.',
                typeof obj[prop.name],
                'found',
                (typeof obj[prop.name] === 'object'
                    ? ' of type ' + obj[prop.name].constructor.name
                    : ''
                )
            ].join(' '));
        }

        // Filters the array, returning the element according to the callback filter.
        element = obj[prop.name].filter(filter).map(function map(item) {
            // Handles continuing references.
            if (chunks.length > 0) {
                item = mapper(item, chunks.join('.'), value, cb);
            }
            return item;
        })[0];

        // If the array property is empty, but an array value is set, it needs to set the
        // element to be the value.
        if (value !== undefined) {
            // Value is defined, so use it to set the array element.
            if (element === undefined) {
                // No element exists, so we're creating one.
                obj[prop.name].push(value);
                element = value;
            } else {
                // Only add new array elements when there are no continuing references.
                if (chunks.length === 0) {
                    // Need to extend the existing element.
                    obj[prop.name] = obj[prop.name].filter(filter).map(function map(item) {
                        return angular.extend(item, value);
                    });
                }
            }
        }

        return element;
    }


    function mapper(obj, reference, value, cb) {
        // This takes and object and a reference in the form of 'a.b.c' and returns
        // or sets the object leaf node according to the reference.
        // Example: if object is a:{b:{c:1}}, arguments (a, 'a.b.c') return 1.
        // Including a value argument sets that value.
        // If property objects don't exist, they are created with empty objects.
        var chunks;
        var prop;
        var specialCase = findSpecialCase(reference);
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
        chunks = dtoProperty(reference).split('.');
        prop = chunks.shift();

        if (specialCase) {
            // If handling an array reference, a specific element needs to be handled
            // differently, as the prop variable will contain both the property name and
            // the id to be filtered.
            value = specialCase(obj, reference, value);
        } else if (isArrayReference(prop)) {
            value = handleArrayElement(obj, prop, chunks, value, cb);
        } else {
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
                        value = mapper(obj[prop], chunks.join('.'), value, cb);
                    }
                } else {
                    // Set the return against the value object.
                    value = mapper(obj[prop], chunks.join('.'), value, cb);
                }
            }
        }

        return value;
    }

    return mapper;
});
