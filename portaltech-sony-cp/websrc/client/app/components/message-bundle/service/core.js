angular.module('messageBundle').service('messageBundleServiceCore',
function messageBundleServiceCore(messageBundleServiceAPI) {
    var messages = {};

    // This is to be used in the routing resolution directly if possible.
    this.resolve = function resolve(bundle) {
        return messageBundleServiceAPI.get(bundle).then(function then(response) {
            messages[bundle] = {};
            response.data.messages.forEach(function forEach(message) {
                messages[bundle][message.key] = message.value;
            });
            return messages[bundle];
        });
    };

    // Returns the message bundle.
    this.message = function message(bundle, key, placeholder) {
        // This will be the return value.
        // The return statement is left until the end to avoid confusion.
        var value;

        // Undefined bundle results in an error message.
        if (messages[bundle] === undefined) {
            throw new Error([
                'messageBundleServiceCore.message: No such bundle ',
                '"',
                bundle,
                '".'
            ].join(''));
        }

        // If the message for the key is undefined...
        if (messages[bundle][key] === undefined) {
            // ... And the placeholder is undefined
            if (placeholder === undefined) {
                // ... Throw an error.
                value = [
                    'messageBundleServiceCore.message: No such key ',
                    '"',
                    key,
                    '".'
                ].join('');
            } else {
                // ... Otherwise, use the placeholder.
                value = placeholder;
            }
        } else {
            // ... Otherwise use the message for the key.
            value = messages[bundle][key];
        }
        return value;
    };
});
