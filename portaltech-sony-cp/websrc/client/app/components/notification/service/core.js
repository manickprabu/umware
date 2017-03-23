angular.module('notification').service('notificationServiceCore',
function notificationServiceCore($filter, $timeout, notificationServiceAPI) {
    var messages = [];
    var updating = false;
    var updates = [];

    // Runs an API call
    // When api call completes, a timeout starts the next one.
    function update() {
        return notificationServiceAPI.list().then(function list(response) {
            messages = response.data.notifications || [];
            updates.forEach(function eachUpdate(fnc) {
                fnc(messages);
            });
            return messages;
        }).finally(function () {
            return $timeout(update, 15000);
        });
    }

    // Start the first api call, if one is not already running.
    this.start = function start() {
        if (!updating) {
            updating = true;
            update().catch(function updateCatch(response) {
                throw new Error(response);
            });
        }
    };

    this.update = function onUpdate(fnc) {
        if (typeof fnc === 'function') {
            updates.push(fnc);
        }
        return updates;
    };

    // Creates two functions which return the local and global notifications.
    this.list = {};
    [
        'local',
        'global'
    ].forEach(angular.bind(this, function forEachList(name) {
        var uppercaseName = $filter('uppercase')(name);
        this.list[name] = angular.bind(this, function get() {
            return messages.filter(function filter(notification) {
                return notification.type === uppercaseName;
            });
        });
    }));

    // Marks the array of ids as read.
    this.mark = function mark(ids) {
        return ids.map(notificationServiceAPI.mark);
    };
});
