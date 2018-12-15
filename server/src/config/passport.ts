import { ExtractJwt, Strategy } from "passport-jwt";

import { Passport } from "passport";

import { User } from "../models";

export class PassportConfig {

  public passport: any;

  constructor(passport: any) {
    this.passport = passport;
  }

  public init() {
    const opts = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
      secretOrKey: process.env.APP_SECRET,
    };

    this.passport.use(new Strategy(opts, (jwtPayload, done) => {
      User.findOne({_id: jwtPayload._doc._id}, (err, user) => {
        if (err) {
          return done(err, false);
        } else if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    }));
  }
}
