/* eslint-disable class-methods-use-this */
/* eslint-disable import/prefer-default-export */
import * as express from "express";
import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Query,
  Route,
  SuccessResponse,
  Request,
  Tags,
} from "tsoa";
import {
  update,
  find,
  getAll,
  getOneById,
  UserUpdateParams,
  UserCreateParams,
  create,
} from "../services/userService";

@Route("users")
@Tags("User")
export class UserController extends Controller {
  @Get("/getAll")
  public async getAll() {
    return getAll();
  }

  @Get("/find")
  public async find(
    @Query() email?: string,
    @Query() cpf?: string,
    @Query() name?: string,
    @Query() status?: string,
    @Query() createdAt?: Date,
    @Query() notedBy?: string,
    @Query() role?: string,
  ) {
    return find(email, cpf, name, status, createdAt, notedBy, role);
  }

  @Get("{id}")
  public async getOneById(@Path() id: string) {
    return getOneById(id);
  }

  // @SuccessResponse("201", "Updated")
  @Post("update")
  public async update(@Body() requestBody: UserUpdateParams): Promise<void> {
    this.setStatus(201);
    update(requestBody);
  }

  @SuccessResponse("201", "Created")
  @Post("singUp")
  public async singUp(
    @Body() requestBody: UserCreateParams,
    @Request() request: express.Request,
  ): Promise<void> {
    this.setStatus(201);
    request.body.token;
    create(requestBody, request.body.token);
  }
}
