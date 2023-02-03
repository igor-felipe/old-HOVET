/* eslint-disable import/prefer-default-export */
import * as express from "express";
import { sign, Secret, verify } from "jsonwebtoken";
import { UserWithoutPassword } from "src/services/userService";

const { JWT_SECRET, JWT_EXPIRATION_TIME } = process.env;

/*
expressAuthentication needs to keep the 3 arguments, 
even if they are not all used, or an error will be thrown.
public/routes.ts: error TS2554: Expected 1-2 arguments, but got 3.
*/
export function expressAuthentication(
  request: express.Request,
  securityName: string,
  scopes?: string[],
): Promise<any> {
  const token = request.header("Authorization")?.replace("Bearer ", "");

  return new Promise((resolve, reject) => {
    if (!token) {
      reject(new Error("No token provided"));
    }

    verify(token!, JWT_SECRET as Secret, (err: any, decoded: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
      // Check if JWT contains all required scopes
    });
  });
}

export function createToken(user: UserWithoutPassword) {
  const payload = {
    id: user.id,
    lastLogin: user.lastLogin,
  };
  const token = sign(payload, JWT_SECRET as Secret, {
    expiresIn: JWT_EXPIRATION_TIME,
  });

  return token;
}
