import { getConnection, getManager, getRepository, Repository } from 'typeorm';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<any> {
    // Complete usando ORM
    const user = await this.repository.findOne( {id: user_id}, {relations: ["games"]} );
    return user as User;
    console.log("user: ", user);

  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    return this.repository.query(`SELECT * FROM USERS ORDER BY FIRST_NAME`); // Complete usando raw query
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    return this.repository.query(`SELECT * FROM USERS WHERE lower(FIRST_NAME) = lower($1) AND lower(LAST_NAME) = lower($2)`, [first_name, last_name]); // Complete usando raw query
  }
}
