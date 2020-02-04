export default class Authorization {
    static hasRole (user, roles) {
        let userRoles = user.map(role => role.name);
        return roles.some(role => userRoles.includes(role));
    }
}