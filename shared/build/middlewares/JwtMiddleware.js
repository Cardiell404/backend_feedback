"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtMiddleware = void 0;
class JwtMiddleware {
    constructor(jwt) {
        this.jwt = jwt;
    }
    tokenValidation() {
        return (req, res, next) => {
            var _a;
            if (!((_a = req.session) === null || _a === void 0 ? void 0 : _a.jwt)) {
                return next();
            }
            try {
                const payload = this.jwt.ValidateJWT(req.session.jwt);
                req.currentUser = payload;
            }
            catch (error) {
                console.log(error);
            }
            next();
        };
    }
}
exports.JwtMiddleware = JwtMiddleware;
