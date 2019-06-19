var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/cathesauth', { useNewUrlParser: true });
//mongoose.Promise = global.Promise;

(function connectionStatus() {
    const connection = mongoose.connection.readyState;
    switch (connection) {
        case 0:
            console.log('Disconnected');
            break;
        case 1:
            console.log('Connected');
            break;
        case 2:
            console.log('Connecting');
            break;
        case 3:
            console.log('Disconnecting');
            break;
        default:
            console.log('Sorry, we could not check the connection status');
    }
})();

module.exports = mongoose;