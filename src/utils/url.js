const os = require("os");
const config = require("../config/default");

/**
 * 获取本机ip
 * @returns ip address
 */
function getIPAdress() {
    var interfaces = os.networkInterfaces();
    for (var devName in interfaces) {
        var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (
                alias.family === "IPv4" &&
                alias.address !== "127.0.0.1" &&
                !alias.internal
            ) {
                return alias.address;
            }
        }
    }
}
exports.getIPAdress = getIPAdress;

exports.getLocation = () => {
    const ipa = getIPAdress();
    const location = {
        host: `${ipa}:${config.HTTP_SERVER_PORT}`,
        hostname: ipa,
        port: config.HTTP_SERVER_PORT,
    };
    return location;
};
