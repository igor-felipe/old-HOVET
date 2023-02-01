/* eslint-disable class-methods-use-this */
import { PrismaClient, User } from "@prisma/client";
import { z } from "zod";
import bcrypt from "bcrypt";
import cpfValidator from "../validators/cpfValidator";
import passwordValidation from "../validators/passwordValidator";

const saltRounds = 12;

const prisma = new PrismaClient();

export type UserWithoutPassword = Omit<
  User,
  "password" | "token" | "lastLogin"
>;
export type UserCreateParams = Pick<
  User,
  "password" | "email" | "cpf" | "name"
>;

export const selectUserWithoutPassword = {
  id: true,
  email: true,
  cpf: true,
  name: true,
  status: true,
  createdAt: true,
  notedBy: true,
} satisfies Record<keyof UserWithoutPassword, boolean>;

const userStatus = {
  activated: "activated",
  deactivated: "deactivated",
} as const;

export type UserStatus = (typeof userStatus)[keyof typeof userStatus];

export type UserUpdateParams = Partial<Omit<User, "id" | "createdAt">> & {
  id: User["id"];
};

export const userValidator = z.object({
  id: z.string().min(1, { message: "Invalid ID" }),
  password: passwordValidation,
  email: z.string().email({ message: "Invalid email" }),
  cpf: z
    .string()
    .refine((val) => cpfValidator(val), { message: "Invalid CPF" }),
  name: z
    .string()
    .min(10, { message: "Very short name" })
    .max(100, { message: "very long name" }),
  // @ts-ignore
  status: z.enum(Object.keys(userStatus), { message: "Invalid User Status" }),
  token: z.string(),
  lastLogin: z.date(),
  createdAt: z.date(),
  notedBy: z.string(),
});

export async function getOneById(
  id: User["id"],
): Promise<UserWithoutPassword | null> {
  return prisma.user.findUnique({
    where: {
      id,
    },
    select: selectUserWithoutPassword,
  });
}

export async function getAll(): Promise<UserWithoutPassword[] | null> {
  return prisma.user.findMany({
    select: selectUserWithoutPassword,
  });
}

export async function find(
  email: string | undefined,
  cpf: string | undefined,
  name: string | undefined,
  status: string | undefined,
  createdAt: Date | undefined,
  notedBy: string | undefined,
  role: string | undefined,
): Promise<UserWithoutPassword[] | null> {
  return prisma.user.findMany({
    where: {
      email,
      cpf,
      name,
      status,
      createdAt,
      notedBy,
    },
    select: selectUserWithoutPassword,
  });
}

export async function create(
  userCreateParams: UserCreateParams,
  notedByToken: string,
): Promise<UserWithoutPassword | null> {
  const { password, email, cpf, name } = userCreateParams;

  userValidator
    .pick({
      password: true,
      email: true,
      cpf: true,
      name: true,
    })
    .parse(userCreateParams);

  const hashPassword = bcrypt.hashSync(password, saltRounds);

  // if you are the first registered user, notedBy = admin
  const notedBy = (await prisma.user.findFirst({}))
    ? "teste" // userCreateParams.notedBy // todo: get the userid for notedBy from notedByToken
    : "Admin";

  const userWithoutPassword = await prisma.user.create({
    data: {
      email,
      password: hashPassword,
      cpf,
      name,
      status: userStatus.activated,
      token: "token",
      notedBy,
    },
    select: selectUserWithoutPassword,
  });
  return userWithoutPassword;
}

export async function update(
  userUpdateParams: UserUpdateParams,
): Promise<UserWithoutPassword | null> {
  userValidator
    .partial({
      password: true,
      email: true,
      cpf: true,
      name: true,
      status: true,
    })
    .parse(userUpdateParams);

  const newHashPassword = userUpdateParams.password
    ? bcrypt.hashSync(userUpdateParams.password, saltRounds)
    : {};

  const userWithoutPassword = await prisma.user.update({
    data: { ...userUpdateParams, password: newHashPassword },
    select: selectUserWithoutPassword,
    where: {
      id: userUpdateParams.id,
    },
  });
  return userWithoutPassword;
}
